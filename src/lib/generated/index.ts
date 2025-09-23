import { TundraKarsvaldrBundle } from './characters/tundra-karsvaldr';

import type { CharacterLoreBundle } from '$lib/types/lore';

export const characterLoreBundles: CharacterLoreBundle[] = [
  TundraKarsvaldrBundle
];

export const characterLoreById = new Map(characterLoreBundles.map((bundle) => [bundle.id, bundle]));
