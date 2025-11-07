import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = ({ formData, setFormData }) => {
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/game");
    };

    return (
        <div className="home">
            <h2>Bienvenue sur le jeu de mémoire</h2>
            <p>Testez votre mémoire en associant des paires de cartes!</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">Entrez votre nom: </label>
                <input
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    id="userName"
                    name="name"
                />

                <label htmlFor="paires">Nombre de paires (3 à 14): </label>
                <input
                    value={formData.paire}
                    onChange={handleChange}
                    type="number"
                    id="paires"
                    name="paire"
                    min={3}
                    max={14}
                />

                <button type="submit">
                    Start <i className="fa-solid fa-play"></i>
                </button>
            </form>
        </div>
    );
};

