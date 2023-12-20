// app.js
// Import dependencies and components
import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthContext from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import { configureAxios } from './axiosConfig';


import Home from './Home';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import CreateDefinable from './CreateDefinable';
import DefinableDictionary from './DefinableDictionary';
import DefinableDetail from './DefinableDetail';

// Configure axios instance
configureAxios();

function App() {
    // Manage authentication state using local storage
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('access_token');
    };

    // Render application with authentication context and routing
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            <Router>
                <Navbar isLoggedIn={isAuthenticated} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<ProtectedRoute />}>
                        {/* Assuming ProtectedRoute renders its children, the Dashboard will be nested inside it */}
                        <Route index element={<Dashboard />} />
                        <Route path="create_definable" element={<CreateDefinable />} />
                    </Route>
                    <Route path="/dashboard/dictionary" element={<ProtectedRoute />}>
                        <Route index element={<DefinableDictionary />} />
                    </Route>
                    <Route path="/dashboard/definable_detail/:id" element={<ProtectedRoute />}>
                        <Route index element={<DefinableDetail />} />
                    </Route>
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
