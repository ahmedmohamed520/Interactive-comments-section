import React from "react";
import Link from "./Link";

const CardLinks = ({
    currentUser,
    user,
    iconDelete,
    iconEditComment,
    setEditComment,
    setIsModalOpen,
    iconReply,
    setOpenNewReply,
    setActiveReplyingTo,
}) => {
    return (
        <>
            {currentUser?.username === user?.username ? (
                <div className="links">
                    <Link
                        remove
                        icon={iconDelete}
                        alt="delete icon"
                        text="delete"
                        onClick={() => setIsModalOpen(true)}
                    />

                    <Link
                        icon={iconEditComment}
                        alt="edit icon"
                        text="edit"
                        onClick={() => {
                            setEditComment(true);
                        }}
                    />
                </div>
            ) : (
                <div className="links">
                    <Link
                        icon={iconReply}
                        alt="reply icon"
                        text="reply"
                        onClick={() => {
                            setOpenNewReply(true);
                            setActiveReplyingTo(user.username);
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default CardLinks;
