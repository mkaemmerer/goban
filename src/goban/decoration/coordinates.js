import v from 'v';

const coordinates = v
  .open('div', {'class': 'goban_coordinates goban_coordinates--horizontal'})
    .each([1, 2, 3, 4, 5, 6, 7, 8, 9])
      .open('span', {'class': 'goban_coordinate'}).text(d => d).close()
    .close()
  .close()
  .open('div', {'class': 'goban_coordinates goban_coordinates--vertical'})
    .each(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'])
      .open('span', {'class': 'goban_coordinate'}).text(d => d).close()
    .close()
  .close();

export default coordinates;
