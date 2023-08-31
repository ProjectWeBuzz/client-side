import React, { useContext } from 'react';
import { AuthContext } from "../context/auth.context";
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="container">
      {isLoggedIn ? (
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="text-center">
              {user && user.photo ? (
                <img src={user.photo} alt="User's Profile" className="img-fluid rounded-circle" />
              ) : (
                <div className="placeholder-photo rounded-circle"></div>
              )}
              <h1 className="mt-3">{user ? user.username : 'Username'}</h1>
              <p>{user ? user.description : 'User description goes here.'}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}

      {isLoggedIn && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-6 col-lg-4 text-center">
            <Link to="/project-hive" className="btn btn-primary btn-block">Project Hive</Link>
            <Link to="/colabs" className="btn btn-primary btn-block">Colabs</Link>
            <Link to="/message" className="btn btn-primary btn-block">Message</Link>
            <button className="btn btn-danger btn-block" onClick={logOutUser}>Log Out</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;