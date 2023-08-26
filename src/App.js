import './App.css';
import HomePage from "./pages/HomePage";
import SignUp from './pages/SignUpPage';
import Login from './pages/LoginPage';
import NavBar from './components/NavBar';
 
import { Routes, Route } from "react-router-dom";  // <== IMPORT


function App() {
  return (
    <div className="App">
    <NavBar />

    <Routes>
      <Route path="/" element={<HomePage />} /> 
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login"  element={<Login />} />
    
    </Routes>
    
  </div>
);
}

export default App;