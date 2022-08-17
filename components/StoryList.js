import { useContext, useEffect, useState } from "react";

import Story from "./Story";
import AppSpinner from "./UI/spinner/AppSpinner";
import { ServerContext } from "./AppContext";
import { loadStories } from '../lib/loader';


const StoryList = () => {
    const [stories, setStories] = useState(null);
    const context = useContext(ServerContext);

    useEffect(() => {
        if (context) {
            loadStories(context, setStories).catch(console.error);
        }
    }, [context]);

    return (
        <>
            {
                stories === null
                    ? <div className="text-center">
                        <AppSpinner />
                    </div>
                    : stories.map(story =>
                        <Story
                            id={story.key}
                            content={story.content}
                            title={story.title}
                            key={story.id}
                        />
                    )
            }
        </>
    );
};

export default StoryList;
