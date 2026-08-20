"use client";

import { motion } from "framer-motion";
import { IconInstagram, IconLinkedIn, IconTikTok } from "@/components/icons";
import { FOOTER_SOCIAL_LINKS } from "@/lib/constants";

const ICONS = { Instagram: IconInstagram, TikTok: IconTikTok, LinkedIn: IconLinkedIn } as const;

type SocialCloudProps = {
  className?: string;
};

export function SocialCloud({ className }: SocialCloudProps) {
  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`}>
      {FOOTER_SOCIAL_LINKS.map((link) => {
        const Icon = ICONS[link.label as keyof typeof ICONS];
        return (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="flex h-11 w-11 items-center justify-center rounded-full border"
            style={{ borderColor: "var(--footer-border)" }}
            whileHover={{ scale: 1.12, borderColor: "var(--footer-accent)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Icon className="h-[1.05rem] w-[1.05rem]" />
          </motion.a>
        );
      })}
    </div>
  );
}
