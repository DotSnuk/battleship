import * as dom from './domActions';
import Player from './Player';
import Computer from './Computer';
import './style.css';

const players = [];
let currentPlayer = 0;

dom.init();
dom.greeter();

function getOpponent() {
  return players[1 - currentPlayer];
}

function getPlayer() {
  return players[currentPlayer];
}

function computerAttack() {
  const newAttack = getPlayer().getAttack(getOpponent());
  setTimeout(() => {
    attack(newAttack[0], newAttack[1]);
  }, 3000);
}

function changePlayer() {
  dom.showTimer(5000);
  setTimeout(() => {
    currentPlayer = 1 - currentPlayer;
    getPlayer().hasAttacked = false;
    dom.updateBoard(getPlayer(), getOpponent());
    if (getPlayer() instanceof Computer) computerAttack();
    dom.removeTimer();
  }, 5000);
}

function checkWin() {
  if (getOpponent().board.allShipsSunk()) {
    dom.playerWins(getPlayer());
    return true;
  }
  return false;
}

function attack(x, y) {
  const opponent = getOpponent();
  const didAttackHit = opponent.board.receiveAttack(x, y);
  if (didAttackHit === null) return;
  getPlayer().hasAttacked = true;
  dom.renderAttack(x, y, didAttackHit, false);
  if (!checkWin()) {
    changePlayer();
  }
}

function addNodeListeners() {
  // can later be added to filter out attacks with class hit or miss
  const nodes = Array.from(document.querySelectorAll('.opponent > .node'));
  nodes.forEach(node =>
    node.addEventListener('click', () => {
      if (!getPlayer().hasAttacked && !(getPlayer() instanceof Computer)) {
        attack(node.dataset.x, node.dataset.y);
      }
    }),
  );
}

function startGame() {
  dom.drawPlayers(getPlayer(), getOpponent());
  dom.updateBoard(getPlayer(), getOpponent());
  addNodeListeners();
}

async function startPlacement() {
  await dom.showPlacement(players[0]);
  dom.clearContent();
  await dom.showPlacement(players[1]);
  dom.clearContent();
  startGame();
}

const begin = document.getElementById('begin');
begin.addEventListener('click', () => {
  for (let i = 0; i < 2; i += 1) {
    const playerNameInput = document.querySelector(`.player${i + 1} > .name`);
    let name;
    if (playerNameInput.value === '') {
      name = playerNameInput.getAttribute('placeholder');
    } else {
      name = playerNameInput.value;
    }
    const computerCheck = document.querySelector(`.player${i + 1} > .computer`);
    if (computerCheck.checked) {
      players.push(new Computer(name));
    } else {
      players.push(new Player(name));
    }
    // players[i].board.prePlaceShips();
  }
  dom.clearContent();
  startPlacement();
  // dom.showPlacement(players[0]);
  // dom.drawPlayers(getPlayer(), getOpponent());
  // addNodeListeners();
});
