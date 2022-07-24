import {useContext, useState} from 'react';
import { create } from 'ipfs-http-client';
import AppContext from "./AppContext";
import StoryModal from "./UI/modal/StoryModal";

const IPFS_URL_CREATE = "https://ipfs.infura.io:5001/api/v0";
const IPFS_URL_READ = "https://ipfs.infura.io/ipfs/";


const StoryCreate = () => {
    const [story, setStory] = useState({title: '', body: ''});
    const context = useContext(AppContext);

    let addNewStory = async (e) => {
        e.preventDefault();
        if (story.title && story.body) {
            const newStory = {...story, id: Date.now()};
            const storyJson = JSON.stringify(newStory);

            const ipfs = create({url: IPFS_URL_CREATE});
            const {path} = await (ipfs).add(storyJson);
            const ipfs_path = IPFS_URL_READ + path;

            const res = await context.lensContract.methods
                .post([context.profileId, ipfs_path, '0x5e70ffd2c6d04d65c3abeba64e93082cfa348df8', '0x', '0x0000000000000000000000000000000000000000', []])
                .send({'from': context.userAccount});

            console.log("first transaction passed")
            const pub_id = parseInt(res.events[0].raw.topics[2]);
            setStory({title: '', body: ''});

            return await context.storyContract.methods
                .registerStory([context.profileId, pub_id])
                .send({'from': context.userAccount});
        }
    }

    return (
        <>
            <StoryModal
                title="Create a new story"
                buttonName="Create new"
                onTitleChange={e => setStory({...story, title: e.target.value})}
                onBodyChange={e => setStory({...story, body: e.target.value})}
                onSave={addNewStory}
            />
        </>
    );
};

export default StoryCreate;