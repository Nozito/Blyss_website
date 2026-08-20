import type { Metadata } from "next";
import LegalAccordionItem from "@/components/legal/LegalAccordionItem";
import LegalHero from "@/components/legal/LegalHero";
import GlowBlob from "@/components/ui/GlowBlob";
import Reveal from "@/components/ui/Reveal";
import { CGU_ARTICLES, CGU_LAST_UPDATED, CGU_PREAMBLE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation — Blyss",
  description: "Conditions générales d'utilisation de la plateforme Blyss par les client·es : compte, réservation, paiement, annulation et rétractation.",
  alternates: { canonical: "/cgu" },
};

export default function CguPage() {
  return (
    <main className="proto-flowty relative flex-1 overflow-hidden py-40 sm:py-48" style={{ background: "var(--bg)" }}>
      <GlowBlob className="left-1/2 top-0 -translate-x-1/2" size="50rem" />

      <LegalHero
        eyebrow="CGU"
        title={
          <>
            Conditions Générales d&apos;<span className="text-[var(--accent)]">Utilisation</span>
          </>
        }
      />

      <div className="container relative z-10 mx-auto max-w-4xl space-y-8 px-4">
        <LegalAccordionItem marker="§" title="Préambule" defaultOpen>
          <p>{CGU_PREAMBLE}</p>
        </LegalAccordionItem>

        {CGU_ARTICLES.map((article, index) => (
          <LegalAccordionItem key={article.title} marker={index + 1} title={`Article ${index + 1} - ${article.title}`} delay={index * 20}>
            <p>{article.body}</p>
          </LegalAccordionItem>
        ))}

        <Reveal delay={CGU_ARTICLES.length * 20}>
          <p className="mt-16 text-center text-xs text-[var(--text-muted)]">Dernière mise à jour : {CGU_LAST_UPDATED}</p>
        </Reveal>
      </div>
    </main>
  );
}
