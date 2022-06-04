import React, { useState, useEffect } from 'react'

import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import { create as ipfsHttpClient } from 'ipfs-http-client'

import axios from 'axios'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const Madd = "0x284193407258017439B39aB328dA84343f0cBE86";
const Nadd = "0x53A6dD6c9884E54fb173E35E1236806003EE4128";
const Nabi = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_tokenIds","outputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint96","name":"royaltyPercentage","type":"uint96"},{"internalType":"string","name":"uri","type":"string"}],"name":"createNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"destroyNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_salePrice","type":"uint256"}],"name":"royaltyInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const Mabi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"NFTcontract","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"}],"name":"sellDetails","type":"event"},{"inputs":[{"internalType":"address","name":"_nftContract","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"CancelFixPriceNFTtSell","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"NFTcreates","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_nftContract","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_Price","type":"uint256"}],"name":"RegisterFixPriceNFtSell","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_nftContract","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"buyAtFixedPrice","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newadmin","type":"address"}],"name":"changeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"fixSell","outputs":[{"internalType":"address","name":"nftContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"Price","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"fixSellIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"NFTcreate","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"priceOfNft","outputs":[{"internalType":"uint256","name":"priceTobePaid","type":"uint256"},{"internalType":"uint256","name":"royaltyAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"NftcreateAddress","type":"address"}],"name":"setNftCreationContract","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    

function Collection() {
    const [nfts, setNFts] = useState([])
    const [address,setAdd] = useState(""); 
    const [loadingState, setLoadingState] = useState('not-loaded')

    useEffect(() => {
        loadNFTs()
    }, [])
    // async function getDetails(){
    //     alert("Get All Past Records!!")
    //     try{
    //         const web3Modal = new Web3Modal()
    //     const connection = await web3Modal.connect()
    //    const provider = new ethers.providers.Web3Provider(connection)
    //    const tokenContract = new ethers.Contract(Nadd, Nabi, provider.getSigner())
    //      const marketContract = new ethers.Contract(Madd, Mabi, provider.getSigner())
    //      console.log(marketContract)
    //        //let eventFilter = marketContract.filters;
    //        const filter = {
    //         address: Madd,
    //         fromBlock: 0,
    //         toBlock: 5000,
    //         topics: [marketContract.interface.events]
    //       };
    //      console.log(filter)
    //     //  const myContract = new ethers.Contract(contractAddress, contract.abi, provider);
    //     //  let pr = await tokenContract.queryFilter("Transfer",{fromBlock:0,toBlock:5000});
    //    //   console.log(pr);  
    //       let eventFilter = marketContract.interface
    //       console.log(eventFilter)
    //       let events = await marketContract.queryFilter("sellDetails",0,5000) //not working if I specify blocks
    //       console.log(events)
    //       console.log(filter)
    //       var pr = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/")
    //       const logs = await pr.getHistory(Madd,0,"latest");

    //        console.log(logs);
    //     //var provider = new ethers.providers.BscScanProvider();
    //    // console.log(t);
    //     }
    //     catch(e){
    //         console.log(e);
    //     }
    // }
     async function RegisterNfts(dt){
       console.log(dt) 
      }

      async function CancelNfts(dt){
          console.log(dt);
      }
    

    async function loadNFTs() {
        // what we want to load:
        // ***provider, tokenContract, marketContract, data for our marketItems***
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        setAdd(await provider.getSigner().getAddress());
        const tokenContract = new ethers.Contract(Nadd, Nabi, provider)
        const marketContract = new ethers.Contract(Madd, Mabi, provider)
        const data = await tokenContract._tokenIds()
        console.log(data.toString());
        const tc = []
        for(let i=2;i<=data;i++){
            try{
                let temp = []
                temp.push(await tokenContract.tokenURI(i));
                temp.push(i);
                console.log(await tokenContract.ownerOf(i))
                temp.push(await tokenContract.ownerOf(i))
               // console.log(temp);
                tc.push(temp)
               // console.log(tc);
            }catch(e){
                    console.log("Token dose not exsist!!");
            }
             
        }
        console.log("All Tokens",tc);
        const items = await Promise.all(tc.map(async i => {
            
          
            // we want get the token metadata - json 
            const b = await marketContract.fixSellIndex("0x53A6dD6c9884E54fb173E35E1236806003EE4128",i[1]);
            console.log(b.toString());
            let item;
            if(b.toString()>0){
                console.log(i);
                const p = await marketContract.fixSell(b.toString())
                console.log(p.Price.toString(),i[0],i[2]);
                const n = await tokenContract.tokenURI(i[1]);
                const meta = await axios.get(n)
                item = {
                    image: meta.data.image,
                    name: meta.data.name,
                    description: meta.data.desc,
                    tokenId: i[1],
                    status: "OnSell",
                    owner: i[2]
                }
                console.log(item);
        }else{
            const n = await tokenContract.tokenURI(i[1]);
            const meta = await axios.get(n)
            item = {
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.desc,
                tokenId: i[1],
                status: "NotSell",
                owner: i[2]
            }
            console.log(item);
        }
        if(item){
            return item
        } 
            
        }))
        console.log(items)
        
        setNFts(items)
        
       
        setLoadingState('loaded')
    }

    // function to buy nfts for market 

    // async function buyNFT(nft) {
    //     try {
    //         const web3Modal = new Web3Modal()
    //         const connection = await web3Modal.connect()
    //         const provider = new ethers.providers.Web3Provider(connection)
    //         const signer = provider.getSigner()
    //         const contract = new ethers.Contract(nftmarketaddress, KBMarket.abi, signer)

    //         const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    //         const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
    //             value: price
    //         })

    //         await transaction.wait()
    //         loadNFTs()
    //     }
    //     catch (er) {
    //         toast.error("insufficient funds");
    //     }
    // }
    if (loadingState === 'loaded' && !nfts.length) return (<h1
        className='px-20 py-7 text-4x1'>No NFts in marketplace</h1>)
    return (
        <div className="marketplacePage">
            <div className="marketplaceInnerPage">
                <div className='mt'>
                  
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <h1 className='mt'>All Loyal NFTs Collection</h1>
                <div className="cardCon">
              
                    {
                        nfts.map((nft, i) => (
                            nft != undefined ? <div key={i} className="nftCard"
                                >
                                    
                                <img className="inft" src= {nft.image} alt="" />
                                <span className="cardLower">
                                    <h3 className="title">{nft.name}</h3>
                                    <h3 className="title">{nft.description}</h3>
                                    {/* <h3 className="price">{nft.pr} Eth</h3> */}
                                    <div>
                                        {console.log(nft.owner,address)}
                                        { 
                                            nft.status != "OnSell" ? <button className='btn11'  onClick={async ()=>{
                                                console.log(nft);
                                                await RegisterNfts(nft);
                                            }}> Sell Now </button>
                                        :
                                        <button className='btn11'  onClick={async ()=>{
                                            console.log(nft);
                                            await CancelNfts(nft);
                                        }}> Cancel Sell </button>
                                        }
                                        
                                    </div>
                                    
                                </span>
                            </div> : ""
                        ))
                    }

                </div>
            </div>
            {/* <button className='btn11' onClick={async()=>{
                await getDetails();
            }}>Admin</button> */}
        </div>
    )
}

export default Collection