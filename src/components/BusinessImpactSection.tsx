"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  MessageSquareMore,
  Workflow,
  BarChart3,
  Stethoscope,
  House,
  ShoppingCart,
  Briefcase,
  Building2,
  Store,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

// -----------------------------------------------------------------------------
// 1. DATA DEFINITIONS
// -----------------------------------------------------------------------------

interface ImpactCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  destination: string;
}

const IMPACT_CARDS: ImpactCard[] = [
  {
    id: "respond-better",
    title: "Respond better",
    description: "Automated customer conversations, 24/7 support.",
    icon: MessageSquareMore,
    destination: "#services",
  },
  {
    id: "work-smarter",
    title: "Work smarter",
    description: "Connect tools and automate repetitive tasks.",
    icon: Workflow,
    destination: "#services",
  },
  {
    id: "see-clearly",
    title: "See clearly",
    description: "Turn your data into actionable insights.",
    icon: BarChart3,
    destination: "services.html",
  },
];

interface Industry {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const INDUSTRIES: Industry[] = [
  { name: "Healthcare", icon: Stethoscope },
  { name: "Real Estate", icon: House },
  { name: "Retail & E-commerce", icon: ShoppingCart },
  { name: "Professional Services", icon: Briefcase },
  { name: "Agencies", icon: Building2 },
  { name: "Local Businesses", icon: Store },
];

// -----------------------------------------------------------------------------
// 2. MAIN COMPONENT
// -----------------------------------------------------------------------------

export const BusinessImpactSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // GSAP Entrance Reveal for Headline & Impact Cards
  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            once: true,
          },
        });

        if (headlineRef.current) {
          tl.fromTo(
            headlineRef.current.children,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out",
            }
          );
        }

        if (cardsRef.current) {
          tl.fromTo(
            cardsRef.current.children,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.12,
              ease: "power3.out",
            },
            "-=0.3"
          );
        }
      });
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  // Marquee Animation with GSAP (Smooth, seamless loop, responsive)
  useEffect(() => {
    if (prefersReducedMotion || !marqueeTrackRef.current || !firstSetRef.current) return;

    // Calculate exact width of one set of 6 items including gap
    const measureWidth = () => {
      if (!firstSetRef.current) return 1000;
      return firstSetRef.current.offsetWidth + 16; // 16px gap
    };

    let setWidth = measureWidth();

    // GSAP infinite seamless loop
    const tween = gsap.to(marqueeTrackRef.current, {
      x: -setWidth,
      duration: 35,
      ease: "none",
      repeat: -1,
    });

    marqueeTweenRef.current = tween;

    const handleResize = () => {
      setWidth = measureWidth();
      tween.invalidate();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      tween.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, [prefersReducedMotion]);

  // Pause & Resume Handlers
  const handlePause = () => {
    marqueeTweenRef.current?.pause();
  };

  const handleResume = () => {
    marqueeTweenRef.current?.play();
  };

  // Manual scroll controls with smooth GSAP transition
  const handleScroll = (direction: "left" | "right") => {
    if (!marqueeTweenRef.current) return;
    const currentProg = marqueeTweenRef.current.progress();
    const delta = direction === "left" ? -0.15 : 0.15;
    let nextProg = (currentProg + delta) % 1;
    if (nextProg < 0) nextProg += 1;

    gsap.to(marqueeTweenRef.current, {
      progress: nextProg,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={containerRef}
      id="metrics-bar"
      className="relative w-full overflow-hidden bg-transparent pt-14 pb-16 sm:pt-20 sm:pb-24 border-b border-black/[0.06] dark:border-white/[0.08]"
    >
      {/* Ambient background soft glow accents matching approved mockup */}
      <div
        className="absolute top-0 left-1/4 -translate-x-1/2 w-[440px] h-[360px] bg-emerald-400/[0.07] dark:bg-emerald-500/[0.035] blur-[110px] pointer-events-none rounded-full"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-1/4 translate-x-1/2 w-[460px] h-[380px] bg-emerald-300/[0.06] dark:bg-emerald-400/[0.03] blur-[120px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      {/* Decorative architectural curved lines with glowing green dots */}
      <svg
        className="absolute left-0 top-6 pointer-events-none select-none z-0 hidden lg:block overflow-visible"
        width="220"
        height="380"
        viewBox="0 0 220 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0 40C80 90 140 160 110 270C90 340 30 370 0 380"
          stroke="#10B981"
          strokeWidth="1.2"
          strokeOpacity="0.16"
        />
        <circle cx="110" cy="270" r="3.5" fill="#10B981" />
        <circle cx="110" cy="270" r="7" stroke="#10B981" strokeOpacity="0.25" strokeWidth="1" />
      </svg>

      <svg
        className="absolute right-0 top-12 pointer-events-none select-none z-0 hidden lg:block overflow-visible"
        width="220"
        height="380"
        viewBox="0 0 220 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M220 40C140 90 80 160 110 270C130 340 190 370 220 380"
          stroke="#10B981"
          strokeWidth="1.2"
          strokeOpacity="0.16"
        />
        <circle cx="110" cy="270" r="3.5" fill="#10B981" />
        <circle cx="110" cy="270" r="7" stroke="#10B981" strokeOpacity="0.25" strokeWidth="1" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* =================================================================== */}
        {/* 1. SECTION HEADER                                                   */}
        {/* =================================================================== */}
        <div ref={headlineRef} className="flex flex-col items-center text-center mb-12 sm:mb-14">
          {/* Eyebrow Label Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E5F8EE] dark:bg-[#122A1E] border border-[#BCE8D3]/60 dark:border-emerald-500/25 mb-4 shadow-2xs">
            <span
              className="w-2 h-2 rounded-full bg-[#10B981] inline-block shadow-[0_0_8px_rgba(16,185,129,0.8)]"
              aria-hidden="true"
            />
            <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-[#111916] dark:text-[#E8F8F0]">
              PRACTICAL BUSINESS IMPACT
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-[#111916] dark:text-[#F3F5F4] leading-[1.14] max-w-3xl mb-4">
            Better systems.
            <br />
            Better ways to <span className="text-[#10B981] dark:text-[#34D399]">work.</span>
          </h2>

          {/* Supporting Description */}
          <p className="text-[#6C7775] dark:text-[#9BA3A0] text-sm sm:text-base md:text-lg max-w-[680px] leading-relaxed font-normal">
            We build intelligent solutions that help businesses operate more efficiently,
            serve customers better, and make informed decisions.
          </p>
        </div>

        {/* =================================================================== */}
        {/* 2. THREE BUSINESS IMPACT CARDS                                      */}
        {/* =================================================================== */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto mb-14 sm:mb-16"
        >
          {IMPACT_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.id}
                href={card.destination}
                className="group relative flex items-center justify-between gap-4 p-5 sm:p-6 lg:p-5 xl:p-6 rounded-[22px] bg-white dark:bg-[#111714] border border-[#E3ECE7] dark:border-white/[0.08] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] dark:shadow-none hover:shadow-[0_14px_32px_-6px_rgba(16,185,129,0.12)] hover:border-[#10B981]/50 dark:hover:border-[#10B981]/50 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                {/* Left: Soft Mint Square Icon Container */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-[18px] bg-[#E5F8EE] dark:bg-[#122A1E] border border-[#BCE8D3]/70 dark:border-emerald-500/25 flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(16,185,129,0.12)] group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-7 h-7 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-[#10B981] dark:text-[#34D399]" />
                </div>

                {/* Middle: Title & Description */}
                <div className="flex-1 min-w-0 pr-1">
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#111916] dark:text-[#F3F5F4] tracking-tight group-hover:text-emerald-700 dark:group-hover:text-[#34D399] transition-colors mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#6C7775] dark:text-[#9BA3A0] leading-snug">
                    {card.description}
                  </p>
                </div>

                {/* Right: Circular Arrow Action Button */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F4F9F6] dark:bg-[#1A231E] border border-[#E3ECE7] dark:border-white/[0.08] flex items-center justify-center shrink-0 text-[#111916] dark:text-[#F3F5F4] group-hover:bg-[#10B981] group-hover:text-white dark:group-hover:bg-[#10B981] dark:group-hover:text-[#0A0E0C] group-hover:border-[#10B981] transition-all duration-300 shadow-2xs">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </a>
            );
          })}
        </div>

        {/* =================================================================== */}
        {/* 3. INDUSTRY SHOWCASE / SCROLLING STRIP                              */}
        {/* =================================================================== */}
        <div className="relative max-w-6xl mx-auto">
          {/* Section Divider with Green Dot & Label */}
          <div className="flex items-center justify-center gap-4 mb-7">
            <div className="h-px flex-1 max-w-[200px] sm:max-w-xs bg-gradient-to-r from-transparent via-black/[0.08] dark:via-white/[0.08] to-black/[0.08] dark:to-white/[0.08]" />
            <div className="inline-flex items-center gap-2 shrink-0">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block shadow-[0_0_6px_rgba(16,185,129,0.7)]"
                aria-hidden="true"
              />
              <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.2em] text-[#6C7775] dark:text-[#8D9692] uppercase">
                DESIGNED FOR BUSINESSES ACROSS
              </span>
            </div>
            <div className="h-px flex-1 max-w-[200px] sm:max-w-xs bg-gradient-to-l from-transparent via-black/[0.08] dark:via-white/[0.08] to-black/[0.08] dark:to-white/[0.08]" />
          </div>

          {/* Marquee Container with Arrow Controls */}
          <div className="relative flex items-center gap-2 sm:gap-3">
            {/* Left Scroll Button */}
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label="Scroll industries left"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 dark:bg-[#141B17] border border-black/[0.08] dark:border-white/10 shadow-sm flex items-center justify-center text-[#111916] dark:text-[#F3F5F4] hover:bg-[#E5F8EE] dark:hover:bg-[#1E2922] hover:border-[#10B981]/40 shrink-0 transition-all cursor-pointer z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Marquee Track with gradient fade edges */}
            <div
              className="relative flex-1 overflow-hidden py-1 px-1"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
              }}
              onMouseEnter={handlePause}
              onMouseLeave={handleResume}
            >
              <div
                ref={marqueeTrackRef}
                tabIndex={0}
                onFocus={handlePause}
                onBlur={handleResume}
                aria-label="Industry categories marquee"
                className={`flex items-center gap-3 sm:gap-4 select-none ${
                  prefersReducedMotion ? "justify-center flex-wrap" : "w-max"
                }`}
                style={{
                  willChange: "transform",
                }}
              >
                {/* Primary Set */}
                <div ref={firstSetRef} className="flex items-center gap-3 sm:gap-4 shrink-0">
                  {INDUSTRIES.map((ind, idx) => {
                    const Icon = ind.icon;
                    return (
                      <div
                        key={`ind-1-${idx}`}
                        className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-white/90 dark:bg-[#111714] border border-black/[0.06] dark:border-white/[0.08] shadow-2xs hover:shadow-xs hover:border-[#10B981]/40 dark:hover:border-[#10B981]/40 transition-all shrink-0 cursor-default"
                      >
                        <Icon className="w-4 h-4 text-[#10B981] dark:text-[#34D399] shrink-0" />
                        <span className="text-xs sm:text-[13px] font-medium text-[#111916] dark:text-[#F3F5F4] whitespace-nowrap">
                          {ind.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Duplicated Sets for Seamless Continuous Looping (hidden from screen readers) */}
                {!prefersReducedMotion && (
                  <>
                    <div
                      aria-hidden="true"
                      className="flex items-center gap-3 sm:gap-4 shrink-0"
                    >
                      {INDUSTRIES.map((ind, idx) => {
                        const Icon = ind.icon;
                        return (
                          <div
                            key={`ind-2-${idx}`}
                            className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-white/90 dark:bg-[#111714] border border-black/[0.06] dark:border-white/[0.08] shadow-2xs hover:shadow-xs hover:border-[#10B981]/40 dark:hover:border-[#10B981]/40 transition-all shrink-0 cursor-default"
                          >
                            <Icon className="w-4 h-4 text-[#10B981] dark:text-[#34D399] shrink-0" />
                            <span className="text-xs sm:text-[13px] font-medium text-[#111916] dark:text-[#F3F5F4] whitespace-nowrap">
                              {ind.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div
                      aria-hidden="true"
                      className="flex items-center gap-3 sm:gap-4 shrink-0"
                    >
                      {INDUSTRIES.map((ind, idx) => {
                        const Icon = ind.icon;
                        return (
                          <div
                            key={`ind-3-${idx}`}
                            className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-white/90 dark:bg-[#111714] border border-black/[0.06] dark:border-white/[0.08] shadow-2xs hover:shadow-xs hover:border-[#10B981]/40 dark:hover:border-[#10B981]/40 transition-all shrink-0 cursor-default"
                          >
                            <Icon className="w-4 h-4 text-[#10B981] dark:text-[#34D399] shrink-0" />
                            <span className="text-xs sm:text-[13px] font-medium text-[#111916] dark:text-[#F3F5F4] whitespace-nowrap">
                              {ind.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Scroll Button */}
            <button
              type="button"
              onClick={() => handleScroll("right")}
              aria-label="Scroll industries right"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 dark:bg-[#141B17] border border-black/[0.08] dark:border-white/10 shadow-sm flex items-center justify-center text-[#111916] dark:text-[#F3F5F4] hover:bg-[#E5F8EE] dark:hover:bg-[#1E2922] hover:border-[#10B981]/40 shrink-0 transition-all cursor-pointer z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
