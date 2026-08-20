"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import blyssLogo from "../../assets/brand/Blyss-logo.png";
import { BLYSS_NAVBAR_CTA_LABEL, BLYSS_NAV_LINKS } from "@/lib/constants";

export type NavbarMode = "expanded" | "compact" | "menu-open";

const BAR_HEIGHT_PX = 64;
const EXPANDED_WIDTH = "min(538px, calc(100vw - 40px))";

const noopSubscribe = () => () => {};

export default function Navbar() {
  const [mode, setMode] = useState<NavbarMode>("expanded");
  const [insetTop, setInsetTop] = useState(0);
  // Détecte le montage côté client sans passer par un setState en effet
  // (portail : document n'existe pas côté serveur).
  const isClient = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
  const menuId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const measure = () => setInsetTop(Math.max(el.scrollHeight - BAR_HEIGHT_PX, 0));
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const lastScrollYRef = useRef(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const scrollingUp = y < lastScrollYRef.current;
      lastScrollYRef.current = y;

      setMode((m) => {
        if (m === "menu-open") return m;
        if (y <= 40 || scrollingUp) return "expanded";
        return "compact";
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.documentElement.setAttribute("data-footer-nav-hidden", "true");
        } else {
          document.documentElement.removeAttribute("data-footer-nav-hidden");
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(footer);
    return () => {
      observer.disconnect();
      document.documentElement.removeAttribute("data-footer-nav-hidden");
    };
  }, []);

  const openMenu = () => setMode("menu-open");
  const closeMenu = () => {
    setMode(window.scrollY > 40 ? "compact" : "expanded");
    triggerRef.current?.focus();
  };
  const toggleMenu = () => (mode === "menu-open" ? closeMenu() : openMenu());

  useEffect(() => {
    if (mode !== "menu-open") return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    wrapperRef.current?.querySelector<HTMLElement>("a")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mode]);

  const isOpen = mode === "menu-open";
  const isCompact = mode === "compact";
  const pillExpanded = !isCompact;

  return (
    <>
      {/* Portail sur `document.body` : l'overlay doit être `fixed` par
          rapport au viewport, or `.site-navbar` porte `.hero-in` (animation
          `transform`, `fill-mode: both`) qui crée un containing block pour
          ses descendants `fixed` — sans portail, l'overlay ne couvrirait que
          la boîte de la navbar au lieu de toute la page. */}
      {isClient &&
        isOpen &&
        createPortal(
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={closeMenu}
            className="fixed inset-0 z-[35] cursor-default border-0 bg-[rgba(36,16,25,0.14)] backdrop-blur-xl"
          />,
          document.body
        )}

      <div
        className="site-navbar proto-flowty hero-in pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4"
        style={{ bottom: "var(--nav-bottom)", "--hero-delay": "650ms" } as React.CSSProperties}
        data-navbar-mode={mode}
      >
        <div
          ref={wrapperRef}
          className="pointer-events-auto relative z-40 origin-bottom"
          style={{
            contain: "layout paint",
            width: isCompact ? "var(--nav-compact-width)" : EXPANDED_WIDTH,
            clipPath: isOpen ? "inset(0px round 22px)" : `inset(${insetTop}px 0px 0px round 22px)`,
            transition:
              "clip-path 500ms cubic-bezier(0.625,0.05,0,1), width 500ms cubic-bezier(0.22,1,0.36,1)",
            background: "rgba(255,255,255,0.94)",
            border: "1px solid rgba(36,16,25,0.07)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: "0 20px 55px -18px rgba(36,16,25,0.28), 0 2px 8px rgba(36,16,25,0.06)",
          }}
        >
          {/* Menu déroulant — TOUJOURS monté (pas de rendu conditionnel) : le
              panneau est `position: absolute`-ancré en bas via la barre, donc
              ce `<nav>` en flux normal est le SEUL contenu qui donne une
              hauteur intrinsèque au wrapper. Le démonter quand fermé
              ramènerait `scrollHeight` à ~0 et casserait le clip-path (et la
              zone cliquable de la barre avec lui). Largeur fixe (voir
              commentaire de tête) pour rester stable même quand la pill est
              compacte. Masqué du clavier/lecteur d'écran via
              `aria-hidden`/`tabIndex` plutôt que par démontage. */}
          <nav
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            aria-hidden={!isOpen}
            className="flex flex-col gap-2 p-5"
            style={{ width: EXPANDED_WIDTH, paddingBottom: `${BAR_HEIGHT_PX + 12}px` }}
          >
            {BLYSS_NAV_LINKS.filter((link) => link.enabled).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                tabIndex={isOpen ? 0 : -1}
                className="rounded-2xl px-3 py-2 text-[1.5rem] font-semibold text-[#0a0a0b] transition-colors hover:bg-[rgba(254,93,157,0.1)]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/"
              onClick={closeMenu}
              tabIndex={isOpen ? 0 : -1}
              className="mt-2 flex min-h-12 items-center justify-center rounded-full bg-[#0a0a0b] px-6 text-center text-[0.95rem] font-semibold text-white transition-transform hover:scale-[1.01] active:scale-[0.99]"
            >
              {BLYSS_NAVBAR_CTA_LABEL}
            </Link>
          </nav>

          {/* Barre toujours visible — ancrée en bas du panneau, seule partie
              révélée par le clip-path tant que le menu est fermé. En compact,
              burger et CTA se réduisent à 0 (`justify-between` recentre alors
              le logo sans "gap" fantôme, cf. largeur nulle des deux items
              flanquants) et le logo devient lui-même le déclencheur. */}
          <div className="absolute inset-x-0 bottom-0 flex h-16 items-center justify-between p-1">
            <button
              ref={triggerRef}
              type="button"
              onClick={toggleMenu}
              aria-haspopup="dialog"
              aria-expanded={isOpen}
              aria-controls={menuId}
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              tabIndex={pillExpanded ? 0 : -1}
              className="group flex shrink-0 flex-col items-center justify-center gap-[5px] overflow-hidden transition-[width,opacity]"
              style={{
                width: pillExpanded ? "3.5rem" : 0,
                height: "3.5rem",
                opacity: pillExpanded ? 1 : 0,
                transitionDuration: "500ms",
                transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <span className="h-[2px] w-5 bg-[#0a0a0b]" />
              {/* 60% de sa PROPRE largeur (w-5 = 20px) : un `w-[60%]` résoudrait contre le bouton parent, grandissant au lieu de rétrécir. */}
              <span className="h-[2px] w-5 bg-[#0a0a0b] transition-[width] duration-[600ms] group-hover:w-3" />
            </button>

            <button
              type="button"
              onClick={toggleMenu}
              aria-haspopup="dialog"
              aria-expanded={isOpen}
              aria-controls={menuId}
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              tabIndex={isCompact ? 0 : -1}
              className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full"
              style={{ cursor: isCompact ? "pointer" : "default", pointerEvents: isCompact ? "auto" : "none" }}
            >
              <Image src={blyssLogo} alt="" fill sizes="102px" className="scale-[2.1] object-contain" />
            </button>

            <Link
              href="/"
              tabIndex={pillExpanded ? 0 : -1}
              className="flex shrink-0 items-center overflow-hidden whitespace-nowrap rounded-full bg-[#0a0a0b] font-semibold text-white transition-[width,opacity,padding]"
              style={{
                width: pillExpanded ? "auto" : 0,
                height: "3.5rem",
                padding: pillExpanded ? "0 1.75rem" : 0,
                opacity: pillExpanded ? 1 : 0,
                fontSize: "0.92rem",
                transitionDuration: "500ms",
                transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                pointerEvents: pillExpanded ? "auto" : "none",
              }}
            >
              {BLYSS_NAVBAR_CTA_LABEL}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
