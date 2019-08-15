import React from "react";
import { Container } from "react-bootstrap";
import Board from "../components/board";
import GameBar from "../components/game-bar";
import GameInfo from "../components/game-info";
import { connect } from "react-redux";
import { descrementTime } from "../actions/room";
import TimeProgress from "../components/time-progress";

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
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <Container className="min-vh-100 flex-center">
                <div className="card">
                    <div className=" d-flex">
                        <div className="game-left-side">
                            <GameBar />
                            <Board
                                rows={this.props.rows}
                                cols={this.props.cols}
                            />
                            <TimeProgress />
                        </div>
                        <div
                            className="game-right-side"
                            style={{ width: this.state.right }}
                        >
                            <GameInfo />
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    rows: state.room.board.rows,
    cols: state.room.board.cols
});

const mapDispatchToProps = dispatch => ({
    descrementTime: () => dispatch(descrementTime())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Play);
