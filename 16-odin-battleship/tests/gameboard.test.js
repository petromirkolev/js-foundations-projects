// import { test, expect } from './testRunner.js';
import { Gameboard } from '../core/gameboard.js';
let playerBoard;

describe('Gameboard test suite', () => {
  beforeEach(() => {
    playerBoard = new Gameboard();
    playerBoard.createGrid(10, 10);
  });

  test('Grid has x * y cells', () => {
    expect(playerBoard.grid.length).toBe(100);
  });

  test('Cell with x=0 and y=0 exists', () => {
    const hasCell = playerBoard.grid.find(
      (cell) => cell.x === 0 && cell.y === 0
    );

    expect(hasCell).toEqual({ x: 0, y: 0, state: 'empty', ship: null });
  });

  test('Cell with x=9 and y=9 exists', () => {
    const hasCell = playerBoard.grid.find(
      (cell) => cell.x === 9 && cell.y === 9
    );

    expect(hasCell).toEqual({ x: 9, y: 9, state: 'empty', ship: null });
  });

  test('All cells have "empty" state and no ship id', () => {
    const hasCell = playerBoard.grid.find(
      (cell) => cell.state !== 'empty' && cell.ship !== null
    );

    expect(hasCell).toBe(undefined);
  });
});
