import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./pages/HomePage";
import SignUp from './pages/SignUpPage';
import Login from './pages/LoginPage';
import NavBar from './components/NavBar';
import UserProfile from './pages/UserProfilePage';
import UserSettings from './pages/UserSettingsPage';
import { Routes, Route } from "react-router-dom";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

import AllProjectsPage from "./pages/AllProjectsPage";
import CreateProject from "./components/CreateProject";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectEdit from "./pages/ProjectEdit";
import Inbox from './pages/UserInboxPage';



function App() {
  return (
    <div className="App">
    
    <NavBar />

    <Routes>
      
      <Route path="/" element={<IsAnon><HomePage /></IsAnon>} /> 
      <Route path="/signup" element={<IsAnon><SignUp /></IsAnon>} />
      <Route path="/login"  element={<IsAnon><Login /></IsAnon>} />

      <Route path="/profile" element={<IsPrivate><UserProfile /> </IsPrivate>} />
      <Route path="/profile/update-profile/:username" element={<IsPrivate><UserSettings /></IsPrivate>} />
      {/* <Route path="/colabs" element={<IsPrivate><Colabs/></IsPrivate>} /> */}

      <Route path="/create-project" element={<IsPrivate> <CreateProject /> </IsPrivate> } /> 
      <Route path="/projects" element={<IsPrivate><AllProjectsPage /> </IsPrivate>} /> 
      <Route path="/projects/:projectId" element={<IsPrivate><ProjectDetails/> </IsPrivate>}>  </Route>
      <Route path="/projects/edit/:projectId" element={<IsPrivate><ProjectEdit/> </IsPrivate>}> </Route>

      <Route path="/inbox" element={ <IsPrivate><Inbox /></IsPrivate> } /> 

    </Routes>
 
  </div>
)}

export default App;