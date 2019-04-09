import React, { Component } from 'react';
import './ExperimentalGame.css';
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
      xIsNext: true,
      computerIsX: false,
      isPracticeMode: true,
      isSinglePlayer: true
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('making moves in shouldComponentUpdate', 'current state: ', this.state, 'next state: ', nextState)
    const computerPiece = this.state.computerIsX ? 'X' : 'O'
    const squares = nextState.history[nextState.history.length - 1].squares.slice()
    const AIMove = minMax(squares, computerPiece).index

    this.makeAIMoves(nextState, AIMove)
    return true
  }

  makeAIMoves(nextState, AIMove) { //REVIEW: there's a bug when resetting
    if (!this.state.isSinglePlayer) {
      return
    }
    if (this.beginingOfGame(nextState)) {
      if (nextState.computerIsX && this.state.xIsNext) {
        this.updateBoard(AIMove)
        return
      }
    }

    if (!this.beginingOfGame(nextState)) {
      if (!this.state.computerIsX && this.state.xIsNext) { //Player goes first with X
        this.updateBoard(AIMove)
      } else if (this.state.computerIsX && !this.state.xIsNext) { //Computer goes first with X
        this.updateBoard(AIMove)
      }
    }
  }

  beginingOfGame(nextState) {
    return nextState.stepNumber === 0
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

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  togglePlayerMode() {
    this.setState(prevState => {
      if (prevState.history.length > 1) {
        alert('reset current game to change number of player')
      } else {
        return {isSinglePlayer: !prevState.isSinglePlayer}
      }
    });
  }

  toggleWhoStarts() {
    this.setState(prevState => {
      if (prevState.history.length > 1) {
        alert('reset current game to change who starts')
      } else {
        return {computerIsX: !prevState.computerIsX}
      }
    })
  }

  togglePracticeMode() {
    this.setState(prevState => {
      if (!prevState.isPracticeMode && prevState.history.length > 1) {
        // TODO: change this to modal message
        alert('reset current game to return to practice mode')
      } else {
        return {isPracticeMode: !prevState.isPracticeMode}
      }
    })
  }

  resetGame() {
    this.setState({
      history: [{squares: Array(9).fill(null)}],
      stepNumber: 0,
      xIsNext: true,
      computerIsX: false
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const playerMode = this.state.isSinglePlayer ? 'Single Player' : 'Two Player';
    const practiceMode = this.state.isPracticeMode ? 'Practice' : 'Serious';
    const whoStarts = this.state.computerIsX ? 'Computer' : 'You'

    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move #${move} (${step.lastMove})` :
        'Go to game start';

      return (
        <li key={move}>
          <button type="button" onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-modes">
          <div className="player-mode">
            <p>Toggle Player Mode</p>
            <button
              type="button"
              className="mode-toggle"
              onClick={() => this.togglePlayerMode()}
            >{playerMode}
            </button>
          </div>
          {this.state.isSinglePlayer
            ?  (<div>
                  <p>Who Starts</p>
                  <button
                    type="button"
                    className="mode-toggle"
                    onClick={() => this.toggleWhoStarts()}
                  >{whoStarts}
                  </button>
                </div>)
            : null
          }
          <div>
            <p>Toggle Game Mode</p>
            <button
              type="button"
              className="mode-toggle"
              onClick={() => this.togglePracticeMode()}
            >{practiceMode}
            </button>
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
        {this.state.isPracticeMode
          ? ( <div>
                <ol>{moves}</ol>
              </div>)
          : null
        }
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
