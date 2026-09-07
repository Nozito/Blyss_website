'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { useBlyssAuth } from '@/components/app/AuthProvider';
import {
  blyssBooking,
  blyssPublic,
  type AvailabilityResponse,
  type ConditionItem,
  type Prestation,
  type PublicPro,
} from '@/lib/blyss/api';
import {
  calculateEndDateTime,
  canPayOnline as computeCanPayOnline,
  resolvePaymentType,
  toLocalDateStr,
  toNumber,
} from '@/lib/blyss/format';
import { StepIndicator } from './StepIndicator';
import { ServiceSelector } from './ServiceSelector';
import { DateTimeSelector, type Slot } from './DateTimeSelector';
import { BookingSummary } from './BookingSummary';
import { AuthStep } from './AuthStep';
import { PaymentStep } from './PaymentStep';
import { ConfirmationStep } from './ConfirmationStep';
import { RibbonSweep } from '@/components/app/RibbonSweep';
import { ClientOnboardingFlow } from '@/components/app/onboarding/ClientOnboardingFlow';

type Step = 'service' | 'datetime' | 'summary' | 'auth' | 'onboarding' | 'payment' | 'confirm';
const PROGRESS_STEPS: Step[] = ['service', 'datetime', 'summary', 'payment'];

function parseConditions(raw: PublicPro['acceptance_conditions']): ConditionItem[] | null {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as ConditionItem[];
    } catch {
      return null;
    }
  }
  return null;
}

function mapSlots(data: AvailabilityResponse, dateStr: string): Slot[] {
  const day = data.days.find((d) => d.date === dateStr);
  if (!day) return [];
  return day.slots.map((s, i) => ({
    id: i,
    time: new Date(s.start).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    duration: data.requested_duration_minutes,
    startISO: s.start,
  }));
}

export function BookingFlow({ proId }: { proId: string }) {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useBlyssAuth();

  const [step, setStep] = useState<Step>('service');
  const [loading, setLoading] = useState(true);
  const [pro, setPro] = useState<PublicPro | null>(null);
  const [prestations, setPrestations] = useState<Prestation[]>([]);
  const [fatal, setFatal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedPrestation, setSelectedPrestation] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'on_site' | null>(null);
  const [cancellationPolicyAccepted, setCancellationPolicyAccepted] = useState(false);
  const [withdrawalRightAccepted, setWithdrawalRightAccepted] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [pendingReservationId, setPendingReservationId] = useState<number | null>(null);
  const [depositPercentage, setDepositPercentage] = useState(0);
  const [depositAmount, setDepositAmount] = useState<number | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [pendingProceed, setPendingProceed] = useState(false);

  const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());
  const [isLoadingDates, setIsLoadingDates] = useState(true);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Pro + prestations
  useEffect(() => {
    setLoading(true);
    void (async () => {
      const [proRes, prestRes] = await Promise.all([
        blyssPublic.getPro(proId),
        blyssPublic.getServices(proId),
      ]);
      if (!proRes.success || !proRes.data) {
        setFatal(true);
        setLoading(false);
        return;
      }
      setPro({
        ...proRes.data,
        deposit_percentage: Number(proRes.data.deposit_percentage ?? 50),
        cancellation_notice_hours: Number(proRes.data.cancellation_notice_hours ?? 24),
      });
      setPrestations(
        (prestRes.success && prestRes.data ? prestRes.data : [])
          .filter((p) => p.active !== false)
          .map((p) => ({
            id: p.id,
            name: p.name,
            description: p.description ?? null,
            price: Number(p.price),
            duration_minutes: Number(p.duration_minutes),
          })),
      );
      setLoading(false);
    })();
  }, [proId]);

  useEffect(() => {
    if (pendingReservationId == null) return;
    setPendingReservationId(null);
    setClientSecret(null);
  }, [selectedPrestation, selectedDate, selectedTime, pendingReservationId]);

  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate]);

  // Dates du mois
  useEffect(() => {
    if (step !== 'datetime' || !selectedPrestation) return;
    setIsLoadingDates(true);
    void (async () => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const now = new Date();
      const firstOfMonth = new Date(year, month, 1);
      const from = firstOfMonth < now ? now : firstOfMonth;
      const lastOfMonth = new Date(year, month + 1, 0);
      const res = await blyssPublic.getAvailability({
        proId,
        serviceIds: [selectedPrestation],
        from: toLocalDateStr(from),
        to: toLocalDateStr(lastOfMonth),
      });
      setAvailableDates(
        res.success && res.data
          ? new Set(res.data.days.filter((d) => d.slots.length > 0).map((d) => d.date))
          : new Set(),
      );
      setIsLoadingDates(false);
    })();
  }, [proId, step, selectedPrestation, currentMonth]);

  // Créneaux de la date + refresh 30s
  useEffect(() => {
    if (!selectedDate || !selectedPrestation) return;
    const dateStr = toLocalDateStr(selectedDate);
    const fetchSlots = async (showLoader: boolean) => {
      if (showLoader) setIsLoadingSlots(true);
      const res = await blyssPublic.getAvailability({
        proId,
        serviceIds: [selectedPrestation],
        from: dateStr,
        to: dateStr,
      });
      setAvailableSlots(res.success && res.data ? mapSlots(res.data, dateStr) : []);
      if (showLoader) setIsLoadingSlots(false);
    };
    void fetchSlots(true);
    const interval = window.setInterval(() => void fetchSlots(false), 30_000);
    return () => window.clearInterval(interval);
  }, [proId, selectedDate, selectedPrestation]);

  const selectedPrestationData = useMemo(
    () => prestations.find((p) => p.id === selectedPrestation),
    [prestations, selectedPrestation],
  );

  const canPayOnline = computeCanPayOnline(
    Boolean(pro?.stripe_onboarding_complete),
    Boolean(pro?.accept_online_payment),
  );
  const mustPayOnline = canPayOnline && (pro?.deposit_percentage ?? 0) > 0;

  useEffect(() => {
    if (!pro) return;
    if (!canPayOnline) {
      if (paymentMethod === null) setPaymentMethod('on_site');
    } else if (mustPayOnline && paymentMethod !== 'online') {
      setPaymentMethod('online');
    }
  }, [pro, canPayOnline, mustPayOnline, paymentMethod]);

  const proceedAfterSummary = useCallback(async () => {
    if (!isAuthenticated) {
      setPendingProceed(true);
      setStep('auth');
      return;
    }
    if (!selectedPrestation || !selectedDate || !selectedTime || !selectedPrestationData) {
      setError('Sélection incomplète.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      let reservationId = pendingReservationId;
      let depositPct = depositPercentage;

      if (reservationId == null) {
        const slot = availableSlots.find((s) => s.time === selectedTime);
        const startDT = slot?.startISO
          ? new Date(slot.startISO)
          : (() => {
              const [h, m] = selectedTime.split(':').map(Number);
              const d = new Date(selectedDate);
              d.setHours(h, m, 0, 0);
              return d;
            })();
        const endDT = slot?.startISO
          ? new Date(startDT.getTime() + selectedPrestationData.duration_minutes * 60_000)
          : calculateEndDateTime(selectedDate, selectedTime, selectedPrestationData.duration_minutes);

        const res = await blyssBooking.createReservation({
          pro_id: Number(proId),
          prestation_id: selectedPrestation,
          start_datetime: startDT.toISOString(),
          end_datetime: endDT.toISOString(),
          price: selectedPrestationData.price,
          payment_method: paymentMethod ?? 'on_site',
          early_execution_requested: withdrawalRightAccepted,
        });
        if (!res.success || !res.data) throw new Error(res.error ?? 'Erreur lors de la réservation');
        reservationId = res.data.id;
        depositPct = toNumber(res.data.deposit_percentage);
        setPendingReservationId(res.data.id);
        setDepositPercentage(depositPct);
        setDepositAmount(res.data.deposit_amount == null ? null : toNumber(res.data.deposit_amount));
      }

      if (paymentMethod === 'on_site') {
        setStep('confirm');
        return;
      }

      const intent = await blyssBooking.createPaymentIntent({
        reservation_id: reservationId,
        type: resolvePaymentType(depositPct),
      });
      if (!intent.success || !intent.data) throw new Error(intent.error ?? 'Erreur de paiement');
      setClientSecret(intent.data.client_secret);
      setDepositAmount(toNumber(intent.data.amount));
      setStep('payment');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur lors de la réservation.');
    } finally {
      setSubmitting(false);
    }
  }, [
    isAuthenticated,
    proId,
    selectedPrestation,
    selectedDate,
    selectedTime,
    selectedPrestationData,
    pendingReservationId,
    depositPercentage,
    availableSlots,
    paymentMethod,
    withdrawalRightAccepted,
  ]);

  useEffect(() => {
    if (pendingProceed && isAuthenticated && step !== 'onboarding') {
      setPendingProceed(false);
      void proceedAfterSummary();
    }
  }, [pendingProceed, isAuthenticated, step, proceedAfterSummary]);

  const handleBack = () => {
    setError(null);
    if (step === 'datetime') setStep('service');
    else if (step === 'summary') setStep('datetime');
    else if (step === 'auth' || step === 'payment') setStep('summary');
    else router.push(`/s/${proId}`);
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
      </div>
    );
  }

  if (fatal || !pro) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-base font-semibold text-[var(--blyss-text)]">Profil indisponible</p>
        <p className="max-w-[320px] text-sm text-[var(--blyss-muted)]">
          Ce profil n&apos;existe pas ou n&apos;est plus public.
        </p>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-bold text-white"
        >
          Retour à l&apos;accueil
        </button>
      </div>
    );
  }

  const proName =
    pro.activity_name || `${pro.first_name ?? ''} ${pro.last_name ?? ''}`.trim() || 'la pro';

  if (prestations.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-base font-semibold text-[var(--blyss-text)]">Aucune prestation disponible</p>
        <button
          type="button"
          onClick={() => router.push(`/s/${proId}`)}
          className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-bold text-white"
        >
          Retour au profil
        </button>
      </div>
    );
  }

  if (step === 'onboarding') {
    return (
      <ClientOnboardingFlow
        fromBooking
        onSkip={() => setStep('summary')}
        onDone={(action) => {
          if (action === 'book') setStep('summary');
          else router.push(`/s/${proId}`);
        }}
      />
    );
  }

  // Confirmation : plein écran "rupture" (hors cadre téléphone).
  if (step === 'confirm' && selectedDate && selectedTime && selectedPrestationData) {
    return (
      <ConfirmationStep
        proId={proId}
        proName={proName}
        prestationName={selectedPrestationData.name}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        paymentMethod={paymentMethod}
        depositPercentage={depositPercentage}
        depositAmount={depositAmount}
      />
    );
  }

  const progressIndex = PROGRESS_STEPS.indexOf(step === 'auth' ? 'summary' : (step as Step));
  const stepValid =
    step === 'service'
      ? selectedPrestation !== null
      : step === 'datetime'
        ? selectedDate !== null && selectedTime !== null
        : step === 'summary'
          ? paymentMethod !== null && cancellationPolicyAccepted && withdrawalRightAccepted
          : true;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col px-5 md:my-10 md:min-h-[82vh] md:max-w-[440px] md:rounded-[32px] md:border md:border-[var(--blyss-border)] md:bg-[color-mix(in_srgb,white_45%,var(--background))] md:px-7 md:shadow-[var(--shadow-card)]">
      <RibbonSweep />
      {step !== 'confirm' && (
        <div className="py-4">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Retour"
            className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--blyss-border)] bg-white"
          >
            <ChevronLeft size={20} className="text-[var(--blyss-text)]" />
          </button>
          {progressIndex >= 0 && (
            <StepIndicator current={progressIndex + 1} total={PROGRESS_STEPS.length} />
          )}
        </div>
      )}

      <div className="flex-1">
        {step === 'service' && (
          <ServiceSelector
            prestations={prestations}
            selectedId={selectedPrestation}
            onSelect={(pid) => {
              setSelectedPrestation(pid);
              setTimeout(() => setStep('datetime'), 120);
            }}
            proName={proName}
            proCity={pro.city}
            conditions={parseConditions(pro.acceptance_conditions)}
          />
        )}

        {step === 'datetime' && (
          <DateTimeSelector
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            selectedTime={selectedTime}
            onSelectTime={(t) => {
              setSelectedTime(t);
              setTimeout(() => setStep('summary'), 120);
            }}
            availableDates={availableDates}
            isLoadingDates={isLoadingDates}
            availableSlots={availableSlots}
            isLoadingSlots={isLoadingSlots}
            onMonthChange={setCurrentMonth}
          />
        )}

        {step === 'summary' && selectedDate && selectedTime && selectedPrestationData && (
          <BookingSummary
            prestationName={selectedPrestationData.name}
            prestationPrice={selectedPrestationData.price}
            prestationDuration={selectedPrestationData.duration_minutes}
            proName={proName}
            proCity={pro.city}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            paymentMethod={paymentMethod}
            onSelectPayment={setPaymentMethod}
            canPayOnline={canPayOnline}
            mustPayOnline={mustPayOnline}
            depositPercentage={pro.deposit_percentage}
            cancellationNoticeHours={pro.cancellation_notice_hours}
            cancellationPolicyAccepted={cancellationPolicyAccepted}
            onToggleCancellationPolicy={() => setCancellationPolicyAccepted((v) => !v)}
            withdrawalRightAccepted={withdrawalRightAccepted}
            onToggleWithdrawalRight={() => setWithdrawalRightAccepted((v) => !v)}
          />
        )}

        {step === 'auth' && (
          <AuthStep onLoggedIn={() => {}} onSignedUp={() => setStep('onboarding')} />
        )}

        {step === 'payment' && (
          <PaymentStep
            amount={depositAmount ?? selectedPrestationData?.price ?? 0}
            depositPercentage={depositPercentage}
            prestationName={selectedPrestationData?.name}
            clientSecret={clientSecret}
            onSuccess={() => setStep('confirm')}
            onError={(msg) => setError(msg)}
          />
        )}

      </div>

      {error && (
        <p className="mb-2 rounded-xl bg-[#fef2f2] px-3 py-2 text-xs text-[#dc2626]">{error}</p>
      )}

      {step === 'summary' && (
        <div className="py-4">
          <button
            type="button"
            onClick={() => void proceedAfterSummary()}
            disabled={!stepValid || submitting}
            className="flex h-14 w-full items-center justify-center rounded-[16px] bg-[var(--color-primary)] text-[15px] font-bold text-white shadow-[var(--shadow-soft)] disabled:opacity-50"
          >
            {submitting ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : paymentMethod === 'on_site' ? (
              'Confirmer'
            ) : (
              'Continuer'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
