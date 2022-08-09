import React, {  useEffect, useState } from 'react';
import MyButton from "./UI/button/MyButton";
import styles from "../styles/Candidate.module.css";
import { addCandidateVote } from "../lib/voting";


const Candidate = (props) => {
    const [votes, setVotes] = useState(0);

    useEffect(() => {
        setVotes(props.candidate.votes);
    }, [])

    const onVote = () => { setVotes(votes + 1); }

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
                <MyButton onClick={ addCandidateVote.bind(null, props.candidate, onVote) }>Like</MyButton>
            </div>
        </div>
    );
};

export default Candidate;