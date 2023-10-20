// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use //console.log
// import "hardhat/console.sol";

contract Wallet {
    uint256 wallet = 0;

    constructor() {}

    function donate() public payable {
        wallet += msg.value;
    }

    function balance() public view returns (uint256) {
        return wallet;
    }

    function withdraw(address payable to) public {
        to.transfer(wallet - (wallet / 10));
    }
}
