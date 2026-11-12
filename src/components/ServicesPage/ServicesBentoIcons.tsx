import React from 'react';

// ============================================================================
// VALUE INDICATOR ICONS (Hero Sub-row)
// ============================================================================

export const ValueConversationIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4 text-emerald-500' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

export const ValueWorkflowIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4 text-emerald-500' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

export const ValueInsightsIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4 text-emerald-500' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

// ============================================================================
// BENTO SERVICE CARDS ICONS (Matching Screenshot Exactly)
// ============================================================================

/**
 * Meta Infinity Icon (Blue / Violet Gradient)
 */
export const MetaInfinityIcon: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="metaGrad" x1="4" y1="24" x2="44" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0064E0" />
        <stop offset="50%" stopColor="#1877F2" />
        <stop offset="100%" stopColor="#0081FB" />
      </linearGradient>
    </defs>
    <path
      d="M36.2 16.5C33.4 16.5 30.8 17.8 29.1 20.1L24 26.6L18.9 20.1C17.2 17.8 14.6 16.5 11.8 16.5C6.9 16.5 3 20.4 3 25.3C3 30.2 6.9 34.1 11.8 34.1C14.6 34.1 17.2 32.8 18.9 30.5L24 24L29.1 30.5C30.8 32.8 33.4 34.1 36.2 34.1C41.1 34.1 45 30.2 45 25.3C45 20.4 41.1 16.5 36.2 16.5ZM11.8 30.4C9 30.4 6.7 28.1 6.7 25.3C6.7 22.5 9 20.2 11.8 20.2C13.6 20.2 15.3 21.1 16.4 22.6L18.5 25.3L16.4 28C15.3 29.5 13.6 30.4 11.8 30.4ZM36.2 30.4C34.4 30.4 32.7 29.5 31.6 28L29.5 25.3L31.6 22.6C32.7 21.1 34.4 20.2 36.2 20.2C39 20.2 41.3 22.5 41.3 25.3C41.3 28.1 39 30.4 36.2 30.4Z"
      fill="url(#metaGrad)"
    />
  </svg>
);

/**
 * AI Voice Agents Waveform Visual (Mint Voice-frequency bars)
 */
export const VoiceAgentWaveformIcon: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none">
    <rect x="4" y="16" width="3.5" height="8" rx="1.75" fill="#34D399" className="animate-pulse" />
    <rect x="10.5" y="10" width="3.5" height="20" rx="1.75" fill="#10B981" />
    <rect x="17" y="5" width="3.5" height="30" rx="1.75" fill="#059669" />
    <rect x="23.5" y="12" width="3.5" height="16" rx="1.75" fill="#10B981" />
    <rect x="30" y="8" width="3.5" height="24" rx="1.75" fill="#34D399" className="animate-pulse" />
    <rect x="36.5" y="16" width="3.5" height="8" rx="1.75" fill="#6EE7B7" />
  </svg>
);

/**
 * Workflow Automation (Interconnected Nodes)
 */
export const WorkflowAutomationIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg className={className} viewBox="0 0 36 36" fill="none">
    {/* Connection lines */}
    <path d="M18 14V22" stroke="#6EE7B7" strokeWidth="2" strokeDasharray="2 2" />
    <path d="M10 24H26" stroke="#A7F3D0" strokeWidth="2" />
    {/* Nodes */}
    <rect x="13" y="4" width="10" height="10" rx="3" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.75" />
    <circle cx="18" cy="9" r="1.5" fill="#059669" />
    
    <rect x="5" y="22" width="10" height="10" rx="3" fill="#F4FBF7" stroke="#34D399" strokeWidth="1.5" />
    <rect x="21" y="22" width="10" height="10" rx="3" fill="#F4FBF7" stroke="#34D399" strokeWidth="1.5" />
  </svg>
);

/**
 * Finance Automation (Invoice & Payment Cards)
 */
export const FinanceAutomationIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg className={className} viewBox="0 0 36 36" fill="none">
    {/* Back card */}
    <rect x="9" y="5" width="20" height="18" rx="3.5" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" opacity="0.6" transform="rotate(6 19 14)" />
    {/* Front card */}
    <rect x="6" y="9" width="21" height="20" rx="4" fill="#FFFFFF" stroke="#059669" strokeWidth="1.75" />
    <circle cx="11.5" cy="14.5" r="2" fill="#10B981" />
    <rect x="16" y="13.5" width="7.5" height="2" rx="1" fill="#9CA3AF" />
    <rect x="10" y="19" width="13" height="2" rx="1" fill="#E5E7EB" />
    <rect x="10" y="23" width="9" height="2" rx="1" fill="#34D399" />
  </svg>
);

/**
 * Dashboards & Data Insights (Rising Bar Chart)
 */
export const DashboardInsightsIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg className={className} viewBox="0 0 36 36" fill="none">
    <rect x="5" y="21" width="6" height="11" rx="2" fill="#E5F8EE" stroke="#10B981" strokeWidth="1.75" />
    <rect x="15" y="13" width="6" height="19" rx="2" fill="#D1FAE5" stroke="#059669" strokeWidth="1.75" />
    <rect x="25" y="7" width="6" height="25" rx="2" fill="#A7F3D0" stroke="#047857" strokeWidth="1.75" />
    {/* Upward indicator dot */}
    <circle cx="28" cy="4" r="1.5" fill="#10B981" />
  </svg>
);

/**
 * Websites & Custom Software (Code </> Bracket)
 */
export const WebsitesSoftwareIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg className={className} viewBox="0 0 36 36" fill="none">
    <rect x="4" y="6" width="28" height="24" rx="5" fill="#F8FAFC" stroke="#059669" strokeWidth="1.75" opacity="0.85" />
    <path d="M12 15L9 18L12 21" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M24 15L27 18L24 21" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19.5 13L16.5 23" stroke="#6EE7B7" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * Sparkle Burst Decoration (Near Featured Chat Preview)
 */
export const ChatSparkleBurst: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 text-emerald-400' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="19.07" y1="4.93" x2="16.24" y2="7.76" />
    <line x1="22" y1="12" x2="18" y2="12" />
  </svg>
);

/**
 * Minimal User Profile Avatar
 */
export const UserAvatar: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <div className={`rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white text-[10px] font-semibold shrink-0 shadow-sm ${className}`}>
    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
  </div>
);

/**
 * Minimal AI Assistant Avatar
 */
export const AiAssistantAvatar: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <div className={`rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-sm ${className}`}>
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  </div>
);

