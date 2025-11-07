import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import './Game.css';

export default function GameContent({ attempts, setAttempts, setResolution, formData, gameDuration, setGameDuration }) {
    const [shuffledEmojis, setShuffledEmojis] = useState(() => {
        const emojis = [
            { id: 1, emoji: "😀", match: false, flipped: false },
            { id: 2, emoji: "⚽️", match: false, flipped: false },
            { id: 3, emoji: "🏆", match: false, flipped: false },
            { id: 4, emoji: "🛼", match: false, flipped: false },
            { id: 5, emoji: "🚗", match: false, flipped: false },
            { id: 6, emoji: "🏅", match: false, flipped: false },
            { id: 7, emoji: "🚁", match: false, flipped: false },
            { id: 8, emoji: "🚀", match: false, flipped: false },
            { id: 9, emoji: "🌈", match: false, flipped: false },
            { id: 10, emoji: "🌍", match: false, flipped: false },
            { id: 11, emoji: "🤖", match: false, flipped: false },
            { id: 12, emoji: "☠️", match: false, flipped: false },
            { id: 13, emoji: "💻", match: false, flipped: false },
            { id: 14, emoji: "🧩", match: false, flipped: false }
        ];
        const selectedEmojis = emojis.slice(0, formData.paire);
        const duplicated = selectedEmojis.flatMap((e) => [e, e]);
        return [...duplicated].sort(() => Math.random() - 0.5);
    });

    const [flippedCards, setFlippedCards] = useState(Array(shuffledEmojis.length).fill(false));
    const [selectedCards, setSelectedCards] = useState([]);
    const [gameFinished, setGameFinished] = useState(false);

    const handleCardClick = (index, emojiId) => {
        if (flippedCards[index] || selectedCards.length === 2 || gameFinished) return;

        setFlippedCards((prev) =>
            prev.map((isFlipped, i) => (i === index ? !isFlipped : isFlipped))
        );

        const newSelection = [...selectedCards, { index, emojiId }];
        setSelectedCards(newSelection);

        if (newSelection.length === 2) {
            setAttempts((prev) => prev + 1);

            const [first, second] = newSelection;
            if (first.emojiId === second.emojiId) {
                const updated = [...shuffledEmojis];
                updated[first.index].match = true;
                updated[second.index].match = true;
                setShuffledEmojis(updated);
                setSelectedCards([]);
            } else {
                setTimeout(() => {
                    setFlippedCards((prev) =>
                        prev.map((isFlipped, i) =>
                            i === first.index || i === second.index ? false : isFlipped
                        )
                    );
                    setSelectedCards([]);
                }, 800);
            }
        }
    };

    useEffect(() => {
        const matched = shuffledEmojis.filter((card) => card.match).length / 2;
        const resolutionPercent = Math.round((matched / formData.paire) * 100);
        setResolution(resolutionPercent);

        if (matched === formData.paire) {
            setGameFinished(true);
        }
    }, [shuffledEmojis, formData.paire, setResolution]);

    //Save user data in localStorage
    const saveUserData = () => {
        const userData = {
            name: formData.name,
            pairs: formData.paire,
            attempts: attempts,
            time: gameDuration,
            resolution: Math.round((formData.paire / formData.paire) * 100)
        };

        const existingData = JSON.parse(localStorage.getItem("memoryGameData")) || [];
        existingData.push(userData);
        localStorage.setItem("memoryGameData", JSON.stringify(existingData));
    }

    // Timer effect
    useEffect(() => {
        const interval = setInterval(() => {
            setGameDuration((prev) => prev + 1);
        }, 1000);

        if (gameFinished) {
            saveUserData();
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [gameFinished]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="game-content">
            {!gameFinished ? (
                <div className="cards-grid">
                    {shuffledEmojis.map((card, index) => (
                        <div
                            key={index}
                            className="card"
                            onClick={() => handleCardClick(index, card.id)}
                        >
                            <div className={`card-inner ${flippedCards[index] ? "flipped" : ""}`}>
                                <div className="card-front">
                                    <p>?</p>
                                </div>
                                <div className="card-back">
                                    <p>{card.emoji}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="victory-message">
                    <h2>🎉 Félicitations ! 🎉</h2>
                    <p>Tu as terminé le jeu avec succès 🎯</p>
                    <p>Nombre de tentatives : {attempts}</p>
                    <p>Temps de jeu : {formatTime(gameDuration)}</p>
                    <Link to="/results">voir les résultats</Link>
                </div>
            )}
        </div>
    );
}