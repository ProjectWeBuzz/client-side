import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';

import { useContext } from 'react';
import { AuthContext } from "../context/auth.context";
import { Link } from 'react-router-dom';
// import {useParams} from "react-router-dom";

import Button from 'react-bootstrap/Button';
// import {useNavigate} from 'react-router-dom';
// import Col from 'react-bootstrap/Col';
// import Container from 'react-bootstrap/Container';
// import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import { useState, useEffect } from 'react';
import axios from "axios";

const API_URL = "http://localhost:5005";
// const storedToken = localStorage.getItem("authToken");

function MyProjectsPage() {

    const { user } = useContext(AuthContext);
    const storedToken = localStorage.getItem("authToken");
    const [projects, setProjects] = useState([]);

    // console.log(projects
    //     .filter((project) => (user._id === project.owner)));
    

    console.log(user._id);
    console.log(projects);

    const getAllProjects = () => {

      axios
        .get(`${process.env.REACT_APP_API_URL}/api/projects`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => setProjects(response.data))
        .catch((error) => console.log(error));
    };

    useEffect(() => {
      getAllProjects();
    }, []);


    return (
      
      <div>
      <br></br>
      <br></br>
      <h3 style={{textAlign:"center"}}>My Projects</h3>
      <br></br>
      <br></br>
          <Row>
          {projects
            .filter((project) => (user._id === project?.owner?._id) )
            .map((project) => (
          <Card key={project._id} style={{width: 'auto', display:"flex", alignItems: "center", border:"none", paddingLeft:"50px"}}>
            <Link to={`/projects/${project._id}`} style={{color:"black", textDecoration: 'none' }}>
              <Card.Img variant="top" src={project.images[0]} style={{width:'100px', height:"auto"}}/>
            </Link>
            <Card.Body style={{width: '100px', alignItems: "center", border:"none"}}>
              <Card.Title>{project.title}</Card.Title>
            </Card.Body>
          </Card>
            ))}
          </Row>
          
        <Button variant="dark"> <Link to={`/profile/:${user.username}`} style={{color:"white"}}>Profile</Link></Button>
        <br></br>
        <br></br>
        <Button variant="dark"> <Link to="/create-project" style={{color:"white"}}>Add New Project</Link></Button>

      </div>
      
    );
  };
  


  export default MyProjectsPage;
