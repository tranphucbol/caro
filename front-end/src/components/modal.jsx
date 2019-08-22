import React from "react";
import $ from "jquery";

class Modal extends React.Component {

    componentDidMount() {
        let parentsClass = this.props.parentsClass
        $(document).on('opening', '.remodal', function () {
            let overlay = document.querySelector('.remodal-overlay');
            let wrapper = document.querySelector('.remodal-wrapper');
            let board = document.querySelector(`${parentsClass}`);
            overlay.style.top = '0px'
            overlay.style.right = '0px'
            overlay.style.left = '1px'
            overlay.style.bottom = '0px'
            board.appendChild(overlay);
            board.appendChild(wrapper);
        });
    }
    
    render() {
        return (
            <div className="remodal rounded-soft" data-remodal-id={this.props.id ? this.props.id : 'modal'}>
                {/* <button data-remodal-action="close" className="remodal-close" /> */}
                {this.props.children}
            </div>
        );
    }
}

export default Modal
