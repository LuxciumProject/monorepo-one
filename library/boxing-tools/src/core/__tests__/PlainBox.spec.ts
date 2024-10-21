// @/core/__tests__/PlainBox.spec.ts
import { PlainBox } from '../PlainBox';

describe('PlainBox Functor Laws Compliance', () => {
  test("Identity: u['fantasy-land/map'](a => a) is equivalent to u", () => {
    const value = 37;
    const box = PlainBox.of(value);
    const result = box['fantasy-land/map']((a: unknown) => a);
    expect(result).toStrictEqual(box);
  });

  test("Composition: u['fantasy-land/map'](x => f(g(x))) is equivalent to u['fantasy-land/map'](g)['fantasy-land/map'](f)", () => {
    const value = 37;
    const box = PlainBox.of(value);
    const f = (x: number) => x + 1;
    const g = (x: number) => x * 2;

    const composedResult = box['fantasy-land/map']((x: any) => f(g(x)));
    const separateResult = box['fantasy-land/map'](g)['fantasy-land/map'](f);

    expect(composedResult.boxedValue).toBe(separateResult.boxedValue);
  });
});
