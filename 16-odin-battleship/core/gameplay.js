import { Player } from './player.js';
import { Gameboard } from './gameboard.js';

// Global elements
const els = {
  playerGridEl: document.querySelector('[data-view="player-grid"]'),
  aiGridEl: document.querySelector('[data-view="computer-grid"]'),
  startButton: document.querySelector('[data-action="start-game"]'),
  resetButton: document.querySelector('[data-action="reset-game"]'),
  turnMessage: document.querySelector('[data-view="turn-indicator"]'),
  logMessage: document.querySelector('[data-view="log"]'),
  gridSize: { x: 10, y: 10 },
  gameOver: false,
  playerState: {
    profile: undefined,
  },
  aiState: {
    profile: undefined,
    remainingShots: [],
    ships: [],
  },
};

// Note to self - fix playerState and aiState objects

// Create player and board
function createPlayer() {
  const playerBoard = new Gameboard();
  const player = new Player(playerBoard);
  playerBoard.createGrid(els.gridSize.x, els.gridSize.y);
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
  const aiBoard = new Gameboard();
  const ai = new Player(aiBoard);
  aiBoard.createGrid(els.gridSize.x, els.gridSize.y);
  els.aiState.remainingShots = aiBoard.grid.map((cell) => {
    return { x: cell.x, y: cell.y };
  });

  const shipOne = aiBoard.addShip(2);
  const shipTwo = aiBoard.addShip(3);
  const shipThree = aiBoard.addShip(5);
  els.aiState.ships.push(shipOne, shipTwo, shipThree);

  aiBoard.placeShip(shipOne, { x: 0, y: 0 }, 'horizontal');
  aiBoard.placeShip(shipTwo, { x: 2, y: 0 }, 'horizontal');
  aiBoard.placeShip(shipThree, { x: 4, y: 0 }, 'horizontal');
  placeRandom(aiBoard);

  return ai;
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

// Handle player's clicks on computer's board
function handlePlayerTurn(e) {
  if (els.gameOver) return;
  const x = Number(e.target.dataset.x);
  const y = Number(e.target.dataset.y);

  const result = els.aiState.profile.board.receiveAttack({ x, y });

  if (result === 'hit') e.target.classList.add('hit');
  if (result === 'miss') e.target.classList.add('miss');

  showTurnLog(`Player: ${result.toUpperCase()}`);

  e.target.removeEventListener('click', handlePlayerTurn);

  if (els.aiState.profile.board.checkAllSunk()) {
    endGame('Player');
    return;
  }

  showTurnMessage("AI's turn! He is aiming at the player's board!");

  setTimeout(() => {
    handleComputerTurn();
  }, 1000);
}

// Handle computer's turn
function handleComputerTurn() {
  if (els.gameOver) return;
  // prevent duplicate hits
  const index = Math.floor(Math.random() * els.aiState.remainingShots.length);
  const { x, y } = els.aiState.remainingShots[index];
  els.aiState.remainingShots.splice(index, 1);

  const result = els.playerState.profile.board.receiveAttack({ x, y });

  for (const element of els.playerGridEl.children) {
    if (Number(element.dataset.x) === x && Number(element.dataset.y) === y) {
      if (result === 'hit') element.classList.add('hit');
      if (result === 'miss') element.classList.add('miss');
      showTurnLog(`AI: ${result.toUpperCase()}`);
      break;
    }
  }
  if (els.playerState.profile.board.checkAllSunk()) {
    endGame('AI');
    return;
  }

  showTurnMessage("Player's turn! Aim at enemy's board!");
}

// Bind event listeners
function bindEvents() {
  // Handle grid clicks
  els.aiGridEl.querySelectorAll('.board-cell').forEach((cell) => {
    cell.addEventListener('click', handlePlayerTurn);
  });
}

// Mark end of game
function endGame(winner) {
  els.gameOver = true;
  els.aiGridEl
    .querySelectorAll('.board-cell')
    .forEach((cell) => cell.removeEventListener('click', handlePlayerTurn));
  alert(`${winner} wins the game!`);
}

// Start of game
function startGame() {
  els.startButton.removeEventListener('click', startGame);
  els.gameOver = false;
  els.playerState.profile = createPlayer();
  els.aiState.profile = createComputer();
  drawBoard(els.playerState.profile, els.playerGridEl, { showShips: true });
  drawBoard(els.aiState.profile, els.aiGridEl, { showShips: true });
  bindEvents();
  showTurnMessage("Start the game by aiming at enemy's board!");
  showTurnLog('');
}

// Log whose turn it is
function showTurnMessage(message) {
  els.turnMessage.textContent = message;
}

// Log turn event
function showTurnLog(message) {
  els.logMessage.innerHTML = '';
  if (!message) return;
  const log = document.createElement('li');
  log.textContent = message;
  els.logMessage.appendChild(log);
}

// Random ship placement
function placeRandom(aiBoard) {
  // aiBoard.placeShip(shipOne, { x: 0, y: 0 }, 'horizontal');
  // aiBoard.placeShip(shipTwo, { x: 2, y: 0 }, 'horizontal');
  // aiBoard.placeShip(shipThree, { x: 4, y: 0 }, 'horizontal');
  console.log(aiBoard);

  const index = Math.floor(Math.random() * aiBoard.grid.length);
  // find cell and return coords

  // console.log(coords);
}

// Init
function init() {
  els.startButton.addEventListener('click', startGame);
  els.resetButton.addEventListener('click', startGame);
}

init();
