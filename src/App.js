import './App.css';
import HomePage from "./pages/HomePage";
import SignUp from './pages/SignUpPage';
import Login from './pages/LoginPage';
import NavBar from './components/NavBar';
import { Routes, Route } from "react-router-dom";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";


import ErrorPage from "./pages/ErrorPage";
import AllProjectsPage from './pages/AllProjectsPage';
// import ProjectDetailsPage from '../src/pages/components/ProjectDetailsPage';
// import EditProjectPage from '../src/pages/components/EditProjectPage';
// import InboxPage from '../src/pages/components/InboxPage';


function App() {
  return (
    <div className="App">
    <NavBar />

    <Routes>
      
      <Route path="/" element={<IsAnon><HomePage /></IsAnon>} /> 
      <Route path="/signup" element={<IsAnon><SignUp /></IsAnon>} />
      <Route path="/login"  element={<IsAnon><Login /></IsAnon>} />
      <Route path="/projects" element={ <IsPrivate><AllProjectsPage /></IsPrivate> } />
      {/* <Route path="/projects/:projectId" element={ <IsPrivate><ProjectDetailsPage /></IsPrivate> } />
      <Route path="/projects/edit/:projectId" element={ <IsPrivate> <EditProjectPage /> </IsPrivate> } />
      <Route path="/inbox" element={ <IsPrivate><InboxPage /></IsPrivate> } />   */}
      <Route path="*" element={ <ErrorPage /> } />

    </Routes>
    
  </div>
);
}

export default App;