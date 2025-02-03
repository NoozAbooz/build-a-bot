import { useState, useEffect } from 'react';
import './scoring.css';

const ScoringMenu = ({
  chickenCount, incrementChickenCount, decrementChickenCount,
  cowCount, incrementCowCount, decrementCowCount,
  togglePlotBonus, toggleParkBonus, toggleDoorBonus,
  clearPlotBonus, doorClosedBonus, parkBonus
}) => {

  return (
    <div className="square-container">
      <div className="square lightgray">
        <button onClick={incrementChickenCount}>+</button>
        <span>Scored Chickens (10 pts)</span>
        <span>{chickenCount}</span>
        <button onClick={decrementChickenCount}>-</button>
      </div>
      <div className="square green">
        <button onClick={incrementCowCount}>+</button>
        <span>Scored Green Cows? (10 pts)</span>
        <span>{cowCount}</span>
        <button onClick={decrementCowCount}>-</button>
      </div>
      <div className="square">
        <span>Bonuses</span>
        <div className="button-group">
          <button className={`${clearPlotBonus ? 'blue' : ''}`} onClick={togglePlotBonus}>Plot fully cleared 10 pts</button>
          <button className={`${doorClosedBonus ? 'red' : ''}`} onClick={toggleDoorBonus}>Door closed 10 pts</button>
          <button className={`${parkBonus ? 'yellow' : ''}`} onClick={toggleParkBonus}>Fully parked 10 pts</button>
        </div>
      </div>
    </div>
  );
};

export default ScoringMenu;