import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import ScoringMenu from './scoring/scoring';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [chickenCount, setChickenCount] = useState(0);
  const [cowCount, setCowCount] = useState(0);
  const [clearPlotBonus, setClearPlot] = useState(false);
  const [doorClosedBonus, setDoor] = useState(false);
  const [parkBonus, setPark] = useState(false);

  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const totalScore = 10 * (chickenCount + cowCount + clearPlotBonus + doorClosedBonus + parkBonus);
    setScore(totalScore);
  }, [chickenCount, cowCount, clearPlotBonus, doorClosedBonus, parkBonus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToInsert = {
      name,
      score,
    };

    console.log(dataToInsert);

    const { data: prodData, error: prodError } = await supabase
      .from('prod')
      .insert([{ name, score }]);

    if (prodError) {
      setStatus('Submission failed. Please try again.');
      setStatusType('error');
      console.error(prodError);
    } else {
      setStatus('Submission successful!');
      setStatusType('success');
      setName('');
      setScore(0);
      setAge('');
      setEmail('');
      setPhone('');
      setChickenCount(0);
      setCowCount(0);
      setClearPlot(false);
      setDoor(false);
      setPark(false);
      setToggledButton('');
    }
    setIsSubmitting(false);
    setTimeout(() => setStatus(''), 8000);
  };

  const incrementChickenCount = () => {
    if (chickenCount < 4) {
      setChickenCount(chickenCount + 1);
    }
  };

  const decrementChickenCount = () => {
    if (chickenCount > 0) {
      setChickenCount(chickenCount - 1);
    }
  };

  const incrementCowCount = () => {
    if (cowCount < 10) {
      setCowCount(cowCount + 1);
    }
  };

  const decrementCowCount = () => {
    if (cowCount > 0) {
      setCowCount(cowCount - 1);
    }
  };

  const togglePlotBonus = () => {
    setClearPlot(!clearPlotBonus);
  };

  const toggleDoorBonus = () => {
    setDoor(!doorClosedBonus);
  };

  const toggleParkBonus = () => {
    setPark(!parkBonus);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'overlay') {
      closeMenu();
    }
  };

  return (
    <div className="app-container">
      <div className="volunteer-score-submission">
        <h1>Score Submission</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Score: <span className="required">*</span>
              <input
                type="number"
                value={score}
                readOnly
              />
            </label>
          </div>
          <div>
            <label>
              Name: <span className="required">*</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit" disabled={isSubmitting}>Submit</button>
        </form>
        {/* {status && <p className={`status-message ${statusType}`}>{status}</p>} */}
        <p className={`status-message ${statusType}`}>{status}</p>
      </div>
      <div className="hamburger-menu" onClick={() => setMenuVisible(!menuVisible)}>
        &#9776; Score
      </div>
      {menuVisible && (
        <div className="overlay" onClick={handleOverlayClick}>
          <div className="overlay-content">
            <ScoringMenu
              incrementChickenCount={incrementChickenCount}
              decrementChickenCount={decrementChickenCount}
              incrementCowCount={incrementCowCount}
              decrementCowCount={decrementCowCount}
              cowCount={cowCount}
              chickenCount={chickenCount}
              togglePlotBonus={togglePlotBonus}
              toggleDoorBonus={toggleDoorBonus}
              toggleParkBonus={toggleParkBonus}
              clearPlotBonus={clearPlotBonus}
              doorClosedBonus={doorClosedBonus}
              parkBonus={parkBonus}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
