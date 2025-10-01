import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
  clearSessionCookies,
  getSessionCookies,
  isSupabaseConfigured,
  signOut
} from '$lib/server/auth/supabase';

export const POST: RequestHandler = async ({ fetch, cookies }) => {
  if (isSupabaseConfigured()) {
    const { accessToken, refreshToken } = getSessionCookies(cookies);
    try {
      await signOut({ fetcher: fetch, accessToken, refreshToken });
    } catch (error) {
      console.error('Failed to revoke Supabase session during logout', error);
    }
  }

  clearSessionCookies(cookies);
  return json({ success: true });
};
