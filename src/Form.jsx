import React, { useState } from "react";

const Form = ({
    currentUser,
    type,
    replyHandler,
    setComments,
    replies,
    id,
    comments,
    currentComment,
    changeCommentInStorage,
    replyingTo,
}) => {
    const [message, setMessage] = useState("");

    const updateComments = (comment) => {
        const commentsCopy = JSON.parse(JSON.stringify(comments));
        if (type === "comment") return [...commentsCopy, comment];
        if (type === "reply") {
            const newReplies = [...replies, comment];
            // console.log(newReplies);
            const newComments = commentsCopy.map((comment) => {
                if (comment.id === id) return { ...comment, replies: newReplies };
                else return comment;
            });
            return newComments;
        }
    };

    const addCommentHandler = (comment) => {
        const newComments = updateComments(comment);
        setComments(newComments);
        localStorage.setItem("comments", JSON.stringify(newComments));
    };

    const commentChangeHandler = (e) => {
        setMessage(e.target.value);
    };
    const createReply = () => {
        const currentTime = new Date();
        const reply = {
            id: Date.now(),
            content: message,
            createdAt: currentTime.toISOString(),
            score: 0,
            user: currentUser,
        };
        return reply;
    };
    const createComment = () => {
        const reply = createReply();
        const comment = { ...reply, replies: [] };
        return comment;
    };
    const commentSubmitHandler = () => {
        const comment = createComment();
        if (type === "comment") {
            addCommentHandler(comment);
        }
        setMessage("");
    };
    const addReplyHandler = () => {
        const reply = createReply();
        reply.replyingTo = replyingTo;
        if (currentComment.replies) {
            currentComment.replies.push(reply);
            changeCommentInStorage(currentComment);
        } else {
            const comment = JSON.parse(localStorage.getItem("comments")).find((comment) => {
                return comment.replies.find((reply) => {
                    return reply.id === currentComment.id;
                });
            });
            comment.replies.push(reply);
            changeCommentInStorage(comment);
        }
        replyHandler();
    };

    const placeholder = type === "comment" ? "Add a comment..." : "Add a reply...";
    return (
        <div className="card comment">
            <div className="card-image">
                <img src={currentUser?.image?.webp} alt={currentUser?.username} />
            </div>
            <textarea
                onChange={commentChangeHandler}
                value={message}
                className="message"
                placeholder={placeholder}
            ></textarea>
            {type === "comment" && (
                <button onClick={commentSubmitHandler} className="btn comment-btn">
                    Send
                </button>
            )}
            {type === "reply" && (
                <button onClick={addReplyHandler} className="btn comment-btn">
                    Reply
                </button>
            )}
        </div>
    );
};

export default Form;
