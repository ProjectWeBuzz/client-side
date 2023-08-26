import { useState } from "react";
import { Link } from "react-router-dom";

 
function SignUp() {

  const [user, setUser] = useState({username: '', email: '', password: ''});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    setUser(user => ({...user, [name]: value}))
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="signUpContainer">
      <form onSubmit={handleSignupSubmit} className="signUpForm">
      <div><br></br>
          <h2>Sign up</h2> <br></br>

          <label>Username</label>
          <br />
          <input type="text" name="username" value={user.username} onChange={handleChange} />
           <br />
          
          <label>Email:</label>
          <br />
          <input type="email" name="email" value={user.email} onChange={handleChange} />
          <br />

          <label>Password:</label>
          <br />
          <input type="password" name="password" value={user.password} onChange={handleChange} />

          <br></br>
          <br></br>
          <button  className="round-button2" type="submit">Sign Up</button>
      </div>
      </form>
   
 
      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
      </div>
  )
}
 
export default SignUp;