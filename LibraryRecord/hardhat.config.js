require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_PRIVATE_KEY = "";

module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url:``,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};
