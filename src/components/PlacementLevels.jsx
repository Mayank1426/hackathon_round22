import React, { useState } from 'react';
import { placementLevels } from '../data/mockData';
import { MapPin, ArrowUpRight, CheckCircle2, Sparkles, Navigation } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function PlacementLevels({ onOpenLevelBrief, onToast }) {
  const [activeLevelId, setActiveLevelId] = useState(1);
  const current = placementLevels[activeLevelId];

  const handleSelectLevel = (lvl) => {
    setActiveLevelId(lvl);
    onToast(`Switched to Level 0${lvl}: ${placementLevels[lvl].city}`);
  };

  return (
    <section className="py-16 md:py-24 border-b border-purple-100/60 relative bg-gradient-to-b from-purple-50/40 via-amber-50/30 to-purple-50/30" id="placement-levels">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Copy */}
          <ScrollReveal animation="fade-up" className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-600 uppercase tracking-widest">
              <span className="w-4 h-0.5 bg-amber-500"></span>
              PLACEMENT LEVELS
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Now imagine seeing<br />
              <span className="text-gradient-purple">the whole batch.</span>
            </h2>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
              Make placement preparation feel like a guided journey. Students see their next target milestone; placement teams get a clearer view of cohort readiness.
            </p>

            <a
              href="#institutions"
              className="inline-flex items-center gap-2 bg-dk-yellow hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-sm border border-amber-300 transition-all"
            >
              Explore campus insights
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Level Stats 3-column box */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-center">
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-xl font-mono font-extrabold text-slate-900">05</div>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5 uppercase font-semibold">LEVELS</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-xl font-mono font-extrabold text-amber-600">90+</div>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5 uppercase font-semibold">CORE Qs*</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-xl font-mono font-extrabold text-purple-700">01</div>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5 uppercase font-semibold">STEP AT A TIME</div>
              </div>
            </div>

            <p className="text-[11px] font-mono text-slate-400">
              *Illustrative example from the supplied reference capture.
            </p>
          </ScrollReveal>

          {/* Right Map Card & Detail */}
          <ScrollReveal animation="scale" delay={120} className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 bg-white">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-purple-700" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  NATIONAL PLACEMENT MAP
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full">
                ACTIVE LEVEL: L0{current.level}
              </span>
            </div>

            {/* 5 City Interactive Nodes Bar */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto py-2 scrollbar-none">
              {[1, 2, 3, 4, 5].map((lvl) => {
                const nodeData = placementLevels[lvl];
                const isActive = activeLevelId === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => handleSelectLevel(lvl)}
                    className={`flex-1 min-w-[90px] p-2.5 rounded-xl border text-center transition-all ${
                      isActive
                        ? 'bg-dk-purple text-white border-purple-700 shadow-sm scale-105'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="font-mono text-xs font-extrabold block">
                      0{lvl}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider block font-bold truncate">
                      {nodeData.city}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Level Detail Box */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-widest">
                    {current.tag}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                    {current.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-lg leading-relaxed">
                    {current.description}
                  </p>
                </div>
                <span className="text-sm font-mono font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-xl shrink-0">
                  {current.xp}
                </span>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-lg font-mono font-bold text-slate-900">{current.coreQs}</div>
                  <div className="text-[9px] font-mono text-slate-500 uppercase font-semibold">CORE Qs</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-lg font-mono font-bold text-emerald-700">{current.clearRate}</div>
                  <div className="text-[9px] font-mono text-slate-500 uppercase font-semibold">CLEAR RATE</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-lg font-mono font-bold text-purple-700">{current.mappedQs}</div>
                  <div className="text-[9px] font-mono text-slate-500 uppercase font-semibold">MAPPED Qs</div>
                </div>
              </div>

              {/* Recruiters tags */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                  TARGET RECRUITERS
                </span>
                <div className="flex flex-wrap gap-2">
                  {current.recruiters.map((rec) => (
                    <span
                      key={rec}
                      className="text-xs font-mono text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs font-semibold"
                    >
                      {rec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Briefing CTA */}
              <button
                onClick={() => onOpenLevelBrief?.(current)}
                className="w-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 font-mono font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                Open level briefing
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
