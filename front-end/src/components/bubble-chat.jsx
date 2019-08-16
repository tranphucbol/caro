import React from "react";

const BubbleChat = ({ content, right }) => (
    <div className={`d-flex${right ? ' justify-content-end' : ''}`}>
        <div className={`bubble-chat bubble-${right ? 'right' : 'left'}`}>{content}</div>
    </div>
);

export default BubbleChat;
