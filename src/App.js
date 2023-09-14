import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./pages/HomePage";
import SignUp from './pages/SignUpPage';
import Login from './pages/LoginPage';
// import NavBar from './components/NavBar';
// import UserProfile from './pages/UserProfilePage';
import UserSettings from './pages/UserSettingsPage';
import { Routes, Route } from "react-router-dom";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

// import AllProjectsPage from "./pages/AllProjectsPage";
// import CreateProject from "./components/CreateProject";
// import ProjectDetails from "./pages/ProjectDetails";
import ProjectEdit from "./pages/ProjectEdit";
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
      <Route path="/login"  element={<IsAnon><Login/></IsAnon>} />
      <Route path="/myprojects" element={<IsPrivate><MyProjectsPage/></IsPrivate>}/>


      {/* <Route path="/profile/" element={<IsPrivate><UserProfile /> </IsPrivate>} /> */}
      <Route path="/profile/update-profile"  />
      {/* <Route path="/colabs" element={<IsPrivate><Colabs/></IsPrivate>} /> */}

      {/* <Route path="/create-project" element={<IsPrivate> <CreateProject /> </IsPrivate> } />  */}
      <Route path="/projects" element={<IsPrivate><NewAllProjectsPage /> </IsPrivate>} /> 
      {/* <Route path="/projects/:projectId" element={<IsPrivate><ProjectDetails/> </IsPrivate>}>  </Route> */}
      {/* <Route path="/projects/edit/:projectId" element={<IsPrivate><ProjectEdit/> </IsPrivate>}> </Route> */}
      <Route path="/projects/edit/:projectId" element={<IsPrivate><NewEditProject/> </IsPrivate>}> </Route>

      {/* <Route path="/profile" element={<IsPrivate><UserProfile /> </IsPrivate>} /> */}
      <Route path="/profile/:username" element={<IsPrivate><NewUserProfilePage /> </IsPrivate>}/>
      {/* <Route path="/colabs" element={<IsPrivate><Colabs/></IsPrivate>} /> */}

      {/* <Route path="/create-project" element={ <CreateProject /> } />  */}
      <Route path="/create-project" element={ <NewCreateProject/> } /> 

      {/* <Route path="/projects" element={ <AllProjectsPage /> } />  */}
      
      <Route path="/projects/:projectId" element={<NewProjectDetails/>}></Route>
      {/* <Route path="/projects/:projectId" element={<IsPrivate><ProjectDetails/> </IsPrivate>}>  </Route> */}

{/* Esta rota não deu para fazer comment */}
      <Route path="/projects/edit/:projectId" element={<ProjectEdit/>}></Route>


      {/* Rota anterior : <Route path="/projects" element={ <IsPrivate><AllProjectsPage /></IsPrivate> } /> */}

      {/* <Route path="/projects/:projectId" element={ <IsPrivate><ProjectDetailsPage /></IsPrivate> } />
      <Route path="/projects/edit/:projectId" element={ <IsPrivate> <EditProjectPage /> </IsPrivate> } />
      <Route path="/inbox" element={ <IsPrivate><InboxPage /></IsPrivate> } />   */}


      <Route path="/inbox" element={ <IsPrivate><Inbox /></IsPrivate> } /> 

    </Routes>
 
  </div>
)}

export default App;