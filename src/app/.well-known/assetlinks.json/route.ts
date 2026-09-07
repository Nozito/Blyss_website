/**
 * Android App Links — délègue l'ouverture de blyssapp.fr à l'app blyss.app.
 * ⚠️ Remplacer le placeholder par l'empreinte SHA-256 du certificat de
 * signature Play (Play Console → Intégrité de l'app → Certificat de clé de
 * signature d'application).
 */
export const dynamic = 'force-static';

const ASSET_LINKS = [
  {
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: 'blyss.app',
      sha256_cert_fingerprints: ['REMPLACER_PAR_L_EMPREINTE_SHA256_DU_CERTIFICAT_PLAY'],
    },
  },
];

export function GET() {
  return new Response(JSON.stringify(ASSET_LINKS), {
    headers: { 'content-type': 'application/json' },
  });
}
