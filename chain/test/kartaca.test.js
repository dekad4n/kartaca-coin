const Kartaca = artifacts.require("contracts/KartacaCoin.sol");

contract("Kartaca", (accounts) => {
  before(async () => {
    kartaca = await Kartaca.deployed();
  });
  it("contract name and symbol", async () =>{
    let name = await kartaca.name();
    let symbol = await kartaca.symbol();
    assert.equal("KartacaCoin", name);
    assert.equal("KTC", symbol);
  });
  it("mint 1000000 worth of tokens", async () => {
    let balance = await kartaca.balanceOf(accounts[0]);
    balance = web3.utils.fromWei(balance);
    assert.equal(balance, 1000000, "Initial supply of token is 1000000");
  });

  it("valid transfer token to another account", async () => {
    let amount = web3.utils.toWei("500", "ether");
    await kartaca.transfer(accounts[1], amount, { from: accounts[0] });
    let balance = await kartaca.balanceOf(accounts[1]);
    balance = web3.utils.fromWei(balance);
    assert.equal(balance, 500, "token balance is 500");
  });
});