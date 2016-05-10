import Bacon from 'baconjs';
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

const lines = v
  .open('div', {'class': 'grid_lines grid_lines--horizontal'})
    .each([0,0,0,0,0,0,0,0,0])
      .open('div', {'class': 'grid_line grid_line--horizontal'}).close()
    .close()
  .close()
  .open('div', {'class': 'grid_lines grid_lines--vertical'})
    .each([0,0,0,0,0,0,0,0,0])
      .open('div', {'class': 'grid_line grid_line--vertical'}).close()
    .close()
  .close();

const el = v
  .open('main')
    .open('h1')
      .text('Goban')
    .close()
    .open('div', {'class': 'goban'})
      //Draw coordinates
      .append(coordinates)
      .open('div', {'class': 'goban_grid'})
        //Draw lines
        .append(lines)
      .close()
    .close()
  .run();

window.document.body.appendChild(el);
