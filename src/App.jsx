import { useEffect, useState } from 'react'
import Leaderboard from './leaderboard/leaderboard'

import './App.css'

function App() {
  return (
    <>
      <header className="header">
          <h1><span className="label">Calgary Stampede</span></h1>
          <span className="label2">Build-a-Bot</span>
      </header>

      <Leaderboard />

      <footer className="footer">
        <p>
          © 2024 Western Mechatronics Robotics Club. Made with 💖 by 
          <a href="https://github.com/NoozAbooz/build-a-bot" target="_blank" rel="noopener noreferrer"> Nooz</a>
        </p>
      </footer>
    </>
  );
}

// db testing
// function App() {
//     const [countries, setCountries] = useState([]);

//     useEffect(() => {
//       getCountries();
//     }, []);

//     async function getCountries() {
//       const { data } = await supabase.from("test").select();
//       setCountries(data);
//     }

//     return (
//       <ul>
//         {countries.map((country) => (
//           <li key={country.name}>{country.name}</li>
//         ))}
//       </ul>
//     );
// }

export default App
