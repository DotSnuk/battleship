export default class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ship = null;
    this.beenHit = false;
  }

  set ship(shipObj) {
    this._ship = shipObj;
  }

  get ship() {
    return this._ship;
  }

  hasShip() {
    if (this.ship !== null) return true;
    return false;
  }
}
