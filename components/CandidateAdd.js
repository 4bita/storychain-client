import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import MyTextArea from "./UI/text_area/MyTextArea";
import StoryModal from "./UI/modal/StoryModal";

const CandidateAdd = () => {
    const [candidate, setCandidate] = useState({title: '', body: ''})

    let addNewCandidate = async (e) => {
        e.preventDefault();
        if (candidate.title && candidate.body) {
            alert('This function is not added yet')
        }
    }

    return (
        <>
            <StoryModal
                title="Propose another continuation:"
                buttonName="Create new"
                onTitleChange={e => setCandidate({...candidate, title: e.target.value})}
                onBodyChange={e => setCandidate({...candidate, body: e.target.value})}
                onSave={addNewCandidate}
            />
        </>
    );
};

export default CandidateAdd;