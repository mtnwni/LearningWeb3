const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { ethers } = require("hardhat");
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

// console.log(JSON.stringify(contract.abi));

const alechemyProvider = new ethers.providers.AlchemyProvider(network='ropsten', API_KEY);

const signer = new ethers.Wallet(PRIVATE_KEY, alechemyProvider);

const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    const message = await helloWorldContract.message();
    console.log("Contract message:", message);

    console.log("Update Message");
    const tx = await helloWorldContract.update("New World!");
    await tx.wait();

    const newMessage = await helloWorldContract.message();
    console.log("Contract message:", newMessage);
}

main();