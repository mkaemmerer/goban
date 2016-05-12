import v from 'v';

import coordinates from './decoration/coordinates';
import lines       from './decoration/lines';

const decoration = v
  .open('div', {'class': 'goban-decoration'})
    .append(coordinates)

    .open('div', {'class': 'goban-decoration_lines'})
      .append(lines)
    .close()
  .close();

export default decoration;
