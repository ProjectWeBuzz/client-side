import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { AuthContext } from '../context/auth.context'

const UserSettings = () => {
  const { user } = useContext( AuthContext ) ;
  const [email, setNewEmail] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState(''); 
  const [password, setNewPassword] = useState('');
  const [description, setNewDescription] = useState('');
  // const [photo, setNewPhoto] = useState(null);

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {                     
    e.preventDefault();
    const requestBody = { email, password, description };
    const storedToken = localStorage.getItem("authToken");

    axios
    .post(`${process.env.REACT_APP_API_URL}/profile/update-profile/${user.username}`, requestBody,
    { headers: { Authorization: `Bearer ${storedToken}`} } )
    .then((response) => {
      setUpdatedEmail(response.data.updatedEmail);
      console.log(response);
    });
    
};

  return (
    <div className="container">

      <h1>Edit Profile</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="email">New Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">User Intro:</label>
          <textarea
            className="form-control"
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setNewDescription(e.target.value)}
          ></textarea>
        </div>
        
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
      {updatedEmail && (
        <div className="alert alert-success mt-3">
          Updated Email: {updatedEmail}
        </div>
      )}
    </div>
  );
};

export default UserSettings;
