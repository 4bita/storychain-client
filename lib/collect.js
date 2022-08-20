import { getUserContext } from "./init";


export async function collectStory(storyId) {
    const userContext = await getUserContext();
    const [profileId, pubId] = storyId;

    userContext.lensContract.methods
        .collect(
            profileId,
            pubId,
            []
        )
        .send({ from: userContext.userAccount, gasPrice: process.env.NEXT_PUBLIC_POST_GAS_PRICE })
        .on('transactionHash', console.log)
        .on('receipt', console.log)
        .on('error', console.error);
}