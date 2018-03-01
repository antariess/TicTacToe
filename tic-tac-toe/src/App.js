import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {      
      winner: undefined,
      winnerLine: ""
    }
    this.gameState = {
      board: Array(9).fill(""),
      turn: 'X',
      gameEnded: false,
      gameLocked: false,
      totalMoves: 0
    }
  }
  
  clicked(box){
    if(this.gameState.gameEnded || this.gameState.gameLocked) return;
    let playerSymbol = this.gameState.turn
    console.log(playerSymbol)
    if(this.gameState.board[box.dataset.square] === ""){
      this.gameState.board[box.dataset.square] = this.gameState.turn  
      box.innerText = this.gameState.turn;
      this.gameState.turn = this.gameState.turn === 'X' ? 'O' : 'X'
      
      this.gameState.totalMoves++;
      //can use this.gameState.turn to indicate whose turn it is
    }    

    const result = this.checkWinner();
    if(result === playerSymbol){
      this.gameState.gameEnded = true
      this.setState({
        winner: playerSymbol,
        winnerLine: "Match won by " + playerSymbol
      })
    } else if(result === "draw"){
      this.gameState.gameEnded = true
      this.setState({
        winner: "draw",
        winnerLine: "It's a draw"
      })
    }
    

    if(this.gameState.turn === 'O' && !this.gameState.gameEnded) {
      this.gameState.gameLocked = true;
      setTimeout(()=> {
        do {
          var random = Math.floor(Math.random()*9);
        } while(this.gameState.board[random] !== '');
        this.gameState.gameLocked = false;
        this.clicked(document.querySelectorAll('.square')[random]);
      }, 1000);
  
    }
  }  

  checkWinner(){
    const winMoves = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]]
    const board = this.gameState.board
    for(let i =0; i< winMoves.length; i++){
      if(board[winMoves[i][0]] === board[winMoves[i][1]] &&
      board[winMoves[i][1]] === board[winMoves[i][2]] ){
        return board[winMoves[i][0]]
      }
    }
    if(this.gameState.totalMoves === 9){
      return "draw"
    }
  }

  render() {
    return (
      <div id="game">
        <div>
          Tic-Tac-Toe!
        </div>
        <div id="scoreboard">
          {this.state.winnerLine}
        </div>
        <div id="gameboard" onClick={(e)=>this.clicked(e.target)}>
          <div className="square" data-square="0"></div>
          <div className="square" data-square="1"></div>
          <div className="square" data-square="2"></div>
          <div className="square" data-square="3"></div>
          <div className="square" data-square="4"></div>
          <div className="square" data-square="5"></div>
          <div className="square" data-square="6"></div>
          <div className="square" data-square="7"></div>
          <div className="square" data-square="8"></div>
        </div>
      </div>
    );
  }
}

export default App;
