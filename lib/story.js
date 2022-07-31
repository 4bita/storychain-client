import { create } from 'ipfs-http-client';


export async function addNewStory(event, context) {
    event.preventDefault();
    if (story.title && story.body) {
        const newStory = {...story, id: Date.now()};
        const storyJson = JSON.stringify(newStory);

        const ipfs = create({url: process.env.NEXT_PUBLIC_IPFS_URL_CREATE});
        const {path} = await (ipfs).add(storyJson);
        const ipfs_path = process.env.NEXT_PUBLIC_IPFS_URL_READ + path;

        createStoryInChain(ipfs_path, context)

        alert(`Story '${story.title}' will be registered in blockchain after some time`);
    }
}


async function createStoryInChain(ipfs_path, context) {
    context.lensContract.methods
        .post([
            context.profileId,
            ipfs_path,
            process.env.NEXT_PUBLIC_COLLECT_MODULE,
            process.env.NEXT_PUBLIC_COLLECT_MODULE_INIT_DATA,
            process.env.NEXT_PUBLIC_ZERO_ADDRESS,
            []
        ])
        .send({ from: context.userAccount, gasPrice: process.env.NEXT_PUBLIC_POST_GAS_PRICE })
        .on('transactionHash', console.log)
        .on('receipt', (receipt) => {
            const pub_id = parseInt(receipt.events[0].raw.topics[2]);
            registerStoryInChain(pub_id)
        })
        .on('error', console.error);
}


async function registerStoryInChain(pub_id, context) {
    context.storyContract.methods
        .registerStory([context.profileId, pub_id])
        .send({ from: context.userAccount, gasPrice: process.env.NEXT_PUBLIC_POST_GAS_PRICE })
        .on('receipt', (receipt) => {
            console.log('Story was registered successfully. Receipt: ', receipt)
        })
        .on('error', console.error);
}
