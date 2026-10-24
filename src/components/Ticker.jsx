import React, { useMemo } from 'react';
import { 
  Briefcase, Zap, Code2, Trophy, TrendingUp, Target, 
  MapPin, ShieldCheck, Layers 
} from 'lucide-react';

export default function Ticker() {
  const baseItems = useMemo(() => [
    { label: 'Company-Wise Prep', icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Aptitude & Reasoning', icon: Zap, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Coding Practice & IDE', icon: Code2, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Campus Leaderboards', icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Placement Insights', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Mock Technical Rounds', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'National Placement Map', icon: MapPin, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Secure Assessment Audit', icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'System Design Essentials', icon: Layers, color: 'text-purple-700', bg: 'bg-purple-50' },
  ], []);

  // Repeat items 3 times inside each track so each track is ~6,000px wide.
  // This guarantees there is NEVER an empty gap or discontinuity on any screen resolution (including 4K/Ultrawide).
  const trackItems = useMemo(() => [
    ...baseItems,
    ...baseItems,
    ...baseItems,
  ], [baseItems]);

  const renderTrack = (trackKey) => (
    <div 
      key={trackKey}
      className="flex shrink-0 animate-smooth-marquee items-center gap-6 py-1 pr-6 flex-nowrap"
      aria-hidden={trackKey !== 'track-1'}
    >
      {trackItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <React.Fragment key={`${trackKey}-${idx}`}>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xs hover:border-purple-300 hover:shadow-sm hover:scale-105 transition-all duration-200 cursor-default select-none whitespace-nowrap shrink-0 group">
              <span className={`w-5 h-5 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-3 h-3 ${item.color}`} />
              </span>
              <span className="text-[11px] sm:text-xs font-bold tracking-wider text-slate-800 uppercase group-hover:text-purple-700 transition-colors">
                {item.label}
              </span>
            </div>
            {/* Glowing amber star separator */}
            <span className="text-amber-400 text-xs shrink-0 select-none animate-pulse">
              ✦
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div 
      className="relative border-y border-purple-100/80 bg-gradient-to-r from-amber-50/90 via-purple-50/70 to-amber-50/90 py-2.5 overflow-hidden select-none shadow-xs"
      title="Platform Pillars — Continuous Practice Highlights"
    >
      {/* Edge Fade Mask for Buttery Smooth In/Out Transition */}
      <div className="marquee-wrapper flex overflow-hidden marquee-fade-mask w-full">
        {renderTrack('track-1')}
        {renderTrack('track-2')}
      </div>
    </div>
  );
}
