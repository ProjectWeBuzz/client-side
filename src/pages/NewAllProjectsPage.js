
import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from '/public/avatar-icon-png-26.jpg';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


import { useState, useEffect } from "react";
import axios from "axios"
import {Link} from "react-router-dom"

const API_URL = "http://localhost:5005";


function AllProjects() {

    const [projects, setProjects] = useState([]);
    const [searchTags, setSearchTags] = useState("");
    const storedToken = localStorage.getItem("authToken");
    
    const getAllProjects = () => {

        axios
          .get(`${API_URL}/api/projects`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          })
          .then((response) => setProjects(response.data))
          .catch((error) => console.log(error));
      };

      useEffect(() => {
        getAllProjects();
      },[]);

      const filterProjectsByTags = (project) => {
        if (!searchTags) {
          return true; // No tags are entered in the search bar, show all projects
        }
        const projectTags = project.tags.map((tag) => tag.toLowerCase());
        const searchTagsArray = searchTags
            .split(",")
            .map((tag) => tag.trim().toLowerCase()); // Trim and lowercase tags
        return searchTagsArray.some((tag) =>
          projectTags.includes(tag)
        );
      };

  return (
    <>
    <Card style={{ width: 'auto', display:"flex", alignItems: "center", border:"none"}}>
    <Card.Title className="fs-1 text-center">Projects To Collab</Card.Title>
    
    <br></br>
    <br></br>

    {/* Seach bar is not WORKING!!! */}

    <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search by tags (comma-separated)"
              className=" mr-sm-2"
              value={searchTags}
              onChange={(e) => setSearchTags(e.target.value)}
            />
    </Col>

    {/* <input
        type="text"
        placeholder="Search by tags (comma-separated)"
        value={searchTags}
        onChange={(e) => setSearchTags(e.target.value)}
    /> */}

        <br></br>
        <br></br>
        <br></br>
    </Card>
            <Carousel>
            {projects
                .filter((project) => filterProjectsByTags && project.isPrivate === false) // Apply your filtering logic here
                .map((project) => (
                <Carousel.Item key={project._id}>
                    <Link to={`/projects/${project._id}`} style={{color:"black", textDecoration: 'none' }}>
                    <div style={{ maxWidth: '100%', maxHeight:'500px', paddingTop: '4%', position: 'relative' }}>
                    <img
                    className="d-block w-100"
                    src={project.images[0]}
                    alt={"Imagehere"}
                    style={{ position: 'relative', width: '100%', height: '50%', objectFit: 'cover' }}
                    />
                    </div>
                    <Carousel.Caption>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    </Carousel.Caption>
                    </Link>
                </Carousel.Item>
                ))}
                
            </Carousel>

            <br></br>
            <br></br>

            <Card style={{ width: 'auto', display:"flex", alignItems: "center", border:"none"}}>
            <Button variant="dark"> <Link to="/create-project" style={{color:"white"}}>Add New Project</Link></Button>
            </Card>
    </>
  );
}

export default AllProjects;