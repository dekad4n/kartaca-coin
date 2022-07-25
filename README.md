# Project description
<br><br>
### Prerequisites
To be able to compile the project you need: <br>
Truffle v5.5.23 <br>
Ganache v7.3.2 <br>
Solidity v0.5.16 (solc-js) <br>
React ^18.2.0 <br>
<br>
### Installation
cd ./contracts <br>
npm install <br>
<br>
cd .. <br>
<br>
cd ./kartaca-coin-app <br>
Preffered: <br>
npm install <br>
Or: <br>
yarn install <br>
<br>
### Opening the project
Open Ganache, if your ganache port is not 7545 go: <br>
cd ./contracts <br>
Then open truffle-config.js <br>
Change port to your ganache port <br>
Save <br>
<br>
After save, run the commands in ./contracts: <br>
<--- To test first run truffle test ---> <br>
truffle compile <br>
truffle migrate <br>
<br>
Take deployed contract address and go ../kartaca-coin-app/.env <br>
change the variable REACT_APP_CONTRACT_ADDRESS <br>
<br>
Now you can start the project by <br>
npm start <br>
or <br>
yarn start <br>
<br>
### About the project
This project uses Metamask as provider, even though it should work with other providers. If you do not have metamask installed, you can install it via clicking the button.
After you access the metamask, choose an account from ganache, paste it's private key to metamask login. <br>
Then change your network to HTTP://127.0.0.1:7545 <br>
<br>
Eventually, you can use login button. After you logged in, you can write another public address from ganache in the right side, and an amount to send.<br>
If you want to change account, remove connected sites from metamask and refresh the page.

