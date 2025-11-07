import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Game.css';
import Cards from './Cards';

const Game = ({ formData }) => {
  const [attempts, setAttempts] = useState(0);
  const [gameDuration, setGameDuration] = useState(0);

  if(formData.paire < 3) formData.paire = 3;
  if(formData.paire > 14) formData.paire = 14;


  const [resolution, setResolution] = useState(0);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };


  return (
    <div className="game-container">
      <h2>Game Start / Finish</h2>
      <div className="game-infos">
        <p>Player Name: {formData.name}</p>
        <p>Number of Pairs: {formData.paire}</p>
        <p>Time: {formatTime(gameDuration)}</p>
        <p>Attempts: {attempts}</p>
        <p>Resolution: {resolution}% </p>
      </div>
      <Cards formData={formData} resolution={resolution} setResolution={setResolution} gameDuration={gameDuration} setGameDuration={setGameDuration} attempts={attempts} setAttempts={setAttempts} />
      <Link to="/" className="return">
        <i className="fas fa-home"></i>
      </Link>
    </div>
  );
}

export default Game;