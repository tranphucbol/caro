import React from "react";

const BubbleChat = ({ content, createdAt, right }) => (
    <div className={`d-flex${right ? ' justify-content-end' : ''}`}>
        <div className={`bubble-chat bubble-${right ? 'right' : 'left'}`}>
            <p>{content}</p>
            <small>{createdAt}</small>
        </div>
    </div>
);

export default BubbleChat;
