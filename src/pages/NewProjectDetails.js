import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';

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
      }, [] );

  return (

<>
      <Carousel>
          <Carousel.Item key={project._id}>
                    <img
                    className="d-block w-100"
                    src={project.images}
                    alt={project.title}
                    />
          </Carousel.Item>
      </Carousel>


    <Card style={{ width: 'auto', display:"flex", alignItems: "center", border:"none"}}>
      <br></br>
      <Card.Body>
        <Card.Title className="fs-4 text-center">{project.title}</Card.Title>
        <Card.Text className="display-4 text-center" style={{textSizeAdjust:"30px"}}>
          {project.description}
        </Card.Text>
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
  );
}

export default NewProjectDetails;