import React from "react";

const BackgroundIcon = ({ name, color }) => (
    <img
        className="bg-icon position-absolute absolute-centered"
        src={`${process.env.PUBLIC_URL}/images/${name}`}
        alt="caro"
        style={{color: `${color}`}}
    />
);

export default BackgroundIcon