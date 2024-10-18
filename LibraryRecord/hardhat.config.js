require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_PRIVATE_KEY = "1fd9ab44d71d9e96d65bbfc48b82286fdc4001f2c47d70d56d25df98db393f0b";

module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url:`https://sepolia.infura.io/v3/73bed2bb63384622a3eac47a4a93504a`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};
