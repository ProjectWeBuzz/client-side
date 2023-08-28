import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "../context/auth.context";



const NavBar = () => {

    const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-logo">Logo</div>
      {isLoggedIn && (
        <>
        <Link to="/profile">Profile</Link>
          <Link to="/projects">
            <button>Projects</button>
          </Link>        
          <button>Logout</button>
        </>
      )}

      {!isLoggedIn && (
      <div className="navbar-buttons">
        <Link to="/login">Login</Link>
        <Link to="/signup" className="round-button">
        Sign Up
        </Link>
      </div>
      )}
    </nav>
  );
};

export default NavBar;
