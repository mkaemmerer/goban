import v from 'v';

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

export default lines;
