import React from "react";
// import PropTypes from 'prop-types'
import { connect } from "react-redux";
import Main from "./main";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGooglePlusG,
    faFacebookSquare
} from "@fortawesome/free-brands-svg-icons";
import { Link, Redirect } from "react-router-dom";
import { setJwtToStorage, setUsernameToStorage } from "../utils/utils";
import { api } from "../api/api";
import { receivedUserInfo } from "../actions/user";
import { onRestart } from "../actions/room";
import { toast } from 'react-toastify';

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

const styleSignInTitle = {
    color: "#9da9bb"
};

class Login extends React.Component {
    state = {
        redirectToReferrer: false,
        usernameInput: "",
        passwordInput: ""
    };

    componentDidMount() {
        this.props.onRestart()
    }

    handleSubmit = e => {
        e.preventDefault();
        api.post("/auth", {
            username: this.state.usernameInput,
            password: this.state.passwordInput
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
                toast.error('Wrong username or password')
            });
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

    render() {
        const { from } = this.props.location.state || {
            from: { pathname: "/" }
        };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer === true) {
            return <Redirect to={from} />;
        }

        return (
            <Main>
                {/* <ToastContainer /> */}
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
                                                    backgroundImage: `url(${
                                                        process.env.PUBLIC_URL
                                                    }/images/half-circle.png)`
                                                }}
                                            />
                                            <div className="position-relative z-index-1">
                                                <Link
                                                    to="/"
                                                    style={styleLogo}
                                                    className="text-white font-weight-bold"
                                                >
                                                    caro
                                                </Link>
                                                <p className="text-100 mt-3">
                                                    Lorem Ipsum is simply dummy
                                                    text of the printing and
                                                    typesetting industry. Lorem
                                                    Ipsum has been the
                                                    industry's standard dummy
                                                    text ever since the 1500s
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-5 mb-4">
                                            <p>Don't have an account?</p>
                                            <Link
                                                to="/register"
                                                className="btn btn-outline-light px-2 py-1"
                                            >
                                                Register
                                            </Link>
                                        </div>
                                    </Col>
                                    <Col md="7" className="flex-center">
                                        <div className="px-4 py-5 flex-grow-1">
                                            <h3 style={styleTitle}>
                                                Account Login
                                            </h3>
                                            <Form onSubmit={this.handleSubmit}>
                                                <Form.Group>
                                                    <Form.Label>
                                                        Username
                                                    </Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        pattern="^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$"
                                                        value={
                                                            this.state
                                                                .usernameInput
                                                        }
                                                        onChange={
                                                            this
                                                                .handleUsernameInput
                                                        }
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>
                                                        Password
                                                    </Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="password"
                                                        pattern="^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$"
                                                        value={
                                                            this.state
                                                                .passwordInput
                                                        }
                                                        onChange={
                                                            this
                                                                .handlePasswordInput
                                                        }
                                                    />
                                                </Form.Group>
                                                {/* <Form.Group>
                                                    <Form.Check type="checkbox" label="Remember me"></Form.Check>
                                                </Form.Group> */}
                                                <Form.Group>
                                                    <Button
                                                        className="btn-block"
                                                        variant="primary"
                                                        type="sumbit"
                                                        style={styleButton}
                                                    >
                                                        Log in
                                                    </Button>
                                                </Form.Group>
                                            </Form>
                                            <div className="w-100 position-relative mt-5">
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
                                            </div>
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

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    updateUserInfo: user => dispatch(receivedUserInfo(user)),
    onRestart: () => dispatch(onRestart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
