import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Story from "./Story";
import MyInput from "./UI/input/MyInput";
import AppContext from "./AppContext";
import SpinnerCat from "./UI/spinner/SpinnerCat";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const APIURL = 'https://api.thegraph.com/subgraphs/name/ilyatsupryk/storychain'

const tokensQuery = `
    {
        stories {
            id
            profileId
            pubId
        }
    }
  
`

const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
})


async function loadStories(context, setStories) {
    const result = await client.query({query: gql(tokensQuery)});
    const events_list = result.data.stories;
    const profilePubIds = events_list.map(e => [e.profileId, e.pubId]);

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


const StoryList = () => {
    const router = useRouter();
    const [stories, setStories] = useState(null);
    const context = useContext(AppContext);

    useEffect(() => {
        if(context){
            loadStories(context, setStories).catch(console.error);
        }
    }, [context]);

    const openStory = (e) => {
        router.push(`/stories/${e.target.id}`).catch(console.error);
    };

    return (
        <div>
            <h3 style={{textAlign: 'center', marginTop: '40px'}}>List of stories...</h3>

            <MyInput
                type='text'
                placeholder='Find a story'
                style={{marginTop: '20px'}}
            />
            <hr />

            {
                stories === null
                    ? <SpinnerCat />
                    : stories.map(story =>
                        <Story
                            id={story.key}
                            body={story.body}
                            title={story.title}
                            key={story.id}
                            openStory={openStory}
                        />
                    )
            }
        </div>
    );
};

export default StoryList;