import MyButton from "./UI/button/MyButton";
import styles from '../styles/Story.module.css'


const Story = (props) => {
    return (
        <div className={styles.storyCard}>
            <div>
                <strong>{props.title}</strong>
                <div>
                    {props.body}
                </div>
            </div>
            <div>
                <MyButton id={props.id} onClick={props.openStory}>Open</MyButton>
            </div>
        </div>
    );
};

export default Story;