import React, { useState } from 'react';
import { ServicesPageHeader } from './ServicesPageHeader';
import { ServicesPageHero } from './ServicesPageHero';
import { ServicesBentoGrid } from './ServicesBentoGrid';
import { HowWeWorkSection } from './HowWeWorkSection';
import { ServicesFaqSection } from './ServicesFaqSection';
import { ServicesCtaSection } from './ServicesCtaSection';
import { ServicesPageFooter } from './ServicesPageFooter';
import { AriaDrawer } from './AriaDrawer';

export const ServicesPage: React.FC = () => {
  const [ariaOpen, setAriaOpen] = useState(false);

  return (
    <div className="bg-[#FCFCFB] dark:bg-[#0A0E0C] text-[#111916] dark:text-[#F3F5F4] font-sans antialiased selection:bg-emerald-600 selection:text-white relative overflow-x-hidden min-h-screen flex flex-col justify-between transition-colors duration-200">
      {/* ===================================================================== */}
      {/* ATMOSPHERIC BACKGROUNDS                                               */}
      {/* ===================================================================== */}
      <div
        className="fixed inset-0 pointer-events-none z-0 max-w-7xl mx-auto border-x border-black/[0.03] dark:border-white/[0.04] bg-swiss-grid"
        aria-hidden="true"
      />
      <div
        className="fixed -top-24 -left-48 w-[520px] h-[720px] rounded-full pointer-events-none z-0 bg-gradient-to-br from-[#E6EFE2]/50 via-[#F2F8EE]/30 to-transparent dark:from-emerald-950/25 dark:via-emerald-900/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="fixed top-1/3 -right-48 w-[620px] h-[820px] rounded-full pointer-events-none z-0 bg-gradient-to-bl from-[#EBF3ED]/40 via-[#E4EFEA]/25 to-transparent dark:from-teal-950/20 dark:via-emerald-950/10 blur-3xl"
        aria-hidden="true"
      />

      {/* ===================================================================== */}
      {/* 1. TOP HEADER & NAVIGATION                                            */}
      {/* ===================================================================== */}
      <ServicesPageHeader onOpenAria={() => setAriaOpen(true)} />

      {/* ===================================================================== */}
      {/* MAIN CONTENT REGION                                                   */}
      {/* ===================================================================== */}
      <main className="relative z-10 flex-1">
        {/* Section 1: Services Introduction Hero */}
        <ServicesPageHero />

        {/* Section 2: Services Overview (Asymmetric Bento Grid) */}
        <ServicesBentoGrid />

        {/* Section 3: How We Work (3-Step Timeline) */}
        <HowWeWorkSection />

        {/* Section 4: Frequently Asked Questions (Accordion) */}
        <ServicesFaqSection />

        {/* Section 5: Final Call To Action Banner */}
        <ServicesCtaSection />
      </main>

      {/* ===================================================================== */}
      {/* 6. WEBSITE FOOTER                                                     */}
      {/* ===================================================================== */}
      <ServicesPageFooter />

      {/* ===================================================================== */}
      {/* FLOATING WHATSAPP BUTTON                                              */}
      {/* ===================================================================== */}
      <aside className="fixed bottom-6 right-6 z-40" id="floating-whatsapp">
        <a
          aria-label="Direct WhatsApp Message to Shahroz"
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 text-white shadow-xl hover:scale-105 transition-all duration-300 hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          href="https://wa.me/923349791008?text=Hi%20Shahroz,%20I'd%20like%20to%20discuss%20an%20AI%20service%20for%20my%20business."
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.149.929 3.182 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.771-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.057-1.121-.082-.26-.086-.593-.207-1.025-.395-1.815-.788-3.003-2.617-3.094-2.738-.09-.12-1.229-1.635-1.229-3.118 0-1.483.774-2.214 1.05-2.515.275-.3.599-.375.799-.375.2 0 .399.002.574.01.187.009.437-.07.686.527.261.624.896 2.186.974 2.346.078.16.13.348.026.557-.104.208-.156.338-.312.521-.156.182-.328.406-.468.545-.156.155-.319.324-.137.636.182.312.809 1.334 1.734 2.158 1.189 1.06 2.19 1.388 2.502 1.544.312.156.495.13.677-.078.182-.208.78-.91 1.015-1.222.234-.312.469-.26.78-.156.312.104 1.977.933 2.315 1.102.338.169.564.252.646.395.083.143.083.827-.061 1.232z" />
          </svg>
        </a>
      </aside>

      {/* ===================================================================== */}
      {/* ARIA AI ADVISOR DRAWER                                                */}
      {/* ===================================================================== */}
      <AriaDrawer isOpen={ariaOpen} onClose={() => setAriaOpen(false)} />
    </div>
  );
};

