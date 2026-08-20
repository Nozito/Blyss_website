"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronDown, Minus, ArrowRight } from "lucide-react";
import { useState } from "react";
import { PRICING_PLANS } from "@/lib/pricing";

const mailtoFor = (planName: string) =>
  `mailto:contact@blyssapp.fr?subject=${encodeURIComponent(`Formule ${planName} — Blyss`)}`;

const formatEUR = (n: number) => `${n.toFixed(2).replace(".", ",")} €`;

// Chaque formule "includes" celle en-dessous : on résout la liste complète en
// remontant la chaîne, pour que le tableau comparatif reflète ce qui est
// réellement inclus (et pas seulement les fonctionnalités propres à la formule).
function resolvePlanFeatures(plan: (typeof PRICING_PLANS)[number]): string[] {
  if (!plan.includes) return [...plan.features];
  const included = PRICING_PLANS.find((p) => p.name === plan.includes);
  return included ? [...resolvePlanFeatures(included), ...plan.features] : [...plan.features];
}

const COMPARISON_ROWS = Array.from(new Set(PRICING_PLANS.flatMap((plan) => resolvePlanFeatures(plan))));
const PLAN_FEATURE_SETS = new Map(PRICING_PLANS.map((plan) => [plan.id, new Set(resolvePlanFeatures(plan))]));

export const Component = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [showComparison, setShowComparison] = useState(false);

  return (
    <section className="relative w-full py-24 font-sans sm:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="mb-4 max-w-2xl text-balance text-4xl font-medium tracking-tighter text-[var(--text)] sm:text-5xl md:text-6xl">
            Des tarifs clairs. <br className="hidden sm:block" />
            <span className="text-[var(--text-muted)]">Un salon qui grandit.</span>
          </h2>
          <p className="max-w-xl text-balance text-base text-[var(--text-muted)] sm:text-lg">
            Choisis la formule qui te ressemble. Pas de frais cachés, pas d&apos;usine à gaz — juste l&apos;essentiel pour gérer ton activité.
          </p>

          <div className="mt-10 flex items-center gap-3">
            <span className={cn("text-sm font-medium", !isAnnual ? "text-[var(--text)]" : "text-[var(--text-muted)]")}>Mensuel</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors"
              style={{ background: isAnnual ? "var(--accent)" : "var(--border)" }}
              aria-label="Choisir la facturation mensuelle ou annuelle"
            >
              <div
                className={cn(
                  "absolute h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out",
                  isAnnual ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
            <span className={cn("flex items-center gap-2 text-sm font-medium", isAnnual ? "text-[var(--text)]" : "text-[var(--text-muted)]")}>
              Annuel
              <span
                className="whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm"
                style={{ background: "var(--gradient-primary)" }}
              >
                2 mois offerts
              </span>
            </span>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => {
            const featured = plan.featured;
            return (
              <div
                key={plan.id}
                className={cn(
                  "relative flex flex-col rounded-xl border p-8 transition-colors",
                  featured ? "shadow-[var(--shadow-soft)]" : "hover:border-[var(--accent)]"
                )}
                style={{
                  background: "var(--card)",
                  borderColor: featured ? "var(--accent)" : "var(--border)",
                }}
              >
                <div className="mb-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-[var(--text)]">{plan.name}</h3>
                    {featured && (
                      <span
                        className="whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white"
                        style={{ background: "var(--accent)" }}
                      >
                        Plus populaire
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{plan.description}</p>
                </div>

                <div className="mb-1 flex items-baseline gap-1">
                  <span className="text-4xl font-medium tracking-tighter text-[var(--text)]">
                    {formatEUR(isAnnual ? plan.priceAnnual : plan.priceMonthly)}
                  </span>
                  <span className="text-sm font-medium text-[var(--text-muted)]">{isAnnual ? "/ an" : "/ mois"}</span>
                </div>
                {isAnnual ? (
                  <div className="mb-8 space-y-1">
                    <p className="text-xs text-[var(--text-muted)]">
                      <span className="line-through">{formatEUR(plan.priceMonthly * 12)} / an</span>{" "}
                      <span className="font-semibold" style={{ color: "var(--accent)" }}>
                        tu économises {formatEUR(plan.priceMonthly * 12 - plan.priceAnnual)}
                      </span>
                    </p>
                  </div>
                ) : (
                  <p className="mb-8 text-xs text-[var(--text-muted)]">{formatEUR(plan.priceMonthly * 12)} / an en mensuel</p>
                )}

                <a
                  href={mailtoFor(plan.name)}
                  className={cn(
                    "mb-8 flex h-10 w-full items-center justify-center gap-2 rounded-md text-sm font-medium transition-all active:scale-[0.98]",
                    featured ? "text-white hover:opacity-90" : "border hover:bg-[var(--bg-surface)]"
                  )}
                  style={
                    featured
                      ? { background: "var(--accent)" }
                      : { borderColor: "var(--border)", color: "var(--text)", background: "transparent" }
                  }
                >
                  {plan.ctaLabel}
                  {featured && <ArrowRight className="h-4 w-4" />}
                </a>

                <div className="mb-6 h-px w-full" style={{ background: "var(--border)" }} />

                <ul className="flex flex-col gap-4 text-sm text-[var(--text)]">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: featured ? "var(--accent)" : "var(--text-muted)" }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.includes && (
                    <li className="flex items-start gap-3 text-[var(--text-muted)]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: featured ? "var(--accent)" : "var(--text-muted)" }} />
                      <span>Toutes les fonctionnalités {plan.includes}</span>
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowComparison((v) => !v)}
            aria-expanded={showComparison}
            className="flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--bg-surface)]"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            {showComparison ? "Masquer la comparaison" : "Comparer les offres"}
            <ChevronDown
              className="h-4 w-4 transition-transform duration-300"
              style={{ transform: showComparison ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>
        </div>

        <div
          className="grid transition-[grid-template-rows] duration-300 ease-in-out"
          style={{ gridTemplateRows: showComparison ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="mt-8 overflow-x-auto rounded-xl border" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                    <th className="p-4 text-left font-medium text-[var(--text-muted)]">Fonctionnalité</th>
                    {PRICING_PLANS.map((plan) => (
                      <th key={plan.id} className="p-4 text-center font-semibold text-[var(--text)]">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((feature, index) => (
                    <tr
                      key={feature}
                      className="border-t"
                      style={{ borderColor: "var(--border)", background: index % 2 === 1 ? "var(--bg-surface)" : "transparent" }}
                    >
                      <td className="p-4 text-[var(--text)]">{feature}</td>
                      {PRICING_PLANS.map((plan) => {
                        const included = PLAN_FEATURE_SETS.get(plan.id)?.has(feature);
                        return (
                          <td key={plan.id} className="p-4 text-center">
                            {included ? (
                              <Check className="mx-auto h-4 w-4" style={{ color: "var(--accent)" }} />
                            ) : (
                              <Minus className="mx-auto h-4 w-4" style={{ color: "var(--text-muted)", opacity: 0.4 }} />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-[var(--text-muted)]">
          <span className="flex h-2 w-2 rounded-full" style={{ background: "var(--text-muted)" }} />
          Une question sur ces formules ? Écris à contact@blyssapp.fr.
        </div>
      </div>
    </section>
  );
};
