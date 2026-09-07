import Link from 'next/link';
import { Apple, Smartphone } from 'lucide-react';

/** L'app n'est pas encore sur les stores → renvoie vers /telecharger (à créer)
 *  ou la home. Ajuste `href` quand les fiches store existent. */
export function StoreBadges({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-[14px] bg-[var(--blyss-text)] px-4 py-2.5 text-sm font-semibold text-white"
      >
        <Apple size={18} />
        App Store
      </Link>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-[14px] border border-[var(--blyss-border)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--blyss-text)]"
      >
        <Smartphone size={18} />
        Google Play
      </Link>
    </div>
  );
}
