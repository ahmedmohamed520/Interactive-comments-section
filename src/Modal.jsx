import React from "react";
import { createPortal } from "react-dom";

const OverLay = ({ setIsModalOpen }) => {
    return <div onClick={() => setIsModalOpen(false)} className="overlay"></div>;
};
const Container = ({ deleteCommentHandler, setIsModalOpen }) => {
    return (
        <div className="modal">
            <div className="modal-title">Delete comment</div>
            <div className="modal-text">
                Are you sure you want to delete this comment? This will remove the comment and can't be undone
            </div>
            <div className="modal-btns">
                <button onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
                    NO, CANCEL
                </button>
                <button onClick={deleteCommentHandler} className="btn btn-danger">
                    YES, DELETE
                </button>
            </div>
        </div>
    );
};
const Modal = ({ deleteCommentHandler, setIsModalOpen }) => {
    const modalContainer = document.getElementById("modal-root");
    return (
        <>
            {createPortal(<OverLay setIsModalOpen={setIsModalOpen} />, modalContainer)}
            {createPortal(
                <Container deleteCommentHandler={deleteCommentHandler} setIsModalOpen={setIsModalOpen} />,
                modalContainer
            )}
        </>
    );
};

export default Modal;
