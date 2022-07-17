import StoryDetails from "../../components/StoryDetails";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function StoryPage() {
    const [storyId, setStoryId] = useState(null);
    const router = useRouter();

    useEffect(()=>{
        if(router.isReady) {
            const { id } = router.query;
            setStoryId(id.split(","));
        }
    }, [router.isReady]);

    return <StoryDetails storyId={storyId} />
}