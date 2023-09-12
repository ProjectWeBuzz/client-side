import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import React, { useContext } from 'react';
import { AuthContext } from "../context/auth.context";
import { Link } from 'react-router-dom';
import { useEffect } from 'react'; 

import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';



function DisplayProfile() {
  
  const { isLoggedIn, user, setUser, storedToken, logOutUser } = useContext(AuthContext);
  
  // useEffect(() => {

  // }, []);

  const navigate = useNavigate();

  const navigateToProjectHive = () => {
        navigate('/projects');
    };

    const navigateToMyProjects = () => {
        navigate('/myProjects');
    };
    
    const navigateToMyColabs = () => {
        navigate('/colabs');
    };

    const navigateToInbox = () => {
        navigate(`/messages/${user.username}`)
    };
    
    const navigateToUpdateProfile = () => {
        navigate(`/profile/update-profile/${user.username}`);
    }
    
  return (
   
    <div>
  
      {isLoggedIn ? (
        <>
        <Card style={{ width: '30rem' }}>
  <div className="d-flex justify-content-center align-items-center">
    {user && user.photo ? (
      <Card.Img variant="top" align="center" src={user.photo} alt="userphoto" />
    ) : (
      <div className="placeholder-photo rounded-circle"></div>
    )}
  </div>
  <Card.Body>
    <Container>
      <Row>
        <Col xs={12} md={3} className="d-flex justify-content-center">
          <Image src={user.photo || "/avatar-icon-png-26.jpg"} roundedCircle style={{ width: '50%', height: 'auto' }} />
        </Col>
      </Row>
    </Container>
    <br />
    <Card.Title className="text-center" style={{ fontSize: '24px' }}>{user ? user.username : 'Username'}</Card.Title>
    <br />
    <Card.Text>
      {user ? user.description : 'User description goes here.'}
    </Card.Text>
  </Card.Body>

  <ListGroup className="list-group-flush">
    <Button onClick={navigateToProjectHive} variant="dark">Projects Hive</Button>
    <br />
    <Button onClick={navigateToMyProjects} variant="dark">My Projects</Button>
    <br />
    <Button onClick={navigateToMyColabs} variant="dark">Colabs</Button>
    <br />
    <Button onClick={navigateToInbox} variant="dark">Inbox</Button>
    <br />
    <Button onClick={navigateToUpdateProfile} variant="dark">Settings</Button>
    <br />
    
  </ListGroup>
</Card>
        
        </>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default DisplayProfile;