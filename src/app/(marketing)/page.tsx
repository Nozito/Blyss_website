import type { Metadata } from "next";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import SectionExtras from "@/components/sections/SectionExtras";
import SectionFAQ from "@/components/sections/SectionFAQ";
import SectionFooterCta from "@/components/sections/SectionFooterCta";
import { FAQ_ITEMS } from "@/lib/constants";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <CinematicHero />
      <SectionExtras />
      <SectionFAQ />
      <SectionFooterCta />
    </main>
  );
}
