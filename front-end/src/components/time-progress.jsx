import React from "react";
import { ProgressBar } from "react-bootstrap";

const TimeProgress = ({ time }) => <ProgressBar now={time} max={15} />;

export default TimeProgress
