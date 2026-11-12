import React, { useState } from 'react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const ServicesFaqSection: React.FC = () => {
  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'Do I need technical knowledge?',
      answer:
        'No. I handle the technical implementation and guide you through the process. You only need to explain your business requirements and goals.',
    },
    {
      id: 'faq-2',
      question: 'Can you connect with the tools we already use?',
      answer:
        'In many cases, yes. I can assess your existing tools, available integrations and workflows to determine the most practical way to connect them.',
    },
    {
      id: 'faq-3',
      question: 'What happens after launch?',
      answer:
        'After implementation, I make sure the agreed solution is tested and handed over properly. Ongoing support and future improvements can be discussed according to your project requirements.',
    },
  ];

  // Default first item open or closed; here allow expanding/collapsing any
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative w-full py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column (Editorial Headline & Subtext) */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50/80 border border-emerald-500/15 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#111916] font-mono">
                FAQ
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#111916] tracking-tight mb-4 font-sans leading-tight">
              A few things you might be wondering
            </h2>

            <p className="text-base text-[#6C7775] leading-relaxed mb-8">
              Quick answers to common questions about our services.
            </p>

            <a
              href="mailto:harral008@gmail.com?subject=Question%20about%20AI%20Services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111916] hover:text-emerald-700 transition-colors group"
            >
              <span>View all FAQs</span>
              <span className="text-base transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* Right Column (Accessible Accordion) */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-[#E3ECE7] shadow-sm'
                      : 'bg-[#FAFCFA] border-[#E3ECE7]/70 hover:border-[#E3ECE7] hover:bg-white'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${faq.id}-content`}
                    id={`${faq.id}-button`}
                    className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-2xl cursor-pointer"
                  >
                    <span className="text-base sm:text-[17px] font-bold text-[#111916] font-sans tracking-tight">
                      {faq.question}
                    </span>

                    {/* Rotating Chevron Indicator */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-[#E5F8EE] text-emerald-700' : 'text-[#6C7775]'
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {/* Accordion Answer Content */}
                  <div
                    id={`${faq.id}-content`}
                    role="region"
                    aria-labelledby={`${faq.id}-button`}
                    className={`grid transition-all duration-300 ease-in-out px-6 ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0 pb-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm sm:text-base text-[#6C7775] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
