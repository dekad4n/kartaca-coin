var KartacaCoin = artifacts.require("KartacaCoin");

module.exports = function(deployer) {
  deployer.deploy(KartacaCoin);
};