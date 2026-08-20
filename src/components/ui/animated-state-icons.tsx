"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StateIconProps {
  size?: number;
  color?: string;
  className?: string;
  duration?: number;
}

function useAutoToggle(interval: number) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), interval);
    return () => clearInterval(id);
  }, [interval]);
  return on;
}

export function LockUnlockIcon({ size = 40, color = "currentColor", className, duration = 2600 }: StateIconProps) {
  const unlocked = useAutoToggle(duration);
  return (
    <svg viewBox="0 0 40 40" fill="none" className={cn("", className)} style={{ width: size, height: size }}>
      <rect x="9" y="18" width="22" height="16" rx="3" stroke={color} strokeWidth={2} />
      <motion.path
        d="M14 18V13a6 6 0 0112 0v5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        animate={unlocked ? { d: "M14 18V13a6 6 0 0112 0v2" } : { d: "M14 18V13a6 6 0 0112 0v5" }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      />
      <motion.circle
        cx="20"
        cy="26"
        r="2"
        fill={color}
        animate={unlocked ? { scale: 0.6, opacity: 0.4 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </svg>
  );
}

export function NotificationIcon({ size = 40, color = "currentColor", className, duration = 2800 }: StateIconProps) {
  const notif = useAutoToggle(duration);
  return (
    <motion.svg
      viewBox="0 0 40 40"
      fill="none"
      className={cn("", className)}
      animate={notif ? { rotate: [0, 8, -8, 6, -6, 3, 0] } : { rotate: 0 }}
      transition={{ duration: 0.6 }}
      style={{ width: size, height: size, transformOrigin: "20px 6px" }}
    >
      <path
        d="M28 16a8 8 0 00-16 0c0 8-4 10-4 10h24s-4-2-4-10"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M17.5 30a3 3 0 005 0" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <motion.circle
        cx="28"
        cy="10"
        r="4"
        fill="var(--accent, #fe5d9d)"
        animate={notif ? { scale: [0, 1.3, 1], opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      />
    </motion.svg>
  );
}
