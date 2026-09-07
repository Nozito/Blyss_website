import Link from 'next/link';
import { StoreBadges } from '@/components/app/StoreBadges';
import { RibbonSweep } from '@/components/app/RibbonSweep';
import { formatPrice } from '@/lib/blyss/format';

const PRUNE = '#2b1420';

interface Props {
  proId: string;
  proName: string;
  prestationName: string;
  selectedDate: Date;
  selectedTime: string;
  paymentMethod: 'online' | 'on_site' | null;
  depositPercentage: number;
  depositAmount: number | null;
}

export function ConfirmationStep({
  proId,
  proName,
  prestationName,
  selectedDate,
  selectedTime,
  paymentMethod,
  depositPercentage,
  depositAmount,
}: Props) {
  const dateLabel = selectedDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const paymentLabel =
    paymentMethod === 'on_site'
      ? 'Paiement sur place'
      : depositPercentage < 100
        ? `Acompte de ${formatPrice(depositAmount ?? 0)} payé`
        : 'Payé en ligne';

  return (
    <div
      className="flex min-h-screen flex-col px-6 pb-12 pt-16 text-white sm:px-10 lg:px-16"
      style={{ backgroundColor: PRUNE }}
    >
      <RibbonSweep />

      <div className="mx-auto w-full max-w-[820px]">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
          {dateLabel} · {selectedTime} · {proName}
        </p>
        <h1 className="mt-8 text-[clamp(3.5rem,16vw,9rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.04em]">
          C&apos;est
          <br />
          pris.
        </h1>
        <p className="mt-8 max-w-[44ch] text-[clamp(1rem,0.95rem+0.4vw,1.25rem)] leading-[1.5] text-white/85">
          {prestationName} avec {proName}, le {dateLabel} à {selectedTime}.
        </p>
      </div>

      {/* Incitation app — action principale : sans l'app, pas de confirmation ni de rappel */}
      <div className="mx-auto mt-12 w-full max-w-[420px]">
        <div className="rounded-[24px] bg-white/10 p-6 backdrop-blur-sm">
          <p className="text-[15px] font-bold leading-snug">
            Télécharge l&apos;app Blyss pour recevoir ta confirmation, tes rappels, et échanger
            avec {proName}.
          </p>
          <div className="mt-5">
            <StoreBadges variant="hero" onDark />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-[820px]">
        <dl className="border-t border-white/15">
          {[
            ['Prestation', prestationName],
            ['Date', `${dateLabel} · ${selectedTime}`],
            ['Paiement', paymentLabel],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex items-baseline justify-between gap-6 border-b border-white/15 py-4"
            >
              <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">{k}</dt>
              <dd className="text-right text-sm font-semibold">{v}</dd>
            </div>
          ))}
        </dl>

        <Link
          href={`/s/${proId}`}
          className="mt-8 inline-block text-[13px] font-semibold uppercase tracking-wide text-white/60 underline underline-offset-4 hover:text-white"
        >
          Revoir le profil de {proName}
        </Link>
      </div>
    </div>
  );
}
