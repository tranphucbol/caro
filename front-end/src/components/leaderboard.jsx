import React from "react";

class Leaderboard extends React.Component {
    render() {
        return (
            <div className="db-ranking-item">
                <p className="db-ranking-item-rank">
                    <img
                        className="db-ranking-item-rankbg"
                        src={`${process.env.PUBLIC_URL}/images/rank-number.svg`}
                        alt="numberanking"
                    />
                    <p> {this.props.rank}</p>
                </p>
                <div className="db-ranking-item-a">
                    <p className="db-ranking-item-username">
                        {this.props.username}
                    </p>
                    <div className="db-ranking-item-info">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/coin.png`}
                            alt="caro"
                        />
                        {this.props.point}
                    </div>
                </div>
                <div className="db-ranking-item-b">
                    <img
                        className="db-ranking-item-avatar"
                        alt=""
                        src={`${process.env.PUBLIC_URL}/images/avatar.svg`}
                    />

                    <div className="db-ranking-item-info">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/trophy.gif`}
                            alt="caro"
                        />
                        <span>89%</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Leaderboard;
