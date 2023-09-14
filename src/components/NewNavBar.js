import React from 'react';
import { useContext, useState } from "react"; 
import { AuthContext } from "../context/auth.context";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NewProfile() {

    const { isLoggedIn, user, logOutUser  } = useContext(AuthContext);
    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => {
      setExpanded(!expanded);
    };

    const handleLinkClick = () => {
      setExpanded(false); // Collapse the navbar when a link is clicked
    };

  return (
    
    
    <Navbar expand="lg" bg="body-tertiary" expanded={expanded} onToggle={handleToggle}>
      <Container>
      <div className="d-flex justify-content-between align-items-center w-100">
        <Navbar.Brand href="/">Logo WeHive</Navbar.Brand>

        {/* <Navbar.Brand href="/profile">Welcome, {user.username}</Navbar.Brand> */}
        {/* To display the name of the user that is logged in, we need to implement here the logic of the login,
        and maybe import the user/loggedin person */}
        
        
        <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
        </div>
        
        
        <Navbar.Collapse id="basic-navbar-nav">
        <div className="d-flex justify-content-end align-items-end w-100" style={{ flexGrow: 1, textAlign: 'right', paddingRight:"15px" }}>
          <Nav className="ml-auto">

                {isLoggedIn ? (
                    <>
                    <Nav.Link href={`/profile/${user.username}`}>Profile</Nav.Link>
                    <Nav.Link href="/projects">The Hive</Nav.Link>
                    <Nav.Link onClick={logOutUser}>Logout</Nav.Link>
                    <br></br>
                    <span style={{ flexGrow: 1, textAlign: 'center', paddingRight:"200px" }}>Welcome {user && user.username} !</span> 
                    </>
                    ) : (

                        <div className="navbar-buttons">
                            <Nav.Link href="/login" onClick={handleLinkClick}>Login</Nav.Link>
                            <Nav.Link href="/signup" onClick={handleLinkClick}>Sign Up</Nav.Link>
                        </div>
                    )}

          </Nav>
          </div>
        </Navbar.Collapse>
        </Container>
        
    </Navbar>
  );
}

export default NewProfile;