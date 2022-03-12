import React from "react";




const Navbar = () => {

    return (
        <div className='navbar'>
            <h3>Loyal Nfts</h3>
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