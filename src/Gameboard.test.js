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

  it('test getNodes function, with vertical', () => {
    const result = board.getNodes('vertical', 3, [2, 3]);
    expect(result.length).toBe(3);
  });

  it('test getNodes with horizontal', () => {
    const result = board.getNodes('horizontal', 3, [2, 3]);
    expect(result.length).toBe(3);
  });

  it('test spaceAvailable', () => {
    expect(board.spaceAvailable('horizontal', 3, [2, 3])).toBeTruthy();
  });

  it('Place ship', () => {
    expect(board.placeShip(1, 'vertical', 2, 2)).toBeTruthy();
  });
});
