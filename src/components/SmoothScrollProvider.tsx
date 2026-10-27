"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis, { LenisOptions } from "lenis";

// Register GSAP plugins globally once
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

interface SmoothScrollContextType {
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  options?: LenisOptions;
}

/**
 * SmoothScrollProvider
 *
 * Synchronizes Lenis smooth scrolling with GSAP ScrollTrigger:
 * 1. Drives Lenis through GSAP ticker (time * 1000) for synchronized updates.
 * 2. Emits ScrollTrigger.update on every Lenis scroll event.
 * 3. Disables GSAP lagSmoothing to prevent frame drift and delays in scroll animations.
 * 4. Ensures strict cleanup on unmount for React StrictMode / route changes.
 */
export function SmoothScrollProvider({
  children,
  options = {},
}: SmoothScrollProviderProps) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
      ...options,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // 2. Synchronize Lenis scroll events with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Drive Lenis updates via GSAP ticker for perfect 60fps frame-rate lock
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000); // GSAP provides time in seconds, Lenis expects ms
    };

    gsap.ticker.add(updateTicker);

    // 4. Disable GSAP lag smoothing to ensure scrub and pinned ScrollTriggers stay strictly frame-accurate
    gsap.ticker.lagSmoothing(0);

    // Initial refresh to calibrate positions with Lenis initialized
    ScrollTrigger.refresh();

    // 5. Cleanup on unmount
    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
      // Restore default lag smoothing on unmount (500ms lag, 33ms adjust)
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export default SmoothScrollProvider;
