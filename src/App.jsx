import { useEffect, useState } from 'react'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Leaderboard from './leaderboard/leaderboard'
import TryhardLeaderboard from './leaderboard/tryhard'

import './App.css'

import logo1 from './assets/logo1.png'
import logo2 from './assets/logo2.png'
import stampede from './assets/stampede.png'

function App() {
  return (
    <div className="container">
      <div className="title-container">
        <BrowserView>
          <img src={stampede} alt="Logo 1" className="logo1" />
        </BrowserView>

        <div className="text-container">
          <span className="title-text">Leaderboard</span>
          <span className="subtitle-text">CS Build-a-Bot</span>
        </div>

        <BrowserView>
        <img src={logo1} alt="Logo 2" className="logo2" />
        </BrowserView>
      </div>

      <Router>
        <Routes>
          <Route path="/" element={<Leaderboard />} />
          <Route path="/tryhard" element={<TryhardLeaderboard />} />
        </Routes>
      </Router>

      <footer className="footer">
        <p>
          © 2025 Western Mechatronics Robotics Club. Made with 💖 by
          <a href="https://github.com/NoozAbooz/build-a-bot" target="_blank" rel="noopener noreferrer">NoozAbooz</a>
        </p>
      </footer>
    </div>
  );
}

export default App
