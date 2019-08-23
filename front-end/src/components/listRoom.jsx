import React from "react";
import Room from "../components/Room";
import { listroom_load } from "../actions/listRoom";
import { connect } from "react-redux";
import { joinRoom } from "../actions/room";

class ListRoom extends React.Component {
    componentDidMount() {
        this.props.load();
    }

    render() {
        return <div className="db-listroom">
            {this.props.listroom.map((element, index) => (
                <Room onJoinRoom={this.props.onJoinRoom} key={index} data={element}></Room>
            ))}
        </div>;
    }
}

const mapStateToProps = state => ({
    listroom: [...state.listRoom.rooms]
});

const mapDispatchToProps = dispacth => ({
    load: id => dispacth(listroom_load()),
    onJoinRoom: id => dispacth(joinRoom(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListRoom);
