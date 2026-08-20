import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import GlowBlob from "@/components/ui/GlowBlob";
import Reveal from "@/components/ui/Reveal";
import { IconInstagram, IconLinkedIn, IconTikTok } from "@/components/icons";
import { FOOTER_SOCIAL_LINKS } from "@/lib/constants";
import { LEGAL_EDITOR } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Contact — Blyss",
  description: "Une question sur Blyss ? Écris-nous par email ou retrouve-nous sur les réseaux.",
  alternates: { canonical: "/contact" },
};

const INSTAGRAM_HREF = FOOTER_SOCIAL_LINKS.find((link) => link.label === "Instagram")?.href ?? "#";
const TIKTOK_HREF = FOOTER_SOCIAL_LINKS.find((link) => link.label === "TikTok")?.href ?? "#";
const LINKEDIN_HREF = FOOTER_SOCIAL_LINKS.find((link) => link.label === "LinkedIn")?.href ?? "#";

const SOCIAL_LINKS = [
  { label: "Instagram", href: INSTAGRAM_HREF, icon: IconInstagram },
  { label: "TikTok", href: TIKTOK_HREF, icon: IconTikTok },
  { label: "LinkedIn", href: LINKEDIN_HREF, icon: IconLinkedIn },
];

export default function ContactPage() {
  return (
    <main className="proto-flowty relative flex-1 overflow-hidden py-40 sm:py-48" style={{ background: "var(--bg)" }}>
      <GlowBlob className="left-1/2 top-0 -translate-x-1/2" size="50rem" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <Reveal className="mb-16 text-center" as="div">
          <h1 className="mb-6 font-serif text-4xl italic text-[var(--text)] md:text-6xl">
            Parlons de <span className="text-[var(--accent)]">Vous</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-[var(--text-muted)]">
            Une question, un partenariat ou simplement envie de discuter ?
            <br />
            Notre équipe est à votre écoute.
          </p>
        </Reveal>

        <div className="grid items-start gap-8 lg:grid-cols-3 lg:gap-12">
          <Reveal delay={80} className="space-y-6 lg:col-span-1" as="div">
            <div className="group rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow-card)] transition-colors hover:border-[var(--accent)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg-surface)] text-[var(--accent)] transition-transform group-hover:scale-110">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="mb-1 font-bold text-[var(--text)]">Email</h3>
              <p className="mb-4 text-sm text-[var(--text-muted)]">Notre équipe vous répond sous 24h.</p>
              <a href={`mailto:${LEGAL_EDITOR.contact}`} className="font-semibold text-[var(--accent)] hover:underline">
                {LEGAL_EDITOR.contact}
              </a>
            </div>

            <div className="group rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow-card)] transition-colors hover:border-[var(--accent)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg-surface)] text-[var(--accent)] transition-transform group-hover:scale-110">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="mb-1 font-bold text-[var(--text)]">Réseaux Sociaux</h3>
              <p className="mb-4 text-sm text-[var(--text-muted)]">Suivez nos actualités et coulisses.</p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-muted)] transition-all hover:bg-[var(--color-pink-light)] hover:text-[var(--accent)]"
                    style={{ background: "var(--bg-surface)" }}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={160} className="lg:col-span-2" as="div">
            <div className="rounded-[3rem] border border-[var(--border)] bg-[var(--card)]/80 p-8 shadow-[var(--shadow-card)] backdrop-blur-xl md:p-12">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
