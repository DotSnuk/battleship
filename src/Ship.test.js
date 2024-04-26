import Ship from './Ship';

describe('Ship', () => {
  const boat = new Ship('Hello', 3);

  it('Testing hit', () => {
    expect(boat.hit()).toBe(1);
  });

  it('Is it sunk?', () => {
    expect(boat.isSunk()).toBe(false);
  });
});
