import type { Metadata } from 'next';
import { BookingFlow } from '@/components/app/booking/BookingFlow';

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  return {
    title: 'Réserver — Blyss',
    robots: { index: false, follow: true },
    alternates: { canonical: `/booking/${id}` },
  };
}

export default async function BookingPage({ params }: Params) {
  const { id } = await params;
  return <BookingFlow proId={id} />;
}
