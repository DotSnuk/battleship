import Gameboard from './Gameboard';
import Node from './node';

describe('Gameboard', () => {
  const board = new Gameboard();

  it('test board', () => {
    expect(board.board.length).toBe(10);
  });

  it('Place first ship', () => {
    expect(board.placeShip(0, 'horizontal', 'b', 2)).toBeTruthy();
  });

  it('Try and place second ship, should collide', () => {
    expect(board.placeShip(0, 'vertical', 'c', 1)).toBeFalsy();
  });

  it('Try second ship again, shouldnt collide', () => {
    expect(board.placeShip(0, 'vertical', 'B', 3)).toBeTruthy();
  });

  it('Try third ship, should collide', () => {
    expect(board.placeShip(0, 'horizontal', 'A', 3)).toBeFalsy();
  });

  it('Place third ship', () => {
    expect(board.placeShip(0, 'horizontal', 'c', 3)).toBeTruthy();
  });

  it('Take hit, should miss', () => {
    // want a jest spy function later to see if other function have been called.
    // that logs missed attacks.
    expect(board.receiveAttack('D', 4)).toBeFalsy();
  });

  it('Take hit, should hit', () => {
    expect(board.receiveAttack('B', 4)).toBeTruthy();
  });

  it('Take hit, misses should be logged', () => {
    board.receiveAttack('A', 1);
    const missedAttack = board.getMissedAttacks();
    expect(missedAttack.length).toBe(2);
  });

  it('Get all attacks', () => {
    expect(board.getAttacks().length).toBe(3);
  });

  it('Filter out hits', () => {
    const attacks = board.getAttacks();
    const hits = attacks.filter(attck => attck.hitShip === true);
    expect(hits.length).toBe(1);
  });

  it('Get node from coordinate', () => {
    const nod = board.getNode('b', 2);
    expect(nod.hasShip()).toBeTruthy();
  });

  it('Get another node', () => {
    const nod = board.getNode('e', 5);
    expect(nod.hasShip()).toBeFalsy();
  });

  it('And another node', () => {
    const nod = board.getNode('f', 2);
    expect(nod.hasShip()).toBeTruthy();
  });
});

describe('All ships sunk', () => {
  const board = new Gameboard();
  for (let i = 0; i < 5; i += 1) {
    board.placeShip(0, 'horizontal', 'B', i + 1);
  }
  const allShips =
    board.listStartShips.length === 0 && board.listActiveShips.length === 5;

  it('All ships placed', () => {
    expect(allShips).toBeTruthy();
  });

  it('No attacks, allShipsSunk should be false', () => {
    expect(board.allShipsSunk()).toBeFalsy();
  });

  it('Attack all ships, all should be sunk', () => {
    for (let i = 0; i < 5; i += 1) {
      board.receiveAttack(String.fromCharCode(66 + i), 1);
    }
    for (let i = 0; i < 4; i += 1) {
      board.receiveAttack(String.fromCharCode(66 + i), 2);
    }
    for (let i = 0; i < 3; i += 1) {
      board.receiveAttack(String.fromCharCode(66 + i), 3);
    }
    for (let i = 0; i < 3; i += 1) {
      board.receiveAttack(String.fromCharCode(66 + i), 4);
    }
    for (let i = 0; i < 2; i += 1) {
      board.receiveAttack(String.fromCharCode(66 + i), 5);
    }
    expect(board.allShipsSunk()).toBeTruthy();
  });
});
