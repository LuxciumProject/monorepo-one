import { Box, boxFrom, boxOf } from '..';

describe('Testing Box specification', () => {
  test('Box `of` static method', () => {
    expect(Box.of('Chocolates')).toStrictEqual(Box.of('Chocolates'));
  });

  test('Box `from` static method', () => {
    const box = Box.of('Chocolates');

    expect(Box.from(box)).toStrictEqual(Box.of('Chocolates'));
  });

  test('Box `map` method', () => {
    // const box = Box.of(12);
    const expected = Box.of(12).map(val => val * 2 + 1);
    expect(expected).toStrictEqual(Box.of(12 * 2 + 1));
  });

  test('Box `ap` method', () => {
    const box = Box.of(12);
    expect(box.ap(Box.of(val => val * 2 + 1))).toStrictEqual(
      Box.of(12 * 2 + 1)
    );
  });

  test('Box `chain` method', () => {
    const box = Box.of(12);
    expect(box.chain(val => Box.of(val * 2 + 6))).toStrictEqual(Box.of(30));
  });

  test('Box `unbox` method', () => {
    const box = Box.of('Chocolates');
    expect(box.unbox()).toBe('Chocolates');
  });

  test('Box `box` property', () => {
    const box = Box.of('Chocolates');
    expect(box.box).toEqual(box);
  });
  test('Box `value` property', () => {
    const box = Box.of('Chocolates');
    expect(box.value).toBe('Chocolates');
  });
});

describe('Testing boxFrom helper factory', () => {
  test('boxFrom', () => {
    const box = Box.of('Chocolates');
    const expected = boxFrom(box);
    expect(expected.unbox()).toEqual('Chocolates');
  });
});

describe('Testing boxOf helper factory', () => {
  test('boxOf', () => {
    const expected = boxOf('Chocolates');
    expect(expected.unbox()).toEqual('Chocolates');
  });
});
