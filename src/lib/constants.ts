export const BLYSS_NAV_LINKS = [
  { href: "/", label: "Découvrir Blyss", enabled: true },
  { href: "/pricing", label: "Tarifs", enabled: true },
  { href: "/about", label: "À propos", enabled: true },
  { href: "/contact", label: "Contact", enabled: true },
] as const;

export const BLYSS_NAVBAR_CTA_LABEL = "Rejoindre";

export const BENTO_HEADING = {
  line1: "Votre salon tourne.",
  line2: "Même quand vous dormez.",
} as const;

export const BENTO_INTRO = "Automatiques. Silencieux. Pensés pour que vous pensiez enfin à autre chose.";

export const FAQ_MARQUEE_TEXT = "Questions ?";

export const FAQ_HEADING = "Des questions ? On répond.";

export const FAQ_INTRO = "Tu as d'autres questions ? Voici les réponses aux plus fréquentes.";

export const FAQ_VISUAL_ALT = "Aperçu du tableau de bord Blyss";

export const FAQ_ITEMS = [
  {
    id: "what-is-blyss",
    question: "Qu'est-ce que Blyss ?",
    answer:
      "Blyss est la plateforme tout-en-un pensée pour les prothésistes ongulaires : réservations, planning, rappels, facturation et encaissement réunis au même endroit.",
  },
  {
    id: "professionals",
    question: "À qui s'adresse Blyss ?",
    answer:
      "Blyss est pensée pour les professionnel·les de l'onglerie, notamment les prothésistes ongulaires, ainsi que pour les salons et franchises.",
  },
  {
    id: "online-booking",
    question: "Les clientes peuvent-elles réserver en ligne ?",
    answer: "Oui, tes clientes peuvent réserver directement en ligne selon les disponibilités de ton planning.",
  },
  {
    id: "pricing",
    question: "Combien coûte Blyss ?",
    answer:
      "Trois formules : Start (29,99 €/mois), Sérénité (39,99 €/mois) et Signature (49,99 €/mois), toutes disponibles aussi en facturation annuelle avec 2 mois offerts. Retrouve le détail sur la page Tarifs.",
  },
] as const;

export const FOOTER_CTA_CONTENT = {
  title: "Prêt·e à simplifier ton activité ?",
  description: "Blyss arrive bientôt pour t'aider à gérer ton activité beauté plus sereinement.",
} as const;

export const FOOTER_SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "Instagram", href: "https://www.instagram.com/blyss_app/" },
  { label: "TikTok", href: "https://www.tiktok.com/@blyss_app" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/blysapp/" },
];

export const FOOTER_COPYRIGHT = "© 2026 Blyss. Tous droits réservés.";
