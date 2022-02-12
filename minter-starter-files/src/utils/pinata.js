require('dotenv').config();

const key = process.env.REACT_APP_PINATA_API_KEY;
const secret = process.env.REACT_APP_PINATA_API_SECRET;

const axios = require('axios');

export async function pinJSONtoIPFS (body) {
  const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS'
  return axios.post(url, body, {
    headers: {
      pinata_api_key: key,
      pinata_secret_api_key: secret,
    }
  }).then(response => {
    return {
      success: true,
      // this Url will be used as the tokenURI input into the mint function of the contract.
      pinataUrl: 'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
    }
  }).catch(error => {
    console.log(error)
    return {
      success: false,
      message: error.message
    }
  })
}
