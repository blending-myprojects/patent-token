const dotenv = require("dotenv");
dotenv.config();

const dev_mode = process.env.DEV_MODE;

let CONTRACT_ADDRESS, CONTRACT_OWNER_ADDRESS,  CONTRACT_OWNER_PRIVATE_KEY, PROVIDER_URL;
let CONTRACT_ABI = process.env.CONTRACT_ABI;

switch (dev_mode) {
    case 'local':
        CONTRACT_ADDRESS = process.env.LOCAL_CONTRACT_ADDRESS;
        CONTRACT_OWNER_ADDRESS = process.env.LOCAL_CONTRACT_OWNER_ADDRESS;
        CONTRACT_OWNER_PRIVATE_KEY = process.env.LOCAL_PRIVATE_KEY;
        PROVIDER_URL = process.env.LOCAL_PROVIDER_URL;
        break;
    case 'staged':
        CONTRACT_ADDRESS = process.env.STAGED_CONTRACT_ADDRESS;
        CONTRACT_OWNER_ADDRESS = process.env.STAGED_CONTRACT_OWNER_ADDRESS;
        CONTRACT_OWNER_PRIVATE_KEY = process.env.STAGED_PRIVATE_KEY;
        PROVIDER_URL = process.env.STAGED_PROVIDER_URL;
        break;
    case 'main':
        CONTRACT_ADDRESS = process.env.MAIN_CONTRACT_ADDRESS;
        CONTRACT_OWNER_ADDRESS = process.env.MAIN_CONTRACT_OWNER_ADDRESS;
        CONTRACT_OWNER_PRIVATE_KEY = process.env.MAIN_PRIVATE_KEY;
        PROVIDER_URL = process.env.MAIN_PROVIDER_URL;
        break;
    default:
        throw new Error('Invalid DEV_MODE');
}


module.exports = {
    CONTRACT_ADDRESS, CONTRACT_ABI, CONTRACT_OWNER_ADDRESS,  CONTRACT_OWNER_PRIVATE_KEY, PROVIDER_URL
};