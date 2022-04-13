import React from "react";
import { connectors } from "web3modal";
import Navbar from "./navbar";
import { useLocation } from "react-router-dom";
import { create as ipfsHttpClient } from 'ipfs-http-client'
import hl from '../NFTMARKETPLACE.png' 



const Home = () => {
        
      
    const location = useLocation();
    

        function alertMessage(){
            console.log(location.state.signer);
         }
    
    return(
        <div className="home">
           
            <img className="hl" src={hl}></img>
          
        </div>
    )
}

export default Home;