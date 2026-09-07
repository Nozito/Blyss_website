const DOWNLOAD_URL = 'https://blyssapp.fr/telecharger';

function AppleLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 14.25 3.51 5.66 8.68 5.38c1.34.07 2.27.74 3.05.79 1.16-.24 2.27-.93 3.51-.84 1.49.12 2.61.71 3.35 1.79-3.08 1.85-2.4 5.94.28 7.03-.55 1.42-1.28 2.83-2.44 3.86l-.83.28zM12.03 5.24c-.15-2.23 1.66-4.06 3.74-4.24.29 2.58-2.34 4.5-3.74 4.24z" />
    </svg>
  );
}

function GooglePlayLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path fill="#00D2FF" d="M3.6 2.2c-.3.3-.5.8-.5 1.4v16.8c0 .6.2 1.1.5 1.4l.1.1L13 12.1v-.2L3.7 2.1l-.1.1z" />
      <path fill="#FFCE00" d="M16.3 15.3 13 12.1v-.2l3.3-3.2.1.1 3.9 2.2c1.1.6 1.1 1.6 0 2.3l-3.9 2.2-.1-.4z" />
      <path fill="#FF3D4E" d="M16.4 15.2 13 12 3.6 21.8c.4.4 1 .4 1.7.1l11.1-6.7z" />
      <path fill="#00E676" d="M16.4 8.8 5.3 2.1c-.7-.4-1.3-.3-1.7.1L13 12l3.4-3.2z" />
    </svg>
  );
}

/**
 * Incitation au téléchargement. `hero` = deux badges style store, empilés.
 * `inline` = deux badges compacts. Tous les liens → blyssapp.fr/telecharger.
 */
export function StoreBadges({
  className = '',
  variant = 'inline',
}: {
  className?: string;
  variant?: 'inline' | 'hero';
  /** Conservé pour compat — les badges sont auto-portants (fond sombre). */
  onDark?: boolean;
}) {
  const hero = variant === 'hero';
  const h = hero ? 'h-14' : 'h-11';
  const wrap = hero ? 'flex-col' : 'flex-row flex-wrap';

  return (
    <div className={`flex ${wrap} items-stretch justify-center gap-3 ${className}`}>
      <a
        href={DOWNLOAD_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Télécharger dans l'App Store"
        className={`group flex ${h} ${hero ? 'w-full max-w-[300px]' : ''} items-center gap-2.5 rounded-[13px] bg-black px-4 text-white ring-1 ring-white/20 transition-transform active:scale-[0.98]`}
      >
        <AppleLogo className={hero ? 'h-7 w-7' : 'h-6 w-6'} />
        <span className="flex flex-col leading-none">
          <span className="text-[9px] font-medium uppercase tracking-wide opacity-80">
            Télécharger dans l&apos;
          </span>
          <span className={`${hero ? 'text-[17px]' : 'text-[15px]'} font-semibold -tracking-[0.01em]`}>
            App Store
          </span>
        </span>
      </a>

      <a
        href={DOWNLOAD_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Disponible sur Google Play"
        className={`group flex ${h} ${hero ? 'w-full max-w-[300px]' : ''} items-center gap-2.5 rounded-[13px] bg-black px-4 text-white ring-1 ring-white/20 transition-transform active:scale-[0.98]`}
      >
        <GooglePlayLogo className={hero ? 'h-6 w-6' : 'h-5 w-5'} />
        <span className="flex flex-col leading-none">
          <span className="text-[9px] font-medium uppercase tracking-wide opacity-80">
            Disponible sur
          </span>
          <span className={`${hero ? 'text-[17px]' : 'text-[15px]'} font-semibold -tracking-[0.01em]`}>
            Google Play
          </span>
        </span>
      </a>
    </div>
  );
}
