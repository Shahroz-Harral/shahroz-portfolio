import React, { useState, useEffect } from 'react';

interface ServicesPageHeaderProps {
  onOpenAria: () => void;
}

export const ServicesPageHeader: React.FC<ServicesPageHeaderProps> = ({ onOpenAria }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleTheme = () => {
    const nextDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', nextDark ? 'dark' : 'light');
    setIsDark(nextDark);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-[#0A0E0C]/95 backdrop-blur-md shadow-xs border-b border-black/[0.06] dark:border-white/[0.08]'
          : 'bg-white/80 dark:bg-[#0A0E0C]/85 backdrop-blur-md border-b border-black/[0.04] dark:border-white/[0.06]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        
        {/* Brand & Live Status */}
        <a href="index.html" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-9 h-9 rounded-full bg-[#111916] dark:bg-[#141B17] text-white font-bold flex items-center justify-center text-xs tracking-wider transition-transform duration-300 group-hover:scale-105 shadow-xs border border-transparent dark:border-white/20">
            SA
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-sm text-[#111916] dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors font-sans">
              Shahroz Ahmed
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#6C7775] dark:text-[#8D9692]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              Available for new projects
            </span>
          </div>
        </a>

        {/* Desktop Navigation Tabs (with active indicator under Services) */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#F4F5F2] dark:bg-[#141A16] border border-black/[0.06] dark:border-white/10 rounded-full p-1" id="nav-links">
          <a
            href="index.html#why-it-works"
            className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-gray-600 dark:text-[#9BA3A0] hover:text-gray-900 hover:dark:text-white hover:bg-white hover:dark:bg-white/10 transition-all"
          >
            Why It Works
          </a>

          {/* Active Services Tab with Green Underline Dot */}
          <a
            href="services.html"
            className="relative px-3.5 py-1.5 rounded-full text-[13px] font-semibold text-gray-900 dark:text-white bg-white dark:bg-[#1F2923] shadow-2xs transition-all"
          >
            <span>Services</span>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </a>

          <a
            href="index.html#blog"
            className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-gray-600 dark:text-[#9BA3A0] hover:text-gray-900 hover:dark:text-white hover:bg-white hover:dark:bg-white/10 transition-all"
          >
            Blog
          </a>
        </nav>

        {/* Action Pill Group */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Theme Mode Toggle Button */}
          <button
            type="button"
            onClick={handleToggleTheme}
            aria-label="Toggle dark/light mode"
            title="Toggle theme"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white dark:bg-[#141A16] border border-black/[0.08] dark:border-white/10 text-editorial-dark dark:text-yellow-300 shadow-2xs hover:bg-zinc-50 hover:dark:bg-[#1C2520] transition-all"
          >
            {isDark ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" strokeWidth="2" />
                <line x1="12" y1="1" x2="12" y2="3" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="21" x2="12" y2="23" strokeWidth="2" strokeLinecap="round" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth="2" strokeLinecap="round" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth="2" strokeLinecap="round" />
                <line x1="1" y1="12" x2="3" y2="12" strokeWidth="2" strokeLinecap="round" />
                <line x1="21" y1="12" x2="23" y2="12" strokeWidth="2" strokeLinecap="round" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeWidth="2" strokeLinecap="round" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Ask Aria AI Button */}
          <button
            type="button"
            onClick={onOpenAria}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 md:py-2 text-xs font-semibold text-[#111916] dark:text-[#F3F5F4] bg-white dark:bg-[#141A16] border border-[#4D6B3C]/25 dark:border-white/15 rounded-full shadow-2xs hover:bg-[#F4F8F2] hover:dark:bg-[#1B241F] hover:border-[#4D6B3C] hover:dark:border-emerald-500/40 transition-all"
          >
            <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span>Ask Aria AI</span>
          </button>

          {/* WhatsApp Chat Button */}
          <a
            href="https://wa.me/923349791008?text=Hi%20Shahroz,%20I'd%20like%20to%20consult%20on%20an%20AI%20service"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 md:py-2 text-xs font-semibold text-emerald-800 dark:text-[#6EE7B7] bg-[#ECFDF5] dark:bg-emerald-950/40 border border-emerald-500/30 rounded-full shadow-2xs hover:bg-[#D1FAE5] hover:dark:bg-emerald-900/40 transition-all"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>WhatsApp Chat</span>
          </a>

          {/* Book a Call Button */}
          <a
            href="mailto:harral008@gmail.com?subject=AI%20Services%20Inquiry%20-%20Call%20Booking"
            className="inline-flex items-center gap-1.5 px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-semibold tracking-wide text-white dark:text-[#0A0E0C] bg-[#111916] dark:bg-[#10B981] dark:font-bold rounded-full shadow-xs hover:bg-emerald-950 dark:hover:bg-[#34D399] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Book a Call</span>
            <span className="text-xs transition-transform group-hover:translate-x-0.5">→</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-[#141A16] border border-black/[0.08] dark:border-white/10 text-[#111916] dark:text-white"
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
        <div className="lg:hidden border-t border-black/[0.06] dark:border-white/10 bg-white/95 dark:bg-[#0E1411]/95 backdrop-blur-xl px-6 py-4 shadow-xl space-y-3">
          <div className="flex flex-col gap-2 font-medium text-sm text-[#111916] dark:text-[#F3F5F4]">
            <a href="index.html#why-it-works" onClick={() => setMobileMenuOpen(false)} className="py-1.5">
              Why It Works
            </a>
            <a href="services.html" onClick={() => setMobileMenuOpen(false)} className="py-1.5 text-emerald-700 dark:text-emerald-400 font-semibold flex items-center justify-between">
              <span>Services</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </a>
            <a href="index.html#blog" onClick={() => setMobileMenuOpen(false)} className="py-1.5">
              Blog &amp; Insights
            </a>
          </div>

          <div className="pt-3 border-t border-black/[0.06] dark:border-white/10 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAria();
              }}
              className="flex-1 py-2 text-xs font-semibold text-[#111916] dark:text-[#F3F5F4] bg-[#F4F8F2] dark:bg-[#141A16] border border-emerald-500/20 dark:border-white/10 rounded-full flex items-center justify-center gap-1.5"
            >
              Ask Aria AI
            </button>
            <a
              href="https://wa.me/923349791008"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 text-xs font-semibold text-emerald-800 dark:text-[#6EE7B7] bg-[#ECFDF5] dark:bg-emerald-950/40 border border-emerald-500/30 rounded-full flex items-center justify-center gap-1.5"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

