export type GoldenRune = {
  runeLevel: number;
  value: number;
  count?: number;
};

export const GOLDEN_RUNES: GoldenRune[] = [
  { runeLevel: 13, value: 10000 },
  { runeLevel: 12, value: 7500 },
  { runeLevel: 11, value: 6250 },
  { runeLevel: 10, value: 5000 },
  { runeLevel: 9, value: 3800 },
  { runeLevel: 8, value: 3000 },
  { runeLevel: 7, value: 2500 },
  { runeLevel: 6, value: 2000 },
  { runeLevel: 5, value: 1600 },
  { runeLevel: 4, value: 1200 },
  { runeLevel: 3, value: 800 },
  { runeLevel: 2, value: 400 },
  { runeLevel: 1, value: 200 }
];
