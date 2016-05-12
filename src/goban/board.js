import v from 'v';

import decoration from './decoration';
import grid       from './grid';
import analysis   from './analysis';

const board = (board_data) => {
  return v
    .open('div', {'class': 'goban'})
      .append(decoration)
      .append(grid(board_data))
      .append(analysis(board_data))
    .close();
};

export default board;
