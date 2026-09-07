/** Helpers portés de blyss-mobile (lib/dateUtils.ts, lib/bookingUtils.ts). */

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h${String(m).padStart(2, '0')}`;
}

export const toLocalDateStr = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const calculateEndDateTime = (
  startDate: Date,
  startTime: string,
  durationMinutes: number,
): Date => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const start = new Date(startDate);
  start.setHours(hours, minutes, 0, 0);
  return new Date(start.getTime() + durationMinutes * 60_000);
};

export function resolvePaymentType(depositPercentage: number): 'full' | 'deposit' {
  return depositPercentage === 100 ? 'full' : 'deposit';
}

export function canPayOnline(
  stripeOnboardingComplete: boolean,
  acceptOnlinePayment: boolean,
): boolean {
  return stripeOnboardingComplete && acceptOnlinePayment;
}

export function formatPrice(v: number): string {
  return `${v.toFixed(2)}€`;
}
