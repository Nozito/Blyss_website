import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy same-origin vers le backend Blyss.
 *
 *  - `/api/*`   → `<API_ORIGIN>/api/*`
 *  - `/media/*` → `<API_ORIGIN>/*`   (fichiers /uploads/… du backend)
 *
 * On **retire les en-têtes `Origin` / `Referer`** avant de forwarder : le
 * `cors()` du backend rejette toute origine hors liste (et laisse passer les
 * requêtes sans Origin, càd serveur-à-serveur). Sans ça le proxy transmettrait
 * l'Origin du navigateur (`blyssapp.fr` / `localhost`) → 500 "Not allowed by
 * CORS". Résout aussi le `Cross-Origin-Resource-Policy` des images (réponse
 * servie depuis la même origine que la page).
 */
const API_ORIGIN = (
  process.env.BLYSS_API_URL ??
  process.env.NEXT_PUBLIC_BLYSS_API_URL ??
  'https://app.blyssapp.fr'
).replace(/\/+$/, '');

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  let targetPath: string | null = null;
  if (pathname.startsWith('/api/')) targetPath = pathname;
  else if (pathname.startsWith('/media/')) targetPath = pathname.slice('/media'.length);
  if (!targetPath) return NextResponse.next();

  const headers = new Headers(req.headers);
  headers.delete('origin');
  headers.delete('referer');
  headers.delete('host');

  return NextResponse.rewrite(new URL(`${API_ORIGIN}${targetPath}${search}`), {
    request: { headers },
  });
}

export const config = {
  matcher: ['/api/:path*', '/media/:path*'],
};
