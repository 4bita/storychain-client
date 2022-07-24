import React, {useContext, useEffect, useState} from 'react';
import MyButton from "./UI/button/MyButton";
import AppContext from "./AppContext";
import styles from "../styles/Candidate.module.css";


const Candidate = (props) => {
    const context = useContext(AppContext);
    const [votes, setVotes] = useState(0);

    useEffect(() => {
        setVotes(props.candidate.votes);
    }, [])


    async function addStoryVote() {
        context.storyContract.methods
            .voteStoryItemCandidate(props.candidate.head, props.candidate.level, props.candidate.candidate_key)
            .send({'from': context.userAccount})
            .on('receipt', function(receipt) {
                setVotes(votes + 1);
            });
    }

    return (
        <div className={styles.candidateCard}>
            <div>
                <strong>{props.candidate.title}</strong>
                <div>
                    {props.candidate.body}
                </div>
            </div>
            <div>
                Votes: {votes}
                <br />
                <br />
                <MyButton onClick={addStoryVote}>Like</MyButton>
            </div>
        </div>
    );
};

export default Candidate;