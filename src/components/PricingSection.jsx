import React from 'react';
import { pricingPlans } from '../data/mockData';
import { Check, Sparkles, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';
import ScrollReveal from './ScrollReveal';


export default function PricingSection({ onOpenScholarship, onToast }) {
  return (
    <section className="py-16 md:py-24 border-b border-purple-100/60 relative bg-white/70 backdrop-blur-sm" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching PDF Page 8 & 12 */}
        <ScrollReveal animation="fade-up" className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-600 uppercase tracking-widest mb-3">
              <span className="w-4 h-0.5 bg-amber-500"></span>
              WHAT EACH PLAN ACTUALLY COSTS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Different target.<br />
              <span className="text-gradient-purple">Different focus.</span>
            </h2>
          </div>
          <div className="space-y-2 max-w-md">
            <p className="text-slate-600 text-sm md:text-base font-medium">
              Compare preparation levels and find the plan that fits your current target. Annual access with daily breakdown.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono font-semibold text-slate-700">
              {['Company', 'Exam', 'Package', 'Language', 'Level'].map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Pricing Cards Grid (5 Tiers matching PDF Pages 9, 10, 11, 12) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
          {pricingPlans.map((plan, idx) => (
            <ScrollReveal
              key={plan.id}
              animation="fade-up"
              delay={idx * 60}
              className="h-full"
            >
              <article
                className={`rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between relative group h-full ${
                  plan.badge === 'MOST POPULAR'
                    ? 'border-2 border-purple-600 bg-purple-50/20 shadow-md scale-[1.02] z-10'
                    : plan.badge === 'BEST VALUE'
                    ? 'border-2 border-amber-400 bg-amber-50/20 shadow-md z-10'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {/* Badge if present */}
                {plan.badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 font-mono font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-xs border flex items-center gap-1 whitespace-nowrap ${
                    plan.badge === 'MOST POPULAR'
                      ? 'bg-dk-purple text-white border-purple-500'
                      : 'bg-dk-yellow text-slate-950 border-amber-400'
                  }`}>
                    <Sparkles className="w-3 h-3" />
                    {plan.badge}
                  </div>
                )}

                {/* Top metadata */}
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="text-xs font-mono font-extrabold tracking-wider text-slate-800">
                      {plan.name}
                    </span>
                    <span className="text-base text-amber-500 font-bold">{plan.icon}</span>
                  </div>

                  {/* Price & Daily Cost */}
                  <div className="mt-5 flex items-baseline justify-between gap-1">
                    <div>
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        {plan.price}
                      </span>
                      <span className="text-xs font-mono text-slate-500">{plan.period}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                      {plan.dailyPrice}
                    </span>
                  </div>

                  <div className="mt-3">
                    <span className="text-xs font-mono font-extrabold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded">
                      {plan.salaryBand}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-4 leading-relaxed min-h-[36px] font-medium">
                    {plan.description}
                  </p>

                  {/* Features list */}
                  <ul className="mt-6 space-y-2.5 pt-4 border-t border-slate-200 text-xs text-slate-700">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5 font-bold" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons: Purchase & Get Scholarship */}
                <div className="mt-8 space-y-2">
                  <button
                    onClick={() => onToast(`Initiated purchase for ${plan.name} plan.`)}
                    className="w-full text-xs font-mono font-bold uppercase tracking-wider py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 bg-slate-900 text-white hover:bg-slate-800 shadow-xs"
                  >
                    Purchase
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      onOpenScholarship?.(plan);
                      onToast(`Selected ${plan.name} plan scholarship application.`);
                    }}
                    className="w-full text-xs font-mono font-bold uppercase tracking-wider py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800"
                  >
                    Get Scholarship
                  </button>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Quick Targets & Full Comparison Links (PDF Page 12) */}
        <ScrollReveal animation="fade-up" className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500 font-bold uppercase">POPULAR COMPANY PACKAGES:</span>
            {['TCS NQT', 'Zoho', 'Amazon'].map((target) => (
              <span key={target} className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-white border border-slate-200 shadow-xs text-slate-700">
                {target}
              </span>
            ))}
          </div>

          <a
            href="#destination"
            className="text-xs font-mono font-bold text-purple-700 hover:underline flex items-center gap-1"
          >
            See the full plan comparison ↗
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
