import { test, expect } from './testRunner.js';
import { createBoard } from '../core/gameboard.js';

const x = 10;
const y = 10;
const grid = createBoard(x, y);

// Total cell amount is 100
test('Grid has x * y cells', () => {
  expect(grid.length).toBe(100);
});

// There is a cell with x=0,y=0
test('Cell with x=0 and y=0 exists', () => {
  const hasCell = grid.find((cell) => cell.x === 0 && cell.y === 0);
  expect(hasCell).toEqual({ x: 0, y: 0, state: 'empty', ship: null });
});

// There is a cell with x=9,y=9
test('Cell with x=0 and y=0 exists', () => {
  const hasCell = grid.find((cell) => cell.x === 9 && cell.y === 9);
  expect(hasCell).toEqual({ x: 9, y: 9, state: 'empty', ship: null });
});

// All cells have state "empty" and ship null
test('Cell with x=0 and y=0 exists', () => {
  const hasCell = grid.find(
    (cell) => cell.state !== 'empty' && cell.ship !== null
  );
  expect(hasCell).toBe(undefined);
});
