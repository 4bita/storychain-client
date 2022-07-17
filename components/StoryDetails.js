import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "./AppContext";
import Candidate from "./Candidate";
import CandidateAdd from "./CandidateAdd";


async function loadCandidates(storyId, setCandidates, context) {
    const sub_ids = await context.storyContract.methods.getStory(storyId).call();
    const level = sub_ids.length - 1;

    const candidate_ids = await context.storyContract.methods.listStoryItemCandidates(storyId, level).call();

    const candidates = [];
    for(let cand_id of candidate_ids) {
        const pub = await context.lensContract.methods.getPub(cand_id.profileId, cand_id.pubId).call();
        const response = await axios.get(pub.contentURI);
        const cond_data = response.data;

        const votes = await context.storyContract.methods.getStoryItemCandidateVotes(
            storyId, level, [cand_id.profileId, cand_id.pubId]).call();

        candidates.push({
            id: Date.now(),
            title: cond_data.name,
            body: cond_data.content,
            votes: votes,
            head: storyId,
            level: level,
            candidate_key: [cand_id.profileId, cand_id.pubId],
        });
    }
    setCandidates(candidates);
}


async function loadSubStories(storyId, setSubStories, context) {
    const subStories = [];
    const sub_ids = await context.storyContract.methods.getStory(storyId).call();

    for(let sub_id of sub_ids) {
        const sub = await context.lensContract.methods.getPub(sub_id.profileId, sub_id.pubId).call();
        const response = await axios.get(sub.contentURI);
        const sub_data = response.data;

        subStories.push({id: Date.now(), title: sub_data.name, body: sub_data.content});
    }
    setSubStories(subStories);
}


export default function StoryDetails({storyId}) {
    const [candidates, setCandidates] = useState(null);
    const [subStories, setSubStories] = useState(null);
    const context = useContext(AppContext);

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
            {/*<MyButton onClick={openDetails} style={{fixed: 'right', marginTop: '20px'}}>Back</MyButton>*/}
            <br /><br />

            <h2 style={{margin: '20px'}}>Official story:</h2>
            <div className="CommittedStory">
                {
                    subStories === null
                        ? <div>Loading...</div>
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
                    ? <div>Loading...</div>
                    : candidates.map(c =>
                        <Candidate key={c.id} candidate={c} />
                    )
            }

            <CandidateAdd />
        </div>
    );
}