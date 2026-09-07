import type { Metadata } from 'next';
import { BienvenueClient } from './BienvenueClient';

export const metadata: Metadata = {
  title: 'Bienvenue — Blyss',
  robots: { index: false, follow: true },
  alternates: { canonical: '/bienvenue' },
};

export default function BienvenuePage() {
  return <BienvenueClient />;
}
