import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { requestCompletion } from '../../src/lib/server/llm/llama';

// Mock the global fetch
const fetchMock = vi.fn();
global.fetch = fetchMock;

describe('requestCompletion', () => {
    beforeEach(() => {
        fetchMock.mockReset();
        // Default mock implementation for env var
        vi.stubEnv('LLAMA_CPP_URL', 'http://localhost:8080');
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('should call the correct endpoint with parameters', async () => {
        fetchMock.mockResolvedValue({
            ok: true,
            json: async () => ({ content: 'Test response' })
        });

        const response = await requestCompletion({
            prompt: 'Test prompt',
            maxTokens: 100
        });

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/completion', expect.objectContaining({
            method: 'POST',
            body: expect.stringContaining('"prompt":"Test prompt"')
        }));
        expect(fetchMock).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
            body: expect.stringContaining('"max_tokens":100')
        }));
        expect(response).toBe('Test response');
    });

    it('should throw an error if the response is not ok', async () => {
        fetchMock.mockResolvedValue({
            ok: false,
            status: 500,
            text: async () => 'Internal Server Error'
        });

        await expect(requestCompletion({ prompt: 'fail' }))
            .rejects
            .toThrow('llama.cpp error (500): Internal Server Error');
    });

    it('should handle empty response content gracefully', async () => {
        fetchMock.mockResolvedValue({
            ok: true,
            json: async () => ({ content: null }) // Malformed or empty
        });

        const response = await requestCompletion({ prompt: 'empty' });
        expect(response).toBe('');
    });
});
