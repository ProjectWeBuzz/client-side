import { useState, useEffect } from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import Select from "react-select";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';



function NewEditProject(props) {

    const { projectId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [sociallinksproject, setSociallinksproject] = useState([]);
    const [creationdate, setCreationdate] = useState("");
    const [isPrivate, setIsPrivate] = useState(true);

    const [existingTags, setExistingTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const [images, setImages] = useState([]);

    const [existingLinks, setExistingLinks] = useState([]);

    const availableTags = [
        { value: "Tech", label: "Tech" },
        { value: "Frontend", label: "Frontend" },
        { value: "Backend", label: "Backend" },
        { value: "Paintings", label: "Paintings" },
      ];

    // const tagLimit = tags.length >= 5;

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };

  
    useEffect(() => {                                  
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}`)
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
          setIsPrivate(oneProject.isPrivate);
          setExistingTags(oneProject.tags);
          setExistingLinks(oneProject.sociallinksproject);

          setSelectedTags(oneProject.tags.map(tag => ({ value: tag, label: tag })));
        })
        .catch((error) => console.log(error));
      
    }, [projectId]);


    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/tags`)
          .then((response) => {
            const tags = response.data.map((tag) => ({
              value: tag._id,
              label: tag.name,
            }));
            setExistingTags(tags);
          })
          .catch((error) => console.log(error));
      }, []);
    
      // Modify handleTagChange to update selectedTags
      const handleTagChange = (selectedOptions) => {
        setSelectedTags(selectedOptions);
      };

    

    const handleCheckboxChange = (e) => {
        setIsPrivate(e.target.checked);
      };
  
  
  const deleteProject = () => {                    
  
      const userConfirmed = window.confirm("Are you sure you want to delete this project?");
  
      // Make a DELETE request to delete the project
  
      if(userConfirmed){
      axios
        .delete(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}`)
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


      

    const handleFormSubmit = (e, isDelete) => {                     
        e.preventDefault();
  
        if(isDelete){
          const userConfirmed = window.confirm("Are you sure you want to delete this project?");
        if (userConfirmed) {
          axios
            .delete(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}`)
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
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("tags", JSON.stringify(tags.map((tag) => tag.value)));
        formData.append("sociallinksproject", JSON.stringify(sociallinksproject));
        formData.append("creationdate", creationdate);
        formData.append("isPrivate", isPrivate);

        for (const image of images) {
            formData.append("images", image);
          }
      
          axios
            .put(`${API_URL}/api/projects/${projectId}`, formData)
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
      <Form.Label>Images</Form.Label>
        <Form.Control
          type="file"
          name="images"
          accept="image/*"
          onChange={handleImageChange}
          multiple
        />
      </Form.Group>

    <br></br>

      <Form.Group as={Col} controlId="formGridTags">
      <Form.Label>Tags (max: 5)</Form.Label>
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
        </Form.Group>

    <br></br>

      
        <Form.Group as={Col} controlId="formGridLinks">
          <Form.Label>Related links</Form.Label>
          <br></br>
          {sociallinksproject.map((tag, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Add link here`}
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
            checked={isPrivate} // Assuming "private" is a boolean variable
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
