// This file contains all of our wallet and smart contract interfacing.

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
      status: (
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
    }
  }
}