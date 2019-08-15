import React from "react";

const X = ({ width, height, color }) => {
    let style = {
        width: width - width * 0.2,
        height: height - height * 0.2,
        position: "relative"
    };

    let left = {
        position: "absolute",
        width: width * 0.15,
        borderRadius: width,
        background: color,
        height: height - height * 0.2,
        transform: "translate3d(-50%, -50%, 0) rotate(-45deg)",
        top: "50%",
        left: "50%"
    };

    let right = {
        position: "absolute",
        width: width * 0.15,
        borderRadius: width,
        background: color,
        height: height - height * 0.2,
        transform: "translate3d(-50%, -50%, 0) rotate(45deg)",
        top: "50%",
        left: "50%"
    };

    return (
        <div className="chess" style={style}>
            <div style={left} />
            <div style={right} />
        </div>
    );
};

export default X;
