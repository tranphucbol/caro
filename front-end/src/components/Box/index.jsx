import React from 'react'
import './box.css'
import {Container } from 'react-bootstrap'

class Box extends React.Component {
    
    render() {
        return (
            <div className="Box">
                <p>
                {this.props.children}
                </p>
                
            </div>
        )
    }
}

export default Box