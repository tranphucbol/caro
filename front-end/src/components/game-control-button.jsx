import React from "react";
import {
    STATUS_PLAY_AGAIN,
    STATUS_WATTING,
    STATUS_PLAYING,
    STATUS_START_GAME
} from "../actions/room";

class GameControlButton extends React.Component {
    getTitle(status) {
        switch (status) {
            case STATUS_PLAY_AGAIN:
                return "Play Again";
            case STATUS_WATTING:
                return "Waiting...";
            default:
                return "Start Game";
        }
    }

    handlePositiveClick = () => {
        let {status} = this.props
        if(status === STATUS_START_GAME) {
            this.props.onStartGame()
        } else if (status === STATUS_PLAY_AGAIN) {
            this.props.onPlayAgain()
        }
    }

    handleNegativeClick = () => {
        this.props.onQuit()
    }

    render() {
        let {status} = this.props
        if(status === STATUS_PLAYING)
            return null
        return (
            <div>
                <button onClick={this.handlePositiveClick} className="btn btn-primary font-weight-bold" disabled={status === STATUS_WATTING}>{this.getTitle(status)}</button>
                {
                    status === STATUS_PLAY_AGAIN &&
                    <button onClick={this.handleNegativeClick} className="btn btn-danger font-weight-bold ml-2">Quit</button>
                }
            </div>
        )
    }
}

export default GameControlButton
