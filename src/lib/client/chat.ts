import type { ChatMessage, ChatResponsePayload } from '$lib/types/chat';

export interface SendChatMessageInput {
  message: string;
  history?: ChatMessage[];
  scenario?: string[];
  fetcher?: typeof fetch;
}

export async function sendChatMessage({
  message,
  history = [],
  scenario = [],
  fetcher = fetch
}: SendChatMessageInput): Promise<ChatResponsePayload> {
  const response = await fetcher('/api/chat', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      message,
      history,
      scenario
    })
  });

  if (!response.ok) {
    throw new Error(`Chat request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as ChatResponsePayload;
  if (!payload || typeof payload.response !== 'string') {
    throw new Error('Invalid payload from chat endpoint');
  }

  return payload;
}
