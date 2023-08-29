import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
 
function IsPrivate( { children } ) {
  
  const { isLoggedIn, isLoading } = useContext(AuthContext);
 
  // If the authentication is still loading 
  if (isLoading) return <p>Loading your hive... 🐝 </p>;
 
  if (!isLoggedIn) {
    return <Navigate to="/login" />;

  } else {
    return children;
  }
}
 
export default IsPrivate;