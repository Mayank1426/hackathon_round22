import React, { useState, useEffect } from 'react';
import { Home, Compass, Code, Trophy, CreditCard, Flame, BookOpen, ChevronUp, Calculator } from 'lucide-react';

const sections = [
  { id: 'home',          label: 'Home',       icon: Home },
  { id: 'calculator',    label: 'Quiz',       icon: Calculator },
  { id: 'explore',       label: 'Explore',    icon: Compass },
  { id: 'question-bank', label: 'Q-Bank',     icon: Code },
  { id: 'leaderboard',   label: 'Ranks',      icon: Trophy },
  { id: 'pricing',       label: 'Pricing',    icon: CreditCard },
  { id: 'daily',         label: 'Daily',      icon: Flame },
  { id: 'faq',           label: 'FAQ',        icon: BookOpen },
];

export default function FloatingNav() {
  const [scrollPct, setScrollPct] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollPct(pct);
      setVisible(window.scrollY > 300);

      // Detect active section
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveSection(s.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setExpanded(false);
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const circumference = 2 * Math.PI * 18;

  return (
    <div
      className={`fixed right-5 bottom-6 z-[150] flex flex-col items-center gap-2 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      {/* Section Pills — expanded */}
      {expanded && (
        <div className="flex flex-col items-end gap-1.5 mb-1 animate-floatnav">
          {sections.map((s) => {
            const Icon = s.icon;
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                title={s.label}
                className={`flex items-center gap-2 pl-3 pr-3 py-2 rounded-full text-xs font-bold shadow-md transition-all duration-200 border ${
                  isActive
                    ? 'bg-purple-600 text-white border-purple-700 scale-105 shadow-purple-glow'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Toggle Button with Circular Progress */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="relative w-12 h-12 rounded-full bg-white border-2 border-slate-200 shadow-xl flex items-center justify-center hover:border-purple-400 hover:shadow-purple-glow transition-all group"
        title="Quick Navigation"
        aria-label="Quick Navigation"
      >
        {/* SVG Circular Progress */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
          <circle
            cx="20" cy="20" r="18"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="2.5"
          />
          <circle
            cx="20" cy="20" r="18"
            fill="none"
            stroke="#7928CA"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * scrollPct) / 100}
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
          />
        </svg>
        {/* Icon in the center */}
        <span className="relative z-10 text-purple-600 group-hover:text-purple-800 transition-colors">
          {expanded ? (
            <span className="text-xs font-black text-purple-700">✕</span>
          ) : (
            <span className="text-[10px] font-black text-purple-700">{Math.round(scrollPct)}%</span>
          )}
        </span>
      </button>

      {/* Scroll to top */}
      <button
        onClick={scrollTop}
        className="w-8 h-8 rounded-full bg-dk-yellow border border-amber-300 shadow-md flex items-center justify-center hover:scale-110 transition-transform"
        title="Scroll to top"
      >
        <ChevronUp className="w-4 h-4 text-slate-950" />
      </button>
    </div>
  );
}
