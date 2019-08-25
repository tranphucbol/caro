import React from "react";
import GameUserInfo from "./game-user-info";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CHESS_X, CHESS_O, onQuit } from "../actions/room";

class GameInfo extends React.Component {
    render() {
        return (
            <div className="game-info h-50 bg-gradient d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between">
                <GameUserInfo {...this.props.user} chess={this.props.chess} />
                <div onClick={() => this.props.onQuit()} className="btn-quit-text">
                    <i className="fas fa-power-off"></i>
                </div>
       
                </div>
                
                <div className="d-flex justify-content-between align-items-center px-3">
                    <h1 className="text-white">{this.props.userWin}</h1>
                    <img
                        src={`${process.env.PUBLIC_URL}/images/gaming.svg`}
                        width="80px"
                        alt="caro"
                    />
                    <h1 className="text-white">{this.props.opponentWin}</h1>
                </div>
                <GameUserInfo right={true} {...this.props.opponent} chess={this.props.chess === CHESS_X ? CHESS_O : CHESS_X} />
            </div>
        );
    }
}

GameInfo.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        point: PropTypes.number.isRequired,
        rank: PropTypes.number.isRequired,
        ratioWinning: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
    }).isRequired,
    opponent: PropTypes.shape({
        username: PropTypes.string.isRequired,
        point: PropTypes.number.isRequired,
        rank: PropTypes.number.isRequired,
        ratioWinning: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
    }).isRequired,
    userWin: PropTypes.number.isRequired,
    opponentWin: PropTypes.number.isRequired,
    chess: PropTypes.number.isRequired,
    onQuit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.user,
    opponent: state.room.opponent,
    userWin: state.room.userWin,
    opponentWin: state.room.opponentWin,
    chess: state.room.chess
});

const mapDispatchToProps = dispatch => ({
    onQuit: () => dispatch(onQuit())
})

export default connect(mapStateToProps, mapDispatchToProps)(GameInfo);
