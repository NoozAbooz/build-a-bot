import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import ScoringMenu from './scoring/scoring';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [cropCount, setCropCount] = useState(0);
  const [baleCount, setBaleCount] = useState(0);
  const [parkCount, setParkCount] = useState(0);
  const [bonusCount, setBonusCount] = useState(0);
  const [bonusToggled, setBonusToggled] = useState(false);

  const [menuVisible, setMenuVisible] = useState(false);
  const [toggledButton, setToggledButton] = useState('');

  useEffect(() => {
    const totalScore = cropCount + (baleCount * 4) + parkCount + bonusCount;
    setScore(totalScore);
  }, [cropCount, baleCount, parkCount, bonusCount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToInsert = {
      name,
      score,
      age: age || null,
      email: email || null,
      phone: phone || null,
    };

    console.log(dataToInsert);

    // disable internal DB
    // const { data: prodInternalData, error: internalError } = await supabase 
    //   .from('prod-internal')
    //   .insert([dataToInsert]);

    const { data: prodData, error: prodError } = await supabase
      .from('prod')
      .insert([{ name, score }]);

    if (prodError || internalError) {
      setStatus('Submission failed. Please try again.');
      setStatusType('error');
      console.error(internalError || prodError);
    } else {
      setStatus('Submission successful!');
      setStatusType('success');
      setName('');
      setScore(0);
      setAge('');
      setEmail('');
      setPhone('');
      setCropCount(0);
      setBaleCount(0);
      setParkCount(0);
      setBonusCount(0);
      setBonusToggled(false);
      setToggledButton('');
    }
    setIsSubmitting(false);
    setTimeout(() => setStatus(''), 8000);
  };

  const incrementCropCount = () => {
    if (cropCount < 18) {
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
      setBonusCount(5);
    } else {
      setBonusCount(0);
    }
    setBonusToggled(!bonusToggled);
  };

  const incrementBaleCount = () => {
    if (baleCount < 5) {
      setBaleCount(baleCount + 1);
    }
  };

  const decrementBaleCount = () => {
    if (baleCount > 0) {
      setBaleCount(baleCount - 1);
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
{/* {          <div>
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
            </label>}
          </div> */}
          <button type="submit" disabled={isSubmitting}>Submit</button>
        </form>
        {status && <p className={`status-message ${statusType}`}>{status}</p>}
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
