import v from 'v';

import decoration from './decoration';
import grid       from './grid';

const board = (board_data) => v
  .open('div', {'class': 'goban'})
    .append(decoration)
    .append(grid(board_data))
  .close();

export default board;
