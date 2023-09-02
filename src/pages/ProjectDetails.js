import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";


const API_URL = "http://localhost:5005";


function ProjectDetails () {

    const [project, setProject] = useState({});

    const {projectId} = useParams();

    const storedToken = localStorage.getItem("authToken");


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
        <div className="ProjectDetails">
            <h2>Project Details</h2>
            {/* <img style={{width:"30px"}} src={project.image_url} alt={project.title} /> */}
            <h3>{project.title}</h3>
            <p>Description: {project.description}</p>
            <p>Tags: {project.tags}</p>
            <p>Social Links: {project.sociallinksproject}</p>
            <p>Creation Date: {project.creationdate}</p>
            <p>Private: {project.IsPrivate ? 'Yes' : 'No'}</p>

            

            <Link to="/projects"><button>Back to Projects</button></Link>

            <Link to={`/projects/edit/${projectId}`}><button>Edit Project</button></Link>
        </div>
    );
}
 
export default ProjectDetails;