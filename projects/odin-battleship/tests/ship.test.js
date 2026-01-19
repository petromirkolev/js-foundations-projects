// import { test, expect } from './testRunner.js';
import { Ship } from '../core/ship.js';
let ship;

describe('Ship creation test suite', () => {
  beforeEach(() => {
    ship = new Ship(3);
  });

  test('New ship is not sunk', () => {
    expect(ship.isSunk()).toBe(false);
  });

  test('Ship is sunk after being hit multiple times', () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test('Ship contains hit method', () => {
    expect(ship.__proto__.hasOwnProperty('hit')).toBe(true);
  });

  test('Ship is maximum 5 cells long', () => {
    const ship = new Ship(100);
    expect(ship.length).toBe(5);
  });
});
