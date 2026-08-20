import type { Metadata } from "next";
import LegalAccordionItem from "@/components/legal/LegalAccordionItem";
import LegalHero from "@/components/legal/LegalHero";
import GlowBlob from "@/components/ui/GlowBlob";
import Reveal from "@/components/ui/Reveal";
import { CGV_ARTICLES, CGV_LAST_UPDATED, CGV_PREAMBLE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Conditions générales de vente — Blyss",
  description: "Conditions générales de vente des abonnements Blyss : tarifs, paiement, rétractation, résiliation et responsabilité.",
  alternates: { canonical: "/cgv" },
};

export default function CgvPage() {
  return (
    <main className="proto-flowty relative flex-1 overflow-hidden py-40 sm:py-48" style={{ background: "var(--bg)" }}>
      <GlowBlob className="left-1/2 top-0 -translate-x-1/2" size="50rem" />

      <LegalHero
        eyebrow="CGV"
        title={
          <>
            Conditions Générales de <span className="text-[var(--accent)]">Vente</span>
          </>
        }
      />

      <div className="container relative z-10 mx-auto max-w-4xl space-y-8 px-4">
        <LegalAccordionItem marker="§" title="Préambule" defaultOpen>
          <p>{CGV_PREAMBLE}</p>
        </LegalAccordionItem>

        {CGV_ARTICLES.map((article, index) => (
          <LegalAccordionItem key={article.title} marker={index + 1} title={`Article ${index + 1} - ${article.title}`} delay={index * 20}>
            <p>{article.body}</p>
          </LegalAccordionItem>
        ))}

        <Reveal delay={CGV_ARTICLES.length * 20}>
          <p className="mt-16 text-center text-xs text-[var(--text-muted)]">Dernière mise à jour : {CGV_LAST_UPDATED}</p>
        </Reveal>
      </div>
    </main>
  );
}
