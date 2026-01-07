import { Ship } from '../core/ship.js';

const x = 10;
const y = 10;

// Create grid
function createBoard(x, y) {
  const grid = [];
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      grid.push({ x: i, y: j, state: 'empty', ship: null });
    }
  }
  return grid;
}

// Place ship
function placeShip(ship, start) {
  // if start is not empty or start + ship length is outside the row/col, throw error
  // else place ship and change board cells flag that they are occupied by ship X
}

// Receive attack
function receiveAttack(coords) {
  // if coords are empty, register a miss
  // if coords are used by ship, register attack, add hits to ship, check if its sunk
  // remove event listener from coords
}

createBoard(x, y);

export { createBoard };
