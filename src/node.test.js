import Node from './node';

describe('Node', () => {
  const node = new Node();

  it('Has no ship', () => {
    expect(node.hasShip()).toBeFalsy();
  });
});
