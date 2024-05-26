import Node from './node';
import Ship from './Ship';

export default class Gameboard {
  constructor() {
    this.board = Gameboard.#createBoard();
    this.listStartShips = Gameboard.#getListShips();
    this.listActiveShips = [];
  }

  static #createBoard() {
    const boardArray = [];
    for (let x = 0; x < 10; x += 1) {
      const col = [];
      for (let y = 0; y < 10; y += 1) {
        col.push(new Node());
      }
      boardArray.push(col);
    }
    return boardArray;
  }

  static #getListShips() {
    const starterShips = [
      ['Carrier', 5],
      ['Battleship', 4],
      ['Cruiser', 3],
      ['Submarine', 3],
      ['Destroyer', 2],
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

  static #intToCoords(arr) {
    return [String.fromCharCode(arr[0] + 65), arr[1] + 1];
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

  getMissedAttacks() {
    const missedAttacks = [];
    this.board.forEach((y, yIndx) => {
      y.forEach((x, xIndx) => {
        if (x.beenHit && !x.hasShip()) missedAttacks.push([xIndx, yIndx]);
      });
    });
    return missedAttacks;
  }

  getAttacks() {
    const attacks = [];
    this.board.forEach((y, yIndx) => {
      y.forEach((x, xIndx) => {
        if (x.beenHit) {
          const coords = Gameboard.#intToCoords([xIndx, yIndx]);
          const hitShip = x.hasShip();
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
    const coords = Gameboard.#translateCoords([x, y]);
    return this.board[coords[0]][coords[1]];
  }

  getNodes(dir, length, startArray) {
    if (dir === 'vertical')
      return this.board[startArray[0]].slice(
        startArray[1],
        startArray[1] + length,
      );
    const verticalArr = this.board.slice(startArray[0], startArray[0] + length);
    const indxFromVertical = verticalArr.map(
      subArray => subArray[startArray[1]],
    );
    return indxFromVertical;
  }

  spaceAvailable(nodes, dir, length, startArray) {
    return (
      this.#withinBounds(dir, length, startArray) &&
      nodes.every(node => node.ship === null)
    );
  }

  placeShip(indxStartShip, dir, startX, startY) {
    // throw error if listStartShips length === 0?
    const coords = Gameboard.#translateCoords([startX, startY]);
    const lngth = this.listStartShips[indxStartShip][1];
    const nodes = this.getNodes(dir, lngth, coords);
    if (!this.spaceAvailable(nodes, dir, lngth, coords)) return false;
    const shipPara = this.listStartShips.splice(indxStartShip, 1).flat();
    const ship = new Ship(shipPara[0], shipPara[1]);
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
    node.beenHit = true;
    if (node.hasShip()) {
      const { ship } = node;
      ship.hit();
      return true;
    }
    return false;
  }
}
