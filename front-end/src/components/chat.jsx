import React from "react";
import BubbleChat from "./bubble-chat";
// import Scrollbar from 'smooth-scrollbar';
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { onPushChat } from "../actions/room";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heightBody: 0,
            inputChat: ""
        };
    }

    formatTime(date) {
        let hours =
            date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        let mins =
            date.getMinutes() < 10
                ? `0${date.getMinutes()}`
                : `${date.getMinutes()}`;
        return `${hours}:${mins}`;
    }

    componentDidMount() {
        let heightHeader = document.querySelector(".chat-header").clientHeight;
        let heightFooter = document.querySelector(".chat-footer").clientHeight;
        let heightChat = document.querySelector(".chat").clientHeight;
        let heightBody = heightChat - (heightHeader + heightFooter);
        this.setState({
            heightBody: heightBody
        });
    }

    componentDidUpdate() {
        document
            .querySelector(".chat-body")
            .scrollTo(0, document.querySelector(".chat-body").scrollHeight);
    }

    handleInput = e => {
        this.setState({
            inputChat: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        let input = this.state.inputChat.trim();
        if (input.length !== 0) {
            let chat = {
                content: input,
                right: true,
                createdAt: this.formatTime(new Date())
            };
            this.props.onPushChat(chat);
            this.setState({
                inputChat: ""
            });
        }
    };

    render() {
        return (
            <div className="chat h-50">
                <div className="chat-header">Chat</div>
                <div className="position-relative">
                    <img
                        className="bg-icon position-absolute absolute-centered"
                        src={`${process.env.PUBLIC_URL}/images/chat.svg`}
                        alt="caro"
                    />
                    <PerfectScrollbar
                        className="chat-body"
                        style={{ height: this.state.heightBody }}
                    >
                        {this.props.chats.map((c, index) => (
                            <BubbleChat key={index} {...c} />
                        ))}
                    </PerfectScrollbar>
                </div>
                <div className="chat-footer">
                    <form className="d-flex" onSubmit={this.handleSubmit}>
                        <input
                            className="chat-input"
                            value={this.state.inputChat}
                            onChange={this.handleInput}
                            type="text"
                        />
                        <button className="btn btn-send" type="submit">
                            SEND
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

Chat.propTypes = {
    chats: PropTypes.arrayOf(
        PropTypes.shape({
            content: PropTypes.string.isRequired,
            right: PropTypes.bool.isRequired,
            createdAt: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    onPushChat: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    chats: state.room.chats
});

const mapDispatchToProps = dispatch => ({
    onPushChat: chat => dispatch(onPushChat(chat))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);
