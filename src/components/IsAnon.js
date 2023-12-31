
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAnon( { children } ) {
  
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);

  if (isLoading) return <p>Loading ...</p>;

  if (isLoggedIn) {
       
    return <Navigate to={`/profile/${user.username}`} />;
  } else {
   
    return children; 
  }
}

export default IsAnon;
