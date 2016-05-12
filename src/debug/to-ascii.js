export default const toAscii (board) => board
  .intersections
  .map(i => {
    const stone = (i.contents === null)
      ? '.'
      : (i.contents.color === 'black')
        ? 'O'
        : '@';
    const newline = (i.location.y === 8) ? '\n' : '';
    return stone + newline;
  })
  .join('')
);
