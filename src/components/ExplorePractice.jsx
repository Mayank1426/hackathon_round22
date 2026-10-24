import React, { useState, useEffect, useRef } from 'react';
import { exploreCategories, exploreCards } from '../data/mockData';
import { ArrowUpRight, Check, Code, Sparkles, Terminal, FileText, BarChart3, Users, Mic } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

/* ── Animated Package Visual with Scroll Count-Up & Expanding Lines ── */
function PackageProgressVisual() {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [val1, setVal1] = useState({ min: 0, max: 0 });
  const [val2, setVal2] = useState({ min: 0, max: 0 });
  const [val3, setVal3] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          const startTime = performance.now();
          const duration = 1500; // 1.5s smooth count up

          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Cubic ease out
            const ease = 1 - Math.pow(1 - progress, 3);

            setVal1({
              min: Math.floor(3 * ease),
              max: Math.floor(7 * ease)
            });
            setVal2({
              min: Math.floor(7 * ease),
              max: Math.floor(12 * ease)
            });
            setVal3(Math.floor(12 * ease));

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setVal1({ min: 3, max: 7 });
              setVal2({ min: 7, max: 12 });
              setVal3(12);
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full space-y-3.5 py-1">
      {/* Top Value Labels that start from 0 and count up */}
      <div className="flex justify-between text-[11px] font-mono font-bold">
        <span className="text-amber-600 transition-colors tabular-nums">
          {val1.min}–{val1.max} LPA
        </span>
        <span className="text-slate-700 transition-colors tabular-nums">
          {val2.min}–{val2.max} LPA
        </span>
        <strong className="text-purple-700 font-black transition-colors tabular-nums">
          {val3}+ LPA
        </strong>
      </div>

      {/* 3 Expanding Lines with Gradient Fills */}
      <div className="space-y-2.5">
        {/* Tier 1: 3-7 LPA Line */}
        <div className="space-y-1">
          <div className="h-2.5 rounded-full bg-slate-200/80 overflow-hidden relative">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-xs transition-all duration-1000 ease-out"
              style={{ width: inView ? '42%' : '0%' }}
            />
          </div>
        </div>

        {/* Tier 2: 7-12 LPA Line */}
        <div className="space-y-1">
          <div className="h-2.5 rounded-full bg-slate-200/80 overflow-hidden relative">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-xs transition-all duration-1200 ease-out"
              style={{ width: inView ? '68%' : '0%', transitionDelay: '150ms' }}
            />
          </div>
        </div>

        {/* Tier 3: 12+ LPA Line */}
        <div className="space-y-1">
          <div className="h-2.5 rounded-full bg-slate-200/80 overflow-hidden relative">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-xs transition-all duration-1400 ease-out"
              style={{ width: inView ? '94%' : '0%', transitionDelay: '300ms' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePractice({ onToast }) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredCards = activeTab === 'all'
    ? exploreCards
    : exploreCards.filter(c => c.kind === activeTab);

  return (
    <section className="py-16 md:py-24 border-b border-purple-100/60 relative bg-gradient-to-b from-amber-50/40 via-purple-50/30 to-transparent" id="explore">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal animation="fade-up" className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-600 uppercase tracking-widest mb-3">
              <span className="w-4 h-0.5 bg-amber-500"></span>
              PRACTISE WITH PURPOSE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Right filter.<br />
              <span className="text-gradient-purple">Right career.</span>
            </h2>
          </div>
          <p className="text-slate-600 text-sm md:text-base max-w-md font-medium">
            From company-specific questions to entrance exams and package-focused preparation, find the right starting point without losing the tools you already use.
          </p>
        </ScrollReveal>

        {/* Explore Tabs */}
        <ScrollReveal animation="fade-up" delay={50} className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {exploreCategories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                onToast(`Viewing: ${tab.label}`);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-dk-purple text-white shadow'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm'
              }`}
            >
              {tab.label}
              <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </ScrollReveal>

        {/* Explore Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card, idx) => (
            <ScrollReveal
              key={card.id}
              animation="fade-up"
              delay={idx * 60}
              className="h-full"
            >
              <article className="glass-card glass-card-hover card-3d rounded-2xl p-6 border border-slate-200/90 flex flex-col justify-between group relative overflow-hidden bg-white shadow-sm h-full">
                {/* Top Tag & Arrow */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-purple-700 uppercase">
                    {card.tag}
                  </span>
                  <span className="text-slate-400 group-hover:text-purple-700 transition-colors">
                    ↗
                  </span>
                </div>

                {/* Custom Artwork */}
                <div className="my-6 min-h-[140px] rounded-xl bg-slate-50 border border-slate-200/80 p-4 flex items-center justify-center relative overflow-hidden">
                  {card.kind === 'company' && card.coreBrand && (
                    <div className="relative flex items-center justify-center w-full h-full">
                      <div className="absolute w-28 h-28 rounded-full border border-purple-200 animate-spin"></div>
                      <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md z-10">
                        {card.coreBrand}
                      </div>
                      <div className="absolute -top-1 left-2 text-[10px] font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded border border-purple-200 font-semibold shadow-xs">
                        {card.chips[0]}
                      </div>
                      <div className="absolute top-1 right-2 text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-200 font-semibold shadow-xs">
                        {card.chips[1]}
                      </div>
                      <div className="absolute -bottom-1 left-4 text-[10px] font-mono bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded border border-indigo-200 font-semibold shadow-xs">
                        {card.chips[2]}
                      </div>
                      <div className="absolute bottom-1 right-3 text-[10px] font-mono bg-teal-100 text-teal-800 px-2 py-0.5 rounded border border-teal-200 font-semibold shadow-xs">
                        {card.chips[3]}
                      </div>
                    </div>
                  )}

                  {card.kind === 'exam' && (
                    <div className="flex items-center justify-between w-full px-4">
                      <div className="w-24 bg-white border border-slate-200 rounded-lg p-2.5 space-y-1.5 shadow-sm">
                        <div className="text-[9px] font-mono text-purple-700 font-bold">MOCK TEST</div>
                        <div className="h-1 bg-slate-200 rounded-full w-full"></div>
                        <div className="h-1 bg-slate-200 rounded-full w-3/4"></div>
                        <div className="h-1 bg-slate-200 rounded-full w-1/2"></div>
                        <span className="text-[9px] text-emerald-600 font-bold block">✓ PASSED</span>
                      </div>
                      <div className="bg-amber-100 border border-amber-300 text-amber-900 font-mono font-extrabold text-xs px-3 py-2 rounded-xl text-center rotate-6 shadow-sm">
                        READY<br />SET<br />GO!
                      </div>
                    </div>
                  )}

                  {card.kind === 'package' && (
                    <PackageProgressVisual />
                  )}

                  {card.tag === 'CODING PRACTICE' && (
                    <div className="w-full font-mono text-xs text-slate-700 space-y-2">
                      <div className="flex items-center justify-between text-purple-700 font-bold">
                        <span className="text-lg">{`{ }`}</span>
                        <span className="text-[10px] text-slate-500 font-semibold">PYTHON / C++ / JAVA</span>
                      </div>
                      <div className="bg-slate-900 text-slate-200 p-2.5 rounded-lg border border-slate-800 text-[11px]">
                        <span className="text-purple-400">def</span> <span className="text-yellow-300">solve</span>(pattern):
                        <div className="pl-3 text-slate-400"># Optimized O(1) logic</div>
                      </div>
                    </div>
                  )}

                  {card.tag === 'APTITUDE & REASONING' && (
                    <div className="flex items-center justify-around w-full text-2xl font-bold font-mono">
                      <span className="text-purple-600 animate-pulse">∑</span>
                      <span className="text-amber-500">%</span>
                      <span className="text-emerald-600">π</span>
                      <span className="text-rose-500">Δ</span>
                      <span className="text-blue-700 font-extrabold text-sm bg-blue-100 px-2 py-1 rounded">100%</span>
                    </div>
                  )}

                  {card.tag === 'MOCK INTERVIEWS' && (
                    <div className="flex items-center justify-center gap-6 w-full">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs">●</div>
                        <span className="text-[9px] font-mono text-slate-500 mt-1 font-semibold">Interviewer</span>
                      </div>
                      <div className="h-8 w-12 border-t-2 border-b-2 border-slate-300 flex items-center justify-center">
                        <Mic className="w-4 h-4 text-purple-600 animate-pulse" />
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-dk-purple flex items-center justify-center text-xs text-white">●</div>
                        <span className="text-[9px] font-mono text-slate-500 mt-1 font-semibold">Candidate</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Title & Description */}
                <div className="space-y-2 mb-6">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Footer link */}
                <a
                  href={card.linkHref}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-purple-700 hover:text-slate-900 uppercase tracking-wider transition-colors pt-3 border-t border-slate-100"
                >
                  {card.linkText}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Section Endline */}
        <ScrollReveal animation="fade-up" className="mt-12 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <span className="tracking-widest">06 PRACTICE DOORS. ONE CLEARER DIRECTION.</span>
          <a
            href="#question-bank"
            className="text-purple-700 hover:underline flex items-center gap-1 font-bold"
          >
            Browse all practice options
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
