import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context"; // Import your AuthContext here
import { useNavigate } from "react-router-dom";

// import {useNavigate} from "react-router-dom"


 
function CreateProject() {

    const { storeToken } = useContext(AuthContext); // Access the storeToken function from your AuthContext

  const [title, setTitle] = useState("");
//       const [owner, setOwner] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState({});
  const [tags, setTags] = useState(["tag1", "tag2"]);
  const [sociallinksproject, setSociallinksproject] = useState(["link1", "link2"]);
  const [creationdate, setCreationdate] = useState("");
// //   const [collabs, setCollabs] = useState([""]);
  const [IsPrivate, setIsPrivate] = useState(true);


const tagLimit = tags.length >= 5;

const navigate = useNavigate();

const handleCheckboxChange = (e) => {
    setIsPrivate(e.target.checked);
  };


const handleFileChange = (e) => {
  setImages(e.target.files[0]);
};


// Prevent default

const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadResult = null; 

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

        <label>Title: </label>
        <input 
            type="text" 
            name="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
        />
        <br></br>
        {/* The "owner" is automaticcally assocciated to the id of the user/creator  */}

        {/* <label>Owner: </label>
        <input 
            type="text" 
            name="owner" 
            value={owner} 
        /> */}
  
        <label>Description: </label>
        <textarea 
            name="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
        />
        
        <br></br>

        <label>Images: </label>
        <input 
            type="file"
            name="images"
            accept="image/*"
            onChange={handleFileChange}
        />

        <br></br>

        <label>Tags (max.5): </label>
        <input 
            type="text" 
            name="tags" 
            checked={tags} 
            onChange={(e) => setTags(e.target.value)}
            disabled={tagLimit}
        />


        <br></br>   
        
        <label>Related Links: </label>
        <input 
            type="text" 
            name="sociallinksproject" 
            checked={sociallinksproject} 
            onChange={(e) => setSociallinksproject(e.target.value)}
        />

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