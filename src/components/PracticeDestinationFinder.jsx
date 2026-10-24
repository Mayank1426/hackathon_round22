import React, { useState } from 'react';
import { ArrowUpRight, RotateCcw, Check, Sparkles, SlidersHorizontal, Layers, Dices, Lock, ShoppingBag } from 'lucide-react';
import { careerTracks, prepBundles } from '../data/mockData';
import ScrollReveal from './ScrollReveal';

export default function PracticeDestinationFinder({ onToast }) {
  const [filters, setFilters] = useState({
    companyType: 'Any company',
    packageRange: 'Any package',
    mode: 'All practice',
    language: 'All languages',
    company: 'Any company',
    level: 'All levels'
  });

  const [selectedCareerTrack, setSelectedCareerTrack] = useState('service');
  const [routeGenerated, setRouteGenerated] = useState(false);
  const [activeRoute, setActiveRoute] = useState({
    companyName: 'TCS',
    trackName: 'Foundation Track',
    role: 'Junior Developer · Software Engineer',
    tracksCount: '4 tracks',
    salaryRange: '3–7 LPA',
    meterLevel: 2,
    steps: [
      { num: '01', title: 'MCQ arena', desc: 'Build accuracy and speed', count: '12 sets' },
      { num: '02', title: 'Coding fundamentals', desc: 'Arrays, strings, logic', count: '24 Qs' },
      { num: '03', title: 'Mock round', desc: 'Practise under time pressure', count: '1 round' }
    ]
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleQuickTarget = (comp) => {
    setFilters(prev => ({ ...prev, company: comp }));
    onToast(`Quick target selected: ${comp}`);
  };

  const handleSurpriseMe = () => {
    const companies = ['Amazon', 'Microsoft', 'TCS', 'Infosys', 'Razorpay', 'Cognizant'];
    const packages = ['3–7 LPA', '7–12 LPA', '12–20 LPA', '20+ LPA'];
    const modes = ['Coding', 'Aptitude', 'MCQ', 'Interview'];
    const levels = ['Beginner', 'Intermediate', 'Advanced'];

    const randomCompany = companies[Math.floor(Math.random() * companies.length)];
    const randomPackage = packages[Math.floor(Math.random() * packages.length)];
    const randomMode = modes[Math.floor(Math.random() * modes.length)];
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];

    setFilters({
      companyType: 'Any company',
      packageRange: randomPackage,
      mode: randomMode,
      language: 'All languages',
      company: randomCompany,
      level: randomLevel
    });

    handleGenerateWith({ company: randomCompany, packageRange: randomPackage, mode: randomMode, level: randomLevel });
    onToast(`Surprise target generated: ${randomCompany} (${randomPackage})!`);
  };

  const handleGenerateWith = (f) => {
    const comp = f.company || 'TCS';
    const isHighPack = (f.packageRange || '').includes('12') || (f.packageRange || '').includes('20');
    const isMidPack = (f.packageRange || '').includes('7');

    let salary = f.packageRange !== 'Any package' ? f.packageRange : (isHighPack ? '18–32 LPA' : '3–7 LPA');
    let meter = isHighPack ? 5 : isMidPack ? 3 : 2;
    let track = `${comp} · ${f.level !== 'All levels' ? f.level : 'Target'} Journey`;
    let role = isHighPack ? 'Member of Technical Staff · SDE-1' : 'Software Engineer · Associate';

    setActiveRoute({
      companyName: comp,
      trackName: track,
      role: role,
      tracksCount: '4 tracks',
      salaryRange: salary,
      meterLevel: meter,
      steps: [
        {
          num: '01',
          title: f.mode === 'Aptitude' ? 'Speed Aptitude Drills' : 'MCQ Arena & Fundamentals',
          desc: 'Quant, reasoning & company syllabus',
          count: '15 sets'
        },
        {
          num: '02',
          title: 'Curated Coding Sprint',
          desc: `${f.level || 'Pattern-based'} curated problems`,
          count: '32 Qs'
        },
        {
          num: '03',
          title: 'Full Technical Mock Round',
          desc: 'Simulated time pressure & AI feedback',
          count: '2 rounds'
        }
      ]
    });
    setRouteGenerated(true);
  };

  const handleGenerate = () => {
    handleGenerateWith(filters);
    onToast(`Generated personalized route for ${filters.company !== 'Any company' ? filters.company : 'Target Track'}!`);
  };

  const handleReset = () => {
    setFilters({
      companyType: 'Any company',
      packageRange: 'Any package',
      mode: 'All practice',
      language: 'All languages',
      company: 'Any company',
      level: 'All levels'
    });
    setRouteGenerated(false);
    setActiveRoute({
      companyName: 'TCS',
      trackName: 'Foundation Track',
      role: 'Junior Developer · Software Engineer',
      tracksCount: '4 tracks',
      salaryRange: '3–7 LPA',
      meterLevel: 2,
      steps: [
        { num: '01', title: 'MCQ arena', desc: 'Build accuracy and speed', count: '12 sets' },
        { num: '02', title: 'Coding fundamentals', desc: 'Arrays, strings, logic', count: '24 Qs' },
        { num: '03', title: 'Mock round', desc: 'Practise under time pressure', count: '1 round' }
      ]
    });
    onToast('Filters reset to default.');
  };

  return (
    <section className="py-16 md:py-24 border-b border-purple-100/80 relative bg-gradient-to-b from-purple-50/50 via-amber-50/35 to-purple-50/40" id="destination">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Scroll Reveal */}
        <ScrollReveal animation="fade-up" className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-600 uppercase tracking-widest mb-3">
              <span className="w-4 h-0.5 bg-amber-500"></span>
              YOUR PERSONAL PRACTICE FILTER
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              A deep question bank.<br />
              <span className="text-gradient-purple">Only the right ones for you.</span>
            </h2>
          </div>
          <p className="text-slate-600 text-sm md:text-base max-w-md font-medium">
            Choose the destination. Cut the noise. MCQs, coding rounds and platform problems, tagged by company, package and level.
          </p>
        </ScrollReveal>

        {/* Career Focus Track Badges (from PDF Page 5) */}
        <ScrollReveal animation="fade-up" delay={50} className="mb-8">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
            SELECT CAREER FOCUS TRACK
          </div>
          <div className="flex flex-wrap gap-2.5">
            {careerTracks.map((tr) => (
              <button
                key={tr.id}
                onClick={() => {
                  setSelectedCareerTrack(tr.id);
                  onToast(`Active Track: ${tr.name} (${tr.count} active roles)`);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all border ${
                  selectedCareerTrack === tr.id
                    ? 'bg-dk-purple text-white border-purple-700 shadow-sm scale-105'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <span>{tr.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  selectedCareerTrack === tr.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {tr.count}
                </span>
              </button>
            ))}
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-2">
            3,254 questions from 44 companies · 12 prep bundles
          </div>
        </ScrollReveal>

        {/* Finder Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Filters Card (Left) */}
          <ScrollReveal animation="fade-up" delay={100} className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 bg-white">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  A FOCUSED PRACTICE DEMO
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded">
                STEP 01 — 03
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">Choose the destination. Cut the noise.</h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Pick a target and watch the noise fall away.
              </p>
            </div>

            {/* Quick Targets (from PDF Page 4) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-mono text-slate-500 font-semibold uppercase">QUICK TARGETS:</span>
              {[
                { name: 'TCS', badge: 'bg-red-50 text-red-700 border-red-200' },
                { name: 'DIIPT', badge: 'bg-purple-50 text-purple-700 border-purple-200' },
                { name: 'Infosys', badge: 'bg-blue-50 text-blue-700 border-blue-200' },
                { name: 'Amazon', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
              ].map((q) => (
                <button
                  key={q.name}
                  onClick={() => handleQuickTarget(q.name)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold hover:scale-105 border transition-all ${
                    filters.company === q.name ? 'ring-2 ring-purple-500 font-black' : ''
                  } ${q.badge}`}
                >
                  {q.name}
                </button>
              ))}
            </div>

            {/* Filter Dropdowns Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-700 font-semibold">COMPANY</label>
                <select
                  value={filters.company}
                  onChange={(e) => handleFilterChange('company', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-purple-600 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none transition-colors"
                >
                  <option value="Any company">Any company</option>
                  <option value="TCS">TCS (NQT / Digital / Prime)</option>
                  <option value="DIIPT">DIIPT (Institute Aptitude & Tech Round)</option>
                  <option value="Infosys">Infosys (DSE & SP)</option>
                  <option value="Wipro">Wipro (NLTH & Turbo)</option>
                  <option value="Cognizant">Cognizant (GenC & Next)</option>
                  <option value="Accenture">Accenture (ASE & FSE)</option>
                  <option value="Capgemini">Capgemini (Exceller)</option>
                  <option value="Amazon">Amazon (SDE-I & II)</option>
                  <option value="Microsoft">Microsoft (SWE FTE)</option>
                  <option value="Persistent Systems">Persistent Systems</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-700 font-semibold">PACKAGE</label>
                <select
                  value={filters.packageRange}
                  onChange={(e) => handleFilterChange('packageRange', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-purple-600 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none transition-colors"
                >
                  <option value="Any package">Any package</option>
                  <option value="0–3 LPA">0–3 LPA</option>
                  <option value="3–7 LPA">3–7 LPA</option>
                  <option value="7–12 LPA">7–12 LPA</option>
                  <option value="12–20 LPA">12–20 LPA</option>
                  <option value="20+ LPA">20+ LPA</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-700 font-semibold">MODE</label>
                <select
                  value={filters.mode}
                  onChange={(e) => handleFilterChange('mode', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-purple-600 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none transition-colors"
                >
                  <option value="All practice">All practice</option>
                  <option value="Coding">Coding</option>
                  <option value="Aptitude">Aptitude</option>
                  <option value="MCQ">MCQ</option>
                  <option value="Interview">Interview</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-700 font-semibold">LEVEL</label>
                <select
                  value={filters.level}
                  onChange={(e) => handleFilterChange('level', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-purple-600 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none transition-colors"
                >
                  <option value="All levels">All levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* Action Buttons with Surprise Me */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleGenerate}
                  className="bg-dk-purple hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow transition-all flex items-center gap-2 active:scale-95"
                >
                  Generate my route
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleReset}
                  className="px-3.5 py-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 text-xs font-semibold tracking-wider transition-colors flex items-center gap-1.5 bg-white"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>

              <button
                onClick={handleSurpriseMe}
                className="px-4 py-3 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-mono font-bold tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Dices className="w-4 h-4 text-amber-700" />
                Surprise me
              </button>
            </div>

            {/* Note from PDF Page 4 */}
            <div className="text-[11px] font-mono text-slate-500 pt-1">
              Your plan decides which companies you can open.
            </div>

            {/* Prep Bundles from PDF Page 6 */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <div className="text-xs font-mono font-bold uppercase text-slate-700">
                COMPANY PREPARATION BUNDLES
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {prepBundles.slice(0, 2).map((bun) => (
                  <div key={bun.name} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{bun.name}</div>
                      <div className="text-[10px] font-mono text-slate-500">{bun.questions}</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                      {bun.price} ↗
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Route Preview Card (Right) */}
          <ScrollReveal animation="fade-up" delay={200} className="lg:col-span-5 glass-card rounded-2xl p-6 sm:p-8 border-2 border-amber-300/80 shadow-md relative bg-white space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-600" />
                YOUR JOURNEY PREVIEW
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-amber-800 bg-amber-50 border border-amber-300 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                READY TO PERSONALISE
              </span>
            </div>

            {/* Company info badge */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-white font-extrabold text-xl flex items-center justify-center shadow-sm">
                  {activeRoute.companyName.charAt(0)}
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-amber-700 tracking-wider font-bold">
                    {routeGenerated ? 'ACTIVE PRACTICE ROUTE' : 'EXAMPLE ROUTE'}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 leading-tight">
                    {activeRoute.trackName}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{activeRoute.role}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-lg shrink-0 font-bold">
                {activeRoute.tracksCount}
              </span>
            </div>

            {/* Typical Market Range & Meter */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500 uppercase text-[10px] font-semibold">TYPICAL MARKET RANGE</span>
                <span className="font-extrabold text-slate-900 text-sm">
                  {activeRoute.salaryRange}
                </span>
              </div>
              {/* 5-bar meter */}
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <div
                    key={lvl}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      lvl <= activeRoute.meterLevel
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-sm'
                        : 'bg-slate-200'
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* 3 Step List */}
            <div className="space-y-3">
              {activeRoute.steps.map((step) => (
                <div
                  key={step.num}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-mono text-xs font-bold text-purple-700 shadow-sm">
                      {step.num}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{step.title}</div>
                      <div className="text-[11px] text-slate-500">{step.desc}</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-600">
                    {step.count}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA to Question bank */}
            <a
              href="#question-bank"
              className="w-full inline-flex items-center justify-center gap-2 bg-dk-yellow hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-sm border border-amber-300 transition-all"
            >
              Open this practice route
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="text-center text-[10px] font-mono text-slate-400">
              Illustrative journey preview · Choose filters to personalise
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
