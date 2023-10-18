import { ethers } from "hardhat";

async function main() {
  const Wallet = await ethers.getContractFactory("Wallet");
  const walletPFP = await Wallet.deploy();

  await walletPFP.deployed();

  console.log("Polygon PFP deployed to:", walletPFP.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
