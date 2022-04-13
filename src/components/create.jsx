import React,{useState} from "react";
import Navbar from "./navbar";
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const Madd = "0x284193407258017439B39aB328dA84343f0cBE86";
const Nadd = "0x53A6dD6c9884E54fb173E35E1236806003EE4128";


const Create = () => {
    
    const [fileUrl, setFileUrl] = useState({});
    const [name, updateName] = useState("");
    const [desc, updateDesc] = useState("");
    const [file, updateFile] = useState("");
    const [price, updatePrice] = useState("");

    const Nabi = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_tokenIds","outputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint96","name":"royaltyPercentage","type":"uint96"},{"internalType":"string","name":"uri","type":"string"}],"name":"createNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"destroyNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_salePrice","type":"uint256"}],"name":"royaltyInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]


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
            name, desc, image: t
        });
        try {
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            // run a function that creates sale and passes in the url 
         
            createSale(url)
            

        } catch (error) {
            console.log('Error uploading file:', error);
        }
    }


    async function createSale(url) {
        // create the items and list them on the marketplace
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        // we want to create the token
        let contract = new ethers.Contract(Nadd, Nabi, signer);
        let transaction = await contract.createNFT(signer.getAddress(),1000, url);
        let tx = await transaction.wait();
        let event = tx.events[0];
        let value = event.args[2];
        let tokenId = value.toNumber();
        const price = ethers.utils.parseUnits(price, 'ether');

       console.log(tokenId,price)
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
                   console.log(name,price,desc)
                }}>Create Nfts</button>
            </div>
           </div>
    )
}

export default Create;