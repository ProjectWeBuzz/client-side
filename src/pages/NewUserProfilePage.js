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



function KitchenSinkExample() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const navigateToProjectHive = () => {
        navigate('/project-hive');
    };

    const navigateToMyProjects = () => {
        navigate('/projects');
    };
    
    const navigateToMyColabs = () => {
        navigate('/colabs');
    };

    const navigateToMessageMe = () => {
        navigate('/message');
    };

    const navigateToInbox = () => {
        navigate('/inbox');
    };
    

  return (
   
    <div>
      {isLoggedIn ? (
        <>
        <Card style={{ width: '30rem', display:"flex", alignItems: "center"  }}>
            {user && user.photo ? (
            <Card.Img variant="top" src={user.photo} alt="userphoto" />
            ) : (
            <div className="placeholder-photo rounded-circle"></div>
            )}
            <Card.Body>
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                        <Image src="holder.js/171x180" roundedCircle />
                        </Col>
                    </Row>
                </Container>
                <Card.Title>{user ? user.username : 'Username'}</Card.Title>
                <Card.Text>Username</Card.Text>
                <Card.Text>Description of the user</Card.Text>
                <Card.Text>
                {user ? user.description : 'User description goes here.'}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <Button onClick={navigateToProjectHive} variant="dark">Projects Hive</Button>
                <br></br>
                <Button onClick={navigateToMyProjects} variant="dark">My Projects</Button>
                <br></br>
                <Button onClick={navigateToMyColabs} variant="dark">Colabs</Button>
                <br></br>
                <Button onClick={navigateToMessageMe} variant="dark">Message Me</Button>
                <br></br>
                <Button onClick={navigateToInbox} variant="dark">Inbox</Button>
            </ListGroup>
        </Card>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="text-center">
              
              <h1 className="mt-3">{user ? user.username : 'Username'}</h1>
              <p>{user ? user.description : 'User description goes here.'}</p>
            </div>
          </div>
        </div>
        </>
      ) : (
        <p>Please log in to view your profile.</p>
      )}

        
    </div>
  );
};

export default KitchenSinkExample;