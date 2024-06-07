import Ship from './Ship';

describe('Ship', () => {
  const boat = new Ship('Hello', 1, 3);

  it('Testing hit', () => {
    expect(boat.hit()).toBe(1);
  });

  it('Is it sunk?', () => {
    expect(boat.isSunk()).not.toBeTruthy();
  });

  it('Can I hit it more than its length?', () => {
    for (let i = 0; i < 4; i += 1) boat.hit();
    expect(boat.hit()).toBe(3);
  });

  it('Can I sink it?', () => {
    for (let i = 0; i < 3; i += 1) boat.hit();
    expect(boat.isSunk()).toBeTruthy();
  });
});
