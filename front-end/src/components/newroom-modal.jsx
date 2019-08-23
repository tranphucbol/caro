import React from "react";
import Modal from "./modal";
// import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
// import { closeRemodalCreateRoom } from "../actions/view";

class NewroomModal extends React.Component {
    constructor(props) {
        super(props);
        let randomName = [
            "Ngon thì nào vô!!!",
            "Vô chơi nào......",
            "Come on Baby!!",
            "Vô chơi lẹ nào!!",
            "Let's go ........."
        ];
        let ofset = Math.floor(Math.random() * randomName.length);
        let name = randomName[ofset];
        let point = (props.point / 4) >> 0;
        this.state = {
            inputPoint: 0,
            inputName: name
        };
    }

    onChangePoint = event => {
        let point = event.target.value;
        if (point < 0) {
            point = 0;
        }
        if (point > this.props.point) {
            point = this.props.point;
        }
        this.setState({
            inputPoint: point
        });
    };

    onChangeName = event => {
        this.setState({
            inputName: event.target.value
        });
    };

    render() {
        return (
            <Modal
                custom="db-modal-newroom"
                id="newroom"
                parentsClass=".db-leftbar"
            >
                <div className="db-newroom ">
                    <div className="db-close" data-remodal-action="close">
                        <FontAwesomeIcon icon={faWindowClose}></FontAwesomeIcon>
                    </div>

                    <h3>create room</h3>
                    <div className="db-newroom-input">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/tag.svg`}
                                    alt="tag"
                                />
                            </span>
                        </div>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.inputName}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="db-newroom-input">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/coin.png`}
                                    alt="coin"
                                />
                            </span>
                        </div>
                        <input
                            className="form-control"
                            type="number"
                            value={this.state.inputPoint}
                            onChange={this.onChangePoint}
                        />
                    </div>

                    <div className="db-newroom-btn">
                        <button className="btn btn-primary">create room</button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    point: state.user.point
});

// const mapDispatchToProps = dispatch => ({
//     closeModal: () => dispatch(closeRemodalCreateRoom())
// });

export default connect(mapStateToProps)(NewroomModal);
