import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Game.css';
import Cards from './Cards';

const Game = ({ formData }) => {
  const [gameDuration, setGameDuration] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGameDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const [attempts, setAttempts] = useState(0);

  return (
    <div className="game-container">
      <h2>Game Start / Finish</h2>
      <div className="game-infos">
        <p>Player Name: {formData.name}</p>
        <p>Number of Pairs: {formData.paire}</p>
        <p>Time: {formatTime(gameDuration)}</p>
        <p>Attempts: {}</p>
        <p>Resolution: 0%</p>
      </div>
      <Cards attempts={attempts} setAttempts={setAttempts} />
      <div className="return">
        <Link to="/">Return</Link>
      </div>
    </div>
  );
}

export default Game;
