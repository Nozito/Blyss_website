import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Les fichiers /uploads/* du backend sont servis par app.blyssapp.fr avec
      // `Cross-Origin-Resource-Policy: same-origin` (helmet) → un <img> sur
      // blyssapp.fr est bloqué par le navigateur. On les reproxifie donc en
      // same-origin sous /media/*.
      {
        source: "/media/:path*",
        destination: "https://app.blyssapp.fr/:path*",
      },
    ];
  },
};

export default nextConfig;
