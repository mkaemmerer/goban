const atari = (board) => {
  const groups = board
    .groups()
    .filter(g => g.liberties(board).length === 1);

  const locations = groups
    .flatMap(g => g.liberties(board));

  return {
    groups:    groups,
    locations: locations
  };
};

export default atari;
