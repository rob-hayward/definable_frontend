// Import dependencies
import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from './axiosConfig';
import { Link } from 'react-router-dom';
import AuthContext from './AuthContext';
import logo from './assets/logo.png';
import './Dashboard.css';

function Dashboard() {
    const { user: contextUser } = useContext(AuthContext);
    const [user, setUser] = useState(contextUser || { username: '' });

    // Fetch user data when dashboard is loaded
    useEffect(() => {
        axiosInstance.get('/api/v1/current_user/')
        .then(response => {
            setUser(response.data);
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
    }, []);

    // Render user dashboard
    return (
        <>
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo-image"/>
                <h2>Definable: Where Language Lives</h2>
            </div>

            <div className="dashboard-container">
                <div className="dashboard-options">
                    {/* Option 1 */}
                    <div className="option">
                        <h2>Read Dictionary</h2>
                        <p>The Definable Dictionary is freely available to anyone, anywhere, anytime. Please use it often.</p>
                        <Link to="/dashboard/dictionary">
                            <button>View Dictionary</button>
                        </Link>
                    </div>

                    {/* Option 2 */}
                    <div className="option">
                        <h2>Write Dictionary</h2>
                        <p>Denfinable is written by other people, just like you. Please help to create the best dictionary in existence.</p>
                        <Link to="/dashboard/create_definable">
                            <button>Define a Word</button>
                        </Link>
                    </div>
                </div>


            </div>
        </>
    );
}

export default Dashboard;
