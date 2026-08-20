"use client";

import { useState } from "react";
import dashboardImg from "../../../assets/product/02-Dashboard-PRO.png";
import ProductMockup from "../ProductMockup";
import AccordionItem from "../ui/AccordionItem";
import GlowBlob from "../ui/GlowBlob";
import Reveal from "../ui/Reveal";
import SectionContainer from "../ui/SectionContainer";
import { FAQ_HEADING, FAQ_INTRO, FAQ_ITEMS, FAQ_MARQUEE_TEXT, FAQ_VISUAL_ALT } from "@/lib/constants";

const MARQUEE_REPEAT = 6;

export default function SectionFAQ() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  return (
    <section className="proto-flowty relative overflow-hidden py-28 sm:py-36" style={{ background: "var(--bg)" }}>

      <SectionContainer className="relative z-10 mt-16">

        <Reveal className="mt-14 max-w-2xl">
          <h2 className="text-[2.5rem] font-extrabold leading-[0.98] tracking-tight text-[var(--text)] sm:text-[3.25rem]">
            {FAQ_HEADING}
          </h2>
          <p className="mt-4 max-w-lg text-[1.05rem] leading-relaxed text-[var(--text-muted)]">{FAQ_INTRO}</p>
        </Reveal>

        <Reveal delay={100} className="mt-14">
          <div className="border-t border-[var(--border)]">
            {FAQ_ITEMS.map((item) => (
              <AccordionItem
                key={item.id}
                question={item.question}
                answer={item.answer}
                open={openId === item.id}
                onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
              />
            ))}
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}
