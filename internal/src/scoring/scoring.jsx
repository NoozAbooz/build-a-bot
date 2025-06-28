import { useState, useEffect } from 'react';
import './scoring.css';

const ScoringMenu = ({
  cropCount, incrementCropCount, decrementCropCount, toggleBonus, bonusToggled,
  baleCount, incrementBaleCount, decrementBaleCount, 
  pingPongCount, incrementPingPongCount, decrementPingPongCount,
  parkCount, setParkCountValue,
  toggledButton, setToggledButton
}) => {

  const handleParkButtonClick = (value, button) => {
    setParkCountValue(value);
    setToggledButton(button);
  };

  return (
    <div className="square-container">
      <div className="square green">
        <button onClick={incrementCropCount}>+</button>
        <span>Green (4pt)</span>
        <span>{cropCount}</span>
        <button onClick={decrementCropCount}>-</button>
		<div className="button-group">
          <button className={`${bonusToggled ? 'toggled' : ''}`} onClick={toggleBonus}>Bonus +15pt</button>
		</div>
      </div>

      <div className="square purple">
        <button onClick={incrementBaleCount}>+</button>
        <span>Purple (2pt)</span>
        <span>{baleCount}</span>
        <button onClick={decrementBaleCount}>-</button>
      </div>

      <div className="square orange">
        <button onClick={incrementPingPongCount}>+</button>
        <span>Orange (10pt)</span>
        <span>{pingPongCount}</span>
        <button onClick={decrementPingPongCount}>-</button>
      </div>

      <div className="square yellow">
        <span>Park/Service</span>
        <div className="button-group">
		  <button
            className={toggledButton === 'park' ? 'toggled' : ''}
            onClick={() => handleParkButtonClick(10, 'park')}
          >
            Park +10pt
          </button>
          <button
            className={toggledButton === 'service' ? 'toggled' : ''}
            onClick={() => handleParkButtonClick(20, 'service')}
          >
            Service +20pt
          </button>
          <button
            onClick={() => handleParkButtonClick(0, '')}
          >
            Reset
          </button>
        </div>
      </div>

    </div>
  );
};

export default ScoringMenu;
