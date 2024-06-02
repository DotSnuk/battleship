import Computer from './Computer';
import Player from './Player';

describe('Computer moves', () => {
  const ai = new Computer('computer');
  const opponent = new Player('play');
  it('Get a random move', () => {
    expect(ai.getAttack(opponent)).toHaveLength(2);
  });

  it('Move within range', () => {
    opponent.board.receiveAttack('a', 2);
    opponent.board.receiveAttack('d', 6);
    const nextMove = ai.getAttack(opponent);
    expect(nextMove[1]).toBeGreaterThan(0);
    expect(nextMove[1]).toBeLessThanOrEqual(10);
    // expect(ai.getAttack(opponent)).toHaveLength(2);
  });
});
