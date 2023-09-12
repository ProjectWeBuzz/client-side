import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import {Link} from "react-router-dom"

import {useNavigate} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const API_URL = "http://localhost:5005";


function NewProjectDetails() {

    const navigate = useNavigate();
    const { projectId } = useParams();
    const storedToken = localStorage.getItem("authToken");

    const [project, setProject] = useState({});
    

    const navigateBack = () => {
      navigate('/projects');
    };

    const navigateToEditProject = () => {
      navigate(`/projects/edit/${projectId}`);
    }

   
    const getProject = () => {
        axios
          .get(`${API_URL}/api/projects/${projectId}`, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
              },
          })
          .then((response) => {
              const oneProject = response.data;
              console.log(response.data)
              setProject(oneProject);
            })
          .catch((error) => console.log(error));
      };

      useEffect(()=> {
        getProject();
      }, []);
      

  return (
    <>
    {(!project || !project.title) ? ( // Add this conditional check here
        <>
        {navigate('/projects')}
        </>
      ) : (
        <>
      <Carousel>
        {project && project.images ? (
          project.images.map((imageUrl, index) => (
            <Carousel.Item key={index}>
                      <img
                      className="d-block w-100"
                      src={imageUrl}
                      alt={project.title}
                      style={{ maxWidth: '100%', height: 'auto' }}
                      />
            </Carousel.Item>
        ))
      ) : (
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="placeholder-image-url.jpg" // Provide a placeholder image URL or handle this case as needed
            alt="Placeholder"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          </Carousel.Item>
        )}
      </Carousel>


    <Card style={{ width: 'auto', display:"flex", alignItems: "center", border:"none"}}>
      <br></br>
      <Card.Body>
        <Card.Title className="fs-4 text-center">{project.title}</Card.Title>
        <Card.Text className="display-4 text-center" style={{textSizeAdjust:"30px"}}>
          {project.description}
        </Card.Text>
        <Card.Text className="display-4 text-center" style={{ fontSize: "30px", textAlign: "center" }}>
         {project.date ? new Date(project.date.replace(/-/g, '/')).toLocaleDateString("en-US", { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
        </Card.Text>
        {project.tags.map((tag, index) => (
        <Card.Text key={index} className="display-4 text-center" style={{textSizeAdjust:"30px"}}>
          {tag}
        </Card.Text>
          ))}
          {project.sociallinksproject.map((link, index) => (
        <Card.Text key={index} className="display-4 text-center" style={{textSizeAdjust:"30px"}}>
          <Link href={link} target="_blank" rel="noopener noreferrer">
          {link}
          </Link>
        </Card.Text>
          ))}
      </Card.Body>
        <br></br>
        <br></br>

        <ListGroup className="list-group-flush">
            <Button style={{ width: 'auto', display:"flex", alignItems: "center", border:"none"}} variant="dark">Send message to Collab</Button>
              <br></br>
            <Button onClick={navigateToEditProject} variant="dark">Edit Project</Button>
        </ListGroup>
        
      
      <br></br>
        <Button onClick={navigateBack} variant="dark">Back to Projects</Button>
     

    </Card>
    </>
      )}
    </>
  );
}

export default NewProjectDetails;