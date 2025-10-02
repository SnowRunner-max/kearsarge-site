import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { loadLoreRecords } from './lib/lore';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '..');
const cacheDir = join(rootDir, '.cache');
const outputFile = join(cacheDir, 'lore-preview.json');

function ensureDir(path: string): void {
  mkdirSync(path, { recursive: true });
}

(function build(): void {
  const records = loadLoreRecords();
  const summary = records.map((record) => ({
    id: record.id,
    historyCount: record.data.history.length,
    timelineCount: record.data.timeline.length,
    logCount: record.data.logs.length,
    contextCount: record.bundle.contextSlices.length
  }));

  ensureDir(cacheDir);
  writeFileSync(outputFile, JSON.stringify({ generatedAt: new Date().toISOString(), summary }, null, 2));
  console.log(`Validated ${records.length} lore bundle${records.length === 1 ? '' : 's'}. Cache written to ${outputFile}.`);
})();
