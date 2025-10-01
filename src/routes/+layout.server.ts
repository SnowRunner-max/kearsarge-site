import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const prerender = false;

const PUBLIC_ROUTES = ['/login'];

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const requiresAuth = !isPublicRoute(url.pathname);

  if (requiresAuth && !locals.user) {
    const redirectTo = url.pathname + url.search;
    throw redirect(303, `/login?redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  return {
    title: 'Seyfert Systems',
    user: locals.user
  };
};
