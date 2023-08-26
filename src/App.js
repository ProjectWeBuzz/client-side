import './App.css';

// import HomePage from "./pages/HomePage";
import SignUp from './components/SignUpPage';
 
import { Routes, Route } from "react-router-dom";  // <== IMPORT


function App() {
  return (
    <div className="App">
    {/* <Navbar /> */}
    
    {/*   Add <Route /> components between <Routes> and </Routes>   */} 
    <Routes>
      {/* <Route path="/" element={<HomePage />} />  */}
      <Route path="/signup" element={<SignUp />} />
    
    </Routes>
    
  </div>
);
}

export default App;