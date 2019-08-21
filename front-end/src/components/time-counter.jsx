import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

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

export default TimeCounter
