import { goldenRunesNeeded } from '../index';

describe('Test goldenRunesNeeded', () => {
  it('Correctly calculates required runes', () => {
    expect(goldenRunesNeeded(800, 1000)).toStrictEqual([
      { runeLevel: 1, value: 200, count: 1 }
    ]);

    expect(goldenRunesNeeded(38214, 43592)).toStrictEqual([
      { runeLevel: 10, value: 5000, count: 1 },
      { runeLevel: 1, value: 200, count: 1 }
    ]);
  });

  it('Correctly calculates required runes with custom GoldenRunes array', () => {
    expect(
      goldenRunesNeeded(800, 20000, [
        { runeLevel: 10, value: 5000 },
        { runeLevel: 1, value: 200 }
      ])
    ).toStrictEqual([
      { runeLevel: 10, value: 5000, count: 3 },
      { runeLevel: 1, value: 200, count: 21 }
    ]);
  });

  it('Correctly calculates required runes with custom GoldenRunes array (unordered)', () => {
    expect(
      goldenRunesNeeded(800, 20000, [
        { runeLevel: 1, value: 200 },
        { runeLevel: 10, value: 5000 }
      ])
    ).toStrictEqual([
      { runeLevel: 10, value: 5000, count: 3 },
      { runeLevel: 1, value: 200, count: 21 }
    ]);
  });
});
