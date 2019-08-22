import React from "react";
import O from "./O";
import X from "./X";
import { CHESS_X } from "../actions/room";

class GameUserInfo extends React.Component {
    render() {
        return (
            <div
                className={`game-user-info d-flex ${
                    this.props.right ? "flex-row-reverse" : ""
                }`}
            >
                <div className="game-user-avatar">
                    <img src={this.props.avatar} alt="caro" />
                    <div className="game-user-chess">
                        {this.props.chess === CHESS_X ? (
                            <X width={20} height={20} color="#2c7be5" />
                        ) : (
                            <O width={20} height={20} color="#e63757" />
                        )}
                    </div>
                </div>
                <div
                    className={`d-flex justify-content-center ${
                        this.props.right ? "align-items-end" : ""
                    } flex-column mx-2`}
                >
                    <div
                        className={`d-flex align-items-center ${
                            this.props.right ? " flex-row-reverse" : ""
                        }`}
                    >
                        <div className="game-user-name">
                            {this.props.username}
                        </div>
                        <div className="game-user-rank">
                            <img
                                src={`${
                                    process.env.PUBLIC_URL
                                }/images/crown.svg`}
                                alt="caro"
                            />
                            {this.props.rank}
                        </div>
                    </div>
                    <div
                        className={`d-flex ${
                            this.props.right ? "flex-row-reverse" : ""
                        }`}
                    >
                        <div className="game-user-point d-flex align-items-center">
                            <img
                                src={`${
                                    process.env.PUBLIC_URL
                                }/images/coin.png`}
                                width="20px"
                                alt="caro"
                            />
                            <span>{this.props.point}</span>
                        </div>
                        <div className="game-user-rating mx-2 d-flex align-items-center">
                            <img
                                className="mr-1"
                                src={`${
                                    process.env.PUBLIC_URL
                                }/images/sword.svg`}
                                width="15px"
                                alt="caro"
                            />
                            {this.props.ratioWinning}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameUserInfo;
