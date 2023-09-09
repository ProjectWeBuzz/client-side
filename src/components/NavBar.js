import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from "react"; 
import { AuthContext } from "../context/auth.context";
import UserProfile from '../pages/UserProfilePage';



const NavBar = () => {

    const { isLoggedIn, user, logOutUser  } = useContext(AuthContext);

  return (

    <nav className="navbar">
      <div className="navbar-logo">Logo</div>

      {isLoggedIn ? (
        <>
        <Link to="/profile">Profile </Link>
          <Link to="/projects">Project Hive </Link>
          {/* <button className="round-button" onClick={logOutUser}>Logout</button> */}
                
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
