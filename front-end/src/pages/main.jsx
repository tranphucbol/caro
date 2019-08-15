import React from "react";
import Container from "react-bootstrap/Container";

class Main extends React.Component {
    render() {
        return (
            <Container fluid="true" className="bg">
                {this.props.children}
            </Container>
        );
    }
}

export default Main;
