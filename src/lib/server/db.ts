import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';

const supabaseUrl = env.SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SERVICE_ROLE; // Use service role for server-side data fetching to bypass RLS if needed, or just standard key if public read is allowed. 
// Actually, for reading public lore, the anon key is fine. But for admin tasks or if we want to be sure, service role is powerful.
// However, usually we use the anon key for client-side and service role for server-side admin.
// Given this is a server-side module, we can use the service role key if we want to ensure we can read everything regardless of RLS, 
// but for public lore, anon key should suffice if policies are set up correctly.
// Let's stick to the pattern in auth/supabase.ts which uses env vars.
// But wait, auth/supabase.ts uses public vars? No, it uses $env/dynamic/private.

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY/SERVICE_ROLE environment variables.');
}

export const db = createClient(supabaseUrl, supabaseKey);
