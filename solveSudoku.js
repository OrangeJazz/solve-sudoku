"use strict";

const grid = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const solveSudoku = (grid) => {
  const gridSize = grid.length;
  const cellSize = gridSize ** 0.5;

  const findFreeIndex = (grid) => {
    for (let row = 0; row < gridSize; row++) {
      for (let column = 0; column < gridSize; column++) {
        if (grid[row][column] === 0) {
          return [row, column];
        }
      }
    }
    return null;
  };

  const validate = (grid, index, number) => {
    const [row, column] = index;
    const cellRow = Math.floor(row / cellSize) * cellSize;
    const cellColumn = Math.floor(column / cellSize) * cellSize;

    for (let i = 0; i < gridSize; i++) {
      if (grid[i][column] === number && i !== row) return false;
    }
    for (let i = 0; i < gridSize; i++) {
      if (grid[row][i] === number && i !== column) return false;
    }
    for (let i = cellRow; i < cellRow + cellSize; i++) {
      for (let j = cellColumn; j < cellColumn + cellSize; j++) {
        if (grid[i][j] === number && i !== row && j !== column) return false;
      }
    }
    return true;
  };

  const getAnswer = () => {
    const currentIndex = findFreeIndex(grid);
    if (!currentIndex) return true;

    for (let number = 1; number <= gridSize; number++) {
      const isValid = validate(grid, currentIndex, number);
      if (isValid) {
        const [x, y] = currentIndex;
        grid[x][y] = number;

        if (getAnswer()) return true;
        grid[x][y] = 0;
      }
    }
    return false;
  };

  getAnswer();
  return grid;
};

console.log(solveSudoku(grid));

/*
Ожидаемый результат:
[
[5, 3, 4, 6, 7, 8, 9, 1, 2],
[6, 7, 2, 1, 9, 5, 3, 4, 8],
[1, 9, 8, 3, 4, 2, 5, 6, 7],
[8, 5, 9, 7, 6, 1, 4, 2, 3],
[4, 2, 6, 8, 5, 3, 7, 9, 1],
[7, 1, 3, 9, 2, 4, 8, 5, 6],
[9, 6, 1, 5, 3, 7, 2, 8, 4],
[2, 8, 7, 4, 1, 9, 6, 3, 5],
[3, 4, 5, 2, 8, 6, 1, 7, 9]
]
*/
