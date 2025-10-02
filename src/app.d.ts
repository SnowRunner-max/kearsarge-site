// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { SupabaseSession, SupabaseUser } from '$lib/types/auth';

declare global {
  namespace App {
    interface Locals {
      user: SupabaseUser | null;
      session: SupabaseSession | null;
    }
    interface PageData {
      title?: string;
      user: SupabaseUser | null;
    }
    interface LayoutData {
      title: string;
      user: SupabaseUser | null;
    }
    // interface Error {}
    // interface Platform {}
  }
}

export {};
