import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

type LegalHeroProps = {
  icon?: ReactNode;
  eyebrow?: string;
  title: ReactNode;
  description?: string;
};

export default function LegalHero({ icon, eyebrow, title, description }: LegalHeroProps) {
  return (
    <div className="container relative z-10 mx-auto max-w-4xl px-4">
      <Reveal className="mb-16 text-center" as="div">
        {icon && (
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--bg-surface)] text-[var(--accent)]">
            {icon}
          </div>
        )}
        {eyebrow && (
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-[var(--accent-2)]">{eyebrow}</p>
        )}
        <h1 className="mb-6 font-serif text-4xl italic text-[var(--text)] md:text-6xl">{title}</h1>
        {description && <p className="mx-auto max-w-2xl text-lg text-[var(--text-muted)]">{description}</p>}
      </Reveal>
    </div>
  );
}
