import React from "react";
import Modal from "./modal";
// import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { createRoom } from "../actions/room";
import $ from "jquery";
// import { closeRemodalCreateRoom } from "../actions/view";

class NewRoomModal extends React.Component {
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
        // let point = (props.point / 4) >> 0;
        this.state = {
            inputPoint: 0,
            inputName: name,
            showing: false
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

    onCreateRoom = () => {
        let point = parseInt(this.state.inputPoint);
        let name = this.state.inputName;
        if(name.trim().length > 0) {
            this.props.onCreateRoom(point, name.trim());
        }
    };

    componentDidMount() {
        $("[data-remodal-id=newroom]").remodal();
    }

    render() {
        return (
            <Modal
                custom="db-modal-newroom"
                id="newroom"
                parentsClass=".db-listroomscroll"
            >
                <div className="db-newroom ">
                    <div className="db-close" data-remodal-action="close">
                        <FontAwesomeIcon icon={faWindowClose}></FontAwesomeIcon>
                    </div>

                    <h3>Create Room</h3>
                    <div className="db-newroom-input">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <img
                                        src={`${process.env.PUBLIC_URL}/images/tag.svg`}
                                        alt="tag"
                                    />
                                </span>
                            </div>
                            <input
                                required
                                className="form-control"
                                type="text"
                                value={this.state.inputName}
                                onChange={this.onChangeName}
                            />
                        </div>
                    </div>
                    <div className="db-newroom-input">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <img
                                        src={`${process.env.PUBLIC_URL}/images/coin.png`}
                                        alt="coin"
                                    />
                                </span>
                            </div>
                            <input
                                required
                                className="form-control"
                                type="number"
                                value={this.state.inputPoint}
                                onChange={this.onChangePoint}
                            />
                        </div>
                    </div>

                    <div className="db-newroom-btn">
                        <button
                            onClick={this.onCreateRoom}
                            className="btn btn-primary"
                        >
                            Create
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    point: state.user.point
});

const mapDispatchToProps = dispatch => ({
    onCreateRoom: (point, name) => dispatch(createRoom(point, name))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewRoomModal);
