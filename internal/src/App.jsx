import { useState } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

const App = () => {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToInsert = {
      name,
      score,
      age: age || null,
      email: email || null,
      phone: phone || null
    };

    console.log(dataToInsert);

    // Insert into production-internal table
    const { data: prodData, error: internalError } = await supabase
      .from('test-internal')
      .insert([dataToInsert]);

    // Insert into test table
    const { data: testData, error: prodError } = await supabase
      .from('test')
      .insert([{ name, score }]);

    if (prodError || internalError) {
      setStatus('Submission failed. Please try again.');
      console.error(internalError || prodError);
    } else {
      setStatus('Submission successful!');
      setName('');
      setScore('');
      setAge('');
      setEmail('');
      setPhone('');
    }

    // Clear status message after 5 seconds
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <div className="volunteer-score-submission">
      <h1>Score Submission</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Score:
            <input
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Age (Optional):
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Email (Optional):
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Phone Number (Optional):
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {status && <p className={`status-message ${status ? 'fade-out' : ''}`}>{status}</p>}
    </div>
  );
};

export default App;