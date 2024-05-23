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

function setClassBoard(board, showShips) {
  if (showShips) {
    board.classList.add('board', 'player');
  } else {
    board.classList.add('board', 'opponent');
  }
}

function drawBoard(player, showShips) {
  const content = getContentDiv();
  const { length } = player.board.board;
  const { board } = player;
  const playerBoard = document.createElement('div');
  setClassBoard(playerBoard, showShips);
  setGridProperty(playerBoard, length + 1);
  content.appendChild(playerBoard);
  for (let col = 0; col < length + 1; col += 1) {
    for (let row = 0; row < length + 1; row += 1) {
      const square = document.createElement('div');
      if (col !== 0 || row !== 0) setClassSquare(square, col, row);
      if (square.classList.contains('node')) {
        const node = board.getNode(square.dataset.x, square.dataset.y);
        if (node.hasShip() && showShips) square.innerText = 'ship';
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

function setAttackClass(div, didHit) {
  if (didHit) {
    div.classList.add('hit');
  } else {
    div.classList.add('miss');
  }
}

export function renderAttack(x, y, didHit) {
  // const opponentDiv = document.querySelector('.board.opponent');
  const node = document.querySelector(
    `.opponent > [data-x="${x}"][data-y="${y}"]`,
  );
  node.innerText = 'X';
  setAttackClass(node, didHit);
}
