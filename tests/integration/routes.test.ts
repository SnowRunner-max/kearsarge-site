import { describe, it, expect, vi } from 'vitest';
import { load as loadLogin } from '../../src/routes/login/+page.server';
import { load as loadLayout } from '../../src/routes/+layout.server';
import { redirect } from '@sveltejs/kit';

describe('Login Page Load', () => {
    it('should return data when user is not logged in', async () => {
        const locals = { user: null };
        const url = new URL('http://localhost/login');

        const result = await loadLogin({ locals, url } as any);

        expect(result).toEqual({
            title: 'Sign in — Seyfert Systems',
            user: null
        });
    });

    it('should redirect when user is already logged in', async () => {
        const locals = { user: { id: 'test-user', username: 'test' } };
        const url = new URL('http://localhost/login');

        try {
            await loadLogin({ locals, url } as any);
            expect.fail('Should have thrown a redirect');
        } catch (e: any) {
            expect(e.status).toBe(303);
            expect(e.location).toBe('/');
        }
    });

    it('should redirect to specified return URL when logged in', async () => {
        const locals = { user: { id: 'test-user', username: 'test' } };
        const url = new URL('http://localhost/login?redirectTo=/dashboard');

        try {
            await loadLogin({ locals, url } as any);
            expect.fail('Should have thrown a redirect');
        } catch (e: any) {
            expect(e.status).toBe(303);
            expect(e.location).toBe('/dashboard');
        }
    });
});

describe('Layout Load (Global Auth)', () => {
    it('should redirect unauthenticated users accessing protected routes', async () => {
        const locals = { user: null };
        const url = new URL('http://localhost/'); // Protected route

        try {
            await loadLayout({ locals, url } as any);
            expect.fail('Should have thrown a redirect');
        } catch (e: any) {
            expect(e.status).toBe(303);
            expect(e.location).toBe('/login?redirectTo=%2F');
        }
    });

    it('should allow access to public routes without auth', async () => {
        const locals = { user: null };
        const url = new URL('http://localhost/login'); // Public route

        const result = await loadLayout({ locals, url } as any);

        expect(result).toEqual({
            title: 'Seyfert Systems',
            user: null
        });
    });

    it('should allow authenticated users to access protected routes', async () => {
        const user = { id: 'test-user', username: 'test' };
        const locals = { user };
        const url = new URL('http://localhost/');

        const result = await loadLayout({ locals, url } as any);

        expect(result).toEqual({
            title: 'Seyfert Systems',
            user
        });
    });
});
