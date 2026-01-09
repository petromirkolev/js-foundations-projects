import { findCell, findShip } from '../core/gameplay.js';
import { Ship } from './ship.js';

class Gameboard {
  constructor() {
    this.ships = [];
    this.grid = [];
  }
  createGrid(x, y) {
    this.grid = [];
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        this.grid.push({ x: i, y: j, state: 'empty', ship: null }); // empty / ship / hit / miss
      }
    }
  }
  addShip(size) {
    const ship = new Ship(size);
    ship.id = this.ships.length + 1;
    this.ships.push(ship);
    return ship;
  }
  placeShip(ship, coords, orientation) {
    const { x, y } = { ...coords };
    const gridSize = Math.sqrt(this.grid.length);

    // Guard against placing a ship out of bound
    if (orientation === 'horizontal' && y + ship.length > gridSize) {
      throw new Error('Cannot place ship out of bounds!');
    }

    if (orientation === 'vertical' && x + ship.length > gridSize) {
      throw new Error('Cannot place ship out of bounds!');
    }

    // Guard against placing one ship over another ship
    let hasShip = false;

    for (let i = 0; i < ship.length; i++) {
      const targetX = orientation === 'horizontal' ? x : x + i;
      const targetY = orientation === 'horizontal' ? y + i : y;

      const overlapping = this.grid.some(
        (cell) =>
          cell.x === targetX && cell.y === targetY && cell.state === 'ship'
      );

      if (overlapping) {
        hasShip = true;
        break;
      }
    }
    if (hasShip) throw new Error('A ship is placed in this cell already!');

    // Add ship to gameboard cells
    for (let i = 0; i < ship.length; i++) {
      if (orientation === 'horizontal') {
        const cell = findCell(this.grid, x, y + i);
        cell.state = 'ship';
        cell.ship = ship.id;
      } else {
        const cell = findCell(this.grid, x + i, y);
        cell.state = 'ship';
        cell.ship = ship.id;
      }
    }
  }
  receiveAttack(coords) {
    const { x, y } = { ...coords };
    const cell = findCell(this.grid, x, y);

    if (!cell || cell.state === 'hit' || cell.state === 'miss')
      throw new Error('Invalid cell!');

    // if coords are empty, register a miss
    if (cell.state === 'empty') cell.state = 'miss';

    // if coords are used by ship, register attack, add hits to ship, check if its sunk
    if (cell.state === 'ship') {
      const ship = findShip(this.ships, cell.ship);
      if (!ship) throw new Error('Ship not found for this cell');
      cell.state = 'hit';
      ship.timesHit++;
      ship.isSunk();
    }
  }
}

export { Gameboard };
