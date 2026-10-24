import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Calculator, Sparkles, CheckCircle2, ArrowRight, Zap, Target, 
  Briefcase, Clock, GraduationCap, Flame, ChevronRight, RotateCcw, Award 
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function PlacementCalculator({ onToast }) {
  // Step selections
  const [targetTier, setTargetTier] = useState('tier2'); // 'tier1' (14-25+ LPA), 'tier2' (7-14 LPA), 'tier3' (3.5-7 LPA)
  const [collegeYear, setCollegeYear] = useState('3rd'); // '1st_2nd', '3rd', 'final'
  const [dailyTime, setDailyTime] = useState('45min'); // '20min', '45min', '90min'
  const [calculating, setCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  // Derived readiness score calculation
  const getReadinessData = () => {
    let baseScore = 60;
    
    // Tier modifier
    if (targetTier === 'tier1') baseScore += 8;
    else if (targetTier === 'tier2') baseScore += 16;
    else baseScore += 24;

    // Year modifier
    if (collegeYear === '1st_2nd') baseScore += 12; // early start is high potential
    else if (collegeYear === '3rd') baseScore += 8;
    else baseScore += 4;

    // Daily time modifier
    if (dailyTime === '90min') baseScore += 15;
    else if (dailyTime === '45min') baseScore += 10;
    else baseScore += 4;

    const finalScore = Math.min(97, Math.max(52, baseScore));
    
    let daysToReady = 45;
    if (targetTier === 'tier1') daysToReady = dailyTime === '90min' ? 60 : 90;
    else if (targetTier === 'tier2') daysToReady = dailyTime === '90min' ? 30 : 45;
    else daysToReady = dailyTime === '90min' ? 20 : 30;

    let targetLabel = 'Service & IT Majors (TCS / Infosys / Wipro)';
    let salaryRange = '3.5 – 7.5 LPA';
    if (targetTier === 'tier1') {
      targetLabel = 'Top Tech & Product Giants (Amazon / Adobe / Google / Atlassian)';
      salaryRange = '15 – 35+ LPA';
    } else if (targetTier === 'tier2') {
      targetLabel = 'Product & High-Growth Unicorns (Zoho / Thoughtworks / PayPal)';
      salaryRange = '8 – 14.5 LPA';
    }

    return {
      score: finalScore,
      days: daysToReady,
      targetLabel,
      salaryRange,
      weeklyProblems: dailyTime === '90min' ? 14 : dailyTime === '45min' ? 8 : 4
    };
  };

  const data = getReadinessData();

  const handleCalculate = () => {
    setCalculating(true);
    setTimeout(() => {
      setCalculating(false);
      setHasCalculated(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#FFD83D', '#7928CA', '#10B981', '#F59E0B']
      });
      if (onToast) onToast(`Score calculated: ${data.score}% Placement Readiness!`);
    }, 400);
  };

  const circumference = 2 * Math.PI * 42;
  const strokeOffset = circumference - (data.score / 100) * circumference;

  return (
    <section className="py-16 md:py-24 border-b border-amber-200/50 relative bg-gradient-to-b from-[#FAF5FF] via-white to-[#FEFCE8]/50 overflow-hidden" id="calculator">
      {/* Soft Ambient Light Glows */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-amber-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-200/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <ScrollReveal animation="fade-up" className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-widest mb-3 bg-amber-100/90 px-3.5 py-1.5 rounded-full border border-amber-300/60 shadow-xs">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            INTERACTIVE PLACEMENT READINESS SCORE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            How ready are you for <br className="hidden sm:inline" />
            <span className="text-gradient-purple">your dream offer?</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 font-medium">
            Answer 3 quick questions to discover your current offer readiness score, estimated timeline, and tailored daily practice target.
          </p>
        </ScrollReveal>

        {/* Interactive Calculator Card */}
        <ScrollReveal animation="fade-up" delay={80}>
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 space-y-8 relative">
            
            {/* 3 Step Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Step 1: Target Tier */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[10px] font-black">
                    1
                  </span>
                  Target Package Band
                </div>

                <div className="flex flex-col gap-2">
                  {[
                    { id: 'tier1', label: '15 – 35+ LPA', sub: 'Product & Tech Giants', icon: '🚀' },
                    { id: 'tier2', label: '8 – 14.5 LPA', sub: 'High-Growth Tech Unicorns', icon: '⚡' },
                    { id: 'tier3', label: '3.5 – 7.5 LPA', sub: 'Mass / Service Recruiters', icon: '🏢' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setTargetTier(t.id); handleCalculate(); }}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group ${
                        targetTier === t.id
                          ? 'bg-purple-50/80 border-purple-400 shadow-xs'
                          : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                      }`}
                    >
                      <div>
                        <div className={`text-xs font-extrabold flex items-center gap-1.5 ${targetTier === t.id ? 'text-purple-900' : 'text-slate-800'}`}>
                          <span>{t.icon}</span> {t.label}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 mt-0.5">{t.sub}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        targetTier === t.id ? 'border-purple-600 bg-purple-600 text-white' : 'border-slate-300'
                      }`}>
                        {targetTier === t.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: College Year */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-black">
                    2
                  </span>
                  Your College Standing
                </div>

                <div className="flex flex-col gap-2">
                  {[
                    { id: '1st_2nd', label: '1st & 2nd Year', sub: 'Early Advantage Track', icon: '🌱' },
                    { id: '3rd', label: '3rd Year / Pre-final', sub: 'Internship & Peak Prep', icon: '🎯' },
                    { id: 'final', label: 'Final Year / Fresh Grad', sub: 'Active Placement Season', icon: '⚡' },
                  ].map((y) => (
                    <button
                      key={y.id}
                      onClick={() => { setCollegeYear(y.id); handleCalculate(); }}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group ${
                        collegeYear === y.id
                          ? 'bg-purple-50/80 border-purple-400 shadow-xs'
                          : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                      }`}
                    >
                      <div>
                        <div className={`text-xs font-extrabold flex items-center gap-1.5 ${collegeYear === y.id ? 'text-purple-900' : 'text-slate-800'}`}>
                          <span>{y.icon}</span> {y.label}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 mt-0.5">{y.sub}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        collegeYear === y.id ? 'border-purple-600 bg-purple-600 text-white' : 'border-slate-300'
                      }`}>
                        {collegeYear === y.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Daily Coding Commitment */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black">
                    3
                  </span>
                  Daily Time Commitment
                </div>

                <div className="flex flex-col gap-2">
                  {[
                    { id: '20min', label: '20 mins / day', sub: 'Micro-practice habit', icon: '⏱️' },
                    { id: '45min', label: '45 mins / day', sub: 'Balanced topic mastering', icon: '🔥' },
                    { id: '90min', label: '90+ mins / day', sub: 'High-velocity sprint', icon: '⚡' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => { setDailyTime(d.id); handleCalculate(); }}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group ${
                        dailyTime === d.id
                          ? 'bg-purple-50/80 border-purple-400 shadow-xs'
                          : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                      }`}
                    >
                      <div>
                        <div className={`text-xs font-extrabold flex items-center gap-1.5 ${dailyTime === d.id ? 'text-purple-900' : 'text-slate-800'}`}>
                          <span>{d.icon}</span> {d.label}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 mt-0.5">{d.sub}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        dailyTime === d.id ? 'border-purple-600 bg-purple-600 text-white' : 'border-slate-300'
                      }`}>
                        {dailyTime === d.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Live Calculation Output Dashboard */}
            <div className="bg-gradient-to-br from-purple-50/60 via-amber-50/40 to-purple-50/30 rounded-2xl p-6 border border-purple-200/70">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* SVG Gauge Score Meter */}
                <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-32 h-32 -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="42"
                        stroke="#E2E8F0"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="42"
                        stroke="url(#calc-gradient)"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeOffset}
                        strokeLinecap="round"
                        fill="none"
                        className="transition-all duration-1000 ease-out"
                      />
                      <defs>
                        <linearGradient id="calc-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#F59E0B" />
                          <stop offset="50%" stopColor="#7928CA" />
                          <stop offset="100%" stopColor="#10B981" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-slate-900 font-mono tracking-tight">
                        {data.score}%
                      </span>
                      <span className="text-[9px] font-mono font-bold uppercase text-purple-700 tracking-wider">
                        Readiness
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-600 mt-2 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    {data.score >= 80 ? 'High Offer Potential' : 'Solid Starting Base'}
                  </span>
                </div>

                {/* Breakdown Details */}
                <div className="md:col-span-8 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-widest block mb-1">
                      Target Role Category
                    </span>
                    <h4 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                      {data.targetLabel} ({data.salaryRange})
                    </h4>
                  </div>

                  {/* 3 Metric Pills */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/80 p-3 rounded-xl border border-slate-200 text-center">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Timeline</span>
                      <span className="text-sm font-extrabold text-slate-900 font-mono">~{data.days} Days</span>
                    </div>
                    <div className="bg-white/80 p-3 rounded-xl border border-slate-200 text-center">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Weekly Qs</span>
                      <span className="text-sm font-extrabold text-purple-700 font-mono">{data.weeklyProblems} Problems</span>
                    </div>
                    <div className="bg-white/80 p-3 rounded-xl border border-slate-200 text-center">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Focus Modules</span>
                      <span className="text-sm font-extrabold text-emerald-600 font-mono">DSA + MCQ</span>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href="#destination"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dk-purple hover:bg-purple-700 text-white font-extrabold text-xs shadow-sm hover:shadow-md transition-all font-mono"
                    >
                      Apply To My Practice Path
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="#question-bank"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-600 hover:text-purple-700 transition-colors px-3 py-2"
                    >
                      Browse matching questions ↗
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
