'use client';

import { useEffect, useState } from 'react';
import { Check, Heart, Star } from 'lucide-react';
import {
  blyssOnboarding,
  blyssFavorites,
  type OnboardingRecommendation,
} from '@/lib/blyss/api';
import { resolveMediaUrl } from '@/lib/blyss/config';
import { StoreBadges } from '@/components/app/StoreBadges';
import {
  ATTRIBUTION_OPTIONS,
  CLIENT_NAIL_STYLE_OPTIONS,
  HOW_IT_WORKS,
  NOTIF,
  STEP,
  STEP_COUNT,
  WELCOME,
  scarcityLabel,
} from '@/lib/blyss/onboarding-content';

const CREAM = '#F6E9EE';
const PRUNE = '#3D1F2C';
const ROSE = '#FE5D9D';

const pad2 = (n: number) => String(n).padStart(2, '0');

interface Props {
  onDone: (action: 'book' | 'done') => void;
  onSkip: () => void;
  fromBooking?: boolean;
}

function Pill({
  label,
  onClick,
  bg,
  fg,
  loading,
  disabled,
}: {
  label: string;
  onClick: () => void;
  bg: string;
  fg: string;
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="flex h-14 w-full items-center justify-center rounded-full text-[15px] font-extrabold transition-transform active:scale-[0.985] disabled:opacity-50"
      style={{ background: bg, color: fg }}
    >
      {loading ? (
        <span
          className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"
          style={{ borderColor: fg, borderTopColor: 'transparent' }}
        />
      ) : (
        label
      )}
    </button>
  );
}

export function ClientOnboardingFlow({ onDone, onSkip, fromBooking }: Props) {
  const [step, setStep] = useState<number>(STEP.WELCOME);
  const [busy, setBusy] = useState(false);

  const [styles, setStyles] = useState<string[]>([]);
  const [city, setCity] = useState('');
  const [recos, setRecos] = useState<OnboardingRecommendation[]>([]);
  const [recosLoading, setRecosLoading] = useState(false);
  const [favs, setFavs] = useState<Set<number>>(new Set());

  const go = (n: number) => setStep(n);

  const skip = () => {
    void blyssOnboarding.skip();
    onSkip();
  };

  const finish = (action: 'book' | 'done') => {
    void blyssOnboarding.complete();
    onDone(action);
  };

  const bg =
    step === STEP.HOW_IT_WORKS || step === STEP.NOTIFICATIONS
      ? PRUNE
      : step === STEP.WELCOME || step === STEP.CTA
        ? ROSE
        : CREAM;
  const ink = bg === PRUNE || bg === ROSE ? '#fff' : PRUNE;

  const submitPreferences = async () => {
    setBusy(true);
    await blyssOnboarding.setPreferences(styles, city.trim() || undefined);
    setBusy(false);
    go(STEP.RECOMMENDATIONS);
  };

  useEffect(() => {
    if (step !== STEP.RECOMMENDATIONS) return;
    setRecosLoading(true);
    blyssOnboarding
      .getRecommendations(city.trim() || undefined)
      .then((res) => setRecos(res.success && res.data ? res.data.recommendations : []))
      .finally(() => setRecosLoading(false));
  }, [step, city]);

  const toggleFav = (proId: number) => {
    setFavs((prev) => {
      const next = new Set(prev);
      if (next.has(proId)) {
        next.delete(proId);
        void blyssFavorites.remove(proId);
      } else {
        next.add(proId);
        void blyssFavorites.add(proId);
      }
      return next;
    });
  };

  const chooseAttribution = (source: string) => {
    void blyssOnboarding.setAttribution(source);
    go(STEP.CTA);
  };

  return (
    <div
      className="flex min-h-screen flex-col px-5 pb-8 pt-6 transition-colors"
      style={{ background: bg, color: ink }}
    >
      <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col">
        <div className="mb-6 flex items-start justify-between">
          <span className="text-[30px] font-black tracking-tight">{pad2(step)}</span>
          <button type="button" onClick={skip} className="text-sm font-semibold opacity-70">
            {step === STEP.ATTRIBUTION ? 'Passer' : 'Plus tard'}
          </button>
        </div>
        <div className="mb-8 h-[3px] w-full overflow-hidden rounded-full bg-white/25">
          <div
            className="h-full rounded-full bg-current transition-[width] duration-500"
            style={{ width: `${(step / STEP_COUNT) * 100}%` }}
          />
        </div>

        <div className="flex flex-1 flex-col">
          {step === STEP.WELCOME && (
            <div className="flex flex-1 flex-col justify-end gap-5">
              <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase">
                {WELCOME.sticker}
              </span>
              <h1 className="text-[40px] font-black uppercase leading-[1.05]">{WELCOME.title}</h1>
              <p className="text-base opacity-90">{WELCOME.body}</p>
              <p className="text-sm font-semibold opacity-80">{WELCOME.socialProof}</p>
              <Pill label={WELCOME.cta} onClick={() => go(STEP.HOW_IT_WORKS)} bg="#fff" fg={ROSE} />
            </div>
          )}

          {step === STEP.HOW_IT_WORKS && (
            <div className="flex flex-1 flex-col gap-6">
              <span className="text-xs font-bold uppercase opacity-70">{HOW_IT_WORKS.eyebrow}</span>
              <h1 className="text-[34px] font-black uppercase leading-[1.05]">{HOW_IT_WORKS.title}</h1>
              <ol className="mt-2 flex flex-col gap-4">
                {HOW_IT_WORKS.steps.map((s, i) => (
                  <li key={i} className="flex items-center gap-4 text-[15px]">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-black">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
              <div className="mt-auto">
                <Pill label={HOW_IT_WORKS.cta} onClick={() => go(STEP.PREFERENCES)} bg="#fff" fg={PRUNE} />
              </div>
            </div>
          )}

          {step === STEP.PREFERENCES && (
            <div className="flex flex-1 flex-col gap-5">
              <h1 className="text-[30px] font-black uppercase leading-[1.05]">Tu aimes quoi ?</h1>
              <p className="text-sm opacity-70">Choisis un ou plusieurs styles.</p>
              <div className="flex flex-wrap gap-2">
                {CLIENT_NAIL_STYLE_OPTIONS.map((o) => {
                  const on = styles.includes(o.value);
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() =>
                        setStyles((prev) =>
                          prev.includes(o.value)
                            ? prev.filter((v) => v !== o.value)
                            : [...prev, o.value],
                        )
                      }
                      className="rounded-full border px-4 py-2 text-sm font-bold"
                      style={{
                        background: on ? PRUNE : 'transparent',
                        color: on ? '#fff' : PRUNE,
                        borderColor: PRUNE,
                      }}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
              <label className="mt-2 flex flex-col gap-1 text-xs font-semibold opacity-80">
                Ta ville
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ex. Annecy"
                  className="rounded-[14px] border border-[rgba(61,31,44,0.25)] bg-white px-4 py-3 text-[15px] text-[#3D1F2C] outline-none"
                />
              </label>
              <div className="mt-auto">
                <Pill
                  label="Voir mes pros"
                  onClick={submitPreferences}
                  bg={PRUNE}
                  fg="#fff"
                  loading={busy}
                  disabled={styles.length === 0}
                />
              </div>
            </div>
          )}

          {step === STEP.RECOMMENDATIONS && (
            <div className="flex flex-1 flex-col gap-4">
              <h1 className="text-[28px] font-black uppercase leading-[1.05]">Pour toi</h1>
              {recosLoading ? (
                <div className="flex justify-center py-12">
                  <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#3D1F2C] border-t-transparent" />
                </div>
              ) : recos.length === 0 ? (
                <p className="text-sm opacity-70">
                  Pas encore de reco — explore les pros directement dans l&apos;app.
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {recos.map((r) => (
                    <div
                      key={r.pro_id}
                      className="flex items-center gap-3 rounded-2xl bg-white p-3 text-[#3D1F2C]"
                    >
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#f0e3e8]">
                        {resolveMediaUrl(r.profile_photo) && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={resolveMediaUrl(r.profile_photo)}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">{r.name}</p>
                        <p className="truncate text-xs opacity-60">{r.city ?? ''}</p>
                        <div className="mt-0.5 flex items-center gap-2 text-[11px] opacity-70">
                          {r.rating > 0 && (
                            <span className="flex items-center gap-0.5">
                              <Star size={11} fill="currentColor" /> {r.rating.toFixed(1)}
                            </span>
                          )}
                          <span>{scarcityLabel(r.open_slots)}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleFav(r.pro_id)}
                        aria-label="Favori"
                        className="p-1"
                      >
                        <Heart
                          size={20}
                          className="text-[#FE5D9D]"
                          fill={favs.has(r.pro_id) ? 'currentColor' : 'none'}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-auto">
                <Pill label="Continuer" onClick={() => go(STEP.NOTIFICATIONS)} bg={PRUNE} fg="#fff" />
              </div>
            </div>
          )}

          {step === STEP.NOTIFICATIONS && (
            <div className="flex flex-1 flex-col gap-5">
              <span className="text-xs font-bold uppercase opacity-70">{NOTIF.eyebrow}</span>
              <h1 className="text-[30px] font-black uppercase leading-[1.05]">{NOTIF.title}</h1>
              <p className="text-base opacity-90">{NOTIF.body}</p>
              <StoreBadges className="!justify-start" />
              <div className="mt-auto">
                <Pill label="Continuer" onClick={() => go(STEP.ATTRIBUTION)} bg="#fff" fg={PRUNE} />
              </div>
            </div>
          )}

          {step === STEP.ATTRIBUTION && (
            <div className="flex flex-1 flex-col gap-5">
              <h1 className="text-[28px] font-black uppercase leading-[1.05]">
                Comment tu as connu Blyss ?
              </h1>
              <div className="flex flex-col gap-2.5">
                {ATTRIBUTION_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => chooseAttribution(o.value)}
                    className="flex items-center justify-between rounded-2xl border border-[rgba(61,31,44,0.2)] bg-white px-4 py-3.5 text-left text-sm font-bold text-[#3D1F2C]"
                  >
                    {o.label}
                    <Check size={16} className="opacity-0" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(STEP.CTA)}
                className="mt-auto text-center text-sm font-semibold opacity-70"
              >
                Passer
              </button>
            </div>
          )}

          {step === STEP.CTA && (
            <div className="flex flex-1 flex-col justify-end gap-5">
              <h1 className="text-[36px] font-black uppercase leading-[1.05]">
                {fromBooking ? 'On finit ta résa ?' : 'Prête à réserver ?'}
              </h1>
              <p className="text-base opacity-90">
                {fromBooking
                  ? 'Ton compte est prêt — reprends ta réservation là où tu en étais.'
                  : 'Trouve ta pro et réserve ton créneau en une minute.'}
              </p>
              <Pill
                label={fromBooking ? 'Reprendre ma réservation' : 'Découvrir les pros'}
                onClick={() => {
                  void blyssOnboarding.tapCta();
                  finish(fromBooking ? 'book' : 'done');
                }}
                bg="#fff"
                fg={ROSE}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
