import { useState } from "react";
import axios from "axios";
// import { AuthContext } from "../context/auth.context"; // Import your AuthContext here
import { useNavigate } from "react-router-dom";
import Select from "react-select";


// import {useNavigate} from "react-router-dom"


 
function CreateProject() {

    // const { storeToken } = useContext(AuthContext); // Access the storeToken function from your AuthContext

  const [title, setTitle] = useState("");
//       const [owner, setOwner] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState({});
  const [tags, setTags] = useState([]);
  const [sociallinksproject, setSociallinksproject] = useState([]);
  const [newLink, setNewLink] = useState("");
  const [creationdate, setCreationdate] = useState("");
// //   const [collabs, setCollabs] = useState([""]);
  const [IsPrivate, setIsPrivate] = useState(true);

  const navigate = useNavigate();

const maxTags = 5;

const handleTagChange = (selectedOptions) => {
  const selectedTags = selectedOptions.map((option) => ({
    value: option.value,
    label: option.label,
  }));

  // Limit the number of selected tags
  if (selectedTags.length <= maxTags) {
    setTags(selectedTags);
  }
};

// const addTag = () => {
//   if (tags.length < maxTags && tags !== "") { // Check if the limit is not reached and a tag is selected
//     setTags([...tags, tags]); // Add the selected tag to the tags array
//     setTags(""); // Clear the selected tag
//   }
// };

// const removeTag = (tagToRemove) => {
//   const updatedTags = tags.filter((tag) => tag !== tagToRemove);
//   setTags(updatedTags);
// };


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



const handleCheckboxChange = (e) => {
    setIsPrivate(e.target.checked);
  };

const handleFileChange = (e) => {
  setImages(e.target.files[0]);
};




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


// Prevent default

const handleSubmit = async (e) => {
    e.preventDefault();


    const newProject = {
      title, 
      description, 
      tags, 
      images, 
      sociallinksproject, 
      creationdate, 
      IsPrivate,
    };

    try {
      console.log(images);
      const formData = new FormData();
      formData.append("file", images); // Use "file" as the key

      const storedToken = localStorage.getItem("authToken");

      await axios.post(`${process.env.REACT_APP_API_URL}/api/projects`, {formData}, {
              headers:{
                  Authorization: `Bearer ${storedToken}`,
              },
          });

    } catch (error) {
      console.error('Error uploading image or creating project:', error);
  }

    
    console.log("Submitted: ", newProject);


            setTitle("");
            setDescription("");
            setImages(null);
            setTags([]);
            setSociallinksproject([]);
            setCreationdate("");
            setIsPrivate(true);

            navigate('/projects');
  }


 
  return (
    <div className="CreateProject">
      <h4>Add new Project</h4>
 
      <form onSubmit={handleSubmit}>

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

        {/* The "owner" is automaticcally assocciated to the id of the user/creator  */}

        {/* <label>Owner: </label>
        <input 
            type="text" 
            name="owner" 
            value={owner} 
        /> */}
  
        <label>Description</label>
        <br></br>
        <textarea 
            name="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
        />
        
        <br></br>
        <br></br>

        {/* Images */}
        <label></label>
        <br></br>
        <input 
            type="file"
            name="images"
            accept="image/*"
            onChange={handleFileChange}
        />

        <br></br>
        <br></br>

        {/* Tags */}
        <label></label>
        <Select
          isMulti
          options={availableTags}
          value={tags}
          onChange={handleTagChange}
          placeholder="Select tags..."
          maxMenuHeight={150} // Adjust the height as needed
          isDisabled={false}
        />

        <br></br>
        <br></br>   

        {/* Links */}
        
        <label></label>
        <input
          type="text"
          placeholder="Add related link"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
        />

        <button type="button" onClick={addLink}>Add Link</button>

        <br></br>
        <br></br>

        {sociallinksproject.map((link, index) => (
          <div key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
            <button onClick={() => removeLink(index)}>Remove</button>
          </div>
        ))}

        <br></br>

        <label>Creation Date: </label>
        <input 
            type="date" 
            name="creationdate" 
            checked={creationdate} 
            onChange={(e) => setCreationdate(e.target.value)}
        />

        <br></br>

        {/* For adding collabs, is through the website - Collab Page or Messsages!!! */}

        {/* <label>Collaborators: </label>
        <input 
            type="string" 
            name="" 
            checked={} 
        /> */}

        <br></br>

        <label>Private: </label>
        <input 
            type="checkbox" // Use "checkbox" for boolean values
            name="IsPrivate" 
            checked={IsPrivate} // Assuming "private" is a boolean variable
            onChange={handleCheckboxChange} 
        /> 
        

        <br></br>
        <br></br>
        
        <button type="submit">Add new Project</button>
      </form>

    </div>
  );
  
}


 
export default CreateProject;