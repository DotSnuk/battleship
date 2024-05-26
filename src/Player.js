import Gameboard from './Gameboard';

export default class Player {
  constructor(name) {
    this.name = name;
    this.board = new Gameboard();
  }

  set name(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }
}
