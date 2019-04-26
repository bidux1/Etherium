const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const mnemonic = 'tape govern husband vacuum author axis sure bunker thing absurd wire face';
const INIT_MESSAGE = 'Hi there!';
const {
    interface,
    bytecode
} = require('./compile');
const provider = new HDWalletProvider(
    mnemonic,
    'https://eth-rinkeby.alchemyapi.io/jsonrpc/39jSoRSmK1OG4OKOB3Xqtlu0ib2mPGXx'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: [INIT_MESSAGE]
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        });

    console.log('Contract deployed to', result.options.address);
};
deploy();