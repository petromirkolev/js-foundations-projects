import { createGrid } from './gameplay.js';

// Create board
function createBoard() {
  const grid = createGrid(10, 10);
  const board = document.querySelector('[data-view="player-grid"]');
  grid.forEach((cell) => {
    const celly = document.createElement('div');
    celly.classList.add('board-cell');
    celly.dataset.x = cell.x;
    celly.dataset.y = cell.y;
    board.appendChild(celly);
  });
}
createBoard();
