import Node from './node';
import Ship from './Ship';

export default class Gameboard {
  constructor() {
    this.board = Gameboard.#createBoard();
    this.listStartships = Gameboard.#getListShips();
    // this.unplacedShips = Gameboard.#getShips();
    // missed shots. on this board?
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

  static #directionCheck(dir, callback, length, startArray) {
    if (dir === 'vertical') return callback(length, startArray[1]);
    return callback(length, startArray[0]);
  }

  #calcWithinBounds(length, start) {
    const boardLength = this.board.length;
    if (start >= 0 && start + length <= boardLength) return true;
    return false;
  }

  #withinBounds(dir, length, startArray) {
    const calcBounds = this.#calcWithinBounds.bind(this);
    return Gameboard.#directionCheck(dir, calcBounds, length, startArray);
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

  spaceAvailable(dir, length, startArray) {
    const nodes = this.getNodes(dir, length, startArray);
    return nodes.every(node => node.ship === null);
  }

  placeShip(indxStartShip, dir, startX, startY) {
    // I can first do the checks to see if it fits before creating the ship
    const shipParam = this.listStartships[indxStartShip];
    if (this.#withinBounds(dir, shipParam[1], [startX, startY])) return true;
    return false;
    // const ship = new Ship(name, length);
  }
}
