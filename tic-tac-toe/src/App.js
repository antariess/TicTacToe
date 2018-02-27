import React, { Component } from 'react';
import './App.css';

class App extends Component {
  clicked = function (event){
      console.log(event.target)
  }


  render() {
    return (
      <div id="game">
        <div id="scoreboard">
          This is scoreboard
        </div>
        <div id="gameboard" onClick={this.clicked}>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
      </div>
    );
  }
}

export default App;
