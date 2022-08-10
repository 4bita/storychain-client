import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from "react";

import Story from "./Story";
import SpinnerCat from "./UI/spinner/SpinnerCat";
import { ServerContext } from "./AppContext";
import { loadStories } from '../lib/loader';


const StoryList = () => {
    const router = useRouter();
    const [stories, setStories] = useState(null);
    const context = useContext(ServerContext);

    useEffect(() => {
        if (context) {
            loadStories(context, setStories).catch(console.error);
        }
    }, [context]);

    const openStory = (e) => {
        router.push(`/stories/${e.target.id}`).catch(console.error);
    };

    return (
        <div>
            <h3 style={{ textAlign: 'center', marginTop: '40px' }}>List of stories...</h3>

            {
                stories === null
                    ? <SpinnerCat />
                    : stories.map(story =>
                        <Story
                            id={story.key}
                            content={story.content}
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
