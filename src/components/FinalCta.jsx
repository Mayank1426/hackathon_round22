import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import BrandLogo from './BrandLogo';

export default function FinalCta() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-transparent via-amber-50/50 to-purple-50/50" id="start">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-200/50 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-200/50 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <ScrollReveal animation="fade-up">
          {/* Brand Logo Presentation */}
          <div className="flex justify-center mb-5">
            <BrandLogo size="lg" showTagline tagline="Placement Ready · Round Focused" />
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-widest mb-6 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200">
            <span className="w-4 h-0.5 bg-amber-500"></span>
            ONE GOAL. ONE USEFUL NEXT STEP.
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Make the next<br />
            <span className="cta-shimmer-text">round count.</span>
          </h2>

          <p className="mt-6 text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-medium">
            Practise relevant questions, track your daily progress, and take a clearer, confident step toward your next opportunity.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#destination"
              className="inline-flex items-center gap-2 bg-dk-purple hover:bg-purple-700 text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Start a practice route
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="#institutions"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm uppercase tracking-wider transition-all shadow-sm"
            >
              For colleges & teams
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <span className="tracking-widest">LESS RANDOM PREP.</span>
            <span className="text-purple-700 font-bold tracking-widest flex items-center gap-1.5">
              MORE INTENTIONAL PROGRESS. <span className="text-sm text-amber-500">✳</span>
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
