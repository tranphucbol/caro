import React from "react";
import { Container } from "react-bootstrap";
import Board from "../components/board";
import GameBar from "../components/game-bar";
import GameInfo from "../components/game-info";
import { connect } from "react-redux";
import { descrementTime, onStartGame, initialSocketIO, RESULT_NONE, RESULT_WIN, onPlayAgain } from "../actions/room";
import TimeProgress from "../components/time-progress";
import Chat from "../components/chat";
import ResultModal from "../components/result-modal";
import Main from "./main";
// import { Redirect } from "react-router-dom";

class Play extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            right: Math.floor(window.innerWidth * 0.2)
        };
    }

    componentDidMount() {
        window.addEventListener("resize", () => {
            this.setState({ right: Math.floor(window.innerWidth * 0.2) });
        });

        this.timerID = setInterval(() => this.props.descrementTime(), 1000);

        this.props.initialSocketIO()
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        // if(this.props.roomId === '')
        //     return <Redirect to="/" />
        let {lock, time, status, onStartGame, onPlayAgain, rows, cols, result, pet} = this.props;
        return (
            <Main>
            <Container className="min-vh-100 flex-center">
                <div className="card">
                    <div className=" d-flex">
                        <div className="game-left-side">
                            <GameBar
                                lock={lock}
                                time={time}
                                status={status}
                                onStartGame={onStartGame}
                                onPlayAgain={onPlayAgain}
                                pet={pet}
                            />
                            <Board
                                rows={rows}
                                cols={cols}
                            />
                            <TimeProgress time={time} />
                        </div>
                        <div
                            className="game-right-side"
                            style={{ width: this.state.right }}
                        >
                            <GameInfo />
                            <Chat />
                        </div>
                    </div>
                </div>
                {result !== RESULT_NONE && <div><ResultModal winning={result === RESULT_WIN} /></div>}
            </Container>
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
    roomId: state.room.id,
    result: state.room.result,
    pet: state.room.pet
});

const mapDispatchToProps = dispatch => ({
    descrementTime: () => dispatch(descrementTime()),
    onStartGame: () => dispatch(onStartGame()),
    onPlayAgain: () => dispatch(onPlayAgain()),
    initialSocketIO: () => dispatch(initialSocketIO())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Play);
