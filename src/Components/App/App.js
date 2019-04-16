import React, { Component } from 'react';
import './App.css';
import MasterGame from '../MasterGame/MasterGame';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="cyan darken-4">
          <MasterGame />
        </div>
      </div>
    );
  }
}

export default App;
