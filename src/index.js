import Bacon from 'baconjs';
import v from 'v';

import board from './goban/board';

const el = v
  .open('main')
    .open('h1')
      .text('Goban')
    .close()
    .append(board)
  .run();

window.document.body.appendChild(el);
