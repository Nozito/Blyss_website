import type { Metadata } from "next";
import LegalArticle from "@/components/legal/LegalArticle";
import LegalHero from "@/components/legal/LegalHero";
import LegalRow from "@/components/legal/LegalRow";
import GlowBlob from "@/components/ui/GlowBlob";
import Reveal from "@/components/ui/Reveal";
import { LEGAL_ABUSE_REPORT, LEGAL_DATA_HOSTING, LEGAL_EDITOR, LEGAL_HOST, LEGAL_IP_USER_CONTENT } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Mentions légales — Blyss",
  description: "Informations légales sur l'éditeur, l'hébergeur et la propriété intellectuelle du site Blyss.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <main className="proto-flowty relative flex-1 overflow-hidden py-40 sm:py-48" style={{ background: "var(--bg)" }}>
      <GlowBlob className="left-1/2 top-0 -translate-x-1/2" size="50rem" />

      <LegalHero eyebrow="Informations Juridiques" title={<>Mentions <span className="text-[var(--accent)]">Légales</span></>} />

      <div className="container relative z-10 mx-auto max-w-4xl space-y-8 px-4">
        <LegalArticle index={1} title="Éditeur du site">
          <LegalRow label="Dénomination sociale" value={LEGAL_EDITOR.denomination} />
          <LegalRow label="Forme juridique" value={LEGAL_EDITOR.forme} />
          <LegalRow label="Siège social" value={LEGAL_EDITOR.siege} />
          <LegalRow label="SIRET" value={LEGAL_EDITOR.siret} />
          <LegalRow label="RCS" value={LEGAL_EDITOR.rcs} />
          <LegalRow label="TVA" value={LEGAL_EDITOR.tva} />
          <LegalRow label="Directeur de la publication" value={LEGAL_EDITOR.directeur} />
          <LegalRow label="Contact" value={LEGAL_EDITOR.contact} />
        </LegalArticle>

        <LegalArticle index={2} title="Hébergement" delay={60}>
          <p className="mb-2">
            Le site est hébergé par <strong className="text-[var(--text)]">{LEGAL_HOST.nom}</strong>.
          </p>
          <p className="mt-2 text-sm">
            {LEGAL_HOST.adresse}
            <br />
            {LEGAL_HOST.rcs}
            <br />
            {LEGAL_HOST.ape}
            <br />
            {LEGAL_HOST.tva}
          </p>
          <p className="mt-4">{LEGAL_DATA_HOSTING}</p>
        </LegalArticle>

        <LegalArticle index={3} title="Propriété intellectuelle" delay={120}>
          <p>
            La Plateforme, ses marques, logos, textes, graphismes, interfaces et bases de données sont
            protégés. Toute reproduction, représentation, adaptation ou exploitation non autorisée est
            interdite, sauf exception légale ou accord écrit préalable de Blyss.
          </p>
          <p className="mt-4">{LEGAL_IP_USER_CONTENT}</p>
        </LegalArticle>

        <LegalArticle index={4} title="Signalement de contenu illicite" delay={180}>
          <p>{LEGAL_ABUSE_REPORT}</p>
        </LegalArticle>

        <Reveal delay={240}>
          <p className="mt-16 text-center text-xs text-[var(--text-muted)]">Dernière mise à jour : 19 août 2026</p>
        </Reveal>
      </div>
    </main>
  );
}
