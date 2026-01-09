// === Helpers ===
// Find cell in grid helper
function findCell(grid, x, y) {
  for (const cell of grid) {
    if (!cell) throw new Error('Cell not found');
    if (cell.x === x && cell.y === y) return cell;
  }
}

// Find ship helper
function findShip(ships, id) {
  return ships.find((ship) => ship.id === id);
}

export { findCell, findShip };
