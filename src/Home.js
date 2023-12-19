// Home.js
// Import dependencies
import React from 'react';
import './Home.css';
import logo from './assets/logo.png';
import { Link } from 'react-router-dom';

function Home() {
    // Render landing page with logo and basic instructions
    return (
        <div className="home-container">
            <img src={logo} alt="Logo" className="home-logo" />
            <h1>Definable: Where Language Lives</h1>

            <p><Link to="/login">login</Link> or <Link to="/register">register</Link></p>
        </div>
    );
}

export default Home;
