import Node from './node';
import Ship from './Ship';

export default class Gameboard {
  constructor() {
    this.board = Gameboard.#createBoard();
    this.listStartships = Gameboard.#getListShips();
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

  #withinBounds(dir, length, startArray) {
    const boardLength = this.board.length;
    if (dir === 'vertical')
      return startArray[1] >= 0 && startArray[1] + length <= boardLength;
    return startArray[0] >= 0 && startArray[0] + length <= boardLength;
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
    const lngth = this.listStartships[indxStartShip][1];
    const nodes = this.getNodes(dir, lngth, [startX, startY]);
    if (!this.spaceAvailable(nodes, dir, lngth, [startX, startY])) return false;
    const shipPara = this.listStartships.splice(indxStartShip, 1).flat();
    const ship = new Ship(shipPara[0], shipPara[1]);
    nodes.forEach(node => {
      const nod = node;
      nod.ship = ship;
    });
    return true;
  }
}
