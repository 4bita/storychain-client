import React, {useState} from 'react';
import StoryModal from "./UI/modal/StoryModal";
import { addNewCandidate} from "../lib/story";


const CandidateAdd = ({ storyHead, addCandidateOnUI }) => {
    const [candidate, setCandidate] = useState({title: '', body: ''})

    return (
        <>
            <StoryModal
                title="Propose another continuation:"
                buttonName="Create new"
                onTitleChange={e => setCandidate({...candidate, title: e.target.value})}
                onBodyChange={e => setCandidate({...candidate, body: e.target.value})}
                onSave={ addNewCandidate.bind(null, candidate, storyHead, addCandidateOnUI) }
            />
        </>
    );
};

export default CandidateAdd;