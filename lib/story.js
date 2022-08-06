import { getUserContext } from './init';
import { upload_object } from "./ipfs";


export async function addNewStory(story, event) {
    event.preventDefault();
    if (story.title && story.body) {
        const userContext = await getUserContext();

        const newStory = {...story, id: Date.now()};
        const ipfs_path = await upload_object(newStory);

        const onReceipt = async (receipt) => {
            const pub_id = parseInt(receipt.events[0].raw.topics[2]);
            await registerStoryInChain(pub_id, userContext);
        }
        await createStoryInChain(ipfs_path, userContext, onReceipt)
        alert(`Story '${story.title}' will be registered in blockchain after some time`);
    }
}


export async function addNewCandidate(candidate, storyHead, onAdd, event) {
    event.preventDefault();
    if (candidate.title && candidate.body) {
        const userContext = await getUserContext();
        const newCandidate = {...candidate, id: Date.now(), votes: 0};
        const ipfs_path = await upload_object(newCandidate);

        const onReceipt = async (receipt) => {
            const pub_id = parseInt(receipt.events[0].raw.topics[2]);
            await registerCandidateInChain(pub_id, storyHead, userContext, onAdd, newCandidate);
        }
        await createStoryInChain(ipfs_path, userContext, onReceipt)
        alert(`Candidate '${candidate.title}' will be registered in blockchain after some time`);
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


async function registerCandidateInChain(pub_id, storyHead, userContext, onAdd, newCandidate) {
    const sub_ids = await userContext.storyContract.methods.getStory(storyHead).call();
    const level = sub_ids.length - 1;

    userContext.storyContract.methods
        .appendStoryItemCandidate(storyHead, level, [userContext.profileId, pub_id])
        .send({ from: userContext.userAccount, gasPrice: process.env.NEXT_PUBLIC_POST_GAS_PRICE })
        .on('receipt', (receipt) => {
            console.log('Candidate was registered successfully. Receipt: ', receipt);
            onAdd(newCandidate);
        })
        .on('error', console.error);
}