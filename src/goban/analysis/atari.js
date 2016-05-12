import v from 'v';

const mark = (location) => {
  const position = {
    top:  (location.x / 9) * 100,
    left: (location.y / 9) * 100
  };
  const style = `top: ${position.top}%; left: ${position.left}%`;

  return v
    .open('div', {'class': 'goban-mark goban-mark--atari', 'style': style})
    .close();
}

const atari = (analysis_data) => {
  analysis_data.map(d => d.locations.toArray()).log();

  return v
    .each(analysis_data.map(d => d.locations.toArray()))
      .append(mark);
};

export default atari;
