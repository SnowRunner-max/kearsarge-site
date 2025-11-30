import { getLlamaServiceUrl } from '../config/env';

export interface CompletionParameters {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  minP?: number;
  stop?: string[];
  repeatPenalty?: number;
}

interface LlamaCompletionResponse {
  content?: string;
  [key: string]: unknown;
}

export async function requestCompletion({
  prompt,
  maxTokens = 400,
  temperature = 1.0,
  minP = 0.05,
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
      min_p: minP,
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
