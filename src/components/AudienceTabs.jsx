import React, { useState } from 'react';
import { audienceData } from '../data/mockData';
import { Check, ArrowUpRight, BarChart3, Users, Building, GraduationCap, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function AudienceTabs({ onToast }) {
  const [activeAudienceKey, setActiveAudienceKey] = useState('students');
  const current = audienceData[activeAudienceKey];
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

  const handleTabChange = (key) => {
    setActiveAudienceKey(key);
    onToast(`Switched view: ${key.toUpperCase()}`);
  };

  return (
    <section className="py-16 md:py-24 border-b border-amber-200/50 relative bg-gradient-to-b from-amber-50/40 via-purple-50/30 to-amber-50/20" id="institutions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal animation="fade-up" className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-600 uppercase tracking-widest mb-3">
              <span className="w-4 h-0.5 bg-amber-500"></span>
              ONE PLATFORM, DIFFERENT VIEWS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              For students.<br />
              <span className="text-gradient-purple">For campus teams.</span>
            </h2>
          </div>
          <p className="text-slate-600 text-sm md:text-base max-w-md font-medium">
            Keep student and institutional audience paths visible, with role-specific value, tailored metrics, and clear next actions.
          </p>
        </ScrollReveal>

        {/* 3 Audience Tabs */}
        <ScrollReveal animation="fade-up" delay={60} className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 max-w-md mb-10 shadow-xs">
          <button
            onClick={() => handleTabChange('students')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeAudienceKey === 'students'
                ? 'bg-dk-purple text-white shadow'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            For Students
          </button>
          <button
            onClick={() => handleTabChange('hods')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeAudienceKey === 'hods'
                ? 'bg-dk-purple text-white shadow'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            For HODs
          </button>
          <button
            onClick={() => handleTabChange('admins')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeAudienceKey === 'admins'
                ? 'bg-dk-purple text-white shadow'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-4 h-4" />
            For Admins
          </button>
        </ScrollReveal>

        {/* Audience Content Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Copy */}
          <ScrollReveal animation="fade-up" delay={100} className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest">
              {current.eyebrow}
            </span>

            <h3
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight"
              dangerouslySetInnerHTML={{ __html: current.title }}
            ></h3>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
              {current.text}
            </p>

            <div className="space-y-3 pt-2">
              {current.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href={current.ctaLink}
                className="inline-flex items-center gap-2 bg-dk-purple hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow transition-all"
              >
                {current.cta}
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>

          {/* Right Live Role Dashboard Preview */}
          <ScrollReveal animation="scale" delay={150} className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 bg-white">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                DKODER / ROLE VIEW
              </span>
              <span className="text-[11px] font-mono text-purple-800 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping"></span>
                ACTIVE PREVIEW
              </span>
            </div>

            {/* Profile Row */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
                  {current.avatar}
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-amber-700 font-bold">
                    {current.role}
                  </div>
                  <div className="text-sm font-bold text-slate-900 leading-tight">
                    {current.name}
                  </div>
                  <div className="text-xs text-slate-500">{current.desc}</div>
                </div>
              </div>
              <span className="text-slate-400 font-mono text-sm">•••</span>
            </div>

            {/* 2 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">
                  {current.statLabel1}
                </div>
                <div className="text-2xl font-mono font-extrabold text-slate-900">
                  {current.statValue1}{' '}
                  <span className="text-xs font-normal text-slate-500">{current.statSub1}</span>
                </div>
                <div className="text-[11px] font-mono text-emerald-700 font-bold">
                  {current.statTrend1}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">
                  {current.statLabel2}
                </div>
                <div className="text-2xl font-mono font-extrabold text-slate-900">
                  {current.statValue2}{' '}
                  <span className="text-xs font-normal text-slate-500">{current.statSub2}</span>
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  {current.statTrend2}
                </div>
              </div>
            </div>

            {/* Interactive Bar Chart */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-900 font-bold">{current.chartTitle}</span>
                <span className="text-slate-500 font-semibold">LAST 7 DAYS ⌄</span>
              </div>

              <div className="flex items-end justify-between h-32 pt-4 px-2 gap-2">
                {current.chartData.map((val, idx) => {
                  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                  const isHovered = hoveredBarIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer"
                      onMouseEnter={() => setHoveredBarIndex(idx)}
                      onMouseLeave={() => setHoveredBarIndex(null)}
                    >
                      {/* Tooltip */}
                      {isHovered && (
                        <span className="text-[10px] font-mono bg-slate-900 text-white px-1.5 py-0.5 rounded font-bold shadow-xs">
                          {val}%
                        </span>
                      )}
                      <div
                        className={`w-full rounded-t-md transition-all duration-300 ${
                          isHovered
                            ? 'bg-amber-400 shadow-sm'
                            : 'bg-gradient-to-t from-purple-700 to-indigo-500 group-hover:from-amber-400 group-hover:to-amber-500'
                        }`}
                        style={{ height: `${val}%` }}
                      ></div>
                      <span className="text-[10px] font-mono text-slate-500 font-semibold">{days[idx]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom preview info */}
            <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                YOUR NEXT STEP IS READY
              </span>
              <a href="#destination" className="text-purple-700 hover:underline flex items-center gap-1 font-bold">
                View route ↗
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
