import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';
import matter, { type GrayMatterFile } from 'gray-matter';
import { z } from 'zod';

import type { CharacterPageData, HistorySection, LogEntry, TimelineEntry } from '../../src/lib/types/character';
import type { CharacterLoreBundle, ContextSlice } from '../../src/lib/types/lore';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '..', '..');
const contentRoot = join(rootDir, 'content', 'characters');

const dossierIdentificationSchema = z.object({
  aliases: z.array(z.string()),
  speciesOrigin: z.string(),
  ageRange: z.string(),
  gender: z.string(),
  appearance: z.object({
    height: z.string(),
    weight: z.string(),
    build: z.string(),
    furPattern: z.string(),
    augmentations: z.string(),
    cybernetics: z.string(),
    attire: z.string()
  })
});

const dossierVesselSchema = z.object({
  shipClass: z.string(),
  designation: z.string(),
  registryStatus: z.string(),
  maintenanceCondition: z.string(),
  capabilities: z.object({
    ftlStatus: z.string(),
    weapons: z.array(z.string()),
    systems: z.array(z.string())
  })
});

const dossierAffiliationsSchema = z.object({
  employersOfRecord: z.array(z.string()),
  contacts: z.array(z.string()),
  factionRelations: z.array(z.object({ faction: z.string(), relation: z.string() }))
});

const dossierOperationalSchema = z.object({
  notableEngagements: z.string(),
  specializations: z.array(z.string()),
  confirmedKills: z.string(),
  reputationMarkers: z.array(z.string())
});

const dossierPsychSchema = z.object({
  temperament: z.array(z.string()),
  motivations: z.array(z.string()),
  weaknesses: z.array(z.string()),
  evaluation: z.string()
});

const dossierThreatSchema = z.object({
  combatRating: z.string(),
  riskToAssets: z.string(),
  containmentOptions: z.array(z.string()),
  recommendation: z.string()
});

const characterFileSchema = z.object({
  id: z.string(),
  hero: z.object({
    name: z.string(),
    tagline: z.string().optional()
  }),
  dossier: z.object({
    classificationLevel: z.string(),
    subject: z.string(),
    fileOrigin: z.string(),
    lastUpdate: z.string(),
    combatClass: z.string(),
    identification: dossierIdentificationSchema,
    currentStatus: z.object({
      status: z.string(),
      classification: z.string(),
      region: z.string()
    }),
    vessel: dossierVesselSchema,
    affiliations: dossierAffiliationsSchema,
    operational: dossierOperationalSchema,
    psych: dossierPsychSchema,
    threat: dossierThreatSchema,
    additionalNotes: z.string().optional()
  })
});

const historyFrontMatterSchema = z.object({
  title: z.string(),
  order: z.coerce.number().int().min(0).optional()
});

const timelineFrontMatterSchema = z.object({
  title: z.string(),
  order: z.coerce.number().int().min(0).optional()
});

const logFrontMatterSchema = z.object({
  id: z.coerce.number().int(),
  title: z.string(),
  filedBy: z.string(),
  date: z.string()
});

export interface CharacterRecord {
  id: string;
  data: CharacterPageData;
  bundle: CharacterLoreBundle;
}

function readMarkdown(filePath: string): GrayMatterFile<string> {
  const raw = readFileSync(filePath, 'utf8');
  return matter(raw);
}

function toParagraphs(markdown: string): string[] {
  return markdown
    .trim()
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}

function toListItems(markdown: string): string[] {
  return markdown
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^[-*]\s+/, '').trim())
    .filter(Boolean);
}

function buildContextSlices(id: string, data: CharacterPageData): ContextSlice[] {
  const slices: ContextSlice[] = [];
  const { hero, dossier } = data;

  const identificationLines = [
    `Name: ${hero.name}`,
    dossier.identification.aliases.length
      ? `Aliases: ${dossier.identification.aliases.join(', ')}`
      : undefined,
    `Species/Origin: ${dossier.identification.speciesOrigin}`,
    `Gender: ${dossier.identification.gender}`,
    `Height: ${dossier.identification.appearance.height}`,
    `Weight: ${dossier.identification.appearance.weight}`,
    `Build: ${dossier.identification.appearance.build}`,
    `Fur Pattern: ${dossier.identification.appearance.furPattern}`,
    `Augmentations: ${dossier.identification.appearance.augmentations}`,
    `Cybernetics: ${dossier.identification.appearance.cybernetics}`
  ].filter(Boolean) as string[];

  slices.push({
    id: `${id}-dossier-identification`,
    characterId: id,
    source: 'dossier',
    title: 'Identification Summary',
    tags: ['identity', 'profile'],
    content: identificationLines.join('\n')
  });

  const operationalLines = [
    `Combat Class: ${dossier.combatClass}`,
    `Notable Engagements: ${dossier.operational.notableEngagements}`,
    `Specializations: ${dossier.operational.specializations.join(', ')}`,
    `Confirmed Kills: ${dossier.operational.confirmedKills}`,
    `Reputation Markers: ${dossier.operational.reputationMarkers.join(', ')}`
  ];

  slices.push({
    id: `${id}-dossier-operational`,
    characterId: id,
    source: 'dossier',
    title: 'Operational Profile',
    tags: ['combat', 'operations'],
    content: operationalLines.join('\n')
  });

  const psychLines = [
    `Temperament: ${dossier.psych.temperament.join(', ')}`,
    `Motivations: ${dossier.psych.motivations.join(', ')}`,
    `Weaknesses: ${dossier.psych.weaknesses.join(', ')}`,
    `Evaluation: ${dossier.psych.evaluation}`
  ];

  slices.push({
    id: `${id}-dossier-psych`,
    characterId: id,
    source: 'dossier',
    title: 'Psychological Profile',
    tags: ['psychology'],
    content: psychLines.join('\n')
  });

  const threatLines = [
    `Combat Rating: ${dossier.threat.combatRating}`,
    `Risk to Assets: ${dossier.threat.riskToAssets}`,
    `Containment Options: ${dossier.threat.containmentOptions.join(', ')}`,
    `Recommendation: ${dossier.threat.recommendation}`
  ];

  slices.push({
    id: `${id}-dossier-threat`,
    characterId: id,
    source: 'dossier',
    title: 'Threat Assessment',
    tags: ['threat', 'risk'],
    content: threatLines.join('\n')
  });

  data.history.forEach((section, index) => {
    slices.push({
      id: `${id}-history-${index + 1}`,
      characterId: id,
      source: 'history',
      title: section.title,
      tags: ['history'],
      content: section.body.join('\n\n')
    });
  });

  data.logs.slice(0, 6).forEach((log, index) => {
    slices.push({
      id: `${id}-log-${log.id}-${index + 1}`,
      characterId: id,
      source: 'log',
      title: log.title,
      tags: ['log'],
      content: log.body
    });
  });

  return slices;
}

function mapHistoryEntries(entries: { title: string; body: string[]; order: number }[]): HistorySection[] {
  return entries
    .sort((a, b) => a.order - b.order)
    .map(({ title, body }) => ({ title, body }));
}

function mapTimelineEntries(entries: { title: string; body: string[]; order: number }[]): TimelineEntry[] {
  return entries
    .sort((a, b) => a.order - b.order)
    .map(({ title, body }) => ({ title, body }));
}

function mapLogEntries(entries: LogEntry[]): LogEntry[] {
  return entries.sort((a, b) => a.id - b.id);
}

function buildCharacterRecord(folderRelativePath: string): CharacterRecord {
  const characterDir = join(contentRoot, folderRelativePath);
  const characterFile = join(characterDir, 'character.md');
  const { data: characterFrontMatter } = readMarkdown(characterFile);
  const parsedCharacter = characterFileSchema.parse(characterFrontMatter);

  const historyFiles = fg.sync('history/*.md', { cwd: characterDir }).sort();
  const history = historyFiles
    .map((relativePath) => {
      const filePath = join(characterDir, relativePath);
      const { data, content } = readMarkdown(filePath);
      const meta = historyFrontMatterSchema.parse(data);
      return {
        order: meta.order ?? Number.POSITIVE_INFINITY,
        title: meta.title,
        body: toParagraphs(content)
      };
    });

  const timelineFiles = fg.sync('timeline/*.md', { cwd: characterDir }).sort();
  const timeline = timelineFiles
    .map((relativePath) => {
      const filePath = join(characterDir, relativePath);
      const { data, content } = readMarkdown(filePath);
      const meta = timelineFrontMatterSchema.parse(data);
      return {
        order: meta.order ?? Number.POSITIVE_INFINITY,
        title: meta.title,
        body: toListItems(content)
      };
    });

  const logsFiles = fg.sync('logs/*.md', { cwd: characterDir }).sort();
  const logs = logsFiles.map((relativePath) => {
    const filePath = join(characterDir, relativePath);
    const { data, content } = readMarkdown(filePath);
    const meta = logFrontMatterSchema.parse(data);
    return {
      id: meta.id,
      title: meta.title,
      filedBy: meta.filedBy,
      date: meta.date,
      body: content.trim()
    } satisfies LogEntry;
  });

  const character: CharacterPageData = {
    hero: parsedCharacter.hero,
    dossier: parsedCharacter.dossier,
    history: mapHistoryEntries(history),
    timeline: mapTimelineEntries(timeline),
    logs: mapLogEntries(logs)
  };

  const contextSlices = buildContextSlices(parsedCharacter.id, character);

  const bundle: CharacterLoreBundle = {
    id: parsedCharacter.id,
    character,
    contextSlices
  };

  return {
    id: parsedCharacter.id,
    data: character,
    bundle
  };
}

export function loadLoreRecords(): CharacterRecord[] {
  const characterFolders = fg.sync('*', {
    cwd: contentRoot,
    onlyDirectories: true
  });

  if (characterFolders.length === 0) {
    throw new Error(`No character content found in ${contentRoot}`);
  }

  return characterFolders.map(buildCharacterRecord);
}

export function buildLoreBundles(): CharacterLoreBundle[] {
  return loadLoreRecords().map((record) => record.bundle);
}
