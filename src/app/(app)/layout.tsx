import { AuthProvider } from '@/components/app/AuthProvider';

/**
 * Parcours "app" (profil pro public, réservation, onboarding client) — plein
 * écran, sans la Navbar / le Footer marketing. La palette vient déjà de
 * globals.css (identique à l'app mobile).
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[var(--background)] text-[var(--blyss-text)]">{children}</div>
    </AuthProvider>
  );
}
