"use client";

import { useId } from "react";

type AccordionItemProps = {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
};

export default function AccordionItem({ question, answer, open, onToggle }: AccordionItemProps) {
  const reactId = useId();
  const panelId = `faq-panel-${reactId}`;
  const triggerId = `faq-trigger-${reactId}`;

  return (
    <div className="border-b border-[var(--border)]">
      <button
        id={triggerId}
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold text-[var(--text)]"
      >
        <span>{question}</span>
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="grid transition-[grid-template-rows] duration-[400ms]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
      >
        <div className="overflow-hidden">
          <p className="max-w-xl pb-6 text-[0.95rem] leading-relaxed text-[var(--text-muted)]">{answer}</p>
        </div>
      </div>
    </div>
  );
}
