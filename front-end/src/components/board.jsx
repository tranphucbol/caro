import React from "react";
import Tile from "./tile";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { tickTile, onCheckWin } from "../actions/room";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tileSize: Math.floor((window.innerHeight * 0.7) / this.props.rows)
        };
    }

    componentDidMount() {
        window.addEventListener("resize", () => {
            this.setState({
                tileSize: Math.floor(
                    (window.innerHeight * 0.7) / this.props.rows
                )
            });
        });
    }

    handleClick(id) {
        this.props.onTick(id)
        this.props.onCheckWin()
    }

    generateRow(rowIndex) {
        let cols = [];
        for (let i = 0; i < this.props.cols; i++) {
            const id = rowIndex * this.props.cols + i;
            cols.push(
                <Tile
                    key={i}
                    onClick={() => this.handleClick(id)}
                    value={this.props.tiles[id].value}
                    lastTick={this.props.lastTick === id}
                    width={this.state.tileSize}
                    height={this.state.tileSize}
                />
            );
        }
        return cols;
    }

    generateBoard() {
        let rows = [];
        for (let i = 0; i < this.props.rows; i++) {
            let row = this.generateRow(i);
            rows.push(
                <div key={i} className="row-board">
                    {row}
                </div>
            );
        }
        return rows;
    }

    render() {
        return <div className="board position-relative">{this.generateBoard()}</div>;
    }
}

Board.propTypes = {
    rows: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
    tiles: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.number.isRequired
        }).isRequired
    ),
    turn: PropTypes.number.isRequired,
    lastTick: PropTypes.number.isRequired,
    onTick: PropTypes.func.isRequired,
    onCheckWin: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    rows: state.room.board.rows,
    cols: state.room.board.cols,
    tiles: state.room.board.tiles,
    lastTick: state.room.board.lastTick,
    turn: state.room.board.turn
});

const mapDispatchToProps = dispacth => ({
    onTick: id => dispacth(tickTile(id)),
    onCheckWin: () => dispacth(onCheckWin())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);
