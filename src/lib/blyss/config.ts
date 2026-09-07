/**
 * Base des appels API.
 * - Côté serveur (Server Components) : `app.blyssapp.fr` en direct — pas de CORS
 *   entre serveurs. Surchargeable via `BLYSS_API_URL` / `NEXT_PUBLIC_BLYSS_API_URL`.
 * - Côté client : URL relative → un rewrite Next (`/api/* → app.blyssapp.fr/api/*`,
 *   cf. next.config.ts) proxifie la requête en **same-origin**, ce qui évite
 *   toute config CORS côté backend (localhost inclus).
 */
export const BLYSS_API_URL: string =
  typeof window === 'undefined'
    ? (
        process.env.BLYSS_API_URL ??
        process.env.NEXT_PUBLIC_BLYSS_API_URL ??
        'https://app.blyssapp.fr'
      ).replace(/\/+$/, '')
    : '';

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
