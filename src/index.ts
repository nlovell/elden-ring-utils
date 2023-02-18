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
 * Simple clamp function
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
