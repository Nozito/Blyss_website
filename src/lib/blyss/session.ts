/**
 * Session navigateur (client only). Le backend pose aussi des cookies d'auth,
 * mais on garde les tokens en localStorage pour l'en-tête `Authorization:
 * Bearer` — plus simple en cross-origin (blyssapp.fr → app.blyssapp.fr).
 */
const ACCESS_KEY = 'blyss_access_token';
const REFRESH_KEY = 'blyss_refresh_token';
const USER_KEY = 'blyss_user';

function safeGet(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (value == null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    /* private mode / storage désactivé */
  }
}

export const blyssSession = {
  getAccessToken: () => safeGet(ACCESS_KEY),
  getRefreshToken: () => safeGet(REFRESH_KEY),

  setTokens(accessToken: string, refreshToken?: string | null) {
    safeSet(ACCESS_KEY, accessToken);
    if (refreshToken) safeSet(REFRESH_KEY, refreshToken);
  },

  getUser<T = unknown>(): T | null {
    const raw = safeGet(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  setUser(user: unknown | null) {
    safeSet(USER_KEY, user == null ? null : JSON.stringify(user));
  },

  clear() {
    safeSet(ACCESS_KEY, null);
    safeSet(REFRESH_KEY, null);
    safeSet(USER_KEY, null);
  },
};
