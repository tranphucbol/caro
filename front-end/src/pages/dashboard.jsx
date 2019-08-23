import React from "react";
import Main from "./main";
import Room from "../components/Room";
import DBToolBar from "../components/dashboard-toolbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import Profile from "../components/profile";
import Leaderboard from "../components/leaderboard";
import NewroomModal from "../components/newroom-modal";
import ListRoom from "../components/listRoom";
import { initialSocketIO } from "../actions/room";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import BackgroundIcon from "../components/background-icon";

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heightFooter: 0
        };
    }

    componentDidMount() {
        this.props.initialSocketIO();
        // let height = document.querySelector(".db-leftbar").clientHeight;
        // let heightToolbar = document.querySelector(".db-toolbar").clientHeight;
        // let heightListRoom = document.querySelector(".db-listroomscroll")
        //     .clientHeight;

        // this.setState({
        //     heightFooter: height - (heightToolbar + heightListRoom)
        // });
    }

    render() {
        let listRoom = [];

        for (let i = 0; i < 20; i++) {
            listRoom.push(<Room key={i} />);
        }

        return (
            <Main>
                <div className="min-vh-100 flex-center">
                    <div className="card db-border">
                        <div className="db ">
                            <div className="db-leftbar">
                                <DBToolBar />
                                <div className="db-listroomscroll position-relative">
                                   <BackgroundIcon name="swords-bg.svg" color="#00333333"/>
                                    <PerfectScrollbar>
                                        <ListRoom />
                                    </PerfectScrollbar>
                                </div>
                                {/* <div
                                    className="db-leftbar-footer"
                                    style={{ height: this.state.heightFooter }}
                                ></div> */}
                            </div>
                            <div className="db-rightbar">
                                <Profile />
                                <Leaderboard />
                            </div>
                        </div>
                    </div>
                    <NewroomModal />
                </div>
                {this.props.roomId !== "" && <Redirect to="/play" />}
            </Main>
        );
    }
}

const mapStateToProps = state => ({
    roomId: state.room.roomId
});

const mapDispatchToProps = dispatch => ({
    initialSocketIO: () => dispatch(initialSocketIO())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashBoard);
