import { Fragment } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { StoreBadges } from '@/components/app/StoreBadges';
import { formatPrice } from '@/lib/blyss/format';

interface Props {
  proName: string;
  prestationName: string;
  selectedDate: Date;
  selectedTime: string;
  paymentMethod: 'online' | 'on_site' | null;
  depositPercentage: number;
  depositAmount: number | null;
}

export function ConfirmationStep({
  proName,
  prestationName,
  selectedDate,
  selectedTime,
  paymentMethod,
  depositPercentage,
  depositAmount,
}: Props) {
  const rows: Array<{ label: string; value: string }> = [
    { label: 'Spécialiste', value: proName },
    { label: 'Prestation', value: prestationName },
    {
      label: 'Date',
      value: selectedDate.toLocaleDateString('fr-FR', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
      }),
    },
    { label: 'Horaire', value: selectedTime },
    {
      label: 'Paiement',
      value:
        paymentMethod === 'on_site'
          ? 'Sur place'
          : depositPercentage < 100
            ? `Acompte payé (${formatPrice(depositAmount ?? 0)})`
            : 'Payé en ligne',
    },
  ];

  return (
    <div className="flex flex-col items-center gap-6 py-10">
      <span className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-primary)] shadow-[var(--shadow-soft)]">
        <Check size={48} className="text-white" strokeWidth={3} />
      </span>

      <div className="flex flex-col items-center gap-1.5 text-center">
        <div className="flex items-center gap-2">
          <h1 className="text-[26px] font-extrabold text-[var(--blyss-text)]">Réservation confirmée</h1>
          <Sparkles size={22} className="text-[var(--color-primary)]" />
        </div>
        <p className="max-w-[280px] text-sm leading-5 text-[var(--blyss-muted)]">
          Tu recevras une confirmation et un rappel avant ton rendez-vous.
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 rounded-[20px] bg-white p-5 shadow-[var(--shadow-card)]">
        {rows.map((row, i) => (
          <Fragment key={row.label}>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[13px] text-[var(--blyss-muted)]">{row.label}</span>
              <span className="text-right text-[13px] font-medium text-[var(--blyss-text)]">
                {row.value}
              </span>
            </div>
            {i < rows.length - 1 && <div className="h-px bg-[var(--blyss-border)]" />}
          </Fragment>
        ))}
      </div>

      <div className="flex w-full flex-col items-center gap-3 rounded-2xl bg-[var(--blyss-pink-light)] p-5 text-center">
        <p className="text-[13px] font-semibold text-[var(--color-primary)]">
          Télécharge l&apos;app Blyss pour gérer ton rendez-vous et échanger avec {proName}.
        </p>
        <StoreBadges />
      </div>
    </div>
  );
}
