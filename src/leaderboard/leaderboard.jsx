import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

import './leaderboard.css';
import { MobileOnlyView } from 'react-device-detect';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('score');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => { // fetch data from supabase DB ONCE on initial render. dependency prevents further runs to conserve resources and my supabase billing 💀
    fetchData();
  }, [sortField, sortOrder, filter]);

  const fetchData = async () => { // fetch data from DB and set it to state
    let query = supabase
      .from('test') // Change this to your table name 
      .select('*');

    if (filter) {
      query = query.eq('timestamp', filter);
    }

    if (sortField && sortOrder) {
      query = query.order(sortField, { ascending: sortOrder === 'asc' });
    }

    const { data, error } = await query;
    if (error) {
      console.error(error);
    } else {
      setData(data);
      //console.log(data);
    }
  };

  const handleChanges = (payload) => { // wrapper to refetch ALL db data... todo - optimize to only fetch the changed row
    //console.log('Change received!', payload)
    fetchData()
  }

supabase // super duper important "future", subscribes to supabase broadcasts to run `handleChanges` when DB is modified
  .channel('schema-db-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
    },
    handleChanges
  )
  .subscribe()

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getRowClass = (index) => {
    if (sortField === 'score' && sortOrder === 'desc') {
      if (index === 0) return 'first-place';
      if (index === 1) return 'second-place';
      if (index === 2) return 'third-place';
    }
    return '';
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortField === 'score') {
      return sortOrder === 'asc' ? a.score - b.score : b.score - a.score;
    }
    if (sortField === 'timestamp') {
      return sortOrder === 'asc' ? new Date(a.timestamp) - new Date(b.timestamp) : new Date(b.timestamp) - new Date(a.timestamp);
    }
    return 0;
  });

  return (
    <div className="leaderboard">
      <div className="leaderboard-title">
        <h1>Leaderboard</h1>
      </div>
      <MobileOnlyView>
        <div className="controls">
          <button onClick={() => handleSort('score')}>
            Sort by Score {sortField === 'score' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button onClick={() => handleSort('timestamp')}>
            Sort by Date {sortField === 'timestamp' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </MobileOnlyView>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={row.id} className={getRowClass(index)}>
              <td>{row.name}</td>
              <td>{row.score}</td>
              <td>{new Date(row.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;