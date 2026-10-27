import React from "react";
import ReactDOM from "react-dom/client";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSection } from "./components/HeroSection";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// STEP 2: GLOBAL LENIS + GSAP SYNCHRONIZATION
// ============================================================================
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  touchMultiplier: 2,
});

// Expose lenis instance globally for smooth scrolling interactions
(window as unknown as { lenis: Lenis }).lenis = lenis;

// Connect lenis.on('scroll', ScrollTrigger.update)
lenis.on("scroll", ScrollTrigger.update);

// Connect gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.add((time: number) => {
  lenis.raf(time * 1000);
});

// Set gsap.ticker.lagSmoothing(0)
gsap.ticker.lagSmoothing(0);

// Calibrate ScrollTrigger with Lenis initial state
ScrollTrigger.refresh();

// ============================================================================
// MOUNT HERO SECTION
// ============================================================================
const mountPoint =
  document.getElementById("hero-mount") ||
  document.getElementById("heroTrack");

if (mountPoint) {
  const root = ReactDOM.createRoot(mountPoint);
  root.render(
    <React.StrictMode>
      <HeroSection />
    </React.StrictMode>
  );
}
