import v from 'v';

import decoration from './decoration';
import grid       from './grid';

const board = v
  .open('div', {'class': 'goban'})
    .append(decoration)
    .append(grid)
  .close();

export default board;
