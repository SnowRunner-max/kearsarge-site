import { supabaseJson } from '$lib/server/db/supabase';
import type {
  CharacterPageData,
  HistorySection,
  LogEntry,
  TimelineEntry
} from '$lib/types/character';
import type { CharacterLoreBundle, ContextSlice } from '$lib/types/lore';

interface CharacterRow {
  id: string;
  slug: string;
  hero: CharacterPageData['hero'];
  dossier: CharacterPageData['dossier'];
  profile: {
    name: string;
    pronouns: string;
    traits: string[];
    goals: string[];
  } | null;
}

interface LoreEntryRow {
  id: string;
  character_id: string;
  slug: string;
  source: 'dossier' | 'history' | 'timeline' | 'log';
  title: string;
  content: string;
  tags: string[];
  order_index: number | null;
  metadata: Record<string, unknown> | null;
}

interface ContextMetadata {
  context?: {
    id?: string;
    title?: string;
    content?: string;
    tags?: unknown;
  };
  contextOnly?: boolean;
  paragraphs?: unknown;
  points?: unknown;
  logId?: unknown;
  filedBy?: unknown;
  date?: unknown;
}

interface CharacterWithEntries {
  row: CharacterRow;
  entries: LoreEntryRow[];
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === 'string' ? item : String(item)))
    .filter((item) => item.length > 0);
}

function toHistorySection(entry: LoreEntryRow): HistorySection {
  const metadata = (entry.metadata ?? {}) as ContextMetadata;
  const paragraphs = toStringArray(metadata.paragraphs);
  const body = paragraphs.length > 0
    ? paragraphs
    : entry.content
        .split(/\n\s*\n/)
        .map((segment) => segment.trim())
        .filter(Boolean);

  return {
    title: entry.title,
    body
  };
}

function toTimelineEntry(entry: LoreEntryRow): TimelineEntry {
  const metadata = (entry.metadata ?? {}) as ContextMetadata;
  const points = toStringArray(metadata.points);
  return {
    title: entry.title,
    body: points
  };
}

function toLogEntry(entry: LoreEntryRow): LogEntry {
  const metadata = (entry.metadata ?? {}) as ContextMetadata;
  const rawId = metadata.logId;
  const id = typeof rawId === 'number' ? rawId : Number(rawId ?? 0);
  return {
    id: Number.isFinite(id) && id > 0 ? id : 0,
    title: entry.title,
    filedBy: typeof metadata.filedBy === 'string' ? metadata.filedBy : String(metadata.filedBy ?? ''),
    date: typeof metadata.date === 'string' ? metadata.date : String(metadata.date ?? ''),
    body: entry.content
  };
}

function extractContextSlice(entry: LoreEntryRow, slug: string): ContextSlice | null {
  const metadata = (entry.metadata ?? {}) as ContextMetadata;
  const context = metadata.context;
  if (!context) {
    return null;
  }

  const tags = toStringArray(context.tags).length > 0 ? toStringArray(context.tags) : entry.tags;
  const id = typeof context.id === 'string' && context.id.length > 0 ? context.id : `${slug}-${entry.slug}`;
  const title = typeof context.title === 'string' && context.title.length > 0 ? context.title : entry.title;
  const content = typeof context.content === 'string' && context.content.length > 0 ? context.content : entry.content;

  return {
    id,
    characterId: slug,
    source: entry.source,
    title,
    content,
    tags
  };
}

async function fetchCharacterWithEntries(slug: string): Promise<CharacterWithEntries | null> {
  const characterRows = await supabaseJson<CharacterRow[]>(`/rest/v1/characters`, {
    searchParams: {
      select: 'id,slug,hero,dossier,profile',
      slug: `eq.${slug}`
    }
  });

  const row = characterRows?.[0];
  if (!row) {
    return null;
  }

  const params = new URLSearchParams();
  params.set('select', 'id,character_id,slug,source,title,content,tags,order_index,metadata');
  params.set('character_id', `eq.${row.id}`);
  params.append('order', 'order_index.asc.nullslast');
  params.append('order', 'created_at.asc');

  const entries = await supabaseJson<LoreEntryRow[]>(`/rest/v1/lore_entries`, {
    searchParams: params
  });

  return { row, entries: entries ?? [] };
}

function buildCharacterPageData(row: CharacterRow, entries: LoreEntryRow[]): CharacterPageData {
  const history = entries
    .filter((entry) => entry.source === 'history')
    .map(toHistorySection);

  const timeline = entries
    .filter((entry) => entry.source === 'timeline')
    .map(toTimelineEntry);

  const logs = entries
    .filter((entry) => entry.source === 'log')
    .map(toLogEntry)
    .sort((a, b) => a.id - b.id);

  return {
    hero: row.hero,
    dossier: row.dossier,
    history,
    timeline,
    logs
  };
}

function buildContextSlices(slug: string, entries: LoreEntryRow[]): ContextSlice[] {
  return entries
    .map((entry) => extractContextSlice(entry, slug))
    .filter((slice): slice is ContextSlice => slice !== null);
}

export async function getCharacterLoreBundle(slug: string): Promise<CharacterLoreBundle | null> {
  const result = await fetchCharacterWithEntries(slug);
  if (!result) {
    return null;
  }

  const character = buildCharacterPageData(result.row, result.entries);
  const contextSlices = buildContextSlices(slug, result.entries);

  return {
    id: slug,
    character,
    contextSlices
  };
}

export async function getCharacterPageData(slug: string): Promise<CharacterPageData | null> {
  const bundle = await getCharacterLoreBundle(slug);
  return bundle?.character ?? null;
}

export interface CharacterSummary {
  slug: string;
  name: string;
  tagline?: string;
}

export async function listCharacterSummaries(): Promise<CharacterSummary[]> {
  const rows = await supabaseJson<Array<{ slug: string; hero: CharacterPageData['hero'] }>>('/rest/v1/characters', {
    searchParams: {
      select: 'slug,hero'
    }
  });

  return (rows ?? []).map((row) => ({
    slug: row.slug,
    name: row.hero?.name ?? row.slug,
    tagline: row.hero?.tagline ?? undefined
  }));
}
