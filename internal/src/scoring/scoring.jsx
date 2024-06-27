import { useState, useEffect } from 'react';
import './scoring.css';

const ScoringMenu = ({
  cropCount, incrementCropCount, decrementCropCount, toggleBonus, bonusToggled,
  baleCount, incrementBaleCount, decrementBaleCount, parkCount, setParkCountValue
}) => {
  const [toggledButton, setToggledButton] = useState('');

  const handleParkButtonClick = (value, button) => {
    setParkCountValue(value);
    setToggledButton(button);
  };

  return (
    <div className="square-container">
      <div className="square green">
        <button onClick={incrementCropCount}>+</button>
        <span>Crop</span>
        <span>{cropCount}</span>
        <button onClick={decrementCropCount}>-</button>
		<div className="button-group">
          <button className={`${bonusToggled ? 'toggled' : ''}`} onClick={toggleBonus}>Bonus +5pt</button>
		</div>
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
		  <button
            className={toggledButton === 'partial' ? 'toggled' : ''}
            onClick={() => handleParkButtonClick(2, 'partial')}
          >
            Partial +2pt
          </button>
          <button
            className={toggledButton === 'full' ? 'toggled' : ''}
            onClick={() => handleParkButtonClick(5, 'full')}
          >
            Full +5pt
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
