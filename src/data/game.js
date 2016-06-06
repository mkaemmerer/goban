import Board from './board';

const oppositeColor = (color) => {
  switch(color){
    case 'black': return 'white';
    case 'white': return 'black';
  }
};

class Game {
  constructor(board, color){
    this._board = board;
    this._color = color;
  }
  placeStone(location){
    const board = this._board.placeStone(this._color, location);
    const color = oppositeColor(this._color);

    return new Game(board, color);
  }

  static create(){
    return new Game(Board.empty(), 'black');
  }
  static fromJS({_board, _color}){
    return new Game(Board.fromJS(_board), _color);
  }
}

export default Game;
