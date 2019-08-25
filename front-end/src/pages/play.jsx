import React from "react";
import Board from "../components/board";
import GameBar from "../components/game-bar";
import GameInfo from "../components/game-info";
import { connect } from "react-redux";
import {
    descrementTime,
    onStartGame,
    RESULT_NONE,
    RESULT_WIN,
    onPlayAgain,
    onQuit
} from "../actions/room";
import TimeProgress from "../components/time-progress";
import Chat from "../components/chat";
import ResultModal from "../components/result-modal";
import Main from "./main";
import ErrorModal from "../components/error-modal";
import { Redirect } from "react-router-dom";

class Play extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         right: Math.floor(window.innerWidth * 0.2)
    //     };
    // }

    componentDidMount() {
        // window.addEventListener("resize", () => {
        //     this.setState({ right: Math.floor(window.innerWidth * 0.2) });
        // });

        this.timerID = setInterval(() => this.props.descrementTime(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        let {
            lock,
            time,
            status,
            onStartGame,
            onPlayAgain,
            rows,
            cols,
            result,
            pet,
            onQuit
        } = this.props;
        return (
            <Main>
                <div className="min-vh-100 flex-center">
                    <div className="card">
                        <div className=" d-flex">
                            <div className="game-left-side">
                                <GameBar
                                    lock={lock}
                                    time={time}
                                    status={status}
                                    onStartGame={onStartGame}
                                    onPlayAgain={onPlayAgain}
                                    onQuit={onQuit}
                                    pet={pet}
                                />
                                <Board rows={rows} cols={cols} />
                                <TimeProgress time={time} />
                            </div>
                            <div
                                className="game-right-side"
                                style={{ minWidth: '15vw' }}
                            >
                                <GameInfo />
                                <Chat />
                            </div>
                        </div>
                    </div>
                    {result !== RESULT_NONE && (
                        <div>
                            <ResultModal winning={result === RESULT_WIN} />
                        </div>
                    )}
                </div>
                {this.props.roomId === "" && <Redirect to="/" />}
                {this.props.error && (
                    <div key={this.props.n_error}>
                        <ErrorModal
                            parentsClass=".board"
                            content={this.props.error}
                        />
                    </div>
                )}
            </Main>
        );
    }
}

const mapStateToProps = state => ({
    rows: state.room.board.rows,
    cols: state.room.board.cols,
    time: state.room.board.time,
    lock: state.room.board.lock,
    status: state.room.status,
    roomId: state.room.roomId,
    result: state.room.result,
    pet: state.room.pet,
    error: state.room.error,
    n_error: state.room.n_error
});

const mapDispatchToProps = dispatch => ({
    descrementTime: () => dispatch(descrementTime()),
    onStartGame: () => dispatch(onStartGame()),
    onPlayAgain: () => dispatch(onPlayAgain()),
    onQuit: () => dispatch(onQuit())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Play);
