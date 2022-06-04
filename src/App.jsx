import "./styles/Navbar.css"
import Navbar from './components/navbar';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from "./components/create";
import Explore from "./components/explore";
import Collection from "./components/collection";
import "./styles/create.css";
import './styles/home.css'
import './styles/explore.css'
import './styles/collection.css'
import Home from "./components/home";


function App() {
  
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
      <Route exact path="/" element={<Home/>}></Route>
      <Route exact path ="/create" element ={<Create/>} />  
      <Route exact path ="/explore" element ={<Explore/>} />  
      <Route exact path ="/collection" element ={<Collection/>} />  
   </Routes>
    </Router>
  );
}

export default App;
