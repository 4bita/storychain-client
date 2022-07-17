import classes from './MyTextArea.module.css'


const MyTextArea = (props) => {
    return (
        <textarea className={classes.MyTextArea} {...props} />
    );
};

export default MyTextArea;