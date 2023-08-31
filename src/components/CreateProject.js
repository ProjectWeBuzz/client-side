import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context"; // Import your AuthContext here

// import {useNavigate} from "react-router-dom"


const API_URL = "http://localhost:5005";
 
function CreateProject() {

    const { storeToken } = useContext(AuthContext); // Access the storeToken function from your AuthContext

  const [title, setTitle] = useState("");
//       const [owner, setOwner] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState(null);
  const [tags, setTags] = useState(["tag1", "tag2"]);
  const [sociallinksproject, setSociallinksproject] = useState(["link1", "link2"]);
  const [creationdate, setCreationdate] = useState("");
// //   const [collabs, setCollabs] = useState([""]);
  const [IsPrivate, setIsPrivate] = useState(true);


  const tagLimit = tags.length >= 5;

//   const navigate = useNavigate();
 
//   add an onChange event to each input element and create a handler function for each input

//   const handleTitleInput = e => setTitle(e.target.value);
//   const handleDescriptionInput = e => setDescription(e.target.value);
//   const handleImagesInput = e => setImages(e.target.value);
//   const handletagsInput = e => setTags(e.target.checked);
//   const handleMediaInput = e => setMedia(e.target.value);
//   const handleSocialLinksProjectInput = e => setSociallinksproject(e.target.value);
//   const handleCreationDateInput = e => setCreationdate(e.target.checked);




  const handleCheckboxChange = (e) => {
    setIsPrivate(e.target.checked);
  };



// Prevent default

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description) {
        alert("Title and description are required.");
        return;
      }
    

    const formData = new FormData(); // Create a FormData object to send files

    // Append the selected file(s) to the FormData
    // if (images) {
    //   for (let i = 0; i < images.length; i++) {
    //     formData.append("images", images[i]);
    //   }
    // }

    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("sociallinksproject", sociallinksproject);
    formData.append("creationdate", creationdate);
    formData.append("IsPrivate", IsPrivate);


    const storedToken = localStorage.getItem("authToken");

    axios
        .post(`${API_URL}/api/projects`, formData, {
            headers:{
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "multipart/form-data"
            },
        })
        .then((response) => {

            console.log("Submitted: ", response.data);

            setTitle("");
            setDescription("");
            setImages(null);
            setTags([]);
            setSociallinksproject([]);
            setCreationdate("");
            setIsPrivate(true);

        })
        .catch((error) => console.log(error));


  };


  const handleImagesSubmit = (e) => {
    const files = e.target.files;
    setImages(files);
  };


 
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
            required
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
        <input 
            type="text" 
            name="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            required
        />
        
        <br></br>

        <label>Images: </label>
        <input 
            type="file" 
            name="images"
            multiple
            onChange={handleImagesSubmit}
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
            name="sociallinksproject" 
            checked={sociallinksproject} 
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