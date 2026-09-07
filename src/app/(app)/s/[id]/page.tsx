import type { Metadata } from 'next';
import Link from 'next/link';
import { Star, MapPin, AtSign, Clock } from 'lucide-react';
import { blyssPublic, type Review } from '@/lib/blyss/api';
import { resolveMediaUrl } from '@/lib/blyss/config';
import { formatDuration, formatPrice } from '@/lib/blyss/format';
import { StoreBadges } from '@/components/app/StoreBadges';

type Params = { params: Promise<{ id: string }> };

const INK = '#1a0710';
const PRUNE = '#2b1420';

function proDisplayName(pro: {
  activity_name: string | null;
  first_name: string | null;
  last_name: string | null;
}): string {
  return pro.activity_name || `${pro.first_name ?? ''} ${pro.last_name ?? ''}`.trim() || 'Profil';
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const res = await blyssPublic.getPro(id);
  if (!res.success || !res.data) {
    return { title: 'Profil indisponible — Blyss', robots: { index: false } };
  }
  const pro = res.data;
  const name = proDisplayName(pro);
  const description =
    pro.bio?.slice(0, 155) ??
    `Réserve ton rendez-vous en ligne avec ${name}${pro.city ? ` à ${pro.city}` : ''} sur Blyss.`;
  const image = resolveMediaUrl(pro.banner_photo) ?? resolveMediaUrl(pro.profile_photo);
  return {
    title: `${name} — Réserver sur Blyss`,
    description,
    alternates: { canonical: `/s/${id}` },
    openGraph: {
      title: name,
      description,
      url: `/s/${id}`,
      type: 'profile',
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}

function StarRow({ rating, size = 14, className = '' }: { rating: number; size?: number; className?: string }) {
  return (
    <span className={`flex gap-0.5 ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(rating) ? '' : 'opacity-30'}
          fill={i <= Math.round(rating) ? 'currentColor' : 'none'}
        />
      ))}
    </span>
  );
}

export default async function PublicProfilePage({ params }: Params) {
  const { id } = await params;

  const [proRes, svcRes, galRes, revRes] = await Promise.all([
    blyssPublic.getPro(id),
    blyssPublic.getServices(id),
    blyssPublic.getGallery(id),
    blyssPublic.getReviews(id),
  ]);

  if (!proRes.success || !proRes.data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-base font-semibold text-[var(--blyss-text)]">Profil indisponible</p>
        <p className="max-w-[320px] text-sm text-[var(--blyss-muted)]">
          Ce profil n&apos;existe pas ou n&apos;est plus public.
        </p>
        <Link
          href="/"
          className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-bold text-white"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  const pro = proRes.data;
  const services = (svcRes.success && svcRes.data ? svcRes.data : [])
    .filter((s) => s.active !== false)
    .map((s) => ({ ...s, price: Number(s.price), duration_minutes: Number(s.duration_minutes) }));
  const gallery = galRes.success && galRes.data ? galRes.data : [];
  const reviews: Review[] = revRes.success && revRes.data ? revRes.data : [];

  const avgRating = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : null;
  const minPrice = services.length ? Math.min(...services.map((s) => s.price)) : null;
  const featured = reviews.find((r) => r.comment && r.rating >= 4 && r.comment.length < 120);

  const name = proDisplayName(pro);
  const banner = resolveMediaUrl(pro.banner_photo);
  const ig = pro.instagram_account?.replace(/^@/, '');
  const eyebrow = [pro.city].filter(Boolean).join(' · ');
  const locationLabel =
    pro.address_visible && pro.address_line
      ? [pro.address_line, pro.postal_code].filter(Boolean).join(', ')
      : pro.service_area_label || (pro.city ? `Zone d'intervention autour de ${pro.city}` : null);

  const bookHref = `/booking/${id}`;
  const canBook = services.length > 0;

  return (
    <div className="pb-24 lg:pb-0">
      {/* ---------- HERO (aplat rose / photo) ---------- */}
      <header
        className="relative flex min-h-[64vh] flex-col justify-end overflow-hidden px-6 pb-10 pt-24 text-white sm:min-h-[68vh] sm:px-10 sm:pb-14 lg:min-h-[74vh] lg:px-16"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        {banner && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={banner} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${INK}f2 0%, ${INK}80 42%, ${INK}20 100%)` }}
            />
          </>
        )}

        <div className="relative mx-auto w-full max-w-[1100px]">
          {eyebrow && (
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">{eyebrow}</p>
          )}
          <h1 className="mt-4 text-[clamp(2.6rem,10vw,6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em]">
            {name}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            {avgRating != null && (
              <span className="flex items-center gap-2 text-sm font-bold">
                <StarRow rating={avgRating} className="text-white" />
                {avgRating.toFixed(1)}
                <span className="font-medium text-white/70">· {reviews.length} avis</span>
              </span>
            )}
            {featured?.comment && (
              <span className="max-w-[38ch] text-sm text-white/85">
                «&nbsp;{featured.comment}&nbsp;»
              </span>
            )}
          </div>

          {canBook && (
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href={bookHref}
                className="inline-flex h-14 items-center justify-center rounded-full bg-white px-9 text-[15px] font-extrabold uppercase tracking-wide text-[var(--color-primary)] transition-transform active:scale-[0.98]"
              >
                Réserver
              </Link>
              {minPrice != null && (
                <span className="text-sm font-semibold text-white/85">
                  dès {formatPrice(minPrice)}
                </span>
              )}
            </div>
          )}

          {ig && (
            <a
              href={`https://instagram.com/${ig}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/80 hover:text-white"
            >
              <AtSign size={14} /> {ig}
            </a>
          )}
        </div>
      </header>

      {/* ---------- BLOC CREAM : présentation + prestations + lieu ---------- */}
      <section className="px-6 py-14 sm:px-10 sm:py-20 lg:px-16" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="mx-auto w-full max-w-[760px]">
          {pro.bio && (
            <p className="max-w-[54ch] text-[clamp(1.05rem,0.98rem+0.5vw,1.35rem)] leading-[1.55] text-[var(--blyss-text)]">
              {pro.bio}
            </p>
          )}

          {services.length > 0 && (
            <div className={pro.bio ? 'mt-14' : ''}>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                Prestations
              </p>
              <ul className="mt-5 border-t border-[var(--blyss-text)]/15">
                {services.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-baseline justify-between gap-6 border-b border-[var(--blyss-text)]/15 py-5"
                  >
                    <div className="min-w-0">
                      <p className="text-[clamp(1.05rem,1rem+0.5vw,1.4rem)] font-extrabold uppercase leading-tight tracking-[-0.02em] text-[var(--blyss-text)]">
                        {s.name}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-[var(--blyss-muted)]">
                        <Clock size={13} />
                        {formatDuration(s.duration_minutes)}
                      </p>
                    </div>
                    <span className="shrink-0 text-[clamp(1.05rem,1rem+0.5vw,1.4rem)] font-extrabold tabular-nums text-[var(--blyss-text)]">
                      {formatPrice(s.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {locationLabel && (
            <div className="mt-12 flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-[var(--color-primary)]" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--blyss-muted)]">
                  {pro.address_visible && pro.address_line ? 'Adresse' : "Zone d'intervention"}
                </p>
                <p className="mt-1 text-[15px] text-[var(--blyss-text)]">{locationLabel}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---------- GALERIE pleine largeur ---------- */}
      {gallery.length > 0 && (
        <section style={{ backgroundColor: PRUNE }}>
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.slice(0, 12).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={g.id}
                  src={resolveMediaUrl(g.thumbnail || g.url)}
                  alt=""
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- AVIS (bloc prune) ---------- */}
      {reviews.length > 0 && (
        <section className="px-6 py-16 text-white sm:px-10 sm:py-24 lg:px-16" style={{ backgroundColor: PRUNE }}>
          <div className="mx-auto w-full max-w-[820px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
              {reviews.length} avis · {avgRating?.toFixed(1)}/5
            </p>
            {reviews.slice(0, 6).map((r) => (
              <figure key={r.id} className="mt-10 border-t border-white/15 pt-8 first:mt-8">
                <StarRow rating={r.rating} size={13} className="text-white" />
                {r.comment && (
                  <blockquote className="mt-3 text-[clamp(1.15rem,1rem+1vw,1.7rem)] font-medium leading-[1.4] tracking-[-0.01em]">
                    «&nbsp;{r.comment}&nbsp;»
                  </blockquote>
                )}
                <figcaption className="mt-3 text-xs text-white/55">
                  Cliente Blyss ·{' '}
                  {new Date(r.created_at).toLocaleDateString('fr-FR', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* ---------- CLÔTURE rose ---------- */}
      <section
        className="px-6 py-16 text-center text-white sm:py-24 lg:px-16"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        <div className="mx-auto flex w-full max-w-[640px] flex-col items-center gap-7">
          <h2 className="text-[clamp(1.9rem,1.4rem+3vw,3.2rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em]">
            {canBook ? `Réserve avec ${name}` : `${name} sur Blyss`}
          </h2>
          {canBook && (
            <Link
              href={bookHref}
              className="inline-flex h-14 items-center justify-center rounded-full bg-white px-10 text-[15px] font-extrabold uppercase tracking-wide text-[var(--color-primary)] transition-transform active:scale-[0.98]"
            >
              Réserver un créneau
            </Link>
          )}
          <p className="text-sm text-white/80">
            Gère tes rendez-vous et échange avec {name} dans l&apos;app Blyss.
          </p>
          <StoreBadges />
        </div>
      </section>

      {/* ---------- CTA collant (mobile) ---------- */}
      {canBook && (
        <div
          className="fixed inset-x-0 bottom-0 z-20 flex items-center gap-3 border-t border-black/10 px-5 py-3 lg:hidden"
          style={{ backgroundColor: 'var(--color-cream)' }}
        >
          {minPrice != null && (
            <div className="shrink-0">
              <p className="text-[10px] uppercase tracking-wide text-[var(--blyss-muted)]">Dès</p>
              <p className="text-[15px] font-extrabold text-[var(--blyss-text)]">{formatPrice(minPrice)}</p>
            </div>
          )}
          <Link
            href={bookHref}
            className="flex h-14 flex-1 items-center justify-center rounded-full bg-[var(--color-primary)] text-[14px] font-extrabold uppercase tracking-wide text-white"
          >
            Réserver
          </Link>
        </div>
      )}
    </div>
  );
}
