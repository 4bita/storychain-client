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

            alert(`Story '${story.title}' will be registered in blockchain after some time`)

            context.lensContract.methods
                .post([
                    context.profileId,
                    ipfs_path,
                    '0x5e70ffd2c6d04d65c3abeba64e93082cfa348df8',
                    '0x',
                    '0x0000000000000000000000000000000000000000',
                    []
                ])
                .send({ from: context.userAccount, gasPrice: 50000000000 })
                .on('transactionHash', console.log)
                .on('receipt', (receipt) => {
                    const pub_id = parseInt(receipt.events[0].raw.topics[2]);
                    registerStory(pub_id)
                })
                .on('error', console.error);
        }
    }

    async function registerStory(pub_id) {
        context.storyContract.methods
            .registerStory([context.profileId, pub_id])
            .send({ from: context.userAccount, gasPrice: 50000000000 })
            .on('receipt', (receipt) => {
                console.log('Story was registered successfully. Receipt: ', receipt)
            })
            .on('error', console.error);
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