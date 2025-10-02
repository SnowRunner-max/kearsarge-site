import { env } from '$env/dynamic/private';

interface SupabaseConfig {
  url: string;
  key: string;
}

class SupabaseConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SupabaseConfigError';
  }
}

let cachedConfig: SupabaseConfig | null = null;

function sanitizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, '');
}

export function requireSupabaseConfig(): SupabaseConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  const url = env.SUPABASE_URL?.trim();
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY?.trim() || env.SUPABASE_ANON_KEY?.trim();

  if (!url) {
    throw new SupabaseConfigError('SUPABASE_URL is not configured.');
  }

  if (!serviceKey) {
    throw new SupabaseConfigError('SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY) is not configured.');
  }

  cachedConfig = { url: sanitizeBaseUrl(url), key: serviceKey };
  return cachedConfig;
}

export interface SupabaseRestOptions {
  method?: string;
  headers?: HeadersInit;
  body?: unknown;
  searchParams?: Record<string, string> | URLSearchParams;
  signal?: AbortSignal;
}

export async function supabaseRest(path: string, options: SupabaseRestOptions = {}): Promise<Response> {
  const config = requireSupabaseConfig();
  const baseUrl = sanitizeBaseUrl(config.url);
  const url = new URL(path, `${baseUrl}/`);

  if (options.searchParams) {
    const params = options.searchParams instanceof URLSearchParams
      ? options.searchParams
      : new URLSearchParams(options.searchParams);
    params.forEach((value, key) => {
      url.searchParams.append(key, value);
    });
  }

  const headers = new Headers(options.headers);
  headers.set('apikey', config.key);
  headers.set('Authorization', `Bearer ${config.key}`);

  let body: BodyInit | undefined;
  if (options.body !== undefined) {
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
  }

  return fetch(url.toString(), {
    method: options.method ?? 'GET',
    headers,
    body,
    signal: options.signal
  });
}

export async function supabaseJson<T>(path: string, options: SupabaseRestOptions = {}): Promise<T> {
  const response = await supabaseRest(path, options);
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Supabase request failed (${response.status}): ${detail}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}
