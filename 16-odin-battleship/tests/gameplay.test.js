import { test, expect } from '../tests/testRunner.js';
import { placeShip, createGrid } from '../core/gameplay.js';
import { Ship } from '../core/ship.js';

// Placing a length-3 ship horizontally
test('Place a length-3 ship at coords 0,0 horizontally', () => {
  const grid = createGrid(10, 10);
  const ship = new Ship(3);
  placeShip(grid, ship, { x: 0, y: 0 }, 'horizontal');
  const shipCoords = grid
    .filter((cell) => cell.state === 'ship')
    .map((cell) => {
      return { x: cell.x, y: cell.y };
    });
  const testCoords = [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
  ];
  expect(shipCoords).toEqual(testCoords);
});

// Placing a length-3 ship vertically
test('Place a length-3 ship at coords 0,0 vertically', () => {
  const grid = createGrid(10, 10);
  const ship = new Ship(3);
  placeShip(grid, ship, { x: 0, y: 0 }, 'vertical');
  const shipCoords = grid
    .filter((cell) => cell.state === 'ship')
    .map((cell) => {
      return { x: cell.x, y: cell.y };
    });
  const testCoords = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ];
  expect(shipCoords).toEqual(testCoords);
});

// Placing a ship horizontally partially outside the board at the right edge throws
test('Place horizontal length-3 ship out of bounds', () => {
  const grid = createGrid(10, 10);
  const ship = new Ship(3);
  expect(() => placeShip(grid, ship, { x: 0, y: 8 }, 'horizontal')).toThrow();
});

// Placing a ship vertically partially outside the board at the right edge throws
test('Place vertical length-3 ship out of bounds', () => {
  const grid = createGrid(10, 10);
  const ship = new Ship(3);
  expect(() => placeShip(grid, ship, { x: 8, y: 0 }, 'vertical')).toThrow();
});

// When placement fails (throws), the board remains unchanged.
test('When ship placement fails, the game board remains unchanged', () => {
  const grid = createGrid(10, 10);
  const ship = new Ship(3);
  const action = () => placeShip(grid, ship, { x: 8, y: 0 }, 'vertical');
  expect(action).toThrow();
  expect(grid.filter((cell) => cell.state === 'ship').length).toBe(0);
});

// x is vertical
// y is horizontal

// Placing a ship overlapping another ship throws
test('Place horizontal length-3 ship overlapping another ship', () => {
  const grid = createGrid(10, 10);
  const ship = new Ship(3);
  placeShip(grid, ship, { x: 0, y: 0 }, 'horizontal');
  expect(() => placeShip(grid, ship, { x: 0, y: 0 }, 'horizontal')).toThrow();
});

// Placing a ship overlapping another ship throws
test('Place horizontal length-3 ship overlapping another ship', () => {
  const grid = createGrid(10, 10);
  const ship = new Ship(3);
  const ship2 = new Ship(3);
  placeShip(grid, ship, { x: 0, y: 0 }, 'horizontal');
  expect(() => placeShip(grid, ship2, { x: 0, y: 3 }, 'vertical')).toThrow();
});

// cells at (0,0), (1,0), (2,0) have state "ship" and ship id
