import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

const LENS_ABI = require('../config/lens_contract_abi.json');
const STORY_ABI = require('../config/story_contract_abi.json');


export async function getUserContext() {
    const provider = await detectEthereumProvider();
    const web3 = new Web3(provider);
    const userAccounts = await web3.eth.requestAccounts();
    const userAccount = userAccounts[0];

    const lensContract = new web3.eth.Contract(LENS_ABI, process.env.NEXT_PUBLIC_LENS_CONTRACT_ADDRESS);
    const storyContract = new web3.eth.Contract(STORY_ABI, process.env.NEXT_PUBLIC_STORY_CONTRACT_ADDRESS);
    const profileId = await lensContract.methods.tokenOfOwnerByIndex(userAccount, 0).call();
    const blockId = await web3.eth.getBlockNumber();

    return {
        userAccount,
        lensContract,
        storyContract,
        profileId,
        blockId,
    };
}


export async function initServerContext(setContextFunc) {
    const web3 = createAlchemyWeb3(
        "https://polygon-mumbai.g.alchemy.com/v2/5aslVCoh9qA4GaA7qbnTj9v5xmfu3KKV",
    );

    const lensContract = new web3.eth.Contract(LENS_ABI, process.env.NEXT_PUBLIC_LENS_CONTRACT_ADDRESS);
    const storyContract = new web3.eth.Contract(STORY_ABI, process.env.NEXT_PUBLIC_STORY_CONTRACT_ADDRESS);

    setContextFunc({
        lensContract,
        storyContract,
    });
}
