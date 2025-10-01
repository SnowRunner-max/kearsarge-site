import type { Handle } from '@sveltejs/kit';
import {
  applySessionCookies,
  clearSessionCookies,
  getSessionCookies,
  getUserFromAccessToken,
  isSupabaseConfigured,
  refreshSession,
  SupabaseAuthError
} from '$lib/server/auth/supabase';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.user = null;
  event.locals.session = null;

  if (!isSupabaseConfigured()) {
    return resolve(event);
  }

  const { accessToken, refreshToken } = getSessionCookies(event.cookies);

  try {
    if (accessToken) {
      const user = await getUserFromAccessToken(event.fetch, accessToken);
      if (user) {
        event.locals.user = user;
        event.locals.session = {
          accessToken,
          refreshToken,
          expiresAt: null,
          tokenType: 'bearer'
        };
        return resolve(event);
      }
    }

    if (refreshToken) {
      const refreshed = await refreshSession(event.fetch, refreshToken);
      applySessionCookies(event.cookies, refreshed.session);

      event.locals.user = refreshed.user;
      event.locals.session = {
        accessToken: refreshed.session.accessToken,
        refreshToken: refreshed.session.refreshToken,
        expiresAt: refreshed.session.expiresAt,
        tokenType: refreshed.session.tokenType
      };
    } else {
      clearSessionCookies(event.cookies);
    }
  } catch (error) {
    if (error instanceof SupabaseAuthError && error.status === 401) {
      clearSessionCookies(event.cookies);
    } else {
      console.error('Failed to resolve Supabase session', error);
      clearSessionCookies(event.cookies);
    }
  }

  return resolve(event);
};
