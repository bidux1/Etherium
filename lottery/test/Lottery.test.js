const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {
  interface,
  bytecode
} = require('../compile');
let account, lottery;
beforeEach(async () => {
  // get list of all account
  account = await web3.eth.getAccounts();
  // use one of account to deploy the contract
  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode
    })
    .send({
      from: account[0],
      gas: '1000000'
    })
});

describe('lottery', () => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address);
  });
});