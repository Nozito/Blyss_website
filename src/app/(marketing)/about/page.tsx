import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import blyssMark from "../../../../assets/brand/Blyss-mark.png";
import { Button } from "@/components/ui/button";
import GlowBlob from "@/components/ui/GlowBlob";
import Reveal from "@/components/ui/Reveal";
import SectionContainer from "@/components/ui/SectionContainer";

export const metadata: Metadata = {
  title: "À propos de Blyss — Notre histoire",
  description:
    "Fondée en 2025 à Annecy, Blyss réinvente le quotidien des prothésistes ongulaires : réservation, agenda et paiements réunis dans une seule application.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "À propos de Blyss — Notre histoire",
    description:
      "Fondée en 2025 à Annecy, Blyss réinvente le quotidien des prothésistes ongulaires avec une technologie invisible, fluide et élégante.",
    url: "/about",
    type: "website",
  },
};

const ABOUT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "À propos de Blyss",
  url: "https://blyssapp.fr/about",
  mainEntity: {
    "@type": "Organization",
    name: "Blyss",
    foundingDate: "2025",
    founder: {
      "@type": "Person",
      name: "Noah Dekeyzer",
    },
    foundingLocation: {
      "@type": "Place",
      name: "Annecy, France",
    },
  },
};

const PILLARS = [
  {
    title: "Excellence",
    description: "Nous ne faisons aucun compromis sur la qualité. Chaque fonctionnalité est pensée, designée et peaufinée pour être la meilleure du marché.",
  },
  {
    title: "Simplicité",
    description: "Nous croyons en la puissance de la simplicité. Des outils intuitifs et efficaces qui vous font gagner du temps au quotidien.",
  },
  {
    title: "Passion",
    description: "Votre passion est notre moteur. Nous mettons tout notre cœur et notre énergie à soutenir votre créativité au quotidien.",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="proto-flowty relative flex-1 overflow-hidden py-40 sm:py-48" style={{ background: "var(--bg)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_JSON_LD) }} />
      <GlowBlob className="left-1/2 top-0 -translate-x-1/2" size="50rem" />

      <SectionContainer className="relative z-10 max-w-6xl">
        <Reveal>
          <div className="mx-auto mb-20 flex max-w-3xl flex-col items-center gap-6 text-center">
            <h1 className="text-[2.75rem] font-extrabold leading-[1.05] tracking-tight text-[var(--text)] sm:text-6xl md:text-7xl">
              L&apos;histoire derrière
              <br />
              <span className="font-serif italic text-[var(--accent)]">Blyss.</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-[var(--text-muted)]">
              Fondée en 2025 à Annecy, notre aventure a commencé avec une mission claire : révolutionner l'organisation grâce à une technologie invisible, fluide et élégante, préservant l'humain au cœur de chaque échange.
            </p>

            {/* <Button
              asChild
              size="lg"
              className="bg-[var(--accent)] text-white hover:bg-[var(--accent)] hover:opacity-90"
            >
              <Link href="/">Découvrir Blyss</Link>
            </Button> */}
          </div>
        </Reveal>

        <Reveal delay={80} className="mt-24">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-[2rem] font-extrabold leading-tight text-[var(--text)] sm:text-[2.5rem]">L'ambition Blyss</h2>
            <p className="mt-3 text-[var(--text-muted)]">
              Redéfinir les standards de la beauté connectée, un salon à la fois.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-7 shadow-[var(--shadow-card)]">
                <p className="text-2xl font-bold text-[var(--accent)]">{pillar.title}</p>
                <p className="mt-3 leading-relaxed text-[var(--text-muted)]">{pillar.description}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200} className="mt-24">
          <blockquote className="mx-auto max-w-2xl">
            <p className="text-balance text-lg font-semibold text-[var(--text)] sm:text-xl md:text-2xl">
              &quot;J&apos;ai créé Blyss parce que je voyais des prothésistes jongler entre les réseaux sociaux,
              une appli de messages et un calendrier séparé, en perdant un temps fou sur de l'administratif
              au lieu d&apos;exercer leur métier. Blyss réunit ces outils simplement, pour redonner de
              la sérénité aux prothésistes ongulaires et un parcours de réservation fluide à leurs
              client·es.&quot;
            </p>
            <div className="mt-8 flex items-center gap-6">
              <Image src={blyssMark} alt="" aria-hidden="true" className="h-8 w-auto" />
              <div className="space-y-1 border-l border-[var(--border)] pl-6">
                <cite className="font-medium text-[var(--text)] not-italic">Noah Dekeyzer</cite>
                <span className="block text-sm text-[var(--text-muted)]">Fondateur de Blyss</span>
              </div>
            </div>
          </blockquote>
        </Reveal>
      </SectionContainer>
    </main>
  );
}
