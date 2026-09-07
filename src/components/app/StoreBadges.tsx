import { Apple, Play } from 'lucide-react';

const DOWNLOAD_URL = 'https://blyssapp.fr/telecharger';

/**
 * Incitation au téléchargement. `variant="hero"` = gros bouton App Store plein +
 * lien Play discret (pour les écrans où le download est l'action principale).
 * `variant="inline"` = les deux badges côte à côte.
 */
export function StoreBadges({
  className = '',
  variant = 'inline',
  onDark = false,
}: {
  className?: string;
  variant?: 'inline' | 'hero';
  onDark?: boolean;
}) {
  if (variant === 'hero') {
    return (
      <div className={`flex w-full flex-col items-center gap-3 ${className}`}>
        <a
          href={DOWNLOAD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-full max-w-[320px] items-center justify-center gap-2.5 rounded-full bg-[var(--blyss-text)] text-[15px] font-extrabold text-white transition-transform active:scale-[0.98]"
        >
          <Apple size={20} />
          Télécharger sur l&apos;App Store
        </a>
        <a
          href={DOWNLOAD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 text-[13px] font-semibold underline underline-offset-4 ${
            onDark ? 'text-white/70 hover:text-white' : 'text-[var(--blyss-muted)] hover:text-[var(--blyss-text)]'
          }`}
        >
          <Play size={13} /> Aussi sur Google Play
        </a>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={DOWNLOAD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-[14px] bg-[var(--blyss-text)] px-4 py-2.5 text-sm font-semibold text-white"
      >
        <Apple size={18} />
        App Store
      </a>
      <a
        href={DOWNLOAD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-[14px] border px-4 py-2.5 text-sm font-semibold ${
          onDark
            ? 'border-white/25 bg-transparent text-white'
            : 'border-[var(--blyss-border)] bg-white text-[var(--blyss-text)]'
        }`}
      >
        <Play size={16} />
        Google Play
      </a>
    </div>
  );
}
