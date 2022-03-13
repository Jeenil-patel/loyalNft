import React,{useState} from "react";
import logo from "../logo2.png";
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { Link } from "react-router-dom";
import Create from "./create";


const Navbar = () => {
    const [Signer,setSigner] = useState("");
    return (
        <div className='navbar'>
            <div className="logo">
            <Link to="/">
            <img className="image" src={logo} alt="" />
            </Link>
            <div className="logoH"><h2>Loyal NFTs</h2></div>
           
            </div>
            <div className="items">
            <ul>
               <Link to="/">                
                    <li>Home</li> 
               </Link>
               <Link to="/explore">
                    <li>Explore</li>    
               </Link>
            </ul>
            <Link to="/create">
                    <button className="createBtn" >Create</button>
            </Link>
            <button className="connectBtn" onClick={async ()=>{
                const web3Modal = new Web3Modal();
                const connection = await web3Modal.connect();
                const provider = new ethers.providers.Web3Provider(connection);
                const signer = provider.getSigner();
                const sign = await signer.signMessage("Allow LoyalNft to give access to Metamask!!")
                console.log(signer,sign);
                setSigner(signer);
            }}>Connect</button>
           
        </div>
        </div>
        
    )

}

export default Navbar