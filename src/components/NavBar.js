import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from "react"; 
import { AuthContext } from "../context/auth.context";




const NavBar = () => {

    const { isLoggedIn, user, logOutUser  } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-logo">Logo</div>

      {isLoggedIn ? (
        <>
        <Link to="/profile"><button className="round-button">Profile</button></Link>
          <Link to="/projects"><button className="round-button">Project Hive</button></Link>
          <button className="round-button" onClick={logOutUser}>Logout</button>
          <span>{user && user.username}</span>        
        </>
      ) : (
      

         <div className="navbar-buttons">
            <Link to="/login"> <button className="round-button">Login</button></Link>
            <Link to="/signup"><button className="round-button">Sign Up</button></Link>
          </div>
      )}
    </nav>
)}

export default NavBar;
