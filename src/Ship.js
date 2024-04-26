export default class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    if (!this.isSunk()) this.hits += 1;
    return this.hits;
  }

  isSunk() {
    if (this.hits === this.length) return true;
    return false;
  }
}
