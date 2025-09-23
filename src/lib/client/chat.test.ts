import { describe, expect, it, vi } from 'vitest';
import type { ChatMessage } from '$lib/types/chat';
import { sendChatMessage } from './chat';

function createMockResponse(body: unknown, init: ResponseInit = { status: 200 }): Response {
  return new Response(JSON.stringify(body), {
    headers: { 'content-type': 'application/json' },
    ...init
  });
}

describe('sendChatMessage', () => {
  it('posts the message and history to the chat endpoint', async () => {
    const history: ChatMessage[] = [
      { role: 'user', content: 'Hello' },
      { role: 'assistant', content: 'Greetings' }
    ];
    const fetcher = vi.fn().mockResolvedValue(createMockResponse({ response: 'Hey there' }));

    const result = await sendChatMessage({ message: 'How are you?', history, fetcher });

    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(fetcher).toHaveBeenCalledWith('/api/chat', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        message: 'How are you?',
        history
      })
    });
    expect(result).toEqual({ response: 'Hey there' });
  });

  it('throws when the endpoint responds with a non-OK status', async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValue(createMockResponse({ error: 'Bad things' }, { status: 500, statusText: 'Internal Error' }));

    await expect(sendChatMessage({ message: 'Test', fetcher })).rejects.toThrow(
      'Chat request failed with status 500'
    );
  });

  it('throws when the response payload is missing the response field', async () => {
    const fetcher = vi.fn().mockResolvedValue(createMockResponse({ something: 'else' }));

    await expect(sendChatMessage({ message: 'Test', fetcher })).rejects.toThrow(
      'Invalid payload from chat endpoint'
    );
  });
});
