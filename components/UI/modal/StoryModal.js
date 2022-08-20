import React from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import MyButton from "../button/MyButton";


function StoryModal({ buttonName, title, onTitleChange, onBodyChange, onSave }) {
    const [showModal, setShowModal] = React.useState(false);

    async function saveChanges(event) {
        await onSave(event);
        setShowModal(false);
    }

    return (
        <>
            <div className="rightButton">
                <MyButton onClick={() => setShowModal(true)}>
                    {buttonName}
                </MyButton>
            </div>
            <Modal toggle={() => setShowModal(false)} isOpen={showModal}>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        {title}
                    </h5>
                </div>
                <ModalBody>
                    <form>
                        <div className="form-group">
                            <label className="col-form-label" htmlFor="modal-title">Title:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="modal-title"
                                onChange={onTitleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label" htmlFor="modal-content">Story text:</label>
                            <textarea
                                rows="10"
                                className="form-control"
                                id="modal-content"
                                onChange={onBodyChange}
                            />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button
                        type="button"
                        className="btn btn-sm btn-ghost rounded-md"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm rounded-md text-white border-0 bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                        onClick={saveChanges}
                    >
                        Save changes
                    </button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default StoryModal;
