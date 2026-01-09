import { test, expect } from '../tests/testRunner.js';
import { Gameboard } from '../core/gameboard.js';

// === PLACE SHIP ON BOARD ===
// Placing a length-3 ship horizontally.
test('Place a length-3 ship at coords 0,0 horizontally', () => {
  const gameboard = new Gameboard();
  gameboard.createGrid(10, 10);
  const ship = gameboard.addShip(3);
  gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');
  const shipCoords = gameboard.grid
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

// Placing a length-3 ship vertically.
test('Place a length-3 ship at coords 0,0 vertically', () => {
  const gameboard = new Gameboard();
  gameboard.createGrid(10, 10);
  const ship = gameboard.addShip(3);
  gameboard.placeShip(ship, { x: 0, y: 0 }, 'vertical');
  const shipCoords = gameboard.grid
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

// Placing a ship horizontally partially outside the board at the right edge throws an error.
test('Place horizontal length-3 ship out of bounds', () => {
  const gameboard = new Gameboard();
  gameboard.grid = gameboard.createGrid(10, 10);
  const ship = gameboard.addShip(3);
  expect(() =>
    gameboard.placeShip(grid, ship, { x: 0, y: 8 }, 'horizontal')
  ).toThrow();
});

// Placing a ship vertically partially outside the board at the right edge throws an error.
test('Place vertical length-3 ship out of bounds', () => {
  const gameboard = new Gameboard();
  gameboard.grid = gameboard.createGrid(10, 10);
  const ship = gameboard.addShip(3);
  expect(() =>
    gameboard.placeShip(grid, ship, { x: 8, y: 0 }, 'vertical')
  ).toThrow();
});

// When placement fails (throws), the board remains unchanged.
test('When ship placement fails, the game board remains unchanged', () => {
  const gameboard = new Gameboard();
  gameboard.createGrid(10, 10);
  const ship = gameboard.addShip(3);
  const action = () => gameboard.placeShip(ship, { x: 8, y: 0 }, 'vertical');
  expect(action).toThrow();
  expect(gameboard.grid.filter((cell) => cell.state === 'ship').length).toBe(0);
});

// Placing a ship overlapping another ship throws an error.
test('Place horizontal length-3 ship overlapping another ship', () => {
  const gameboard = new Gameboard();
  gameboard.createGrid(10, 10);
  const ship = gameboard.addShip(3);
  gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');
  expect(() =>
    gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal')
  ).toThrow();
});

// Placing non-overlapping horizontal and vertical ships mutate grid properly.
test('Place non-overlapping horizontal and vertical ships', () => {
  const gameboard = new Gameboard();
  gameboard.createGrid(10, 10);
  const ship = gameboard.addShip(3);
  const ship2 = gameboard.addShip(3);
  gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');
  gameboard.placeShip(ship, { x: 0, y: 3 }, 'vertical');
  const shipCells = gameboard.grid.filter((cell) => cell.state === 'ship');
  expect(shipCells.length).toBe(6);
});

// === ATTACK ===
// Attack on an empty cell changes cell state to "miss".
test('Attack on an empty cell is "miss"', () => {
  const gameboard = new Gameboard();
  gameboard.createGrid(10, 10);
  const ship = gameboard.addShip(3);
  gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');
  gameboard.receiveAttack({ x: 3, y: 3 });
  const cell = gameboard.grid.filter((cell) => cell.state === 'miss');
  expect(cell[0].state).toBe('miss');
});

// Attack on a non-empty cell changes cell state to "hit" and ship hits increment.
test('Attack on a ship cell is "hit"', () => {
  const gameboard = new Gameboard();
  gameboard.createGrid(10, 10);
  const ship = gameboard.addShip(3);
  gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');
  gameboard.receiveAttack({ x: 0, y: 2 });
  const cell = gameboard.grid.filter((cell) => cell.state === 'hit');
  expect(cell[0].state).toBe('hit');
  expect(ship.timesHit).toBe(1);
});

// Attack on an already attacked cell throws an error.
test('Attack on an attacked cell throws an error', () => {
  const gameboard = new Gameboard();
  gameboard.createGrid(10, 10);
  const ship = gameboard.addShip(3);
  gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');
  gameboard.receiveAttack({ x: 0, y: 1 });
  const attack = () => gameboard.receiveAttack(ship, { x: 0, y: 1 });
  expect(attack).toThrow();
});

// Attack outside the board throws an error and leaves the board unchanged.
test('Attack out of bounds throws an error', () => {
  const gameboard = new Gameboard();
  gameboard.createGrid(10, 10);
  const ship = gameboard.addShip(3);
  gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');
  const attack = () => gameboard.receiveAttack(ship, { x: 99, y: 99 });
  expect(attack).toThrow();
});

// Attack on all ship cells sunks the ship.
test('Ship is sunk after all cells are being hit', () => {
  const gameboard = new Gameboard();
  gameboard.createGrid(10, 10);
  const ship = gameboard.addShip(2);
  gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');
  gameboard.receiveAttack({ x: 0, y: 0 });
  gameboard.receiveAttack({ x: 0, y: 1 });
  expect(ship.isSunk()).toBe(true);
  expect(ship.timesHit).toBe(2);
});
