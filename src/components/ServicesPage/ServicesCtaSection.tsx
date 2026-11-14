import React from 'react';

export const ServicesCtaSection: React.FC = () => {
  return (
    <section className="relative w-full py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Soft Mint Gradient Rounded Card */}
        <div className="relative rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#D5F2E2] via-[#E7F7EE] to-[#DDF4E7] dark:from-[#0E1B15] dark:via-[#12231B] dark:to-[#0B1510] border border-emerald-500/20 dark:border-emerald-500/30 p-8 sm:p-12 md:p-16 text-center shadow-sm overflow-hidden">
          
          {/* Decorative ambient vector curves with green accent dots */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Top-left subtle curved arc */}
            <svg
              className="absolute -top-10 -left-10 w-48 h-48 text-emerald-600/20"
              viewBox="0 0 160 160"
              fill="none"
            >
              <path
                d="M10 150 C 40 80, 80 40, 150 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <circle cx="80" cy="80" r="3" className="fill-emerald-500" />
            </svg>

            {/* Bottom-right subtle curved arc */}
            <svg
              className="absolute -bottom-10 -right-10 w-56 h-56 text-emerald-600/20"
              viewBox="0 0 180 180"
              fill="none"
            >
              <path
                d="M170 10 C 130 90, 90 130, 10 170"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <circle cx="95" cy="95" r="3.5" className="fill-emerald-500" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-[#111916] dark:text-white tracking-tight mb-4 font-sans leading-tight">
              Let&apos;s make work feel lighter.
            </h2>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base md:text-lg text-[#4E5C56] dark:text-[#A7B5AF] leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto font-normal">
              Tell me what slows your business down. We&apos;ll map out a practical way to improve it.
            </p>

            {/* Button Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {/* Primary Discovery Call Button */}
              <a
                href="mailto:harral008@gmail.com?subject=AI%20Discovery%20Call%20Booking"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#111916] dark:bg-[#10B981] text-white dark:text-[#0A0E0C] text-xs sm:text-sm font-semibold tracking-wide hover:bg-emerald-950 dark:hover:bg-[#34D399] transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Book a discovery call</span>
                <span className="text-sm">→</span>
              </a>

              {/* Secondary WhatsApp Button */}
              <a
                href="https://wa.me/923349791008?text=Hi%20Shahroz,%20I'd%20like%20to%20discuss%20an%20AI%20service%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white dark:bg-[#16201A] text-[#111916] dark:text-white border border-black/[0.08] dark:border-white/15 text-xs sm:text-sm font-semibold hover:bg-emerald-50/80 hover:dark:bg-[#1D2A22] transition-all duration-200 shadow-xs hover:scale-[1.02] active:scale-[0.98]"
              >
                {/* WhatsApp Green Icon */}
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <svg className="w-4 h-4 text-emerald-600 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.149.929 3.182 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.771-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.057-1.121-.082-.26-.086-.593-.207-1.025-.395-1.815-.788-3.003-2.617-3.094-2.738-.09-.12-1.229-1.635-1.229-3.118 0-1.483.774-2.214 1.05-2.515.275-.3.599-.375.799-.375.2 0 .399.002.574.01.187.009.437-.07.686.527.261.624.896 2.186.974 2.346.078.16.13.348.026.557-.104.208-.156.338-.312.521-.156.182-.328.406-.468.545-.156.155-.319.324-.137.636.182.312.809 1.334 1.734 2.158 1.189 1.06 2.19 1.388 2.502 1.544.312.156.495.13.677-.078.182-.208.78-.91 1.015-1.222.234-.312.469-.26.78-.156.312.104 1.977.933 2.315 1.102.338.169.564.252.646.395.083.143.083.827-.061 1.232z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

