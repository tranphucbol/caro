import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class TimeCounter extends React.Component {
    render() {
        return (
            <div className="game-time d-flex align-items-center">
                <div className="mr-1">{this.props.time}</div>
                <FontAwesomeIcon icon={faClock} />
            </div>
        );
    }
}

TimeCounter.propTypes = {
    time: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
    time: state.room.board.time
});

export default connect(mapStateToProps)(TimeCounter);
