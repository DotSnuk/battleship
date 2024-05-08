import Gameboard from './Gameboard';
import Node from './node';

describe('Gameboard', () => {
  const board = new Gameboard();

  // it('Test within bounds', () => {
  //   expect(board.withinBounds('vertical', 3, [5, 5])).toBeTruthy();
  // });

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
});
