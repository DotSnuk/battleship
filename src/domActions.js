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

export function greeter() {
  const content = document.getElementById('content');
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
  const content = document.getElementById('content');
  const children = document.querySelectorAll('#content > div');
  children.forEach(child => content.removeChild(child));
}

function setGridProperty(div, length) {
  // change to setGridProperty
  const elem = div;
  elem.style.display = 'grid';
  elem.style.setProperty('grid-template-rows', `repeat(${length}, 1fr)`);
  elem.style.setProperty('grid-template-columns', `repeat(${length}, 1fr)`);
}

function addAxis(div, col, row) {
  const element = div;
  if (col === 0) {
    element.innerText = String.fromCharCode(row + 64);
  } else {
    element.innerText = col;
  }
  return element.classList.add('axis');
}

function addClassSquare(div, col, row) {
  if (col === 0 || row === 0) {
    return addAxis(div, col, row);
  }
  const element = div;
  element.dataset.x = String.fromCharCode(row + 64);
  element.dataset.y = col;
  return element.classList.add('node');
}

export function drawBoard(player, showShips) {
  const content = document.getElementById('content');
  const { length } = player.board.board;
  const { board } = player;
  const playerBoard = document.createElement('div');
  playerBoard.classList.add('board');
  content.appendChild(playerBoard);
  setGridProperty(playerBoard, length + 1);
  for (let col = 0; col < length + 1; col += 1) {
    for (let row = 0; row < length + 1; row += 1) {
      const square = document.createElement('div');
      if (col !== 0 || row !== 0) addClassSquare(square, col, row);
      if (square.classList.contains('node')) {
        const node = board.getNode(square.dataset.x, square.dataset.y);
        if (node.hasShip()) square.innerText = 'ship';
      }
      playerBoard.appendChild(square);
      // if one of col and row is 0, I need to get the appropriate
      // number or letter to show that on the axes.
      //  if col is 0, i need to get row, and vice versa
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
