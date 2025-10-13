// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- Import auth hook
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // <-- Use the context

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        Tinnara??
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        {isAuthenticated ? (
          <>
            {/* <Link to="/profile">Logout</Link> */}
            <Link to="/" onClick={logout} className="nav-logout-btn">
                    Logout
                    </Link>

          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;