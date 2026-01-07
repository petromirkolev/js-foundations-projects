import { test, expect } from './testRunner.js';
import { createBoard } from '../core/gameboard.js';

test('Grid has x * y cells', () => {
  const x = 10;
  const y = 10;
  const grid = createBoard(x, y);
  expect(grid.length).toBe(100);
});

test('Final dashboard coordinates match y', () => {});
