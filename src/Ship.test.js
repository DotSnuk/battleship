import Ship from './Ship';

describe('Ship', () => {
  const boat = new Ship('Hello', 3);

  it('Testing hit', () => {
    expect(boat.hit()).toBe(1);
  });

  it('Is it sunk?', () => {
    expect(boat.isSunk()).not.toBeTruthy();
  });

  it('Can I sink it?', () => {
    boat.hit();
    boat.hit();
    boat.hit();
    expect(boat.isSunk()).toBeTruthy();
  });
});
