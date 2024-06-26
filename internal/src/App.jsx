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
  const [statusType, setStatusType] = useState(''); // 'success' or 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
      setStatusType('error');
      console.error(internalError || prodError);
    } else {
      setStatus('Submission successful!');
      setStatusType('success');
      setName('');
      setScore('');
      setAge('');
      setEmail('');
      setPhone('');
    }
    setIsSubmitting(false);
    // Clear status message after n seconds
    setTimeout(() => setStatus(''), 8000);
  };

  return (
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
            Score (only integers): <span className="required">*</span>
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
        <button type="submit" disabled={isSubmitting}>Submit</button>
      </form>
      {status && <p className={`status-message ${status ? 'fade-out' : ''} ${statusType}`}>{status}</p>}
    </div>
  );
};

export default App;