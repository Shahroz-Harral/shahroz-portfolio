import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  CostEfficiencyIcon,
  SpeedRocketIcon,
  CustomFitIcon,
  AccountabilityIcon,
  ControlSlidersIcon,
  PrivacySecurityIcon,
} from "./WhyItWorksIcons";

export interface WhyItWorksCardData {
  id: number;
  stepNumber: string;
  categoryTag: string;
  title: string;
  description: string;
  footerHighlight: string;
  tintBg: string;
  borderColor: string;
  iconTileBg: string;
  iconTileBorder: string;
  iconType:
    | "efficiency"
    | "speed"
    | "custom"
    | "accountability"
    | "control"
    | "privacy";
}

export const WHY_IT_WORKS_DATA: WhyItWorksCardData[] = [
  // Bento 01
  {
    id: 1,
    stepNumber: "01",
    categoryTag: "Efficiency",
    title: "Cut Costs Without Cutting Corners",
    description:
      "Eliminate manual work draining your team — email triage, data entry, approvals. AI handles it 24/7 so your people focus on what moves the business.",
    footerHighlight: "24/7 Automation",
    tintBg: "bg-[#F5FAF6]",
    borderColor: "#D3EBD7",
    iconTileBg: "bg-[#DCFCE7]",
    iconTileBorder: "border-[#BBF7D0]",
    iconType: "efficiency",
  },
  // Bento 02
  {
    id: 2,
    stepNumber: "02",
    categoryTag: "Speed to Value",
    title: "Delivered in Weeks, Not Months",
    description:
      "Forget 6-month roadmaps. A structured discovery-to-deployment process gets your first working AI system live fast — phased, tested, and high-velocity.",
    footerHighlight: "Phased & Tested",
    tintBg: "bg-[#F3F7FD]",
    borderColor: "#D8E6F8",
    iconTileBg: "bg-[#DBEAFE]",
    iconTileBorder: "border-[#BFDBFE]",
    iconType: "speed",
  },
  // Bento 03
  {
    id: 3,
    stepNumber: "03",
    categoryTag: "Custom Fit",
    title: "AI That Works for Your Industry",
    description:
      "Generic tools produce generic results. Every system I build is tailored — your workflows, your data, your edge cases. Built to fit, not forced to adapt.",
    footerHighlight: "Tailored Architecture",
    tintBg: "bg-[#F7F5FE]",
    borderColor: "#E3DAF8",
    iconTileBg: "bg-[#EDE9FE]",
    iconTileBorder: "border-[#DDD6FE]",
    iconType: "custom",
  },
  // Bento 04
  {
    id: 4,
    stepNumber: "04",
    categoryTag: "Full Accountability",
    title: "End-to-End Ownership",
    description:
      "Strategy, build, deployment, training, and support — all under one roof. One person accountable, no agency handoffs to junior developers.",
    footerHighlight: "No Agency Handoffs",
    tintBg: "bg-[#F5FAF6]",
    borderColor: "#D3EBD7",
    iconTileBg: "bg-[#DCFCE7]",
    iconTileBorder: "border-[#BBF7D0]",
    iconType: "accountability",
  },
  // Bento 05
  {
    id: 5,
    stepNumber: "05",
    categoryTag: "Governance",
    title: "Your Team Stays in Control",
    description:
      "Every system ships with full documentation and handoff training. No black boxes, no locked vendor dependencies, and total code transparency.",
    footerHighlight: "Full Handoff Training",
    tintBg: "bg-[#F8F5FE]",
    borderColor: "#E5DCF8",
    iconTileBg: "bg-[#EDE9FE]",
    iconTileBorder: "border-[#DDD6FE]",
    iconType: "control",
  },
  // Bento 06
  {
    id: 6,
    stepNumber: "06",
    categoryTag: "Privacy & Defense",
    title: "Private, Secure by Default",
    description:
      "Self-hosted models, on-prem deployments, private AI environments. Your data never leaves your infrastructure unless you explicitly choose it to.",
    footerHighlight: "Self-Hosted Models",
    tintBg: "bg-[#F2F8FD]",
    borderColor: "#D6E5F8",
    iconTileBg: "bg-[#E0F2FE]",
    iconTileBorder: "border-[#BAE6FD]",
    iconType: "privacy",
  },
];

/**
 * Render the corresponding 3D Icon based on iconType
 */
const renderWhyItWorksIcon = (iconType: WhyItWorksCardData["iconType"]) => {
  switch (iconType) {
    case "efficiency":
      return <CostEfficiencyIcon className="w-10 h-10" />;
    case "speed":
      return <SpeedRocketIcon className="w-10 h-10" />;
    case "custom":
      return <CustomFitIcon className="w-10 h-10" />;
    case "accountability":
      return <AccountabilityIcon className="w-10 h-10" />;
    case "control":
      return <ControlSlidersIcon className="w-10 h-10" />;
    case "privacy":
      return <PrivacySecurityIcon className="w-10 h-10" />;
    default:
      return null;
  }
};

/**
 * Single Card Item Component
 */
interface WhyItWorksCardItemProps {
  card: WhyItWorksCardData;
  isStack?: boolean;
}

const WhyItWorksCardItem: React.FC<WhyItWorksCardItemProps> = ({ card, isStack = false }) => {
  return (
    <div
      className={`group relative flex flex-col justify-between text-left p-5 sm:p-6 rounded-2xl transition-colors duration-200 ${card.tintBg} ${
        isStack ? "w-[320px] h-[435px]" : "w-full h-auto min-h-0"
      }`}
      style={{
        border: `1px solid ${card.borderColor}`,
        boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.03), 0 0 1px 1px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div>
        {/* Top Header Row: 3D Icon Tile on left + Title & Step Number on right */}
        <div className="flex items-center gap-3.5 mb-3.5">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border ${card.iconTileBg} ${card.iconTileBorder}`}
          >
            {renderWhyItWorksIcon(card.iconType)}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-mono font-medium text-[#60645E] block mb-0.5">
              {card.stepNumber}
            </span>
            <h3 className="text-[16px] sm:text-[17px] font-bold text-[#111310] tracking-tight leading-snug">
              {card.title}
            </h3>
          </div>
        </div>

        {/* Card Description */}
        <p className="text-[13.5px] sm:text-[14px] leading-[1.55] text-[#60645E]">
          {card.description}
        </p>
      </div>

      {/* Footer Row: Feature Highlight + Circular Action Arrow Button */}
      <div className="mt-auto pt-4 flex items-center justify-between border-t border-black/[0.05]">
        <span className="text-xs font-mono font-medium text-[#60645E]">
          {card.footerHighlight}
        </span>
        <a
          href="#ready-to-talk"
          aria-label={`Learn more about ${card.title}`}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 border border-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center text-[#111310] transition-all duration-200 hover:border-black/25 hover:bg-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4D6B3C] focus-visible:ring-offset-2"
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

/**
 * HoverStackRow3 Component
 * 3-card Hover Stack row with fan, lift, and neighbor push-aside
 */
interface HoverStackRow3Props {
  cards: WhyItWorksCardData[];
}

const CARD_WIDTH = 320;
const CARD_HEIGHT = 435;
const OVERLAP = 22; // 22px modest overlap
const STEP = CARD_WIDTH - OVERLAP; // 298px
const HOVER_LIFT = 26; // 26px vertical lift
const PUSH_DISTANCE = 48; // 48px push aside

// Alternating resting rotations for 3 cards
const RESTING_ROTATIONS_3 = [-2.2, 0.4, 2.2];

const HoverStackRow3: React.FC<HoverStackRow3Props> = ({ cards }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const totalWidth = (cards.length - 1) * STEP + CARD_WIDTH;

  return (
    <div
      ref={rowRef}
      className="relative mx-auto my-2 overflow-visible select-none py-6"
      style={{
        width: `${totalWidth}px`,
        height: `${CARD_HEIGHT + HOVER_LIFT + 28}px`,
      }}
      onMouseLeave={() => setActiveIndex(null)}
    >
      {cards.map((card, index) => {
        const isActive = activeIndex === index;
        const hasActive = activeIndex !== null;
        const baseX = index * STEP;
        const restingRotation = RESTING_ROTATIONS_3[index % RESTING_ROTATIONS_3.length];

        let x = baseX;
        let y = 0;
        let rotate = restingRotation;
        let zIndex = index + 1;
        let scale = 1;
        let shadow = "0 4px 20px -2px rgba(0, 0, 0, 0.03), 0 0 1px 1px rgba(0, 0, 0, 0.04)";

        if (hasActive) {
          if (isActive) {
            x = baseX;
            y = -HOVER_LIFT;
            rotate = 0;
            zIndex = 50;
            scale = 1.025;
            shadow = "0 22px 40px -12px rgba(0, 0, 0, 0.12), 0 0 1px 1px rgba(0, 0, 0, 0.08)";
          } else if (index < activeIndex) {
            // Cards to the left push left
            x = baseX - PUSH_DISTANCE;
            y = 2;
          } else if (index > activeIndex) {
            // Cards to the right push right
            x = baseX + PUSH_DISTANCE;
            y = 2;
          }
        }

        return (
          <div
            key={card.id}
            data-card-index={index}
            className="absolute left-0 top-6 will-change-transform"
            style={{
              width: `${CARD_WIDTH}px`,
              height: `${CARD_HEIGHT}px`,
              transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`,
              transformOrigin: "50% 90%",
              zIndex,
              boxShadow: shadow,
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
            <WhyItWorksCardItem card={card} isStack />
          </div>
        );
      })}
    </div>
  );
};

/**
 * Main WhyItWorksSection Component
 * Replaces Section 01: "AI systems built for impact"
 */
export const WhyItWorksSection: React.FC = () => {
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

    const motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => checkEnvironment();
    motionQuery?.addEventListener?.("change", onMotionChange);

    return () => {
      window.removeEventListener("resize", checkEnvironment);
      motionQuery?.removeEventListener?.("change", onMotionChange);
    };
  }, []);

  const row1Cards = useMemo(() => WHY_IT_WORKS_DATA.slice(0, 3), []);
  const row2Cards = useMemo(() => WHY_IT_WORKS_DATA.slice(3, 6), []);

  return (
    <div className="relative w-full overflow-hidden bg-transparent pt-20 pb-20 sm:pt-24 sm:pb-28 border-t border-black/[0.04]">
      {/* ===================================================================== */}
      {/* DECORATIVE BACKGROUND SVGS: Curved lines with green dots (Left & Right) */}
      {/* ===================================================================== */}
      
      {/* Left Decorative Curve with Green Dot */}
      <svg
        className="absolute left-0 top-12 pointer-events-none select-none z-0 hidden lg:block overflow-hidden"
        width="220"
        height="500"
        viewBox="0 0 220 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0 40C80 90 150 180 110 320C80 410 20 460 0 480"
          stroke="#4D6B3C"
          strokeWidth="1.2"
          strokeOpacity="0.18"
        />
        <path
          d="M0 120C60 160 110 230 80 340C60 420 10 460 0 480"
          stroke="#4D6B3C"
          strokeWidth="1"
          strokeOpacity="0.12"
        />
        <circle cx="110" cy="320" r="3.5" fill="#10B981" />
        <circle cx="110" cy="320" r="7" stroke="#10B981" strokeOpacity="0.25" strokeWidth="1" />
      </svg>

      {/* Right Decorative Curve with Green Dot */}
      <svg
        className="absolute right-0 top-16 pointer-events-none select-none z-0 hidden lg:block overflow-hidden"
        width="220"
        height="500"
        viewBox="0 0 220 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M220 40C140 90 70 180 110 320C140 410 200 460 220 480"
          stroke="#4D6B3C"
          strokeWidth="1.2"
          strokeOpacity="0.18"
        />
        <path
          d="M220 120C160 160 110 230 140 340C160 420 210 460 220 480"
          stroke="#4D6B3C"
          strokeWidth="1"
          strokeOpacity="0.12"
        />
        <circle cx="110" cy="320" r="3.5" fill="#10B981" />
        <circle cx="110" cy="320" r="7" stroke="#10B981" strokeOpacity="0.25" strokeWidth="1" />
      </svg>

      {/* ===================================================================== */}
      {/* SECTION CONTENT                                                       */}
      {/* ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-16">
          {/* Eyebrow: a small green dot, then WHY IT WORKS */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span
              className="w-2 h-2 rounded-full bg-[#10B981] inline-block shadow-[0_0_8px_rgba(16,185,129,0.7)]"
              aria-hidden="true"
            />
            <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.22em] text-[#111310]">
              WHY IT WORKS
            </span>
          </div>

          {/* Heading: semantic <h2>, centred, bold, black/near-black */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold tracking-tight text-[#111310] leading-[1.14] max-w-3xl mb-5">
            AI systems built<br className="hidden sm:inline" /> for real business impact.
          </h2>

          {/* Sub-copy: centred, grey, regular weight, max-width ~720px */}
          <p className="text-[#60645E] text-base sm:text-lg max-w-[720px] leading-relaxed font-normal">
            Built for teams ready to move fast, cut waste, and win bigger with AI. Fully built, battle-tested, done right — delivered fast.
          </p>
        </div>

        {/* ===================================================================== */}
        {/* CARD PRESENTATION: HOVER STACK (DESKTOP) VS PLAIN GRID (TABLET/MOBILE) */}
        {/* ===================================================================== */}
        {isHoverStackEnabled ? (
          <div className="flex flex-col gap-10 lg:gap-14 items-center w-full">
            {/* Stack 1: Cards 1–3 */}
            <HoverStackRow3 cards={row1Cards} />

            {/* Stack 2: Cards 4–6 */}
            <HoverStackRow3 cards={row2Cards} />
          </div>
        ) : (
          /* Fallback Plain Grid: 2 columns on tablet (768–1023px), 1 column on mobile (<768px) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {WHY_IT_WORKS_DATA.map((card) => (
              <WhyItWorksCardItem key={card.id} card={card} isStack={false} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

