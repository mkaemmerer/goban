export const isAtari = (board, group) => {
  return group.liberties(board).length === 1;
};

export const getAtari = (board, group) => {
  return {
    group:    group,
    location: group.liberties(board).toArray()[0]
  };
};

export const allAtaris = (board) => {
  return board
    .groups()
    .filter(g => isAtari(board,g))
    .map(g => getAtari(board,g));
};
