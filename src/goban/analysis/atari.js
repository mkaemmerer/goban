import v from 'v';

const positionStyle = (location) => {
  const position = {
    top:  (location.x / 9) * 100,
    left: (location.y / 9) * 100
  };
  return `top: ${position.top}%; left: ${position.left}%`;
};

const markGroup = (group) => {
  return v
    .each(group.locations.toArray())
      .open('div').append(markStone).close()
    .close();
};
const markLocation = (location) => {
  const style = positionStyle(location);

  return v
    .open('div', {'class': 'goban-mark goban-mark--atari', 'style': style})
    .close();
};
const markStone = (location) => {
  const style = positionStyle(location);

  return v
    .open('div', {'class': 'goban-mark goban-mark--group-atari', 'style': style})
    .close();
};

const atari = (analysis_data) => {
  return v
    .each(analysis_data.map((d) => d.toArray()))
      .open('div').append(d => markGroup(d.group)).close()
      .open('div').append(d => markLocation(d.location)).close()
    .close();
};

export default atari;
