import React from "react";
import { connect } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { load_leaderboard } from "../actions/rank";

class Leaderboard extends React.Component {
    componentDidMount() {
        this.props.loadMyInfo();
    }

    render() {
        var list_userLeaderBoard = [];

        this.props.leaderboard.forEach((element, index) => {
            list_userLeaderBoard.push(
                <div className="db-ranking-item" key={index}>
                    <div className="db-ranking-item-rank">
                        <img
                            className="db-ranking-item-rankbg"
                            src={`${process.env.PUBLIC_URL}/images/rank-number.svg`}
                            alt="numberanking"
                        />
                        <p>{element.rank}</p>
                    </div>
                    <div className="db-ranking-item-a">
                        <p className="db-ranking-item-username">
                            {element.username}
                        </p>
                        <div className="db-ranking-item-info">
                            <img
                                src={`${process.env.PUBLIC_URL}/images/coin.png`}
                                alt="caro"
                            />
                            {element.point}
                        </div>
                    </div>
                    <div className="db-ranking-item-b">
                        <img
                            className="db-ranking-item-avatar"
                            alt=""
                            src={element.avatar}
                        />

                        <div className="db-ranking-item-info">
                            <img
                                src={`${process.env.PUBLIC_URL}/images/trophy.gif`}
                                alt="caro"
                            />
                            <span>{element.ratioWinning}</span>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div>
                <div className="db-ranking-header">
                    <p>TOP RANK</p>
                    <a onClick={() => this.props.loadMyInfo()}>
                        <FontAwesomeIcon icon={faSyncAlt} />
                    </a>
                </div>
                <div className="db-listranking">
                    <PerfectScrollbar>
                        <div>{list_userLeaderBoard}</div>
                    </PerfectScrollbar>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    leaderboard: [...state.rank]
});

const mapDispatchToProps = dispatch => ({
    loadMyInfo: () => dispatch(load_leaderboard())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Leaderboard);
