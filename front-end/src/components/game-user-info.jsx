import React from "react";

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
                </div>
                <div
                    className={`d-flex justify-content-center ${
                        this.props.right ? "align-items-end" : ""
                    } flex-column mx-2`}
                >
                    <div className="game-user-name">{this.props.username}</div>
                    <div
                        className={`d-flex ${
                            this.props.right ? "flex-row-reverse" : ""
                        }`}
                    >
                        <div className="game-user-point d-flex align-items-center mx-2">
                            <img
                                src={`${
                                    process.env.PUBLIC_URL
                                }/images/coin.png`}
                                width="20px"
                                alt="caro"
                            />
                            {this.props.point}
                        </div>
                        <div className="game-user-rating d-flex align-items-center">
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
