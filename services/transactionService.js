const { Web3 } = require('web3');
const fs = require('fs');
const path = require('path');
const { PROVIDER_URL, CONTRACT_ADDRESS, CONTRACT_ABI } = require('../config');

const contractAbi = JSON.parse(fs.readFileSync(path.join(__dirname, CONTRACT_ABI), 'utf8'));

class TransactionService {
    constructor() {
        this.web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
        this.contract = new this.web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    }

    async sendTransaction(method, args, senderAddress, privateKey) {
        const transactionData = await this.contract.methods[method](...args).encodeABI();
        const gasLimit = await this.web3.eth.estimateGas({ to: this.contract.options.address, data: transactionData, from: senderAddress });
        
        const rawTransaction = {
            to: this.contract.options.address,
            data: transactionData,
            gas: gasLimit,
            maxFeePerGas: '1000000000000', // 최대 가스 가격 (1 Gwei)
            maxPriorityFeePerGas: '100000000000', // 최대 우선순위 가스 가격 (0.3 Gwei)
            from: senderAddress,
        };

        const signedTransaction = await this.web3.eth.accounts.signTransaction(rawTransaction, privateKey);
        const result = await this.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

        return result;
    }
    
    async callMethod(method, args, contractAddress) {
        const contract = new this.web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
        const result = await contract.methods[method](...args).call();
        return result;
    }
}

module.exports = TransactionService;