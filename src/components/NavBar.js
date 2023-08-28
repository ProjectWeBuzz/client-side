import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "../context/auth.context";



const NavBar = () => {

    const { isLoggedIn, user,logOutUser  } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-logo">Logo</div>
{/* 
      <Link to="/">
        <button className="round-button">Home</button>
      </Link> */}

      {isLoggedIn && (
        <>
        <Link to="/profile">Profile</Link>
          <Link to="/projects"><button>Projects</button></Link>
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>        
        </>
      )}

      {!isLoggedIn && (
      <div className="navbar-buttons">
        <Link to="/login"> <button className="round-button">Login</button></Link>
        <Link to="/signup"><button className="round-button">Sign Up</button></Link>
      </div>
      )}

    </nav>
  );
}

export default NavBar;
