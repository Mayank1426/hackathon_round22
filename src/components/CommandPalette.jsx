import React, { useState, useEffect, useRef } from 'react';
import {
  Search, X, Compass, Code, Trophy, CreditCard,
  Building2, ShieldCheck, ArrowUpRight, BookOpen,
  Flame, Brain, Sparkles, LayoutGrid, Calculator
} from 'lucide-react';
import BrandLogo from './BrandLogo';

const items = [
  { id: 'hero',       label: 'Home',                desc: 'Back to top',               icon: Sparkles,   href: '#home',         category: 'Navigate' },
  { id: 'calc',       label: 'Readiness Quiz',      desc: 'Calculate placement score',  icon: Calculator, href: '#calculator',   category: 'Tools' },
  { id: 'explore',    label: 'Explore Practice',    desc: 'Browse practice categories', icon: Compass,    href: '#explore',      category: 'Navigate' },
  { id: 'qbank',      label: 'Question Bank',       desc: 'Filter & solve questions',   icon: Code,       href: '#question-bank',category: 'Navigate' },
  { id: 'leader',     label: 'Leaderboard',         desc: 'Campus XP rankings',         icon: Trophy,     href: '#leaderboard',  category: 'Navigate' },
  { id: 'pricing',    label: 'Pricing',             desc: 'Plans and scholarship',      icon: CreditCard, href: '#pricing',      category: 'Navigate' },
  { id: 'colleges',   label: 'For Colleges',        desc: 'Placement team dashboard',   icon: Building2,  href: '#institutions', category: 'Navigate' },
  { id: 'security',   label: 'Integrity Console',   desc: 'AI proctoring features',     icon: ShieldCheck,href: '#security',     category: 'Navigate' },
  { id: 'dest',       label: 'Find My Path',        desc: 'Practice destination finder',icon: LayoutGrid, href: '#destination',  category: 'Navigate' },
  { id: 'daily',      label: 'Daily Routine',       desc: 'Today\'s checklist & XP',    icon: Flame,      href: '#daily',        category: 'Navigate' },
  { id: 'mind',       label: 'Mind Everywhere',     desc: 'Interview anxiety? We\'ve got you', icon: Brain, href: '#mind',      category: 'Navigate' },
  { id: 'faq',        label: 'FAQ',                 desc: 'Common questions answered',  icon: BookOpen,   href: '#faq',          category: 'Navigate' },
];

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const [selected, setSelected] = useState(0);

  const filtered = items.filter(
    (it) =>
      it.label.toLowerCase().includes(query.toLowerCase()) ||
      it.desc.toLowerCase().includes(query.toLowerCase()) ||
      it.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') setSelected((s) => Math.min(s + 1, filtered.length - 1));
      if (e.key === 'ArrowUp') setSelected((s) => Math.max(s - 1, 0));
      if (e.key === 'Enter') {
        const item = filtered[selected];
        if (item) {
          navigate(item.href);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, filtered, selected]);

  const navigate = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4"
      style={{ background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-cmdpalette"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input with Brand Badge */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100">
          <BrandLogo variant="badge" size="sm" href={null} />
          <Search className="w-4 h-4 text-purple-600 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
            placeholder="Search sections, features, questions…"
            className="flex-1 text-sm text-slate-900 placeholder-slate-400 bg-transparent outline-none font-medium"
          />
          <div className="flex items-center gap-1">
            <kbd className="text-[10px] font-mono bg-slate-100 border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded">ESC</kbd>
            <button onClick={onClose} className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-sm font-mono">No results found</div>
          )}
          {filtered.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.href)}
                onMouseEnter={() => setSelected(idx)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all group ${
                  selected === idx ? 'bg-purple-50 text-purple-900' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                  selected === idx ? 'bg-purple-600 text-white' : 'bg-slate-100 text-purple-600'
                }`}>
                  <Icon className="w-4 h-4" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-semibold leading-tight">{item.label}</span>
                  <span className={`block text-[11px] font-mono truncate mt-0.5 ${selected === idx ? 'text-purple-600' : 'text-slate-400'}`}>
                    {item.desc}
                  </span>
                </span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                  selected === idx ? 'bg-purple-100 text-purple-600 border-purple-200' : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}>
                  {item.category}
                </span>
                <ArrowUpRight className={`w-3.5 h-3.5 flex-shrink-0 ${selected === idx ? 'text-purple-500' : 'text-slate-300'}`} />
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>
            <kbd className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded mr-1">↑↓</kbd> navigate
            <kbd className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded mx-1">↵</kbd> jump
          </span>
          <span className="text-purple-600 font-bold">DKoder Command</span>
        </div>
      </div>
    </div>
  );
}
