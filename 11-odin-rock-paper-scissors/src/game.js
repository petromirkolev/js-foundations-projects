const weapons = ['rock', 'paper', 'scissors'];

let rounds = 0;
let result = { player: 0, computer: 0 };

function computerChoice() {
  const idx = Math.floor(Math.random() * weapons.length);
  return weapons[idx];
}

function playerChoice() {
  const input = prompt('Pick your weapon! (rock/paper/scissors)');

  if (input === null) {
    alert('Cancelled.');
    return null;
  }

  const weapon = input.trim().toLowerCase();

  if (weapons.includes(weapon)) {
    return weapon;
  }

  alert('Invalid weapon. Try again.');
  return playerChoice();
}

function oneRound() {
  const player = playerChoice();
  if (player === null) return 'cancel';

  const computer = computerChoice();

  if (player === computer) return 'tie';

  const playerWins =
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper');

  return playerWins ? 'player' : 'computer';
}

function checkWinner() {
  if (result.player > result.computer) console.log('Player wins');
  else if (result.player < result.computer) console.log('Computer wins');
  else console.log("It's a draw");
}

function playGame() {
  while (rounds < 3) {
    const winner = oneRound();

    if (winner === 'cancel') {
      console.log('Game cancelled.');
      return;
    }

    if (winner === 'tie') {
      alert("It's a tie!");
      continue;
    }

    rounds++;
    if (winner === 'player') result.player++;
    else result.computer++;

    console.log(`Round ${rounds}: ${winner} wins!`);
  }

  checkWinner();
}

playGame();
