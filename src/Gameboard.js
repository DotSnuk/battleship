import Node from './node';
import Ship from './Ship';

export default class Gameboard {
  constructor() {
    this.board = Gameboard.#createBoard();
    this.unplacedShips = this.createStarterShips();
    this.listActiveShips = [];
  }

  static intToCoords(arr) {
    return [String.fromCharCode(arr[0] + 65), arr[1] + 1];
  }

  static #createBoard() {
    const boardArray = [];
    for (let x = 0; x < 10; x += 1) {
      const col = [];
      for (let y = 0; y < 10; y += 1) {
        const position = Gameboard.intToCoords([x, y]);
        col.push(new Node(position[0], position[1]));
      }
      boardArray.push(col);
    }
    return boardArray;
  }

  createStarterShips() {
    const ships = [
      ['Carrier', 1, 5],
      ['Battleship', 2, 4],
      ['Cruiser', 3, 3],
      ['Submarine', 4, 3],
      ['Destroyer', 5, 2],
    ];
    const arrayShips = ships.map(ship => new Ship(ship[0], ship[1], ship[2]));
    return arrayShips;
  }

  getUnplacedShip(id) {
    const removeIndex = this.unplacedShips.map(ship => ship.id).indexOf(id);
    if (removeIndex === -1) return null;
    const ship = this.unplacedShips.splice(removeIndex, 1).pop();
    return ship;
  }

  static #getListShips() {
    const starterShips = [
      ['Carrier', 1, 5],
      ['Battleship', 2, 4],
      ['Cruiser', 3, 3],
      ['Submarine', 4, 3],
      ['Destroyer', 5, 2],
    ];
    return starterShips;
  }

  static #translateCoords(arr) {
    let x = arr[0].toUpperCase();
    x = x.charCodeAt(0) - 65;
    let y = arr[1];
    y -= 1;
    return [x, y];
  }

  #withinBounds(dir, length, startArray) {
    const boardLength = this.board.length;
    if (dir === 'vertical')
      return startArray[1] >= 0 && startArray[1] + length <= boardLength;
    return startArray[0] >= 0 && startArray[0] + length <= boardLength;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  intToLetter(int) {
    return String.fromCharCode(int + 64);
  }

  prePlaceShips() {
    this.placeShip(
      0,
      'horizontal',
      this.intToLetter(1 + this.getRandomInt(6)),
      1,
    );
    this.placeShip(0, 'vertical', 'B', 2 + this.getRandomInt(6));
    this.placeShip(
      0,
      'horizontal',
      this.intToLetter(3 + this.getRandomInt(6)),
      3,
    );
    this.placeShip(
      0,
      'horizontal',
      this.intToLetter(4 + this.getRandomInt(5)),
      4,
    );
    this.placeShip(0, 'vertical', 'f', 5 + this.getRandomInt(5));
  }

  // refactor to use getAttacks
  getMissedAttacks() {
    const missedAttacks = [];
    this.board.forEach((x, xIndx) => {
      x.forEach((y, yIndx) => {
        if (y.beenHit && !y.hasShip()) missedAttacks.push([xIndx, yIndx]);
      });
    });
    return missedAttacks;
  }

  getAttacks() {
    const attacks = [];
    this.board.forEach((x, xIndx) => {
      x.forEach((y, yIndx) => {
        if (y.beenHit) {
          const coords = Gameboard.intToCoords([xIndx, yIndx]);

          const hitShip = y.hasShip();
          attacks.push({ coords, hitShip });
        }
      });
    });
    return attacks;
  }

  allShipsSunk() {
    return this.listActiveShips.every(ship => ship.isSunk());
  }

  getNode(x, y) {
    const flatBoard = this.board.flat();
    const node = flatBoard.find(
      nde => nde.x === x.toUpperCase() && nde.y === parseInt(y, 10),
    );
    return node;
  }

  getNodes(dir, length, startX, startY) {
    const results = [];
    let node;
    for (let i = 0; i < length; i++) {
      if (dir === 'horizontal') {
        node = this.getNode(
          String.fromCharCode(startX.charCodeAt(0) + i),
          parseInt(startY, 10),
        );
      } else {
        node = this.getNode(startX, parseInt(startY, 10) + i);
      }
      if (node !== undefined) results.push(node);
    }
    return results;
  }

  // getNodes(dir, length, startX, startY) {
  //   const coords = Gameboard.#translateCoords([startX, startY]);
  //   if (dir === 'vertical')
  //     return this.board[coords[0]].slice(coords[1], coords[1] + length);
  //   const verticalArr = this.board.slice(coords[0], coords[0] + length);
  //   const indxFromVertical = verticalArr.map(subArray => subArray[coords[1]]);
  //   return indxFromVertical;
  // }

  spaceAvailable(dir, length, startX, startY) {
    const coords = Gameboard.#translateCoords([startX, startY]);
    const nodes = this.getNodes(dir, length, startX, startY);
    return (
      this.#withinBounds(dir, length, coords) &&
      nodes.every(node => node.ship === null)
    );
  }

  placeShip(id, dir, startX, startY) {
    const ship = this.getUnplacedShip(id);
    if (ship === null) return false;
    const { length } = ship;
    if (!this.spaceAvailable(dir, length, startX, startY)) {
      this.unplacedShips.push(ship);
      return false;
    }
    const nodes = this.getNodes(dir, length, startX, startY);
    this.listActiveShips.push(ship);
    nodes.forEach(node => {
      const nod = node;
      nod.ship = ship;
    });
    return true;
  }

  receiveAttack(x, y) {
    const coords = Gameboard.#translateCoords([x, y]);
    const node = this.board[coords[0]][coords[1]];
    if (node.beenHit) return null;
    node.beenHit = true;
    if (node.hasShip()) {
      const { ship } = node;
      ship.hit();
      return true;
    }
    return false;
  }
}
