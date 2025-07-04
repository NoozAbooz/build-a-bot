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

  const [cropCount, setCropCount] = useState(0);
  const [baleCount, setBaleCount] = useState(0);
  const [pingPongCount, setPingPongCount] = useState(0);
  const [parkCount, setParkCount] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [bonusToggled, setBonusToggled] = useState(false);

  const [menuVisible, setMenuVisible] = useState(false);
  const [toggledButton, setToggledButton] = useState('');

  useEffect(() => {
    const totalScore = (cropCount * 4) + bonus + (baleCount * 2) + (pingPongCount * 10) + parkCount;
    setScore(totalScore);
  }, [cropCount, baleCount, parkCount, bonus, pingPongCount]);

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
      setCropCount(0);
      setBaleCount(0);
      setParkCount(0);
      setBonus(0);
      setBonusToggled(false);
      setToggledButton('');

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    setIsSubmitting(false);
  };

  const incrementCropCount = () => {
    if (cropCount < 8) {
      setCropCount(cropCount + 1);
    }
  };

  const decrementCropCount = () => {
    if (cropCount > 0) {
      setCropCount(cropCount - 1);
    }
  };

  const toggleBonus = () => {
    if (bonusToggled) {
      setBonus(0);
    } else {
      setBonus(15);
    }
    setBonusToggled(!bonusToggled);
  };

  const incrementBaleCount = () => {
    if (baleCount < 4) {
      setBaleCount(baleCount + 1);
    }
  };
  const decrementBaleCount = () => {
    if (baleCount > 0) {
      setBaleCount(baleCount - 1);
    }
  };

  const incrementPingPongCount = () => {
    if (pingPongCount < 3) {
      setPingPongCount(pingPongCount + 1);
    }
  };
  const decrementPingPongCount = () => {
    if (pingPongCount > 0) { 
      setPingPongCount(pingPongCount - 1);
    }
  };

  const setParkCountValue = (value) => {
    setParkCount(value);
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
              cropCount={cropCount}
              incrementCropCount={incrementCropCount}
              decrementCropCount={decrementCropCount}
              toggleBonus={toggleBonus}
              bonusToggled={bonusToggled}
              baleCount={baleCount}
              incrementBaleCount={incrementBaleCount}
              decrementBaleCount={decrementBaleCount}
              pingPongCount={pingPongCount}
              incrementPingPongCount={incrementPingPongCount}
              decrementPingPongCount={decrementPingPongCount}
              parkCount={parkCount}
              setParkCountValue={setParkCountValue}
              toggledButton={toggledButton}
              setToggledButton={setToggledButton}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
