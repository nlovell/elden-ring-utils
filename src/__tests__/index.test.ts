import { GoldenRune } from '../goldenRunes';
import { goldenRunesNeeded } from '../index';

function totalRuneValue(runes: GoldenRune[]): number {
  return runes
    .map((rune) => (rune.count ? rune.value * rune.count : 0))
    .reduce((values, curr) => values + curr, 0);
}

describe('Test goldenRunesNeeded', () => {
  it.each`
    have   | needed  | expected
    ${800} | ${1100} | ${[{ runeLevel: 2, value: 400, count: 1 }]}
    ${800} | ${1000} | ${[{ runeLevel: 1, value: 200, count: 1 }]}
    ${800} | ${990}  | ${[{ runeLevel: 1, value: 200, count: 1 }]}
  `(
    'Correctly calculates required runes from $have to $needed',
    ({ have, needed, expected }) => {
      console.log(totalRuneValue(goldenRunesNeeded(have, needed)));
      expect(goldenRunesNeeded(have, needed)).toStrictEqual(expected);
    }
  );

  it('Correctly calculates required runes with custom GoldenRunes array', () => {
    expect(
      goldenRunesNeeded(800, 16300, [
        { runeLevel: 10, value: 5000 },
        { runeLevel: 1, value: 200 }
      ])
    ).toStrictEqual([
      { runeLevel: 10, value: 5000, count: 3 },
      { runeLevel: 1, value: 200, count: 3 }
    ]);
  });

  it('Correctly calculates required runes with custom GoldenRunes array (unordered)', () => {
    expect(
      goldenRunesNeeded(800, 16300, [
        { runeLevel: 1, value: 200 },
        { runeLevel: 10, value: 5000 }
      ])
    ).toStrictEqual([
      { runeLevel: 10, value: 5000, count: 3 },
      { runeLevel: 1, value: 200, count: 3 }
    ]);
  });
});
