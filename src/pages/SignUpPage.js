import React from 'react';
import {
  MDBContainer,
}
from 'mdb-react-ui-kit';

import Button from 'react-bootstrap/Button';

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
 
// const API_URL = "http://localhost:5005";


function SignUp() {

  const [user, setUser] = useState({username: '', email: '', password: ''});
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    setUser(user => ({...user, [name]: value}))
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
   
    const requestBody = { email: user.email, password: user.password, username: user.username };
 
    axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/profile/:username');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  return (
    <div className="signUpContainer">
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <form onSubmit={handleSignupSubmit} className="signUpForm">
      <div><br></br>
          <h2>Sign up</h2> <br></br>

          <label>Username:</label>
          <br />
          <input type="text" name="username" value={user.username} onChange={handleChange} />
           <br />
          
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
            Sign Up
          </Button>
      </div>
      </form>
      
      { errorMessage && <p className="error-message">{errorMessage}</p> }
 
      <br></br>
      <p>Already have an account?</p>
      <Link to={"/login"}> Login</Link>
      </MDBContainer>
      </div>
  );
}
 
export default SignUp;