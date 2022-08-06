import {create} from "ipfs-http-client";


export async function upload_object(obj) {
    const storyJson = JSON.stringify(obj);
    const ipfs = create({url: process.env.NEXT_PUBLIC_IPFS_URL_CREATE});
    const {path} = await ipfs.add(storyJson);
    return process.env.NEXT_PUBLIC_IPFS_URL_READ + path;
}