/**
 * Universal Links iOS — associe blyssapp.fr à l'app (B92ST2GG54.blyss.app)
 * pour les chemins /s/* (profils partagés) et /booking/*.
 * Servi en application/json, sans redirection (exigence Apple).
 */
export const dynamic = 'force-static';

const AASA = {
  applinks: {
    details: [
      {
        appIDs: ['B92ST2GG54.blyss.app'],
        components: [
          { '/': '/s/*', comment: 'Profils pros partagés' },
          { '/': '/booking/*', comment: 'Tunnel de réservation' },
        ],
      },
    ],
  },
};

export function GET() {
  return new Response(JSON.stringify(AASA), {
    headers: { 'content-type': 'application/json' },
  });
}
