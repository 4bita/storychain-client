import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import MyTextArea from "./UI/text_area/MyTextArea";

const CandidateAdd = () => {
    const [candidate, setCandidate] = useState({title: '', body: ''})

    let addNewCandidate = async (e) => {
        e.preventDefault();
        if (candidate.title && candidate.body) {
            console.log(`Create a candidate with title: ${candidate.title} and body ${candidate.body}`)
        }
    }

    return (
        <div>
            <form style={{float: 'left'}}>
                <h3 style={{margin: '20px', paddingTop: '30px'}}>Propose a new continuation:</h3>
                <MyInput
                    type='text'
                    placeholder='Title'
                    value={candidate.title}
                    onChange={e => setCandidate({...candidate, title: e.target.value})}

                />
                <MyTextArea
                    type='text'
                    rows='3'
                    placeholder='Story body'
                    value={candidate.body}
                    onChange={e => setCandidate({...candidate, body: e.target.value})}
                />
                <MyButton onClick={addNewCandidate} style={{float: 'right'}}>New Story</MyButton>
            </form>
        </div>
    );
};

export default CandidateAdd;