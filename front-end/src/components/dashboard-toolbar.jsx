import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import {
    faPlus,
    faSlidersH,
    faChevronUp,
    faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { openRemodalCreateRoom } from "../actions/listRoom";
// import { connect } from "react-redux";

class DBToolBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "Default",
            order: "asc"
        };
    }

    render() {
        let btnOrder;

        if (this.state.order === "asc") {
            btnOrder = <FontAwesomeIcon icon={faChevronUp} />;
        } else {
            btnOrder = <FontAwesomeIcon icon={faChevronDown} />;
        }

        return (
            <div className="db-toolbar p-3">
                <div className="d-flex align-items-center">
                    <h1 className="db-title">Caro Game</h1>

                    <Dropdown className="mx-3">
                        <Dropdown.Toggle className="db-tool-button">
                            <FontAwesomeIcon
                                icon={faSlidersH}
                            ></FontAwesomeIcon>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item>Point</Dropdown.Item>
                            <Dropdown.Item>Name</Dropdown.Item>
                            <Dropdown.Item>Host</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Button className="">{btnOrder}</Button>
                </div>
                <div data-remodal-target="newroom" href="#">
                    <Button>
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Create Room
                    </Button>
                </div>
            </div>
        );
    }
}

// const mapDispatchToProps = dispatch => ({
//     openRemodalCreateRoom: () => dispatch(openRemodalCreateRoom())
// });

export default DBToolBar;
