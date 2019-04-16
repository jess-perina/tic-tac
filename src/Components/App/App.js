import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header'
import MasterGame from '../MasterGame/MasterGame';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Header />
        </header>
        <div className="cyan darken-4">
          <MasterGame />
        </div>
      </div>
    );
  }
}

export default App;
