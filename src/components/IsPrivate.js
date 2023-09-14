import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
 

function IsPrivate( { children } ) {
  
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  console.log("isLoading:", isLoading);
  console.log("isLoggedIn:", isLoggedIn);
 
  // If the authentication is still loading 
  // if (isLoading) return <p>Loading your hive... 🐝 </p>;

  // if (isLoggedIn) { 
  //   return <Navigate to="/profile" />;
  // }

  return isLoading ? <p>Loading...</p> :!isLoggedIn ? <Navigate to = '/login' /> : children

//   if (!isLoggedIn) {
//     return <Navigate to="/" />;

//   } else {
//     return children;
//   }
}
 
export default IsPrivate;