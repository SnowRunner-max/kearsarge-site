import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

import { tundraKarsvaldr } from '../src/lib/data/characters/tundra-karsvaldr';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '..');
const contentRoot = join(rootDir, 'content', 'characters', 'tundra');

function ensureDir(path: string) {
  mkdirSync(path, { recursive: true });
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function writeFile(relativePath: string, body: string) {
  const target = join(contentRoot, relativePath);
  ensureDir(dirname(target));
  writeFileSync(target, body, 'utf8');
}

function exportCharacter() {
  const { hero, dossier } = tundraKarsvaldr;
  const frontMatter = {
    id: 'tundra-karsvaldr',
    hero,
    dossier
  };

  const document = matter.stringify('', frontMatter, { lineWidth: 120 });
  writeFile('character.md', document);
}

function exportHistory() {
  const historyDir = 'history';
  ensureDir(join(contentRoot, historyDir));

  tundraKarsvaldr.history.forEach((section, index) => {
    const slug = `${String(index + 1).padStart(2, '0')}-${slugify(section.title)}`;
    const frontMatter = {
      title: section.title,
      order: index + 1
    };
    const body = section.body.join('\n\n');
    const document = matter.stringify(body, frontMatter, { lineWidth: 120 });
    writeFile(join(historyDir, `${slug}.md`), document);
  });
}

function exportTimeline() {
  const timelineDir = 'timeline';
  ensureDir(join(contentRoot, timelineDir));

  tundraKarsvaldr.timeline.forEach((entry, index) => {
    const slug = `${String(index + 1).padStart(2, '0')}-${slugify(entry.title)}`;
    const frontMatter = {
      title: entry.title,
      order: index + 1
    };
    const body = entry.body.map((line) => `- ${line}`).join('\n');
    const document = matter.stringify(body, frontMatter, { lineWidth: 120 });
    writeFile(join(timelineDir, `${slug}.md`), document);
  });
}

function exportLogs() {
  const logsDir = 'logs';
  ensureDir(join(contentRoot, logsDir));

  tundraKarsvaldr.logs.forEach((log, index) => {
    const slug = `${String(index + 1).padStart(2, '0')}-${slugify(log.title)}`;
    const frontMatter = {
      id: log.id,
      title: log.title,
      filedBy: log.filedBy,
      date: log.date
    };
    const body = log.body.trim();
    const document = matter.stringify(`${body}\n`, frontMatter, { lineWidth: 120 });
    writeFile(join(logsDir, `${slug}.md`), document);
  });
}

exportCharacter();
exportHistory();
exportTimeline();
exportLogs();

console.log('Lore exported from TypeScript data.');
