import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies before importing the handler
vi.mock('$lib/server/auth/supabase', () => ({
    isSupabaseConfigured: vi.fn(),
    signInWithEmail: vi.fn(),
    signOut: vi.fn(),
    applySessionCookies: vi.fn(),
    getSessionCookies: vi.fn(),
    clearSessionCookies: vi.fn(),
    SupabaseAuthError: class extends Error {
        status: number;
        constructor(message: string, status = 500) {
            super(message);
            this.status = status;
        }
    }
}));

import { POST as loginHandler } from '../../src/routes/api/auth/login/+server';
import { POST as logoutHandler } from '../../src/routes/api/auth/logout/+server';
import { isSupabaseConfigured, signInWithEmail, signOut, applySessionCookies, clearSessionCookies, getSessionCookies } from '$lib/server/auth/supabase';

const isSupabaseConfiguredMock = vi.mocked(isSupabaseConfigured);
const signInWithEmailMock = vi.mocked(signInWithEmail);
const signOutMock = vi.mocked(signOut);
const applySessionCookiesMock = vi.mocked(applySessionCookies);
const clearSessionCookiesMock = vi.mocked(clearSessionCookies);

function createRequest(body: unknown) {
    return new Request('http://localhost/api/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
    });
}

describe('API Integration Tests', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        isSupabaseConfiguredMock.mockReturnValue(true);
    });

    describe('POST /api/auth/login', () => {
        it('returns 500 if Supabase is not configured', async () => {
            isSupabaseConfiguredMock.mockReturnValue(false);
            const request = createRequest({ email: 'test@example.com', password: 'password123' });

            const response = await loginHandler({ request, fetch: vi.fn(), cookies: {} as any } as any);

            expect(response.status).toBe(500);
            await expect(response.json()).resolves.toEqual({ error: 'Supabase authentication is not configured.' });
        });

        it('returns 400 for invalid payload', async () => {
            const request = new Request('http://localhost/api/auth/login', {
                method: 'POST',
                body: 'invalid-json'
            });

            const response = await loginHandler({ request, fetch: vi.fn(), cookies: {} as any } as any);

            expect(response.status).toBe(400);
            await expect(response.json()).resolves.toEqual({ error: 'Invalid JSON payload.' });
        });

        it('returns 400 for missing credentials', async () => {
            const request = createRequest({ email: 'test@example.com' }); // Missing password

            const response = await loginHandler({ request, fetch: vi.fn(), cookies: {} as any } as any);

            expect(response.status).toBe(400);
            await expect(response.json()).resolves.toEqual({ error: 'Email and password are required.' });
        });

        it('returns user and sets cookies on success', async () => {
            const mockUser = { id: 'user-1', email: 'test@example.com' };
            const mockSession = { access_token: 'token' };
            signInWithEmailMock.mockResolvedValue({ user: mockUser, session: mockSession } as any);

            const request = createRequest({ email: 'test@example.com', password: 'password123' });
            const cookies = { set: vi.fn() };

            const response = await loginHandler({ request, fetch: vi.fn(), cookies: cookies as any } as any);

            expect(response.status).toBe(200);
            await expect(response.json()).resolves.toEqual({ user: mockUser });
            expect(applySessionCookiesMock).toHaveBeenCalledWith(cookies, mockSession);
        });
    });

    describe('POST /api/auth/logout', () => {
        it('clears cookies and calls signOut', async () => {
            const cookies = { delete: vi.fn(), get: vi.fn() };
            const getSessionCookiesMock = vi.mocked(getSessionCookies);
            getSessionCookiesMock.mockReturnValue({ accessToken: 'token', refreshToken: 'refresh' });

            const response = await logoutHandler({ fetch: vi.fn(), cookies: cookies as any } as any);

            expect(response.status).toBe(200);
            expect(clearSessionCookiesMock).toHaveBeenCalledWith(cookies);
            expect(signOutMock).toHaveBeenCalled();
        });
    });
});
