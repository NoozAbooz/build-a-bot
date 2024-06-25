import { useEffect, useState } from 'react'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

import Leaderboard from './leaderboard/leaderboard'

import './App.css'

function App() {
  return (
    <div className="container">
      <div className="text-container">
        <span className="title-text">Calgary Stampede</span>
        <span className="subtitle-text">Build-a-Bot</span>
      </div>

      <Leaderboard />
      
      <footer className="footer">
        <p>
          © 2024 Western Mechatronics Robotics Club. Made with 💖 by
          <a href="https://github.com/NoozAbooz/build-a-bot" target="_blank" rel="noopener noreferrer">Nooz</a>
        </p>
      </footer>
    </div>
  );
}

export default App
