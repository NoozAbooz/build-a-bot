import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success' or 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [cropCount, setCropCount] = useState(0);
  const [baleCount, setBaleCount] = useState(0);
  const [parkCount, setParkCount] = useState(0);

  useEffect(() => {
    const totalScore = cropCount + baleCount + parkCount;
    setScore(totalScore);
  }, [cropCount, baleCount, parkCount]);

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
    }
    setIsSubmitting(false);
    // Clear status message after n seconds
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

  return (
    <div className="app-container">
      <div className="volunteer-score-submission">
        <h1>Score Submission</h1>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" disabled={isSubmitting}>Submit</button>
        </form>
        {status && <p className={`status-message ${statusType}`}>{status}</p>}
      </div>
      <div className="square-container">
        <div className="square green">
          <button onClick={incrementCropCount}>+</button>
          <span>Crop</span>
          <span>{cropCount}</span>
          <button onClick={decrementCropCount}>-</button>
        </div>
        <div className="square purple">
          <button onClick={incrementBaleCount}>+</button>
          <span>Bale</span>
          <span>{baleCount}</span>
          <button onClick={decrementBaleCount}>-</button>
        </div>
        <div className="square yellow">
          <span>Park</span>
          <div className="button-group">
            <button onClick={() => setParkCountValue(1)}>Partial</button>
            <button onClick={() => setParkCountValue(4)}>Full</button>
            <button onClick={() => setParkCountValue(0)}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
