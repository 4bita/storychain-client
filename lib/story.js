import { getUserContext } from './init';
import { upload_object } from "./ipfs";
import { Story } from "./models/story";
import { Candidate } from "./models/candidate";


export async function addNewStory(story_data, event) {
    event.preventDefault();
    if (story_data.title && story_data.content) {
        const userContext = await getUserContext();

        const newStory = new Story(story_data);
        const ipfs_path = await upload_object(newStory);

        const onReceipt = async (receipt) => {
            const pub_id = parseInt(receipt.events[0].raw.topics[2]);
            await registerStoryInChain(pub_id, userContext);
        }
        await createStoryInChain(ipfs_path, userContext, onReceipt)
        alert(`Story '${story_data.title}' will be registered in blockchain after some time`);
    }
}


export async function addNewCandidate(candidate_data, storyHead, addCandidateOnUI, event) {
    event.preventDefault();
    if (candidate_data.title && candidate_data.body) {
        const userContext = await getUserContext();
        const newCandidate = new Candidate(candidate_data);
        const ipfs_path = await upload_object(newCandidate);

        const onReceipt = async (receipt) => {
            const pub_id = parseInt(receipt.events[0].raw.topics[2]);
            await registerCandidateInChain(pub_id, storyHead, userContext, addCandidateOnUI, newCandidate);
            addCandidateOnUI(newCandidate);
        }
        await createStoryInChain(ipfs_path, userContext, onReceipt)
        alert(`Candidate '${candidate_data.title}' will be registered in blockchain after some time`);
    }
}


async function createStoryInChain(ipfs_path, userContext, onReceipt) {
    userContext.lensContract.methods
        .post([
            userContext.profileId,
            ipfs_path,
            process.env.NEXT_PUBLIC_COLLECT_MODULE,
            process.env.NEXT_PUBLIC_COLLECT_MODULE_INIT_DATA,
            process.env.NEXT_PUBLIC_ZERO_ADDRESS,
            []
        ])
        .send({ from: userContext.userAccount, gasPrice: process.env.NEXT_PUBLIC_POST_GAS_PRICE })
        .on('transactionHash', console.log)
        .on('receipt', onReceipt)
        .on('error', console.error);
}


async function registerStoryInChain(pub_id, userContext) {
    userContext.storyContract.methods
        .registerStory([userContext.profileId, pub_id])
        .send({ from: userContext.userAccount, gasPrice: process.env.NEXT_PUBLIC_POST_GAS_PRICE })
        .on('receipt', (receipt) => {
            console.log('Story was registered successfully. Receipt: ', receipt)
        })
        .on('error', console.error);
}


async function registerCandidateInChain(pub_id, storyHead, userContext) {
    const sub_ids = await userContext.storyContract.methods.getStory(storyHead).call();
    const level = sub_ids.length - 1;

    await userContext.storyContract.methods
        .appendStoryItemCandidate(storyHead, level, [userContext.profileId, pub_id])
        .send({ from: userContext.userAccount, gasPrice: process.env.NEXT_PUBLIC_POST_GAS_PRICE })
        .on('receipt', (receipt) => {
            console.log('Candidate was registered successfully. Receipt: ', receipt);
        })
        .on('error', console.error);
}