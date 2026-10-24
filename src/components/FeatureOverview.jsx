import React from 'react';
import { platformFeatures } from '../data/mockData';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function FeatureOverview() {
  return (
    <section className="py-16 md:py-24 border-b border-purple-100/60 relative bg-white/70 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal animation="fade-up" className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-600 uppercase tracking-widest mb-3">
              <span className="w-4 h-0.5 bg-amber-500"></span>
              THE WHOLE PLATFORM
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Real preparation.<br />
              <span className="text-gradient-purple">Less friction.</span>
            </h2>
          </div>
          <p className="text-slate-600 text-sm md:text-base max-w-md font-medium">
            Keep the tools students need in one connected experience—from focused questions to progress visibility and campus-level insight.
          </p>
        </ScrollReveal>

        {/* 6 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platformFeatures.map((feat, idx) => (
            <ScrollReveal
              key={feat.num}
              animation="fade-up"
              delay={idx * 60}
              className="h-full"
            >
              <article className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 border border-slate-200 flex flex-col justify-between group bg-slate-50/60 hover:bg-white shadow-xs h-full">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      {feat.num}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center font-mono font-bold text-sm text-purple-700`}
                    >
                      {feat.symbol}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-6 group-hover:text-purple-700 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <a
                  href={feat.link}
                  className="mt-6 pt-4 border-t border-slate-200 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-purple-700 uppercase tracking-wider group-hover:text-slate-900 transition-colors"
                >
                  Learn more
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
