import type { NextConfig } from "next";

/**
 * Le proxy same-origin vers le backend (`/api/*` et `/media/*`) est géré par
 * `src/proxy.ts` (et pas par des rewrites) car il faut retirer l'en-tête
 * `Origin` avant de forwarder — sinon le `cors()` du backend renvoie 500.
 */
const nextConfig: NextConfig = {};

export default nextConfig;
