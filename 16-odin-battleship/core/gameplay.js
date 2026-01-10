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
  randomize: document.querySelector('[data-action="randomize-fleet"]'),
  gridSize: { x: 10, y: 10 },
  gameOver: false,
  player: {
    profile: undefined,
  },
  ai: {
    profile: undefined,
    remainingShots: [],
  },
};

// Create player and board
function createPlayer() {
  const playerBoard = new Gameboard();
  const player = new Player(playerBoard);
  playerBoard.createGrid(els.gridSize.x, els.gridSize.y);
  playerBoard.addShip(2);
  playerBoard.addShip(3);
  playerBoard.addShip(5);
  playerBoard.ships.forEach((ship) => placeRandom(playerBoard, ship));
  return player;
}

// Create computer and board
function createComputer() {
  const aiBoard = new Gameboard();
  const ai = new Player(aiBoard);
  aiBoard.createGrid(els.gridSize.x, els.gridSize.y);
  els.ai.remainingShots = aiBoard.grid.map((cell) => {
    return { x: cell.x, y: cell.y };
  });
  aiBoard.addShip(2);
  aiBoard.addShip(3);
  aiBoard.addShip(5);
  aiBoard.ships.forEach((ship) => placeRandom(aiBoard, ship));

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

  const result = els.ai.profile.board.receiveAttack({ x, y });

  if (result === 'hit') e.target.classList.add('hit');
  if (result === 'miss') e.target.classList.add('miss');

  showTurnLog(`Player: ${result.toUpperCase()}`);

  e.target.removeEventListener('click', handlePlayerTurn);

  if (els.ai.profile.board.checkAllSunk()) {
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
  const index = Math.floor(Math.random() * els.ai.remainingShots.length);
  const { x, y } = els.ai.remainingShots[index];
  els.ai.remainingShots.splice(index, 1);

  const result = els.player.profile.board.receiveAttack({ x, y });

  for (const element of els.playerGridEl.children) {
    if (Number(element.dataset.x) === x && Number(element.dataset.y) === y) {
      if (result === 'hit') element.classList.add('hit');
      if (result === 'miss') element.classList.add('miss');
      showTurnLog(`AI: ${result.toUpperCase()}`);
      break;
    }
  }
  if (els.player.profile.board.checkAllSunk()) {
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
  els.randomize.addEventListener('click', randomizeFleet);
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
  els.player.profile = createPlayer();
  els.ai.profile = createComputer();
  drawBoard(els.player.profile, els.playerGridEl, { showShips: true });
  drawBoard(els.ai.profile, els.aiGridEl, { showShips: false });
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
function placeRandom(board, ship) {
  let tries = 0;
  let shipPlaced = false;
  const gridSide = Math.sqrt(board.grid.length);
  const orientation = ['horizontal', 'vertical'];

  while (tries < 100 && !shipPlaced) {
    try {
      const x = Math.floor(Math.random() * gridSide);
      const y = Math.floor(Math.random() * gridSide);
      const index = Math.floor(Math.random() * 2);
      board.placeShip(ship, { x, y }, orientation[index]);
      shipPlaced = true;
    } catch (error) {
      continue;
    } finally {
      tries++;
    }
  }
}

// Randomize player's fleet
function randomizeFleet() {
  const board = els.player.profile.board;

  board.grid.forEach((cell) => {
    cell.state = 'empty';
    cell.ship = null;
  });

  board.ships.forEach((ship) => {
    ship.timesHit = 0;
  });

  els.player.profile.board.ships.forEach((ship) => {
    placeRandom(els.player.profile.board, ship);
  });
  drawBoard(els.player.profile, els.playerGridEl, { showShips: true });
}

// Init
function init() {
  els.startButton.addEventListener('click', startGame);
  els.resetButton.addEventListener('click', startGame);
}

init();
