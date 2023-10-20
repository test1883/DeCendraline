import { ethers } from "hardhat";

async function main() {
  const wallet = await ethers.deployContract("Wallet");

  //console.log("Wallet address:", await wallet.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
