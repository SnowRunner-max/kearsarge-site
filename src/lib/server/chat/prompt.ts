import type { ChatMessage } from '$lib/types/chat';
import { tundraSystemPrompt } from './prompts/tundra';

interface BuildChatPromptInput {
  userMessage: string;
  history?: ChatMessage[];
  contextSlices?: string[];
  scenario?: string[];
}

const USER_LABEL = 'Human';
const ASSISTANT_LABEL = 'Tundra';

export function buildChatPrompt({
  userMessage,
  history = [],
  contextSlices = [],
  scenario = []
}: BuildChatPromptInput): string {
  const trimmedUserMessage = userMessage.trim();
  const relevantHistory = history.filter((entry) => entry.content.trim().length > 0);
  const scenarioText = scenario.join('\n\n');

  const sections: string[] = [tundraSystemPrompt.trim()];

  if (scenarioText) {
    sections.push(`Scene: ${scenarioText}`);
  }
  if (contextSlices.length > 0) {
    sections.push('--- CONTEXT ---');
    sections.push(contextSlices.join('\n\n'));
  }

  const dialogueLines: string[] = [];

  for (const turn of relevantHistory) {
    const label = turn.role === 'assistant' ? ASSISTANT_LABEL : USER_LABEL;
    dialogueLines.push(`${label}: ${turn.content}`);
    dialogueLines.push('');
  }

  dialogueLines.push(`${USER_LABEL}: ${trimmedUserMessage}`);
  dialogueLines.push('');
  dialogueLines.push(`${ASSISTANT_LABEL}:`);

  sections.push(dialogueLines.join('\n').trim());

  return sections.join('\n\n');
}
