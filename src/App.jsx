import "./styles/Navbar.css"
import Navbar from './components/navbar';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from "./components/create";
import Explore from "./components/explore";
import "./styles/create.css";


function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Navbar/>}></Route>
      <Route exact path ="/create" element ={<Create/>} />  
      <Route exact path ="/explore" element ={<Explore/>} />  
   </Routes>
    </Router>
  );
}

export default App;
