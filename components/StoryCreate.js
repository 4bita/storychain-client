import { useState } from 'react';
import StoryModal from "./UI/modal/StoryModal";
import { addNewStory } from '../lib/story.js';


const StoryCreate = () => {
    const [story, setStory] = useState({title: '', content: ''});

    return (
        <>
            <StoryModal
                title="Create a new story"
                buttonName="Create new"
                onTitleChange={e => setStory({...story, title: e.target.value})}
                onBodyChange={e => setStory({...story, content: e.target.value})}
                onSave={addNewStory.bind(null, story)}
            />
        </>
    );
};

export default StoryCreate;