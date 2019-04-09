import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import Game from '../Game/Game';
import AIGame from '../AIGame/AIGame';
import MasterGame from '../MasterGame/MasterGame';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameAI: true
    }
  }

  render() {
    return (
      <div className="App container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="cyan darken-4">
          <MasterGame />
          <p>Other game options below</p>
          <Game />
          <AIGame gameType={this.state.isGameAI} />
        </div>
      </div>
    );
  }
}

export default App;
