import React, { useState, useEffect } from 'react';

interface ServicesPageHeaderProps {
  onOpenAria: () => void;
}

export const ServicesPageHeader: React.FC<ServicesPageHeaderProps> = ({ onOpenAria }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-black/[0.06]'
          : 'bg-white/80 backdrop-blur-md border-b border-black/[0.04]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        
        {/* Brand & Live Status */}
        <a href="index.html" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-9 h-9 rounded-full bg-[#111916] text-white font-bold flex items-center justify-center text-xs tracking-wider transition-transform duration-300 group-hover:scale-105 shadow-xs">
            SA
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-sm text-[#111916] group-hover:text-emerald-700 transition-colors font-sans">
              Shahroz Ahmed
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#6C7775]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              Available for new projects
            </span>
          </div>
        </a>

        {/* Desktop Navigation Tabs (with active indicator under Services) */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#F4F5F2] border border-black/[0.06] rounded-full p-1" id="nav-links">
          <a
            href="index.html#why-it-works"
            className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-gray-600 hover:text-gray-900 hover:bg-white transition-all"
          >
            Why It Works
          </a>

          {/* Active Services Tab with Green Underline Dot */}
          <a
            href="services.html"
            className="relative px-3.5 py-1.5 rounded-full text-[13px] font-semibold text-gray-900 bg-white shadow-2xs transition-all"
          >
            <span>Services</span>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </a>

          <a
            href="index.html#who-builds-this"
            className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-gray-600 hover:text-gray-900 hover:bg-white transition-all"
          >
            About
          </a>
          <a
            href="index.html#blog"
            className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-gray-600 hover:text-gray-900 hover:bg-white transition-all"
          >
            Blog
          </a>
          <a
            href="index.html#testimonials"
            className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-gray-600 hover:text-gray-900 hover:bg-white transition-all"
          >
            Testimonials
          </a>
        </nav>

        {/* Action Pill Group */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Ask Aria AI Button */}
          <button
            type="button"
            onClick={onOpenAria}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 md:py-2 text-xs font-semibold text-[#111916] bg-white border border-[#4D6B3C]/25 rounded-full shadow-2xs hover:bg-[#F4F8F2] hover:border-[#4D6B3C] transition-all"
          >
            <svg className="w-3.5 h-3.5 text-emerald-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span>Ask Aria AI</span>
          </button>

          {/* WhatsApp Chat Button */}
          <a
            href="https://wa.me/923349791008?text=Hi%20Shahroz,%20I'd%20like%20to%20consult%20on%20an%20AI%20service"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 md:py-2 text-xs font-semibold text-emerald-800 bg-[#ECFDF5] border border-emerald-500/30 rounded-full shadow-2xs hover:bg-[#D1FAE5] transition-all"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>WhatsApp Chat</span>
          </a>

          {/* Book a Call Button */}
          <a
            href="mailto:harral008@gmail.com?subject=AI%20Services%20Inquiry%20-%20Call%20Booking"
            className="inline-flex items-center gap-1.5 px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-semibold tracking-wide text-white bg-[#111916] rounded-full shadow-xs hover:bg-emerald-950 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Book a Call</span>
            <span className="text-xs transition-transform group-hover:translate-x-0.5">→</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white border border-black/[0.08] text-[#111916]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Nav Tray */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-black/[0.06] bg-white/95 backdrop-blur-xl px-6 py-4 shadow-xl space-y-3">
          <div className="flex flex-col gap-2 font-medium text-sm text-[#111916]">
            <a href="index.html#why-it-works" onClick={() => setMobileMenuOpen(false)} className="py-1.5">
              Why It Works
            </a>
            <a href="services.html" onClick={() => setMobileMenuOpen(false)} className="py-1.5 text-emerald-700 font-semibold flex items-center justify-between">
              <span>Services</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </a>
            <a href="index.html#who-builds-this" onClick={() => setMobileMenuOpen(false)} className="py-1.5">
              About Shahroz
            </a>
            <a href="index.html#blog" onClick={() => setMobileMenuOpen(false)} className="py-1.5">
              Blog &amp; Insights
            </a>
            <a href="index.html#testimonials" onClick={() => setMobileMenuOpen(false)} className="py-1.5">
              Testimonials
            </a>
          </div>

          <div className="pt-3 border-t border-black/[0.06] flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAria();
              }}
              className="flex-1 py-2 text-xs font-semibold text-[#111916] bg-[#F4F8F2] border border-emerald-500/20 rounded-full flex items-center justify-center gap-1.5"
            >
              Ask Aria AI
            </button>
            <a
              href="https://wa.me/923349791008"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 text-xs font-semibold text-emerald-800 bg-[#ECFDF5] border border-emerald-500/30 rounded-full flex items-center justify-center gap-1.5"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

