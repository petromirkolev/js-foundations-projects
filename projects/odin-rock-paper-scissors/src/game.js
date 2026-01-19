// Global variables
const game = {
  weapons: ['rock', 'paper', 'scissors'],
  rounds: 0,
  result: { player: 0, computer: 0 },
};

// Get AI choice
function aiChoice() {
  const choice = Math.floor(Math.random() * game.weapons.length);
  return game.weapons[choice];
}

// Get player choice
function playerChoice() {
  const input = prompt('Pick your weapon! (rock/paper/scissors)');

  if (input === null) {
    alert('Cancelled.');
    return null;
  }

  const weapon = input.trim().toLowerCase();

  if (game.weapons.includes(weapon)) {
    return weapon;
  }

  alert('Invalid weapon. Try again.');
  return playerChoice();
}

// Play one round
function oneRound() {
  const player = playerChoice();
  const computer = aiChoice();

  if (player === null) return 'cancel';
  if (player === computer) return 'tie';

  const playerWins =
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper');

  return playerWins ? 'player' : 'computer';
}

// Check game winner
function checkWinner() {
  if (game.result.player > game.result.computer) console.log('Player wins');
  else if (game.result.player < game.result.computer)
    console.log('Computer wins');
  else console.log("It's a draw");
}

// Play one game
function playGame() {
  while (game.rounds < 3) {
    const winner = oneRound();

    if (winner === 'cancel') {
      console.log('Game cancelled.');
      return;
    }

    if (winner === 'tie') {
      alert("It's a tie!");
      continue;
    }

    game.rounds++;
    if (winner === 'player') game.result.player++;
    else game.result.computer++;

    console.log(`Round ${game.rounds}: ${winner} wins!`);
  }

  // Check for a winner
  checkWinner();
}

// Init
playGame();
