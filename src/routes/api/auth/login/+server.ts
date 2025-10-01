import { json } from '@sveltejs/kit';
import { z } from 'zod';
import type { RequestHandler } from './$types';
import {
  applySessionCookies,
  isSupabaseConfigured,
  signInWithEmail,
  SupabaseAuthError
} from '$lib/server/auth/supabase';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const POST: RequestHandler = async ({ request, fetch, cookies }) => {
  if (!isSupabaseConfigured()) {
    return json({ error: 'Supabase authentication is not configured.' }, { status: 500 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(payload);
  if (!parsed.success) {
    return json({ error: 'Email and password are required.' }, { status: 400 });
  }

  try {
    const result = await signInWithEmail({
      fetcher: fetch,
      email: parsed.data.email,
      password: parsed.data.password
    });

    applySessionCookies(cookies, result.session);

    return json({ user: result.user });
  } catch (error) {
    if (error instanceof SupabaseAuthError) {
      const status = error.status ?? 500;
      return json({ error: error.message }, { status });
    }

    console.error('Login failed', error);
    return json({ error: 'Unable to complete login.' }, { status: 500 });
  }
};
