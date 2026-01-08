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

  // Add ship to gameboard cells
  for (let i = 0; i < ship.length; i++) {
    orientation === 'horizontal'
      ? grid.find((cell) => {
          if (cell.x === x && cell.y === y + i) cell.state = 'ship';
        })
      : grid.find((cell) => {
          if (cell.x === x + i && cell.y === y) cell.state = 'ship';
        });
  }
}

// Receive attack
function receiveAttack(coords) {
  // if coords are empty, register a miss
  // if coords are used by ship, register attack, add hits to ship, check if its sunk
  // remove event listener from coords
}

export { createGrid, placeShip };
