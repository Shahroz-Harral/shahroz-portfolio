import React from 'react';

export const HowWeWorkSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Listen & understand',
      description: 'We learn about your business and goals.',
    },
    {
      num: '02',
      title: 'Plan the solution',
      description: 'We design a clear blueprint, scope and integrations.',
    },
    {
      num: '03',
      title: 'Build, test & launch',
      description: 'We implement the solution and hand it over.',
    },
  ];

  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden bg-gradient-to-b from-transparent via-[#F7FBF8]/80 to-transparent">
      {/* Soft Wave Transition at the top of the section */}
      <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none opacity-50" aria-hidden="true">
        <svg
          viewBox="0 0 1440 60"
          className="w-full h-full preserve-3d"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 25 C 360 55, 720 0, 1080 35 C 1260 50, 1380 30, 1440 25 L 1440 0 L 0 0 Z"
            fill="url(#waveGradTop)"
          />
          <defs>
            <linearGradient id="waveGradTop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E6F4EA" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#E6F4EA" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50/80 border border-emerald-500/15 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#111916] font-mono">
              OUR PROCESS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#111916] tracking-tight mb-4 font-sans">
            How we work
          </h2>

          <p className="text-base text-[#6C7775] leading-relaxed">
            A simple, transparent process to turn your idea into reality.
          </p>
        </div>

        {/* 3-Step Process Timeline */}
        <div className="relative">
          {/* Desktop Horizontal Connecting Line */}
          <div
            className="hidden md:block absolute top-6 left-[16%] right-[16%] h-[1px] bg-[#E3ECE7] z-0"
            aria-hidden="true"
          />

          {/* Mobile Vertical Connecting Line */}
          <div
            className="md:hidden absolute top-6 bottom-6 left-6 w-[1px] bg-[#E3ECE7] z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative z-10">
            {steps.map((step) => (
              <div
                key={step.num}
                className="flex md:flex-col items-start md:items-center text-left md:text-center gap-5 md:gap-0 group"
              >
                {/* Number Circle Indicator */}
                <div className="w-12 h-12 rounded-full bg-[#E5F8EE] border border-emerald-500/20 text-[#111916] font-bold text-sm flex items-center justify-center shrink-0 md:mb-6 shadow-xs group-hover:scale-105 group-hover:border-emerald-500/50 transition-all duration-300">
                  {step.num}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-[#111916] tracking-tight mb-2 font-sans">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#6C7775] leading-relaxed max-w-[260px] md:mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
