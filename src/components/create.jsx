import React from "react";
import Navbar from "./navbar";



const Create = () => {

    return(
        <div>
            <Navbar/>
            <div className="forms">
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Description" />
                <input type="text" placeholder="Price"/>
                <input type="file" />
                <button className="mint">Create Nfts</button>
            </div>
           </div>
    )
}

export default Create;