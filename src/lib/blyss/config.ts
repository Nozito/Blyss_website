/**
 * Config API Blyss. `app.blyssapp.fr` sert le backend Node (`/api/*`) derrière
 * nginx sur le VPS ; `api.blyssapp.fr` prendra le relais quand le sous-domaine
 * sera créé (cf. docs). Surchargeable via `NEXT_PUBLIC_BLYSS_API_URL`.
 */
export const BLYSS_API_URL: string = (
  process.env.NEXT_PUBLIC_BLYSS_API_URL ?? 'https://app.blyssapp.fr'
).replace(/\/+$/, '');

export const STRIPE_PUBLISHABLE_KEY: string =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '';

/** Résout un chemin média (relatif) en URL absolue. Porté de blyss-mobile. */
export function resolveMediaUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  if (path.startsWith('http')) return path;
  return `${BLYSS_API_URL}/${path.replace(/^\/+/, '')}`;
}
