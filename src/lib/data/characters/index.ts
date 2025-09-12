import type { CharacterPageData } from "$lib/types/character";
import { tundraKarsvaldr } from "$lib/data/tundraKarsvaldr";

type Registry = Record<string, CharacterPageData>;

const registry: Registry = {
  "tundra-karsvaldr": tundraKarsvaldr,
};

export function getCharacter(slug: string): CharacterPageData | null {
  return registry[slug] ?? null;
}

export function listCharacters(): { slug: string; name: string }[] {
  return Object.entries(registry).map(([slug, data]) => ({ slug, name: data.hero.name }));
}

