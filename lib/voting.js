import { getUserContext } from "./init";


export async function addCandidateVote(candidate, onReceipt) {
    const userContext = await getUserContext();

    userContext.storyContract.methods
        .voteStoryItemCandidate(candidate.head_story, candidate.level, candidate.key)
        .send({ 'from': userContext.userAccount, gasPrice: process.env.NEXT_PUBLIC_POST_GAS_PRICE })
        .on('receipt', onReceipt);
}