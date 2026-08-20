"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import blyssMark from "../../assets/brand/Blyss-mark.png";
import { SocialCloud } from "@/components/ui/social-cloud";
import { FOOTER_COPYRIGHT } from "@/lib/constants";

const DEFAULT_FOOTER_BG = "var(--ink)";

// Remonte depuis le dernier bloc de la page (sibling précédent du footer)
// puis descend dans ses derniers enfants jusqu'à trouver un `background-color`
// réellement peint — les wrappers (`<main>`, sections sans bg propre) sont
// transparents et doivent être traversés.
function findLastBlockBackground(footer: HTMLElement): string {
  let node: Element | null = footer.previousElementSibling;
  let depth = 0;

  while (node && depth < 6) {
    const bg = getComputedStyle(node).backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg;
    node = node.lastElementChild;
    depth += 1;
  }

  return getComputedStyle(document.body).backgroundColor;
}

function isColorDark(color: string): boolean {
  const channels = color.match(/[\d.]+/g);
  if (!channels) return true;
  const [r, g, b] = channels.map(Number);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

const FOOTER_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Tarifs", href: "/pricing" },
  { label: "À propos", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
  { label: "CGV", href: "/cgv" },
  { label: "CGU", href: "/cgu" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 20 } },
};

export default function Footer() {
  const pathname = usePathname();
  const footerRef = useRef<HTMLElement>(null);
  const [bg, setBg] = useState(DEFAULT_FOOTER_BG);
  const [isDark, setIsDark] = useState(true);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const resolved = findLastBlockBackground(footer);
    setBg(resolved);
    setIsDark(isColorDark(resolved));
  }, [pathname]);

  const fg = isDark ? "var(--background)" : "var(--ink)";

  return (
    <footer
      ref={footerRef}
      id="site-footer"
      className="footer-ink relative w-full overflow-hidden py-12 transition-colors duration-500"
      style={{ background: "var(--footer-bg)", color: "var(--footer-fg)" }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `.footer-ink { --footer-bg: ${bg}; --footer-fg: ${fg}; --footer-muted: color-mix(in oklch, var(--footer-fg) 62%, transparent); --footer-border: color-mix(in oklch, var(--footer-fg) 20%, transparent); --footer-accent: var(--accent); }`,
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        variants={containerVariants}
        className="container mx-auto mb-12 flex flex-col items-center gap-10 px-4"
      >
        <motion.div variants={itemVariants} className="flex justify-center">
          <Image src={blyssMark} alt="Blyss" className="h-10 w-auto" priority={false} />
        </motion.div>

        <motion.nav variants={itemVariants} className="relative z-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-base font-medium">
          {FOOTER_LINKS.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="group relative px-2 py-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 transition-colors duration-300" style={{ color: "var(--footer-muted)" }}>
                {link.label}
              </span>
              <motion.span
                className="absolute inset-0 -z-0 origin-center rounded-md"
                style={{ background: "var(--footer-accent)" }}
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 0.16 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </motion.a>
          ))}
        </motion.nav>

        <motion.div variants={itemVariants}>
          <SocialCloud />
        </motion.div>
      </motion.div>

      <motion.div
        className="container mx-auto mt-8 px-4 text-center text-sm"
        style={{ color: "var(--footer-muted)" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={itemVariants}
      >
        <p>{FOOTER_COPYRIGHT}</p>
      </motion.div>
    </footer>
  );
}
