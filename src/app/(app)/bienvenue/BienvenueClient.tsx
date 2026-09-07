'use client';

import { useRouter } from 'next/navigation';
import { useBlyssAuth } from '@/components/app/AuthProvider';
import { ClientOnboardingFlow } from '@/components/app/onboarding/ClientOnboardingFlow';

/** Onboarding client autonome — /bienvenue. Réservé aux comptes connectés. */
export function BienvenueClient() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useBlyssAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    if (typeof window !== 'undefined') router.replace('/');
    return null;
  }

  return (
    <ClientOnboardingFlow onSkip={() => router.push('/')} onDone={() => router.push('/')} />
  );
}
