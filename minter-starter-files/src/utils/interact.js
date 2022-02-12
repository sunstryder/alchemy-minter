// This file contains all of our wallet and smart contract interfacing.
import { pinJSONtoIPFS } from './pinata.js'
import { createAlchemyWeb3 } from '@alch/alchemy-web3'
require('dotenv').config();
const alchKey = process.env.REACT_APP_ALCHEMY_KEY;
// this is the alchemy wrapper around web3.js.
const web3 = createAlchemyWeb3(alchKey);
// the contract ABI, which we're interfacing with
const contractABI = require('../contract-abi.json')
// this is the example contract used for tutorial
// see https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE#code
const contractAddress = '0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE'

// connectWallet checks for a wallet plugin (metamask).
export const connectWallet = async () => {
  if (window.ethereum) {
    //  if it exists, use the metamask API to get the addresses for this wallet.
    try {
      const addressArray = await window.ethereum.request({
        // this is a metamask RPC API request.
        // see https://docs.metamask.io/guide/rpc-api.html#restricted-methods
        method: "eth_requestAccounts",
      });
      const payload = {
        status: '👆🏽 Write a message in the text-field above.',
        address: addressArray[0],
      };
      return payload;
    } catch (error) {
      // if there's an error, return the error.
        return {
          status: '😥 ...' + error.message,
          address: '',
        }
      }
  } else {
    // If metamask isn't installed, let the user know via UI
    return {
      address: '',
      status: noMetaMaskErrorStatus
    }
  }
}

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    //  if it exists, metamask is installed.
    try {
      const addressArray = await window.ethereum.request({
        // this is a an ETH RPC API request.
        // see https://eth.wiki/json-rpc/API#eth_accounts
        method: "eth_accounts",
      });

      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: '👆🏽 Write a message in the text-field above.',
        }
      } else {
        // not connected, no addresses in array.
        return {
          address: '',
          status: '🦊 Connect to Metamask using the top right button.',
        }
      }
    } catch (error) {
      // if there's an error, return the error.
        return {
          status: '😥 ...' + error.message,
          address: '',
        }
    }
  } else {
    // If metamask isn't installed, let the user know via UI
    return {
      address: '',
      status: noMetaMaskErrorStatus
    }
  }
}

export const noMetaMaskErrorStatus = (
  <span>
    <p>
      {" "}
      🦊{" "}
      <a target="_blank" href={`https://metamask.io/download.html`}>
        You must install Metamask, a virtual Ethereum wallet, in your
        browser.
      </a>
    </p>
  </span>
)

// Typescript could remove this type checking error handling.
export const mintNFT = async (url, name, description) => {
  if (url.trim() == '' || (name.trim() == '' || description.trim() == '')) {
    return {
      success: false,
      status: '❗Please make sure all fields are completed before minting.'
    }
  }

  // create metadata
  const metadata = new Object();
  metadata.name = name
  metadata.image = url
  metadata.description = description

  // call pinata api to upload to IPFS
  const pinataResponse = await pinJSONtoIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI."
    }
  }

  // if everything goes according to plan we get our URI
  const tokenURI = pinataResponse.pinataUrl;
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  // preparing data for Ethereum transaction
  const transactionParams = {
    to: contractAddress,
    from: window.ethereum.selectedAddress,
    // call the actual smart contract here
    'data': window.contract.methods.mintNFT(window.ethereum.selectedAddress, tokenURI).encodeABI()
  }

  // sign the transaction

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParams],
    });
    return {
      success: true,
      status: '🚀 Your token has been minted! https://ropsten.etherscan.io/tx/' + txHash,
    }
  } catch (err) {
    return {
      success: false,
      status: '😥 Something went wrong while minting your token.' + err.message
    }
  }
}

