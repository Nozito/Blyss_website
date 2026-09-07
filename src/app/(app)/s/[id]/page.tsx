import type { Metadata } from 'next';
import Link from 'next/link';
import { Star, MapPin, AtSign, Clock, Sparkles, Calendar } from 'lucide-react';
import { blyssPublic, type Review } from '@/lib/blyss/api';
import { resolveMediaUrl } from '@/lib/blyss/config';
import { formatDuration, formatPrice } from '@/lib/blyss/format';
import { StoreBadges } from '@/components/app/StoreBadges';

type Params = { params: Promise<{ id: string }> };

function proDisplayName(pro: {
  activity_name: string | null;
  first_name: string | null;
  last_name: string | null;
}): string {
  return (
    pro.activity_name ||
    `${pro.first_name ?? ''} ${pro.last_name ?? ''}`.trim() ||
    'Profil'
  );
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

function StarRow({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(rating) ? 'text-[var(--color-primary)]' : 'text-[var(--blyss-border)]'}
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

  const avgRating = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : null;
  const minPrice = services.length ? Math.min(...services.map((s) => s.price)) : null;

  const name = proDisplayName(pro);
  const initials =
    `${pro.first_name?.[0] ?? ''}${pro.last_name?.[0] ?? ''}`.toUpperCase() || 'B';
  const banner = resolveMediaUrl(pro.banner_photo);
  const avatar = resolveMediaUrl(pro.profile_photo);
  const ig = pro.instagram_account?.replace(/^@/, '');
  const locationLabel =
    pro.address_visible && pro.address_line
      ? [pro.address_line, pro.postal_code].filter(Boolean).join(', ')
      : pro.service_area_label ||
        (pro.city ? `Zone d'intervention autour de ${pro.city}` : null);

  return (
    <div className="pb-28 lg:pb-16">
      {/* Bannière — pleine largeur, hauteur responsive */}
      <div className="relative h-40 w-full bg-[var(--blyss-pink-light)] sm:h-52 md:h-60 lg:h-64">
        {banner ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={banner} alt="" className="h-full w-full object-cover object-center" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Sparkles size={48} className="text-[var(--color-primary)] opacity-25" />
          </div>
        )}
      </div>

      {/* Identité — l'avatar chevauche la bannière (devant) */}
      <div className="mx-auto flex w-full max-w-[640px] flex-col items-center px-5 lg:max-w-[1040px]">
        <div className="relative z-10 -mt-12 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-[var(--blyss-pink-light)] shadow-[var(--shadow-card)]">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt={name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-2xl font-extrabold text-[var(--color-primary)]">{initials}</span>
          )}
        </div>

        <h1 className="mt-3 text-center text-[22px] font-extrabold tracking-tight text-[var(--blyss-text)]">
          {name}
        </h1>

        {avgRating != null && (
          <div className="mt-1.5 flex items-center gap-1.5">
            <StarRow rating={avgRating} />
            <span className="text-[13px] font-bold text-[var(--blyss-text)]">
              {avgRating.toFixed(1)}
            </span>
            <span className="text-[13px] text-[var(--blyss-muted)]">({reviews.length})</span>
          </div>
        )}

        {pro.city && (
          <p className="mt-1 flex items-center gap-1 text-sm text-[var(--blyss-muted)]">
            <MapPin size={14} /> {pro.city}
          </p>
        )}

        {ig && (
          <a
            href={`https://instagram.com/${ig}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-primary)]"
          >
            <AtSign size={14} /> @{ig}
          </a>
        )}
      </div>

      <div className="mx-auto mt-6 w-full max-w-[640px] px-5 lg:grid lg:max-w-[1040px] lg:grid-cols-[1fr_340px] lg:items-start lg:gap-10">
       {/* Colonne principale */}
       <div className="flex flex-col gap-6">
        {pro.bio && (
          <section className="rounded-[20px] bg-white p-5 shadow-[var(--shadow-card)]">
            <p className="whitespace-pre-line text-sm leading-6 text-[var(--blyss-text)]">{pro.bio}</p>
          </section>
        )}

        {services.length > 0 && (
          <section className="flex flex-col gap-3">
            <h2 className="text-[15px] font-bold text-[var(--blyss-text)]">Prestations</h2>
            <div className="grid gap-3 sm:grid-cols-2">
            {services.map((s) => (
              <div
                key={s.id}
                className="flex items-center gap-4 rounded-[20px] bg-white p-4 shadow-[var(--shadow-card)]"
              >
                <div className="flex-1">
                  <p className="text-[15px] font-semibold text-[var(--blyss-text)]">{s.name}</p>
                  {s.description && (
                    <p className="mt-0.5 line-clamp-2 text-xs leading-[18px] text-[var(--blyss-muted)]">
                      {s.description}
                    </p>
                  )}
                  <span className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--blyss-muted)]">
                    <Clock size={14} className="text-[var(--color-primary)]" />
                    {formatDuration(s.duration_minutes)}
                  </span>
                </div>
                <span className="shrink-0 text-[15px] font-bold text-[var(--blyss-text)]">
                  {formatPrice(s.price)}
                </span>
              </div>
            ))}
            </div>
          </section>
        )}

        {gallery.length > 0 && (
          <section className="flex flex-col gap-3">
            <h2 className="text-[15px] font-bold text-[var(--blyss-text)]">Réalisations</h2>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={g.id}
                  src={resolveMediaUrl(g.thumbnail || g.url)}
                  alt=""
                  loading="lazy"
                  className="aspect-square w-full rounded-xl object-cover"
                />
              ))}
            </div>
          </section>
        )}

        {locationLabel && (
          <section className="flex items-start gap-3 rounded-[20px] bg-white p-5 shadow-[var(--shadow-card)]">
            <MapPin size={18} className="mt-0.5 shrink-0 text-[var(--color-primary)]" />
            <div>
              <p className="text-[13px] font-bold text-[var(--blyss-text)]">
                {pro.address_visible && pro.address_line ? 'Adresse' : "Zone d'intervention"}
              </p>
              <p className="mt-0.5 text-sm text-[var(--blyss-muted)]">{locationLabel}</p>
              {!(pro.address_visible && pro.address_line) && pro.service_radius_km != null && (
                <p className="mt-0.5 text-xs text-[var(--blyss-muted)]">
                  Rayon d&apos;environ {Number(pro.service_radius_km)} km
                </p>
              )}
            </div>
          </section>
        )}

        {reviews.length > 0 && (
          <section className="flex flex-col gap-3">
            <h2 className="text-[15px] font-bold text-[var(--blyss-text)]">Avis clientes</h2>
            {reviews.slice(0, 8).map((r) => (
              <div key={r.id} className="rounded-[20px] bg-white p-4 shadow-[var(--shadow-card)]">
                <div className="flex items-center justify-between">
                  <StarRow rating={r.rating} size={12} />
                  <span className="text-[11px] text-[var(--blyss-muted)]">
                    {new Date(r.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                {r.comment && (
                  <p className="mt-2 text-sm leading-5 text-[var(--blyss-text)]">{r.comment}</p>
                )}
                <p className="mt-1.5 text-xs text-[var(--blyss-muted)]">Cliente Blyss</p>
              </div>
            ))}
          </section>
        )}

        <section className="flex flex-col items-center gap-3 rounded-2xl bg-[var(--blyss-pink-light)] p-5 text-center">
          <p className="text-[13px] font-semibold text-[var(--color-primary)]">
            Retrouve {name} et toutes tes réservations dans l&apos;app Blyss.
          </p>
          <StoreBadges />
        </section>
       </div>

       {/* Colonne latérale (desktop) — carte de réservation collante */}
       {services.length > 0 && (
         <aside className="mt-6 hidden lg:sticky lg:top-8 lg:mt-0 lg:block">
           <div className="flex flex-col gap-4 rounded-[24px] bg-white p-6 shadow-[var(--shadow-card)]">
             {minPrice != null && (
               <div>
                 <p className="text-xs text-[var(--blyss-muted)]">À partir de</p>
                 <p className="text-[26px] font-extrabold text-[var(--blyss-text)]">
                   {formatPrice(minPrice)}
                 </p>
               </div>
             )}
             {avgRating != null && (
               <div className="flex items-center gap-1.5">
                 <StarRow rating={avgRating} />
                 <span className="text-[13px] font-bold text-[var(--blyss-text)]">
                   {avgRating.toFixed(1)}
                 </span>
                 <span className="text-[13px] text-[var(--blyss-muted)]">({reviews.length} avis)</span>
               </div>
             )}
             {pro.city && (
               <p className="flex items-center gap-1 text-sm text-[var(--blyss-muted)]">
                 <MapPin size={14} /> {pro.city}
               </p>
             )}
             <Link
               href={`/booking/${id}`}
               className="mt-1 flex h-14 items-center justify-center gap-2 rounded-[16px] bg-[var(--color-primary)] text-[15px] font-bold text-white shadow-[var(--shadow-soft)]"
             >
               <Calendar size={18} />
               Réserver
             </Link>
             <p className="text-center text-[11px] text-[var(--blyss-muted)]">
               Réservation en ligne · confirmation immédiate
             </p>
           </div>
         </aside>
       )}
      </div>

      {/* CTA collant (mobile / tablette) */}
      {services.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-10 border-t border-[var(--blyss-border)] bg-white/95 px-5 py-3 backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-[640px] items-center gap-3">
            {minPrice != null && (
              <div className="shrink-0">
                <p className="text-[10px] text-[var(--blyss-muted)]">À partir de</p>
                <p className="text-[15px] font-extrabold text-[var(--blyss-text)]">
                  {formatPrice(minPrice)}
                </p>
              </div>
            )}
            <Link
              href={`/booking/${id}`}
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-[16px] bg-[var(--color-primary)] text-[15px] font-bold text-white shadow-[var(--shadow-soft)]"
            >
              <Calendar size={18} />
              Réserver
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
