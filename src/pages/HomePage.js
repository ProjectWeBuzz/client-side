import React from 'react';
import { Link } from "react-router-dom";


const HomePage = () => {
  return (
    <div className="home-container">
      <div className="sloganContainer">
        <h3>Find your art or tech buddy!</h3>
      </div>
      <div className="imageContainer">
        <img src="./connect-test-image.png" alt="imgTest" />
      </div>
    </div>
  );
};

export default HomePage;
