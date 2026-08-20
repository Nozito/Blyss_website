"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

type LegalAccordionItemProps = {
  marker: ReactNode;
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  delay?: number;
};

export default function LegalAccordionItem({ marker, title, children, defaultOpen = false, delay = 0 }: LegalAccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const reactId = useId();
  const panelId = `legal-panel-${reactId}`;

  return (
    <Reveal delay={delay}>
      <div className="overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-card)] transition-all duration-300 md:rounded-[2.5rem]">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-center justify-between p-6 text-left focus:outline-none md:p-10"
        >
          <h3 className="flex items-center gap-3 text-lg font-bold text-[var(--text)] md:text-2xl">
            <span className="font-serif text-xl italic text-[var(--accent)] opacity-80 md:text-2xl">{marker}</span>
            {title}
          </h3>
          <ChevronDown
            className="h-5 w-5 shrink-0 text-[var(--text-muted)] transition-transform duration-300 group-hover:text-[var(--accent)]"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>

        <div
          id={panelId}
          className="grid transition-[grid-template-rows] duration-300 ease-in-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="px-6 pb-6 md:px-10 md:pb-10">
              <div className="border-l-2 pl-4 text-sm leading-relaxed text-[var(--text-muted)] md:text-base" style={{ borderColor: "var(--blyss-pink-light)" }}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
