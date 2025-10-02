import { loadLoreRecords, type CharacterRecord } from './lib/lore';

interface LoreMetadataContext {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

interface InsertLoreEntry {
  character_id: string;
  slug: string;
  source: 'dossier' | 'history' | 'timeline' | 'log';
  title: string;
  content: string;
  tags: string[];
  order_index: number | null;
  metadata: Record<string, unknown> | null;
}

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ownerId = process.env.SUPABASE_LORE_OWNER_ID;
const ownerUsername = process.env.SUPABASE_LORE_OWNER_USERNAME ?? 'lore-admin';
const ownerDisplayName = process.env.SUPABASE_LORE_OWNER_DISPLAY_NAME ?? 'Lore Admin';

if (!url || !serviceKey) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment before running the seed.');
  process.exit(1);
}

if (!ownerId) {
  console.error('Set SUPABASE_LORE_OWNER_ID to the auth.users.id that should own the seeded lore records.');
  process.exit(1);
}

const restBase = `${url}/rest/v1`;

async function supabaseRequest(path: string, init: RequestInit): Promise<Response> {
  const headers = new Headers(init.headers);
  headers.set('apikey', serviceKey);
  headers.set('Authorization', `Bearer ${serviceKey}`);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  headers.set('X-Client-Info', 'kearsarge-site-seed-lore');

  const response = await fetch(`${restBase}${path}`, { ...init, headers });
  return response;
}

async function upsertRows(
  table: string,
  rows: Record<string, unknown>[],
  options: { onConflict?: string; returning?: 'representation' | 'minimal' } = {}
): Promise<unknown[] | null> {
  const params = new URLSearchParams();
  if (options.onConflict) {
    params.set('on_conflict', options.onConflict);
  }
  const prefer = [`resolution=merge-duplicates`];
  if (options.returning) {
    prefer.push(`return=${options.returning}`);
  }

  const query = params.toString();
  const path = query ? `/${table}?${query}` : `/${table}`;
  const response = await supabaseRequest(path, {
    method: 'POST',
    headers: { Prefer: prefer.join(',') },
    body: JSON.stringify(rows)
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  if (options.returning === 'representation') {
    return (await response.json()) as unknown[];
  }

  return null;
}

async function insertRows(table: string, rows: Record<string, unknown>[]): Promise<void> {
  const response = await supabaseRequest(`/${table}`, {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify(rows)
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
}

async function deleteRows(table: string, filter: string): Promise<void> {
  const response = await supabaseRequest(`/${table}?${filter}`, {
    method: 'DELETE',
    headers: { Prefer: 'return=minimal' }
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
}

function inferPronouns(gender: string): string {
  const normalized = gender.trim().toLowerCase();
  if (normalized.includes('male')) return 'he/him';
  if (normalized.includes('female')) return 'she/her';
  return 'they/them';
}

function buildContext(metadata: LoreMetadataContext | null): Record<string, unknown> | null {
  if (!metadata) return null;
  return {
    context: {
      id: metadata.id,
      title: metadata.title,
      content: metadata.content,
      tags: metadata.tags
    }
  };
}

function createHistoryEntries(
  { id, data }: CharacterRecord,
  contextIndex: Map<string, LoreMetadataContext>
): InsertLoreEntry[] {
  return data.history.map((section, index) => {
    const contextId = `${id}-history-${index + 1}`;
    const context = contextIndex.get(contextId) ?? {
      id: contextId,
      title: section.title,
      content: section.body.join('\n\n'),
      tags: ['history']
    };

    const metadata: Record<string, unknown> = { paragraphs: section.body };
    const contextPayload = buildContext(context);
    if (contextPayload) {
      Object.assign(metadata, contextPayload);
    }

    return {
      character_id: '',
      slug: `history-${String(index + 1).padStart(2, '0')}`,
      source: 'history',
      title: section.title,
      content: section.body.join('\n\n'),
      tags: ['history'],
      order_index: index + 1,
      metadata
    } satisfies InsertLoreEntry;
  });
}

function createTimelineEntries({ id, data }: CharacterRecord): InsertLoreEntry[] {
  return data.timeline.map((entry, index) => ({
    character_id: '',
    slug: `timeline-${String(index + 1).padStart(2, '0')}`,
    source: 'timeline',
    title: entry.title,
    content: entry.body.join('\n'),
    tags: ['timeline'],
    order_index: index + 1,
    metadata: {
      points: entry.body
    }
  }));
}

function createLogEntries(
  { id, data }: CharacterRecord,
  contextIndex: Map<string, LoreMetadataContext>
): InsertLoreEntry[] {
  return data.logs.map((log, index) => {
    const contextId = `${id}-log-${log.id}-${index + 1}`;
    const context = contextIndex.get(contextId);

    const metadata: Record<string, unknown> = {
      logId: log.id,
      filedBy: log.filedBy,
      date: log.date
    };
    const contextPayload = context ? buildContext(context) : null;
    if (contextPayload) {
      Object.assign(metadata, contextPayload);
    }

    return {
      character_id: '',
      slug: `log-${String(log.id).padStart(3, '0')}`,
      source: 'log',
      title: log.title,
      content: log.body,
      tags: ['log'],
      order_index: log.id,
      metadata
    } satisfies InsertLoreEntry;
  });
}

async function ensureOwner(): Promise<void> {
  try {
    await upsertRows(
      'users',
      [
        {
          id: ownerId,
          username: ownerUsername,
          display_name: ownerDisplayName
        }
      ],
      { onConflict: 'id', returning: 'minimal' }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Unable to upsert owner record in users table:', message);
    process.exit(1);
  }
}

(async function seed(): Promise<void> {
  await ensureOwner();

  const records = loadLoreRecords();
  for (const record of records) {
    const profile = {
      name: record.data.hero.name,
      pronouns: inferPronouns(record.data.dossier.identification.gender),
      traits: record.data.dossier.operational.reputationMarkers,
      goals: record.data.dossier.psych.motivations
    };

    let upserted: Record<string, unknown> | undefined;
    try {
      const rows = await upsertRows(
        'characters',
        [
          {
            slug: record.id,
            owner_id: ownerId,
            hero: record.data.hero,
            dossier: record.data.dossier,
            profile
          }
        ],
        { onConflict: 'slug', returning: 'representation' }
      );
      upserted = Array.isArray(rows) ? (rows[0] as Record<string, unknown>) : undefined;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Failed to upsert character ${record.id}:`, message);
      process.exit(1);
    }

    const characterId = typeof upserted?.id === 'string' ? upserted.id : undefined;
    if (!characterId) {
      console.error(`Supabase did not return a character row for ${record.id}.`);
      process.exit(1);
    }

    const contextIndex = new Map<string, LoreMetadataContext>();
    for (const slice of record.bundle.contextSlices) {
      contextIndex.set(slice.id, {
        id: slice.id,
        title: slice.title,
        content: slice.content,
        tags: slice.tags
      });
    }

    const historyEntries = createHistoryEntries(record, contextIndex);
    const timelineEntries = createTimelineEntries(record);
    const logEntries = createLogEntries(record, contextIndex);
    const dossierEntries = record.bundle.contextSlices
      .filter((slice) => slice.source === 'dossier')
      .map<InsertLoreEntry>((slice, index) => ({
        character_id: '',
        slug: `dossier-${index + 1}`,
        source: 'dossier',
        title: slice.title,
        content: slice.content,
        tags: slice.tags,
        order_index: index + 1,
        metadata: {
          ...buildContext({
            id: slice.id,
            title: slice.title,
            content: slice.content,
            tags: slice.tags
          }),
          contextOnly: true
        }
      }));

    const entries: InsertLoreEntry[] = [
      ...dossierEntries,
      ...historyEntries,
      ...timelineEntries,
      ...logEntries
    ].map((entry) => ({
      ...entry,
      character_id: characterId
    }));

    try {
      await deleteRows('lore_entries', `character_id=eq.${characterId}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Failed to clear lore entries for ${record.id}:`, message);
      process.exit(1);
    }

    if (entries.length > 0) {
      try {
        await insertRows('lore_entries', entries);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`Failed to insert lore entries for ${record.id}:`, message);
        process.exit(1);
      }
    }

    console.log(`Seeded lore for ${record.id}.`);
  }

  console.log(`Completed lore import for ${records.length} character${records.length === 1 ? '' : 's'}.`);
})();
