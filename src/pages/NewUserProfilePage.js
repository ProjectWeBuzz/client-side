import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import React, { useContext } from 'react';
import { AuthContext } from "../context/auth.context";
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
// import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
// import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import { useState, useEffect } from 'react';
import axios from "axios";

const API_URL = "http://localhost:5005";
const storedToken = localStorage.getItem("authToken");



function NewUserProfilePage() {
  
  const { isLoggedIn, user, setUser, storedToken, logOutUser } = useContext(AuthContext);
  
  const navigate = useNavigate();



  const navigateToProjectHive = () => {
        navigate('/projects');
    };

    const navigateToMyProjects = () => {
        navigate('/myProjects');
    }
    
    const navigateToInbox = () => {
        navigate(`/messages/${user.username}`)
    };

    const navigateToEditProfile = () => {
      navigate('/profile/update-profile')
    }

    
  
    
      useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile/${user.username}`);
            setUser(response.data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
      });
    

    const navigateToUpdateProfile = () => {
        navigate(`/profile/update-profile/${user.username}`);
    }
    

  return (
    
    <div>
    <br></br>
      {isLoggedIn && user ? (
        <>
        <Card style={{ width: 'auto', display:"flex", alignItems: "center", border:"none"}}>
            {user && user.photo ? (
            <Card.Img variant="top" src={user.photo} alt="User's Photo" className="img-fluid rounded-circle profile-photo"/>
            ) : (
            <div className="placeholder-photo rounded-circle">
            <Card.Img style={{width:"150px"}} variant="top" src={"/avatar-icon-png-26.jpg"} alt="User's Photo" className="img-fluid rounded-circle profile-photo"/>
            </div>
            )}
            <br></br>
            <Card.Body>
                <Card.Text className="display-4 text-center" style={{textSizeAdjust:"30px"}}>{user.username || 'Username Here'}</Card.Text>
                <br></br>
                <Card.Title className="fs-4 text-center">{user.description || 'Username Description Here'}</Card.Title>
                <br></br>
                <Card.Title className="fs-5 text-center">{user.email || 'User Email Here'}</Card.Title>
            </Card.Body>
            <br></br>
            <ListGroup className="list-group-flush">

                <Button onClick={navigateToEditProfile} variant="dark">Edit Profile</Button>
                <br></br>
                <Button onClick={navigateToProjectHive} variant="dark">Projects Hive</Button>
                <br></br>
                <Button onClick={navigateToMyProjects} variant="dark">My Projects</Button>
                <br></br>
                <Button onClick={navigateToInbox} variant="dark">Messages</Button>
                <br></br>
                <Button onClick={logOutUser} variant="danger">Logout</Button>

            </ListGroup>
        </Card>

        <br></br>
        <br></br>
        
        </>
      ) : (
        <p>Please log in to view your profile.</p>
      )}

    </div>
  );
  };


export default NewUserProfilePage;

