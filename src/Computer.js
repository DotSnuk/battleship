import Player from './Player';
import Gameboard from './Gameboard';

export default class Computer extends Player {
  hasAttackOccurred(attack, arrAttacks) {
    arrAttacks.forEach(prevAttack => {
      if (attack[0] === prevAttack[0] && attack[1] === prevAttack[1])
        return true;
    });
    return false;
  }

  getAttack(opponent) {
    const { board } = opponent;
    const { length } = board.board;
    const attacks = board.getAttacks().map(attck => attck.coords);
    let coords;
    do {
      coords = Gameboard.intToCoords([
        board.getRandomInt(length),
        board.getRandomInt(length),
      ]);
    } while (this.hasAttackOccurred(coords, attacks));
    return coords;
  }
}
