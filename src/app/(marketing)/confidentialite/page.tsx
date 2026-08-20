import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import LegalHero from "@/components/legal/LegalHero";
import GlowBlob from "@/components/ui/GlowBlob";
import Reveal from "@/components/ui/Reveal";
import {
  PRIVACY_CONTACT_EMAIL,
  PRIVACY_HERO_DESCRIPTION,
  PRIVACY_LAST_UPDATED,
  PRIVACY_PREAMBLE,
  PRIVACY_PURPOSES_TABLE,
  PRIVACY_RIGHTS,
  PRIVACY_SECTIONS,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Blyss",
  description: "Comment Blyss collecte, utilise et protège vos données personnelles, conformément au RGPD.",
  alternates: { canonical: "/confidentialite" },
};

const sectionsBeforeTable = PRIVACY_SECTIONS.filter((section) => section.number < 3);
const sectionsAfterTable = PRIVACY_SECTIONS.filter((section) => section.number > 3);

function SectionEntry({ section }: { section: (typeof PRIVACY_SECTIONS)[number] }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-[var(--text)]">
        {section.number}. {section.title}
      </h3>
      {"body" in section ? (
        <p className="mt-3 leading-relaxed text-[var(--text-muted)]">{section.body}</p>
      ) : (
        <ul className="mt-3 space-y-1.5 text-[var(--text-muted)]">
          {section.items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ConfidentialitePage() {
  return (
    <main className="proto-flowty relative flex-1 overflow-hidden py-40 sm:py-48" style={{ background: "var(--bg)" }}>
      <GlowBlob className="left-1/2 top-0 -translate-x-1/2" size="50rem" />

      <LegalHero
        icon={<ShieldCheck className="h-8 w-8" />}
        title={
          <>
            Politique de <span className="text-[var(--accent)]">Confidentialité</span>
          </>
        }
        description={PRIVACY_HERO_DESCRIPTION}
      />

      <div className="container relative z-10 mx-auto max-w-4xl px-4">
        <Reveal delay={80}>
          <div className="space-y-12 rounded-[3rem] border border-[var(--border)] bg-[var(--card)] p-8 shadow-[var(--shadow-card)] md:p-16">
            <p className="border-b border-[var(--border)] pb-8 text-lg font-light leading-relaxed text-[var(--text-muted)]">
              {PRIVACY_PREAMBLE}
            </p>

            <div className="grid gap-12 md:grid-cols-2">
              {sectionsBeforeTable.map((section) => (
                <SectionEntry key={section.title} section={section} />
              ))}
            </div>

            <div>
              <h3 className="text-xl font-bold text-[var(--text)]">3. Finalités et bases légales</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] text-left text-[var(--text)]">
                      <th className="py-2 pr-4 font-bold">Finalité</th>
                      <th className="py-2 pr-4 font-bold">Données concernées</th>
                      <th className="py-2 font-bold">Base légale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PRIVACY_PURPOSES_TABLE.map((row) => (
                      <tr key={row.purpose} className="border-b border-[var(--border)] align-top text-[var(--text-muted)]">
                        <td className="py-3 pr-4">{row.purpose}</td>
                        <td className="py-3 pr-4">{row.data}</td>
                        <td className="py-3">{row.basis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
                Les données signalées comme obligatoires lors de l&apos;inscription, de la réservation ou du paiement sont
                nécessaires à la fourniture de la fonctionnalité demandée. Blyss ne prend pas de décision produisant des
                effets juridiques à votre égard sur le seul fondement d&apos;un traitement automatisé.
              </p>
            </div>

            <div className="grid gap-12 md:grid-cols-2">
              {sectionsAfterTable.map((section) => (
                <SectionEntry key={section.title} section={section} />
              ))}
            </div>

            <div className="space-y-6 rounded-3xl p-8" style={{ background: "var(--bg-surface)" }}>
              <h3 className="flex items-center gap-2 text-xl font-bold text-[var(--text)]">
                <span className="h-6 w-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                Vos Droits
              </h3>
              <p className="leading-relaxed text-[var(--text-muted)]">{PRIVACY_RIGHTS}</p>
              <a
                href={`mailto:${PRIVACY_CONTACT_EMAIL}`}
                className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 py-3 text-sm font-bold text-[var(--text)] shadow-sm transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
              >
                Exercer mes droits
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-16 text-center text-xs text-[var(--text-muted)]">Dernière mise à jour : {PRIVACY_LAST_UPDATED}</p>
        </Reveal>
      </div>
    </main>
  );
}
