import { getLlamaServiceUrl } from '../config/env';

export interface CompletionParameters {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  stop?: string[];
  repeatPenalty?: number;
}

interface LlamaCompletionResponse {
  content?: string;
  [key: string]: unknown;
}

export async function requestCompletion({
  prompt,
  maxTokens = 150,
  temperature = 0.8,
  topP = 0.9,
  stop = ['\n\nHuman:', 'Human:', '\n\nTundra:'],
  repeatPenalty = 1.1
}: CompletionParameters): Promise<string> {
  const baseUrl = getLlamaServiceUrl();
  const response = await fetch(`${baseUrl}/completion`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      prompt,
      stream: false,
      max_tokens: maxTokens,
      temperature,
      top_p: topP,
      stop,
      repeat_penalty: repeatPenalty
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`llama.cpp error (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as LlamaCompletionResponse;
  const content = typeof data.content === 'string' ? data.content.trim() : '';

  return content;
}
