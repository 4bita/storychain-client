import StoryCreate from "../../components/StoryCreate";
import StoryList from "../../components/StoryList";
import React from "react";


export default function allStories() {
    return (
        <div>
            <StoryCreate />
            <StoryList />
        </div>
    );
}