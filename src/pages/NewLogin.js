import React from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';


import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
 
const API_URL = "http://localhost:5005";



function NewLogin() {


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
      // navigate('/profile');
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
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='email'/>
      <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
      <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>

      <div className="d-flex justify-content-between mx-3 mb-4">
      </div>

      <MDBBtn className="mb-4">Sign in</MDBBtn>

      <div className="text-center">
        <p>Not a member? <a href="#!">Register</a></p>

      </div>

    </MDBContainer>
  );
}

export default NewLogin;