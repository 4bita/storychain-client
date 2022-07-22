import {useState} from 'react';
import { create } from 'ipfs-http-client';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import MyTextArea from "./UI/text_area/MyTextArea";

const IPFS_URL_CREATE = "https://ipfs.infura.io:5001/api/v0";
const IPFS_URL_READ = "https://ipfs.infura.io/ipfs/";


const StoryCreate = (props) => {
    const [story, setStory] = useState({title: '', body: ''})

    let addNewStory = async (e) => {
        e.preventDefault();
        if (story.title && story.body) {
            const newStory = {...story, id: Date.now()};
            const storyJson = JSON.stringify(newStory);

            const ipfs = create({url: IPFS_URL_CREATE});
            const {path} = await (ipfs).add(storyJson);
            const ipfs_path = IPFS_URL_READ + path;

            let res = await props.meta.lens_contract.methods
                .post([props.meta.profileId, ipfs_path, '0x5e70ffd2c6d04d65c3abeba64e93082cfa348df8', '0x', '0x0000000000000000000000000000000000000000', []])
                .send({'from': props.meta.userAccount});


            const pub_id = parseInt(res.events[0].raw.topics[2]);
            await props.meta.story_contract.methods
                .registerStory([props.profileId, pub_id])
                .send({'from': props.meta.userAccount});

            props.addItem(newStory);
            setStory({title: '', body: ''});
        }
    }

    return (
        <div>
            <form>
                <h3 style={{textAlign: 'center', marginTop: '40px'}}>New story</h3>
                <MyInput
                    type='text'
                    placeholder='Title'
                    rows='3'
                    value={story.title}
                    onChange={e => setStory({...story, title: e.target.value})}
                />
                <MyTextArea
                    type='text'
                    placeholder='Story body'
                    value={story.body}
                    onChange={e => setStory({...story, body: e.target.value})}
                />
                <MyButton onClick={addNewStory} style={{float: 'right'}}>New Story</MyButton>
            </form>
        </div>
    );
};

export default StoryCreate;