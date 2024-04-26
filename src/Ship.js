export default class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    this.hits += 1;
    return this.hits;
  }

  isSunk() {
    // currently, hits can go past the length.
    // need to figure out best practice to avoid that
    if (this.hits === this.length) return true;
    return false;
  }
}
