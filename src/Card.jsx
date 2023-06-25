import React, { useState } from "react";

import { icons } from "./data";
import Form from "./Form";
import Link from "./Link";
import Modal from "./Modal";
import DOMPurify from "dompurify";
import CardLinks from "./CardLinks";
import { getFormatedDate } from "./utils";
const { iconDelete, iconEdit: iconEditComment, iconMinus, iconPlus, iconReply } = icons;

// let users = [];
// JSON.parse(localStorage.getItem("comments"))?.forEach((comment) => {
//     users.push(comment.user.username);
//     comment.replies?.forEach((reply) => {
//         users.push(reply.user.username);
//     });
// });
// users = [...new Set(users)];

const Card = ({
    content,
    createdAt,
    score,
    user,
    replies,
    currentUser,
    id,
    comments,
    setComments,
    type,
    replyingTo,
}) => {
    const date = new Date(createdAt);
    createdAt = getFormatedDate(date);

    const [openNewReply, setOpenNewReply] = useState(false);
    const [editComment, setEditComment] = useState(false);
    const [messageValue, setMessageValue] = useState(content);
    const [scoreNum, setScoreNum] = useState(score);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeReplyingTo, setActiveReplyingTo] = useState(replyingTo ? replyingTo : user.username);

    const currentComment = comments.find((comment) => {
        return comment.id === id;
    });

    const changeCommentInStorage = (currentComment) => {
        const storedComments = JSON.parse(localStorage.getItem("comments"));
        const updatedStoredComments = storedComments.map((comment) => {
            if (comment.id === currentComment.id) {
                return currentComment;
            } else {
                return {
                    ...comment,
                    replies: comment?.replies?.map((reply) => {
                        if (reply.id === id) {
                            return currentComment;
                        } else {
                            return reply;
                        }
                    }),
                };
            }
        });
        localStorage.setItem("comments", JSON.stringify(updatedStoredComments));
        setComments(updatedStoredComments);
    };

    const increaseScore = () => {
        setScoreNum((score) => score + 1);

        currentComment.score = scoreNum + 1;

        changeCommentInStorage(currentComment);
    };
    const decreaseScore = () => {
        setScoreNum((score) => score - 1);

        currentComment.score = scoreNum - 1;
        changeCommentInStorage(currentComment);
    };

    const replyHandler = () => {
        setOpenNewReply(false);
    };

    const deleteCommentHandler = () => {
        let updatedComments = [];
        if (type === "comment") updatedComments = comments.filter((comment) => comment.id !== id);
        else if (type === "reply") {
            const currentComment = JSON.parse(localStorage.getItem("comments")).find(
                (comment) => JSON.stringify(comment.replies) === JSON.stringify(comments)
            );
            const updatedReplies = comments.filter((reply) => reply.id !== id);

            currentComment.replies = updatedReplies;

            updatedComments = JSON.parse(localStorage.getItem("comments")).map((comment) => {
                if (comment.id === currentComment.id) return currentComment;
                else return comment;
            });
        }
        setComments(updatedComments);
        localStorage.setItem("comments", JSON.stringify(updatedComments));
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={`card `}>
                <div className="up-vote">
                    <img onClick={increaseScore} className="plus-icon" src={iconPlus} alt="plus" />
                    <div className="up-vote-num">{scoreNum}</div>
                    <img onClick={decreaseScore} className="minus-icon" src={iconMinus} alt="plus" />
                </div>
                <div className="card-body">
                    <div className="card-header">
                        <div className="card-image">
                            <img src={user.image.webp} alt={user.username} className="" />
                        </div>
                        <div className="person-name">{user.username}</div>
                        {currentUser.username === user.username && <span className="you-tag">you</span>}
                        <div className="duration">{createdAt}</div>
                        {/* Card Links */}
                        {!editComment && (
                            <CardLinks
                                currentUser={currentUser}
                                user={user}
                                iconDelete={iconDelete}
                                iconEditComment={iconEditComment}
                                setEditComment={setEditComment}
                                setIsModalOpen={setIsModalOpen}
                                iconReply={iconReply}
                                setOpenNewReply={setOpenNewReply}
                                setActiveReplyingTo={setActiveReplyingTo}
                            />
                        )}
                    </div>
                    <div className="card-text">
                        {editComment ? (
                            <div className="edit">
                                <textarea
                                    value={messageValue}
                                    onChange={(e) => {
                                        let value = e.target.value;

                                        setMessageValue(value);
                                    }}
                                    className="message"
                                ></textarea>
                                <button
                                    onClick={() => {
                                        setEditComment(false);

                                        currentComment.content = messageValue;
                                        changeCommentInStorage(currentComment);
                                    }}
                                    className="btn comment-btn"
                                >
                                    update
                                </button>
                            </div>
                        ) : (
                            <>
                                <span className="tag">{replyingTo ? `@${replyingTo}` : null}</span>{" "}
                                {messageValue}
                            </>
                        )}
                    </div>
                </div>
            </div>
            {openNewReply && (
                <Form
                    currentUser={currentUser}
                    type="reply"
                    replyHandler={replyHandler}
                    replies={comments}
                    id={id}
                    comments={comments}
                    currentComment={currentComment}
                    changeCommentInStorage={changeCommentInStorage}
                    setComments={setComments}
                    replyingTo={activeReplyingTo}
                />
            )}
            {replies?.length > 0 && (
                <div className="replies-container">
                    {replies?.length > 0 &&
                        replies.map((reply) => (
                            <Card
                                key={reply.id}
                                currentUser={currentUser}
                                commentAuthor={user.username}
                                {...reply}
                                type="reply"
                                comments={replies}
                                setComments={setComments}
                            />
                        ))}
                </div>
            )}

            {isModalOpen && (
                <Modal deleteCommentHandler={deleteCommentHandler} setIsModalOpen={setIsModalOpen} />
            )}
        </>
    );
};

export default Card;
