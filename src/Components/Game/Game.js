import React, { Component } from 'react';
import './Game.css';
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
      isPracticeMode: true,
      isSinglePlayer: false
    };
  }

  handleClick(i) {
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
      return {isSinglePlayer: !prevState.isSinglePlayer}
    });
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
      xIsNext: true
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const playerMode = this.state.isSinglePlayer ? 'Two Player' : 'Single Player';
    const practiceMode = this.state.isPracticeMode ? 'Practice' : 'Serious';

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
