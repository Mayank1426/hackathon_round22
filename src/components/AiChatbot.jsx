import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, Sparkles, RotateCcw, ChevronDown, Zap, MessageCircle } from 'lucide-react';

/* ─── inline keyframes (injected once) ─── */
const STYLE_ID = 'ai-chatbot-animations';
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    /* ---- FAB orbit ring ---- */
    @keyframes cb-orbit {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes cb-orbit-reverse {
      0%   { transform: rotate(360deg); }
      100% { transform: rotate(0deg); }
    }
    /* ---- Glow pulse ---- */
    @keyframes cb-glow-pulse {
      0%, 100% { box-shadow: 0 0 15px rgba(121,40,202,0.4), 0 0 30px rgba(121,40,202,0.15); }
      50%      { box-shadow: 0 0 25px rgba(121,40,202,0.7), 0 0 50px rgba(121,40,202,0.3); }
    }
    /* ---- Chat panel entrance ---- */
    @keyframes cb-panel-in {
      0%   { opacity: 0; transform: scale(0.8) translateY(20px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes cb-panel-out {
      0%   { opacity: 1; transform: scale(1) translateY(0); }
      100% { opacity: 0; transform: scale(0.8) translateY(20px); }
    }
    /* ---- Message slide-in ---- */
    @keyframes cb-msg-in {
      0%   { opacity: 0; transform: translateY(12px) scale(0.96); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    /* ---- Typing dots ---- */
    @keyframes cb-dot {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
      40%           { transform: scale(1.1); opacity: 1; }
    }
    /* ---- Quick prompt shimmer ---- */
    @keyframes cb-shimmer {
      0%   { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    /* ---- Float label bob ---- */
    @keyframes cb-label-bob {
      0%, 100% { transform: translateY(0px); }
      50%      { transform: translateY(-4px); }
    }
    /* ---- Header particles ---- */
    @keyframes cb-particle {
      0%   { transform: translateY(0) scale(1); opacity: 0.6; }
      100% { transform: translateY(-28px) scale(0); opacity: 0; }
    }
    /* ---- Sparkle rotate ---- */
    @keyframes cb-sparkle-spin {
      0%   { transform: rotate(0deg) scale(1); }
      50%  { transform: rotate(180deg) scale(1.2); }
      100% { transform: rotate(360deg) scale(1); }
    }
    /* ---- Gradient border ---- */
    @keyframes cb-border-flow {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    /* ---- FAB wiggle ---- */
    @keyframes cb-wiggle {
      0%, 100% { transform: rotate(0deg); }
      15%      { transform: rotate(-8deg); }
      30%      { transform: rotate(6deg); }
      45%      { transform: rotate(-4deg); }
      60%      { transform: rotate(2deg); }
      75%      { transform: rotate(0deg); }
    }

    .cb-scrollbar::-webkit-scrollbar { width: 4px; }
    .cb-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .cb-scrollbar::-webkit-scrollbar-thumb { background: rgba(121,40,202,0.2); border-radius: 999px; }
    .cb-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(121,40,202,0.4); }
  `;
  document.head.appendChild(style);
}

const QUICK_PROMPTS = [
  { label: '🎯 TCS NQT roadmap', query: 'Give me a 30-day roadmap for TCS NQT prep', icon: '🎯' },
  { label: '🚀 Infosys SP prep', query: 'How do I crack Infosys SP role?', icon: '🚀' },
  { label: '📝 DIIPT exam tips', query: 'What topics are most important for DIIPT exam?', icon: '📝' },
  { label: '💰 12 LPA target', query: 'How to target 12 LPA package role?', icon: '💰' },
  { label: '⚡ Coding in 7 days', query: 'Quick 7-day coding revision plan', icon: '⚡' },
];

const FOLLOW_UP = [
  '📋 Show similar questions',
  '🧩 Give me a practice set',
  '💡 Explain the concept',
  '📄 Give a cheat‑sheet',
];

const BOT_RESPONSES = [
  (q) => `Great question! For "${q}" — here's your focused plan:\n\n✅ Week 1: Build fundamentals (Arrays, Strings, Sorting)\n✅ Week 2: Company-specific MCQ patterns\n✅ Week 3: Mock rounds under real time pressure\n✅ Week 4: Review weaknesses & simulate test day\n\nStart with the Question Bank → filter by your target company!`,
  (q) => `For "${q}", the key insight is: *targeted beats random*.\n\n🎯 Filter by company + package in the Practice Finder\n📊 Track daily XP on your Routine board\n🧠 Use the MindEverywhere tool when you feel stuck\n\nWant me to generate a specific question set?`,
  (q) => `Analyzing "${q}" from recent placement patterns...\n\n📌 Top asked topics: DSA (40%), Aptitude (35%), Verbal (25%)\n🔥 Hot companies right now: TCS, Infosys, Cognizant\n💡 Pro tip: 20 minutes daily > 3 hour weekend cramming\n\nCheck the Leaderboard to see where you stand!`,
];

export default function AiChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hey there! 👋 I'm your **DKoder AI Guide**\n\nTell me your target company & role — I'll map a focused prep route for you!",
      time: 'Just now',
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [hasNewMsg, setHasNewMsg] = useState(false);
  const [pulse, setPulse] = useState(true);
  const [showLabel, setShowLabel] = useState(true);
  const [panelAnim, setPanelAnim] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setHasNewMsg(false);
      setPulse(false);
      setPanelAnim('open');
      setTimeout(() => inputRef.current?.focus(), 200);
    } else if (panelAnim === 'open') {
      setPanelAnim('closing');
      setTimeout(() => setPanelAnim(''), 250);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Initial pulse & label auto-hide
  useEffect(() => {
    const t1 = setTimeout(() => setPulse(false), 8000);
    const t2 = setTimeout(() => setShowLabel(false), 10000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user', text: text.trim(), time: 'just now' };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const resp = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)](text.trim());
      setMessages((m) => [...m, { role: 'bot', text: resp, time: 'DKoder AI' }]);
      setTyping(false);
      if (!open) setHasNewMsg(true);
    }, 1400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'bot',
        text: "Hey there! 👋 I'm your **DKoder AI Guide**\n\nTell me your target company & role — I'll map a focused prep route for you!",
        time: 'Just now',
      },
    ]);
  };

  const toggleOpen = () => setOpen((o) => !o);

  /* ─── render helpers ─── */
  const renderBoldText = (text) => {
    // Simple bold: **text** → <strong>text</strong>
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i} className="font-bold text-purple-700">{part}</strong> : part
    );
  };

  return (
    <>
      {/* ══════════ CHAT PANEL ══════════ */}
      <div
        className={`fixed bottom-24 right-5 z-[160] w-[360px] sm:w-[400px] flex flex-col rounded-3xl overflow-hidden ${
          open
            ? 'pointer-events-auto'
            : panelAnim === 'closing'
            ? 'pointer-events-none'
            : 'pointer-events-none opacity-0'
        }`}
        style={{
          maxHeight: '560px',
          animation: open
            ? 'cb-panel-in 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards'
            : panelAnim === 'closing'
            ? 'cb-panel-out 0.25s ease-in forwards'
            : 'none',
          boxShadow: '0 20px 60px -15px rgba(121,40,202,0.35), 0 10px 20px -10px rgba(0,0,0,0.15)',
          transformOrigin: 'bottom right',
        }}
      >
        {/* Animated gradient border wrapper */}
        <div
          className="p-[1.5px] rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, #7928CA, #FFD83D, #9E5CF6, #7928CA)',
            backgroundSize: '300% 300%',
            animation: 'cb-border-flow 4s ease infinite',
          }}
        >
          <div className="rounded-3xl overflow-hidden bg-white flex flex-col" style={{ maxHeight: '557px' }}>
            {/* ──── Header ──── */}
            <div className="relative px-4 py-3.5 text-white overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #7928CA 0%, #571B96 50%, #7928CA 100%)',
                backgroundSize: '200% 200%',
                animation: 'cb-border-flow 6s ease infinite',
              }}
            >
              {/* Floating header particles */}
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="absolute rounded-full bg-white/20"
                  style={{
                    width: 3 + Math.random() * 4 + 'px',
                    height: 3 + Math.random() * 4 + 'px',
                    left: 15 + i * 20 + '%',
                    bottom: '4px',
                    animation: `cb-particle ${2 + Math.random() * 2}s ease-in-out infinite`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}

              <div className="flex items-center gap-3 relative z-10">
                {/* Avatar */}
                <div className="relative group/avatar">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center border border-white/20 overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <img
                      src="/chatbot-icon.svg"
                      className="w-6 h-6 transition-transform group-hover/avatar:scale-110"
                      alt="AI Guide"
                      style={{ animation: 'cb-sparkle-spin 8s linear infinite' }}
                    />
                  </div>
                  {/* Online dot with ring */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-purple-700">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-40" />
                  </span>
                </div>

                {/* Title */}
                <div className="flex-1">
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    DKoder AI Guide
                    <span
                      className="inline-flex items-center gap-0.5 text-[8px] font-bold uppercase tracking-wider bg-amber-400/90 text-purple-900 px-1.5 py-0.5 rounded-md"
                      style={{ lineHeight: 1 }}
                    >
                      <Zap className="w-2 h-2" /> PRO
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-purple-200 flex items-center gap-1.5 mt-0.5">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                      Online
                    </span>
                    <span className="text-purple-400">·</span>
                    <span>Placement Expert</span>
                    <span className="text-purple-400">·</span>
                    <span className="text-amber-300">⚡ Instant</span>
                  </div>
                </div>

                {/* Header actions */}
                <button
                  onClick={handleReset}
                  title="Reset chat"
                  className="p-2 rounded-xl hover:bg-white/10 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-purple-200" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-xl hover:bg-white/10 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ──── Quick Prompts ──── */}
            <div className="flex gap-2 overflow-x-auto px-3 py-2.5 bg-gradient-to-r from-purple-50 via-white to-amber-50/30 border-b border-purple-100/50 scrollbar-none">
              {QUICK_PROMPTS.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => sendMessage(p.query)}
                  className="whitespace-nowrap text-[10px] font-semibold text-purple-700 bg-white border border-purple-200/60 px-3 py-1.5 rounded-full hover:bg-purple-50 hover:border-purple-400 hover:shadow-md hover:shadow-purple-100 transition-all duration-200 flex-shrink-0 hover:-translate-y-0.5 active:scale-95"
                  style={{
                    animation: open ? `cb-msg-in 0.3s ease-out ${0.15 + i * 0.06}s both` : 'none',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* ──── Messages ──── */}
            <div
              className="flex-1 overflow-y-auto p-3.5 space-y-3.5 cb-scrollbar"
              style={{
                minHeight: '240px',
                maxHeight: '300px',
                background: 'linear-gradient(180deg, rgba(243,237,255,0.5) 0%, #fff 40%, rgba(255,250,240,0.3) 100%)',
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  style={{
                    animation: `cb-msg-in 0.35s ease-out ${Math.min(i * 0.08, 0.4)}s both`,
                  }}
                >
                  {/* Bot avatar row */}
                  {msg.role === 'bot' && (
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-sm">
                        <Sparkles className="w-3 h-3 text-white" style={{ animation: 'cb-sparkle-spin 4s linear infinite' }} />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 font-medium">DKoder AI</span>
                    </div>
                  )}

                  {/* Bubble */}
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line transition-all duration-200 ${
                      msg.role === 'user'
                        ? 'rounded-2xl rounded-tr-sm text-white shadow-md shadow-purple-200/40'
                        : 'rounded-2xl rounded-tl-sm border border-slate-200/70 text-slate-700 shadow-sm hover:shadow-md hover:shadow-purple-50'
                    }`}
                    style={
                      msg.role === 'user'
                        ? { background: 'linear-gradient(135deg, #7928CA, #571B96)' }
                        : { background: 'linear-gradient(135deg, #fff, #faf8ff)' }
                    }
                  >
                    {msg.role === 'bot' ? renderBoldText(msg.text) : msg.text}
                  </div>

                  {/* Timestamp */}
                  <span className="text-[9px] font-mono text-slate-400/70 mt-1 px-1">{msg.time}</span>

                  {/* Follow-up chips after bot messages */}
                  {msg.role === 'bot' && i === messages.length - 1 && messages.length > 1 && (
                    <div
                      className="flex flex-wrap gap-1.5 mt-2"
                      style={{ animation: 'cb-msg-in 0.4s ease-out 0.3s both' }}
                    >
                      {FOLLOW_UP.map((s, fi) => (
                        <button
                          key={s}
                          onClick={() => sendMessage(s)}
                          className="text-[9px] font-semibold text-purple-600 bg-purple-50/80 border border-purple-200/50 rounded-full px-2.5 py-1 hover:bg-purple-100 hover:border-purple-300 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                          style={{ animationDelay: `${0.4 + fi * 0.06}s` }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex items-start gap-2" style={{ animation: 'cb-msg-in 0.3s ease-out both' }}>
                  <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
                    <Sparkles className="w-3 h-3 text-white" style={{ animation: 'cb-sparkle-spin 2s linear infinite' }} />
                  </div>
                  <div
                    className="rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5 border border-slate-200/70"
                    style={{ background: 'linear-gradient(135deg, #fff, #faf8ff)' }}
                  >
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, #7928CA, #9E5CF6)',
                          animation: `cb-dot 1.2s ease-in-out ${d * 0.15}s infinite`,
                        }}
                      />
                    ))}
                    <span className="text-[9px] font-mono text-purple-400 ml-1.5">thinking…</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* ──── Input ──── */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-3.5 py-3 border-t border-slate-100/80"
              style={{ background: 'linear-gradient(180deg, #fff, #faf8ff)' }}
            >
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about placements..."
                  className="w-full text-xs text-slate-800 placeholder-slate-400 bg-slate-50/80 border border-slate-200/60 rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200"
                />
                {input.trim() && (
                  <span
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-mono text-purple-400"
                    style={{ animation: 'cb-msg-in 0.2s ease-out both' }}
                  >
                    ↵
                  </span>
                )}
              </div>
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-9 h-9 rounded-xl text-white flex items-center justify-center transition-all duration-200 active:scale-90 flex-shrink-0 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-200/50 hover:-translate-y-0.5"
                style={{
                  background: input.trim()
                    ? 'linear-gradient(135deg, #7928CA, #571B96)'
                    : '#ccc',
                }}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* ── Powered by footer ── */}
            <div className="px-3 py-1.5 text-center border-t border-slate-100/50" style={{ background: '#faf8ff' }}>
              <span className="text-[8px] font-mono text-slate-400">
                Powered by <span className="text-purple-500 font-bold">DKoder AI</span> · Instant answers
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ FAB TRIGGER BUTTON ══════════ */}
      <button
        onClick={toggleOpen}
        aria-label="Open AI Chat"
        className="fixed bottom-6 right-6 z-[160] group"
        style={{ perspective: '500px' }}
      >
        {/* Outer glow ring */}
        {!open && (
          <span
            className="absolute -inset-2 rounded-full opacity-50"
            style={{
              background: 'radial-gradient(circle, rgba(121,40,202,0.3) 0%, transparent 70%)',
              animation: 'cb-glow-pulse 3s ease-in-out infinite',
            }}
          />
        )}

        {/* Orbit ring 1 */}
        {!open && pulse && (
          <span
            className="absolute -inset-3 rounded-full border border-purple-400/30 border-dashed"
            style={{ animation: 'cb-orbit 6s linear infinite' }}
          />
        )}
        {/* Orbit ring 2 */}
        {!open && pulse && (
          <span
            className="absolute -inset-5 rounded-full border border-purple-300/20 border-dotted"
            style={{ animation: 'cb-orbit-reverse 8s linear infinite' }}
          />
        )}

        {/* Ping rings */}
        {!open && pulse && (
          <>
            <span className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping" />
            <span
              className="absolute inset-0 rounded-full bg-purple-400/20 animate-ping"
              style={{ animationDelay: '0.4s' }}
            />
          </>
        )}

        {/* New message badge */}
        {hasNewMsg && !open && (
          <span
            className="absolute -top-1.5 -right-1 w-5 h-5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full border-2 border-white text-[8px] font-black text-white flex items-center justify-center z-10"
            style={{ animation: 'cb-label-bob 1s ease-in-out infinite' }}
          >
            1
          </span>
        )}

        {/* Main button */}
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 relative overflow-hidden ${
            open
              ? 'scale-90'
              : 'hover:scale-110 hover:shadow-neon-purple'
          }`}
          style={{
            background: open
              ? 'linear-gradient(135deg, #374151, #1f2937)'
              : 'linear-gradient(135deg, #9E5CF6, #7928CA, #571B96)',
            boxShadow: open
              ? '0 8px 20px rgba(0,0,0,0.3)'
              : '0 8px 30px -5px rgba(121,40,202,0.5)',
            animation: !open && pulse ? 'cb-wiggle 2s ease-in-out infinite' : 'none',
          }}
        >
          {/* Shimmer overlay */}
          {!open && (
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)',
                backgroundSize: '200% 100%',
                animation: 'cb-shimmer 3s linear infinite',
              }}
            />
          )}

          {open ? (
            <X className="w-5 h-5 text-white transition-transform duration-300" style={{ transform: 'rotate(90deg)' }} />
          ) : (
            <img
              src="/chatbot-icon.svg"
              className="w-8 h-8 relative z-10 transition-transform duration-300 group-hover:scale-110 rounded-full"
              alt="AI Guide"
            />
          )}
        </div>

        {/* Floating label */}
        {!open && showLabel && (
          <div
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-[11px] font-bold whitespace-nowrap pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, #7928CA, #571B96)',
              boxShadow: '0 4px 15px rgba(121,40,202,0.4)',
              animation: 'cb-label-bob 2s ease-in-out infinite',
            }}
          >
            <MessageCircle className="w-3 h-3" />
            Ask AI Guide
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-l-[#571B96]" />
          </div>
        )}

        {/* Hover tooltip (shows when label is hidden) */}
        {!open && !showLabel && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-xl">
            AI Guide
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-900" />
          </div>
        )}
      </button>
    </>
  );
}
