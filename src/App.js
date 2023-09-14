import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from "react-router-dom";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

import HomePage from "./pages/HomePage";
import SignUp from './pages/SignUpPage';
import Login from './pages/LoginPage';
import NewUserProfile from "./pages/NewUserProfilePage";
import UserSettings from './pages/UserSettingsPage';
import Inbox from './pages/UserInboxPage';
import MessageDetail from './components/MessageDetail';

import Inbox from './pages/UserInboxPage';
import NewNavBar from "./components/NewNavBar";
import NewUserProfilePage from "./pages/NewUserProfilePage";

import NewCreateProject from "./pages/NewCreateProject";
import NewAllProjectsPage from "./pages/NewAllProjectsPage";
import NewProjectDetails from "./pages/NewProjectDetails";
import NewEditProject from "./pages/NewEditProject";
import MyProjectsPage from "./pages/MyProjectsPage";

function App() {
  return (
    <div className="App">

    <NewNavBar/>

    <Routes>
      
      <Route path="/" element={<HomePage />} /> 
      <Route path="/signup" element={<IsAnon><SignUp /></IsAnon>} />
      <Route path="/login"  element={<IsAnon><Login /></IsAnon>} />

      <Route path="/profile/:username" element={<IsPrivate><NewUserProfilePage/> </IsPrivate>} />
      <Route path="/profile/update-profile/:username" element={<IsPrivate><UserSettings /></IsPrivate>} />
      <Route path="/messages/:username" element={ <IsPrivate><Inbox /></IsPrivate> } /> 

      <Route path="/create-project" element={ <NewCreateProject /> } /> 
      <Route path="/myprojects" element={<IsPrivate><MyProjectsPage/></IsPrivate>}/> 
      <Route path="/projects" element={<IsPrivate><NewAllProjectsPage /> </IsPrivate>} /> 
      <Route path="/projects/edit/:projectId" element={<IsPrivate><NewEditProject/> </IsPrivate>}></Route>
      <Route path="/projects/:projectId" element={<NewProjectDetails/>}></Route>

    </Routes>
 
  </div>
)}

export default App;