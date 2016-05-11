import Bacon from 'baconjs';
import v     from 'v';

import board_view from './goban/board';
import Board      from './data/board';


const oppositeColor = (color) => {
  switch(color){
    case 'black': return 'white';
    case 'white': return 'black';
  }
};

const moves = Bacon.fromEvent(window.document.body, 'click')
  .filter(e => e.target.classList.contains('goban_grid-space'))
  .map(e => e.target.dataset)
  .map(ds => ({x: parseInt(ds.x), y: parseInt(ds.y)}));
const color = moves
  .scan('white', oppositeColor);
const board = Bacon.combineTemplate({
    location: moves,
    color:    color
  })
  .scan(Board.empty(), (board, {color, location}) => board.placeStone(color, location));

board
  .map((board) => board
    .intersections
    .map(i => {
      const stone = (i.contents === null)
        ? '.'
        : (i.contents.color === 'black')
          ? 'O'
          : '@';
      const newline = (i.location.y === 8) ? '\n' : '';
      return stone + newline;
    })
    .join('')
  )
  .log();


const el = v
  .open('main')
    .open('h1')
      .text('Goban')
    .close()
    .append(board_view(board))
  .run();

window.document.body.appendChild(el);
