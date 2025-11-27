import { describe, it, expect } from 'vitest';
import { buildChatPrompt } from '../../src/lib/server/chat/prompt';
import { tundraSystemPrompt } from '../../src/lib/server/chat/prompts/tundra';
import type { ChatMessage } from '../../src/lib/types/chat';

describe('buildChatPrompt', () => {
    it('should format a simple user message with system prompt', () => {
        const result = buildChatPrompt({
            userMessage: 'Hello Tundra'
        });

        expect(result).toContain(tundraSystemPrompt.trim()); // Part of system prompt
        expect(result).toContain('Human: Hello Tundra');
        expect(result).toContain('Tundra:');
    });

    it('should include conversation history', () => {
        const history: ChatMessage[] = [
            { role: 'user', content: 'Who are you?' },
            { role: 'assistant', content: 'I am an operative.' }
        ];

        const result = buildChatPrompt({
            userMessage: 'What is your mission?',
            history
        });

        expect(result).toContain('Human: Who are you?');
        expect(result).toContain('Tundra: I am an operative.');
        expect(result).toContain('Human: What is your mission?');
    });

    it('should include context slices when provided', () => {
        const contextSlices = [
            'Tundra prefers cold climates.',
            'Tyrium is a volatile element.'
        ];

        const result = buildChatPrompt({
            userMessage: 'Tell me about yourself',
            contextSlices
        });

        expect(result).toContain('--- CONTEXT ---');
        expect(result).toContain('Tundra prefers cold climates.');
        expect(result).toContain('Tyrium is a volatile element.');
    });

    it('should ignore empty history entries', () => {
        const history: ChatMessage[] = [
            { role: 'user', content: '   ' }, // Should be ignored
            { role: 'assistant', content: 'Valid response' }
        ];

        const result = buildChatPrompt({
            userMessage: 'Next',
            history
        });

        expect(result).not.toContain('Human:    ');
        expect(result).toContain('Tundra: Valid response');
    });
});
