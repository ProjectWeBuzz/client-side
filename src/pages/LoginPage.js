import React from 'react';
import {
  MDBContainer,
}
from 'mdb-react-ui-kit';

import Button from 'react-bootstrap/Button';


import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
 
const API_URL = "http://localhost:5005";


function Login () {

const [user, setUser] = useState({email: '', password: '' });
const [errorMessage, setErrorMessage] = useState(undefined);
const navigate = useNavigate();

const { authenticateUser, logOutUser, isLoggedIn, storeToken } = useContext(AuthContext);
 

const handleChange = (e) => {
const name = e.target.name;
const value = e.target.value;
    
setUser(user => ({...user, [name]: value}))
};


const handleLoginSubmit = (e) => {
  e.preventDefault();
  const requestBody = {
    email: user.email,
    password: user.password
  };


  axios.post(`${API_URL}/auth/login`, requestBody)
    .then((response) => {
      const authToken = response.data.authToken;
      storeToken(authToken);
      authenticateUser(); 
      navigate('/profile/:username');
    })
    .catch((error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    });
};

  const handleLogout = () => {
    logOutUser();
  };

  return (

    <div className="loginContainer">
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      {isLoggedIn ? (
        <button onClick={handleLogout}>Log Out</button>
      ) : (
      <form onSubmit={handleLoginSubmit} className="loginForm">
      <div><br></br>
          <h2>Login</h2> 
          <br></br>
          

          <label>Email:</label>
          <br />
          <input type="email" name="email" value={user.email} onChange={handleChange} />
          <br />

          <label>Password:</label>
          <br />
          <input type="password" name="password" value={user.password} onChange={handleChange} />

          <br></br>
          <br></br>

          <Button variant="dark" type="submit">
            Login
          </Button>
          <br></br>
        
      </div>
      
      </form>
      
      )}
       { errorMessage && <p className="error-message">{errorMessage}</p> }
    
       <br></br>
      <p>Don't have an account yet?</p>
      <Link to={"/signup"}>Sign Up</Link>
      </MDBContainer>
    </div>
    
  );
}

export default Login;