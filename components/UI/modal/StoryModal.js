import React from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import styles from "./StoryModal.module.css";
import MyButton from "../button/MyButton";


function StoryModal({ buttonName, title, onTitleChange, onBodyChange, onSave }) {
    const [showModal, setShowModal] = React.useState(false);

    async function saveChanges(event) {
        await onSave(event);
        console.log('On save func finished. Close modal')
        setShowModal(false);
    }

    return (
        <>
            <div style={{ marginTop: "20px", justifyContent: "right", display: "flex" }}>
                <MyButton onClick={() => setShowModal(true)}>
                    { buttonName }
                </MyButton>
            </div>
            <Modal toggle={() => setShowModal(false)} isOpen={showModal}>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        { title }
                    </h5>
                </div>
                <ModalBody>
                    <form>
                        <div className="form-group">
                            <label className="col-form-label">Title:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="modal-title"
                                onChange={onTitleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label">Story text:</label>
                            <textarea
                                rows="10"
                                className="form-control"
                                id="modal-body"
                                onChange={onBodyChange}
                            />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button className={styles.closeButton} onClick={() => setShowModal(false)}>
                        Close
                    </button>
                    <button className={styles.saveButton} onClick={saveChanges}>
                        Save changes
                    </button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default StoryModal;