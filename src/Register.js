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
            const payload = {
                username,
                email,
                password1: password,
                password2: passwordConfirm,
            };
            // Update the URL to match Django's registration endpoint
            const response = await axiosInstance.post('/auth/registration/', payload, {
                headers: {
                    Authorization: undefined  // Remove Authorization header for registration request
                }
            });
            console.log(response.data);
            setMessage("Successfully registered!");
            setIsSuccess(true);
            login();

            navigate('/dashboard');

        } catch (error) {
            console.error("Error during registration:", error);
            if (error.response && error.response.data) {
                setMessage(error.response.data.detail || "An error occurred during registration. Please try again.");
            } else {
                setMessage("An unexpected error occurred. Please try again.");
            }
            setIsSuccess(false);
        }
    }

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
