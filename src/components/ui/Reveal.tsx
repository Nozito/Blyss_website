"use client";

import type { ReactNode, CSSProperties } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  scale?: boolean;
  as?: "div" | "li";
  style?: CSSProperties;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  scale = false,
  as = "div",
  style,
}: RevealProps) {
  const ref = useScrollReveal<HTMLDivElement>();
  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={`${scale ? "reveal-scale" : "reveal"} ${className}`}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
