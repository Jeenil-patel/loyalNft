import React from "react";
import logo from "../logo2.png"

const Navbar = () => {

    return (
        <div className='navbar'>
            <div className="logo">
            <img className="image" src={logo} alt="" />
            <div className="logoH"><h2>Loyal NFTs</h2></div>
            </div>
            <div className="items">
            <ul>
               
                <li>Home</li>
                <li>Explore</li>    
            </ul>
            <button className="createBtn">Create</button>
            <button className="connectBtn">Connect</button>
        </div>
        </div>
        
    )

}

export default Navbar