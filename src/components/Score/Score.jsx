import './Score.css';
import { Link } from 'react-router-dom';
import React from 'react';
const Score = () => {
    const getUserScores = () => {
        // get user scores in localStorage
        const scores = localStorage.getItem('memoryGameData');
        return scores ? JSON.parse(scores) : [];
    }

    const userScore = getUserScores();
    console.log(userScore);

    return (
        <div className="score container">
            <h2>Scores des joueurs</h2>
            <div className="score-table-container">
                <table className="score-table">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Paires</th>
                            <th>Temps</th>
                            <th>Tentatives</th>
                            <th>Résolution (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userScore.map((score, index) => (
                            <tr key={index}>
                                <td>{score.name}</td>
                                <td>{score.pairs}</td>
                                <td>{score.time}</td>
                                <td>{score.attempts}</td>
                                <td>{score.resolution}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/">
                    <div className="return">
                        <i className="fas fa-home"></i>
                    </div>
                </Link>
            </div>

        

        </div >
     );
}

export default Score;