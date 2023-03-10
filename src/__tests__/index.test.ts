import { GoldenRune } from '../goldenRunes';
import {
  goldenRunesNeeded,
  runeCostToLevelFrom,
  runeCostToNextLevel
} from '../index';

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
      goldenRunesNeeded(800, 16300, 0.75, [
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
      goldenRunesNeeded(800, 16300, 0.75, [
        { runeLevel: 1, value: 200 },
        { runeLevel: 10, value: 5000 }
      ])
    ).toStrictEqual([
      { runeLevel: 10, value: 5000, count: 3 },
      { runeLevel: 1, value: 200, count: 3 }
    ]);
  });
});

describe('Test runeCostToNextLevel', () => {
  it.each`
    currentLevel | expected
    ${1}         | ${673}
    ${5}         | ${740}
    ${11}        | ${847}
    ${51}        | ${15682}
    ${62}        | ${22903}
    ${112}       | ${78968}
    ${240}       | ${482232}
    ${695}       | ${8297986}
  `(
    'Correctly calculates required runes to level up from $currentLevel',
    ({ currentLevel, expected }) => {
      expect(runeCostToNextLevel(currentLevel)).toBe(expected);
    }
  );
});

describe('Test runeCostToLevelFrom', () => {
  it.each`
    currentLevel | desiredLevel | expected
    ${1}         | ${12}        | ${8343}
    ${5}         | ${6}         | ${740}
    ${11}        | ${24}        | ${28228}
    ${51}        | ${81}        | ${782064}
    ${62}        | ${65}        | ${70933}
    ${112}       | ${234}       | ${28145401}
    ${240}       | ${600}       | ${855780216}
    ${695}       | ${710}       | ${128025658}
  `(
    'Correctly calculates required runes to level up from $currentLevel to $desiredLevel',
    ({ currentLevel, desiredLevel, expected }) => {
      expect(runeCostToLevelFrom(currentLevel, desiredLevel)).toBe(expected);
    }
  );
});
