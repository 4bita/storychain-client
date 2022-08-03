import axios from "axios";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

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
    console.log('Server context:');
    console.log(context);
    const result = await client.query({query: STORIES_QUERY});
    const events_list = result.data.stories;
    const profilePubIds = events_list.map(e => [e.profileId, e.pubId]);

    console.log('Fetched pub_ids from the graph', profilePubIds);

    const stories = [];
    for(let ids of profilePubIds){
        const pub = await context.lensContract.methods.getPub(...ids).call();
        const response = await axios.get(pub.contentURI);
        const pubContent = await response.data;
        const story = {
            id: Date.now(),
            title: pubContent.title,
            body: pubContent.body,
            key: ids
        };
        stories.push(story)
    }
    setStories(stories);
}