import React from "react";
import Modal from "./modal";
import $ from "jquery";
import confetti from "canvas-confetti";

class ResultModal extends React.Component {
    componentDidMount() {
        $("[data-remodal-id=modal-result]")
            .remodal()
            .open();
        if (this.props.winning) {
            let end = Date.now() + 60 * 1000;
            let interval = setInterval(function() {
                if (Date.now() > end) {
                    return clearInterval(interval);
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
        }
    }

    render() {
        let { winning } = this.props;
        return (
            <Modal id="modal-result" parentsClass=".board">
                <div className={`modal-result ${winning ? "winner" : "loser"}`}>
                    <i className={`fa${winning ? "s" : "r"} fa-star`} />
                    <span className="px-1">{winning ? "Winner" : "Loser"}</span>
                    <i className={`fa${winning ? "s" : "r"} fa-star`} />
                </div>
            </Modal>
        );
    }
}
export default ResultModal;
