import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from "react-router-dom";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

import HomePage from "./pages/HomePage";
import NewNavBar from "./components/NewNavBar";
import SignUp from './pages/SignUpPage';
import Login from './pages/LoginPage';
// import NavBar from './components/NavBar';

import UserProfile from './pages/UserProfilePage';
import NewUserProfile from "./pages/NewUserProfilePage";
import UserSettings from './pages/UserSettingsPage';

import Inbox from './pages/UserInboxPage';
import MessageDetail from './components/MessageDetail';

import AllProjectsPage from "./pages/AllProjectsPage";
import CreateProject from "./components/CreateProject";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectEdit from "./pages/ProjectEdit";
import NewCreateProject from "./pages/NewCreateProject";


function App() {
  return (
    <div className="App">

    <NewNavBar/>

    <Routes>
      
      <Route path="/" element={<IsAnon><HomePage /></IsAnon>} /> 
      <Route path="/signup" element={<IsAnon><SignUp /></IsAnon>} />
      <Route path="/login"  element={<IsAnon><Login /></IsAnon>} />

      <Route path="/profile/:username" element={<IsPrivate><NewUserProfile /> </IsPrivate>} />
      <Route path="/profile/update-profile/:username" element={<IsPrivate><UserSettings /></IsPrivate>} />
      <Route path="/messages/:username" element={ <IsPrivate><Inbox /></IsPrivate> } /> 

      
      <Route path="/projects" element={<IsPrivate><AllProjectsPage /> </IsPrivate>} /> 
      <Route path="/projects/:projectId" element={<IsPrivate><ProjectDetails/> </IsPrivate>} />  
      <Route path="/projects/edit/:projectId" element={<IsPrivate><ProjectEdit/> </IsPrivate>} /> 
       
      <Route path="/create-project" element={ <NewCreateProject /> } /> 
 
    </Routes>
 
  </div>
)}

export default App;