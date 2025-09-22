export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatRequestPayload {
  message: string;
  history?: ChatMessage[];
}

export interface ChatResponsePayload {
  response: string;
}
