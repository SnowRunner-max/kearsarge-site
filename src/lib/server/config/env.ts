import { env } from '$env/dynamic/private';

export function getLlamaServiceUrl(): string {
  return env.LLAMA_CPP_URL?.trim() || 'http://localhost:8080';
}
