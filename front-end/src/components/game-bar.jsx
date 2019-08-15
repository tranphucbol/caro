import React from "react";
import TimeCounter from "./time-counter";

class GameBar extends React.Component {
    render() {
        return (
            <div className="game-bar">
                <div className="game-point">
                    Point: 300000
                    <img
                        src={`${process.env.PUBLIC_URL}/images/coin.gif`}
                        width="25px"
                        alt="caro"
                    />
                </div>
                <TimeCounter />
            </div>
        );
    }
}

export default GameBar;
