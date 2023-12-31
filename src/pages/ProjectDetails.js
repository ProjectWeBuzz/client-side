import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from 'react';


function ProjectDetails () {

    const [project, setProject] = useState({});

    const {projectId} = useParams();

    const storedToken = localStorage.getItem("authToken");

    const { user } = useContext(AuthContext);

    console.log('user._id:', user._id);
    console.log('project.owner._id:', project.owner);

    const getProject = () => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}`, {
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
            <br></br>
            <br></br>
            <img style={{width:"30px"}} src={project.image_url} alt={project.title} />
            <h3>{project.title}</h3>
            <br></br>
            <p>Description: {project.description}</p>
            <p>Tags: {project.tags}</p>
            <p>Social Links: {project.sociallinksproject}</p>
            <p>Creation Date: {project.creationdate}</p>
            <p>Private: {project.private ? 'Yes' : 'No'}</p>

            <br></br>
            <br></br>

            <Link to="/projects"><button className="round-button">Back to Projects</button></Link>

            <br></br>
            <br></br>

            {user._id === project.owner ? (
              <Link to={`/projects/edit/${projectId}`}><button className="round-button">Edit Project</button></Link>
              ) : (
              <p>You do not have permission to edit this project.</p>
            )}
        </div>
    );
}
 
export default ProjectDetails;
