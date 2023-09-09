import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { AuthContext } from '../context/auth.context'


const UserSettings = () => {
  const { user } = useContext( AuthContext ) ;
  const [email, setNewEmail] = useState('');
  const [password, setNewPassword] = useState('');
  const [description, setNewDescription] = useState('');
  const [photo, setNewPhoto] = useState(null);

//   const handleEmailChange = (e) => {
//     setNewEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setNewPassword(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setNewDescription(e.target.value);
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     setNewPhoto(file);
//   };

//   const handleSaveClick = () => {


//     const formData = new FormData();
//     formData.append('email', newEmail);
//     formData.append('password', newPassword);
//     formData.append('description', newDescription);
//     if (newPhoto) {
//       formData.append('photo', newPhoto);
//     }


//     fetch("/api/update-profile", {
//       method: 'PUT',
//       body: formData,
//     })
//       .then((response) => {
//         if (response.ok) {
         
//           console.log('User information updated successfully.');
//         } else {
         
//           console.error('Error updating user information.');
//         }
//       })
//       .catch((error) => {
//         console.error('Error updating user information:', error);
//       });
//   };

const navigate = useNavigate();

// useEffect(() => {     
//   console.log(user)                             
//     axios
//       .post(`${process.env.REACT_APP_API_URL}/api/update-profile/${user.username}`)
//       .then((response) => {
      
//         const oneUpdate = response.data;
//         setNewEmail(oneUpdate.newEmailemail);
//         setNewPassword(oneUpdate.newPassword);
//         setNewDescription(oneUpdate.newDescription);
//         setNewPhoto(oneUpdate.newPhoto);

//       })
//       .catch((error) => console.log(error));
  
//   }, [user]);


  const handleFormSubmit = (e) => {                     
    e.preventDefault();
    const requestBody = { email, password, description, photo };
    const storedToken = localStorage.getItem("authToken");

    axios
    .post(`${process.env.REACT_APP_API_URL}/profile/update-profile/${user.username}`, requestBody,
    { headers: { Authorization: `Bearer ${storedToken}`} } )
    .then((response) => {
      console.log(response)
    });
    
};

  return (
    <div className="container">

    
      <h1>Edit Profile</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="email">New Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">User Intro:</label>
          <textarea
            className="form-control"
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setNewDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="photo">Profile Photo:</label>
          <input
            type="file"
            className="form-control-file"
            id="photo"
            accept="image/*"
            onChange={(e) => setNewPhoto(e.target.files[0])}
          />
        </div>
        
        <button type="submit" className="btn btn-primary" onClick={handleFormSubmit}>
          Save
        </button>
      </form>
    </div>
  );
};

export default UserSettings;
