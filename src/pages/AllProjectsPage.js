import { useState, useEffect } from "react";
import axios from "axios"
import {Link} from "react-router-dom"


// const API_URL = "http://localhost:5005";

function AllProjectsPage () {       

  const [projects, setProjects] = useState([]);
  const [searchTags, setSearchTags] = useState("");
  const storedToken = localStorage.getItem("authToken");
  
  const getAllProjects = () => {

    axios
      .get(`${REACT_APP_API_URL}/api/projects`, {
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


  const filterProjectsByTags = (project) => {
    if (!searchTags) {
      return true; // No tags are entered in the search bar, show all projects
    }
    const projectTags = project.tags.map((tag) => tag.toLowerCase());
    const searchTagsArray = searchTags.split(",");
    return searchTagsArray.some((tag) =>
      projectTags.includes(tag.trim().toLowerCase())
    );
  };

    return (
      <div>
        <br></br>

        <h1>Projects</h1>

        <input
        type="text"
        placeholder="Search by tags (comma-separated)"
        value={searchTags}
        onChange={(e) => setSearchTags(e.target.value)}
      />

        <br></br>
        <br></br>
        <br></br>

        <Link to="/create-project"><button className="round-button">Add New Project</button></Link>
        
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        {projects
        .filter(filterProjectsByTags)
        .map((project) => {

          if (project.isPrivate===false) {
          return (
            <div key={project._id} className="project">
              <h3>{project.title}</h3>
              <img src={project.images} alt="projectimage" style={{width:"300px"}}></img>
              <p>{project.description}</p>
              <Link to={`/projects/${project._id}`}>
                <h3>{project.title}</h3>
              </Link>
              <br></br>
              <br></br>
            </div>
          );
          }
        })}
      </div>
    );
  };
 
 
export default AllProjectsPage;