import React from "react";
import $ from "jquery";

class Modal extends React.Component {
    componentDidMount() {
        let parentsClass = this.props.parentsClass;
        console.log(parentsClass);
        $(document).on(
            "opening",
            `[data-remodal-id=${this.props.id}]`,
            function() {
                let overlays = document.querySelectorAll(".remodal-overlay");
                let wrappers = document.querySelectorAll(".remodal-wrapper");
                let board = document.querySelector(`${parentsClass}`);
                overlays.forEach(overlay => {
                    overlay.style.top = "0px";
                    overlay.style.right = "0px";
                    overlay.style.left = "1px";
                    overlay.style.bottom = "0px";
                    board.appendChild(overlay);
                });
                wrappers.forEach(wrapper => {
                    board.appendChild(wrapper);
                });
            }
        );
    }

    componentWillUnmount() {
        document.querySelectorAll(".remodal-overlay").forEach(overlay => {
            overlay.remove();
        });
        document.querySelectorAll(".remodal-wrapper").forEach(wrapper => {
            wrapper.remove();
        });
    }

    render() {
        return (
            <div
                className={`remodal rounded-soft${
                    this.props.custom ? ` ${this.props.custom}` : ""
                }`}
                data-remodal-id={this.props.id ? this.props.id : "modal"}
            >
                {/* <button data-remodal-action="close" className="remodal-close" /> */}
                {this.props.children}
            </div>
        );
    }
}

export default Modal;
