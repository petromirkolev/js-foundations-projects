import { test, expect } from './testRunner.js';
import { Ship } from '../core/ship.js';

test('New ship is not sunk', () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
