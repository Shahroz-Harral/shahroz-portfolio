import React, { useState } from 'react';

interface AriaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'aria';
  text: string;
}

export const AriaDrawer: React.FC<AriaDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'aria',
      text: "Hello! I'm Aria, Shahroz's AI Architecture Advisor. What type of AI system or automation are you looking to build for your business?",
    },
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;
    const trimmed = userText.trim();

    // Append user message
    setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);
    setInputVal('');

    // Formulate intelligent reply
    setTimeout(() => {
      const lower = trimmed.toLowerCase();
      let reply =
        "That's a fantastic inquiry! Shahroz specializes in practical, business-ready AI with zero tech jargon. Let's arrange a 15-minute discovery call or connect directly on WhatsApp (+92 334 9791008) so we can map out your tailored architecture.";

      if (
        lower.includes('appointment') ||
        lower.includes('booking') ||
        lower.includes('calendar') ||
        lower.includes('slot')
      ) {
        reply =
          'Our AI Assistants & Chatbots connect directly with Google Calendar, Outlook, and Calendly. When a prospect engages after-hours, the assistant qualifies their intent, checks real-time availability, and books the appointment automatically.';
      } else if (
        lower.includes('voice') ||
        lower.includes('phone') ||
        lower.includes('call') ||
        lower.includes('receptionist')
      ) {
        reply =
          'AI Phone Call Agents answer incoming business calls 24/7 with human-quality tone. They screen callers, capture lead details, answer common FAQs, and sync notes straight to your CRM.';
      } else if (
        lower.includes('invoice') ||
        lower.includes('finance') ||
        lower.includes('quickbooks') ||
        lower.includes('xero')
      ) {
        reply =
          'Our Finance Automation extracts invoice records, reconciles bank/ledger entries, and syncs line items with QuickBooks or Xero, eliminating repetitive administrative bookkeeping.';
      } else if (
        lower.includes('price') ||
        lower.includes('cost') ||
        lower.includes('turnaround') ||
        lower.includes('timeline')
      ) {
        reply =
          'Most custom chatbots, voice engines, and automation workflows are scoped and deployed in 1 to 3 weeks with full staff training included.';
      }

      setMessages((prev) => [...prev, { sender: 'aria', text: reply }]);
    }, 400);
  };

  const quickPrompts = [
    'How do chatbots book appointments?',
    'Can voice agents handle phone calls?',
    'How long does implementation take?',
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white/95 backdrop-blur-2xl border-l border-black/[0.08] shadow-2xl z-50 flex flex-col justify-between animate-in slide-in-from-right duration-300"
        aria-label="Aria AI Architecture Advisor"
      >
        {/* Header */}
        <div className="p-5 border-b border-black/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#111916] text-white font-bold flex items-center justify-center text-xs shadow-xs">
              A
            </div>
            <div>
              <div className="font-bold text-sm text-[#111916]">Aria AI Advisor</div>
              <div className="text-[10px] font-mono text-emerald-700 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Architecture Intelligence
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
            aria-label="Close Aria Advisor"
          >
            ✕
          </button>
        </div>

        {/* Message Container */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
          {messages.map((msg, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <div
                className={`w-6 h-6 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                  msg.sender === 'user' ? 'bg-[#111916]' : 'bg-emerald-600'
                }`}
              >
                {msg.sender === 'user' ? 'U' : 'A'}
              </div>
              <div
                className={`p-3 rounded-2xl leading-relaxed max-w-[85%] ${
                  msg.sender === 'user'
                    ? 'bg-white border border-black/[0.08] rounded-tr-xs text-[#111916]'
                    : 'bg-[#E5F8EE] border border-emerald-500/15 rounded-tl-xs text-[#111916]'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Prompts */}
        <div className="px-5 py-2.5 border-t border-black/[0.04] bg-[#FAFCFA]">
          <div className="text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-wider">
            Quick Prompts:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(prompt)}
                className="text-[11px] py-1 px-2.5 rounded-full bg-white border border-black/[0.08] hover:border-emerald-500 text-gray-700 hover:text-black transition-all cursor-pointer text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="p-4 border-t border-black/[0.06] bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about AI chatbots, voice agents, workflows..."
              className="flex-1 bg-black/[0.03] border border-black/[0.08] rounded-full px-4 py-2 text-xs text-[#111916] placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-[#111916] text-white flex items-center justify-center shrink-0 hover:bg-emerald-900 transition-colors text-xs font-bold"
            >
              ↑
            </button>
          </form>
          <div className="mt-2 text-center text-[10px] text-gray-400">
            Direct WhatsApp Handoff: <a href="https://wa.me/923349791008" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-medium">+92 334 9791008</a>
          </div>
        </div>
      </aside>
    </>
  );
};
