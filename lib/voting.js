import { getUserContext } from "./init";


export async function addCandidateVote(candidate, onReceipt) {
    const userContext = await getUserContext();

    userContext.storyContract.methods
        .voteStoryItemCandidate(candidate.head, candidate.level, candidate.candidate_key)
        .send({'from': userContext.userAccount})
        .on('receipt', onReceipt);
}