import React from "react";
import { connectors } from "web3modal";
import Navbar from "./navbar";
import { useLocation } from "react-router-dom";
import { create as ipfsHttpClient } from 'ipfs-http-client'



const Home = () => {
        
      
    const location = useLocation();
    

        function alertMessage(){
            console.log(location.state.signer);
         }
    
    return(
        <div className="home">
            <Navbar/>
            <h1>ddddd</h1>
            <h1>Home Page Still On Progress!!</h1>
        </div>
    )
}

export default Home;