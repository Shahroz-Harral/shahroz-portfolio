import React, { useState, useEffect, useMemo, useRef } from "react";

export interface BlogArticleData {
  id: number;
  date: string;
  readTime: string;
  title: string;
  description: string;
  tintBg: string;
  borderColor: string;
  iconTileBg: string;
  iconTileBorder: string;
  iconType: "security" | "healthcare" | "voice";
  link: string;
}

export const BLOG_ARTICLES: BlogArticleData[] = [
  {
    id: 1,
    date: "August 16, 2026",
    readTime: "5 min read",
    title: "5 Ways Your AI Agent Will Get Hacked",
    description:
      "Prompt injection is just the baseline. Here are the five real threat categories that kill production AI agents — from tool parameter poisoning to credential leakage — and the architectural mitigation for each.",
    tintBg: "bg-[#F5FAF6]",
    borderColor: "#D3EBD7",
    iconTileBg: "bg-[#DCFCE7]",
    iconTileBorder: "border-[#BBF7D0]",
    iconType: "security",
    link: "https://github.com/Shahroz-Harral",
  },
  {
    id: 2,
    date: "July 20, 2026",
    readTime: "4 min read",
    title: "How AI Is Actually Being Used in Healthcare",
    description:
      "Most healthcare AI applications delivering real ROI are utilitarian — clinical note synthesis, patient triage routing, and compliance audits. An analysis of what actually works today versus venture hype.",
    tintBg: "bg-[#F3F7FD]",
    borderColor: "#D8E6F8",
    iconTileBg: "bg-[#DBEAFE]",
    iconTileBorder: "border-[#BFDBFE]",
    iconType: "healthcare",
    link: "https://github.com/Shahroz-Harral",
  },
  {
    id: 3,
    date: "July 17, 2026",
    readTime: "3 min read",
    title: "The AI Receptionist: Stop Losing Inbound Deals",
    description:
      "Prospective clients who reach an answering machine rarely call back. An automated AI voice & WhatsApp receptionist qualifies leads 24/7, syncs directly with calendar schedules, and costs a fraction of an agency hire.",
    tintBg: "bg-[#F8F5FE]",
    borderColor: "#E5DCF8",
    iconTileBg: "bg-[#EDE9FE]",
    iconTileBorder: "border-[#DDD6FE]",
    iconType: "voice",
    link: "https://github.com/Shahroz-Harral",
  },
];

const renderBlogIcon = (type: BlogArticleData["iconType"]) => {
  switch (type) {
    case "security":
      return (
        <svg className="w-8 h-8 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "healthcare":
      return (
        <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      );
    case "voice":
      return (
        <svg className="w-8 h-8 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    default:
      return null;
  }
};

interface BlogCardItemProps {
  article: BlogArticleData;
  isStack?: boolean;
}

const BlogCardItem: React.FC<BlogCardItemProps> = ({ article, isStack = false }) => {
  return (
    <div
      className={`group relative flex flex-col justify-between text-left p-5 sm:p-6 rounded-2xl transition-colors duration-200 ${article.tintBg} dark:!bg-[#121815] dark:!border-white/[0.08] hover:dark:!border-emerald-500/40 ${
        isStack ? "w-[320px] h-[435px]" : "w-full h-auto min-h-0"
      }`}
      style={{
        border: `1px solid ${article.borderColor}`,
        boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.03), 0 0 1px 1px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div>
        {/* Top Header Row: 3D Icon Tile on left + Title & Date on right */}
        <div className="flex items-center gap-3.5 mb-3.5">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border ${article.iconTileBg} ${article.iconTileBorder} dark:!bg-white/[0.06] dark:!border-white/10`}
          >
            {renderBlogIcon(article.iconType)}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-mono text-[#60645E] dark:text-[#8D9692] block mb-0.5">
              {article.date} · {article.readTime}
            </span>
            <h3 className="text-[16px] sm:text-[17px] font-bold text-[#111310] dark:text-[#F3F5F4] tracking-tight leading-snug">
              {article.title}
            </h3>
          </div>
        </div>

        {/* Article Description */}
        <p className="text-[13.5px] sm:text-[14px] leading-[1.55] text-[#60645E] dark:text-[#9BA3A0]">
          {article.description}
        </p>
      </div>

      {/* Footer: Read Article CTA + Circular Arrow */}
      <div className="mt-auto pt-4 flex items-center justify-between border-t border-black/[0.05] dark:border-white/[0.08]">
        <span className="text-xs font-mono font-semibold text-[#111310] dark:text-[#F3F5F4] group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
          Read article
        </span>
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read article: ${article.title}`}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 dark:bg-[#1A231E] border border-black/10 dark:border-white/15 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center text-[#111310] dark:text-[#F3F5F4] transition-all duration-200 hover:border-black/25 hover:bg-white hover:shadow-md hover:dark:bg-[#222E27] hover:dark:border-emerald-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4D6B3C] focus-visible:ring-offset-2"
        >
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

const CARD_WIDTH = 320;
const CARD_HEIGHT = 435;
const OVERLAP_DESKTOP = 34;
const PUSH_OFFSET = 44;

interface BlogHoverStackRowProps {
  articles: BlogArticleData[];
}

const BlogHoverStackRow: React.FC<BlogHoverStackRowProps> = ({ articles }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalWidth = useMemo(() => {
    return CARD_WIDTH * 3 - OVERLAP_DESKTOP * 2;
  }, []);

  const restingTransforms = useMemo(() => {
    const baseSpacing = CARD_WIDTH - OVERLAP_DESKTOP;
    const centerOffset = ((3 - 1) * baseSpacing) / 2;
    const baseRotations = [-2, 0, 2];

    return articles.map((_, i) => ({
      x: i * baseSpacing - centerOffset,
      rotate: baseRotations[i] ?? 0,
    }));
  }, [articles]);

  const activeTransforms = useMemo(() => {
    if (activeIndex === null) return null;
    return articles.map((_, i) => {
      const rest = restingTransforms[i];
      if (i === activeIndex) {
        return {
          x: rest.x,
          y: -24,
          rotate: 0,
          scale: 1.025,
          zIndex: 50,
          shadow: "0 28px 56px -12px rgba(16, 185, 129, 0.16), 0 0 1px 1px rgba(0, 0, 0, 0.08)",
        };
      }
      const isLeft = i < activeIndex;
      const pushDirection = isLeft ? -1 : 1;
      const pushDistance = PUSH_OFFSET;

      return {
        x: rest.x + pushDirection * pushDistance,
        y: 0,
        rotate: rest.rotate * 0.7,
        scale: 0.99,
        zIndex: 10 + i,
        shadow: "0 4px 16px -2px rgba(0, 0, 0, 0.04), 0 0 1px 1px rgba(0, 0, 0, 0.04)",
      };
    });
  }, [activeIndex, articles, restingTransforms]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center select-none"
      style={{
        width: `${totalWidth}px`,
        height: `${CARD_HEIGHT + 36}px`,
      }}
      onMouseLeave={() => setActiveIndex(null)}
    >
      {articles.map((article, index) => {
        const rest = restingTransforms[index];
        const active = activeTransforms ? activeTransforms[index] : null;

        const currentX = active ? active.x : rest.x;
        const currentY = active ? active.y : 0;
        const currentRotate = active ? active.rotate : rest.rotate;
        const currentScale = active ? active.scale : 1;
        const currentZ = active ? active.zIndex : 10 + index;
        const currentShadow = active
          ? active.shadow
          : "0 6px 24px -4px rgba(0, 0, 0, 0.05), 0 0 1px 1px rgba(0, 0, 0, 0.04)";

        return (
          <div
            key={article.id}
            className="absolute top-4 cursor-pointer will-change-transform outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4"
            tabIndex={0}
            style={{
              transform: `translate3d(${currentX}px, ${currentY}px, 0) rotate(${currentRotate}deg) scale(${currentScale})`,
              transformOrigin: "50% 90%",
              zIndex: currentZ,
              boxShadow: currentShadow,
              borderRadius: "1rem",
              transition:
                "transform 380ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 380ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setActiveIndex(null);
              }
            }}
          >
            <BlogCardItem article={article} isStack />
          </div>
        );
      })}
    </div>
  );
};

export const BlogSection: React.FC = () => {
  const [isHoverStackEnabled, setIsHoverStackEnabled] = useState(false);

  useEffect(() => {
    const checkEnvironment = () => {
      const isDesktop = window.innerWidth >= 1024;
      const hasFineHover =
        window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches ?? false;
      const prefersReducedMotion =
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

      setIsHoverStackEnabled(isDesktop && hasFineHover && !prefersReducedMotion);
    };

    checkEnvironment();
    window.addEventListener("resize", checkEnvironment);
    return () => window.removeEventListener("resize", checkEnvironment);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-transparent pt-20 pb-20 sm:pt-24 sm:pb-28 border-t border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span
              className="w-2 h-2 rounded-full bg-[#10B981] inline-block shadow-[0_0_8px_rgba(16,185,129,0.7)]"
              aria-hidden="true"
            />
            <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.22em] text-[#111310] dark:text-[#F3F5F4]">
              FROM THE BLOG
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold tracking-tight text-[#111310] dark:text-[#F3F5F4] leading-[1.14] max-w-3xl mb-5">
            AI, explained and applied.
          </h2>

          <p className="text-[#60645E] dark:text-[#9BA3A0] text-base sm:text-lg max-w-[720px] leading-relaxed font-normal mb-4">
            Insights on production agent architectures, enterprise security, and applied AI systems.
          </p>

          <a
            href="https://github.com/Shahroz-Harral"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1.5 transition-colors"
          >
            <span>All research &amp; repositories</span>
            <span>→</span>
          </a>
        </div>

        {/* Card Presentation: HoverStack on desktop, 1-col on mobile, 2-col on tablet */}
        {isHoverStackEnabled ? (
          <div className="flex justify-center items-center w-full">
            <BlogHoverStackRow articles={BLOG_ARTICLES} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {BLOG_ARTICLES.map((article) => (
              <BlogCardItem key={article.id} article={article} isStack={false} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

