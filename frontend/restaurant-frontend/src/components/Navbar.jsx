// // src/components/Navbar.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // <-- Import auth hook
// import './Navbar.css';

// const Navbar = () => {
//   const { isAuthenticated, logout } = useAuth(); // <-- Use the context

//   return (
//     <nav className="navbar">
//       <Link to="/" className="nav-logo">
//         Tinnara??
//       </Link>
//       <div className="nav-links">
//         <Link to="/">Home</Link>
//         <Link to="/menu">Menu</Link>
//         {isAuthenticated ? (
//           <>
//             {/* <Link to="/profile">Logout</Link> */}
//             <Link to="/" onClick={logout} className="nav-logout-btn">
//                     Logout
//                     </Link>

//           </>
//         ) : (
//           <Link to="/login">Login</Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// src/components/Navbar.jsx
import React, { useState } from 'react'; // 1. Add useState
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 2. State to track menu

  // Function to close the menu when a link is clicked
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu(); // Also close menu on logout
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo" onClick={closeMenu}>
        Tinnara?(Did you Eat??)
      </Link>

      {/* 3. Hamburger button to toggle the menu state */}
      <button
        className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation"
      >
        <span className="hamburger"></span>
      </button>

      {/* 4. Add the 'active' class conditionally to show/hide menu */}
      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/menu" onClick={closeMenu}>Menu</Link>
        {isAuthenticated ? (
          <Link to="/" onClick={handleLogout} className="nav-logout-btn">
            Logout
          </Link>
        ) : (
          <Link to="/login" onClick={closeMenu}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;