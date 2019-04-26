const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const INIT_MESSAGE = 'Hi there!';
const {
  interface,
  bytecode
} = require('../compile');
let account, inbox;
beforeEach(async () => {
  // get list of all account
  account = await web3.eth.getAccounts();
  // use one of account to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INIT_MESSAGE]
    })
    .send({
      from: account[0],
      gas: '1000000'
    })
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INIT_MESSAGE)
  });
  it('has a default message', async () => {
    await inbox.methods.setMessage('bye').send({ from: account[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye')
  });

});