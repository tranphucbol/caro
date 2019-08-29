import React from "react";
// import PropTypes from 'prop-types'
import Main from "./main";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faGooglePlusG,
//     faFacebookSquare
// } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import { setUsernameToStorage, setJwtToStorage } from "../utils/utils";
import { Redirect } from "react-router-dom";
import { receivedUserInfo } from "../actions/user";
import { onRestart } from "../actions/room";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const styleTitle = {
    fontSize: "1.5rem",
    color: "#344050"
};

const styleButton = {
    fontWeight: "bold",
    fontSize: "1rem"
};

const styleLogo = {
    fontSize: "2rem"
};

// const styleSignInTitle = {
//     color: "#9da9bb"
// };

class Register extends React.Component {
    state = {
        redirectToReferrer: false,
        usernameInput: "",
        passwordInput: "",
        rePasswordInput: ""
    };

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        if (this.state.usernameInput === "") {
            toast.error("Username is empty");
        } else if (
            this.state.passwordInput !== "" &&
            this.state.rePasswordInput !== "" &&
            this.state.passwordInput === this.state.rePasswordInput
        ) {
            api.post("/register", {
                username: this.state.usernameInput,
                password: this.state.passwordInput,
                rePassword: this.state.rePasswordInput
            })
                .then(res => {
                    setUsernameToStorage(res.data.data.username);
                    setJwtToStorage(res.data.token);
                    this.props.updateUserInfo(res.data.data);
                    this.setState(() => ({
                        redirectToReferrer: true
                    }));
                })
                .catch(err => {
                    toast.error("Username exsited");
                });
        } else {
            toast.error("Password does not match re-password");
        }
    };

    handleUsernameInput = e => {
        this.setState({
            usernameInput: e.target.value
        });
    };

    handlePasswordInput = e => {
        this.setState({
            passwordInput: e.target.value
        });
    };

    handleRePasswordInput = e => {
        this.setState({
            rePasswordInput: e.target.value
        });
    };

    render() {
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer === true) {
            return <Redirect to="/" />;
        }
        return (
            <Main>
                <Row noGutters="true" className="min-vh-100 flex-center">
                    <Col lg="8" className="py-3">
                        <Card className="overflow-hidden">
                            <Card.Body className="p-0">
                                <Row noGutters="true" className="h-100">
                                    <Col
                                        md="5"
                                        className="text-white text-center bg-card-gradient"
                                    >
                                        <div className="position-relative px-4 pt-4 pb-5">
                                            <div
                                                className="bg-holder bg-auth-card-shape"
                                                style={{
                                                    backgroundImage: `url(${process.env.PUBLIC_URL}/images/half-circle.png)`
                                                }}
                                            />
                                            <div className="position-relative z-index-1">
                                                <a
                                                    href="/"
                                                    style={styleLogo}
                                                    className="text-white font-weight-bold"
                                                >
                                                    caro
                                                </a>
                                                <p className="text-100 mt-3">
                                                This caro game is a product
                                                    with our enthusiasm. Hope you
                                                    have a great time with this
                                                    game. I sincerely apologize
                                                    if the error occurred during
                                                    the game. This is the first
                                                    product we apply new
                                                    technology such as React,
                                                    Redux.
                                                    <br/>
                                                    <b>
                                                    Made by
                                                    </b>
                                                    <br/> 
                                                    <b><i>Tran Trong
                                                    Phuc - Nguyen Hong Ky</i></b>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-5 mb-4">
                                            <p>Have an account?</p>
                                            <Link
                                                to="/login"
                                                className="btn btn-outline-light px-2 py-1"
                                            >
                                                Log In
                                            </Link>
                                        </div>
                                    </Col>
                                    <Col md="7" className="flex-center">
                                        <div className="px-4 py-5 flex-grow-1">
                                            <h3 style={styleTitle}>Register</h3>
                                            <Form onSubmit={this.handleSubmit}>
                                                <Form.Group>
                                                    <Form.Label>
                                                        Username
                                                    </Form.Label>
                                                    <Form.Control
                                                        required
                                                        pattern="^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){3,23}[a-zA-Z0-9]$"
                                                        value={
                                                            this.state
                                                                .usernameInput
                                                        }
                                                        onChange={
                                                            this
                                                                .handleUsernameInput
                                                        }
                                                        type="text"
                                                    />
                                                </Form.Group>
                                                <Form.Row>
                                                    <Form.Group className="col-6">
                                                        <Form.Label>
                                                            Password
                                                        </Form.Label>
                                                        <Form.Control
                                                            required
                                                            value={
                                                                this.state
                                                                    .passwordInput
                                                            }
                                                            onChange={
                                                                this
                                                                    .handlePasswordInput
                                                            }
                                                            type="password"
                                                            pattern="^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){3,23}[a-zA-Z0-9]$"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="col-6">
                                                        <Form.Label>
                                                            Confirm Password
                                                        </Form.Label>
                                                        <Form.Control
                                                            required
                                                            value={
                                                                this.state
                                                                    .rePasswordInput
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleRePasswordInput
                                                            }
                                                            type="password"
                                                            pattern="^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){3,23}[a-zA-Z0-9]$"
                                                        />
                                                    </Form.Group>
                                                </Form.Row>

                                                {/* <div className="custom-control">
                                                    <Form.Check id="custom-control-input"></Form.Check>
                                                    <label className="custom-control-label" >
                                                        I accept the 
                                                        <a href="#!"> terms </a>
                                                        and 
                                                        <a href="#!"> privacy policy</a>
                                                    </label>
                                                </div> */}

                                                <Form.Group>
                                                    <Button
                                                        className="btn-block"
                                                        variant="primary"
                                                        style={styleButton}
                                                        type="submit"
                                                    >
                                                        Register
                                                    </Button>
                                                </Form.Group>
                                            </Form>
                                            {/* <div className="w-100 position-relative mt-5">
                                                <hr className="text-300" />
                                                <div
                                                    className="position-absolute absolute-centered t-0 px-3 bg-white text-500 text-nowrap"
                                                    style={styleSignInTitle}
                                                >
                                                    or sign-in with
                                                </div>
                                            </div>
                                            <div className="form-group mb-0">
                                                <div className="row no-gutters">
                                                    <Col
                                                        sm="6"
                                                        className="pr-1"
                                                    >
                                                        <a
                                                            href="/"
                                                            className="btn btn-outline-google-plus btn-block mt-2"
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faGooglePlusG
                                                                }
                                                                size="lg"
                                                            />{" "}
                                                            <span className="ml-1">
                                                                google
                                                            </span>
                                                        </a>
                                                    </Col>
                                                    <Col
                                                        sm="6"
                                                        className="pl-1"
                                                    >
                                                        <a
                                                            href="/"
                                                            className="btn btn-outline-facebook btn-block mt-2"
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faFacebookSquare
                                                                }
                                                                size="lg"
                                                            />{" "}
                                                            <span className="ml-1">
                                                                facebook
                                                            </span>
                                                        </a>
                                                    </Col>
                                                </div>
                                            </div> */}
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Main>
        );
    }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    updateUserInfo: user => dispatch(receivedUserInfo(user)),
    onRestart: () => dispatch(onRestart())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
