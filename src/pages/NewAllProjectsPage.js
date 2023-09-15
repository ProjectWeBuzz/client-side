
import { useState, useEffect } from "react";
import axios from "axios"
import {Link} from "react-router-dom"

import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
import Select from "react-select";


const API_URL = "https://project-wehive.onrender.com";


function AllProjects() {

    const [projects, setProjects] = useState([]);
    const storedToken = localStorage.getItem("authToken");
    const [selectedTags, setSelectedTags] = useState([]);
    const availableTags = [
        { value: "Tech", label: "Tech" },
        { value: "Frontend", label: "Frontend" },
        { value: "Backend", label: "Backend" },
        { value: "Paintings", label: "Paintings" },
      ];
    
      const handleTagChange = (selectedOptions) => {
        setSelectedTags(selectedOptions);
      };

      const filterProjectsByTags = (project) => {
        if (!selectedTags.length) {
          return true; // No tags are selected, show all projects
        }
        const projectTags = JSON.parse(project.tags[0]).map((tag) => tag.toLowerCase());
        const selectedTagValues = selectedTags.map((tag) => tag.value.toLowerCase());

        return selectedTagValues.every((selectedTagValue) =>
            projectTags.includes(selectedTagValue)
        );
      };
    
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

  return (
    <>
    <Card style={{ width: 'auto', display:"flex", alignItems: "center", border:"none"}}>
    <Card.Title className="fs-1 text-center">Projects To Collab</Card.Title>
    
    <br></br>
    <br></br>

    {/* Seach bar is not WORKING!!! */}

    <Col xs="auto">
        <Select 
        isMulti
        options={availableTags}
        value={selectedTags}
        onChange={handleTagChange}
        placeholder="Select tags..."
        maxMenuHeight={100} // Adjust the height as needed
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
                .filter((project) => project.isPrivate === false)
                .filter((project) => !selectedTags.length || filterProjectsByTags(project))
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