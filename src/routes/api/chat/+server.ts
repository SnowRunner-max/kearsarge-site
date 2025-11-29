import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { ChatMessage } from '$lib/types/chat';
import { requestCompletion } from '$lib/server/llm/llama';
import { buildChatPrompt } from '$lib/server/chat/prompt';
import { getContextSlicesForPrompt } from '$lib/server/context/loreRepository';

const CHARACTER_ID = 'tundra-karsvaldr';

const MAX_HISTORY_MESSAGES = 12;

interface RawChatPayload {
  message?: unknown;
  history?: unknown;
}

function sanitizeHistory(history: unknown): ChatMessage[] {
  if (!Array.isArray(history)) {
    return [];
  }

  const sanitized: ChatMessage[] = [];

  for (const entry of history) {
    if (!entry || typeof entry !== 'object') {
      continue;
    }

    const candidate = entry as Record<string, unknown>;
    const role = candidate.role;
    const content = candidate.content;

    if ((role === 'user' || role === 'assistant') && typeof content === 'string') {
      sanitized.push({ role, content: content.trim() } as ChatMessage);
    }
  }

  return sanitized
    .filter((message) => message.content.length > 0)
    .slice(-MAX_HISTORY_MESSAGES);
}

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) {
    throw error(401, 'Authentication required.');
  }

  let payload: RawChatPayload;

  try {
    payload = (await request.json()) as RawChatPayload;
  } catch (error) {
    return json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  if (!message) {
    return json({ error: 'Message is required.' }, { status: 400 });
  }

  const history = sanitizeHistory(payload.history);
  const slices = await getContextSlicesForPrompt({
    characterId: CHARACTER_ID,
    query: message,
    limit: 4
  });
  const contextSlices = slices.map((slice) => `# ${slice.title}\n${slice.content}`);

  const prompt = buildChatPrompt({
    userMessage: message,
    history,
    contextSlices
  });

  try {
    const completion = await requestCompletion({ prompt });
    const fallbackResponse =
      '*Tundra tilts his head.* I lost the thread there -- give me another cue?';
    const responseText = completion || fallbackResponse;

    return json({ response: responseText });
  } catch (error) {
    console.error('Chat completion failed', error);
    return json({ error: 'Unable to contact Tyrium relay.' }, { status: 502 });
  }
};
