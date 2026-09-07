/** #34 — contenu statique onboarding client. Porté de blyss-mobile. Zéro emoji. */
import type { NailStyle } from './api';

export const CLIENT_NAIL_STYLE_OPTIONS: { value: NailStyle; label: string }[] = [
  { value: 'semi_permanent', label: 'Semi-permanent' },
  { value: 'french', label: 'French' },
  { value: 'baby_boomer_ombre', label: 'Baby boomer / ombré' },
  { value: 'nail_art', label: 'Nail art' },
  { value: 'effets_finitions', label: 'Effets & finitions' },
  { value: 'formes_sculptees', label: 'Formes sculptées' },
];

export const WELCOME = {
  sticker: '1 minute chrono',
  title: 'Tes ongles méritent mieux',
  body: 'Les meilleures prothésistes ongulaires près de chez toi — leur vrai travail, leurs vraies dispos.',
  socialProof: '→ Des milliers de RDV nails / mois',
  cta: 'On y va',
};

export const HOW_IT_WORKS = {
  eyebrow: 'Avant de commencer',
  title: "Trois étapes, c'est tout",
  steps: [
    'Tu choisis ta pro et ton créneau',
    'Tu reçois ta confirmation direct',
    "Tu payes à l'institut, après ton soin",
  ],
  cta: "J'ai compris",
};

export const NOTIF = {
  eyebrow: 'Presque fini',
  title: 'On te prévient au bon moment',
  body: "Quand un créneau se libère chez ta pro, et quand c'est l'heure de refaire tes ongles. Active les notifications dans l'app Blyss.",
};

export const ATTRIBUTION_OPTIONS: { value: string; label: string }[] = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'amie', label: 'Une amie' },
  { value: 'prothesiste', label: 'Ma prothésiste' },
  { value: 'google', label: 'Recherche Google' },
  { value: 'pub', label: 'Une pub' },
];

export const STEP = {
  WELCOME: 1,
  HOW_IT_WORKS: 2,
  PREFERENCES: 3,
  RECOMMENDATIONS: 4,
  NOTIFICATIONS: 5,
  ATTRIBUTION: 6,
  CTA: 7,
} as const;

export const STEP_COUNT = 7;

export const scarcityLabel = (s: { today: number; this_week: number }): string =>
  s.today > 0
    ? `${s.today} créneau${s.today > 1 ? 'x' : ''} · aujourd'hui`
    : `${s.this_week} créneau${s.this_week > 1 ? 'x' : ''} · cette semaine`;
