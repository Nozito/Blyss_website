import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

type LegalArticleProps = {
  index: number;
  title: string;
  children: ReactNode;
  delay?: number;
};

export default function LegalArticle({ index, title, children, delay = 0 }: LegalArticleProps) {
  return (
    <Reveal delay={delay}>
      <section className="rounded-[2.5rem] border border-[var(--border)] bg-[var(--card)] p-8 shadow-[var(--shadow-card)] transition-shadow hover:shadow-lg md:p-10">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--bg-surface)] font-bold text-[var(--accent)]">
            {index}
          </div>
          <h3 className="text-2xl font-bold text-[var(--text)]">{title}</h3>
        </div>
        <div className="space-y-2 pl-4 leading-relaxed text-[var(--text-muted)] md:pl-16">{children}</div>
      </section>
    </Reveal>
  );
}
