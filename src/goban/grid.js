import v from 'v';

const stone = (d) => {
  const exists = Math.random() > 0.8;
  const color  = Math.random() > 0.5 ? 'goban_stone--white' : 'goban_stone--black';

  return exists ? v.open('div', {'class': `goban_stone ${color}`}) : v;
};

const grid = v
  .open('div', {'class': 'goban_grid'})
    .each([1,2,3,4,5,6,7,8,9])
      .each([1,2,3,4,5,6,7,8,9])

        .open('div', {'class': 'goban_grid-space'})
          .append(stone)
        .close()

      .close()
    .close()
  .close();

export default grid;
