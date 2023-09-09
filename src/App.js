import './App.css';
import HomePage from "./pages/HomePage";
import SignUp from './pages/SignUpPage';
import Login from './pages/LoginPage';
// import NavBar from './components/NavBar';
import UserProfile from './pages/UserProfilePage';
import { Routes, Route } from "react-router-dom";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

import AllProjectsPage from "./pages/AllProjectsPage";
import CreateProject from "./components/CreateProject";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectEdit from "./pages/ProjectEdit";

import NewNavBar from "./components/NewNavBar";
import NewProfile from "./pages/NewUserProfilePage";
import NewCreateProject from "./pages/NewCreateProject";


function App() {
  return (
    <div className="App">

    {/* <NavBar /> */}

    <NewNavBar/>

    <Routes>
      
      <Route path="/" element={<IsAnon><HomePage /></IsAnon>} /> 
      <Route path="/signup" element={<IsAnon><SignUp /></IsAnon>} />
      <Route path="/login"  element={<IsAnon><Login /></IsAnon>} />

      {/* <Route path="/profile" element={<IsPrivate><UserProfile /> </IsPrivate>} /> */}
      <Route path="/profile" element={<IsPrivate><NewProfile /> </IsPrivate>}/>
      {/* <Route path="/colabs" element={<IsPrivate><Colabs/></IsPrivate>} /> */}

      {/* <Route path="/create-project" element={ <CreateProject /> } />  */}
      <Route path="/create-project" element={ <NewCreateProject /> } /> 

      <Route path="/projects" element={ <AllProjectsPage /> } /> 
      
      <Route path="/projects/:projectId" element={<ProjectDetails/>}></Route>
      <Route path="/projects/edit/:projectId" element={<ProjectEdit/>}></Route>


      {/* Rota anterior : <Route path="/projects" element={ <IsPrivate><AllProjectsPage /></IsPrivate> } /> */}

      {/* <Route path="/projects/:projectId" element={ <IsPrivate><ProjectDetailsPage /></IsPrivate> } />
      <Route path="/projects/edit/:projectId" element={ <IsPrivate> <EditProjectPage /> </IsPrivate> } />
      <Route path="/inbox" element={ <IsPrivate><InboxPage /></IsPrivate> } />   */}


      {/* <Route path="/projects" element={ <IsPrivate><ProjectListPage /></IsPrivate> } />
      <Route path="/projects/:projectId" element={ <IsPrivate><ProjectDetailsPage /></IsPrivate> } />
      <Route path="/projects/edit/:projectId" element={ <IsPrivate> <EditProjectPage /> </IsPrivate> } />
      <Route path="/messages" element={ <IsPrivate><InboxPage /></IsPrivate> } />   */}
    

    </Routes>
    
  </div>
);
}

export default App;