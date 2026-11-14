import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  AIAssistantsIcon,
  ChatbotsIcon,
  MetaChatbotsIcon,
  PhoneEnginesIcon,
  WebsitesSoftwareIcon,
  OfficeEmailIcon,
  InvoicingIcon,
  DashboardsIcon,
} from "./ServiceIcons";

export interface ServiceCardData {
  id: number;
  title: string;
  description: string;
  tintBg: string;
  borderColor: string;
  iconTileBg: string;
  iconTileBorder: string;
  iconType:
    | "assistant"
    | "chatbots"
    | "meta"
    | "phone"
    | "code"
    | "email"
    | "invoicing"
    | "dashboards";
}

export const SERVICES_DATA: ServiceCardData[] = [
  // 1. AI Assistants & Automation — mint-green tint, robot/assistant icon
  {
    id: 1,
    title: "AI Assistants & Automation",
    description:
      "Custom AI assistants to handle your tasks, answer questions and automate repetitive work — built around how your business actually runs.",
    tintBg: "bg-[#F5FAF6]",
    borderColor: "#D3EBD7",
    iconTileBg: "bg-[#DCFCE7]",
    iconTileBorder: "border-[#BBF7D0]",
    iconType: "assistant",
  },
  // 2. 24/7 Smart Business Chatbots — blue tint, chat-bubbles icon
  {
    id: 2,
    title: "24/7 Smart Business Chatbots",
    description:
      "Intelligent chatbots for your website and business that turn visitors into booked clients around the clock — handling FAQs, qualifying prospects, and routing high-intent enquiries straight to your team.",
    tintBg: "bg-[#F3F7FD]",
    borderColor: "#D8E6F8",
    iconTileBg: "bg-[#DBEAFE]",
    iconTileBorder: "border-[#BFDBFE]",
    iconType: "chatbots",
  },
  // 3. Meta Chatbots — blue/lavender tint, Meta infinity icon
  {
    id: 3,
    title: "Meta Chatbots",
    description:
      "Automate conversations on WhatsApp, Instagram and Messenger so you never miss a lead — replies, follow-ups and qualification handled for you.",
    tintBg: "bg-[#F7F5FE]",
    borderColor: "#E3DAF8",
    iconTileBg: "bg-[#EDE9FE]",
    iconTileBorder: "border-[#DDD6FE]",
    iconType: "meta",
  },
  // 4. AI Phone Call Engines — mint-green tint, phone + sound-wave icon
  {
    id: 4,
    title: "AI Phone Call Engines",
    description:
      "Natural-sounding AI voice agents that answer calls, handle enquiries, qualify leads and book appointments — 24/7, automatically, and synced with your Google/Outlook calendar.",
    tintBg: "bg-[#F5FAF6]",
    borderColor: "#D3EBD7",
    iconTileBg: "bg-[#DCFCE7]",
    iconTileBorder: "border-[#BBF7D0]",
    iconType: "phone",
  },
  // 5. Websites & Software — lavender tint, code </> icon
  {
    id: 5,
    title: "Websites & Software",
    description:
      "Modern, high-performance websites and custom software built for your business goals.",
    tintBg: "bg-[#F8F5FE]",
    borderColor: "#E5DCF8",
    iconTileBg: "bg-[#EDE9FE]",
    iconTileBorder: "border-[#DDD6FE]",
    iconType: "code",
  },
  // 6. Everyday Office & Email Automations — light-blue tint, inbox/email icon
  {
    id: 6,
    title: "Everyday Office & Email Automations",
    description:
      "Free your staff from repetitive busywork — automatically categorise incoming emails, draft replies, handle routine office tasks and update your CRM without human friction.",
    tintBg: "bg-[#F2F8FD]",
    borderColor: "#D6E5F8",
    iconTileBg: "bg-[#E0F2FE]",
    iconTileBorder: "border-[#BAE6FD]",
    iconType: "email",
  },
  // 7. Automated Invoicing & Financial Operations — mint/green tint, invoice/receipt icon
  {
    id: 7,
    title: "Automated Invoicing & Financial Operations",
    description:
      "Automatically capture invoices, extract line-item records, reconcile billing discrepancies, and sync ledger entries with QuickBooks or Xero without manual bookkeeping errors.",
    tintBg: "bg-[#F5FAF6]",
    borderColor: "#D3EBD7",
    iconTileBg: "bg-[#DCFCE7]",
    iconTileBorder: "border-[#BBF7D0]",
    iconType: "invoicing",
  },
  // 8. Custom Business Dashboards with Smart Data Analysis & Plain English Insights — lavender/blue tint, dashboard/chart icon
  {
    id: 8,
    title: "Custom Business Dashboards with Smart Data Analysis & Plain English Insights",
    description:
      "Clean, real-time executive dashboards that track your operational margins, lead conversion and cash flow on mobile and desktop without messy spreadsheets — plus plain-English questions about your business data answered with instant summaries, trend forecasts and actionable insights.",
    tintBg: "bg-[#F6F5FD]",
    borderColor: "#E2DAF8",
    iconTileBg: "bg-[#EDE9FE]",
    iconTileBorder: "border-[#DDD6FE]",
    iconType: "dashboards",
  },
];

/**
 * Render the corresponding 3D Icon based on iconType
 */
const renderCardIcon = (iconType: ServiceCardData["iconType"]) => {
  switch (iconType) {
    case "assistant":
      return <AIAssistantsIcon className="w-10 h-10" />;
    case "chatbots":
      return <ChatbotsIcon className="w-10 h-10" />;
    case "meta":
      return <MetaChatbotsIcon className="w-10 h-10" />;
    case "phone":
      return <PhoneEnginesIcon className="w-10 h-10" />;
    case "code":
      return <WebsitesSoftwareIcon className="w-10 h-10" />;
    case "email":
      return <OfficeEmailIcon className="w-10 h-10" />;
    case "invoicing":
      return <InvoicingIcon className="w-10 h-10" />;
    case "dashboards":
      return <DashboardsIcon className="w-10 h-10" />;
    default:
      return null;
  }
};

/**
 * Single Card View Component
 * Used both inside HoverStack rows and inside the Fallback Plain Grid
 */
interface ServiceCardItemProps {
  card: ServiceCardData;
  isStack?: boolean;
}

const ServiceCardItem: React.FC<ServiceCardItemProps> = ({ card, isStack = false }) => {
  return (
    <div
      className={`group relative flex flex-col justify-between text-left p-5 sm:p-6 rounded-2xl transition-colors duration-200 ${card.tintBg} ${
        isStack ? "w-[295px] h-[450px]" : "w-full h-auto min-h-0"
      }`}
      style={{
        border: `1px solid ${card.borderColor}`,
        boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.03), 0 0 1px 1px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div>
        {/* Header Row: 3D Icon Tile on left + Title on right */}
        <div className="flex items-center gap-3.5 mb-3.5">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border ${card.iconTileBg} ${card.iconTileBorder}`}
          >
            {renderCardIcon(card.iconType)}
          </div>
          <h3 className="text-[16px] sm:text-[17px] font-bold text-[#111310] tracking-tight leading-snug flex-1 min-w-0">
            {card.title}
          </h3>
        </div>

        {/* Card Description */}
        <p className="text-[13.5px] leading-[1.52] text-[#60645E]">
          {card.description}
        </p>
      </div>

      {/* Arrow Button: aligned across rows via mt-auto */}
      <div className="mt-auto pt-3 flex items-center">
        <a
          href="services.html"
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
 * HoverStackRow Component
 * Implements the exact Hover Stack interaction from 21st.dev by @hyperiux:
 * - Overlapping 4-card stack that fans out around hovered card
 * - Active card lifts and straightens (y: -26px, rotate: 0deg, z: 50)
 * - Neighbors push aside (immediate neighbors push 48px, outer 36px)
 * - Fixed-size interior (no reflow)
 * - Supports keyboard focus (:focus-within)
 */
interface HoverStackRowProps {
  cards: ServiceCardData[];
}

const CARD_WIDTH = 295;
const CARD_HEIGHT = 450;
const OVERLAP = 18; // 18px modest overlap at rest so text is 100% unobstructed
const STEP = CARD_WIDTH - OVERLAP; // 277px
const HOVER_LIFT = 26; // 26px lift
const PUSH_DISTANCE = 48; // 48px horizontal push for immediate neighbors

// Gentle resting rotation preset for 4 cards (alternating roughly -2° to +2°)
const RESTING_ROTATIONS = [-2, 1.4, -1.4, 2];

const HoverStackRow: React.FC<HoverStackRowProps> = ({ cards }) => {
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
        const restingRotation = RESTING_ROTATIONS[index % RESTING_ROTATIONS.length];

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
            const dist = activeIndex - index;
            x = baseX - (dist === 1 ? PUSH_DISTANCE : PUSH_DISTANCE * 0.75);
            y = 2;
          } else if (index > activeIndex) {
            // Cards to the right push right
            const dist = index - activeIndex;
            x = baseX + (dist === 1 ? PUSH_DISTANCE : PUSH_DISTANCE * 0.75);
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
            <ServiceCardItem card={card} isStack />
          </div>
        );
      })}
    </div>
  );
};

/**
 * Main ServicesSection Component
 * Replaces the old "All Features in One" section
 */
export const ServicesSection: React.FC = () => {
  const [isHoverStackEnabled, setIsHoverStackEnabled] = useState(false);

  useEffect(() => {
    // Check if device supports fine hover, is desktop width (>= 1024px), and has no reduced motion
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

  const row1Cards = useMemo(() => SERVICES_DATA.slice(0, 4), []);
  const row2Cards = useMemo(() => SERVICES_DATA.slice(4, 8), []);

  return (
    <div className="relative w-full overflow-hidden bg-transparent pt-20 pb-20 sm:pt-24 sm:pb-28">
      {/* ===================================================================== */}
      {/* DECORATIVE BACKGROUND SVGS: Curved lines with green dots (Left & Right) */}
      {/* ===================================================================== */}
      
      {/* Far Left Decorative Curve with Green Dot */}
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
        {/* Green dot on the curve */}
        <circle cx="110" cy="320" r="3.5" fill="#10B981" />
        <circle cx="110" cy="320" r="7" stroke="#10B981" strokeOpacity="0.25" strokeWidth="1" />
      </svg>

      {/* Far Right Decorative Curve with Green Dot */}
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
        {/* Green dot on the curve */}
        <circle cx="110" cy="320" r="3.5" fill="#10B981" />
        <circle cx="110" cy="320" r="7" stroke="#10B981" strokeOpacity="0.25" strokeWidth="1" />
      </svg>

      {/* ===================================================================== */}
      {/* SECTION CONTENT                                                       */}
      {/* ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-16">
          {/* Eyebrow: a small green dot, then OUR SERVICES */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span
              className="w-2 h-2 rounded-full bg-[#10B981] inline-block shadow-[0_0_8px_rgba(16,185,129,0.7)]"
              aria-hidden="true"
            />
            <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.22em] text-[#111310]">
              OUR SERVICES
            </span>
          </div>

          {/* Heading: semantic <h2>, centred, bold, black/near-black */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold tracking-tight text-[#111310] leading-[1.14] max-w-3xl mb-5">
            AI solutions that<br className="hidden sm:inline" /> actually work for your business.
          </h2>

          {/* Sub-copy: centred, grey, regular weight, max-width ~720px */}
          <p className="text-[#60645E] text-base sm:text-lg max-w-[720px] leading-relaxed font-normal">
            From smart chatbots to fully automated workflows, we build AI solutions that save you time, reduce manual work and help you grow.
          </p>
        </div>

        {/* ===================================================================== */}
        {/* CARD PRESENTATION: HOVER STACK (DESKTOP) VS PLAIN GRID (TABLET/MOBILE) */}
        {/* ===================================================================== */}
        {isHoverStackEnabled ? (
          <div className="flex flex-col gap-10 lg:gap-14 items-center w-full">
            {/* Stack 1: Cards 1–4 */}
            <HoverStackRow cards={row1Cards} />

            {/* Stack 2: Cards 5–8 */}
            <HoverStackRow cards={row2Cards} />
          </div>
        ) : (
          /* Fallback Plain Grid: 2 columns on tablet (768–1023px), 1 column on mobile (<768px) */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {SERVICES_DATA.map((card) => (
              <ServiceCardItem key={card.id} card={card} isStack={false} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
