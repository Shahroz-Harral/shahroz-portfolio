"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Aurora from "./react-bits/Aurora/Aurora";
import GradientWaves from "./react-bits/GradientWaves/GradientWaves";
import DotGrid from "./react-bits/DotGrid/DotGrid";
import VaporType from "./react-bits/VaporType/VaporType";
import Magnet from "./react-bits/Magnet/Magnet";
import WavesCustomizer, { DEFAULT_WAVES_CONFIG, type WavesConfig } from "./WavesCustomizer";
import AuroraCustomizer, { DEFAULT_AURORA_CONFIG, type AuroraConfig } from "./AuroraCustomizer";

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
  const wavesContainerRef = useRef<HTMLDivElement>(null);
  const dotGridContainerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const fixedTextRef = useRef<HTMLSpanElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  // Active customizer studio drawer: 'aurora' | 'waves' | null
  const [activeStudio, setActiveStudio] = useState<'aurora' | 'waves' | null>(null);

  // Aurora customization state for real-time visual tuning
  const [auroraConfig, setAuroraConfig] = useState<AuroraConfig>(DEFAULT_AURORA_CONFIG);

  // GradientWaves customization state for real-time visual tuning
  const [wavesConfig, setWavesConfig] = useState<WavesConfig>(DEFAULT_WAVES_CONFIG);

  // Performance Guard: Pause Aurora, GradientWaves & DotGrid when out of viewport
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

        // 0.00s: Fade in the Aurora container (full screen width from start)
        if (auroraContainerRef.current) {
          gsap.set(auroraContainerRef.current, { scale: 1 });
          entranceTl.fromTo(
            auroraContainerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.5, ease: "power2.out" },
            0.0
          );
        }

        // 0.10s: Fade and rise in the GradientWaves simulation
        if (wavesContainerRef.current) {
          entranceTl.fromTo(
            wavesContainerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.4, ease: "power4.out" },
            0.1
          );
        }

        // 0.20s: Subtle one-time entrance animation for the fixed headline portion
        if (fixedTextRef.current) {
          entranceTl.fromTo(
            fixedTextRef.current,
            { y: 22, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.0, ease: "power4.out" },
            0.20
          );
        }

        // 0.45s: Stagger in the dual CTA buttons
        if (ctaGroupRef.current) {
          entranceTl.fromTo(
            ctaGroupRef.current.children,
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.12, ease: "power4.out" },
            0.45
          );
        }

        // 0.70s: Optional scroll indicator entrance
        if (scrollLineRef.current) {
          entranceTl.fromTo(
            scrollLineRef.current,
            { autoAlpha: 0, scaleY: 0 },
            { autoAlpha: 1, scaleY: 1, duration: 0.6, ease: "power2.out" },
            0.70
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

        // GradientWaves rises smoothly on scroll
        if (wavesContainerRef.current) {
          scrubTl.to(
            wavesContainerRef.current,
            { y: wavesConfig.parallaxRise, ease: "none" },
            0
          );
        }

        if (auroraContainerRef.current) {
          scrubTl.to(
            auroraContainerRef.current,
            { yPercent: 8, ease: "none" },
            0
          );
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (auroraContainerRef.current) gsap.set(auroraContainerRef.current, { opacity: 1, scale: 1 });
        if (wavesContainerRef.current) gsap.set(wavesContainerRef.current, { opacity: 1, y: 0 });
        if (fixedTextRef.current) gsap.set(fixedTextRef.current, { autoAlpha: 1, y: 0 });
        if (ctaGroupRef.current) gsap.set(ctaGroupRef.current.children, { autoAlpha: 1, y: 0 });
        if (scrollLineRef.current) gsap.set(scrollLineRef.current, { autoAlpha: 1, scaleY: 1 });
      });
    },
    { scope: containerRef, dependencies: [wavesConfig.parallaxRise] }
  );

  return (
    <>
      {/* LAYER 0: Base Hero Container */}
      <section
        ref={containerRef}
      className="relative w-full min-h-screen h-screen overflow-hidden bg-[#FBFBFA] text-editorial-dark flex items-center justify-center pt-16 md:pt-20 select-none"
      id="heroTrack"
      aria-label="Hero Section"
    >
      {/* LAYER 1: Mint & Lime Arc <Aurora /> Background (z-index: 10) */}
      <div
        ref={auroraContainerRef}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden flex items-start justify-center will-change-transform"
      >
        {/* Top Crown Horizon Ambient Glow */}
        {auroraConfig.showTopGlow && (
          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-full max-w-none h-[240px] blur-3xl pointer-events-none opacity-40 transition-colors duration-500"
            style={{
              background: `radial-gradient(ellipse 90% 70% at 50% 0%, ${auroraConfig.topGlowColor} 0%, rgba(124, 255, 103, 0.15) 60%, transparent 100%)`,
            }}
            aria-hidden="true"
          />
        )}

        {/* WebGL Mint / Lime Aurora with Light Mode and Configurable Layers */}
        <div className="w-full relative" style={{ width: "100%", height: `${auroraConfig.containerHeight}vh`, minHeight: "750px" }}>
          <Aurora
            colorStops={auroraConfig.colorStops}
            amplitude={auroraConfig.amplitude}
            blend={auroraConfig.blend}
            height={auroraConfig.height}
            speed={auroraConfig.speed}
            scale={auroraConfig.scale}
            glow={auroraConfig.glow}
            brightness={auroraConfig.brightness}
            layers={auroraConfig.layers}
            direction={auroraConfig.direction}
            opacity={auroraConfig.opacity}
            lightMode={auroraConfig.lightMode}
            mouseInteraction={auroraConfig.mouseInteraction}
            intro={auroraConfig.intro}
            dpr={auroraConfig.dpr}
            paused={isPaused}
          />
        </div>

        {/* Bottom linear gradient vignette so aurora fades cleanly into website's #FBFBFA background */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: `${auroraConfig.bottomFadeHeight}px`,
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

      {/* LAYER 1.5: React Bits <GradientWaves /> Fluid Simulation (z-index: 15) */}
      <div
        ref={wavesContainerRef}
        className="absolute inset-x-0 bottom-0 z-15 pointer-events-auto flex items-end justify-center overflow-hidden will-change-transform"
        style={{
          marginBottom: `${wavesConfig.bottomOffset}px`,
        }}
      >
        <div style={{ width: "100%", height: `${wavesConfig.containerHeight}px`, position: "relative" }}>
          <GradientWaves
            horizonColor={wavesConfig.horizonColor}
            waveColor={wavesConfig.waveColor}
            crestColor={wavesConfig.crestColor}
            backgroundColor={wavesConfig.backgroundColor}
            lightMode={wavesConfig.lightMode}
            speed={wavesConfig.speed}
            amplitude={wavesConfig.amplitude}
            waveScale={wavesConfig.waveScale}
            waveRatio={wavesConfig.waveRatio}
            swell={wavesConfig.swell}
            turbulence={wavesConfig.turbulence}
            tilt={wavesConfig.tilt}
            zoom={wavesConfig.zoom}
            height={wavesConfig.height}
            fogDepth={wavesConfig.fogDepth}
            relief={wavesConfig.relief}
            lightAngle={wavesConfig.lightAngle}
            sheen={wavesConfig.sheen}
            brightness={wavesConfig.brightness}
            opacity={wavesConfig.opacity}
            grain={wavesConfig.grain}
            intro={wavesConfig.intro}
            mouseInteraction={wavesConfig.mouseInteraction}
            parallaxStrength={wavesConfig.parallaxStrength}
            mouseStrength={wavesConfig.mouseStrength}
            swellOnClick={wavesConfig.swellOnClick}
            dpr={wavesConfig.dpr}
            paused={isPaused}
          />
        </div>

        {/* Bottom linear blend so waves fade cleanly into #FBFBFA website background */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(251, 251, 250, 0.85) 65%, #FBFBFA 100%)",
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
            dpr={1}
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
        className="relative z-30 w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center pointer-events-none will-change-transform"
      >
        {/* Semantic Display Headline */}
        <h1
          ref={headlineRef}
          className="hero-title font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-[3.15rem] 2xl:text-[3.65rem] font-bold tracking-tight text-editorial-dark mb-10 leading-[1.2] text-center max-w-7xl mx-auto"
          id="heroTitle"
        >
          <span ref={fixedTextRef} className="inline will-change-[transform,opacity]">
            We make your business more{" "}
          </span>
          <span className="inline-block whitespace-nowrap align-baseline">
            <VaporType
              words={[
                "efficient",
                "responsive",
                "consistent",
                "scalable",
                "productive",
              ]}
              as="span"
              align="start"
              color="currentColor"
              vaporColor="#10B981"
              density={1.2}
              particleSize={1.2}
              spread={1.2}
              rise={1}
              turbulence={0.8}
              diffusion={0.35}
              grain={1}
              sweep="left"
              stagger={0.8}
              condense={1.8}
              hold={2.4}
              dissolve={2}
              overlap={0.6}
              loop={true}
              startOnView={true}
              interactive={true}
              breath={1}
              breathRadius={0.8}
              recovery={1.2}
              clickAdvance={true}
              pauseOnHover={true}
              area="parent"
              className="align-baseline"
            />
            <span className="inline">.</span>
          </span>
        </h1>

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

    {/* Floating Studio Trigger Toolbar Dock */}
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 select-none">
      <button
        onClick={() => setActiveStudio(activeStudio === 'aurora' ? null : 'aurora')}
        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold shadow-2xl border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xl ${
          activeStudio === 'aurora'
            ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
            : 'bg-[#111310]/90 hover:bg-black text-white border-white/20'
        }`}
        id="btnToggleAuroraCustomizer"
      >
        <span className={`w-2 h-2 rounded-full ${activeStudio === 'aurora' ? 'bg-black' : 'bg-emerald-400 animate-pulse'}`} />
        <span>{activeStudio === 'aurora' ? '✕ Close Aurora' : '✨ Aurora'}</span>
      </button>

      <button
        onClick={() => setActiveStudio(activeStudio === 'waves' ? null : 'waves')}
        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold shadow-2xl border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xl ${
          activeStudio === 'waves'
            ? 'bg-cyan-400 text-black border-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.4)]'
            : 'bg-[#111310]/90 hover:bg-black text-white border-white/20'
        }`}
        id="btnToggleWavesCustomizer"
      >
        <span className={`w-2 h-2 rounded-full ${activeStudio === 'waves' ? 'bg-black' : 'bg-cyan-400 animate-pulse'}`} />
        <span>{activeStudio === 'waves' ? '✕ Close Waves' : '🌊 Waves'}</span>
      </button>
    </div>

    {/* Interactive Aurora Customizer */}
    <AuroraCustomizer
      config={auroraConfig}
      onChange={setAuroraConfig}
      isOpen={activeStudio === 'aurora'}
      onToggle={() => setActiveStudio(activeStudio === 'aurora' ? null : 'aurora')}
      onSwitchToWaves={() => setActiveStudio('waves')}
    />

    {/* Interactive GradientWaves Customizer */}
    <WavesCustomizer
      config={wavesConfig}
      onChange={setWavesConfig}
      isOpen={activeStudio === 'waves'}
      onToggle={() => setActiveStudio(activeStudio === 'waves' ? null : 'waves')}
      onSwitchToAurora={() => setActiveStudio('aurora')}
    />
  </>
  );
}

export default HeroSection;
