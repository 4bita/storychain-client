import React, {  useEffect, useState } from 'react';
import ReactMarkdown from "react-markdown";

import MyButton from "./UI/button/MyButton";
import styles from "../styles/Candidate.module.css";
import { addCandidateVote } from "../lib/voting";


const Candidate = ({ candidate }) => {
    const [votes, setVotes] = useState(0);

    useEffect(() => {
        setVotes(candidate.votes);
    }, [])

    const onVote = () => { setVotes(votes + 1); }

    if (candidate.title && candidate.content)
        return (
            <div className={styles.candidateCard}>
                <div className="container">
                    <div className="row">
                        <strong>{candidate.title}</strong>
                        <div>
                            <ReactMarkdown>{candidate.content}</ReactMarkdown>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-end">
                        <div className="col-2">
                            Votes: {votes}
                            <br />
                            <MyButton onClick={ addCandidateVote.bind(null, candidate, onVote) }>Like</MyButton>
                        </div>
                    </div>
                </div>
            </div>
        );
};

export default Candidate;