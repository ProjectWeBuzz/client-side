
import React from 'react';

const ErrorPage = ({ errorCode, errorMessage }) => {
  return (
    <div>
      <h1>Error {errorCode}</h1>
      <p>{errorMessage}</p>
      <p>Sorry, something went wrong. Please try again later or contact support.</p>
      {/* You can add additional content or links here as needed */}
    </div>
  );
};

export default ErrorPage;