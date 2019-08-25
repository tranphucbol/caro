import React from "react";
import Main from "./main";
import { Link } from "react-router-dom";
import { createRoom, joinRoom, initialSocketIO } from "../actions/room";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class DashBoard extends React.Component {
    componentDidMount() {
        this.props.initialSocketIO();
    }

    state = {
        input: ""
    };

    handleClick = () => {
        console.log("CREATE ROOM");
        this.props.onCreateRoom(1000, "Test room");
    };

    handleInput = e => {
        this.setState({
            input: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.onJoinRoom(this.state.input);
    };

    render() {
        if (this.props.roomId !== "") {
            return <Redirect to="/play" />;
        }
        return (
            <Main>
                <div className="row min-vh-100">
                    <Link to="/login">login</Link>
                    <Link to="/play">login</Link>
                    <div className="d-flex">
                        <div className="mx-3">
                            <button
                                className="btn btn-primary"
                                onClick={this.handleClick}
                            >
                                Create Room
                            </button>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                value={this.state.input}
                                onChange={this.handleInput}
                                className="form-control mb-3"
                            />
                            <button type="submit" className="btn btn-primary">
                                Mock Join Room
                            </button>
                        </form>
                    </div>
                    <ul>
                        {this.props.rooms.map(room => (
                            <li key={room.roomId}>
                                {`${room.name}-${room.host}-${room.point}`}
                            </li>
                        ))}
                    </ul>
                </div>
            </Main>
        );
    }
}

const mapStateToProps = state => ({
    roomId: state.room.roomId,
    rooms: state.listRoom
});
const mapDispatchToProps = dispatch => ({
    onCreateRoom: (pet, name) => dispatch(createRoom(pet, name)),
    onJoinRoom: roomId => dispatch(joinRoom(roomId)),
    initialSocketIO: () => dispatch(initialSocketIO())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashBoard);
