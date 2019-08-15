import React from "react";
import O from "./O";
import X from "./X";

class Tile extends React.Component {
    render() {
        return (
            <div
                className={`tile flex-center${
                    this.props.lastTick ? " last-tick" : ""
                }`}
                onClick={this.props.onClick}
                style={{ width: this.props.width, height: this.props.height }}
            >
                {this.props.value === 1 && (
                    <X
                        width={this.props.width}
                        height={this.props.height}
                        color="#2c7be5"
                    />
                )}
                {this.props.value === 2 && (
                    <O
                        width={this.props.width}
                        height={this.props.height}
                        color="#e63757"
                    />
                )}
            </div>
        );
    }
}

export default Tile;
