import React from "react";
import Modal from "./modal";
import $ from "jquery";
import confetti from "canvas-confetti";
import { RESULT_WIN, RESULT_LOSE, RESULT_DRAW } from "../actions/room";
import { updateMyPoint } from "../actions/user";
import { connect } from "react-redux";

class ResultModal extends React.Component {
    componentDidMount() {
        this.modal = $("[data-remodal-id=modal-result]").remodal();
        this.modal.open();
        let component = this;
        this.props.updateMyPoint();
        let end = Date.now() + 60 * 1000;
        if (this.props.result === RESULT_WIN) {
            this.confettiId = setInterval(function() {
                if (Date.now() > end) {
                    return clearInterval(this.confettiId);
                }

                confetti({
                    startVelocity: 30,
                    spread: 360,
                    ticks: 60,
                    shapes: ["square"],
                    origin: {
                        x: Math.random(),
                        // since they fall down, start a bit higher than random
                        y: Math.random() - 0.2
                    }
                });
            }, 200);
        } else if (this.props.result === RESULT_LOSE) {
            (function frame() {
                confetti({
                    particleCount: 1,
                    startVelocity: 0,
                    ticks: 300,
                    origin: {
                        x: Math.random(),
                        // since they fall down, start a bit higher than random
                        y: Math.random() - 0.2
                    },
                    colors: ["#adaca8"],
                    shapes: ["circle"]
                });

                if (Date.now() < end) {
                    component.requestId = requestAnimationFrame(frame);
                }
            })();
        } else {
            let colors = ["#85b2ee", "#2c7be5"];

            (function frame() {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: {
                        x: 0
                    },
                    colors: colors
                });
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: {
                        x: 1
                    },
                    colors: colors
                });

                if (Date.now() < end) {
                    component.requestId = requestAnimationFrame(frame);
                }
            })();
        }
    }

    componentDidUpdate() {
        this.props.updateMyPoint();
    }

    componentWillUnmount() {
        clearInterval(this.confettiId);
        cancelAnimationFrame(this.requestId);
        // this.modal.destroy()
    }

    render() {
        let { result } = this.props;
        let info = {
            [RESULT_WIN]: { className: "winner", icon: "s", text: "Winner" },
            [RESULT_LOSE]: { className: "loser", icon: "r", text: "Loser" },
            [RESULT_DRAW]: { className: "draw", icon: "r", text: "Draw" }
        };
        return (
            <Modal
                custom="remodal-result"
                id="modal-result"
                parentsClass=".board"
            >
                <div className={`modal-result ${info[result].className}`}>
                    <i className={`fa${info[result].icon} fa-star`} />
                    <span className="px-1">{info[result].text}</span>
                    <i className={`fa${info[result].icon} fa-star`} />
                </div>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateMyPoint: () => dispatch(updateMyPoint())
});

export default connect(
    null,
    mapDispatchToProps
)(ResultModal);
