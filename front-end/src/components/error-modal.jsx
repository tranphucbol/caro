import React from "react";
import Modal from "./modal";
import $ from "jquery";
// import { closeRemodalCreateRoom } from "../actions/view";

class ErrorModal extends React.Component {
    componentDidMount() {
        this.modal = $("[data-remodal-id=error-modal]").remodal();
        this.modal.open();
    }

    render() {
        return (
            <Modal
                custom="error-modal"
                id="error-modal"
                parentsClass={this.props.parentsClass}
            >
                <div className="error-header">
                    <i className="far fa-times-circle mx-2"></i>
                    <h3>ERROR NOTICATION</h3>
                </div>

                <p>{this.props.content}</p>
                <button data-remodal-action="close" className="btn btn-primary">
                    oke
                </button>
            </Modal>
        );
    }
}

export default ErrorModal;
