import React, { useState, useContext } from 'react';
import './Login.css';
import axiosInstance from './axiosConfig';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo_yellow.png';

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                username,
                email,
                password
            };
            const response = await axiosInstance.post('/auth/jwt/create/', payload);
            console.log(response.data);
            localStorage.setItem('access_token', response.data.access);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            setMessage("Successfully logged in!");
            setIsSuccess(true);
            login();

            navigate('/dashboard');

        } catch (error) {
            console.error("Error during login:", error.response.data);
            if (error.response && error.response.data) {
                setMessage(error.response.data.detail || "An error occurred during login. Please try again.");
            } else {
                setMessage("An unexpected error occurred. Please try again.");
            }
            setIsSuccess(false);
        }
    };

    return (
        <div className="login-form-container">
            <div className="login-form-content">
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="header-container">
                        <img src={logo} alt="Logo" className="logo"/>
                        <h2>Login</h2>
                    </div>
                    {message &&
                        <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`} role="alert">
                            {message}
                        </div>
                    }
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="login-button">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
