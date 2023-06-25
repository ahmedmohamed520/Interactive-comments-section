import React from "react";

const Link = ({ icon, alt, text, onClick, remove }) => {
    return (
        <div onClick={onClick} className={`link ${remove && "delete"}`}>
            <img src={icon} alt={alt} />
            <span>{text}</span>
        </div>
    );
};

export default Link;
