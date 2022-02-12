# 📝 NFT Minter Tutorial Files

This project was created from Alchemy's [NFT Minter tutorial](https://docs.alchemyapi.io/alchemy/tutorials/nft-minter).

It has been cleaned up and fixed up, and it is deployed at <https://alchemy-minter-inky.vercel.app/>

## ℹ️  Project Structure

```sh
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.js
│   ├── Minter.js
│   ├── contract-abi.json
│   ├── index.css
│   ├── index.js
│   └── utils
│       ├── interact.js
│       └── pinata.js
└── yarn.lock
```

Here is the transaction for the NFT I minted!!! How cool is that??
<https://ropsten.etherscan.io/tx/0x160fda474902be6d93783c92fe11639c10b2c97077bb1c440e0aaf72ee3a30ef>


## 🤔 Running it

```sh
yarn install
yarn start
```

## Prepping your wallet
1. Use [Ropsten Faucet](https://faucet.ropsten.be/) to add some test Eth to your account.
1. Connect Metamask via Ropsten Network
1. Fill in the fields and then click mint!
1. NB: The env variables point to my Pinata dev account so this probs won't work, but if you clone the project and use your own credentials you can mint it and see the Etherscan transaction!