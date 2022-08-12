import axios from "axios";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { Story } from "./models/story";
import { Candidate } from "./models/candidate";
import { download_story } from "./ipfs";


const STORIES_QUERY = gql(`
    {
        stories {
            id
            profileId
            pubId
        }
    }
  
`)

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPH_API_URL,
    cache: new InMemoryCache(),
})


export async function loadStories(context, setStories) {
    const result = await client.query({query: STORIES_QUERY});
    const events_list = result.data.stories;
    const profilePubIds = events_list.map(e => [e.profileId, e.pubId]);

    const stories = [];
    for(let ids of profilePubIds){
        const pub = await context.lensContract.methods.getPub(...ids).call();
        const pubContent = await download_story(pub.contentURI);
        if (!pubContent)
            continue

        const story = new Story(pubContent, ids);
        stories.push(story)
    }
    setStories(stories);
}


export async function loadCandidates(storyId, setCandidates, context) {
    const sub_ids = await context.storyContract.methods.getStory(storyId).call();
    const level = sub_ids.length - 1;

    const candidate_ids = await context.storyContract.methods.listStoryItemCandidates(storyId, level).call();

    const candidates = [];
    for(let cand_id of candidate_ids) {
        const pub = await context.lensContract.methods.getPub(cand_id.profileId, cand_id.pubId).call();
        const response = await axios.get(pub.contentURI);
        const candidate_data = response.data;

        const votes = await context.storyContract.methods.getStoryItemCandidateVotes(
            storyId, level, [cand_id.profileId, cand_id.pubId]).call();

        candidates.push(
            new Candidate(candidate_data, level, storyId, votes, [cand_id.profileId, cand_id.pubId])
        );
    }
    setCandidates(candidates);
}


export async function loadSubStories(storyId, setSubStories, context) {
    const subStories = [];
    const sub_ids = await context.storyContract.methods.getStory(storyId).call();

    for(let sub_id of sub_ids) {
        const sub = await context.lensContract.methods.getPub(sub_id.profileId, sub_id.pubId).call();
        const response = await axios.get(sub.contentURI);
        const sub_data = response.data;

        subStories.push({id: Date.now(), title: sub_data.title, content: sub_data.content});
    }
    setSubStories(subStories);
}
