import { describe, it, expect, vi } from 'vitest';
import { load } from '../../src/routes/login/+page.server';
import { redirect } from '@sveltejs/kit';

describe('Login Page Load', () => {
    it('should return data when user is not logged in', async () => {
        const locals = { user: null };
        const url = new URL('http://localhost/login');

        const result = await load({ locals, url } as any);

        expect(result).toEqual({
            title: 'Sign in — Seyfert Systems',
            user: null
        });
    });

    it('should redirect when user is already logged in', async () => {
        const locals = { user: { id: 'test-user', username: 'test' } };
        const url = new URL('http://localhost/login');

        try {
            await load({ locals, url } as any);
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
            await load({ locals, url } as any);
            expect.fail('Should have thrown a redirect');
        } catch (e: any) {
            expect(e.status).toBe(303);
            expect(e.location).toBe('/dashboard');
        }
    });
});
