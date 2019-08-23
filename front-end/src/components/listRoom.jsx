import React from "react";
import Room from "../components/Room";
import { listroom_load } from "../actions/listRoom";
import { connect } from "react-redux";

class ListRoom extends React.Component {
    componentDidMount() {
        this.props.load();
    }

    render() {
        let list = [];
        console.log(this.props.listroom);
        this.props.listroom.forEach((element, index) => {
            list.push(<Room key={index} data={element}></Room>);
        });

        return <div className="db-listroom">{list}</div>;
    }
}

const mapStateToProps = state => ({
    listroom: [...state.listRoom.rooms]
});

const mapDispatchToProps = dispacth => ({
    load: id => dispacth(listroom_load())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListRoom);
