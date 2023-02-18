import { GoldenRune, GOLDEN_RUNES } from './goldenRunes';

/**
 * Calculates which Golden Runes should be 'popped' in order to minimally achieve the required total cost.
 *
 * @param runesHeld Number of runes currently held in the player's Status view. Do not count items in the inventory.
 * @param runesRequired Number of runes required for the purchase/level-up. Can be provided unordered.
 * @param wastedPercentage (Optional) Percentage of runes you're willing to waste on your spend, represented as a number between 1 and 0. Defaults to 25% (0.25)
 * @param runesAvailable (Optional) Array of Golden Rune tiers available to the player. Defaults to all rune types in the game
 * @returns Array of golden runes appended with the number required. Removes entries with zero counts.
 */
export function goldenRunesNeeded(
  runesHeld: number,
  runesRequired: number,
  wastedPercentage: number = 0.25,
  runesAvailable: GoldenRune[] = GOLDEN_RUNES
): GoldenRune[] {
  let runesToGo = Math.round(runesRequired) - Math.round(runesHeld);
  const sortedRunes = runesAvailable.sort((a, b) => b.value - a.value);
  return sortedRunes.flatMap((goldenRune) => {
    if (runesToGo > 0) {
      const mod = runesToGo % goldenRune.value;
      let count = (runesToGo - mod) / goldenRune.value;
      runesToGo = mod;

      if (
        runesToGo > 0 &&
        (goldenRune === sortedRunes.at(-1) ||
          goldenRune.value * (1 - clamp(wastedPercentage, 0, 1)) <= runesToGo)
      ) {
        count = count + 1;
        runesToGo = runesToGo - goldenRune.value;
      }

      if (count === 0) {
        return [];
      }
      return { ...goldenRune, count };
    }
    return [];
  });
}

/**
 * Calculates the number of runes required for a player to upgrade their character in a standard, unmodified Elden Ring game.
 * These values may differ if you are using a modpack that changes balance or adjusts prices.
 *
 * @param currentLevel the current level of the player expressed as a whole positive integer, clamped within the valid range range of levels
 * @returns the cost required to upgrade to the next level in runes
 */
export function runeCostToNextLevel(currentLevel: number): number {
  const nextLevel = clamp(Math.floor(currentLevel), 0, 713) + 1;
  if (nextLevel < 12) {
    const lowLevels = [
      0, 0, 673, 689, 706, 723, 740, 757, 775, 793, 811, 829, 847
    ];
    return lowLevels[nextLevel];
  } else {
    return Math.floor(
      0.02 * nextLevel * nextLevel * nextLevel +
        3.06 * nextLevel * nextLevel +
        105.6 * nextLevel -
        895
    );
  }
}

/**
 * Calculates the cost in runes between two provided levels.
 *
 * @param currentLevel the current level of the player expressed as a whole positive integer, clamped within the valid range range of levels
 * @param desiredLevel the desired level of the player expressed as a whole positive integer, clamped within the valid range range of levels
 * @returns the cost required to upgrade to the desired level in runes
 */
export function runeCostToLevelFrom(
  currentLevel: number,
  desiredLevel: number
): number {
  var cost = 0;

  const currLevel = clamp(
    Math.floor(currentLevel <= desiredLevel ? currentLevel : desiredLevel),
    0,
    713
  );
  const desLevel = clamp(
    Math.floor(currentLevel >= desiredLevel ? currentLevel : desiredLevel),
    0,
    713
  );

  for (var lvl = currLevel; lvl < desLevel; lvl++) {
    cost = cost + runeCostToNextLevel(lvl);
  }

  return cost;
}

/**
 * Simple clamp function
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
