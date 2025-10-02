import { describe, expect, it, vi, beforeEach } from 'vitest';

vi.mock('$lib/server/llm/llama', () => ({
  requestCompletion: vi.fn()
}));

import { requestCompletion } from '$lib/server/llm/llama';
import { POST } from './+server';

const requestCompletionMock = vi.mocked(requestCompletion);

function createEvent(body: unknown): { request: Request; locals: { user: { id: string } } } {
  const request = new Request('http://localhost/api/chat', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: typeof body === 'string' ? body : JSON.stringify(body)
  });

  return { request, locals: { user: { id: 'test-user' } } };
}

describe('POST /api/chat', () => {
  beforeEach(() => {
    requestCompletionMock.mockReset();
  });

  it('returns 401 when the request is not authenticated', async () => {
    await expect(() => POST({ request: createEvent({ message: 'Hello' }).request, locals: { user: null } } as any)).rejects.toHaveProperty(
      'status',
      401
    );
  });

  it('returns 400 when the payload is not valid JSON', async () => {
    const response = await POST(createEvent('{') as any);

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: 'Invalid JSON payload.' });
  });

  it('returns 400 when the message is missing or blank', async () => {
    const response = await POST(createEvent({ message: '   ' }) as any);

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: 'Message is required.' });
  });

  it('sanitizes history and forwards the prompt to llama.cpp', async () => {
    requestCompletionMock.mockResolvedValue('LLM ack');

    const rawHistory = [
      { role: 'user', content: '  Ignored   ' },
      { role: 'assistant', content: '  Also ignored ' },
      { role: 'assistant', content: '' },
      { role: 'system', content: 'nope' },
      'noise',
      ...Array.from({ length: 14 }, (_, index) => ({
        role: index % 2 === 0 ? 'user' : 'assistant',
        content: ` Message ${index} `
      }))
    ];

    const response = await POST(
      createEvent({
        message: "   Let's talk power.  ",
        history: rawHistory
      }) as any
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ response: 'LLM ack' });

    expect(requestCompletionMock).toHaveBeenCalledTimes(1);
    const promptArg = requestCompletionMock.mock.calls[0][0]?.prompt as string;

    expect(promptArg).toContain('Human: Message 2');
    expect(promptArg).toContain('Tundra: Message 3');
    expect(promptArg).not.toContain('Message 0');
    expect(promptArg).toContain("Human: Let's talk power.");
    expect(promptArg.trim().endsWith('Tundra:')).toBe(true);
  });

  it('falls back to a canned line when llama.cpp returns an empty string', async () => {
    requestCompletionMock.mockResolvedValue('');

    const response = await POST(createEvent({ message: 'Hello' }) as any);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      response: "*Tundra tilts his head.* I lost the thread there -- give me another cue?"
    });
  });

  it('returns 502 when llama.cpp cannot be reached', async () => {
    requestCompletionMock.mockRejectedValue(new Error('offline'));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const response = await POST(createEvent({ message: 'Test' }) as any);

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({ error: 'Unable to contact Tyrium relay.' });

    consoleSpy.mockRestore();
  });
});
