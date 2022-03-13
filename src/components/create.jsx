import React,{useState} from "react";
import Navbar from "./navbar";
import { create as ipfsHttpClient } from 'ipfs-http-client'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const Create = () => {
    const [formInput, updateFormInput] = useState({ name: '', description: '' });
    const [fileUrl, setFileUrl] = useState({});
    return(
        <div>
            <Navbar/>
            <div className="forms">
                <input type="text" placeholder="Name" onChange={(e) =>{
                    console.log(e.target.value);
                }}/>
                <input type="text" placeholder="Description" />
                <input type="file" />
                <button className="mint" onClick={() => {
                    
                }}>Create Nfts</button>
            </div>
           </div>
    )
}

export default Create;