// Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import smalllogo from './assets/logo_yellow.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-light bg-light">
      {isLoggedIn ? (
        <Link className="navbar-brand custom-logo-padding" to="/dashboard">
          <img src={smalllogo} alt="Votable Logo" style={{ height: "40px" }} />
        </Link>
      ) : (
        <Link className="navbar-brand custom-logo-padding" to="/">
          <img src={smalllogo} alt="Votable Logo" style={{ height: "40px" }} />
        </Link>
      )}

      <div className="dropdown custom-bars-padding">
        <button className="navbar-toggler btn" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
                aria-expanded="false">
          <FontAwesomeIcon icon={faBars}/> {/* Font Awesome bars icon */}
        </button>
        <ul className="dropdown-menu custom-dropdown-menu" aria-labelledby="dropdownMenuButton">
          {isLoggedIn ? (
              <>
                <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
              <li><Link className="dropdown-item" to="/dashboard/dictionary">Dictionary</Link></li>
              <li><Link className="dropdown-item" to="/dashboard/create_definable">Define A Word</Link></li>
              <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link className="dropdown-item" to="/login">Login</Link></li>
              <li><Link className="dropdown-item" to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

