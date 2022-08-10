import { Story } from "./story";


export class Candidate extends Story {
    level;
    head_story;
    votes;

    constructor(data, level=0, head_story=null, votes=0, key=null) {
        super(data, key);
        this.level = level;
        this.head_story = head_story;
        this.votes = votes;
    }
}