class Patent {
    constructor(name, description, totalTokens, owner, patentId, exchange) {
        this.name = name;
        this.description = description;
        this.totalTokens = totalTokens;
        this.owner = owner;
        this.patentId = patentId;
        this.exchange = exchange;
        this.balances = {};
    }

    addBalance(address, amount) {
        if (!this.balances[address]) {
            this.balances[address] = 0;
        }
        this.balances[address] += amount;
    }

    removeBalance(address, amount) {
        if (!this.balances[address]) {
            throw new Error('Insufficient balance');
        }
        this.balances[address] -= amount;
    }

    getUserBalance(address) {
        return this.balances[address] || 0;
    }
}
  
module.exports = Patent;