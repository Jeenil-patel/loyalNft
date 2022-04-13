import React,{useState} from "react";
import Navbar from "./navbar";
import { create as ipfsHttpClient } from 'ipfs-http-client'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const Create = () => {
    
    const [fileUrl, setFileUrl] = useState({});
    const [name, updateName] = useState("");
    const [desc, updateDesc] = useState("");
    const [file, updateFile] = useState("");
    const [price, updatePrice] = useState("");


    async function onChangeFile(e) {
        const file = e.target.files[0];
        try {
            const added = await client.add(
                file);
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            setFileUrl(url);
            createMarket(url)
        } catch (error) {
            console.log('Error uploading file:', error);
        }
    }

    async function createMarket(t) {
        
        if (!name || !desc || !fileUrl || !price) return
        // upload to IPFS
        const data = JSON.stringify({
            name, desc,price, image: t
        });
        try {
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            // run a function that creates sale and passes in the url 
            console.log(url)
        } catch (error) {
            console.log('Error uploading file:', error);
        }
    }

    return(
        <div>
            <Navbar/>
            <div className="forms">
                <input type="text" placeholder="Name" onChange={(e) =>{
                   updateName(e.target.value)
                }}/>
                <input type="text" placeholder="Description" onChange={(e) =>{
                   updateDesc(e.target.value)
                }}/>

                <input type="text" placeholder="Price" onChange={(e) =>{
                   updatePrice(e.target.value)
                }}/>
                
                <input type="file" onChange={(e) => { updateFile(e)}}/>
                <button className="mint" onClick={async() => {
                   await onChangeFile(file)
                   
                }}>Create Nfts</button>
            </div>
           </div>
    )
}

export default Create;