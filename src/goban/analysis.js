import v from 'v';

import atari       from './analysis/atari';
import {allAtaris} from '../analysis/atari';

const mark = (location) => {
  return v
    .open('div', {'class': 'goban-mark goban-mark--atari'})
      .text('ATARI')
    .close();
}

const analysis = (board_data) => {
  const analysis_data = board_data.map(allAtaris);
  analysis_data.log();
  return v
    .open('div', {'class': 'goban-analysis'})
      .append(atari(analysis_data))
    .close();
};

export default analysis;
