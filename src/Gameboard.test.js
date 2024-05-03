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

  it('Place ship', () => {
    expect(board.placeShip(1, 'vertical', 2, 2)).toBeTruthy();
  });
});
