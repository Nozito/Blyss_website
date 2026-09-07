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

/**
 * Résout un chemin média (`/uploads/…` renvoyé par le backend) vers une URL
 * **same-origin** `/media/…`, reproxifiée vers app.blyssapp.fr par un rewrite
 * Next (cf. next.config.ts). Nécessaire car le backend sert ces fichiers avec
 * `Cross-Origin-Resource-Policy: same-origin` (helmet), ce qui bloque un <img>
 * cross-origin depuis blyssapp.fr. Les URLs absolues (déjà en `http…`) passent
 * telles quelles.
 */
export function resolveMediaUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  if (path.startsWith('http')) return path;
  return `/media/${path.replace(/^\/+/, '')}`;
}
