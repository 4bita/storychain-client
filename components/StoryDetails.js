import { useState, useEffect, useContext } from "react";
import { ServerContext } from "./AppContext";
import Candidate from "./Candidate";
import CandidateAdd from "./CandidateAdd";
import SpinnerCat from "./UI/spinner/SpinnerCat";

import { loadCandidates, loadSubStories } from "../lib/loader";


export default function StoryDetails({storyId}) {
    const [candidates, setCandidates] = useState(null);
    const [subStories, setSubStories] = useState(null);
    const context = useContext(ServerContext);

    useEffect(() => {
        if(context && storyId)
            loadCandidates(storyId, setCandidates, context).catch(console.error);
    }, [context, storyId]);
    useEffect(() => {
        if(context && storyId) {
            loadSubStories(storyId, setSubStories, context).catch(console.error);
        }
    }, [context, storyId]);

    return (
        <div>
            <br />

            <h2 style={{margin: '20px'}}>Official story:</h2>
            <div className="CommittedStory">
                {
                    subStories === null
                        ? <SpinnerCat />
                        : subStories.map(s =>
                            <div key={s.id}>
                                <h3 style={{marginTop: '20px'}}>{s.title}</h3>
                                <hr />
                                <div>{s.body}</div>
                            </div>
                        )
                }
            </div>


            <h3 style={{paddingTop: '80px', margin: '20px'}}>Candidates to continue:</h3>
            {
                candidates === null
                    ? <SpinnerCat />
                    : candidates.map(c =>
                        <Candidate key={c.id} candidate={c} />
                    )
            }

            <CandidateAdd
                storyHead={ storyId }
                onAdd={(new_candidate) => {
                    setCandidates([...candidates, new_candidate]);
                }}
            />
        </div>
    );
}