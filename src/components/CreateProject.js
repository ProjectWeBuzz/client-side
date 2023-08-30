import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const API_URL = "http://localhost:5005";
 
function CreateProject() {

  const [title, setTitle] = useState("");
//   const [owner, setOwner] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([""]);
  const [tags, setTags] = useState([""]);
  const [technologies, setTechnologies] = useState([]);
  const [media, setMedia] = useState([]);
  const [sociallinksproject, setSociallinksproject] = useState([""]);
  const [creationdate, setCreationdate] = useState(Date);
//   const [collabs, setCollabs] = useState([""]);
  const [IsPrivate, setIsPrivate] = useState(true);

  const navigate = useNavigate();


 
//   add an onChange event to each input element and create a handler function for each input

  const handleTitleInput = e => setTitle(e.target.value);
  const handleDescriptionInput = e => setDescription(e.target.value);
  const handleImagesInput = e => setImages(e.target.value);
  const handletagsInput = e => setTags(e.target.checked);
  const handleMediaInput = e => setMedia(e.target.value);
  const handleSocialLinksProjectInput = e => setSociallinksproject(e.target.value);
  const handleCreationDateInput = e => setCreationdate(e.target.checked);

  const handleCheckboxChange = (e) => {
    setIsPrivate(e.target.checked);
  };

  const handleTechnologiesChange = (event) => {
    const { value } = event.target;
    // Create a copy of the current selected technologies
    const updatedTechnologies = [...technologies];

    // Check if the selected technology is already in the list
    if (updatedTechnologies.includes(value)) {
    // If it is, remove it
    const index = updatedTechnologies.indexOf(value);
    updatedTechnologies.splice(index, 1);
    } else {
    // If it's not, add it to the list
    updatedTechnologies.push(value);    
    }
    // Update the state with the new list of selected technologies
    setTechnologies(updatedTechnologies);
  };


// Prevent default

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProject = {title:title, description:description, images:images, tags:tags, technologies:technologies, media:media, sociallinksproject:sociallinksproject, creationdate:creationdate, IsPrivate:IsPrivate}
    console.log("Submitted: ", newProject);
  };


 
  return (
    <div className="CreateProject">
      <h4>Add new Project</h4>
 
      <form onSubmit={handleSubmit}>

        <label key={title}>Title: </label>
        <input 
            type="text" 
            name="title" 
            value={title} 
            onChange={handleTitleInput}
        />
        
        {/* The "owner" is automaticcally assocciated to the id of the user/creator  */}

        {/* <label>Owner: </label>
        <input 
            type="text" 
            name="owner" 
            value={owner} 
        /> */}
  
        <label key={description}>Description: </label>
        <input 
            type="text" 
            name="description" 
            value={description} 
            onChange={handleDescriptionInput}
        />
  
        <label key={images}>Images: </label>
        <input 
            type="string" 
            name="images" 
            checked={images} 
            onChange={handleImagesInput}
        />

        <label key={tags}>Tags (max.5): </label>
        <input 
            type="text" 
            name="tags" 
            checked={tags} 
            onChange={handletagsInput}
        />

        <label key={technologies}>Technologies: </label>
        <input 
            type="checkbox" 
            name="technologies"
            value={technologies} 
            checked={technologies.includes(technologies)} 
            onChange={handleTechnologiesChange}
        />

        <label key={media}>Media: </label>
        <input 
            type="string" 
            name="media" 
            checked={media} 
            onChange={handleMediaInput}
        />
        
        <label key={sociallinksproject}>Related Links: </label>
        <input 
            type="string" 
            name="sociallinksproject" 
            checked={sociallinksproject} 
            onChange={handleSocialLinksProjectInput}
        />

        <label key={creationdate}>Creation Date: </label>
        <input 
            type="date" 
            name="creationdate" 
            checked={creationdate} 
            onChange={handleCreationDateInput}
        />

        {/* For adding collabs, is through the website - Collab Page or Messsages!!! */}

        {/* <label>Collaborators: </label>
        <input 
            type="string" 
            name="sociallinksproject" 
            checked={sociallinksproject} 
        /> */}

        <label key={IsPrivate}>Private: </label>
        <input 
            type="checkbox" // Use "checkbox" for boolean values
            name="IsPrivate" 
            checked={IsPrivate} // Assuming "private" is a boolean variable
            onChange={handleCheckboxChange} 
        />


        
        <button type="submit">Add new Project</button>
      </form>

    </div>
  );
}
 
export default CreateProject;