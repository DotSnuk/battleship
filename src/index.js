import * as dom from './domActions';
import Player from './Player';
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

function changePlayer() {
  // timeout
  setTimeout(() => {
    currentPlayer = 1 - currentPlayer;
    dom.clearContent();
    dom.drawBoards(getPlayer(), getOpponent());
  }, 5000);
}

function attack(x, y) {
  const opponent = getOpponent();
  dom.renderAttack(x, y, opponent.board.receiveAttack(x, y));
  changePlayer();
}

function addNodeListeners() {
  // can later be added to filter out attacks with class hit or miss
  const nodes = Array.from(document.querySelectorAll('.opponent > .node'));
  nodes.forEach(node =>
    node.addEventListener('click', () => {
      attack(node.dataset.x, node.dataset.y);
    }),
  );
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
    const player = new Player(false, name);
    player.board.prePlaceShips();
    players.push(player);
  }
  dom.clearContent();
  dom.drawBoards(getPlayer(), getOpponent());
  addNodeListeners();
});
