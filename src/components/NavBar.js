import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Logo</div>
      <div className="navbar-buttons">
        <Link to="/login">Login</Link>
        <Link to="/signup" className="round-button">
        Sign Up
        </Link>
        
      </div>
    </nav>
  );
};

export default NavBar;
