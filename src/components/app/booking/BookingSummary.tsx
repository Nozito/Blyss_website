import { Check, CreditCard, Smartphone, Info } from 'lucide-react';
import { formatDuration, formatPrice } from '@/lib/blyss/format';

interface Props {
  prestationName: string;
  prestationPrice: number;
  prestationDuration: number;
  proName: string;
  proCity: string | null;
  selectedDate: Date;
  selectedTime: string;
  paymentMethod: 'online' | 'on_site' | null;
  onSelectPayment: (m: 'online' | 'on_site') => void;
  canPayOnline: boolean;
  mustPayOnline: boolean;
  depositPercentage: number;
  cancellationNoticeHours: number;
  cancellationPolicyAccepted: boolean;
  onToggleCancellationPolicy: () => void;
  withdrawalRightAccepted: boolean;
  onToggleWithdrawalRight: () => void;
}

function PaymentChoice({
  selected,
  onPress,
  icon,
  title,
  subtitle,
}: {
  selected: boolean;
  onPress: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="flex items-center gap-4 rounded-[20px] border-2 bg-white p-5 text-left shadow-[var(--shadow-card)]"
      style={{ borderColor: selected ? 'var(--color-primary)' : 'var(--blyss-border)' }}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--blyss-pink-light)] text-[var(--color-primary)]">
        {icon}
      </span>
      <span className="flex-1">
        <span className="mb-0.5 block text-sm font-semibold text-[var(--blyss-text)]">{title}</span>
        <span className="block text-xs text-[var(--blyss-muted)]">{subtitle}</span>
      </span>
      <span
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: selected ? 'var(--color-primary)' : 'var(--color-cream)' }}
      >
        {selected && <Check size={14} className="text-white" />}
      </span>
    </button>
  );
}

function Checkbox({
  checked,
  onToggle,
  children,
}: {
  checked: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex items-start gap-2.5 rounded-2xl border bg-white p-3.5 text-left"
      style={{ borderColor: checked ? 'var(--color-primary)' : 'var(--blyss-border)' }}
    >
      <span
        className="mt-px flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md border"
        style={{
          backgroundColor: checked ? 'var(--color-primary)' : 'var(--color-cream)',
          borderColor: checked ? 'var(--color-primary)' : 'var(--blyss-border)',
        }}
      >
        {checked && <Check size={14} className="text-white" />}
      </span>
      <span className="flex-1 text-xs leading-[17px] text-[var(--blyss-text)]">{children}</span>
    </button>
  );
}

export function BookingSummary({
  prestationName,
  prestationPrice,
  prestationDuration,
  proName,
  proCity,
  selectedDate,
  selectedTime,
  paymentMethod,
  onSelectPayment,
  canPayOnline,
  mustPayOnline,
  depositPercentage,
  cancellationNoticeHours,
  cancellationPolicyAccepted,
  onToggleCancellationPolicy,
  withdrawalRightAccepted,
  onToggleWithdrawalRight,
}: Props) {
  const dateLabel = selectedDate.toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return (
    <div className="flex flex-col gap-5 pb-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-[26px] font-extrabold tracking-tight text-[var(--blyss-text)]">
          Récapitulatif
        </h1>
        <p className="text-sm text-[var(--blyss-muted)]">Vérifie que tout est bon</p>
      </header>

      <div className="flex flex-col gap-4 rounded-[20px] bg-white p-5 shadow-[var(--shadow-card)]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="mb-0.5 text-[11px] text-[var(--blyss-muted)]">Prestation</p>
            <p className="text-[15px] font-bold text-[var(--blyss-text)]">{prestationName}</p>
            <p className="mt-0.5 text-xs text-[var(--blyss-muted)]">
              avec {proName}
              {proCity ? ` · ${proCity}` : ''}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="mb-0.5 text-[11px] text-[var(--blyss-muted)]">Total</p>
            <p className="text-2xl font-extrabold text-[var(--blyss-text)]">
              {formatPrice(prestationPrice)}
            </p>
          </div>
        </div>

        <div className="h-px bg-[var(--blyss-border)]" />

        <div className="flex gap-2">
          <div className="flex flex-1 flex-col items-center rounded-2xl bg-[var(--color-cream)] py-3">
            <span className="mb-1 text-[10px] text-[var(--blyss-muted)]">Date</span>
            <span className="text-xs font-bold capitalize text-[var(--blyss-text)]">{dateLabel}</span>
          </div>
          <div className="flex flex-1 flex-col items-center rounded-2xl bg-[var(--blyss-pink-light)] py-3">
            <span className="mb-1 text-[10px] text-[var(--blyss-muted)]">Horaire</span>
            <span className="text-base font-extrabold text-[var(--color-primary)]">{selectedTime}</span>
          </div>
          <div className="flex flex-1 flex-col items-center rounded-2xl bg-[var(--color-cream)] py-3">
            <span className="mb-1 text-[10px] text-[var(--blyss-muted)]">Durée</span>
            <span className="text-xs font-bold text-[var(--blyss-text)]">
              {formatDuration(prestationDuration)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 rounded-2xl bg-[var(--blyss-pink-light)] p-3.5">
        <Smartphone size={18} className="shrink-0 text-[var(--color-primary)]" />
        <p className="flex-1 text-[13px] font-semibold text-[var(--color-primary)]">
          Une précision à donner à {proName} (allergie, adresse…) ? Échange avec elle dans l&apos;app
          Blyss.
        </p>
      </div>

      <Checkbox checked={cancellationPolicyAccepted} onToggle={onToggleCancellationPolicy}>
        J&apos;ai pris connaissance des conditions d&apos;annulation de {proName} : annulation
        possible{' '}
        {cancellationNoticeHours === 0
          ? "jusqu'au rendez-vous"
          : `jusqu'à ${cancellationNoticeHours}h avant le rendez-vous`}
        , au-delà l&apos;annulation n&apos;est plus possible depuis l&apos;app.
        {paymentMethod === 'online' && depositPercentage > 0 && depositPercentage < 100
          ? " L'acompte reste acquis au professionnel en cas d'annulation, seul le reste est remboursé."
          : ''}
      </Checkbox>

      <Checkbox checked={withdrawalRightAccepted} onToggle={onToggleWithdrawalRight}>
        Je demande expressément que la prestation commence avant l&apos;expiration du délai de
        rétractation de 14 jours, et je reconnais qu&apos;une fois la prestation pleinement exécutée,
        je perds mon droit de rétractation.
      </Checkbox>

      {mustPayOnline ? (
        <div className="flex items-center gap-3 rounded-2xl border border-[rgba(254,93,157,0.2)] bg-[var(--blyss-pink-light)] p-3.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--blyss-pink-light)] text-[var(--color-primary)]">
            <Smartphone size={20} />
          </span>
          <div className="flex-1">
            <p className="mb-0.5 text-[13px] font-bold text-[var(--blyss-text)]">
              Acompte de {depositPercentage}% — paiement en ligne
            </p>
            <p className="text-xs leading-[17px] text-[var(--blyss-muted)]">
              Ce professionnel demande un acompte pour confirmer le rendez-vous. Le reste se règle sur
              place.
            </p>
          </div>
        </div>
      ) : canPayOnline ? (
        <div className="flex flex-col gap-3">
          <span className="text-[15px] font-semibold text-[var(--blyss-text)]">Mode de paiement</span>
          <div className="flex flex-col gap-2.5">
            <PaymentChoice
              selected={paymentMethod === 'on_site'}
              onPress={() => onSelectPayment('on_site')}
              icon={<CreditCard size={20} />}
              title="Payer sur place"
              subtitle="Espèces, carte bancaire"
            />
            <PaymentChoice
              selected={paymentMethod === 'online'}
              onPress={() => onSelectPayment('online')}
              icon={<Smartphone size={20} />}
              title="Payer en ligne"
              subtitle="Carte, Apple Pay, Google Pay"
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-2xl border border-[rgba(245,158,11,0.25)] bg-[#fff7ed] p-3.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#fff7ed] text-[#d97706]">
            <Info size={20} />
          </span>
          <div className="flex-1">
            <p className="mb-0.5 text-[13px] font-bold text-[#b45309]">Paiement sur place</p>
            <p className="text-xs leading-[17px] text-[#b45309]">
              Ce professionnel n&apos;accepte pas le paiement en ligne. Le règlement se fait
              directement lors du rendez-vous.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
