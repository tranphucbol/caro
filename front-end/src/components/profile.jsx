import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { loadMyInfo } from "../actions/user";

class Profile extends React.Component {
    componentDidMount() {
        this.props.loadMyInfo();
    }

    render() {
        return (
            <div className="db-profile">
                <FontAwesomeIcon
                    className="db-profile-logout"
                    icon={faPowerOff}
                />
                <span>{this.props.username}</span>
                <div className="db-profile-avatar">
                    <img id="avatar-profile" alt="" src={this.props.avatar} />
                </div>
                <div className="db-profile-info">
                    <img
                        src={`${process.env.PUBLIC_URL}/images/coin.png`}
                        alt="caro"
                    />
                    <span>{this.props.point}</span>
                </div>
                <div className="db-profile-info">
                    <div className="db-profile-info-el">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/star.gif`}
                            alt="caro"
                        />
                        <span>{this.props.rank}</span>
                    </div>
                    <div className="db-profile-info-el">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/trophy.gif`}
                            alt="caro"
                        />
                        <span>{this.props.ratioWinning}</span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    username: state.user.username,
    avatar: state.user.avatar,
    rank: state.user.rank,
    ratioWinning: state.user.ratioWinning,
    point: state.user.point
});

const mapDispatchToProps = dispatch => ({
    loadMyInfo: () => dispatch(loadMyInfo())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
