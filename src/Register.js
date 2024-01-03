// Register.js
// Import dependencies
import React, { useState, useContext } from 'react';
import './Register.css';
import axiosInstance from './axiosConfig';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo_yellow.png';

function Register() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    // Local state management
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

       // Handle registration form submission
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const registrationPayload = {
            username,
            email,
            password1: password,
            password2: passwordConfirm,
        };

        // First, try to register the user
        await axiosInstance.post('/auth/registration/', registrationPayload, {
            headers: { Authorization: undefined }
        });

        // If registration is successful, immediately log the user in
        const loginPayload = {
            username,
            password,
        };

        const loginResponse = await axiosInstance.post('/auth/jwt/create/', loginPayload);

        // Store the token and update authentication state
        localStorage.setItem('access_token', loginResponse.data.access);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${loginResponse.data.access}`;
        login();  // Update the auth context to reflect that the user is logged in
        setMessage("Successfully registered and logged in!");
        setIsSuccess(true);
        navigate('/dashboard');

    } catch (error) {
        console.error("Error during registration or login:", error);
        if (error.response && error.response.data) {
            setMessage(error.response.data.detail || "An error occurred. Please try again.");
        } else {
            setMessage("An unexpected error occurred. Please try again.");
        }
        setIsSuccess(false);
    }
};


    // Render registration form
    return (
        <div className="login-form-container">
            <div className="login-form-content">
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="header-container">
                        <img src={logo} alt="Logo" className="logo"/>
                        <h2>Register</h2>
                    </div>
                    {message &&
                        <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`} role="alert">
                            {message}
                        </div>
                    }
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" value={username}
                               onChange={(e) => setUsername(e.target.value)} placeholder="Username" required/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email}
                               onChange={(e) => setEmail(e.target.value)} placeholder="Email" required/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password}
                               onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password Confirmation</label>
                        <input type="password" className="form-control" value={passwordConfirm}
                               onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="Confirm Password"
                               required/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="login-button">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
