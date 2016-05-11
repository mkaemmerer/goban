import v from 'v';

const space = ({location, contents}) => {
  return v
    .open('div', {'class': 'goban_grid-space', 'data-x': location.x, 'data-y': location.y})
      .$if(contents !== null)
        .append(() => stone(contents.color))
      .close()
    .close();
}
const stone = (color) => {
  const color_class = {
    'white': 'goban_stone--white',
    'black': 'goban_stone--black'
  };
  return v
    .open('div', {'class': `goban_stone ${color_class[color]}`})
    .close();
};

const grid = (board_data) => v
  .open('div', {'class': 'goban_grid'})
    .each(board_data.map(d => d.intersections))
      .append(space)
    .close()
  .close();

export default grid;
