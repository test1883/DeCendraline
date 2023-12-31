import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      url: process.env["API_URL"],
      accounts: process.env["PRIVATE_KEY"] ? [process.env["PRIVATE_KEY"]] : [],
    },
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: process.env["PRIVATE_KEY"] ? [process.env["PRIVATE_KEY"]] : [],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env["POLYSCAN_API_KEY"] ?? "",
    },
  },
};

export default config;
