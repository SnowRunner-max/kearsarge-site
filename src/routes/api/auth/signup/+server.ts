import { json } from '@sveltejs/kit';
import { z } from 'zod';
import type { RequestHandler } from './$types';
import {
  applySessionCookies,
  isSupabaseConfigured,
  signUpWithEmail,
  SupabaseAuthError
} from '$lib/server/auth/supabase';

const signupSchema = z.object({
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

  const parsed = signupSchema.safeParse(payload);
  if (!parsed.success) {
    return json({ error: 'Email and password are required.' }, { status: 400 });
  }

  try {
    const result = await signUpWithEmail({
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

    console.error('Signup failed', error);
    return json({ error: 'Unable to complete signup.' }, { status: 500 });
  }
};
