import React from 'react'
import BubbleChat from './bubble-chat';
import Scrollbar from 'smooth-scrollbar';
// import { Form } from "react-bootstrap";

class Chat extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            heightBody: 0
        }
    }

    componentDidMount() {
        let heightHeader = document.querySelector(".chat-header").clientHeight
        let heightFooter = document.querySelector(".chat-footer").clientHeight
        let heightChat = document.querySelector(".chat").clientHeight
        Scrollbar.init(document.querySelector(".chat-body"))
        this.setState({
            heightBody: heightChat - (heightHeader + heightFooter)
        })
    }

    render() {
        return (
            <div className="chat h-50">
                <div className="chat-header">
                    Chat
                </div>
                <div className="chat-body" style={{height: this.state.heightBody}}>
                    <BubbleChat content="hello boy" right={true} />
                    <BubbleChat content="hello boy" right={false} />
                    <BubbleChat content="hello boy" right={true} />
                    <BubbleChat content="hello boy" right={false} />
                    <BubbleChat content="hello boy hello boy hello boy hello boy hello boy hello boy hello boy" right={true} />
                    <BubbleChat content="hello boy" right={false} />
                    <BubbleChat content="hello boy" right={true} />
                    <BubbleChat content="hello boy" right={false} />
                    <BubbleChat content="hello boy" right={true} />
                    <BubbleChat content="hello boy" right={false} />
                    <BubbleChat content="hello boy" right={true} />
                    <BubbleChat content="hello boy" right={false} />
                </div>
                <div className="chat-footer">
                    <form className="d-flex">
                        <input className="chat-input" type="text" />
                        <button className="btn btn-send">SEND</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Chat;