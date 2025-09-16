import { describe, it, expect } from 'vitest';
import { getCharacter, listCharacters } from './index';

describe('character registry timeline data', () => {
  it('exposes timeline entries for known characters', () => {
    const character = getCharacter('tundra-karsvaldr');
    expect(character).not.toBeNull();

    const timeline = character!.timeline;
    expect(Array.isArray(timeline)).toBe(true);
    expect(timeline.length).toBeGreaterThan(0);

    for (const entry of timeline) {
      expect(typeof entry.title).toBe('string');
      expect(entry.title.length).toBeGreaterThan(0);
      expect(Array.isArray(entry.body)).toBe(true);
      expect(entry.body.length).toBeGreaterThan(0);
      for (const item of entry.body) {
        expect(typeof item).toBe('string');
        expect(item.length).toBeGreaterThan(0);
      }
    }
  });

  it('keeps timeline context aligned with character metadata', () => {
    const character = getCharacter('tundra-karsvaldr');
    expect(character).not.toBeNull();

    const [first, ...rest] = character!.timeline;
    const last = rest.length > 0 ? rest[rest.length - 1] : first;

    expect(first.title).toBe('2348 - Birth');
    expect(first.body[0]).toContain('Draumveil Crater Colony');

    expect(last.title).toBe('2367 (Age 19) – The Rift Years End');
    expect(last.body[last.body.length - 1]).toContain('Files go silent');

    const roster = listCharacters();
    expect(roster.some((item) => item.slug === 'tundra-karsvaldr')).toBe(true);
  });
});
