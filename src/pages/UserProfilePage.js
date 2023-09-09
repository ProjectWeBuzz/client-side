import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../context/auth.context";
import { Link } from 'react-router-dom';
import axios from "axios";

const UserProfile = () => {
  const { isLoggedIn, user, setUser, logOutUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile/profile/${user.username}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn, setUser, user.username]);

  return (
    <div className="container">
      {isLoggedIn ? (
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4 text-center">
            <div className="text-center">
              <img
                src={user.hoto || "/avatar-icon-png-26.jpg"}
                alt="User's Photo"
                className="img-fluid rounded-circle profile-photo"
              />
              <h1 className="mt-3">{user.username || 'Username'}</h1>
              <p>{user.description}</p>
              <p>{user.email}</p>
              <p>{user.sociallinks}</p>
              <br></br>
              <Link to="/profile/update-profile" className="btn btn-primary btn-block mb-2">
                Edit Profile
              </Link>   <br></br>
            </div>
          </div>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}

      {isLoggedIn && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-6 col-lg-4 text-center">
            <Link to="/projects" className="btn btn-primary btn-block mb-2">Project Hive</Link><br />
            <Link to="/colabs" className="btn btn-primary btn-block mb-2">Colabs</Link><br />
            <Link to="/inbox" className="btn btn-primary btn-block mb-2">Messages</Link><br />
            <button className="btn btn-danger btn-block" onClick={logOutUser}>Log Out</button><br />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
