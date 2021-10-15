# Voting Dapp

## Dependencies
- NPM: https://nodejs.org
- Truffle: https://github.com/trufflesuite/truffle
- Ganache: http://truffleframework.com/ganache/
- Metamask: https://metamask.io/
- Yarn: https://yarnpkg.com/

## Running Contract on local Blockchain
- Install Metamask extension on a browser 
- Install and open Ganache
- Connect Metamask network to Ganache RPC server
- Import some Ganache users to Metamask 
- `npm install -g truffle`
- `truffle migrate` from root dir
- `truffle migrate --reset` to redeploy (will wipe all data and change contract's address)
  
## Checking on Contract from console 
- `truffle console` from root dir
- execute the following commands from the truffle console
``` javascript
    Election.deployed().then(function(i) {app = i}) // to get the contract instance
    app.address // to get contract's addres
    app.addOfficialCandidate('candidateName') // to call a contract method
    app.candidatesCount() // to call getter on contract property
    app.candidates(1) // to get the first candidate
```

## Starting front-end app
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- `npm install` from root dir
- `npm install -g yarn`
- navigate to /build/Election.json
  - copy the `abi` array to `ELECTION_ABI` in /src/config.js 
  - copy `address` under `networks` to `ELECTION_ADDRESS` in /src/config.js
- `yarn start`
- open app ([http://localhost:3000](http://localhost:3000)) in a browser with Metamask installed
- connect Metamask to app


## Some Docs & Resources
- Ethereum Documentation: https://ethereum.org/en/developers/
- Solidity Documentation: https://docs.soliditylang.org/en/v0.8.9/
- Web3 Documentation: https://web3js.readthedocs.io/en/v1.5.2/web3-eth-contract.html
- Online Solidity IDE: https://remix.ethereum.org/
- Cool visualization of Blockchain protocols: https://eth.build/