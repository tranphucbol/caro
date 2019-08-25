import React from "react";
import TimeCounter from "./time-counter";
import GameControlButton from "./game-control-button";

class GameBar extends React.Component {
    render() {
        return (
            <div className="game-bar position-relative">
                <div className="game-point">
                    Pet: {this.props.pet}
                    <img
                        src={`${process.env.PUBLIC_URL}/images/coin.gif`}
                        width="25px"
                        alt="caro"
                    />
                </div>
                {this.props.lock ? (
                    // <button onClick={this.props.onStartGame} className="btn btn-primary font-weight-bold rounded-soft">
                    //     Start Game
                    // </button>
                    <GameControlButton
                        onStartGame={this.props.onStartGame}
                        onPlayAgain={this.props.onPlayAgain}
                        onQuit={this.props.onQuit}
                        status={this.props.status}
                    />
                ) : (
                    <TimeCounter time={this.props.time} />
                )}
            </div>
        );
    }
}

export default GameBar;
