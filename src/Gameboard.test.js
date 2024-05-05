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

  // it('test getNodes function, with vertical', () => {
  //   const result = board.getNodes('vertical', 3, [2, 3]);
  //   expect(result.length).toBe(3);
  // });

  // it('test getNodes with horizontal', () => {
  //   const result = board.getNodes('horizontal', 3, [2, 3]);
  //   expect(result.length).toBe(3);
  // });

  // it('test spaceAvailable', () => {
  //   expect(board.spaceAvailable('horizontal', 3, [2, 3])).toBeTruthy();
  // });

  // it('Place one ship', () => {
  //   expect(board.placeShip(1, 'vertical', 2, 2)).toBeTruthy();
  // });

  it('Place first ship', () => {
    expect(board.placeShip(0, 'horizontal', 1, 1)).toBeTruthy();
  });

  it('Try and place second ship, should collide', () => {
    expect(board.placeShip(0, 'vertical', 2, 1)).toBeFalsy();
  });

  it('Try second ship again, shouldnt collide', () => {
    expect(board.placeShip(0, 'vertical', 1, 2)).toBeTruthy();
  });

  it('Try third ship, should collide', () => {
    expect(board.placeShip(0, 'horizontal', 0, 2)).toBeFalsy();
  });

  it('Place third ship', () => {
    expect(board.placeShip(0, 'horizontal', 2, 2)).toBeTruthy();
  });
});
