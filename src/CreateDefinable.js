import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import axiosInstance from './axiosConfig';
import './CreateDefinable.css';
import blackDotsImage from './assets/black_dots.png';

function CreateDefinable() {
    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();  // Initialize the useNavigate hook

    const handleWordChange = (event) => {
        setWord(event.target.value);
    };

    const handleDefinitionChange = (event) => {
        setDefinition(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axiosInstance.post('/api/v1/create_definable/', {
            word: word,
            definition_text: definition,
        })
        .then(response => {
            navigate('/dashboard/definable_detail/' + response.data.id);  // Redirect to detail view using navigate.
        })
        .catch(error => {
            setMessage('An error occurred: ' + (error.response?.data.detail || error.message));
        });
    };

    return (
        <div>
            <h2>Define a Word</h2>
            <div className="form-container">
                <div className="form-content">
                    {message && <div className="error-message">{message}</div>}
                    <form onSubmit={handleSubmit} className="create-definable-form">
                        <input
                            type="text"
                            name="word"
                            value={word}
                            onChange={handleWordChange}
                            placeholder="Enter your word here."
                            required
                        />
                        <img src={blackDotsImage} alt="Black Dots" className="black-dots-image" />
                        <textarea
                            name="definition_text"
                            value={definition}
                            onChange={handleDefinitionChange}
                            placeholder="Enter your definition here."
                            required
                        ></textarea>
                        <button type="submit">Write to Dictionary</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateDefinable;
