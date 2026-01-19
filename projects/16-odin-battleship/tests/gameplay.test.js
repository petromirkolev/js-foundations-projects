// import { test, expect } from '../tests/testRunner.js';
import { Gameboard } from '../core/gameboard.js';

let gameboard;
let ship;

describe('Ship placement test suite', () => {
  beforeEach(() => {
    gameboard = new Gameboard();
    gameboard.createGrid(10, 10);
    ship = gameboard.addShip(3);
  });

  test('Placing length-3 ship at coords 0,0 horizontally', () => {
    gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');

    const shipCoords = gameboard.grid
      .filter((cell) => cell.state === 'ship')
      .map((cell) => ({ x: cell.x, y: cell.y }));

    const testCoords = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ];

    expect(shipCoords).toEqual(testCoords);
  });

  test('Placing length-3 ship at coords 0,0 vertically', () => {
    gameboard.placeShip(ship, { x: 0, y: 0 }, 'vertical');

    const shipCoords = gameboard.grid
      .filter((cell) => cell.state === 'ship')
      .map((cell) => ({ x: cell.x, y: cell.y }));

    const testCoords = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ];

    expect(shipCoords).toEqual(testCoords);
  });

  test('Placing horizontal length-3 ship out of bounds', () => {
    expect(() =>
      gameboard.placeShip(ship, { x: 0, y: 8 }, 'horizontal')
    ).toThrow();
  });

  test('Placing vertical length-3 ship out of bounds', () => {
    expect(() =>
      gameboard.placeShip(ship, { x: 8, y: 0 }, 'vertical')
    ).toThrow();
  });

  test('When ship placement fails, the game board remains unchanged', () => {
    const action = () => gameboard.placeShip(ship, { x: 8, y: 0 }, 'vertical');

    expect(action).toThrow();
    expect(gameboard.grid.filter((cell) => cell.state === 'ship').length).toBe(
      0
    );
  });

  test('Placing horizontal length-3 ship overlapping another ship', () => {
    gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');

    expect(() =>
      gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal')
    ).toThrow();
  });

  test('Placing non-overlapping horizontal and vertical ships', () => {
    const ship2 = gameboard.addShip(3);

    gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');
    gameboard.placeShip(ship2, { x: 0, y: 3 }, 'vertical');

    const shipCells = gameboard.grid.filter((cell) => cell.state === 'ship');
    expect(shipCells.length).toBe(6);
  });
});

describe('Ship attack test suite', () => {
  beforeEach(() => {
    gameboard = new Gameboard();
    gameboard.createGrid(10, 10);
    ship = gameboard.addShip(3);
  });

  test('Attack on an empty cell changes state to "miss"', () => {
    gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');

    gameboard.receiveAttack({ x: 3, y: 3 });

    const cell = gameboard.grid.find((cell) => cell.state === 'miss');
    expect(cell.state).toBe('miss');
  });

  test('Attack on a non-empty cell changes state to "hit" and ship hits increment', () => {
    gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');

    gameboard.receiveAttack({ x: 0, y: 2 });

    const cell = gameboard.grid.find((cell) => cell.state === 'hit');
    expect(cell.state).toBe('hit');
    expect(ship.timesHit).toBe(1);
  });

  test('Attack on an already attacked cell throws an error', () => {
    gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');

    gameboard.receiveAttack({ x: 0, y: 1 });

    const attack = () => gameboard.receiveAttack({ x: 0, y: 1 });

    expect(attack).toThrow();
  });

  test('Attack out of bounds throws an error', () => {
    gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');

    const attack = () => gameboard.receiveAttack({ x: 99, y: 99 });

    expect(attack).toThrow();
  });

  test('Ship is sunk after all ship cells are hit', () => {
    gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');

    gameboard.receiveAttack({ x: 0, y: 0 });
    gameboard.receiveAttack({ x: 0, y: 1 });
    gameboard.receiveAttack({ x: 0, y: 2 });

    expect(ship.isSunk()).toBe(true);
    expect(ship.timesHit).toBe(3);
  });

  test('All ships are sunk after successful attacks', () => {
    const shipTwo = gameboard.addShip(3);

    gameboard.placeShip(ship, { x: 0, y: 0 }, 'horizontal');
    gameboard.placeShip(shipTwo, { x: 1, y: 0 }, 'horizontal');

    gameboard.receiveAttack({ x: 0, y: 0 });
    gameboard.receiveAttack({ x: 0, y: 1 });
    gameboard.receiveAttack({ x: 0, y: 2 });

    gameboard.receiveAttack({ x: 1, y: 0 });
    gameboard.receiveAttack({ x: 1, y: 1 });
    gameboard.receiveAttack({ x: 1, y: 2 });

    expect(gameboard.checkAllSunk()).toBe(true);
  });
});
