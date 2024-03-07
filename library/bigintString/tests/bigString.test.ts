import { bigString } from '../src/bigString';

describe('Converts 64 binary string ("0" | "1") to integer string.\n      it...', () => {
  it('...should convert from 64 binary string to integer string.', () => {
    let value = bigString(
      '0101010101010101010101010101010101010101010101010101010101010101'
    );
    let expected = '6148914691236517205';
    expect(value).toBe(expected);
  });

  it('...should be resilient provided a compatible Bigint.', () => {
    let value = bigString(
      /* 12_297_829_382_473_034_410 */ 0b0000_0000_0000_0000_0000_0000_0000_0000_0011_1111_1111_1111_1111_1111_1111_1111n
    );
    let expected = '1073741823';
    expect(value).toBe(expected);
  });

  it('...should be resilient provided a compatible Bigint.', () => {
    let value = bigString(268_435_455n);
    let expected = '268435455';
    expect(value).toBe(expected);
  });
  test("...should be resilient to strings stating with '0b' or '0B'.", () => {
    let value = bigString(
      '0b1010101010101010101010101010101010101010101010101010101010101010'
    );
    let expected = '12297829382473034410';
    expect(value).toBe(expected);

    value = bigString(
      '0B1010101010101010101010101010101010101010101010101010101010101010'
    );
    expected = '12297829382473034410';
    expect(value).toBe(expected);
  });
  test("...should be resilient provided a compatible Bigint stating with '0b'", () => {
    let value =
      bigString(
        0b1010_1010_1010_1010_1010_1010_1010_1010_1010_1010_1010_1010_1010_1010_1010_1010n
      );
    let expected = '12297829382473034410';
    expect(value).toBe(expected);
  });

  test("...should be resilient to strings ending with 'n'.", () => {
    let value = bigString(
      '1010101010101010101010101010101010101010101010101010101010101010n'
    );
    let expected = '12297829382473034410';
    expect(value).toBe(expected);
  });
  it('...should be resilient providing a string containing underscores.', () => {
    let value = bigString(
      '0b1010_1010_1010_1010_1010_1010_1010_1010_1010_1010_1010_1010_1010_1010_1010_1010n'
    );
    let expected = '12297829382473034410';
    expect(value).toBe(expected);
  });

  it('...should convert from 64 binary string to integer string.', () => {
    let value = bigString(
      '0000000000000000000000000000000000111111111111111111111111111111'
    );
    let expected = '1073741823';
    expect(value).toBe(expected);
  });

  it('...should convert from 64 binary string to integer string.', () => {
    let value =
      bigString(
        0b0000_0000_0000_0000_0000_0000_0000_0000_1111_1111_1111_1111_1111_1111_1111_1111n
      );
    let expected = '4294967295';
    expect(value).toBe(expected);
  });

  it('...should throw if The string was not 64 bit \'("0" | "1")\' long.', () => {
    // let value = bigString('0b0b');
    // let expected = '4294967295';
    expect(() => bigString('0b0b')).toThrow(
      'Something bad happened! The string was not 64 bit \'("0" | "1")\' long'
    );
  });
});
