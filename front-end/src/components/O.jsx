import React from "react";

const O = ({ width, height, color }) => {
    let style = {
        width: width - width * 0.3,
        height: height - height * 0.3,
        borderRadius: width,
        border: `${width * 0.15}px solid ${color}`
    };

    return <div className="chess" style={style} />;
};

export default O;
