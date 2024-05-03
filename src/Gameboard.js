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

  // have directioncheck take callbacks?

  static directionCheck(dir, callback, length, startArray) {
    if (dir === 'vertical') return callback(length, startArray[1]);
    return callback(length, startArray[0]);
  }

  withinBounds(dir, length, startArray) {
    const directionCheck = {
      vertical: () => {},
    };
  }

  placeShip(indxStartShip, dir, startX, startY) {
    // I can first do the checks to see if it fits before creating the ship

    const ship = new Ship(name, length);

    // need check for withinBounds and spaceAvailible
  }
}
