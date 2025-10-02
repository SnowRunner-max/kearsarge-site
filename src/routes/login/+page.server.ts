import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ locals, url }) => {
  if (locals.user) {
    const redirectTo = url.searchParams.get('redirectTo') ?? '/';
    throw redirect(303, redirectTo);
  }

  return {
    title: 'Sign in — Seyfert Systems',
    user: locals.user
  };
};
