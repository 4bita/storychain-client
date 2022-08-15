import { useState } from 'react';
import StoryModal from "./UI/modal/StoryModal";
import { addNewStory } from '../lib/story.js';


const StoryCreate = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    return (
        <>
            <StoryModal
                title="Create a new story"
                buttonName="Create story"
                onTitleChange={e => setTitle(e.target.value)}
                onBodyChange={e => setContent(e.target.value)}
                onSave={() => addNewStory({ title, content })}
            />
        </>
    );
};

export default StoryCreate;
