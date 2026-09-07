'use client';

import { useState } from 'react';

/**
 * Ruban rayé rose × prune qui balaye une fois au montage, puis se retire.
 * Jonction visuelle entre les écrans "affiche" (profil, confirmation) et le
 * tunnel calme. CSS dans globals.css (`.blyss-ribbon`), respecte
 * prefers-reduced-motion.
 */
export function RibbonSweep() {
  const [gone, setGone] = useState(false);
  if (gone) return null;
  return <div className="blyss-ribbon" aria-hidden="true" onAnimationEnd={() => setGone(true)} />;
}
