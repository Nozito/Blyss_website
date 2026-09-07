'use client';

import { useMemo, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { ShieldCheck, CreditCard, AlertCircle } from 'lucide-react';
import { STRIPE_PUBLISHABLE_KEY } from '@/lib/blyss/config';
import { formatPrice } from '@/lib/blyss/format';

const stripePromise = STRIPE_PUBLISHABLE_KEY ? loadStripe(STRIPE_PUBLISHABLE_KEY) : null;

interface Props {
  amount: number;
  depositPercentage: number;
  prestationName?: string;
  clientSecret: string | null;
  onSuccess: () => void;
  onError: (message: string) => void;
}

function PayForm({ amount, onSuccess, onError }: Pick<Props, 'amount' | 'onSuccess' | 'onError'>) {
  const stripe = useStripe();
  const elements = useElements();
  const [paying, setPaying] = useState(false);
  const [ready, setReady] = useState(false);

  const handlePay = async () => {
    if (!stripe || !elements || paying) return;
    setPaying(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      confirmParams: { return_url: window.location.href },
    });
    setPaying(false);

    if (error) {
      onError(error.message ?? 'Le paiement a échoué.');
      return;
    }
    if (
      paymentIntent &&
      ['succeeded', 'processing', 'requires_capture'].includes(paymentIntent.status)
    ) {
      onSuccess();
    } else {
      onError("Le paiement n'a pas abouti. Réessaie.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-[20px] bg-white p-4 shadow-[var(--shadow-card)]">
        {/* Apple Pay / Google Pay / Link / Carte — proposés par Stripe selon
            l'appareil et le navigateur (Apple Pay : Safari + domaine enregistré). */}
        <PaymentElement
          onReady={() => setReady(true)}
          options={{
            layout: { type: 'tabs', defaultCollapsed: false },
            wallets: { applePay: 'auto', googlePay: 'auto' },
          }}
        />
      </div>

      <button
        type="button"
        onClick={handlePay}
        disabled={!ready || paying || !stripe}
        className="flex h-14 items-center justify-center gap-2 rounded-[16px] bg-[var(--color-primary)] text-[15px] font-bold text-white shadow-[var(--shadow-soft)] disabled:opacity-50"
      >
        {paying ? (
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <>
            <CreditCard size={18} />
            Payer {formatPrice(amount)}
          </>
        )}
      </button>
    </div>
  );
}

export function PaymentStep({
  amount,
  depositPercentage,
  prestationName,
  clientSecret,
  onSuccess,
  onError,
}: Props) {
  const options = useMemo(
    () =>
      clientSecret
        ? {
            clientSecret,
            fonts: [
              {
                cssSrc:
                  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
              },
            ],
            appearance: {
              theme: 'flat' as const,
              variables: {
                colorPrimary: '#fe5d9d',
                colorBackground: '#ffffff',
                colorText: '#09090b',
                colorTextSecondary: '#6d6d78',
                colorDanger: '#ef4444',
                borderRadius: '12px',
                fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
                fontWeightNormal: '500',
                fontWeightBold: '700',
                spacingUnit: '4px',
              },
              rules: {
                '.Label': { fontWeight: '600', color: '#6d6d78' },
                '.Input': { border: '1px solid #ebe6e0', boxShadow: 'none' },
                '.Input:focus': { border: '1px solid #fe5d9d', boxShadow: 'none' },
                '.Tab': { border: '1px solid #ebe6e0' },
                '.Tab--selected': { borderColor: '#fe5d9d', color: '#fe5d9d' },
              },
            },
          }
        : undefined,
    [clientSecret],
  );

  return (
    <div className="flex flex-col gap-5 pb-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-[26px] font-extrabold tracking-tight text-[var(--blyss-text)]">
          Paiement sécurisé
        </h1>
        <p className="text-sm text-[var(--blyss-muted)]">
          {depositPercentage < 100
            ? `Acompte de ${depositPercentage}% à payer maintenant`
            : 'Termine le paiement pour confirmer'}
        </p>
      </header>

      <div className="flex flex-col gap-3 rounded-[20px] bg-white p-5 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[var(--blyss-muted)]">Total à payer</span>
          <span className="text-[28px] font-extrabold text-[var(--blyss-text)]">
            {formatPrice(amount)}
          </span>
        </div>
        {prestationName && (
          <>
            <div className="h-px bg-[var(--blyss-border)]" />
            <div className="flex items-center justify-between gap-4">
              <span className="text-[13px] text-[var(--blyss-muted)]">Prestation</span>
              <span className="truncate text-[13px] font-medium text-[var(--blyss-text)]">
                {prestationName}
              </span>
            </div>
          </>
        )}
      </div>

      {!stripePromise ? (
        <div className="flex flex-col items-center gap-3 rounded-[20px] bg-white p-6 text-center shadow-[var(--shadow-card)]">
          <AlertCircle size={32} className="text-[#ef4444]" />
          <p className="text-sm text-[var(--blyss-text)]">
            Le paiement en ligne est momentanément indisponible (clé Stripe non configurée).
          </p>
        </div>
      ) : !clientSecret || !options ? (
        <div className="flex flex-col items-center gap-3 rounded-[20px] bg-white p-8 text-center shadow-[var(--shadow-card)]">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
          <p className="text-[13px] text-[var(--blyss-muted)]">Initialisation du paiement…</p>
        </div>
      ) : (
        <Elements stripe={stripePromise} options={options}>
          <PayForm amount={amount} onSuccess={onSuccess} onError={onError} />
        </Elements>
      )}

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-[var(--blyss-muted)]">
        <ShieldCheck size={14} />
        Paiement sécurisé par Stripe
      </div>
      <p className="text-center text-[11px] leading-4 text-[var(--blyss-muted)]">
        Besoin d&apos;annuler ? Tu peux le faire depuis l&apos;app Blyss — les conditions
        d&apos;annulation du professionnel s&apos;appliquent.
      </p>
    </div>
  );
}
