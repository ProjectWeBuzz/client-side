import { useState } from "react";
import { Link } from "react-router-dom";

function Login () {

const [user, setUser] = useState({password: '', email: ''});

const handleChange = (e) => {
const name = e.target.name;
const value = e.target.value;
    
setUser(user => ({...user, [name]: value}))
};

  const handleLoginSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="loginContainer">
      <form onSubmit={handleLoginSubmit} className="loginForm">
      <div>
          <h1>Login</h1> 
          <br></br>

          <label>Email:</label>
          <br />
          <input type="email" name="email" value={user.email} onChange={handleChange} />
          <br />

          <label>Password:</label>
          <br />
          <input type="password" name="password" value={user.password} onChange={handleChange} />

          <br></br>
          <br></br>

        <button type="submit">Log In</button>
      </div>
      </form>
   

      <p>Don`t have an account?</p>
      <Link to={"/signup"}> Register here</Link>
      </div>
  )
}

export default Login;