import React, { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { podiumData, rankingsData } from '../data/mockData';
import { 
  Trophy, Crown, Search, Flame, Target, TrendingUp, Zap, 
  Award, Users, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, 
  Minus, Sparkles, CheckCircle2, X, Heart, ExternalLink, ShieldCheck
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

/* ── Confetti Burst Helpers ── */
function fireConfetti(originX = 0.5, originY = 0.6) {
  confetti({
    particleCount: 65,
    spread: 70,
    origin: { x: originX, y: originY },
    colors: ['#FFD83D', '#F59E0B', '#7928CA', '#10B981', '#EC4899', '#3B82F6'],
    disableForReducedMotion: true,
  });
}

function fireBigCelebration() {
  const count = 200;
  const defaults = { origin: { y: 0.7 }, zIndex: 9999 };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

/* ── Animated XP Counter with Cubic Easing ── */
function AnimatedXP({ value, duration = 1600, className = '' }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const num = parseFloat(value) || 0;
          const startTime = performance.now();

          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay((num * eased).toFixed(2));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref} className={className}>{display}</span>;
}

/* ── SVG Progress Ring for Top 3 Avatars ── */
function ProgressRing({ radius = 46, stroke = 4, progress = 100, color = '#EAB308', delay = 0, children }) {
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(circumference - (progress / 100) * circumference);
    }, 500 + delay);
    return () => clearTimeout(timer);
  }, [progress, circumference, delay]);

  return (
    <div className="relative" style={{ width: radius * 2, height: radius * 2 }}>
      <svg width={radius * 2} height={radius * 2} className="absolute inset-0 -rotate-90">
        <circle
          stroke="rgba(226, 232, 240, 0.7)"
          fill="none"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: `drop-shadow(0 0 4px ${color}60)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

/* ── Floating Confetti / Sparkle Particles in Light Colors ── */
function LeaderboardParticles() {
  const particles = useMemo(() => Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${6 + Math.random() * 88}%`,
    top: `${8 + Math.random() * 84}%`,
    delay: `${Math.random() * 4}s`,
    duration: `${2.8 + Math.random() * 3}s`,
    size: 3 + Math.random() * 4,
    color: ['#F59E0B', '#7928CA', '#10B981', '#EC4899', '#3B82F6'][Math.floor(Math.random() * 5)],
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-sparkle-float"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: 0.65,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

/* ── Interactive 3D Tilt Wrapper for Podium Cards ── */
function TiltCard({ children, className = '', onClick }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`transition-transform duration-200 ease-out cursor-pointer ${className}`}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}

/* ── Light Stat Card ── */
function StatCard({ icon: Icon, label, value, suffix = '', iconBg, iconColor, delay = 0 }) {
  return (
    <div
      className="lb-stat-card group cursor-default"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`lb-stat-icon ${iconBg} ${iconColor}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold group-hover:text-slate-700 transition-colors">
          {label}
        </span>
        <span className="text-lg font-black text-slate-900 tabular-nums">
          {value}<span className="text-xs font-semibold text-slate-500 ml-0.5">{suffix}</span>
        </span>
      </div>
    </div>
  );
}

/* ── Rank Change Pill ── */
function RankChange({ rank }) {
  const seed = parseInt(rank) * 7 + 3;
  const type = seed % 3;
  const amount = (seed % 3) + 1;

  if (type === 0) return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
      <ArrowUp className="w-2.5 h-2.5 text-emerald-600" /> +{amount}
    </span>
  );
  if (type === 1) return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-mono font-bold text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-full">
      <Minus className="w-2.5 h-2.5 text-slate-400" /> 0
    </span>
  );
  return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-mono font-bold text-rose-600 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded-full">
      <ArrowDown className="w-2.5 h-2.5 text-rose-500" /> -{amount}
    </span>
  );
}

export default function CampusLeaderboard({ onToast }) {
  const [activeTab, setActiveTab] = useState('xp'); // 'xp' | 'active' | 'hard'
  const [scope, setScope] = useState('All colleges');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [podiumVisible, setPodiumVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [cheersCount, setCheersCount] = useState({});
  const podiumRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPodiumVisible(true);
      },
      { threshold: 0.2 }
    );
    if (podiumRef.current) observer.observe(podiumRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredRankings = rankingsData.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.college.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { key: 'xp', label: 'XP Leaders', icon: Trophy, activeColor: 'text-amber-600' },
    { key: 'active', label: 'Most Active', icon: Flame, activeColor: 'text-rose-600' },
    { key: 'hard', label: 'Hard Solvers', icon: Target, activeColor: 'text-purple-600' },
  ];

  const handleTabChange = (key, label) => {
    setActiveTab(key);
    if (onToast) onToast(`Switched to: ${label}`);
    fireConfetti(0.5, 0.5);
  };

  const handlePodiumClick = (winner, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height / 2) / window.innerHeight;
    fireConfetti(originX, originY);
    setSelectedStudent({
      ...winner,
      solvedCount: winner.rank === '01' ? 412 : winner.rank === '02' ? 324 : 188,
      streak: winner.rank === '01' ? '28 Days' : winner.rank === '02' ? '19 Days' : '12 Days',
      accuracy: winner.rank === '01' ? '96.4%' : winner.rank === '02' ? '92.1%' : '88.7%',
      targetCompany: winner.rank === '01' ? 'Google / Atlassian' : winner.rank === '02' ? 'Amazon / Cisco' : 'TCS Digital / Infosys DSE'
    });
  };

  const handleRowClick = (student, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height / 2) / window.innerHeight;
    fireConfetti(originX, originY);
    setSelectedStudent({
      ...student,
      solvedCount: Math.floor(parseFloat(student.xp) * 0.42),
      streak: `${Math.floor(parseInt(student.rank) * 1.5) + 3} Days`,
      accuracy: `${(90 - parseInt(student.rank) * 0.8).toFixed(1)}%`,
      targetCompany: 'Product & High-Package Roles'
    });
  };

  const handleCheerStudent = () => {
    if (!selectedStudent) return;
    const id = selectedStudent.name;
    setCheersCount(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    fireConfetti(0.5, 0.4);
    if (onToast) onToast(`You clapped for ${selectedStudent.name}! 🎉`);
  };

  return (
    <section className="py-16 md:py-24 border-b border-amber-200/60 relative bg-gradient-to-b from-[#FEFCE8]/60 via-[#FAF5FF] to-[#FEF9E7]/80 overflow-hidden" id="leaderboard">
      {/* Radiant ambient glow orbs behind leaderboard */}
      <div className="absolute top-16 left-1/4 w-96 h-96 bg-amber-200/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-16 right-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-100/30 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <ScrollReveal animation="fade-up" className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-widest mb-3 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300/60">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              CAMPUS MOMENTUM & INTEGRITY
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Earn your <span className="lb-gradient-text">spot</span>
              <span className="text-amber-500">.</span>
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-slate-600 text-sm md:text-base max-w-md font-medium leading-relaxed">
              Celebrate consistent effort with student rankings, campus leaderboards, and an undeniable sense of momentum across college batches.
            </p>
            <button
              onClick={() => {
                fireBigCelebration();
                if (onToast) onToast('🎊 Cheering on all campus coders!');
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-extrabold text-xs shadow-md hover:shadow-lg hover:shadow-amber-400/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shrink-0 font-mono"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              Celebrate Solvers 🎉
            </button>
          </div>
        </ScrollReveal>

        {/* Stat Summary Strip (Light theme) */}
        <ScrollReveal animation="fade-up" delay={60}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 max-w-4xl mx-auto">
            <StatCard 
              icon={Users} 
              label="Active Solvers" 
              value="2,847" 
              iconBg="bg-blue-50" 
              iconColor="text-blue-600" 
              delay={0} 
            />
            <StatCard 
              icon={Zap} 
              label="XP Earned Today" 
              value="14.2K" 
              iconBg="bg-amber-50" 
              iconColor="text-amber-600" 
              delay={100} 
            />
            <StatCard 
              icon={Flame} 
              label="Active Streaks" 
              value="432" 
              iconBg="bg-rose-50" 
              iconColor="text-rose-600" 
              delay={200} 
            />
            <StatCard 
              icon={Award} 
              label="Badges Unlocked" 
              value="1,293" 
              iconBg="bg-purple-50" 
              iconColor="text-purple-600" 
              delay={300} 
            />
          </div>
        </ScrollReveal>

        {/* Main Light Glass Leaderboard Card */}
        <ScrollReveal animation="fade-up" delay={80}>
          <div className="lb-main-card max-w-5xl mx-auto space-y-6 sm:space-y-8 p-5 sm:p-9 relative">
            
            {/* Filter & Search Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/70">
              
              {/* Category Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-xl border border-slate-200/80 shadow-xs">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => handleTabChange(tab.key, tab.label)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-300 flex items-center gap-1.5 ${
                      activeTab === tab.key
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <tab.icon className={`w-3.5 h-3.5 ${activeTab === tab.key ? tab.activeColor : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Search & Scope Dropdown */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-60">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search student or college..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-all font-mono"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>

                <select
                  value={scope}
                  onChange={(e) => {
                    setScope(e.target.value);
                    if (onToast) onToast(`Filtered: ${e.target.value}`);
                  }}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:border-purple-600 font-semibold shadow-xs cursor-pointer hover:bg-white transition-colors"
                >
                  <option>All colleges</option>
                  <option>Dhaanish COE</option>
                  <option>Government Engineering College</option>
                  <option>Non-Institutional</option>
                </select>
              </div>
            </div>

            {/* ═══ 3D Animated Podium with Light Pillars ═══ */}
            <div ref={podiumRef} className="relative pt-6 pb-2">
              <LeaderboardParticles />

              <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end max-w-xl mx-auto">
                
                {/* 🥈 #2 Srimathi */}
                <TiltCard onClick={(e) => handlePodiumClick(podiumData[1], e)} className="flex flex-col items-center text-center group">
                  <div
                    className={`relative mb-2 transition-all duration-700 ${
                      podiumVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: '0.25s' }}
                  >
                    <ProgressRing
                      radius={40}
                      stroke={3.5}
                      progress={78}
                      color="#0D9488"
                      delay={200}
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-teal-600 text-white font-black text-2xl flex items-center justify-center shadow-md border-2 border-teal-300 group-hover:scale-105 transition-transform duration-300">
                        S
                      </div>
                    </ProgressRing>

                    {/* Medal */}
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl animate-float-medal z-20">
                      🥈
                    </span>
                    <span className="absolute -bottom-1 -right-1 bg-white border border-teal-300 text-teal-800 font-mono text-xs font-black px-2 py-0.5 rounded-full shadow-xs z-20">
                      2
                    </span>
                  </div>

                  <div
                    className={`transition-all duration-700 ${
                      podiumVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: '0.45s' }}
                  >
                    <div className="font-extrabold text-slate-900 text-sm sm:text-base mt-2 group-hover:text-teal-700 transition-colors">
                      Srimathi
                    </div>
                    <div className="text-[11px] font-mono text-slate-500">Non-Institutional Student</div>
                    <div className="text-sm font-mono font-bold text-teal-700 mt-1">
                      <AnimatedXP value="1749.03" /> <span className="text-[10px] text-teal-600">XP</span>
                    </div>
                  </div>

                  {/* Podium Pillar */}
                  <div
                    className="w-full mt-3 rounded-t-2xl bg-gradient-to-t from-teal-200/90 via-teal-100/80 to-teal-50 border-t-2 border-teal-400 border-x border-teal-200/70 overflow-hidden relative shadow-sm transition-all duration-1000 ease-out"
                    style={{ height: podiumVisible ? '88px' : '0px', transitionDelay: '0.2s' }}
                  >
                    <div className="absolute inset-0 lb-podium-shimmer" />
                    <div className="w-full h-full flex items-center justify-center text-teal-700 font-black text-xl font-mono opacity-60">
                      II
                    </div>
                  </div>
                </TiltCard>

                {/* 👑 #1 Ronia Rosario K (Center / Gold) */}
                <TiltCard onClick={(e) => handlePodiumClick(podiumData[0], e)} className="flex flex-col items-center text-center group">
                  <div
                    className={`relative mb-2 transition-all duration-700 ${
                      podiumVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90'
                    }`}
                    style={{ transitionDelay: '0.1s' }}
                  >
                    {/* Rotating Halo Ring */}
                    <div 
                      className="absolute -inset-2.5 rounded-full animate-halo-rotate opacity-75 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: 'conic-gradient(from 0deg, #FFD83D, #F59E0B, #7928CA, #FFD83D)',
                        filter: 'blur(2px)',
                        borderRadius: '50%'
                      }}
                    />

                    <div className="relative z-10 bg-white p-1 rounded-full shadow-lg">
                      <ProgressRing
                        radius={46}
                        stroke={4}
                        progress={100}
                        color="#F59E0B"
                        delay={100}
                      >
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 text-white font-black text-3xl flex items-center justify-center shadow-md border-2 border-amber-300 group-hover:scale-105 transition-transform duration-300">
                          R
                        </div>
                      </ProgressRing>
                    </div>

                    {/* Animated Crown */}
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl animate-crown-bounce z-20 drop-shadow-sm">
                      👑
                    </span>
                    <span className="absolute -bottom-1 -right-1 bg-slate-900 text-amber-300 font-mono text-xs font-black px-2.5 py-0.5 rounded-full shadow-md z-20 border border-amber-300/60">
                      #1
                    </span>
                  </div>

                  <div
                    className={`transition-all duration-700 ${
                      podiumVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: '0.35s' }}
                  >
                    <div className="font-black text-slate-900 text-base sm:text-lg mt-2 group-hover:text-amber-600 transition-colors">
                      Ronia Rosario K
                    </div>
                    <div className="text-[11px] font-mono text-slate-500">Non-Institutional Student</div>
                    <div className="text-base font-mono font-black text-amber-600 mt-1">
                      <AnimatedXP value="2739.53" duration={2000} /> <span className="text-xs text-amber-500">XP</span>
                    </div>
                  </div>

                  {/* Tallest Podium Pillar */}
                  <div
                    className="w-full mt-3 rounded-t-2xl bg-gradient-to-t from-amber-300/90 via-amber-200/80 to-amber-100 border-t-2 border-amber-500 border-x border-amber-300/70 overflow-hidden relative shadow-md transition-all duration-1000 ease-out"
                    style={{ height: podiumVisible ? '132px' : '0px', transitionDelay: '0s' }}
                  >
                    <div className="absolute inset-0 lb-podium-shimmer" />
                    <div className="w-full h-full flex items-center justify-center relative z-10 text-amber-700">
                      <Trophy className="w-9 h-9 opacity-50" />
                    </div>
                  </div>
                </TiltCard>

                {/* 🥉 #3 PAVAN KUMAR */}
                <TiltCard onClick={(e) => handlePodiumClick(podiumData[2], e)} className="flex flex-col items-center text-center group">
                  <div
                    className={`relative mb-2 transition-all duration-700 ${
                      podiumVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: '0.4s' }}
                  >
                    <ProgressRing
                      radius={38}
                      stroke={3}
                      progress={48}
                      color="#6366F1"
                      delay={300}
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-md border-2 border-indigo-300 group-hover:scale-105 transition-transform duration-300">
                        PK
                      </div>
                    </ProgressRing>

                    {/* Medal */}
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl animate-float-medal z-20">
                      🥉
                    </span>
                    <span className="absolute -bottom-1 -right-1 bg-white border border-indigo-300 text-indigo-800 font-mono text-xs font-black px-2 py-0.5 rounded-full shadow-xs z-20">
                      3
                    </span>
                  </div>

                  <div
                    className={`transition-all duration-700 ${
                      podiumVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: '0.6s' }}
                  >
                    <div className="font-extrabold text-slate-900 text-sm sm:text-base mt-2 group-hover:text-indigo-700 transition-colors">
                      PAVAN KUMAR
                    </div>
                    <div className="text-[11px] font-mono text-slate-500">Non-Institutional Student</div>
                    <div className="text-sm font-mono font-bold text-indigo-700 mt-1">
                      <AnimatedXP value="494.83" /> <span className="text-[10px] text-indigo-600">XP</span>
                    </div>
                  </div>

                  {/* Podium Pillar */}
                  <div
                    className="w-full mt-3 rounded-t-2xl bg-gradient-to-t from-indigo-200/90 via-indigo-100/80 to-indigo-50 border-t-2 border-indigo-400 border-x border-indigo-200/70 overflow-hidden relative shadow-sm transition-all duration-1000 ease-out"
                    style={{ height: podiumVisible ? '64px' : '0px', transitionDelay: '0.35s' }}
                  >
                    <div className="absolute inset-0 lb-podium-shimmer" />
                    <div className="w-full h-full flex items-center justify-center text-indigo-700 font-black text-lg font-mono opacity-60">
                      III
                    </div>
                  </div>
                </TiltCard>

              </div>

              {/* Live Ticker with glowing pulse */}
              <div className="flex items-center justify-center gap-2 pt-6 text-[11px] font-mono text-slate-600 font-medium">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>LIVE CAMPUS RANKINGS · UPDATED EVERY 15 MIN</span>
                <span className="text-slate-400 font-normal">· Click any solver for breakdown</span>
              </div>
            </div>

            {/* ═══ Rankings Table with Smooth Hover Effects ═══ */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs bg-white">
              
              {/* Header */}
              <div className="grid grid-cols-12 bg-slate-50/90 px-4 sm:px-5 py-3 text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <span className="col-span-1">Rank</span>
                <span className="col-span-1">Δ</span>
                <span className="col-span-7">Student & Campus</span>
                <span className="col-span-3 text-right">XP Earned</span>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-slate-100">
                {filteredRankings.map((u, idx) => (
                  <div
                    key={u.rank}
                    onClick={(e) => handleRowClick(u, e)}
                    onMouseEnter={() => setHoveredRow(idx)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`grid grid-cols-12 items-center px-4 sm:px-5 py-3.5 transition-all duration-200 text-xs font-medium cursor-pointer leaderboard-row group relative ${
                      hoveredRow === idx ? 'bg-purple-50/70' : 'hover:bg-slate-50/80'
                    }`}
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    {/* Left Accent Bar on Hover */}
                    {hoveredRow === idx && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-purple-600 rounded-r" />
                    )}

                    {/* Rank Badge */}
                    <div className="col-span-1 flex items-center">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition-all duration-200 ${
                        hoveredRow === idx
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {u.rank}
                      </span>
                    </div>

                    {/* Rank Change Indicator */}
                    <div className="col-span-1 flex items-center">
                      <RankChange rank={u.rank} />
                    </div>

                    {/* Student Info */}
                    <div className="col-span-7 flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full ${u.color} flex items-center justify-center font-bold text-xs shrink-0 shadow-xs group-hover:scale-110 transition-transform duration-200`}>
                        {u.avatar}
                      </span>
                      <div>
                        <div className="font-bold text-slate-900 text-sm group-hover:text-purple-700 transition-colors flex items-center gap-1.5">
                          {u.name}
                          {idx === 0 && (
                            <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded border border-amber-300">
                              🔥 Hot
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-mono text-slate-500">{u.college}</div>
                      </div>
                    </div>

                    {/* XP & Progress Mini Bar */}
                    <div className="col-span-3 text-right font-mono font-bold text-slate-900 flex items-center justify-end gap-2.5">
                      <div className="hidden sm:block w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-amber-400 transition-all duration-1000 ease-out xp-bar-fill"
                          style={{ '--target-w': `${Math.min(100, (parseFloat(u.xp) / 2739.53) * 100)}%` }}
                        />
                      </div>
                      <span className="group-hover:text-purple-700 transition-colors">
                        {u.xp} <span className="text-slate-400 text-[10px]">XP</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with Pagination */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <span>Showing ranks 4–13 of 50 below podium</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-600">🔄 Updated 11:17 am</span>
              </div>

              {/* Pagination < 1 2 3 4 5 > */}
              <div className="flex items-center gap-1 font-bold">
                <button
                  onClick={() => setActivePage(Math.max(1, activePage - 1))}
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {[1, 2, 3, 4, 5].map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setActivePage(p);
                      if (onToast) onToast(`Loaded leaderboard page ${p}`);
                      fireConfetti(0.5, 0.7);
                    }}
                    className={`w-7 h-7 rounded-lg transition-all duration-200 ${
                      activePage === p
                        ? 'bg-purple-700 text-white shadow-xs'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setActivePage(Math.min(5, activePage + 1))}
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>

      {/* ═══ Interactive Student Profile Modal (Popup on Solver Click) ═══ */}
      {selectedStudent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedStudent(null)}
        >
          <div 
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 relative animate-scaleIn space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header with avatar & name */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-amber-500 text-white font-black text-2xl flex items-center justify-center shadow-md">
                {selectedStudent.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-extrabold text-slate-900">{selectedStudent.name}</h3>
                  <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
                    Rank #{selectedStudent.rank}
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-500 mt-0.5">{selectedStudent.college}</p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <div className="text-center">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">XP Score</span>
                <span className="text-base font-black text-slate-900 font-mono">{selectedStudent.xp}</span>
              </div>
              <div className="text-center border-x border-slate-200">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Streak</span>
                <span className="text-base font-black text-rose-600 font-mono flex items-center justify-center gap-0.5">
                  <Flame className="w-3.5 h-3.5" /> {selectedStudent.streak}
                </span>
              </div>
              <div className="text-center">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Accuracy</span>
                <span className="text-base font-black text-emerald-600 font-mono">{selectedStudent.accuracy}</span>
              </div>
            </div>

            {/* Student Verified Placement Track */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Placement Target:</span>
                <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  {selectedStudent.targetCompany}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Integrity Badge:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Proctored 100%
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleCheerStudent}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 font-mono"
              >
                <Heart className="w-4 h-4 fill-white" />
                Cheer Solver {cheersCount[selectedStudent.name] ? `(${cheersCount[selectedStudent.name]})` : ''}
              </button>
              <button
                onClick={() => setSelectedStudent(null)}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors font-mono"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
