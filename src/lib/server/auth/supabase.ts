import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import type { Cookies } from '@sveltejs/kit';
import { error as kitError } from '@sveltejs/kit';
import type { SupabaseAuthResponse, SupabaseSession, SupabaseUser } from '$lib/types/auth';

const ACCESS_TOKEN_COOKIE = 'sb-access-token';
const REFRESH_TOKEN_COOKIE = 'sb-refresh-token';

interface SupabaseConfig {
  url: string;
  anonKey: string;
}

interface SupabaseSessionPayload {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in?: number;
  expires_at?: number;
  user: SupabaseUser;
}

export class SupabaseAuthError extends Error {
  public status: number;

  constructor(message: string, status: number, options?: ErrorOptions) {
    super(message, options);
    this.name = 'SupabaseAuthError';
    this.status = status;
  }
}

function resolveConfig(): SupabaseConfig | null {
  const url = env.SUPABASE_URL ?? '';
  const anonKey = env.SUPABASE_ANON_KEY ?? '';
  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

export function isSupabaseConfigured(): boolean {
  return resolveConfig() !== null;
}

function requireConfig(): SupabaseConfig {
  const config = resolveConfig();
  if (!config) {
    throw new SupabaseAuthError('Supabase credentials are not configured.', 500);
  }
  return config;
}

function createHeaders(init?: HeadersInit): Headers {
  const headers = new Headers(init);
  const { anonKey } = requireConfig();
  if (!headers.has('apikey')) {
    headers.set('apikey', anonKey);
  }
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  return headers;
}

async function supabaseFetch(
  fetcher: typeof fetch,
  path: string,
  init?: RequestInit
): Promise<Response> {
  const { url } = requireConfig();
  const headers = createHeaders(init?.headers);
  const response = await fetcher(`${url}${path}`, {
    ...init,
    headers
  });
  return response;
}

function toSession(payload: SupabaseSessionPayload): SupabaseSession {
  const expiresAt = typeof payload.expires_at === 'number' ? payload.expires_at : null;
  return {
    accessToken: payload.access_token,
    refreshToken: payload.refresh_token ?? null,
    tokenType: payload.token_type,
    expiresAt
  };
}

function computeAccessMaxAge(expiresAt: number | null, expiresIn?: number): number | undefined {
  if (typeof expiresAt === 'number') {
    const secondsUntilExpiry = expiresAt - Math.floor(Date.now() / 1000);
    if (secondsUntilExpiry > 0) {
      return secondsUntilExpiry;
    }
  }
  if (typeof expiresIn === 'number' && expiresIn > 0) {
    return expiresIn;
  }
  return undefined;
}

export function applySessionCookies(cookies: Cookies, session: SupabaseSession, expiresIn?: number): void {
  const accessMaxAge = computeAccessMaxAge(session.expiresAt, expiresIn);
  const refreshMaxAge = 60 * 60 * 24 * 30; // 30 days

  cookies.set(ACCESS_TOKEN_COOKIE, session.accessToken, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: !dev,
    maxAge: accessMaxAge
  });

  if (session.refreshToken) {
    cookies.set(REFRESH_TOKEN_COOKIE, session.refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: !dev,
      maxAge: refreshMaxAge
    });
  }
}

export function clearSessionCookies(cookies: Cookies): void {
  cookies.delete(ACCESS_TOKEN_COOKIE, { path: '/' });
  cookies.delete(REFRESH_TOKEN_COOKIE, { path: '/' });
}

export async function signUpWithEmail({
  fetcher,
  email,
  password
}: {
  fetcher: typeof fetch;
  email: string;
  password: string;
}): Promise<SupabaseAuthResponse> {
  const response = await supabaseFetch(fetcher, '/auth/v1/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = typeof payload?.message === 'string' ? payload.message : 'Unable to sign up.';
    throw new SupabaseAuthError(message, response.status);
  }

  const sessionPayload =
    (payload?.session as SupabaseSessionPayload | undefined) ??
    (typeof payload?.access_token === 'string' ? (payload as SupabaseSessionPayload) : undefined);

  if (!sessionPayload || !payload?.user) {
    throw new SupabaseAuthError('Supabase signup did not return a session.', 500);
  }

  return {
    user: payload.user as SupabaseUser,
    session: toSession(sessionPayload)
  };
}

export async function signInWithEmail({
  fetcher,
  email,
  password
}: {
  fetcher: typeof fetch;
  email: string;
  password: string;
}): Promise<SupabaseAuthResponse> {
  const response = await supabaseFetch(fetcher, '/auth/v1/token?grant_type=password', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = typeof payload?.error_description === 'string'
      ? payload.error_description
      : typeof payload?.message === 'string'
        ? payload.message
        : 'Invalid email or password.';
    throw new SupabaseAuthError(message, response.status === 400 ? 401 : response.status);
  }

  const sessionPayload = payload as SupabaseSessionPayload;

  return {
    user: sessionPayload.user,
    session: toSession(sessionPayload)
  };
}

export async function signOut({
  fetcher,
  accessToken,
  refreshToken
}: {
  fetcher: typeof fetch;
  accessToken: string | null;
  refreshToken: string | null;
}): Promise<void> {
  if (!refreshToken) {
    return;
  }

  await supabaseFetch(fetcher, '/auth/v1/logout', {
    method: 'POST',
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : ''
    },
    body: JSON.stringify({ refresh_token: refreshToken })
  }).catch((error) => {
    console.error('Failed to revoke Supabase session', error);
  });
}

export async function getUserFromAccessToken(
  fetcher: typeof fetch,
  accessToken: string
): Promise<SupabaseUser | null> {
  const response = await supabaseFetch(fetcher, '/auth/v1/user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (response.status === 401 || response.status === 403) {
    return null;
  }

  if (!response.ok) {
    throw new SupabaseAuthError('Failed to validate Supabase session.', response.status);
  }

  const payload = (await response.json()) as SupabaseUser;
  return payload;
}

export async function refreshSession(
  fetcher: typeof fetch,
  refreshToken: string
): Promise<SupabaseAuthResponse> {
  const response = await supabaseFetch(fetcher, '/auth/v1/token?grant_type=refresh_token', {
    method: 'POST',
    body: JSON.stringify({ refresh_token: refreshToken })
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = typeof payload?.message === 'string' ? payload.message : 'Unable to refresh session.';
    throw new SupabaseAuthError(message, response.status === 400 ? 401 : response.status);
  }

  const sessionPayload = payload as SupabaseSessionPayload;

  return {
    user: sessionPayload.user,
    session: toSession(sessionPayload)
  };
}

export function getSessionCookies(cookies: Cookies): { accessToken: string | null; refreshToken: string | null } {
  return {
    accessToken: cookies.get(ACCESS_TOKEN_COOKIE) ?? null,
    refreshToken: cookies.get(REFRESH_TOKEN_COOKIE) ?? null
  };
}

export function ensureSupabaseConfigured(): void {
  if (!isSupabaseConfigured()) {
    throw kitError(500, 'Supabase credentials are not configured on the server.');
  }
}

export { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE };
