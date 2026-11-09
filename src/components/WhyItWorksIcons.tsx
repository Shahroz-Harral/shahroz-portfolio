import React from "react";

interface IconProps {
  className?: string;
}

/**
 * 3D Efficiency / Cost Cutting Icon
 * Emerald 3D energy bolt with gauge meter and glossy highlight
 */
export const CostEfficiencyIcon: React.FC<IconProps> = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="bolt-grad" x1="16" y1="12" x2="40" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="60%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="meter-circle" x1="10" y1="10" x2="46" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E2F7E8" />
        <stop offset="100%" stopColor="#C4EBD0" />
      </linearGradient>
      <filter id="bolt-shadow" x="12" y="10" width="32" height="38" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#047857" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Subtle circular gauge background */}
    <circle cx="28" cy="28" r="21" fill="url(#meter-circle)" stroke="#A7F3D0" strokeWidth="1" />
    <path
      d="M17 38C13 32 14 22 20 16C26 10 36 10 42 16"
      stroke="#10B981"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray="4 4"
    />

    {/* 3D Lightning Bolt */}
    <g filter="url(#bolt-shadow)">
      <path
        d="M31 12L18 29H28L25 44L40 25H29L31 12Z"
        fill="url(#bolt-grad)"
        stroke="#6EE7B7"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </g>

    {/* Specular Edge Highlight */}
    <path
      d="M30 14L20 28H28L26 39"
      stroke="#FFFFFF"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />
  </svg>
);

/**
 * 3D Speed to Value / Rocket Icon
 * Vivid blue ascending aerodynamic rocket with speed trail
 */
export const SpeedRocketIcon: React.FC<IconProps> = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="rocket-body-grad" x1="22" y1="12" x2="44" y2="38" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#93C5FD" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="rocket-fin-grad" x1="14" y1="26" x2="32" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="flame-grad" x1="16" y1="36" x2="10" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
      <filter id="rocket-shadow" x="8" y="10" width="40" height="40" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#1E40AF" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Flame exhaust */}
    <path
      d="M17 35C15 39 12 43 11 46C14 45 18 42 22 40C20 38 18 36 17 35Z"
      fill="url(#flame-grad)"
    />
    <circle cx="15" cy="42" r="2.5" fill="#FDE047" />

    {/* Rocket Fins and Fuselage */}
    <g filter="url(#rocket-shadow)">
      {/* Left Fin */}
      <path d="M19 28L13 36C17 37 21 36 24 33L19 28Z" fill="url(#rocket-fin-grad)" />
      {/* Right Fin */}
      <path d="M28 19L36 13C37 17 36 21 33 24L28 19Z" fill="url(#rocket-fin-grad)" />
      {/* Rocket Main Body */}
      <path
        d="M44 12C34 14 26 22 22 30C20 34 20 37 20 37C20 37 23 37 27 35C35 31 43 23 44 12Z"
        fill="url(#rocket-body-grad)"
        stroke="#BFDBFE"
        strokeWidth="1"
      />
    </g>

    {/* Rocket Window */}
    <circle cx="33" cy="23" r="4.5" fill="#1E3A8A" stroke="#93C5FD" strokeWidth="1.2" />
    <circle cx="34" cy="22" r="1.5" fill="#FFFFFF" />

    {/* Speed Lines */}
    <path d="M11 20L15 22M20 11L22 15" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * 3D Custom Fit / Architecture Gears Icon
 * Interlocking 3D gears & architecture modules in royal blue / lavender
 */
export const CustomFitIcon: React.FC<IconProps> = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="gear1-grad" x1="16" y1="12" x2="42" y2="38" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#818CF8" />
        <stop offset="100%" stopColor="#4F46E5" />
      </linearGradient>
      <linearGradient id="gear2-grad" x1="12" y1="24" x2="34" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#C4B5FD" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <filter id="gear-shadow" x="8" y="10" width="40" height="40" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#4338CA" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Interlocking 3D Gears */}
    <g filter="url(#gear-shadow)">
      {/* Primary Gear */}
      <circle cx="34" cy="22" r="12" fill="url(#gear1-grad)" stroke="#A5B4FC" strokeWidth="1" />
      <circle cx="34" cy="22" r="4.5" fill="#EDE9FE" />
      {/* Gear 1 Teeth */}
      <rect x="32" y="7" width="4" height="4" rx="1.5" fill="#818CF8" />
      <rect x="32" y="33" width="4" height="4" rx="1.5" fill="#4F46E5" />
      <rect x="45" y="20" width="4" height="4" rx="1.5" fill="#6366F1" />
      <rect x="19" y="20" width="4" height="4" rx="1.5" fill="#6366F1" />

      {/* Interlocking Secondary Gear */}
      <circle cx="22" cy="35" r="10" fill="url(#gear2-grad)" stroke="#DDD6FE" strokeWidth="1" />
      <circle cx="22" cy="35" r="3.5" fill="#EDE9FE" />
      {/* Gear 2 Teeth */}
      <rect x="20" y="22" width="4" height="4" rx="1.5" fill="#C4B5FD" />
      <rect x="20" y="44" width="4" height="4" rx="1.5" fill="#7C3AED" />
      <rect x="9" y="33" width="4" height="4" rx="1.5" fill="#8B5CF6" />
      <rect x="31" y="33" width="4" height="4" rx="1.5" fill="#8B5CF6" />
    </g>

    {/* Glossy highlight arch */}
    <path
      d="M26 18C28 14 34 14 38 16"
      stroke="#FFFFFF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />
  </svg>
);

/**
 * 3D Full Accountability / Shield Icon
 * Volumetric emerald protection shield with certified seal
 */
export const AccountabilityIcon: React.FC<IconProps> = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="shield-grad" x1="14" y1="12" x2="42" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="60%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="shield-rim" x1="12" y1="10" x2="44" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#6EE7B7" />
      </linearGradient>
      <filter id="shield-shadow" x="8" y="10" width="40" height="40" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#047857" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Shield Body */}
    <g filter="url(#shield-shadow)">
      <path
        d="M28 11L41 16V28C41 36.5 35.5 42.5 28 45C20.5 42.5 15 36.5 15 28V16L28 11Z"
        fill="url(#shield-grad)"
        stroke="url(#shield-rim)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </g>

    {/* Inner Shield Specular Line */}
    <path
      d="M28 15V41C33.5 38.8 37.5 34 37.5 28V18.5L28 15Z"
      fill="#FFFFFF"
      fillOpacity="0.12"
    />

    {/* Verified Checkmark */}
    <path
      d="M23 27.5L26.5 31L33.5 24"
      stroke="#FFFFFF"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 3D Governance / Control Sliders Icon
 * High-tech precision adjustment sliders with glowing position knobs
 */
export const ControlSlidersIcon: React.FC<IconProps> = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="slider-card-grad" x1="12" y1="12" x2="44" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#EDE9FE" />
      </linearGradient>
      <linearGradient id="knob1-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A78BFA" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <linearGradient id="knob2-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#818CF8" />
        <stop offset="100%" stopColor="#4F46E5" />
      </linearGradient>
      <filter id="slider-shadow" x="8" y="10" width="40" height="38" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#6D28D9" floodOpacity="0.22" />
      </filter>
    </defs>

    {/* Back Plate */}
    <g filter="url(#slider-shadow)">
      <rect x="12" y="13" width="32" height="30" rx="8" fill="url(#slider-card-grad)" stroke="#DDD6FE" strokeWidth="1" />
    </g>

    {/* Track 1 (Vertical) */}
    <rect x="20" y="19" width="3" height="18" rx="1.5" fill="#E2E8F0" />
    <circle cx="21.5" cy="24" r="5" fill="url(#knob1-grad)" stroke="#FFFFFF" strokeWidth="1.2" />
    <circle cx="21.5" cy="23" r="1.5" fill="#FFFFFF" />

    {/* Track 2 (Vertical) */}
    <rect x="33" y="19" width="3" height="18" rx="1.5" fill="#E2E8F0" />
    <circle cx="34.5" cy="31" r="5" fill="url(#knob2-grad)" stroke="#FFFFFF" strokeWidth="1.2" />
    <circle cx="34.5" cy="30" r="1.5" fill="#FFFFFF" />
  </svg>
);

/**
 * 3D Privacy & Defense / Padlock Vault Icon
 * Cyber security vault padlock with metallic shackle and glowing keyhole
 */
export const PrivacySecurityIcon: React.FC<IconProps> = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="lock-body-grad" x1="14" y1="22" x2="42" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="70%" stopColor="#0284C7" />
        <stop offset="100%" stopColor="#0369A1" />
      </linearGradient>
      <linearGradient id="shackle-grad" x1="18" y1="10" x2="38" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
      <filter id="lock-shadow" x="10" y="10" width="36" height="38" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#0284C7" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Metallic Shackle */}
    <path
      d="M21 24V17C21 13.134 24.134 10 28 10C31.866 10 35 13.134 35 17V24"
      stroke="url(#shackle-grad)"
      strokeWidth="4.5"
      strokeLinecap="round"
    />

    {/* Lock Body */}
    <g filter="url(#lock-shadow)">
      <rect
        x="14"
        y="22"
        width="28"
        height="22"
        rx="6"
        fill="url(#lock-body-grad)"
        stroke="#7DD3FC"
        strokeWidth="1"
      />
    </g>

    {/* Top specular reflection */}
    <path d="M16 24H40" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round" />

    {/* Keyhole */}
    <circle cx="28" cy="31" r="2.8" fill="#0C4A6E" />
    <path d="M26.8 32.5L26 38H30L29.2 32.5H26.8Z" fill="#0C4A6E" />
    <circle cx="28" cy="30.5" r="1" fill="#38BDF8" />
  </svg>
);

