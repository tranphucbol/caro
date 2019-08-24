import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import {
    faPlus,
    faSlidersH,
    faChevronUp,
    faChevronDown,
    faSyncAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery";
// import { openRemodalCreateRoom } from "../actions/listRoom";
// import { connect } from "react-redux";
import { change_filter } from "../actions/filter";
import { listroom_load } from "../actions/list-room";
import { connect } from "react-redux";

class DBToolBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "Default",
            order: "asc",
            showing: false
        };
    }

    componentDidMount() {
        let com = this;
        $(document).on("opening", "[data-remodal-id=newroom]", function() {
            com.setState({ showing: true });
        });

        $(document).on("closing", "[data-remodal-id=newroom]", function() {
            com.setState({ showing: false });
        });
    }

    onClickOrder = () => {
        let order = this.props.order === "asc" ? "des" : "asc";
        let attribute = this.props.attribute;
        this.props.change_filter(attribute, order);
    };

    onSelectKey = attribute => {
        let order = this.props.order;
        this.props.change_filter(attribute, order);
    };

    render() {
        let btnOrder;

        if (this.props.order === "asc") {
            btnOrder = <FontAwesomeIcon icon={faChevronUp} />;
        } else {
            btnOrder = <FontAwesomeIcon icon={faChevronDown} />;
        }

        return (
            <div className="db-toolbar p-3">
                <div className="d-flex align-items-center">
                    <h1 className="db-title">Caro Game</h1>key
                    <Dropdown className="mx-2">
                        <Dropdown.Toggle
                            variant="outline-primary"
                            className="db-tool-button"
                        >
                            <FontAwesomeIcon
                                icon={faSlidersH}
                            ></FontAwesomeIcon>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item
                                active={this.props.attribute === "point"}
                                onClick={() => {
                                    this.onSelectKey("point");
                                }}
                            >
                                Point
                            </Dropdown.Item>
                            <Dropdown.Item
                                active={this.props.attribute === "name"}
                                onClick={() => {
                                    this.onSelectKey("name");
                                }}
                            >
                                Name
                            </Dropdown.Item>
                            <Dropdown.Item
                                active={this.props.attribute === "host"}
                                onClick={() => {
                                    this.onSelectKey("host");
                                }}
                            >
                                Host
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button
                        className="mx-2"
                        variant="outline-primary"
                        onClick={this.onClickOrder}
                    >
                        {btnOrder}
                    </Button>
                    <Button
                        onClick={() => this.props.reload()}
                        className="mx-3"
                        variant="outline-primary"
                    >
                        {this.props.room_load ? (
                            <div
                                className="spinner-border spinner-border_custom"
                                role="status"
                            ></div>
                        ) : (
                            <FontAwesomeIcon icon={faSyncAlt} />
                        )}
                    </Button>
                </div>

                <div data-remodal-target="newroom" href="#">
                    <Button
                        className={`font-weight-bold d-flex align-items-center${
                            this.state.showing ? " disabled" : ""
                        }`}
                    >
                        {this.state.showing ? (
                            <div
                                className="spinner-border text-white spinner-border-sm mr-1"
                                role="status"
                            >
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        )}
                        Create Room
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    attribute: state.filter.attribute,
    order: state.filter.order,
    room_load: state.listRoom.load
});

const mapDispatchToProps = dispatch => ({
    change_filter: (key, order) => dispatch(change_filter(key, order)),
    reload: () => dispatch(listroom_load())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DBToolBar);
