import { getUserContext } from "./init";


export async function addCandidateVote(candidate, onReceipt) {
    const userContext = await getUserContext();

    userContext.storyContract.methods
        .voteStoryItemCandidate(candidate.head_story, candidate.level, candidate.key)
        .send({'from': userContext.userAccount})
        .on('receipt', onReceipt);
}