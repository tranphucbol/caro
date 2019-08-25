import React from "react";
import { connect } from "react-redux";
import { loadMyInfo } from "../actions/user";

class Profile extends React.Component {
    componentDidMount() {
        this.props.loadMyInfo();
    }
    render() {
        return (
            <div className="db-profile position-relative">
                <div onClick={() => this.props.onLogOut()} className="btn-quit-text position-absolute" style={{top: 0, right: 0, margin: '10px'}}>
                    <i className="fas fa-power-off"></i>
                </div>
       
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
                    <div className="db-profile-info-el db-profile-info-el-ranking">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/crown.svg`}
                            alt="caro"
                        />
                        <span>{this.props.rank}</span>
                    </div>
                    <div className="db-profile-info-el db-profile-info-el-ratio">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/sword.svg`}
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
