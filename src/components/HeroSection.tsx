"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Aurora from "./react-bits/Aurora/Aurora";
import GradientASCII from "./react-bits/GradientASCII/GradientASCII";
import DotGrid from "./react-bits/DotGrid/DotGrid";
import BlurText from "./react-bits/BlurText/BlurText";
import Magnet from "./react-bits/Magnet/Magnet";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export interface HeroSectionProps {
  onBookCallClick?: () => void;
  metricsSectionId?: string;
}

export function HeroSection({
  onBookCallClick,
  metricsSectionId = "metrics-bar",
}: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const auroraContainerRef = useRef<HTMLDivElement>(null);
  const asciiArcContainerRef = useRef<HTMLDivElement>(null);
  const dotGridContainerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleClipRef = useRef<HTMLDivElement>(null);
  const blurTextWrapRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  // Performance Guard: Pause Aurora, GradientASCII & DotGrid when out of viewport
  const [isPaused, setIsPaused] = useState(false);

  // IntersectionObserver performance guard
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPaused(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      // -----------------------------------------------------------------------
      // Performance Guard via ScrollTrigger
      // -----------------------------------------------------------------------
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        onLeave: () => setIsPaused(true),
        onEnterBack: () => setIsPaused(false),
      });

      // -----------------------------------------------------------------------
      // Responsive / Accessible Motion via gsap.matchMedia()
      // -----------------------------------------------------------------------
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Master Entrance Timeline (power4.out)
        const entranceTl = gsap.timeline({
          defaults: { ease: "power4.out" },
        });

        // 0.00s: Fade and scale in the Aurora container
        if (auroraContainerRef.current) {
          entranceTl.fromTo(
            auroraContainerRef.current,
            { opacity: 0, scale: 0.96 },
            { opacity: 1, scale: 1, duration: 1.6, ease: "power4.out" },
            0.0
          );
        }

        // 0.10s: Fade and rise in the Grey Arc GradientASCII
        if (asciiArcContainerRef.current) {
          entranceTl.fromTo(
            asciiArcContainerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.4, ease: "power4.out" },
            0.1
          );
        }

        // 0.15s: Slide and fade in the Senior IT & AI Solutions Architect pill badge
        if (badgeRef.current) {
          entranceTl.fromTo(
            badgeRef.current,
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, ease: "power4.out" },
            0.15
          );
        }

        // 0.25s: Reveal Architecting Production AI Systems from an overflow-hidden line mask
        if (titleClipRef.current) {
          entranceTl.fromTo(
            titleClipRef.current,
            { yPercent: 115 },
            { yPercent: 0, duration: 1.0, ease: "power4.out" },
            0.25
          );
        }

        // 0.35s: Trigger <BlurText /> on "with Zero Fluff"
        if (blurTextWrapRef.current) {
          entranceTl.fromTo(
            blurTextWrapRef.current,
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.85, ease: "power4.out" },
            0.35
          );
        }

        // 0.55s: Fade up the subheadline paragraph
        if (paragraphRef.current) {
          entranceTl.fromTo(
            paragraphRef.current,
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, ease: "power4.out" },
            0.55
          );
        }

        // 0.70s: Stagger in the dual CTA buttons
        if (ctaGroupRef.current) {
          entranceTl.fromTo(
            ctaGroupRef.current.children,
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.12, ease: "power4.out" },
            0.70
          );
        }

        // Optional scroll indicator entrance
        if (scrollLineRef.current) {
          entranceTl.fromTo(
            scrollLineRef.current,
            { autoAlpha: 0, scaleY: 0 },
            { autoAlpha: 1, scaleY: 1, duration: 0.6, ease: "power2.out" },
            0.95
          );
        }

        // ---------------------------------------------------------------------
        // Scrubbed Scroll Transition:
        // Pinned to the Hero section (start: "top top", end: "bottom 35%", scrub: true)
        // - Gently moves foreground content upward
        // - Arc rises slightly as user scrolls down (y: -110px)
        // - Subtly scales Aurora
        // ---------------------------------------------------------------------
        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom 35%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        if (heroContentRef.current) {
          scrubTl.to(
            heroContentRef.current,
            { yPercent: -22, autoAlpha: 0, ease: "none" },
            0.08
          );
        }

        // Grey Arc rises smoothly as user scrolls down
        if (asciiArcContainerRef.current) {
          scrubTl.to(
            asciiArcContainerRef.current,
            { y: -110, ease: "none" },
            0
          );
        }

        if (auroraContainerRef.current) {
          scrubTl.to(
            auroraContainerRef.current,
            { scale: 1.06, yPercent: 10, ease: "none" },
            0
          );
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (auroraContainerRef.current) gsap.set(auroraContainerRef.current, { opacity: 1, scale: 1 });
        if (asciiArcContainerRef.current) gsap.set(asciiArcContainerRef.current, { opacity: 1, y: 0 });
        if (badgeRef.current) gsap.set(badgeRef.current, { autoAlpha: 1, y: 0 });
        if (titleClipRef.current) gsap.set(titleClipRef.current, { yPercent: 0 });
        if (blurTextWrapRef.current) gsap.set(blurTextWrapRef.current, { autoAlpha: 1, y: 0 });
        if (paragraphRef.current) gsap.set(paragraphRef.current, { autoAlpha: 1, y: 0 });
        if (ctaGroupRef.current) gsap.set(ctaGroupRef.current.children, { autoAlpha: 1, y: 0 });
        if (scrollLineRef.current) gsap.set(scrollLineRef.current, { autoAlpha: 1, scaleY: 1 });
      });
    },
    { scope: containerRef }
  );

  return (
    /* LAYER 0: Base Hero Container */
    <section
      ref={containerRef}
      className="relative w-full min-h-screen h-screen overflow-hidden bg-[#FBFBFA] text-editorial-dark flex items-center justify-center pt-16 md:pt-20 select-none"
      id="heroTrack"
      aria-label="Hero Section"
    >
      {/* LAYER 1: Mint & Lime Arc <Aurora /> Background (z-index: 10) */}
      <div
        ref={auroraContainerRef}
        className="absolute inset-0 z-10 pointer-events-none overflow-hidden flex items-start justify-center will-change-transform"
      >
        {/* Top Crown Horizon Ambient Glow */}
        <div
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-[880px] max-w-[95vw] h-[240px] blur-3xl pointer-events-none opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(94, 238, 178, 0.3) 0%, rgba(124, 255, 103, 0.15) 50%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* WebGL Mint / Lime Aurora with Light Mode and 2 Layers */}
        <div style={{ width: "100%", height: "85vh", minHeight: "750px", position: "relative" }}>
          <Aurora
            colorStops={["#5eeeb2", "#7cff67", "#5eeeb2"]}
            amplitude={2.7}
            blend={0.39}
            height={0.61}
            speed={1}
            glow={1.5}
            layers={2}
            lightMode
            paused={isPaused}
          />
        </div>

        {/* Bottom linear gradient vignette so aurora fades cleanly into website's #FBFBFA background */}
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(251, 251, 250, 0.8) 65%, #FBFBFA 100%)",
          }}
          aria-hidden="true"
        />

        {/* Subtle curved rim highlight along the horizon */}
        <div
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-[120%] h-[85%] rounded-[100%] border-b border-black/[0.06] pointer-events-none"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 5%, black 25%, black 75%, transparent 95%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 5%, black 25%, black 75%, transparent 95%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* LAYER 1.5: Grey Arc <GradientASCII /> with shape="rise" (z-index: 15) */}
      <div
        ref={asciiArcContainerRef}
        className="absolute inset-x-0 bottom-0 z-15 pointer-events-none flex items-end justify-center overflow-hidden will-change-transform"
      >
        <div style={{ width: "100%", height: "600px", position: "relative" }}>
          <GradientASCII
            colors={["#94a3b8", "#94a3b8", "#94a3b8", "#FBFBFA"]}
            shape="rise"
            characters=" .·•●"
            cellSize={11}
            density={0.02}
            glow={0.35}
            depthOfField={0.44}
            flicker={0.17}
            scale={0.85}
            gradientOpacity={0.41}
            grain={0}
            variation={16}
            scrambleRadius={0.02}
            clickEffect="burst"
            paused={isPaused}
          />
        </div>

        {/* Bottom linear vignette so GradientASCII seamlessly blends into #FBFBFA background */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(251, 251, 250, 0.9) 70%, #FBFBFA 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* LAYER 2: React Bits <DotGrid /> Interactive Overlay (z-index: 20) */}
      <div
        ref={dotGridContainerRef}
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <div style={{ width: "100%", height: "600px", position: "relative" }}>
          <DotGrid
            baseColor="#34502d"
            activeColor="#111310"
            shape="circle"
            dotSize={2}
            gap={23}
            proximity={60}
            strength={0.3}
            bounce={0.1}
            tension={0.2}
            returnDuration={2.2}
            shockRadius={710}
            shockStrength={1}
            swell={0.8}
            stretch={0.5}
            glow={1.2}
            fade={1}
            intro={true}
            paused={isPaused}
          />
        </div>

        {/* Bottom linear gradient vignette so dots fade cleanly into #FBFBFA background */}
        <div
          className="absolute inset-x-0 bottom-0 h-44 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(251, 251, 250, 0.75) 60%, #FBFBFA 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* LAYER 3: Foreground Typography, CTAs & Pointer-Events Passthrough (z-index: 30) */}
      <div
        ref={heroContentRef}
        className="relative z-30 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center pointer-events-none will-change-transform"
      >
        {/* Badge: Senior IT & AI Solutions Architect */}
        <div ref={badgeRef} className="hero-badge-wrap mb-5" id="heroBadgeWrap">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-black/[0.08] text-[11px] sm:text-xs font-mono uppercase tracking-wider text-editorial-dark shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
            Senior IT &amp; AI Solutions Architect
          </span>
        </div>

        {/* Main Display Headline */}
        <h1
          className="hero-title font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-editorial-dark mb-5 leading-[1.1] max-w-4xl mx-auto"
          id="heroTitle"
        >
          {/* Line 1: Architecting Production AI Systems */}
          <div className="overflow-hidden pb-1">
            <div ref={titleClipRef} className="inline-block transform-gpu text-editorial-dark">
              Architecting Production AI Systems
            </div>
          </div>

          {/* Line 2: with Zero Fluff (rendered via BlurText) */}
          <div ref={blurTextWrapRef} className="flex justify-center mt-2">
            <span className="font-serif italic font-normal text-3xl sm:text-5xl lg:text-6xl text-moss">
              <BlurText
                text="with Zero Fluff"
                delay={90}
                animateBy="words"
                direction="bottom"
                trigger="load"
                className="justify-center"
              />
            </span>
          </div>
        </h1>

        {/* Paragraph */}
        <p
          ref={paragraphRef}
          className="text-sm sm:text-base lg:text-lg font-normal text-editorial-gray max-w-2xl mx-auto mb-8 leading-relaxed font-sans"
        >
          From high-precision enterprise RAG knowledge bases to autonomous multi-agent pipelines and sovereign models. Fully built, battle-tested, done right — delivered fast.
        </p>

        {/* CTAs: Re-enable pointer-events: auto only on the buttons container & wrap with Magnet */}
        <div
          ref={ctaGroupRef}
          className="pointer-events-auto flex flex-wrap items-center justify-center gap-4 mb-10"
          id="heroCtaGroup"
        >
          {/* Button 1: Book a Strategy Call */}
          <Magnet padding={50} magnetStrength={3}>
            <a
              href="mailto:harral008@gmail.com?subject=AI%20Strategy%20Consultation"
              onClick={onBookCallClick}
              style={{ color: "#ffffff", backgroundColor: "#111310" }}
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-sans font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:bg-black shadow-md cursor-pointer"
              id="btnStartNow"
            >
              <span>Book a Strategy Call</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Magnet>

          {/* Button 2: WhatsApp Shahroz */}
          <Magnet padding={50} magnetStrength={3}>
            <a
              href="https://wa.me/923349791008?text=Hi%20Shahroz,%20I'd%20like%20to%20discuss%20an%20AI%20project"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#111310", backgroundColor: "#ffffff" }}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-zinc-50 border border-black/[0.08] hover:border-black/[0.16] font-sans font-semibold text-xs sm:text-sm tracking-wide backdrop-blur-md transition-all duration-300 shadow-sm cursor-pointer"
              id="btnWhatsAppHero"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <span>WhatsApp Shahroz</span>
            </a>
          </Magnet>
        </div>

        {/* Center Glowing Scroll Indicator */}
        <div
          ref={scrollLineRef}
          className="w-px h-10 bg-black/10 mx-auto relative overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-editorial-dark to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
