import React from "react";

interface IconProps {
  className?: string;
}

/**
 * 3D Robot Assistant Icon
 * Cute glossy ceramic robot head with mint ears and glowing visor
 */
export const AIAssistantsIcon: React.FC<IconProps> = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="robot-head-grad" x1="12" y1="12" x2="44" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="70%" stopColor="#EDF5EE" />
        <stop offset="100%" stopColor="#D5E8D8" />
      </linearGradient>
      <linearGradient id="robot-ear-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="robot-visor-grad" x1="16" y1="20" x2="40" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0F172A" />
        <stop offset="100%" stopColor="#1E293B" />
      </linearGradient>
      <filter id="robot-shadow" x="6" y="8" width="44" height="44" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#059669" floodOpacity="0.18" />
      </filter>
    </defs>
    {/* Ears / Antenna nubs */}
    <rect x="7" y="24" width="4" height="8" rx="2" fill="url(#robot-ear-grad)" />
    <rect x="45" y="24" width="4" height="8" rx="2" fill="url(#robot-ear-grad)" />
    <rect x="26" y="7" width="4" height="6" rx="2" fill="url(#robot-ear-grad)" />
    <circle cx="28" cy="7" r="2.5" fill="#34D399" />
    
    {/* Robot Head Body */}
    <g filter="url(#robot-shadow)">
      <rect x="10" y="12" width="36" height="32" rx="10" fill="url(#robot-head-grad)" stroke="#C6E2CB" strokeWidth="1" />
    </g>

    {/* Visor Screen */}
    <rect x="15" y="17" width="26" height="20" rx="6" fill="url(#robot-visor-grad)" stroke="#334155" strokeWidth="0.8" />
    
    {/* Screen Specular Highlight */}
    <path d="M17 19H37C38.1 19 39 19.9 39 21V23C34 23 23 25 17 28V21C17 19.9 17.9 19 19 19Z" fill="white" fillOpacity="0.12" />

    {/* Glowing Eyes */}
    <rect x="19" y="23" width="5" height="6" rx="2.5" fill="#34D399" />
    <rect x="32" y="23" width="5" height="6" rx="2.5" fill="#34D399" />
    <circle cx="20.5" cy="24.5" r="1" fill="#FFFFFF" />
    <circle cx="33.5" cy="24.5" r="1" fill="#FFFFFF" />

    {/* Smile */}
    <path d="M26 31C27 32 29 32 30 31" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/**
 * 3D Chatbots Speech Bubbles Icon
 * Glossy layered chat bubbles in blue
 */
export const ChatbotsIcon: React.FC<IconProps> = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="chat-back-grad" x1="10" y1="10" x2="38" y2="38" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
      <linearGradient id="chat-front-grad" x1="20" y1="18" x2="48" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#DBEAFE" />
      </linearGradient>
      <filter id="chat-shadow-1" x="6" y="8" width="38" height="36" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#1E40AF" floodOpacity="0.22" />
      </filter>
      <filter id="chat-shadow-2" x="16" y="16" width="36" height="34" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#1E3A8A" floodOpacity="0.18" />
      </filter>
    </defs>

    {/* Back Bubble (Blue) */}
    <g filter="url(#chat-shadow-1)">
      <path
        d="M12 23C12 16.9249 16.9249 12 23 12H27C33.0751 12 38 16.9249 38 23C38 29.0751 33.0751 34 27 34H21L14 38V32.3551C12.7538 29.8373 12 26.5414 12 23Z"
        fill="url(#chat-back-grad)"
      />
    </g>

    {/* Back Bubble Dots */}
    <circle cx="21" cy="23" r="1.8" fill="#FFFFFF" fillOpacity="0.8" />
    <circle cx="26" cy="23" r="1.8" fill="#FFFFFF" fillOpacity="0.8" />

    {/* Front Bubble (Light/Ice Blue) */}
    <g filter="url(#chat-shadow-2)">
      <path
        d="M20 29C20 23.4772 24.4772 19 30 19H36C41.5228 19 46 23.4772 46 29C46 34.5228 41.5228 39 36 39H34L28 43V38.1648C23.2115 37.1121 20 33.4093 20 29Z"
        fill="url(#chat-front-grad)"
        stroke="#BFDBFE"
        strokeWidth="1"
      />
    </g>

    {/* Front Bubble Dots */}
    <circle cx="28" cy="29" r="1.8" fill="#3B82F6" />
    <circle cx="33" cy="29" r="1.8" fill="#3B82F6" />
    <circle cx="38" cy="29" r="1.8" fill="#3B82F6" />
  </svg>
);

/**
 * 3D Meta Infinity Icon
 * Glossy volumetric infinity symbol in royal blue / lavender
 */
export const MetaChatbotsIcon: React.FC<IconProps> = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="meta-loop-grad" x1="10" y1="16" x2="46" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0064E0" />
        <stop offset="50%" stopColor="#0082FB" />
        <stop offset="100%" stopColor="#4F46E5" />
      </linearGradient>
      <linearGradient id="meta-specular" x1="14" y1="18" x2="42" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <filter id="meta-shadow" x="8" y="16" width="40" height="26" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0064E0" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Volumetric Infinity Loop */}
    <g filter="url(#meta-shadow)">
      <path
        d="M20.2 21.8C16.8 18.5 12.2 19.8 11.2 24.5C10.1 29.5 14 34.2 19 34.2C22.6 34.2 25.4 31.8 28 28.5C30.6 31.8 33.4 34.2 37 34.2C42 34.2 45.9 29.5 44.8 24.5C43.8 19.8 39.2 18.5 35.8 21.8L28 29.8L20.2 21.8Z"
        fill="url(#meta-loop-grad)"
      />
    </g>

    {/* Inner Cutouts to give true infinity ring geometry */}
    <path
      d="M19 30.5C16.5 30.5 14.5 28.5 15 25.8C15.5 23.3 17.8 22.8 19.5 24.2L24.8 29.3C23.2 30.1 21.2 30.5 19 30.5ZM37 30.5C34.8 30.5 32.8 30.1 31.2 29.3L36.5 24.2C38.2 22.8 40.5 23.3 41 25.8C41.5 28.5 39.5 30.5 37 30.5Z"
      fill="#EDE9FE"
    />

    {/* Top gloss highlight */}
    <path
      d="M15 22C17 19.5 20.5 20 22 22M34 22C35.5 20 39 19.5 41 22"
      stroke="url(#meta-specular)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * 3D AI Phone Call Engines Icon
 * Emerald green phone receiver tilted with 3D sound waves
 */
export const PhoneEnginesIcon: React.FC<IconProps> = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="phone-grad" x1="12" y1="14" x2="34" y2="42" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="60%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <filter id="phone-shadow" x="8" y="10" width="40" height="40" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#047857" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Phone Body */}
    <g filter="url(#phone-shadow)">
      <path
        d="M15.5 25.5C18.2 30.8 22.2 34.8 27.5 37.5L31.5 33.5C32 33 32.8 32.8 33.5 33.1C35.8 33.8 38.3 34.2 40.8 34.2C42 34.2 43 35.2 43 36.4V41.5C43 42.7 42 43.7 40.8 43.7C24.5 43.7 11.3 30.5 11.3 14.2C11.3 13 12.3 12 13.5 12H18.6C19.8 12 20.8 13 20.8 14.2C20.8 16.7 21.2 19.2 21.9 21.5C22.2 22.2 22 23 21.5 23.5L15.5 25.5Z"
        fill="url(#phone-grad)"
        stroke="#6EE7B7"
        strokeWidth="1"
      />
    </g>

    {/* Specular Highlight along edge */}
    <path
      d="M13.5 14H18M40.5 41V37"
      stroke="#A7F3D0"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Sound Waves */}
    <path
      d="M36 15C39.5 17.5 42 21.5 42 26"
      stroke="#10B981"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <path
      d="M32 19C34.2 20.6 36 23.2 36 26"
      stroke="#34D399"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M28 23C28.8 23.8 29.5 24.8 29.5 26"
      stroke="#6EE7B7"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * 3D Websites & Software Icon
 * Dark violet glossy rounded tile with bright glowing code brackets </>
 */
export const WebsitesSoftwareIcon: React.FC<IconProps> = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="code-tile-grad" x1="12" y1="12" x2="44" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#312E81" />
        <stop offset="60%" stopColor="#1E1B4B" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      <filter id="code-tile-shadow" x="8" y="8" width="40" height="42" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#312E81" floodOpacity="0.35" />
      </filter>
    </defs>

    {/* 3D Tile */}
    <g filter="url(#code-tile-shadow)">
      <rect x="12" y="12" width="32" height="32" rx="9" fill="url(#code-tile-grad)" stroke="#4338CA" strokeWidth="1" />
    </g>

    {/* Top Edge Gloss Highlight */}
    <path d="M14 14H42" stroke="white" strokeOpacity="0.25" strokeWidth="1" strokeLinecap="round" />

    {/* Left Bracket < */}
    <path
      d="M23 23L18 28L23 33"
      stroke="#FFFFFF"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Slash / */}
    <path
      d="M30 21L26 35"
      stroke="#818CF8"
      strokeWidth="2.2"
      strokeLinecap="round"
    />

    {/* Right Bracket > */}
    <path
      d="M33 23L38 28L33 33"
      stroke="#FFFFFF"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 3D Everyday Office & Email Icon
 * Glossy envelope & inbox with automation badge
 */
export const OfficeEmailIcon: React.FC<IconProps> = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="email-base-grad" x1="12" y1="16" x2="44" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
      <linearGradient id="email-paper-grad" x1="16" y1="12" x2="40" y2="30" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F0F9FF" />
      </linearGradient>
      <filter id="email-shadow" x="8" y="10" width="40" height="38" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#0284C7" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Paper Letter Peeking Out */}
    <rect x="16" y="12" width="24" height="20" rx="3" fill="url(#email-paper-grad)" stroke="#BAE6FD" strokeWidth="1" />
    <line x1="20" y1="16" x2="28" y2="16" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="20" y1="20" x2="34" y2="20" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />

    {/* Envelope Body */}
    <g filter="url(#email-shadow)">
      <rect x="11" y="21" width="34" height="23" rx="5" fill="url(#email-base-grad)" stroke="#7DD3FC" strokeWidth="1" />
      {/* Envelope Flap Lines */}
      <path d="M12 22L28 33L44 22" stroke="#BAE6FD" strokeWidth="1.5" strokeLinejoin="round" />
    </g>

    {/* Glowing Automation Star Badge */}
    <circle cx="39" cy="18" r="4.5" fill="#10B981" />
    <path d="M39 15.5V20.5M36.5 18H41.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/**
 * 3D Automated Invoicing & Financial Operations Icon
 * 3D folded invoice receipt with emerald dollar stamp
 */
export const InvoicingIcon: React.FC<IconProps> = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="inv-page-grad" x1="14" y1="10" x2="42" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#ECFDF5" />
      </linearGradient>
      <linearGradient id="inv-stamp-grad" x1="28" y1="28" x2="44" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <filter id="inv-shadow" x="9" y="8" width="38" height="42" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#059669" floodOpacity="0.2" />
      </filter>
    </defs>

    {/* Invoice Paper */}
    <g filter="url(#inv-shadow)">
      <path
        d="M15 13C15 11.3431 16.3431 10 18 10H33L41 18V41C41 42.6569 39.6569 44 38 44H18C16.3431 44 15 42.6569 15 41V13Z"
        fill="url(#inv-page-grad)"
        stroke="#A7F3D0"
        strokeWidth="1.2"
      />
      {/* Folded Corner */}
      <path d="M33 10V18H41" fill="#D1FAE5" stroke="#A7F3D0" strokeWidth="1.2" strokeLinejoin="round" />
    </g>

    {/* Ledger Lines */}
    <line x1="20" y1="22" x2="28" y2="22" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="27" x2="34" y2="27" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="20" y1="32" x2="30" y2="32" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" />

    {/* Emerald Checkmark / Dollar Stamp */}
    <circle cx="34" cy="36" r="7" fill="url(#inv-stamp-grad)" stroke="#A7F3D0" strokeWidth="1" />
    <path d="M31.5 36L33.5 38L37 34" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * 3D Business Dashboards & Analytics Icon
 * Floating 3D bar chart with upward trend line and glowing peak
 */
export const DashboardsIcon: React.FC<IconProps> = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="bar1-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6EE7B7" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
      <linearGradient id="bar2-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#93C5FD" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="bar3-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C4B5FD" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
      <filter id="dash-shadow" x="8" y="10" width="40" height="38" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#3B82F6" floodOpacity="0.2" />
      </filter>
    </defs>

    {/* Glass Platform / Base Tray */}
    <ellipse cx="28" cy="42" rx="18" ry="4" fill="#E2E8F0" fillOpacity="0.5" />

    <g filter="url(#dash-shadow)">
      {/* Bar 1 (Mint) */}
      <rect x="14" y="28" width="6.5" height="13" rx="3.25" fill="url(#bar1-grad)" />
      
      {/* Bar 2 (Blue) */}
      <rect x="24.5" y="21" width="6.5" height="20" rx="3.25" fill="url(#bar2-grad)" />

      {/* Bar 3 (Purple) */}
      <rect x="35" y="14" width="6.5" height="27" rx="3.25" fill="url(#bar3-grad)" />
    </g>

    {/* Upward Trend Line */}
    <path
      d="M14 26C18 24 23 18 28 17C33 16 36 12 39 10"
      stroke="#4F46E5"
      strokeWidth="2.2"
      strokeLinecap="round"
    />

    {/* Glowing Peak Dot */}
    <circle cx="39" cy="10" r="3" fill="#8B5CF6" />
    <circle cx="39" cy="10" r="1.5" fill="#FFFFFF" />
  </svg>
);

