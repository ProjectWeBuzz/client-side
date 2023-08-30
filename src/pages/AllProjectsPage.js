import { useState, useEffect } from "react";

import CreateProject from "../components/CreateProject"
 
function AllProjectsPage (props) {                    
  const [projects, setProjects] = useState([]);
 
  // This effect depends on `props.projects`.
  // It will run on the initial render and every time
  // when the `props.projects` updates.
  useEffect(() => {
    setProjects(props.projects);                  
  }, [props.projects]);       
  
  const AddNewProject = (project) => {
    const updatedProjects = [...projects, project];
 
    setProjects(updatedProjects);
  };
 
  
  return (
    <div>
      <h1>Projects</h1>
      <CreateProject addProject={AddNewProject}/>
      {projects.map((project) => {
        return (
          <div key={project._id} className="project">
            <h3>{project.name}</h3>
            <p>{project.technologies}</p>
          </div>
        );
      })}
    </div>
  );
}
 
export default AllProjectsPage;