import React from 'react';

import { Link, useNavigate } from "react-router-dom";
const API_URL = "http://localhost:5005";

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="sloganContainer">
        <h3>Find your art or tech buddy!</h3>
      </div>
      <div className="imageContainer">
        <img src="./connect-test-image.png" alt="imgTest" />
      </div>
     <Link to="/projects">Find Projects to Collab</Link>
    </div>
  );
};

export default HomePage;
