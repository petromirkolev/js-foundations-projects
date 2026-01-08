// import { test, expect } from './testRunner.js';
import { Ship } from '../core/ship.js';
const ship = new Ship(3);

// New ship is now sunk
test('New ship is not sunk', () => {
  expect(ship.isSunk()).toBe(false);
});

// Ship is sunk after times hit > length
test('Ship is sunk after being hit multiple times', () => {
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

// Ship contains hit method
test('Ship contains hit method', () => {
  expect(ship.__proto__.hasOwnProperty('hit')).toBe(true);
});

// Ship is maximum 5 cells long
test('Ship is maximum 5 cells long', () => {
  const ship = new Ship(100);
  expect(ship.length).toBe(5);
});
