import React, { useState } from 'react';
import {
  MetaInfinityIcon,
  VoiceAgentWaveformIcon,
  WorkflowAutomationIcon,
  FinanceAutomationIcon,
  DashboardInsightsIcon,
  WebsitesSoftwareIcon,
  ChatSparkleBurst,
  UserAvatar,
  AiAssistantAvatar,
} from './ServicesBentoIcons';

export const ServicesBentoGrid: React.FC = () => {
  // Interactive state for the Featured Chatbot Demonstration
  const [booked, setBooked] = useState(false);

  return (
    <section className="relative w-full pb-20 md:pb-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Responsive Asymmetric Bento Grid (4 Columns Desktop, 2 Columns Tablet, 1 Column Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* ================================================================= */}
          {/* SERVICE 01 — FEATURED: AI ASSISTANTS & CHATBOTS                   */}
          {/* Spans 2 Columns on Desktop & Tablet                                */}
          {/* ================================================================= */}
          <div className="md:col-span-2 lg:col-span-2 bg-[#FFFFFF] rounded-[24px] p-6 sm:p-8 border border-[#E3ECE7] shadow-sm hover:shadow-md hover:border-emerald-400/40 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden">
            {/* Subtle background gradient for featured card */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-50/60 via-[#E5F8EE]/30 to-transparent rounded-bl-full pointer-events-none" />

            {/* Sparkle burst decoration on top right */}
            <div className="absolute top-7 right-7 pointer-events-none opacity-80 group-hover:scale-110 transition-transform duration-300">
              <ChatSparkleBurst className="w-7 h-7 text-emerald-500" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center z-10">
              {/* Left Column: Text & CTA */}
              <div className="flex flex-col justify-between h-full">
                <div>
                  {/* Featured Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E5F8EE] border border-emerald-500/20 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-semibold text-emerald-800 tracking-wide">
                      Featured
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111916] tracking-tight mb-3 font-sans">
                    AI assistants &amp; chatbots
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#6C7775] leading-relaxed mb-6">
                    Answer questions, capture leads and book appointments across your website and messaging.
                  </p>
                </div>

                {/* Explore Service CTA */}
                <a
                  href="https://wa.me/923349791008?text=Hi%20Shahroz,%20I'd%20like%20to%20explore%20AI%20Assistants%20%26%20Chatbots%20for%20my%20business"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111916] group-hover:text-emerald-700 transition-colors w-fit pt-2"
                >
                  <span>Explore service</span>
                  <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </div>

              {/* Right Column: Visual Chat Demonstration */}
              <div className="relative bg-[#FAFCFA] border border-[#E3ECE7] rounded-2xl p-4 shadow-sm">
                <div className="space-y-3">
                  {/* Customer Question Bubble */}
                  <div className="flex items-start gap-2.5">
                    <UserAvatar className="w-6 h-6 mt-0.5" />
                    <div className="bg-white border border-[#E3ECE7] px-3 py-2 rounded-xl rounded-tl-sm text-xs text-[#111916] shadow-2xs leading-snug">
                      Can you help me book an appointment?
                    </div>
                  </div>

                  {/* Assistant Reply Bubble */}
                  <div className="flex items-start gap-2.5">
                    <AiAssistantAvatar className="w-6 h-6 mt-0.5" />
                    <div className="bg-[#E5F8EE] border border-emerald-500/15 px-3 py-2 rounded-xl rounded-tl-sm text-xs text-[#111916] leading-snug">
                      Of course! Here are the available slots:
                    </div>
                  </div>

                  {/* Appointment Slot Preview Card */}
                  <div className="ml-8 bg-white border border-[#E3ECE7] rounded-xl p-2.5 flex items-center justify-between text-xs text-[#111916]">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600">📅</span>
                      <span className="font-medium text-[11px] sm:text-xs">Tomorrow, 10:00 AM</span>
                    </div>
                  </div>

                  {/* Interactive Booking Confirmation Button */}
                  <div className="ml-8">
                    <button
                      type="button"
                      onClick={() => setBooked(!booked)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm ${
                        booked
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-[#19B77A] text-white hover:bg-emerald-600 active:scale-[0.98]'
                      }`}
                    >
                      {booked ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                          <span>Appointment booked ✓</span>
                        </>
                      ) : (
                        <span>Book Appointment</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* SERVICE 02 — META MESSAGING BOTS                                  */}
          {/* ================================================================= */}
          <div className="bg-[#FFFFFF] rounded-[24px] p-6 sm:p-7 border border-[#E3ECE7] shadow-sm hover:shadow-md hover:border-emerald-400/40 transition-all duration-300 relative group flex flex-col justify-between">
            <div>
              <div className="mb-5 transition-transform duration-300 group-hover:scale-105 w-fit">
                <MetaInfinityIcon className="w-9 h-9" />
              </div>
              <h3 className="text-lg font-bold text-[#111916] tracking-tight mb-2 font-sans">
                Meta messaging bots
              </h3>
              <p className="text-xs sm:text-sm text-[#6C7775] leading-relaxed mb-6">
                Facebook, Instagram and WhatsApp conversations.
              </p>
            </div>

            <a
              href="https://wa.me/923349791008?text=Hi%20Shahroz,%20I'd%20like%20to%20explore%20Meta%20Messaging%20Bots"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111916] group-hover:text-emerald-700 transition-colors w-fit pt-2"
            >
              <span>Explore service</span>
              <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* ================================================================= */}
          {/* SERVICE 03 — AI VOICE AGENTS                                      */}
          {/* ================================================================= */}
          <div className="bg-[#FFFFFF] rounded-[24px] p-6 sm:p-7 border border-[#E3ECE7] shadow-sm hover:shadow-md hover:border-emerald-400/40 transition-all duration-300 relative group flex flex-col justify-between">
            <div>
              <div className="mb-5 transition-transform duration-300 group-hover:scale-105 w-fit">
                <VoiceAgentWaveformIcon className="w-9 h-9" />
              </div>
              <h3 className="text-lg font-bold text-[#111916] tracking-tight mb-2 font-sans">
                AI voice agents
              </h3>
              <p className="text-xs sm:text-sm text-[#6C7775] leading-relaxed mb-6">
                Incoming calls, enquiry qualification.
              </p>
            </div>

            <a
              href="https://wa.me/923349791008?text=Hi%20Shahroz,%20I'd%20like%20to%20explore%20AI%20Voice%20Agents"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111916] group-hover:text-emerald-700 transition-colors w-fit pt-2"
            >
              <span>Explore service</span>
              <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* ================================================================= */}
          {/* SERVICE 04 — WORKFLOW AUTOMATION                                 */}
          {/* ================================================================= */}
          <div className="bg-[#FFFFFF] rounded-[24px] p-6 sm:p-7 border border-[#E3ECE7] shadow-sm hover:shadow-md hover:border-emerald-400/40 transition-all duration-300 relative group flex flex-col justify-between">
            <div>
              <div className="mb-5 transition-transform duration-300 group-hover:scale-105 w-fit">
                <WorkflowAutomationIcon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#111916] tracking-tight mb-2 font-sans">
                Workflow automation
              </h3>
              <p className="text-xs sm:text-sm text-[#6C7775] leading-relaxed mb-6">
                Connect apps and remove repetitive tasks.
              </p>
            </div>

            <a
              href="https://wa.me/923349791008?text=Hi%20Shahroz,%20I'd%20like%20to%20explore%20Workflow%20Automation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111916] group-hover:text-emerald-700 transition-colors w-fit pt-2"
            >
              <span>Explore service</span>
              <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* ================================================================= */}
          {/* SERVICE 05 — FINANCE AUTOMATION                                  */}
          {/* ================================================================= */}
          <div className="bg-[#FFFFFF] rounded-[24px] p-6 sm:p-7 border border-[#E3ECE7] shadow-sm hover:shadow-md hover:border-emerald-400/40 transition-all duration-300 relative group flex flex-col justify-between">
            <div>
              <div className="mb-5 transition-transform duration-300 group-hover:scale-105 w-fit">
                <FinanceAutomationIcon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#111916] tracking-tight mb-2 font-sans">
                Finance automation
              </h3>
              <p className="text-xs sm:text-sm text-[#6C7775] leading-relaxed mb-6">
                Invoicing, payment reminders.
              </p>
            </div>

            <a
              href="https://wa.me/923349791008?text=Hi%20Shahroz,%20I'd%20like%20to%20explore%20Finance%20Automation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111916] group-hover:text-emerald-700 transition-colors w-fit pt-2"
            >
              <span>Explore service</span>
              <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* ================================================================= */}
          {/* SERVICE 06 — DASHBOARDS & DATA INSIGHTS                          */}
          {/* ================================================================= */}
          <div className="bg-[#FFFFFF] rounded-[24px] p-6 sm:p-7 border border-[#E3ECE7] shadow-sm hover:shadow-md hover:border-emerald-400/40 transition-all duration-300 relative group flex flex-col justify-between">
            <div>
              <div className="mb-5 transition-transform duration-300 group-hover:scale-105 w-fit">
                <DashboardInsightsIcon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#111916] tracking-tight mb-2 font-sans">
                Dashboards &amp; data insights
              </h3>
              <p className="text-xs sm:text-sm text-[#6C7775] leading-relaxed mb-6">
                Understand your business with data.
              </p>
            </div>

            <a
              href="https://wa.me/923349791008?text=Hi%20Shahroz,%20I'd%20like%20to%20explore%20Dashboards%20%26%20Data%20Insights"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111916] group-hover:text-emerald-700 transition-colors w-fit pt-2"
            >
              <span>Explore service</span>
              <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* ================================================================= */}
          {/* SERVICE 07 — WEBSITES & CUSTOM SOFTWARE                          */}
          {/* ================================================================= */}
          <div className="bg-[#FFFFFF] rounded-[24px] p-6 sm:p-7 border border-[#E3ECE7] shadow-sm hover:shadow-md hover:border-emerald-400/40 transition-all duration-300 relative group flex flex-col justify-between">
            <div>
              <div className="mb-5 transition-transform duration-300 group-hover:scale-105 w-fit">
                <WebsitesSoftwareIcon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#111916] tracking-tight mb-2 font-sans">
                Websites &amp; custom software
              </h3>
              <p className="text-xs sm:text-sm text-[#6C7775] leading-relaxed mb-6">
                Modern websites and digital tools.
              </p>
            </div>

            <a
              href="https://wa.me/923349791008?text=Hi%20Shahroz,%20I'd%20like%20to%20explore%20Websites%20%26%20Custom%20Software"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111916] group-hover:text-emerald-700 transition-colors w-fit pt-2"
            >
              <span>Explore service</span>
              <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

