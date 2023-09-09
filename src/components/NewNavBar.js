
import React from 'react';
import { useContext } from "react"; 
import { AuthContext } from "../context/auth.context";


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NewProfile() {

    const { isLoggedIn, user, logOutUser  } = useContext(AuthContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Logo WeHive</Navbar.Brand>

        {/* <Navbar.Brand href="/profile">Welcome, {user.username}</Navbar.Brand> */}
        {/* To display the name of the user that is logged in, we need to implement here the logic of the login,
        and maybe import the user/loggedin person */}
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        
          <Nav className="me-auto">

                {isLoggedIn ? (
                    <>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <Nav.Link href="/projects">The Hive</Nav.Link>
                    <Nav.Link onClick={logOutUser}>Logout</Nav.Link>
                    <span>{user && user.username}</span> 
                    </>
                    ) : (

                        <div className="navbar-buttons">
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/signup">Sign Up</Nav.Link>
                        </div>
                    )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NewProfile;