"use client";

import React, { useEffect, useRef } from "react";
import { LayoutGrid, CalendarDays, Users, Bell, CircleUserRound, TrendingDown, Clock } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const INJECTED_STYLES = `
  .cinematic-hero-wrapper {
        --hero-fg: var(--ink);
    --hero-bg: var(--background);
    --hero-muted: var(--ink-soft);
  }

  .gsap-reveal { visibility: hidden; }

  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image:
          linear-gradient(to right, color-mix(in srgb, var(--hero-fg) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, var(--hero-fg) 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .text-3d-matte {
      color: var(--hero-fg);
      text-shadow:
          0 10px 30px color-mix(in srgb, var(--hero-fg) 20%, transparent),
          0 2px 4px color-mix(in srgb, var(--hero-fg) 10%, transparent);
  }

    .premium-depth-card {
      background: var(--blyss-dusk-gradient);
      box-shadow:
          0 40px 100px -20px rgba(32, 3, 16, 0.75),
          0 20px 40px -20px rgba(32, 3, 16, 0.6),
          inset 0 1px 2px rgba(255, 255, 255, 0.2),
          inset 0 -2px 4px rgba(32, 3, 16, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.06);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .iphone-bezel {
      background-color: #111;
      box-shadow:
          inset 0 0 0 2px #52525B,
          inset 0 0 0 7px #000,
          0 40px 80px -15px rgba(0,0,0,0.9),
          0 15px 25px -5px rgba(0,0,0,0.7);
      transform-style: preserve-3d;
  }

  .hardware-btn {
      background: linear-gradient(90deg, #404040 0%, #171717 100%);
      box-shadow:
          -2px 0 5px rgba(0,0,0,0.8),
          inset -1px 0 1px rgba(255,255,255,0.15),
          inset 1px 0 2px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }

  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
      box-shadow:
          0 10px 20px rgba(0,0,0,0.3),
          inset 0 1px 1px rgba(255,255,255,0.05),
          inset 0 -1px 1px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.03);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow:
          0 0 0 1px rgba(255, 255, 255, 0.1),
          0 25px 50px -12px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.2),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }

`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({
  brandName = "Blyss",
  tagline1 = "Ton activité,",
  tagline2 = "enfin pilotée.",
  cardHeading = "Ton activité, enfin sereine.",
  cardDescription = (
    <>
      <span className="text-white font-semibold">Blyss</span> réunit réservations en ligne, rappels automatiques et
      paiements sécurisés pour les professionnel·les de la beauté, au même endroit.
    </>
  ),
  ctaHeading = "Rejoins Blyss.",
  ctaDescription = "Réservations, rappels et paiements réunis au même endroit pensé pour les prothesistes ongulaires.",
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;

      cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    // La navbar du site est masquée tant qu'on est dans le hero pinné — elle
    // ne réapparaît qu'une fois l'écran final "Rejoins Blyss" dépassé (voir
    // règle CSS `[data-hero-nav-hidden]` dans globals.css et la classe
    // `.site-navbar` posée sur le wrapper de Navbar.tsx).
    document.documentElement.setAttribute("data-hero-nav-hidden", "true");

    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], {
        autoAlpha: 0,
      });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      // Intro raccourcie (texte -> fin d'animation plus rapide) : delay et
      // durées réduits d'environ 40% par rapport à l'original.
      const introTl = gsap.timeline({ delay: 0.15 });
      introTl
        .to(".text-track", { duration: 1.1, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 0.9, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=0.6");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          onLeave: () => document.documentElement.removeAttribute("data-hero-nav-hidden"),
          onEnterBack: () => document.documentElement.setAttribute("data-hero-nav-hidden", "true"),
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(
          ".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 },
          "-=0.8"
        )
        .fromTo(
          ".phone-widget",
          { y: 40, autoAlpha: 0, scale: 0.95 },
          { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 },
          "-=1.5"
        )
        .fromTo(
          ".floating-badge",
          { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 },
          { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 },
          "-=2.0"
        )
        .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 2.5 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 1.5 })
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.9,
          y: -40,
          z: -200,
          autoAlpha: 0,
          ease: "power3.in",
          duration: 1.2,
          stagger: 0.05,
        })
        .to(
          ".main-card",
          {
            width: isMobile ? "92vw" : "85vw",
            height: isMobile ? "92vh" : "85vh",
            borderRadius: isMobile ? "32px" : "40px",
            ease: "expo.inOut",
            duration: 1.8,
          },
          "pullback"
        )
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });
    }, containerRef);

    return () => {
      ctx.revert();
      document.documentElement.removeAttribute("data-hero-nav-hidden");
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "cinematic-hero-wrapper relative w-screen h-screen overflow-hidden flex items-center justify-center bg-[var(--hero-bg)] text-[var(--hero-fg)] font-sans antialiased",
        className
      )}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      {}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform transform-style-3d">
        <h1 className="text-track gsap-reveal text-3d-matte text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight leading-[1.05] mb-0">
          {tagline1}
        </h1>
        {}
        <h1 className="text-days gsap-reveal text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter leading-[1.05] pb-4 md:pb-5 lg:pb-6 text-[var(--color-primary)]">
          {tagline2}
        </h1>
      </div>

      {}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-[1.3] text-dusk-gradient">{ctaHeading}</h2>
        <p className="text-[var(--hero-muted)] text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          {}
          <button
            type="button"
            aria-label="Bientôt disponible sur l'App Store"
            className="btn-modern-light flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-dark)] focus:ring-offset-2"
          >
            <svg className="w-8 h-8 transition-transform group-hover:scale-105" fill="currentColor" viewBox="0 0 384 512" aria-hidden="true">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase mb-[-2px]">Bientôt sur</div>
              <div className="text-xl font-bold leading-none tracking-tight">l&apos;App Store</div>
            </div>
          </button>
          <button
            type="button"
            aria-label="Bientôt disponible sur Google Play"
            className="btn-modern-dark flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-dark)] focus:ring-offset-2 focus:ring-offset-[var(--hero-bg)]"
          >
            <svg className="w-7 h-7 transition-transform group-hover:scale-105" fill="currentColor" viewBox="0 0 512 512" aria-hidden="true">
              <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase mb-[-2px]">Bientôt sur</div>
              <div className="text-xl font-bold leading-none tracking-tight">Google Play</div>
            </div>
          </button>
        </div>
      </div>

      {}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">
            {}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-6xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter text-card-silver-matte lg:mt-0">
                {brandName}
              </h2>
            </div>

            {}
            <div
              className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10"
              style={{ perspective: "1000px" }}
            >
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-85 lg:scale-100">
                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform transform-style-3d"
                >
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

                  {}
                  <div
                    className="absolute inset-[7px] rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,0.25)] z-10"
                    style={{ background: "var(--blyss-pink-soft)", color: "var(--ink)" }}
                  >
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
                    </div>

                    <div className="relative w-full h-full pt-12 px-4 flex flex-col gap-3.5" style={{ paddingBottom: "68px" }}>
                      {}
                      <div className="phone-widget">
                        <p className="text-[0.95rem] font-extrabold leading-tight">Bonjour Sophie</p>
                        <p className="text-[0.58rem]" style={{ color: "var(--ink-soft)" }}>
                          Ton planning du jour
                        </p>
                      </div>

                      <div
                        className="phone-widget rounded-2xl p-3.5 text-white shadow-[0_10px_20px_-8px_rgba(254,93,157,0.6)]"
                        style={{ background: "var(--blyss-pink-brand)" }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[0.4rem] font-bold uppercase tracking-wide">
                            <CalendarDays size={8} strokeWidth={2.5} />
                            Aujourd&apos;hui
                          </span>
                          <span className="flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[0.44rem] font-bold" style={{ background: "rgba(120,15,55,0.35)" }}>
                            <TrendingDown size={9} strokeWidth={2.5} />
                            -21 %
                          </span>
                        </div>
                        <p className="mt-2.5 text-[0.95rem] font-extrabold leading-tight">3 rendez-vous aujourd&apos;hui</p>
                        <p className="mt-1 text-[0.56rem] text-white/80">148 € prévus aujourd&apos;hui</p>
                        <div className="mt-2.5 flex items-center justify-between border-t border-white/20 pt-2.5">
                          <span className="text-[0.44rem] text-white/70">-21 % vs sem. dernière</span>
                          <span
                            className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[0.44rem] font-bold"
                            style={{ color: "var(--blyss-pink-brand)" }}
                          >
                            <CalendarDays size={9} strokeWidth={2.5} />
                            Voir le planning
                          </span>
                        </div>
                      </div>

                      <div className="phone-widget flex items-center justify-between">
                        <span className="text-[0.62rem] font-bold">Prochaines clientes</span>
                        <span className="text-[0.5rem] font-semibold" style={{ color: "var(--blyss-pink-brand)" }}>
                          Voir tout →
                        </span>
                      </div>

                      <div className="phone-widget flex flex-1 min-h-0 flex-col gap-2">
                        {[
                          { initials: "LM", name: "Louise Masson", service: "Semi-permanent", time: "10h30", price: "48,00 €" },
                          { initials: "RN", name: "Rose Nicolas", service: "Pose gel couleur", time: "11h00", price: "65,00 €" },
                          { initials: "CM", name: "Coralie Martin", service: "Manucure classique", time: "11h45", price: "35,00 €" },
                        ].map((client) => (
                          <div key={client.initials} className="relative flex items-start gap-2.5 rounded-xl bg-white p-2.5 shadow-sm">
                            <span
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[0.55rem] font-bold text-white"
                              style={{ background: "var(--blyss-pink-brand)" }}
                            >
                              {client.initials}
                            </span>
                            <div className="min-w-0 flex-1 pr-12">
                              <p className="truncate text-[0.64rem] font-semibold">{client.name}</p>
                              <p className="truncate text-[0.5rem]" style={{ color: "var(--ink-soft)" }}>
                                {client.service}
                              </p>
                              <p className="mt-1 flex items-center gap-1 text-[0.48rem]" style={{ color: "var(--ink-soft)" }}>
                                <Clock size={8} strokeWidth={2.5} />
                                {client.time}
                              </p>
                            </div>
                            <span
                              className="absolute right-2.5 top-2.5 rounded-full px-1.5 py-0.5 text-[0.38rem] font-bold"
                              style={{ background: "#dbeafe", color: "#2563eb" }}
                            >
                              À venir
                            </span>
                            <span className="absolute bottom-2.5 right-2.5 shrink-0 text-[0.58rem] font-bold" style={{ color: "var(--blyss-pink-brand)" }}>
                              {client.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {}
                    <div
                      className="phone-widget absolute inset-x-3 bottom-3 z-20 flex items-center justify-around rounded-full"
                      style={{
                        height: "50px",
                        background: "#fff",
                        boxShadow: "0 12px 24px -8px rgba(36,16,25,0.28)",
                      }}
                    >
                      {[
                        { icon: LayoutGrid, active: true },
                        { icon: CalendarDays, active: false },
                        { icon: Users, active: false },
                        { icon: Bell, active: false },
                        { icon: CircleUserRound, active: false },
                      ].map(({ icon: Icon, active }, i) => (
                        <span
                          key={i}
                          className="flex h-8 w-8 items-center justify-center rounded-full"
                          style={active ? { border: "1.5px solid rgba(36,16,25,0.12)" } : undefined}
                        >
                          <Icon
                            size={14}
                            strokeWidth={2.4}
                            color={active ? "var(--blyss-pink-brand)" : "var(--ink)"}
                          />
                        </span>
                      ))}
                    </div>

                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[120px] h-[4px] rounded-full z-30 shadow-[0_1px_2px_rgba(0,0,0,0.2)]" style={{ background: "rgba(36,16,25,0.25)" }} />
                  </div>
                </div>

                {}
                <div className="floating-badge absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-pink-400/25 to-pink-900/10 flex items-center justify-center border border-pink-300/30 shadow-inner">
                    <span className="text-base lg:text-xl drop-shadow-lg" aria-hidden="true">
                      🔔
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Rappel envoyé</p>
                    <p className="text-pink-100/60 text-[10px] lg:text-xs font-medium">Il y a 2 min</p>
                  </div>
                </div>

                <div className="floating-badge absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-amber-400/25 to-amber-900/10 flex items-center justify-center border border-amber-300/30 shadow-inner">
                    <span className="text-base lg:text-lg drop-shadow-lg" aria-hidden="true">
                      💳
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Paiement reçu</p>
                    <p className="text-pink-100/60 text-[10px] lg:text-xs font-medium">45,00 €</p>
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">{cardHeading}</h3>
              <p className="hidden md:block text-pink-50/75 text-sm md:text-base lg:text-lg font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                {cardDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
