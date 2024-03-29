import { useState, useEffect, useContext } from "react";
import ReactMarkdown from "react-markdown";

import { ServerContext } from "./AppContext";
import Candidate from "./Candidate";
import CandidateAdd from "./CandidateAdd";
import AppSpinner from "./UI/spinner/AppSpinner";
import { loadCandidates, loadSubStories } from "../lib/loader";
import MyButton from "./UI/button/MyButton";
import { collectStory } from "../lib/collect";


export default function StoryDetails({ storyId }) {
    const [candidates, setCandidates] = useState(null);
    const [subStories, setSubStories] = useState(null);
    const context = useContext(ServerContext);

    useEffect(() => {
        if (context && storyId)
            loadCandidates(storyId, setCandidates, context).catch(console.error);
    }, [context, storyId]);
    useEffect(() => {
        if (context && storyId) {
            loadSubStories(storyId, setSubStories, context).catch(console.error);
        }
    }, [context, storyId]);

    return (
        <div className="bg-white py-4 px-8 rounded-md">
            <h2 className="font-medium mb-3">Official story</h2>
            <div className="CommittedStory">
                {
                    subStories === null
                        ? <div className="mx-auto text-center">
                            <AppSpinner />
                        </div>
                        : subStories.map(s =>
                            <div key={s.id}>
                                <h3 style={{ marginTop: '20px' }}>{s.title}</h3>
                                <div>
                                    <ReactMarkdown>{s.content}</ReactMarkdown>
                                </div>
                            </div>
                        )
                }
                <br />
                <div className="rightButton">
                    <MyButton onClick={() => {collectStory(storyId)}}>
                        Collect
                    </MyButton>
                </div>
            </div>


            <h3 className="font-medium" style={{ marginTop: '80px' }}>Candidates to continue</h3>
            {
                candidates === null
                    ? <div className="text-center">
                        <AppSpinner />
                    </div>
                    : candidates.map(c =>
                        <Candidate key={c.id} candidate={c} />
                    )
            }

            <CandidateAdd
                storyHead={storyId}
                addCandidateOnUI={(new_candidate) => {
                    setCandidates([...candidates, new_candidate]);
                }}
            />
        </div>
    );
}
