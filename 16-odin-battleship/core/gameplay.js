import { Player } from './player.js';
import { Gameboard } from './gameboard.js';

// Global variables
const playerGridEl = document.querySelector('[data-view="player-grid"]');
const computerGridEl = document.querySelector('[data-view="computer-grid"]');
const startButton = document.querySelector('[data-action="start-game"]');
const resetButton = document.querySelector('[data-action="reset-game"]');
const gridSize = { x: 10, y: 10 };
const computerTurns = [];

// Create player and board
function createPlayer(name) {
  const playerBoard = new Gameboard();
  const player = new Player(name, playerBoard);
  playerBoard.createGrid(gridSize.x, gridSize.y);
  const shipOne = playerBoard.addShip(2);
  const shipTwo = playerBoard.addShip(3);
  const shipThree = playerBoard.addShip(5);
  playerBoard.placeShip(shipOne, { x: 0, y: 0 }, 'horizontal');
  playerBoard.placeShip(shipTwo, { x: 2, y: 0 }, 'horizontal');
  playerBoard.placeShip(shipThree, { x: 4, y: 0 }, 'horizontal');
  return player;
}

// Create computer and board
function createComputer() {
  const computerBoard = new Gameboard();
  const computer = new Player('Computer', computerBoard);
  computerBoard.createGrid(gridSize.x, gridSize.y);
  const shipOne = computerBoard.addShip(2);
  const shipTwo = computerBoard.addShip(3);
  const shipThree = computerBoard.addShip(5);
  computerBoard.placeShip(shipOne, { x: 0, y: 0 }, 'horizontal');
  computerBoard.placeShip(shipTwo, { x: 2, y: 0 }, 'horizontal');
  computerBoard.placeShip(shipThree, { x: 4, y: 0 }, 'horizontal');
  return computer;
}

// Draw board on DOM
function drawBoard(player, containerEl, { showShips } = { showShips: true }) {
  containerEl.innerHTML = '';

  for (const cell of player.board.grid) {
    const oneCell = document.createElement('div');
    oneCell.dataset.x = cell.x;
    oneCell.dataset.y = cell.y;
    oneCell.classList.add('board-cell');

    if (showShips && cell.state === 'ship') {
      oneCell.classList.add('ship');
    }

    if (cell.state === 'hit') oneCell.classList.add('hit');
    if (cell.state === 'miss') oneCell.classList.add('miss');

    containerEl.appendChild(oneCell);
  }
}

// Bind event listeners
function bindEvents() {
  // Handle grid clicks
  computerGridEl.querySelectorAll('.board-cell').forEach((cell) => {
    cell.addEventListener('click', handlePlayerTurn);
  });
}

// Handle player's clicks on computer's board
function handlePlayerTurn(e) {
  const x = Number(e.target.dataset.x);
  const y = Number(e.target.dataset.y);

  const result = computer.board.receiveAttack({ x, y });

  if (result === 'hit') e.target.classList.add('hit');
  if (result === 'miss') e.target.classList.add('miss');

  e.target.removeEventListener('click', handlePlayerTurn);

  handleComputerTurn();
  if (computer.board.checkAllSunk()) endGame();
}

// Handle computer's turn
function handleComputerTurn() {
  // prevent duplicate hits
  // fill array with all computer picks
  // each turn loop over math random array lenght
  // remove pick before next pick

  const result = player.board.receiveAttack({ x, y });
  const domCell = document.querySelector('[data-view="player-grid"]');

  for (const element of domCell.children) {
    if (Number(element.dataset.x) === x && Number(element.dataset.y) === y) {
      console.log(element);

      if (result === 'hit') element.classList.add('hit');
      if (result === 'miss') element.classList.add('miss');
      break;
    }
  }

  if (player.board.checkAllSunk()) endGame();
}

// Mark end of game
function endGame() {
  alert('Player wins!');
}

// Start of game
function startGame() {
  console.log('game started');
  drawBoard(player, playerGridEl, { showShips: true });
  drawBoard(computer, computerGridEl, { showShips: false });
  bindEvents();
}

const player = createPlayer('Petromir');
const computer = createComputer('Computer');

function init() {
  startButton.addEventListener('click', startGame);
  resetButton.addEventListener('click', startGame);
}

init();
