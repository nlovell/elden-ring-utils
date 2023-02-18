import { GoldenRune, GOLDEN_RUNES } from './goldenRunes';

/**
 * Calculates which Golden Runes should be 'popped' in order to minimally achieve the required total cost.
 *
 * @param runesHeld Number of runes currently held in the player's Status view. Do not count items in the inventory.
 * @param runesRequired Number of runes required for the purchase/level-up. Can be provided unordered.
 * @param runesAvailable Array of Golden Rune tiers available to the player. Defaults to all rune types in the game
 * @returns Array of golden runes appended with the number required. Removes entries with zero counts.
 **/
export function goldenRunesNeeded(
  runesHeld: number,
  runesRequired: number,
  runesAvailable: GoldenRune[] = GOLDEN_RUNES
): GoldenRune[] {
  let runesToGo = Math.round(runesRequired) - Math.round(runesHeld);

  return runesAvailable
    .sort((a, b) => b.value - a.value)
    .flatMap((goldenRune) => {
      const mod = runesToGo % goldenRune.value;
      const count = (runesToGo - mod) / goldenRune.value;
      runesToGo = mod;

      if (count === 0) {
        return [];
      }
      return { ...goldenRune, count };
    });
}
