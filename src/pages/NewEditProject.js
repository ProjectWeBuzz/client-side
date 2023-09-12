import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import Select from "react-select";


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

    const [existingTags, setExistingTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const [existingImages, setExistingImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    const [existingLinks, setExistingLinks] = useState([]);

    const availableTags = [
        { value: "Tech", label: "Tech" },
        { value: "Frontend", label: "Frontend" },
        { value: "Backend", label: "Backend" },
        { value: "Paintings", label: "Paintings" },
      ];

      const handleTagChange = (selectedOptions) => {
        setSelectedTags(selectedOptions);
      };

      const handleImageChange = (e) => {
        const files = e.target.files;
        setSelectedImages([...selectedImages, ...files]);
      };

    // const tagLimit = tags.length >= 5;

    const {projectId} = useParams();  
    const navigate = useNavigate();
  
  
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
          setExistingTags(oneProject.tags);
          setExistingImages(oneProject.images);
          setExistingLinks(oneProject.sociallinksproject);
        })
        .catch((error) => console.log(error));
      
    }, [projectId]);


    const handleCheckboxChange = (e) => {
        setIsPrivate(e.target.checked);
      };
  
    const handleFormSubmit = (e, isDelete) => {                     
      e.preventDefault();

      if(isDelete){
        const userConfirmed = window.confirm("Are you sure you want to delete this project?");
      if (userConfirmed) {
        axios
          .delete(`${API_URL}/api/projects/${projectId}`)
          .then(() => {
            // Once the delete request is resolved successfully
            // navigate back to the list of projects.
            navigate("/projects");
          })
          .catch((err) => console.log(err));
      } else {
        navigate(`/projects/${projectId}`);
        console.log("Deletion was canceled");
      }
    } else {
        const requestBody = { title, description, tags, sociallinksproject, creationdate, IsPrivate };
        axios
          .put(`${API_URL}/api/projects/${projectId}`, requestBody)
          .then(() => {
            // Once the request is resolved successfully and the project
            // is updated we navigate back to the details page
            navigate(`/projects/${projectId}`);
          });
    }
    //   // Create an object representing the body of the PUT request
    //   const requestBody = { title, description, tags, sociallinksproject, creationdate, IsPrivate };
  
    //   axios
    //   .put(`${API_URL}/api/projects/${projectId}`, requestBody)
    //   .then(() => {
    //     // Once the request is resolved successfully and the project
    //     // is updated we navigate back to the details page
    //     navigate(`/projects/${projectId}`)
    //   });
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
      } else {
            navigate(`/projects/${projectId}`);
          console.log("Deletion was canceled")
      }
    };


    const addTag = () => {
        if (tags.length < 5) {
          setTags([...tags, ""]); // Add an empty tag input
        }
      };
    
      const removeTag = (index) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);
      };
    
      const updateTag = (index, value) => {
        const updatedTags = [...tags];
        updatedTags[index] = value;
        setTags(updatedTags);
      };



      const addNewImage = () => {
        setSelectedImages([...selectedImages, ""]);
      };
    
      const removeImage = (index) => {
        const updatedSelectedImages = [...selectedImages];
        updatedSelectedImages.splice(index, 1);
        setSelectedImages(updatedSelectedImages);
      };
    
      const updateImage = (index, url) => {
        const updatedSelectedImages = [...selectedImages];
        updatedSelectedImages[index] = url;
        setSelectedImages(updatedSelectedImages);
      };


      const renderImage = () => {
        return selectedImages.map((image, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Image URL ${index + 1}`}
              value={image}
              onChange={(e) => updateImage(index, e.target.value)}
            />
            <Button
              variant="danger"
              onClick={() => removeImage(index)}
            >
              Remove
            </Button>
          </div>
        ));
      };


      const addNewLink = () => {
        setSociallinksproject([...sociallinksproject, ""]);
      };
    
      const removeLink = (index) => {
        const updatedLinks = [...sociallinksproject];
        updatedLinks.splice(index, 1);
        setSociallinksproject(updatedLinks);
      };
    
      const updateLink = (index, url) => {
        const updatedLinks = [...sociallinksproject];
        updatedLinks[index] = url;
        setSociallinksproject(updatedLinks);
      };
  

  return (

    <Form onSubmit={handleFormSubmit} encType="multipart/form-data">
     <h2>Editing {title}</h2>
    <br></br>
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
        <br></br>
        {images.map((image, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Image URL ${index + 1}`}
              value={image}
              onChange={(e) => updateImage(index, e.target.value)}
            />
            <Button
              variant="danger"
              onClick={() => removeImage(index)}
              disabled={existingImages.length <= index}
            >
              Remove
            </Button>
            <Form.Control 
                type="file"
                name="images"
                accept="image/*"
                onChange={handleImageChange} 
                multiple
            />
          </div>
        ))}
        {renderImage()}
        <Button variant="success" onClick={addNewImage}>
          Add Image
        </Button>
      </Form.Group>

    <br></br>

      <Form.Group as={Col} controlId="formGridTags">
          <Form.Label>Tags (max:5)</Form.Label>
        <br></br>
            {tags.map((tag, index) => (
            <div key={index}>
                <input
                type="text"
                placeholder={`Tag ${index + 1}`}
                value={tag}
                onChange={(e) => updateTag(index, e.target.value)}
                />
                <Button
                variant="danger"
                onClick={() => removeTag(index)}
                disabled={existingTags.length <= index}
                >
                Remove
                </Button>
            </div>
            ))}
            <div>
            <Select 
                isMulti
                options={availableTags}
                value={selectedTags}
                onChange={handleTagChange}
                placeholder="Select tags..."
                maxMenuHeight={100} // Adjust the height as needed
            />
            </div>
            <Button variant="success" onClick={addTag} disabled={tags.length >= 5}>
            Add Tag
            </Button>
        </Form.Group>

    <br></br>

      
        <Form.Group as={Col} controlId="formGridLinks">
          <Form.Label>Related links</Form.Label>
          <br></br>
          {sociallinksproject.map((tag, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Link ${index + 1}`}
              value={tag}
              onChange={(e) => updateLink(index, e.target.value)}
            />
            <Button
              variant="danger"
              onClick={() => removeLink(index)}
              disabled={existingLinks.length <= index}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button variant="success" onClick={addNewLink} disabled={tags.length >= 5}>
          Add Link
        </Button>
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

      <Button variant="dark" type="submit" onClick={handleFormSubmit}>
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