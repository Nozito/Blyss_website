import type { Metadata } from "next";
import { Component as PricingSection } from "@/components/ui/pricing-section";

export const metadata: Metadata = {
  title: "Tarifs — Blyss",
  description: "Les formules Blyss pour les professionnel·les de la beauté : Start, Sérénité, Signature, et une offre sur-mesure pour les salons et franchises.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <main className="proto-flowty relative flex-1 overflow-hidden" style={{ background: "var(--bg)" }}>
      <PricingSection />
    </main>
  );
}
