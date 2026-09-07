'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useBlyssAuth } from '@/components/app/AuthProvider';

interface Props {
  onLoggedIn: () => void;
  onSignedUp: () => void;
}

const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,128}$/;

const field =
  'w-full rounded-[14px] border border-[var(--blyss-border)] bg-white px-4 py-3 text-[15px] outline-none focus:border-[var(--color-primary)]';

export function AuthStep({ onLoggedIn, onSignedUp }: Props) {
  const { login, signup } = useBlyssAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPw, setShowPw] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'login') {
      setBusy(true);
      const res = await login(email.trim(), password);
      setBusy(false);
      if (res.ok) onLoggedIn();
      else setError(res.error ?? 'Identifiants incorrects.');
      return;
    }

    const cleanPhone = phone.replace(/\s/g, '');
    if (!firstName.trim() || !lastName.trim()) return setError('Renseigne ton prénom et ton nom.');
    if (!/^[0-9]{10}$/.test(cleanPhone))
      return setError('Numéro de téléphone invalide (10 chiffres).');
    if (!birthDate) return setError('Renseigne ta date de naissance.');
    const age = (Date.now() - new Date(birthDate).getTime()) / 31_557_600_000;
    if (age < 16) return setError('Tu dois avoir au moins 16 ans.');
    if (!PASSWORD_RE.test(password))
      return setError(
        'Mot de passe : 8 caractères min., avec une minuscule, une majuscule, un chiffre et un caractère spécial (!@#$%^&*).',
      );
    if (!acceptedTerms)
      return setError('Tu dois accepter les CGU et la politique de confidentialité.');

    setBusy(true);
    const res = await signup({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      password,
      phone_number: cleanPhone,
      birth_date: birthDate,
      role: 'client',
      accepted_terms: true,
    });
    setBusy(false);
    if (res.ok) onSignedUp();
    else setError(res.error ?? 'Impossible de créer le compte.');
  };

  return (
    <div className="flex flex-col gap-5 pb-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-[26px] font-extrabold tracking-tight text-[var(--blyss-text)]">
          {mode === 'login' ? 'Connexion' : 'Crée ton compte'}
        </h1>
        <p className="text-sm text-[var(--blyss-muted)]">
          {mode === 'login'
            ? 'Connecte-toi pour finaliser ta réservation.'
            : 'Un compte est nécessaire pour réserver et suivre ton rendez-vous.'}
        </p>
      </header>

      <form onSubmit={submit} className="flex flex-col gap-3">
        {mode === 'signup' && (
          <div className="flex gap-3">
            <input
              className={field}
              placeholder="Prénom"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className={field}
              placeholder="Nom"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        )}

        <input
          className={field}
          type="email"
          inputMode="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {mode === 'signup' && (
          <>
            <input
              className={field}
              type="tel"
              inputMode="tel"
              placeholder="Téléphone (10 chiffres)"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label className="flex flex-col gap-1 text-xs text-[var(--blyss-muted)]">
              Date de naissance
              <input
                className={field}
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </label>
          </>
        )}

        <div className="relative">
          <input
            className={field}
            type={showPw ? 'text' : 'password'}
            placeholder="Mot de passe"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--blyss-muted)]"
            aria-label={showPw ? 'Masquer' : 'Afficher'}
          >
            {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {mode === 'signup' && (
          <button
            type="button"
            onClick={() => setAcceptedTerms((v) => !v)}
            className="flex items-start gap-2.5 rounded-2xl border bg-white p-3.5 text-left"
            style={{ borderColor: acceptedTerms ? 'var(--color-primary)' : 'var(--blyss-border)' }}
          >
            <span
              className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs text-white"
              style={{
                backgroundColor: acceptedTerms ? 'var(--color-primary)' : 'var(--color-cream)',
                borderColor: acceptedTerms ? 'var(--color-primary)' : 'var(--blyss-border)',
              }}
            >
              {acceptedTerms ? '✓' : ''}
            </span>
            <span className="flex-1 text-xs leading-[17px] text-[var(--blyss-text)]">
              J&apos;accepte les{' '}
              <a href="/cgu" target="_blank" className="underline">
                CGU
              </a>{' '}
              et la{' '}
              <a href="/confidentialite" target="_blank" className="underline">
                politique de confidentialité
              </a>
              .
            </span>
          </button>
        )}

        {error && (
          <p className="rounded-xl bg-[#fef2f2] px-3 py-2 text-xs text-[#dc2626]">{error}</p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-1 flex h-14 items-center justify-center rounded-[16px] bg-[var(--color-primary)] text-[15px] font-bold text-white shadow-[var(--shadow-soft)] disabled:opacity-50"
        >
          {busy ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : mode === 'login' ? (
            'Se connecter'
          ) : (
            'Créer mon compte'
          )}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setMode((m) => (m === 'login' ? 'signup' : 'login'));
          setError(null);
        }}
        className="text-center text-[13px] text-[var(--blyss-muted)]"
      >
        {mode === 'login' ? (
          <>
            Pas encore de compte ?{' '}
            <span className="font-bold text-[var(--color-primary)]">Créer un compte</span>
          </>
        ) : (
          <>
            Déjà un compte ?{' '}
            <span className="font-bold text-[var(--color-primary)]">Se connecter</span>
          </>
        )}
      </button>
    </div>
  );
}
