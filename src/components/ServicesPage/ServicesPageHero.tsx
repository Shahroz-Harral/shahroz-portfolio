import React from 'react';
import {
  ValueConversationIcon,
  ValueWorkflowIcon,
  ValueInsightsIcon,
} from './ServicesBentoIcons';

export const ServicesPageHero: React.FC = () => {
  return (
    <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
      {/* Decorative ambient curved lines with green accent dots on far left & right */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Left curve + dot */}
        <svg
          className="absolute -left-12 top-16 w-56 h-96 text-emerald-500/25 hidden md:block"
          viewBox="0 0 200 360"
          fill="none"
        >
          <path
            d="M-20 20 C 120 80, 140 220, 20 340"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <circle cx="112" cy="148" r="4" className="fill-emerald-400" />
          <circle cx="112" cy="148" r="8" className="fill-emerald-400/20 animate-ping" />
        </svg>

        {/* Right curve + dot */}
        <svg
          className="absolute -right-12 top-28 w-56 h-96 text-emerald-500/25 hidden md:block"
          viewBox="0 0 200 360"
          fill="none"
        >
          <path
            d="M220 20 C 80 80, 60 240, 180 340"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <circle cx="86" cy="180" r="4" className="fill-emerald-400" />
          <circle cx="86" cy="180" r="8" className="fill-emerald-400/20 animate-ping" />
        </svg>

        {/* Soft background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-gradient-to-r from-emerald-100/40 via-[#E5F8EE]/50 to-teal-100/30 dark:from-emerald-950/20 dark:via-emerald-900/10 dark:to-transparent blur-3xl -z-10 rounded-full pointer-events-none" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-500/15 dark:border-emerald-500/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-[#111916] dark:text-[#F3F5F4] font-mono">
            SERVICES / BUILT AROUND YOUR BUSINESS
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#111916] dark:text-[#F3F5F4] tracking-tight leading-[1.12] mb-6 font-sans">
          Practical AI for everyday business.
        </h1>

        {/* Supporting Description */}
        <p className="text-base sm:text-lg text-[#6C7775] dark:text-[#9BA3A0] leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
          Thoughtful AI and digital systems that help you respond faster, simplify operations, and make better decisions.
        </p>

        {/* Horizontal Supporting Service Indicators Row */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 py-2 px-4 sm:px-6 rounded-full bg-white/70 dark:bg-[#141B17]/85 backdrop-blur-md border border-[#E3ECE7] dark:border-white/10 shadow-sm">
          {/* Indicator 1 */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#111916] dark:text-[#E2E8F0]">
            <ValueConversationIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Customer conversations</span>
          </div>

          <div className="hidden sm:block w-[1px] h-4 bg-[#E3ECE7] dark:bg-white/10" aria-hidden="true" />

          {/* Indicator 2 */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#111916] dark:text-[#E2E8F0]">
            <ValueWorkflowIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Connected workflows</span>
          </div>

          <div className="hidden sm:block w-[1px] h-4 bg-[#E3ECE7] dark:bg-white/10" aria-hidden="true" />

          {/* Indicator 3 */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#111916] dark:text-[#E2E8F0]">
            <ValueInsightsIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Clear business insights</span>
          </div>
        </div>
      </div>
    </section>
  );
};

