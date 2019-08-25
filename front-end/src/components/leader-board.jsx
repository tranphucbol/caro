import React from "react";
import { connect } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { load_leaderboard } from "../actions/rank";
import LeaderBoardItem from "./leader-board-item";
import BackgroundIcon from "./background-icon";

class Leaderboard extends React.Component {
    state = {
        height: 0
    };

    componentDidMount() {
        this.props.loadMyInfo();
        let dbRankingHeaderHeight = document.querySelector('.db-ranking-header').clientHeight;
        let dbRankingHeight = document.querySelector('.db-ranking').clientHeight
        this.setState({
            height: dbRankingHeight - dbRankingHeaderHeight
        });
    }

    render() {
        return (
            <div className="db-ranking">
                <div className="db-ranking-header">
                    <h4>TOP RANK</h4>
                    <a onClick={() => this.props.loadMyInfo()} href="#1">
                        {this.props.load ? (
                            <div
                                className="spinner-border spinner-border_custom"
                                role="status"
                            ></div>
                        ) : (
                            <FontAwesomeIcon icon={faSyncAlt} />
                        )}
                    </a>
                </div>
                <div
                    className="db-listranking position-relative"
                    style={{ height: this.state.height }}
                >
                    <BackgroundIcon name="crown-solid.svg" />
                    <PerfectScrollbar>
                        {this.props.leaderboard.map((element, index) => (
                            <LeaderBoardItem key={index} {...element} />
                        ))}
                    </PerfectScrollbar>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    leaderboard: [...state.rank.list],
    load: state.rank.load
});

const mapDispatchToProps = dispatch => ({
    loadMyInfo: () => dispatch(load_leaderboard())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Leaderboard);
