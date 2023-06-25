import React, { useEffect, useState } from "react";
import { icons } from "./data";
const { iconDelete, iconEdit, iconMinus, iconPlus, iconReply } = icons;
import Card from "./Card";
import Form from "./Form";
import Modal from "./Modal";

const App = () => {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [currentUser, setCurrentUser] = useState({});

    const sortCommentsByScore = (comments) => {
        return comments.sort((a, b) => b.score - a.score);
    };
    const fetchData = async () => {
        try {
            setIsLoading(true);
            setIsError(false);
            if (!localStorage.getItem("comments") || !localStorage.getItem("currentUser")) {
                const res = await fetch("./data.json");
                const data = await res.json();

                setComments(data.comments);
                setCurrentUser(data.currentUser);
                localStorage.setItem("comments", JSON.stringify(data.comments));
                localStorage.setItem("currentUser", JSON.stringify(data.currentUser));
            } else {
                setComments(JSON.parse(localStorage.getItem("comments")));
                setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
            }
        } catch (error) {
            setIsError(true);
            console.log(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="body">
            <div className="container">
                {sortCommentsByScore(comments).map((comment) => (
                    <Card
                        key={comment.id}
                        {...comment}
                        currentUser={currentUser}
                        type="comment"
                        comments={comments}
                        setComments={setComments}
                    />
                ))}
                <Form
                    setComments={setComments}
                    currentUser={currentUser}
                    type="comment"
                    comments={comments}
                />
            </div>
        </div>
    );
};

export default App;
