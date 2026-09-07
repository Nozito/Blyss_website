'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { blyssAuth, type SessionUser, type SignupData } from '@/lib/blyss/api';
import { blyssSession } from '@/lib/blyss/session';

interface AuthState {
  user: SessionUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const hydrate = useCallback(async () => {
    if (!blyssSession.getAccessToken() && !blyssSession.getRefreshToken()) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    const res = await blyssAuth.me();
    if (res.success && res.data) {
      setUser(res.data);
      blyssSession.setUser(res.data);
    } else {
      blyssSession.clear();
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setUser(blyssSession.getUser<SessionUser>());
    void hydrate();
  }, [hydrate]);

  const login = useCallback<AuthState['login']>(async (email, password) => {
    const res = await blyssAuth.login(email, password);
    if (!res.success || !res.data) return { ok: false, error: res.error };
    blyssSession.setTokens(res.data.accessToken, res.data.refreshToken);
    blyssSession.setUser(res.data.user);
    setUser(res.data.user);
    return { ok: true };
  }, []);

  const signup = useCallback<AuthState['signup']>(async (data) => {
    const res = await blyssAuth.signup(data);
    if (!res.success) return { ok: false, error: res.error };
    if (res.data?.accessToken) blyssSession.setTokens(res.data.accessToken, res.data.refreshToken);
    const me = await blyssAuth.me();
    if (me.success && me.data) {
      blyssSession.setUser(me.data);
      setUser(me.data);
      return { ok: true };
    }
    return { ok: false, error: 'Compte créé mais connexion impossible. Réessaie de te connecter.' };
  }, []);

  const logout = useCallback(() => {
    blyssSession.clear();
    setUser(null);
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout,
      refreshProfile: hydrate,
    }),
    [user, isLoading, login, signup, logout, hydrate],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useBlyssAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useBlyssAuth doit être utilisé dans <AuthProvider>');
  return ctx;
}
