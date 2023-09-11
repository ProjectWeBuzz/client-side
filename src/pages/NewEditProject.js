import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";


//import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';

const API_URL = "http://localhost:5005";



function NewEditProject(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [sociallinksproject, setSociallinksproject] = useState([]);
    const [creationdate, setCreationdate] = useState("");
    const [IsPrivate, setIsPrivate] = useState(true);
    const [images, setImages] = useState([]);

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
          setImages(oneProject.images);
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

   

    <Form onSubmit={handleFormSubmit} encType="multipart/form-data">
     <h2>Editing {title}</h2>
    <br></br>
      {/* <Row className="mb-3"> */}
        <Form.Group as={Col} controlId="formGridTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type="text" 
            name="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} placeholder="Enter title here" />
        </Form.Group>
    <br></br>
        <Form.Group as={Col} controlId="formGridDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control  
            name="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} placeholder="Enter description here" />
        </Form.Group>
    <br></br>    
      {/* </Row> */}
      <Form.Group as={Col} controlId="formGridDate">
          <Form.Label>Date</Form.Label>
          <Form.Control 
            type="date" 
            name="creationdate" 
            checked={creationdate} 
            onChange={(e) => setCreationdate(e.target.value)}/>
        </Form.Group>
    <br></br>
      <Form.Group className="mb-3" controlId="formGridImages">
        <Form.Label>Add Images</Form.Label>
        <Form.Control 
            type="file"
            name="images"
            accept="image/*"
            onChange={(e) =>setImages(e.target.files)} />
      </Form.Group>
    <br></br>
      <Form.Group as={Col} controlId="formGridTags">
          <Form.Label>Tags (max:5)</Form.Label>
          <br></br>
          <input 
            type="text" 
            name="tags" 
            checked={tags} 
            onChange={(e) => setTags(e.target.value)}
            disabled={tagLimit}
        />
          
        </Form.Group>

    <br></br>

      
        <Form.Group as={Col} controlId="formGridLinks">
          <Form.Label>Related links</Form.Label>
          <br></br>
          <input 
            type="text" 
            name="sociallinksproject" 
            checked={sociallinksproject} 
            onChange={(e) => setSociallinksproject(e.target.value)}
        />
        </Form.Group>

    <br></br>
    <br></br>

      <Form.Group className="mb-3" id="formGridPrivate">
        <Form.Label>Private</Form.Label>
        <Form.Check
            type="checkbox" // Use "checkbox" for boolean values
            name="IsPrivate" 
            checked={IsPrivate} // Assuming "private" is a boolean variable
            onChange={handleCheckboxChange} 
        /> 
      </Form.Group>

    <br></br>

      <Button variant="dark" type="submit">
        Update {title}
      </Button>
      <br></br>
      <br></br>
      <Button variant="dark" type="submit" onClick={deleteProject}>
        Delete
      </Button>


    </Form>
  );
}

export default NewEditProject;