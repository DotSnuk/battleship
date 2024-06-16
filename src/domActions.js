const body = document.querySelector('body');

export function init() {
  const titleDiv = document.createElement('div');
  const header = document.createElement('h1');
  titleDiv.id = 'title';
  header.innerText = '.battleship';
  titleDiv.appendChild(header);
  body.appendChild(titleDiv);
  const content = document.createElement('div');
  content.id = 'content';
  body.appendChild(content);
}

function getContentDiv() {
  return document.getElementById('content');
}

function getPlayerBoard() {
  return document.querySelector('.board.player');
}

function getOpponentBoard() {
  return document.querySelector('.board.opponent');
}

function getPlayerWrapper(isCurrentPlayer) {
  if (isCurrentPlayer) {
    const query = document.querySelector('.info.player1');
    if (query === null) {
      const content = getContentDiv();
      const div = document.createElement('div');
      div.classList.add('info', 'player1');
      content.appendChild(div);
      return div;
    }
    return query;
  }
  return document.querySelector('.info.player2');
}

export function greeter() {
  const content = getContentDiv();
  const wrapper = document.createElement('div');
  for (let i = 0; i < 2; i += 1) {
    const div = document.createElement('div');
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.classList.add('name');
    input.placeholder = `Player ${i + 1}`;
    div.classList.add(`player${i + 1}`);
    div.appendChild(input);
    // make the slider later, stick with checkbox for now
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('computer');
    div.appendChild(checkbox);
    wrapper.appendChild(div);
  }
  wrapper.classList.add('wrapper');
  const begin = document.createElement('input');
  begin.setAttribute('type', 'button');
  begin.value = 'Begin';
  begin.id = 'begin';
  wrapper.appendChild(begin);
  content.appendChild(wrapper);
}

function setClassBoard(board, isCurrentPlayer) {
  if (isCurrentPlayer) {
    board.classList.add('board', 'player');
  } else {
    board.classList.add('board', 'opponent');
  }
}

function setGridProperty(div, length) {
  const elem = div;
  elem.style.display = 'grid';
  elem.style.setProperty('grid-template-rows', `repeat(${length}, 1fr)`);
  elem.style.setProperty('grid-template-columns', `repeat(${length}, 1fr)`);
}

function setAxis(div, col, row) {
  const element = div;
  if (col === 0) {
    element.innerText = String.fromCharCode(row + 64);
  } else {
    element.innerText = col;
  }
  element.classList.add('axis');
}

function setClassSquare(div, col, row) {
  if (col === 0 || row === 0) {
    setAxis(div, col, row);
  } else {
    const element = div;
    element.dataset.x = String.fromCharCode(row + 64);
    element.dataset.y = col;
    element.classList.add('node');
  }
}

function drawBoard(player, isCurrentPlayer) {
  const playerWrapper = getPlayerWrapper(isCurrentPlayer);
  const { length } = player.board.board;
  const playerBoard = document.createElement('div');
  setClassBoard(playerBoard, isCurrentPlayer);
  setGridProperty(playerBoard, length + 1);
  for (let col = 0; col < length + 1; col += 1) {
    for (let row = 0; row < length + 1; row += 1) {
      const square = document.createElement('div');
      if (col !== 0 || row !== 0) setClassSquare(square, col, row);
      playerBoard.appendChild(square);
    }
  }
  playerWrapper.appendChild(playerBoard);
}

function getNodesShipPlacement(board, node, dir, length) {
  return board.getNodes(dir, length, node.dataset.x, node.dataset.y);
}

function mouseoverEvent(board, node, dir, length) {
  const nodes = getNodesShipPlacement(board, node, dir, length);
  let classToAdd;
  if (board.spaceAvailable(dir, length, node.dataset.x, node.dataset.y)) {
    classToAdd = 'placement-good';
  } else {
    classToAdd = 'placement-bad';
  }
  nodes.forEach(nde => {
    const element = document.querySelector(
      `[data-x='${nde.x}'][data-y='${nde.y}']`,
    );
    element.classList.add(classToAdd);
  });
}

function mouseout(div) {
  const classlist = div.classList;
  const placementClass = Array.from(classlist).find(classname =>
    classname.startsWith('placement'),
  );
  const divs = document.querySelectorAll(`.${placementClass}`);
  divs.forEach(element => {
    element.classList.remove(placementClass);
  });
}

function shipButton(ship) {
  const button = document.createElement('input');
  button.setAttribute('type', 'button');
  button.classList.add('ship');
  button.value = `${ship.name}`;
  button.dataset.id = ship.id;
  return button;
}

export function showPlacement(player) {
  drawBoard(player, true);
  let previousBtnEvent = null;
  let previousEventMouseover = null;
  const content = getContentDiv();
  const placementDiv = document.createElement('div');
  const boardDiv = getPlayerBoard();
  const { board } = player;
  const ships = player.board.unplacedShips;

  function addPlacementEvent(dir, length) {
    const eventMouseout = event => {
      mouseout(event.target);
    };
    const eventMouseover = event => {
      if (event.target.className === 'node')
        mouseoverEvent(board, event.target, dir, length);
    };
    if (previousEventMouseover !== null) {
      boardDiv.removeEventListener('mouseover', previousEventMouseover);
    }
    previousEventMouseover = eventMouseover;
    boardDiv.addEventListener('mouseout', eventMouseout);
    boardDiv.addEventListener('mouseover', eventMouseover);
  }

  ships.forEach(ship => {
    const shipBtn = shipButton(ship);
    const eventFunction = () => {
      addPlacementEvent('horizontal', ship.length);
    };
    if (previousBtnEvent !== null)
      shipBtn.removeEventListener('click', previousBtnEvent);
    previousBtnEvent = eventFunction;
    shipBtn.addEventListener('click', eventFunction);
    placementDiv.appendChild(shipBtn);
  });
  content.appendChild(placementDiv);
}

export function playerWins(player) {
  const div = document.createElement('div');
  div.innerText = `${player.name} wins!`;
  body.appendChild(div);
  // re-play option
}

export function removeTimer() {
  const content = getContentDiv();
  const timer = document.getElementById('timer');
  content.removeChild(timer);
}

export function showTimer(time) {
  let timeLeft = time;
  const timerDiv = document.createElement('div');
  timerDiv.id = 'timer';
  getContentDiv().appendChild(timerDiv);
  setInterval(() => {
    timeLeft -= 1000;
    const seconds = Math.floor(timeLeft / 1000);
    timerDiv.innerText = `Changing player ${seconds}`;
  }, 1000);
}

export function clearContent() {
  const content = getContentDiv();
  const children = document.querySelectorAll('#content > div');
  children.forEach(child => content.removeChild(child));
}

export function clearBoard() {
  const boards = document.querySelectorAll('.board');
  boards.forEach(board => {
    const nodes = board.querySelectorAll('.node');
    nodes.forEach(node => {
      const div = node;
      div.setAttribute('class', 'node');
      // removes old classes from previous player
      div.innerText = '';
    });
  });
}

function renderShip(div, node) {
  const element = div;
  const { ship } = node;
  element.classList.add('ship');
  element.innerText = ship.name.slice(0, 2);
}

function setAttackClass(div, didHit) {
  if (didHit) {
    div.classList.add('hit');
  } else {
    div.classList.add('miss');
  }
}

export function renderAttack(x, y, didHit, isCurrentPlayer) {
  let queryString;
  if (isCurrentPlayer) {
    queryString = '.player > ';
  } else {
    queryString = '.opponent > ';
  }
  queryString += `[data-x="${x}"][data-y="${y}"]`;
  const div = document.querySelector(queryString);
  div.innerText = 'X';
  setAttackClass(div, didHit);
  div.classList.add('animateAttack');
  setTimeout(() => {
    div.classList.remove('animateAttack');
  }, 1000);
}

function fillBoard(player, isCurrentPlayer) {
  let board;
  if (isCurrentPlayer) {
    board = getPlayerBoard();
  } else {
    board = getOpponentBoard();
  }
  board.querySelectorAll('.node').forEach(elem => {
    const node = player.board.getNode(elem.dataset.x, elem.dataset.y);
    if (node.beenHit) {
      if (isCurrentPlayer && node.hasShip()) {
        renderShip(elem, node);
      } else {
        const div = elem;
        div.innerText = 'X';
      }
      setAttackClass(elem, node.hasShip());
    } else if (isCurrentPlayer && node.hasShip()) {
      renderShip(elem, node); //
    }
  });
}

function updateName(player, isCurrentPlayer) {
  const playerWrapper = getPlayerWrapper(isCurrentPlayer);
  playerWrapper.querySelector('.name').innerText = player.name;
}

export function updateBoard(...players) {
  clearBoard();
  for (let i = 0; i < players.length; i += 1) {
    if (i === 0) {
      updateName(players[i], true);
      fillBoard(players[i], true);
    } else {
      updateName(players[i], false);
      fillBoard(players[i], false);
    }
  }
}

function drawName(player, isCurrentPlayer) {
  const playerWrapper = getPlayerWrapper(isCurrentPlayer);
  const nameDiv = document.createElement('div');
  nameDiv.innerText = player.name;
  nameDiv.classList.add('name');
  playerWrapper.appendChild(nameDiv);
}

export function drawPlayers(...players) {
  const content = getContentDiv();
  for (let i = 0; i < arguments.length; i += 1) {
    const playerWrapper = document.createElement('div');
    playerWrapper.classList.add('info', `player${i + 1}`);
    content.appendChild(playerWrapper);
    if (i === 0) {
      drawName(players[i], true);
      drawBoard(players[i], true);
    } else {
      drawName(players[i], false);
      drawBoard(players[i], false);
    }
  }
}
