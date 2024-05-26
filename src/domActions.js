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
      div.innerText = '';
    });
  });
}

function renderShip(div, node) {
  const element = div;
  const { ship } = node;
  element.innerText = ship.name.slice(0, 2);
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

function setClassBoard(board, isCurrentPlayer) {
  if (isCurrentPlayer) {
    board.classList.add('board', 'player');
  } else {
    board.classList.add('board', 'opponent');
  }
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
}

function fillBoard(player, isCurrentPlayer) {
  let board;
  if (isCurrentPlayer) {
    board = getPlayerBoard();
  } else {
    board = getOpponentBoard();
  }
  board.querySelectorAll('.node').forEach(div => {
    const node = player.board.getNode(div.dataset.x, div.dataset.y);
    if (node.beenHit) {
      const elem = div;
      elem.innerText = 'X';
      setAttackClass(elem, node.hasShip());
    } else if (isCurrentPlayer && node.hasShip()) {
      renderShip(div, node);
    }
  });
}

export function updateBoard(...players) {
  clearBoard();
  for (let i = 0; i < players.length; i += 1) {
    if (i === 0) {
      fillBoard(players[i], true);
    } else {
      fillBoard(players[i], false);
    }
  }
}

function drawBoard(player, isCurrentPlayer) {
  const content = getContentDiv();
  const { length } = player.board.board;
  const { board } = player;
  const playerBoard = document.createElement('div');
  setClassBoard(playerBoard, isCurrentPlayer);
  setGridProperty(playerBoard, length + 1);
  content.appendChild(playerBoard);
  for (let col = 0; col < length + 1; col += 1) {
    for (let row = 0; row < length + 1; row += 1) {
      const square = document.createElement('div');
      if (col !== 0 || row !== 0) setClassSquare(square, col, row);
      if (square.classList.contains('node')) {
        const node = board.getNode(square.dataset.x, square.dataset.y);
        if (node.beenHit) {
          renderAttack(
            square.dataset.x,
            square.dataset.y,
            node.hasShip(),
            isCurrentPlayer,
          );
        } else if (node.hasShip() && isCurrentPlayer) {
          renderShip(square, node);
        }
      }
      playerBoard.appendChild(square);
    }
  }
  content.appendChild(playerBoard);
}

export function drawBoards(...players) {
  for (let i = 0; i < arguments.length; i += 1) {
    if (i === 0) {
      drawBoard(players[i], true);
    } else {
      drawBoard(players[i], false);
    }
  }
}
