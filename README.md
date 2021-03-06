# đ NFT Minter Tutorial Files

This project was created from Alchemy's [NFT Minter tutorial](https://docs.alchemyapi.io/alchemy/tutorials/nft-minter).

It has been cleaned up and fixed up, and it is deployed at <https://alchemy-minter-inky.vercel.app/>

## âšī¸  Project Structure

```sh
âââ README.md
âââ package.json
âââ public
â   âââ favicon.ico
â   âââ index.html
â   âââ logo192.png
â   âââ logo512.png
â   âââ manifest.json
â   âââ robots.txt
âââ src
â   âââ App.css
â   âââ App.js
â   âââ Minter.js
â   âââ contract-abi.json
â   âââ index.css
â   âââ index.js
â   âââ utils
â       âââ interact.js
â       âââ pinata.js
âââ yarn.lock
```

Here is the transaction for the NFT I minted!!! How cool is that??
<https://ropsten.etherscan.io/tx/0x160fda474902be6d93783c92fe11639c10b2c97077bb1c440e0aaf72ee3a30ef>


## đ¤ Running it

```sh
yarn install
yarn start
```

## Prepping your wallet
1. Use [Ropsten Faucet](https://faucet.ropsten.be/) to add some test Eth to your account.
1. Connect Metamask via Ropsten Network
1. Fill in the fields and then click mint!
1. NB: The env variables point to my Pinata dev account so this probs won't work, but if you clone the project and use your own credentials you can mint it and see the Etherscan transaction!