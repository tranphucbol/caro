import React from "react";
import { ProgressBar } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const TimeProgress = ({ time }) => <ProgressBar now={time} max={15} />;

TimeProgress.propTypes = {
    time: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
    time: state.room.board.time
});

export default connect(mapStateToProps)(TimeProgress);
