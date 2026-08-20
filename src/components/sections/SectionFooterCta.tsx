import GlowBlob from "../ui/GlowBlob";
import Reveal from "../ui/Reveal";
import SectionContainer from "../ui/SectionContainer";
import { FOOTER_CTA_CONTENT } from "@/lib/constants";

const [FOOTER_CTA_TITLE_BEFORE, FOOTER_CTA_TITLE_AFTER] = FOOTER_CTA_CONTENT.title.split("simplifier");

export default function SectionFooterCta() {
  return (
    <section
      className="proto-flowty relative grid overflow-clip"
      style={
        {
          background: "var(--ink)",
          "--text": "var(--bg)",
          "--text-muted": "rgba(251,245,239,0.68)",
          minHeight: "min(90svh, 860px)",
          placeItems: "center",
          padding: "120px 5vw",
        } as React.CSSProperties
      }
    >
      <GlowBlob
        className="-bottom-1/3 left-0"
        color="rgba(255,107,156,0.42)"
        size="52rem"
        delay="2s"
      />
      <GlowBlob
        className="-bottom-1/4 left-1/4"
        color="rgba(142,49,92,0.32)"
        size="40rem"
        delay="5s"
      />

      <SectionContainer className="relative z-10 flex flex-col items-center text-center">
        <Reveal>
          <h2
            className="max-w-4xl font-extrabold text-[var(--text)]"
            style={{ fontSize: "clamp(56px,9vw,144px)", lineHeight: 0.9, letterSpacing: "-0.03em" }}
          >
            {FOOTER_CTA_TITLE_BEFORE}
            <span style={{ color: "var(--color-primary)" }}>simplifier</span>
            {FOOTER_CTA_TITLE_AFTER}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-8 max-w-xl text-[1.15rem] leading-relaxed text-[var(--text-muted)] sm:text-[1.35rem]">
            {FOOTER_CTA_CONTENT.description}
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <button
              type="button"
              aria-label="Bientôt disponible sur l'App Store"
              className="btn-modern-light group flex items-center justify-center gap-3 rounded-[1.25rem] px-8 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-dark)] focus-visible:ring-offset-2"
            >
              <svg className="h-8 w-8 transition-transform group-hover:scale-105" fill="currentColor" viewBox="0 0 384 512" aria-hidden="true">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              <div className="text-left">
                <div className="mb-[-2px] text-[10px] font-bold uppercase tracking-wider text-neutral-500">Bientôt sur</div>
                <div className="text-xl font-bold leading-none tracking-tight">l&apos;App Store</div>
              </div>
            </button>
            <button
              type="button"
              aria-label="Bientôt disponible sur Google Play"
              className="btn-modern-dark group flex items-center justify-center gap-3 rounded-[1.25rem] px-8 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-dark)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink)]"
            >
              <svg className="h-7 w-7 transition-transform group-hover:scale-105" fill="currentColor" viewBox="0 0 512 512" aria-hidden="true">
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
              </svg>
              <div className="text-left">
                <div className="mb-[-2px] text-[10px] font-bold uppercase tracking-wider text-neutral-400">Bientôt sur</div>
                <div className="text-xl font-bold leading-none tracking-tight">Google Play</div>
              </div>
            </button>
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}
