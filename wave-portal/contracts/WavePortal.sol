// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {

    uint256 totalWaves;
    uint256 private seed;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave{
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log("This is the Wave Contract");

        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {

        require(
            lastWavedAt[msg.sender] + 15 seconds < block.timestamp,
            "Wait 15s"
        );

        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s has waved w/message %s", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        seed = (block.difficulty+block.timestamp+seed) % 100;
        console.log("Random # generated:", seed);

        emit NewWave(msg.sender, block.timestamp, _message);

        if (seed<=50) {
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(
                success, "Failed to withdraw money from contract."
            );
        }
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("Total waves: %s", totalWaves);
        return totalWaves;
    }

    function getAllWaves() public view returns (Wave[] memory){
        return waves;
    }
}