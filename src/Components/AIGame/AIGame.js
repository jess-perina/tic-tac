import React, { Component } from 'react';
import './AIGame.css';
import Board from '../Board/Board';


export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          lastMove: ''
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.xIsNext && nextState.stepNumber !== 0) {
      let squares = nextState.history[nextState.history.length - 1].squares.slice()
      let AIMove = minMax(squares, 'O').index
      this.updateBoard(AIMove)
    }
    return true
  }

  handleClick(i) {
    this.updateBoard(i)
  }

  updateBoard(i) {
    this.setState(prevState => {
      const history = prevState.history.slice(0, prevState.stepNumber + 1)
      const current = history[history.length - 1]
      const squares = current.squares.slice()

      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = prevState.xIsNext ? 'X' : 'O';

      return ({
        history: history.concat([
          {
            squares: squares,
            lastMove: `${squares[i]} to space ${i}`
          }
        ]),
        stepNumber: history.length,
        xIsNext: !prevState.xIsNext
      });
    })
  }

  resetGame() {
    this.setState({
      history: [{squares: Array(9).fill(null)}],
      stepNumber: 0,
      xIsNext: true
    })
  }

  render() {
    // const gameType = this.props.gameType;
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-modes">
          <div>
            <p>AI Mode</p>
          </div>
          <button type="button" onClick={() => this.resetGame()}>Reset Game</button>
        </div>
        <div>
          <div>{status}</div>
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
      </div>
    );
  }
}

// ========================================

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let tie = 'Tie';
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    } else if (squares[a] === null || squares[b] === null || squares[c] === null){
      tie = '';
    }
  }
  return tie || null;
}

function displayWinner(winner) {
  switch (winner) {
    case 'X':
      return 'You win';
    case 'O':
      return 'Computer wins'
    default:
      return 'Tie';
  }
}

function possibleMoves(board) {
  let options = []
  for (var i = 0; i < board.length; i++) {
    if (board[i] === null) {
      options.push(i)
    }
  }
  return options
  // return board.filter((s, index ) => {
  //   if (s === null) return index
  // })
}

function setScore(winner, moves) {
  if (winner === 'X') {
    return {score: -10}
  } else if (winner === 'O') {
    return {score: 10}
  } else if (moves.length === 0) {
    return {score: 0}
  }
}

function minMax(board, player) {
  const availableMoves = possibleMoves(board)
  const winner = calculateWinner(board)
  if (winner === 'X') {
    return {score: -10}
  } else if (winner === 'O') {
    return {score: 10}
  } else if (availableMoves.length === 0) {
    return {score: 0}
  }

  let moves = []
  for (let i = 0; i < availableMoves.length; i++) {
    let move = []
    move.index = availableMoves[i]
    board[availableMoves[i]] = player

    if (player === 'O') {
      let g = minMax(board, 'X')
      move.score = g.score
    } else {
      let g = minMax(board, 'O')
      move.score = g.score
    }
    board[availableMoves[i]] = null
    moves.push(move)
  }

  let bestMove
  if (player === 'O') {
    let bestScore = -10000
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score
        bestMove = i
      }
    }
  } else {
    let bestScore = 10000
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score
        bestMove = i
      }
    }
  }
  return moves[bestMove]
}
