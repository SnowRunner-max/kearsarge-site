import { describe, expect, it } from 'vitest';
import { tundraSystemPrompt } from './prompts/tundra';
import { buildChatPrompt } from './prompt';

describe('buildChatPrompt', () => {
  it('includes the system prompt, context, history, and trimmed user message', () => {
    const prompt = buildChatPrompt({
      userMessage: '  Report status  ',
      history: [
        { role: 'user', content: 'First contact' },
        { role: 'assistant', content: 'Acknowledged' }
      ],
      contextSlices: ['Lore fragment A', 'Lore fragment B']
    });

    const expected = [
      tundraSystemPrompt.trim(),
      '--- CONTEXT ---',
      'Lore fragment A\n\nLore fragment B',
      ['Human: First contact', '', 'Tundra: Acknowledged', '', 'Human: Report status', '', 'Tundra:'].join('\n')
    ].join('\n\n');

    expect(prompt).toBe(expected);
  });

  it('omits context sections and empty history entries', () => {
    const prompt = buildChatPrompt({
      userMessage: '   Ping   ',
      history: [
        { role: 'user', content: '   ' },
        { role: 'assistant', content: '' }
      ]
    });

    expect(prompt.startsWith(tundraSystemPrompt.trim())).toBe(true);
    expect(prompt).not.toContain('--- CONTEXT ---');
    expect(prompt).toContain('Human: Ping');
    expect(prompt).toContain('Tundra:');
    expect(prompt).not.toContain('Human:    ');
  });
});
