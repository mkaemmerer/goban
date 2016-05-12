import v from 'v';

const space = ({location, contents}) => {
  return v
    .open('div', {'class': 'goban-grid_space', 'data-x': location.x, 'data-y': location.y})
      .$if(contents !== null)
        .append(() => stone(contents.color))
      .close()
    .close();
}
const stone = (color) => {
  const color_class = {
    'white': 'goban-stone--white',
    'black': 'goban-stone--black'
  };
  return v
    .open('div', {'class': `goban-stone ${color_class[color]}`})
    .close();
};

const grid = (board_data) => v
  .open('div', {'class': 'goban-grid'})
    .each(board_data.map(d => d.intersections))
      .append(space)
    .close()
  .close();

export default grid;
