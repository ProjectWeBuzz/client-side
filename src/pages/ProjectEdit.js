// src/pages/EditProjectPage.js

import { useState, useEffect } from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";

const API_URL = "http://localhost:5005";

function EditProjectPage(props) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState(["tag1", "tag2"]);
  const [sociallinksproject, setSociallinksproject] = useState(["link1", "link2"]);
  const [creationdate, setCreationdate] = useState("");
  const [IsPrivate, setIsPrivate] = useState(true);


  const tagLimit = tags.length >= 5;


  const {projectId} = useParams();  
  const navigate = useNavigate();


  const handleCheckboxChange = (e) => {
    setIsPrivate(e.target.checked);
  };


  useEffect(() => {                                  
    axios
      .get(`${API_URL}/api/projects/${projectId}`)
      .then((response) => {
        /* 
          We update the state with the project data coming from the response.
          This way we set inputs to show the actual title and description of the project
        */
        const oneProject = response.data;
        setTitle(oneProject.title);
        setDescription(oneProject.description);
        setTags(oneProject.tags);
        setSociallinksproject(oneProject.sociallinksproject);
        setCreationdate(oneProject.creationdate);
        setIsPrivate(oneProject.IsPrivate);

      })
      .catch((error) => console.log(error));
    
  }, [projectId]);


  const handleFormSubmit = (e) => {                     
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { title, description, tags, sociallinksproject, creationdate, IsPrivate };

    axios
    .put(`${API_URL}/api/projects/${projectId}`, requestBody)
    .then((response) => {
      // Once the request is resolved successfully and the project
      // is updated we navigate back to the details page
      navigate(`/projects/${projectId}`)
    });
};


const deleteProject = () => {                    

    const userConfirmed = window.confirm("Are you sure you want to delete this project?");

    // Make a DELETE request to delete the project

    if(userConfirmed){
    axios
      .delete(`${API_URL}/api/projects/${projectId}`)
      .then(() => {
        // Once the delete request is resolved successfully
        // navigate back to the list of projects.
        navigate("/projects");
      })
      .catch((err) => console.log(err));
    }
    else{
        navigate(`/projects/${projectId}`);
        console.log("Deletion was canceled")
    }
  };


  return (
    <div className="EditProjectPage">

      <h3>Editing: {title}</h3>

    <br></br>
    <br></br>


      <form onSubmit={handleFormSubmit}>

        <label>Title</label>
        <br></br>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

    <br></br>
    <br></br>

        
        <label>Description</label>
        <br></br>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

    <br></br>
    <br></br>


        <label>Tags (max.5): </label>
        <br></br>
        <input 
            type="text" 
            name="tags" 
            checked={tags} 
            onChange={(e) => setTags(e.target.value)}
            disabled={tagLimit}
        />

    <br></br>
    <br></br>


        <label>Related Links: </label>
        <br></br>
        <input 
            type="text" 
            name="sociallinksproject" 
            checked={sociallinksproject} 
            onChange={(e) => setSociallinksproject(e.target.value)}
        />

    <br></br>
    <br></br>



        <label>Creation Date: </label>
        <br></br>
        <input 
            type="date" 
            name="creationdate" 
            checked={creationdate} 
            onChange={(e) => setCreationdate(e.target.value)}
        />

    <br></br>
    <br></br>



        <label>Private: </label>
        <br></br>
        <input 
            type="checkbox" // Use "checkbox" for boolean values
            name="IsPrivate" 
            checked={IsPrivate} // Assuming "private" is a boolean variable
            onChange={handleCheckboxChange} 
        /> 
        
    <br></br>
    <br></br>

        <button onClick={deleteProject}>Delete Project</button>

        <br></br>
        <br></br>

        <button type="submit">Update {title}</button>
      </form>
    </div>
  );
}

export default EditProjectPage;
