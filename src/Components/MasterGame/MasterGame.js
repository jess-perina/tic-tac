import React, { Component } from 'react';
import M from 'materialize-css';
import ticTac from '../../lib/ticTac'
import './MasterGame.css';
import Board from '../Board/Board';
import AlertModal from '../Modals/AlertModal'
import PlayerModeButton from '../PlayerModeButton/PlayerModeButton'
import WhoStartsButton from '../WhoStartsButton/WhoStartsButton'
import GameModeButton from '../GameModeButton/GameModeButton'
import ResetButton from '../ResetButton/ResetButton';
import MovesList from '../MovesList/MovesList';


export default class Game extends Component {
  constructor(props) {
    super(props)
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

  componentDidMount() {
    M.AutoInit()
    let dropdown = document.querySelectorAll('.dropdown-trigger')
    let options = {
      inDuration: 300,
        outDuration: 300,
        hover: true, // Activate on hover
        coverTrigger: false
    }
    M.Dropdown.init(dropdown, options)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const computerPiece = this.state.computerIsX ? 'X' : 'O'
    const squares = nextState.history[nextState.history.length - 1].squares.slice()
    const AIMove = ticTac.minMax(squares, computerPiece, 0).index

    this.makeAIMoves(nextState, AIMove)
    return true
  }

  makeAIMoves(nextState, AIMove) {
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

      if (ticTac.calculateWinner(squares) || squares[i]) {
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

  isGameStart(state) {
    if (state.history.length > 1) {
      let alert = M.Modal.getInstance(document.querySelector('.modal'))
      alert.open()
      return false
    }
    return true
  }

  setSinglePlayer() {
    if (!this.isGameStart(this.state)) return
    this.setState(() => {
      return {isSinglePlayer: true}
    });
  }

  setTwoPlayer() {
    if (!this.isGameStart(this.state)) return
    this.setState(() => {
      return {isSinglePlayer: false}
    });
  }

  setComputerStart() {
    if (!this.isGameStart(this.state)) return
    this.setState(() => {
        return {computerIsX: true}
    });
  }

  setHumanStart() {
    if (!this.isGameStart(this.state)) return
    this.setState(() => {
        return {computerIsX: false}
    });
  }

  setPracticeMode() {
    if (!this.isGameStart(this.state)) return
    this.setState(() => {
      return {isPracticeMode: true}
    });
  }

  setSeriousMode() {
    this.setState(() => {
      return {isPracticeMode: false}
    });
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
    const winner = ticTac.calculateWinner(current.squares);
    const playerMode = this.state.isSinglePlayer ? 'Single Player' : 'Two Player';
    const practiceMode = this.state.isPracticeMode ? 'Practice' : 'Serious';
    const whoStarts = this.state.computerIsX ? 'Computer' : 'You'

    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move #${move} (${step.lastMove})` :
        'Go to game start';

      return (
        <li key={step.lastMove} className="collection-item teal accent-4">
          <button type="button" className="btn-small waves-effect waves-light" onClick={() => this.jumpTo(move)}>{desc}</button>
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
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <div className="card small valign-wrapper teal darken-1">
              <div className="card-content white-text">
                <PlayerModeButton
                  player={playerMode}
                  setSinglePlayer={() => this.setSinglePlayer()}
                  setTwoPlayer={() => this.setTwoPlayer()}
                />

                {this.state.isSinglePlayer
                  ? (<WhoStartsButton
                      starts={whoStarts}
                      setHumanStart={() => this.setHumanStart()}
                      setComputerStart={() => this.setComputerStart()}
                    />)
                  : (<GameModeButton
                      practiceMode={practiceMode}
                      setPractice={() => this.setPracticeMode()}
                      setSerious={() => this.setSeriousMode()}
                    />)
                }

                <ResetButton resetGame={() => this.resetGame()} />
              </div>
            </div>
          </div>
          <div className="col s12 m6">
            <div className="card small valign-wrapper teal darken-1">
              <div className="card-content white-text">
                <span className="card-title">{status}</span>
                <div>
                  <Board
                    squares={current.squares}
                    onClick={i => this.handleClick(i)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.state.isPracticeMode && !this.state.isSinglePlayer
          ? ( <div className="row">
                <div className="col s12">
                  <div className="card valign-wrapper teal darken-1">
                    <div className="card-content white-text">
                      <MovesList moves={moves} />
                    </div>
                  </div>
                </div>
              </div>)
          : null
        }

        <AlertModal reset={() => this.resetGame()} />

      </div>
    );
  }
}
