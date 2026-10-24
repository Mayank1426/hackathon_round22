import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-dk-yellow via-amber-400 to-dk-yellow text-dk-dark-950 text-xs md:text-sm font-semibold tracking-wider py-2 px-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2 mx-auto md:mx-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dk-dark-950 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-dk-dark-950"></span>
        </span>
        <span className="font-extrabold uppercase tracking-widest text-[11px] md:text-xs">
          Placement Prep, With A Plan
        </span>
        <span className="hidden sm:inline-block text-dk-dark-950/70 font-normal">
          — Stop the random grind. Focus on the round ahead.
        </span>
      </div>

      <a
        href="#institutions"
        className="hidden md:flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-dk-dark-950 text-dk-yellow px-2.5 py-0.5 rounded-full hover:bg-black transition-colors"
      >
        Built for Students + Campus Teams
        <ArrowUpRight className="w-3 h-3" />
      </a>
    </div>
  );
}
