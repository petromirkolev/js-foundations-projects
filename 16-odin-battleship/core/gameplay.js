// y is horizontal
// x is vertical

// Create grid
function createGrid(x, y) {
  const grid = [];
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      grid.push({ x: i, y: j, state: 'empty', ship: null }); // empty / ship / hit / miss
    }
  }

  return grid;
}

// Place ship on gameboard
function placeShip(grid, ship, coords, orientation) {
  const { x, y } = { ...coords };
  const gridSize = Math.sqrt(grid.length);

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

    const overlapping = grid.some(
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
      const cell = getCell(grid, x, y + i);
      cell.state = 'ship';
    } else {
      const cell = getCell(grid, x + i, y);
      cell.state = 'ship';
    }
  }
}

// Find in grid helper
function getCell(grid, x, y) {
  for (const cell of grid) {
    if (cell.x === x && cell.y === y) return cell;
  }
}

// Receive attack
function receiveAttack(coords) {
  // if coords are empty, register a miss
  // if coords are used by ship, register attack, add hits to ship, check if its sunk
  // remove event listener from coords
}

export { createGrid, placeShip, receiveAttack };
