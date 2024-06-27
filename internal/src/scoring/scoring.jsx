import React from 'react';
import './scoring.css';

const ScoringMenu = ({
  cropCount, incrementCropCount, decrementCropCount, toggleBonus, bonusToggled,
  baleCount, incrementBaleCount, decrementBaleCount, parkCount, setParkCountValue
}) => {
  return (
    <div className="square-container">
      <div className="square green">
        <button onClick={incrementCropCount}>+</button>
        <span>Crop</span>
        <span>{cropCount}</span>
        <button onClick={decrementCropCount}>-</button>
        <button className={`bonus-button ${bonusToggled ? 'toggled' : ''}`} onClick={toggleBonus}>Bonus +5pt</button>
      </div>
      <div className="square purple">
        <button onClick={incrementBaleCount}>+</button>
        <span>Hay Bale</span>
        <span>{baleCount}</span>
        <button onClick={decrementBaleCount}>-</button>
      </div>
      <div className="square yellow">
        <span>Park</span>
        <div className="button-group">
          <button onClick={() => setParkCountValue(2)}>Partial +2pt</button>
          <button onClick={() => setParkCountValue(5)}>Full +5pt</button>
          <button onClick={() => setParkCountValue(0)}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default ScoringMenu;
