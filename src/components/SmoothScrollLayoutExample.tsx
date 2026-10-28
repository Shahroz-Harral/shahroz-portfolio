"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SmoothScrollProvider, useSmoothScroll } from "./SmoothScrollProvider";

/**
 * Example Child Component demonstrating frame-accurate ScrollTrigger animations
 * with @gsap/react scoped lifecycle management.
 */
export function AnimatedSection() {
  const container = useRef<HTMLDivElement>(null);
  const { lenis } = useSmoothScroll();

  useGSAP(
    () => {
      // Pinning + Scrub animation perfectly synchronized with Lenis
      gsap.to(".scrub-box", {
        scrollTrigger: {
          trigger: ".scrub-box",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1, // Smooth scrub tracking Lenis smoothly without jump or drift
        },
        x: 300,
        rotation: 360,
        ease: "none",
      });

      // Reveal animation
      gsap.from(".reveal-text", {
        scrollTrigger: {
          trigger: ".reveal-text",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="py-24 px-6 min-h-screen">
      <h2 className="reveal-text text-4xl font-bold mb-8">
        Frame-Accurate ScrollTrigger Section
      </h2>
      <div className="scrub-box w-32 h-32 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-semibold">
        Scrubbed
      </div>
      <button
        onClick={() => lenis?.scrollTo(0)}
        className="mt-8 px-4 py-2 bg-neutral-800 text-white rounded hover:bg-neutral-700 transition"
      >
        Scroll to Top
      </button>
    </section>
  );
}

/**
 * Root Layout Wrapper Example (Next.js App Router / Vite / React)
 */
export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
