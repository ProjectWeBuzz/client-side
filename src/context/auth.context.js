import React, { useState, useEffect } from "react";
import axios from "axios";

// const API_URL = "http://localhost:5005";
 
const AuthContext = React.createContext();
 
function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  //Token is stored locally => user keeps logged in  
  const storeToken = (token) => {      
    localStorage.setItem('authToken', token);
  }

  const authenticateUser = () => { 

    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');
    
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios.get(
        `${process.env.REACT_APP_API_URL}/auth/verify`, 
        { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => {
        const user = response.data;       
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);        
      })
      .catch((error) => {       
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);        
      });      
      
    } else {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);      
    };  
  }

  const removeToken = () => {                  
    localStorage.removeItem("authToken");
  }

  const logOutUser = () => {  
    removeToken();
    setIsLoggedIn(false);
    // and update the state variables    
    authenticateUser();
  }  
  
  useEffect(() => {                 
    authenticateUser()
  }, []);

  return (                                                
      <AuthContext.Provider 
        value={{ 
          isLoggedIn,
          isLoading,
          user,
          storeToken,
          authenticateUser,
          logOutUser
        }}
      >
      {props.children}
    </AuthContext.Provider>
  )
}
 
export { AuthProviderWrapper, AuthContext };