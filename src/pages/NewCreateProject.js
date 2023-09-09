import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';

import { useState } from "react";



function NewCreateProject() {

    const [title, setTitle] = useState("");
    //   const [owner, setOwner] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [tags, setTags] = useState([]);
    const [sociallinksproject, setSociallinksproject] = useState([]);
    const [newLink, setNewLink] = useState("");
    const [creationdate, setCreationdate] = useState("");
    //   const [collabs, setCollabs] = useState([""]);
    const [isPrivate, setIsPrivate] = useState(true);

    
    const navigate = useNavigate();

    // Beginning Tags
    const maxTags = 5;
    const handleTagChange = (availableTags) => {
        const selectedTags = availableTags.map((option) => ({
          value: option.value,
          label: option.label,
        }));
      
        // Limit the number of selected tags
        if (selectedTags.length <= maxTags) {
          setTags(selectedTags);
        }
      };

      const availableTags = [
        { value: "Tech", label: "Tech" },
        { value: "Frontend", label: "Frontend" },
        { value: "Backend", label: "Backend" },
        { value: "Paintings", label: "Paintings" },
        { value: "a", label: "a" },
        { value: "b", label: "b" },
        { value: "c", label: "c" },
        { value: "d", label: "d" },
      ];

    // End Tags

    const addLink = () => {
        if (newLink.trim() !== "") {
          setSociallinksproject([...sociallinksproject, newLink]);
          setNewLink(""); // Clear the input field
        }
      };
      
      const removeLink = (indexToRemove) => {
        const updatedLinks = sociallinksproject.filter((_, index) => index !== indexToRemove);
        setSociallinksproject(updatedLinks);
      };


// Prevent default and handle submit

const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", JSON.stringify(tags.map(tag => tag.value)));
    formData.append("creationdate", creationdate);
    formData.append("isPrivate", isPrivate);
    formData.append("images", images);

  try {
    const storedToken = localStorage.getItem("authToken");
    await axios.post(`${process.env.REACT_APP_API_URL}/api/projects`, formData, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
        // "Content-Type": "multipart/form-data", // Set the content type for FormData
      },
    });

    console.log("Submitted:", {
      title,
      description,
      tags,
      creationdate,
      isPrivate,
      images,
      sociallinksproject,
    });

    // Clear form fields and state
    setTitle("");
    setDescription("");
    setImages({});
    setTags([]);
    setSociallinksproject([]);
    setCreationdate("");
    setIsPrivate(true);

    navigate('/projects');
  } catch (error) {
    console.error('Error uploading image or creating project:', error);
  }
};


  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
            onChange={(e) =>setImages(e.target.files[0])} />
      </Form.Group>
    <br></br>
      <Form.Group as={Col} controlId="formGridTags">
          <Form.Label>Add Tags</Form.Label>
          <Select 
          isMulti
          options={availableTags}
          value={tags}
          onChange={handleTagChange}
          placeholder="Select tags..."
          maxMenuHeight={150} // Adjust the height as needed
          isDisabled={false} 
          defaultValue="Choose..."
          >
          {availableTags.map((tag) => (
                <option key={tag.value} value={tag.value}>
                    {tag.label}
                </option>
                ))}
          </Select>
        </Form.Group>

    <br></br>

      
        <Form.Group as={Col} controlId="formGridLinks">
          <Form.Label>Related links</Form.Label>
          <Form.Control 
          type="text"
          placeholder="Add related link"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}/>
        <Button variant="success" onClick={addLink}>+</Button>
          <br></br>

          {sociallinksproject.map((link, index) => (
          <div key={index}>
            <a href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{textDecoration: 'none', color:"black"}}
            >
              {link}
            </a>
            
            <Button variant="danger" onClick={() => removeLink(index)}>-</Button>
          </div>
        ))}
        </Form.Group>

    <br></br>
    <br></br>

      <Form.Group className="mb-3" id="formGridPrivate">
        <Form.Check type="checkbox"
            name="isPrivate" 
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)} 
            label="Private" />
      </Form.Group>

    <br></br>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default NewCreateProject;