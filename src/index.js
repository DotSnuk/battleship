import * as dom from './domActions';
import Player from './Player';
import './style.css';

const players = [];
const currentPlayer = 0;

dom.init();
dom.greeter();

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
  dom.drawBoards(players[currentPlayer], players[1 - currentPlayer]);
});
