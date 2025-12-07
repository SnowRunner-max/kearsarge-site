import { getCharacter } from '$lib/server/lore';
import { buildContextSlices } from '$lib/server/lore/slices';
import type { ContextSlice } from '$lib/types/lore';

const BASE_PRIORITY: Record<ContextSlice['source'], number> = {
  context: -1,
  dossier: 0,
  history: 1,
  timeline: 2,
  log: 3
};

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 2);
}

/**
 * Scores a context slice based on partial matches of the tokenized query against
 * the slice title and content.
 *
 * Title matches are weighted higher than content matches to prioritize relevance.
 */
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

import { tundraContextSlices } from '$lib/data/lore/tundra-context';
import { tundraPhysicalContextSlices } from '$lib/data/lore/tundra-physical-context';
import { tundraSaunaContextSlices } from '$lib/data/lore/tundra-sauna-context';
import { tundraGymContextSlices } from '$lib/data/lore/tundra-gym-context';

// ... (existing imports)

/**
 * Retrieves relevant context slices for a given prompt/query.
 *
 * This function orchestrates the context retrieval strategy:
 * 1. Checks for active "scenarios" via tags (e.g. sauna, gym) and prioritizes their static data.
 * 2. Identifies "forced matches" where a slice must be included if its tag matches the request.
 * 3. Builds a pool of candidate slices from static data and dynamic character data (dossier, history).
 * 4. Scores and ranks the pool against the query tokens to find the most relevant additional context.
 */
export async function getContextSlicesForPrompt({
  characterId,
  query,
  limit = 4,
  tags
}: ContextSliceQuery): Promise<ContextSlice[]> {
  const character = await getCharacter(characterId);
  if (!character) {
    return [];
  }

  // 1. Determine Active Static Slices
  // We use a registry to map tags to their specific context slices.
  // This allows us to easily add new scenarios without modifying the core logic.
  const SCENARIO_CONTEXT_REGISTRY: Record<string, ContextSlice[]> = {
    'sauna': tundraSaunaContextSlices,
    'gym': tundraGymContextSlices
  };

  let activeStaticSlices: ContextSlice[] = [];

  // Add scenario-specific slices FIRST (High Priority)
  if (tags) {
    for (const tag of tags) {
      if (SCENARIO_CONTEXT_REGISTRY[tag]) {
        activeStaticSlices.push(...SCENARIO_CONTEXT_REGISTRY[tag]);
      }
    }
  }

  // Add global slices LAST (Fallback)
  activeStaticSlices.push(
    ...tundraContextSlices,
    ...tundraPhysicalContextSlices
  );

  // 2. Identify "Forced" Matches (Explicit Tag Match)
  // These are slices that explicitly match the requested tags (e.g. "sauna" slices when "sauna" tag is present)
  // We prioritize these above all else.
  const forcedMatches = tags && tags.length > 0
    ? activeStaticSlices.filter((slice) => tags.some((tag) => slice.tags.includes(tag)))
    : [];

  const forcedIds = new Set(forcedMatches.map(s => s.id));

  // 3. Build Pool for Scoring
  // Combine remaining static slices (not forced) + dynamic dossier/history slices
  const dynamicSlices = buildContextSlices(characterId, character);
  const remainingStatic = activeStaticSlices.filter(s => !forcedIds.has(s.id));

  const pool = [...remainingStatic, ...dynamicSlices];
  const tokens = query ? tokenize(query) : [];

  const ranked = pool
    .map((slice) => ({
      slice,
      score: scoreSlice(slice, tokens),
      basePriority: BASE_PRIORITY[slice.source] ?? 0
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.basePriority - b.basePriority; // Lower priority value is better (e.g. -1 < 0)
    })
    .map((entry) => entry.slice);

  // 4. Assemble Results
  const results: ContextSlice[] = [...forcedMatches];
  const seen = new Set<string>(forcedMatches.map(s => s.id));

  for (const slice of ranked) {
    if (slice.source === 'log' && tokens.length === 0) {
      continue;
    }
    if (!seen.has(slice.id)) {
      results.push(slice);
      seen.add(slice.id);
    }
    if (results.length >= limit) {
      break;
    }
  }

  return results.slice(0, limit);
}
