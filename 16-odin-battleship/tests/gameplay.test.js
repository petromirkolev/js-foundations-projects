import { placeShip } from '../core/gameplay.js';
import { createBoard } from '../core/gameboard.js';
const x = 10;
const y = 10;
const grid = createBoard(x, y);

// Placing a length-3 ship properly
test('Place a length-3 ship at coords 0,0 horizontally', () => {
  const shipCells = grid.slice(0, 3);
  const hasShip = shipCells.filter((cell) => cell.ship === null);

  expect(placeShip()).toEqual([]);
});

// cells at (0,0), (1,0), (2,0) have state "ship" and ship id

// Placing a ship partially outside the board at the right edge throws

// Placing a ship overlapping another ship throws
