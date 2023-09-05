import { useState, useEffect } from "react";
import axios from "axios"
import {Link} from "react-router-dom"

const API_URL = "http://localhost:5005";

function AllProjectsPage () {       

  const [projects, setProjects] = useState([]);
     
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
  }, [] );


    return (
      <div>
        <br></br>

        <h1>Projects</h1>
        <Link to="/create-project"><button className="round-button">Add New Project</button></Link>
        
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        {projects.map((project) => {
          return (
            <div key={project._id} className="project">
              <h3>{project.title}</h3>
              <img src={project.images} alt="projectimage"></img>
              <p>{project.description}</p>
              <Link to={`/projects/${project._id}`}>
                <h3>{project.title}</h3>
              </Link>
              <br></br>
              <br></br>
            </div>
          );
        })}
      </div>
    );
  


  };
 
  
  
 
export default AllProjectsPage;