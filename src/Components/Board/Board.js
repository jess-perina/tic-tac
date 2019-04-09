import React, { Component } from 'react';
import './Board.css';
import Square from '../Square/Square';

export default class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderBoard() {
    let board = [];
    for (let i = 0; i < 3; i++) {
      let squares = [];
      for (let j = 0; j < 3; j++) {
        squares.push(this.renderSquare(i + j + (i * 2)))
      }
      board.push(<div className="board-row" key={i}>{squares}</div>)
    }
    return board
  }

  render() {
    return (
      <div className="game-container">
        {this.renderBoard()}
      </div>
    );
  }
}
