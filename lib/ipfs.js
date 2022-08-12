import { create } from "ipfs-http-client";
import axios from "axios";

const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID;
const projectKey = process.env.NEXT_PUBLIC_IPFS_PROJECT_KEY;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectKey).toString('base64');

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});


export async function upload_object(obj) {
    const storyJson = JSON.stringify(obj);
    const { path } = await client.add(storyJson);
    return process.env.NEXT_PUBLIC_IPFS_URL_READ + path;
}


export async function download_story(ipfs_url) {
    let content = null;
    try {
        const response = await axios.get(ipfs_url);
        content = await response.data;
    }
    catch (e) {
        console.error(e)
    }

    return content;
}