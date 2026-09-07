import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apiOrigin =
      process.env.BLYSS_API_URL ??
      process.env.NEXT_PUBLIC_BLYSS_API_URL ??
      "https://app.blyssapp.fr";
    return [
      // API : proxifiée en same-origin → pas besoin de CORS côté backend
      // (ni en prod pour blyssapp.fr, ni en local pour localhost).
      {
        source: "/api/:path*",
        destination: `${apiOrigin.replace(/\/+$/, "")}/api/:path*`,
      },
      // Fichiers /uploads/* : servis par le backend avec
      // `Cross-Origin-Resource-Policy: same-origin` (helmet) → un <img> sur
      // blyssapp.fr serait bloqué par le navigateur. Reproxifiés en same-origin.
      {
        source: "/media/:path*",
        destination: `${apiOrigin.replace(/\/+$/, "")}/:path*`,
      },
    ];
  },
};

export default nextConfig;
