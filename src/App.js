import React, { Component } from 'react';
import './App.css';

import ChessSquare from './components/ChessSquare';
import PieceSquare from './components/PieceSquare';
import { generateDefaultBoard } from './utils';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selected: null,
      turn: 'w',
      possible: [],
      board: generateDefaultBoard(),
      eliminatedWhite: [],
      eliminatedBlack: [],
    };
    this.selectSquare = this.selectSquare.bind(this);
  }

  selectSquare(i) {
    if (i === this.state.selected) {
      return -1;
    }
    if (this.state.possible.includes(i)) {
      if (this.state.board.hasOwnProperty(i)) {
        let color = this.state.board[i][0];
        if (color === 'w') {
          let arr = this.state.eliminatedWhite.slice();
          arr.push(this.state.board[i]);
          this.setState({
            eliminatedWhite: arr,
          });
        } else {
          let arr = this.state.eliminatedBlack.slice();
          arr.push(this.state.board[i]);
          this.setState({
            eliminatedBlack: arr,
          });
        }
      }
      let tempBoard = Object.assign({}, this.state.board);
      tempBoard[i] = this.state.board[this.state.selected];
      delete tempBoard[this.state.selected];
      this.setState({
        selected: i,
        board: tempBoard,
        turn: this.state.turn === 'w' ? 'b' : 'w',
        possible: [],
      });
    } else {
      this.calcPossible(i, this.state.board[i]);
      this.setState({
        selected: i,
      });
    }
  }

  citc(ind) {
    let i = ind + 1;
    let col = i % 8 || 8;
    let row = Math.ceil(i / 8);
    return { c: col, r: row };
  }

  ccti(col, row) {
    if (col < 1 || col > 8 || row < 1 || row > 8) {
      return -1;
    }
    return (row - 1) * 8 + col - 1;
  }

  getColorOnSquare(i) {
    return this.state.board[i] ? this.state.board[i][0] : null;
  }

  resetBoard() {
    this.setState({
      selected: null,
      turn: 'w',
      possible: [],
      board: generateDefaultBoard(),
      eliminatedWhite: [],
      eliminatedBlack: [],
    });
  }

  calcPossible(i, givenPiece) {
    let coord = this.citc(i);
    let color,
      piece,
      newPoss = [];
    if (givenPiece) {
      color = givenPiece[0];
      piece = givenPiece.slice(1);
    } else if (this.state.board.hasOwnProperty(i)) {
      color = this.state.board[i][0];
      piece = this.state.board[i].slice(1);
    }
    if (color === this.state.turn) {
      // eslint-disable-next-line
      switch (piece) {
        case 'p':
          let multiplier = color === 'b' ? 1 : -1;
          newPoss.push(this.ccti(coord.c, coord.r + 1 * multiplier));
          if (
            (color === 'b' && coord.r === 2) ||
            (color === 'w' && coord.r === 7)
          ) {
            newPoss.push(this.ccti(coord.c, coord.r + 2 * multiplier));
          }
          break;
        case 'kn':
          newPoss.push(this.ccti(coord.c + 1, coord.r + 2));
          newPoss.push(this.ccti(coord.c + 1, coord.r - 2));
          newPoss.push(this.ccti(coord.c - 1, coord.r + 2));
          newPoss.push(this.ccti(coord.c - 1, coord.r - 2));
          newPoss.push(this.ccti(coord.c + 2, coord.r + 1));
          newPoss.push(this.ccti(coord.c + 2, coord.r - 1));
          newPoss.push(this.ccti(coord.c - 2, coord.r + 1));
          newPoss.push(this.ccti(coord.c - 2, coord.r - 1));
          break;
        case 'r':
          for (let i = 1; i < 8; i++) {
            newPoss.push(this.ccti(coord.c - i, coord.r));
            newPoss.push(this.ccti(coord.c + i, coord.r));
            newPoss.push(this.ccti(coord.c, coord.r - i));
            newPoss.push(this.ccti(coord.c, coord.r + i));
          }
          break;
        case 'b':
          for (let i = 1; i < 8; i++) {
            newPoss.push(this.ccti(coord.c - i, coord.r - i));
            newPoss.push(this.ccti(coord.c + i, coord.r + i));
            newPoss.push(this.ccti(coord.c - i, coord.r + i));
            newPoss.push(this.ccti(coord.c + i, coord.r - i));
          }
          break;
        case 'q':
          for (let i = 1; i < 8; i++) {
            newPoss.push(this.ccti(coord.c - i, coord.r));
            newPoss.push(this.ccti(coord.c + i, coord.r));
            newPoss.push(this.ccti(coord.c, coord.r - i));
            newPoss.push(this.ccti(coord.c, coord.r + i));
            newPoss.push(this.ccti(coord.c - i, coord.r - i));
            newPoss.push(this.ccti(coord.c + i, coord.r + i));
            newPoss.push(this.ccti(coord.c - i, coord.r + i));
            newPoss.push(this.ccti(coord.c + i, coord.r - i));
          }
          break;
        case 'k':
          for (let i = 1; i < 2; i++) {
            newPoss.push(this.ccti(coord.c - i, coord.r));
            newPoss.push(this.ccti(coord.c + i, coord.r));
            newPoss.push(this.ccti(coord.c, coord.r - i));
            newPoss.push(this.ccti(coord.c, coord.r + i));
            newPoss.push(this.ccti(coord.c - i, coord.r - i));
            newPoss.push(this.ccti(coord.c + i, coord.r + i));
            newPoss.push(this.ccti(coord.c - i, coord.r + i));
            newPoss.push(this.ccti(coord.c + i, coord.r - i));
          }
          break;
      }
    }
    newPoss = newPoss.filter((c) => {
      return this.getColorOnSquare(c) !== color;
    });
    this.setState({
      possible: newPoss,
    });
  }

  render() {
    const state = this.state;
    const board = this.state.board;
    let arr = Array.from(Array(64).keys());

    const squares = arr.map((c, i) => {
      const color = board.hasOwnProperty(i) ? board[i][0] : null;
      const piece = board.hasOwnProperty(i) ? board[i].slice(1) : null;
      return (
        <ChessSquare
          key={i}
          i={i}
          color={color}
          piece={piece}
          selected={i === state.selected}
          green={state.possible.includes(i)}
          selectMe={this.selectSquare}
        />
      );
    });

    const whiteEliminated = state.eliminatedWhite.map((c, i) => {
      const color = c[0];
      const piece = c.slice(1);
      return <PieceSquare color={color} piece={piece} i={i} key={i} />;
    });
    const blackEliminated = state.eliminatedBlack.map((c, i) => {
      const color = c[0];
      const piece = c.slice(1);
      return <PieceSquare color={color} piece={piece} i={i} key={i} />;
    });
    return (
      <div className="App">
        <div className="App-header">
          <h2 className="App-intro" onClick={(_) => this.resetBoard()}>
            Chess
          </h2>
        </div>
        <div className="content">
          <div className="black graveyard">{blackEliminated}</div>
          <div className="board">{squares}</div>
          <div className="white graveyard">{whiteEliminated}</div>
          {/* {JSON.stringify(this.citc(this.state.selected))} */}
          {/* {JSON.stringify((this.state.possible))} */}
        </div>
      </div>
    );
  }
}

export default App;
