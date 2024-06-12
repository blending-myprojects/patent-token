// const Patent = require('../models/Patent');
const TransactionService = require('../services/transactionService');
const { CONTRACT_OWNER_PRIVATE_KEY, CONTRACT_OWNER_ADDRESS, CONTRACT_ADDRESS } = require('../config');

const transactionService = new TransactionService();

/*
async function mintPatent (req, res, next) {
    try {
        const { patentName, category, country, patentDescription, totalTokens } = req.body;
        
        const result = await transactionService.sendTransaction(
            'mintPatent',
            [patentName, category, country, patentDescription, totalTokens],
            CONTRACT_OWNER_ADDRESS,
            CONTRACT_OWNER_PRIVATE_KEY
        );

        res.status(200).json({ message: '특허가 성공적으로 발행되었습니다.', result: replaceBigInts(result) });
    } catch (err) {
        next(err);
    }
};

async function transferTokens (req, res, next) {
    try {
        const { patentId, transferAmount, recipientAddress, senderAddress } = req.body;
        
        const result = await transactionService.sendTransaction(
            'transfer',
            [recipientAddress, transferAmount, patentId],
            senderAddress,
            CONTRACT_OWNER_PRIVATE_KEY       // 모든 transfer의 senderAddress가 CONTRACT_OWNER임을 가정
        );

        res.status(200).json({ message: '특허 토큰이 전송되었습니다.', result: replaceBigInts(result) });
    } catch (err) {
        next(err);
    }
};

async function getUserPatents (req, res, next) {
    try {
        const { userAddress } = req.params;
    
        const result = await transactionService.callMethod(
            'getUserPatents',
            [userAddress],
            CONTRACT_ADDRESS
        );

        console.log(result)

        const userPatents = [];

        // result의 구조에 따라 값을 추출합니다.
        const patentIds = replaceBigInts(result['0']);
        const patentShares = replaceBigInts(result['1']);
        const patentInfos = result['2'];

        for (let i = 0; i < patentIds.length; i++) {
            const patentInfo = patentInfos[i];
            userPatents.push({
                id: patentIds[i],
                share: patentShares[i],
                patentName: patentInfo['0'],
                category: patentInfo['1'],
                country: patentInfo['2'],
                description: patentInfo['3'],
                totalTokens: replaceBigInts(patentInfo['4']),
                exchange: patentInfo['5'],
            });
        }
    
        res.status(200).json({ userPatents });
    } catch (err) {
        next(err);
    }
};
*/

async function getPatentInfo(req, res, next) {
    try {
        const patentInfo = await transactionService.callMethod(
            'getPatentInfo',
            [],
            CONTRACT_ADDRESS
        );

        console.log(patentInfo)

        res.status(200).json({
            patentName: patentInfo[0],
            category: patentInfo[1],
            country: patentInfo[2],
            description: patentInfo[3],
            exchange: patentInfo[4],
        });
    } catch (err) {
        next(err);
    }
}

async function getTotalSupply(req, res, next) {
    try {
        const totalSupply = await transactionService.callMethod(
            'totalSupply',
            [],
            CONTRACT_ADDRESS
        );

        res.status(200).json({ totalSupply: replaceBigInts(totalSupply) });
    } catch (err) {
        next(err);
    }
}

async function getBalanceOf(req, res, next) {
    try {
        const { address } = req.params;
        const balance = await transactionService.callMethod(
            'balanceOf',
            [address],
            CONTRACT_ADDRESS
        );

        res.status(200).json({ balance: replaceBigInts(balance) });
    } catch (err) {
        next(err);
    }
}

async function transferTokens(req, res, next) {
    try {
        const { senderAddress, recipientAddress, amount } = req.body;

        const result = await transactionService.sendTransaction(
            'transfer',
            [recipientAddress, amount],
            senderAddress,
            CONTRACT_OWNER_PRIVATE_KEY
        );

        res.status(200).json({ message: '토큰 전송이 완료되었습니다.', result: replaceBigInts(result) });
    } catch (err) {
        next(err);
    }
}

function replaceBigInts(value) {
    if (typeof value === 'bigint') {
        return value.toString();
    } else if (Array.isArray(value)) {
        return value.map(replaceBigInts);
    } else if (typeof value === 'object' && value !== null) {
        return Object.fromEntries(
            Object.entries(value).map(([key, val]) => [key, replaceBigInts(val)])
        );
    } else {
        return value;
    }
}


module.exports = {
    /*
    mintPatent,
    transferTokens,
    getUserPatents,
    */
    getPatentInfo,
    getTotalSupply,
    getBalanceOf,
    transferTokens
}