import { characterLoreBundles, characterLoreById } from '$lib/generated';
import type { CharacterLoreBundle, ContextSlice } from '$lib/types/lore';

const BASE_PRIORITY: Record<ContextSlice['source'], number> = {
  dossier: 0,
  history: 1,
  timeline: 2,
  log: 3
};

export function listCharacterLore(): CharacterLoreBundle[] {
  return [...characterLoreBundles];
}

export function getCharacterLore(id: string): CharacterLoreBundle | undefined {
  return characterLoreById.get(id);
}

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 2);
}

function scoreSlice(slice: ContextSlice, tokens: string[]): number {
  if (tokens.length === 0) {
    return 0;
  }

  const title = slice.title.toLowerCase();
  const content = slice.content.toLowerCase();

  let score = 0;
  for (const token of tokens) {
    if (title.includes(token)) {
      score += 4;
    }
    if (content.includes(token)) {
      score += 2;
    }
  }

  return score;
}

export interface ContextSliceQuery {
  characterId: string;
  query?: string;
  limit?: number;
  tags?: string[];
}

export function getContextSlicesForPrompt({
  characterId,
  query,
  limit = 4,
  tags
}: ContextSliceQuery): ContextSlice[] {
  const bundle = getCharacterLore(characterId);
  if (!bundle) {
    return [];
  }

  const tokens = query ? tokenize(query) : [];
  const filteredByTags = tags && tags.length > 0
    ? bundle.contextSlices.filter((slice) => tags.every((tag) => slice.tags.includes(tag)))
    : bundle.contextSlices;

  const ranked = filteredByTags
    .map((slice) => ({
      slice,
      score: scoreSlice(slice, tokens),
      basePriority: BASE_PRIORITY[slice.source]
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.basePriority - b.basePriority;
    })
    .map((entry) => entry.slice);

  const results: ContextSlice[] = [];
  const seen = new Set<string>();

  for (const slice of ranked) {
    if (slice.source === 'log' && tokens.length === 0) {
      continue; // avoid injecting long logs without intent
    }
    if (!seen.has(slice.id)) {
      results.push(slice);
      seen.add(slice.id);
    }
    if (results.length >= limit) {
      break;
    }
  }

  if (results.length < limit) {
    const baseline = bundle.contextSlices
      .slice()
      .sort((a, b) => BASE_PRIORITY[a.source] - BASE_PRIORITY[b.source]);

    for (const slice of baseline) {
      if (!seen.has(slice.id)) {
        results.push(slice);
        seen.add(slice.id);
      }
      if (results.length >= limit) {
        break;
      }
    }
  }

  return results.slice(0, limit);
}
