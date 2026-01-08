// import { test, expect } from './testRunner.js';
import { createBoard } from '../core/gameboard.js';

test('Grid has x * y cells', () => {
  const x = 10;
  const y = 10;
  const grid = createBoard(x, y);
  expect(grid.length).toBe(100);
});

// test('Final dashboard coordinates match y', () => {});

// total cell count is 100

// there is a cell with x=0,y=0 and one with x=9,y=9

// all cells have state "empty" and ship null
