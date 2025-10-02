export interface SupabaseUser {
  id: string;
  email?: string | null;
  phone?: string | null;
  role?: string;
  [key: string]: unknown;
}

export interface SupabaseSession {
  accessToken: string;
  refreshToken: string | null;
  expiresAt: number | null;
  tokenType: string;
}

export interface SupabaseAuthResponse {
  user: SupabaseUser;
  session: SupabaseSession;
}
