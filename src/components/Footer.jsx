import React, { useState } from 'react';
import { 
  ArrowUp, ArrowUpRight, Phone, MessageSquare, Mail, MapPin, 
  ShieldCheck, CheckCircle2, Copy, Check, ExternalLink 
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const [copiedField, setCopiedField] = useState(null);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopy = (field, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // 8 Official Accreditations with Dedicated Logos and Animations
  const accreditations = [
    {
      id: 'msme',
      title: 'Ministry of MSME',
      sub: 'Govt. of India',
      subColor: 'text-slate-500',
      glow: 'group-hover:border-amber-400 group-hover:shadow-amber-100',
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7 transition-transform duration-300 group-hover:scale-110">
          {/* Saffron-White-Green Tricolor Cogwheel */}
          <circle cx="20" cy="20" r="16" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="1.5" />
          <path d="M20 7v26M7 20h26M10.8 10.8l18.4 18.4M10.8 29.2L29.2 10.8" stroke="#F59E0B" strokeWidth="1.2" opacity="0.4" />
          {/* National Ashoka Chakra Center */}
          <circle cx="20" cy="20" r="6" fill="#000080" />
          <circle cx="20" cy="20" r="3" fill="#FFFFFF" />
          {/* Top saffron accent & bottom green accent */}
          <path d="M12 11c2.4-1.5 5.1-2.2 8-2.2s5.6.7 8 2.2" stroke="#FF9933" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M12 29c2.4 1.5 5.1 2.2 8 2.2s5.6-.7 8-2.2" stroke="#138808" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      )
    },
    {
      id: 'dpiit',
      title: 'DPIIT',
      sub: '#startupindia',
      subColor: 'text-amber-700 font-bold',
      glow: 'group-hover:border-orange-400 group-hover:shadow-orange-100',
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
          {/* Startup India Wing / Rocket Emblem */}
          <rect width="40" height="40" rx="10" fill="#FFF7ED" />
          <path d="M13 28L20 9l7 19-7-4-7 4z" fill="#EA580C" />
          <path d="M20 9l7 19-7-4V9z" fill="#C2410C" />
          {/* Tricolor Flames */}
          <circle cx="16" cy="28" r="2.5" fill="#138808" />
          <circle cx="20" cy="30" r="2.5" fill="#000080" />
          <circle cx="24" cy="28" r="2.5" fill="#FF9933" />
        </svg>
      )
    },
    {
      id: 'iso',
      title: 'ISO 9001:2015',
      sub: 'CERTIFIED',
      subColor: 'text-emerald-700 font-bold',
      glow: 'group-hover:border-emerald-400 group-hover:shadow-emerald-100',
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
          {/* ISO Quality Star / Laurel Seal */}
          <circle cx="20" cy="20" r="16" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" strokeDasharray="3 1.5" />
          <circle cx="20" cy="20" r="12" fill="#059669" />
          <path d="M15 20l3.5 3.5L25 16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      )
    },
    {
      id: 'mca',
      title: 'Corp. Affairs',
      sub: 'Govt. of India',
      subColor: 'text-slate-500',
      glow: 'group-hover:border-blue-400 group-hover:shadow-blue-100',
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7 transition-transform duration-300 group-hover:scale-110">
          {/* National Emblem Pillars / Lion Capital */}
          <rect width="40" height="40" rx="10" fill="#EFF6FF" />
          <path d="M14 28h12M16 28V16M20 28V14M24 28V16M13 14h14l-2-4H15l-2 4z" stroke="#1D4ED8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="20" cy="21" r="2" fill="#1D4ED8" />
        </svg>
      )
    },
    {
      id: 'aicte',
      title: 'AICTE Portal',
      sub: 'Internship Portal',
      subColor: 'text-purple-700 font-bold',
      glow: 'group-hover:border-purple-400 group-hover:shadow-purple-100',
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
          {/* AICTE Swan & Lamp of Learning */}
          <rect width="40" height="40" rx="10" fill="#FAF5FF" />
          <path d="M12 18l8-5 8 5-8 5-8-5z" fill="#7928CA" />
          <path d="M16 21v4c0 2.2 1.8 4 4 4s4-1.8 4-4v-4" stroke="#7928CA" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <circle cx="27" cy="22" r="1.5" fill="#F59E0B" />
        </svg>
      )
    },
    {
      id: 'ncs',
      title: 'Career Service',
      sub: 'National Portal',
      subColor: 'text-slate-500',
      glow: 'group-hover:border-cyan-400 group-hover:shadow-cyan-100',
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7 transition-transform duration-300 group-hover:scale-110">
          {/* National Career Service Compass Network */}
          <rect width="40" height="40" rx="10" fill="#ECFEFF" />
          <circle cx="20" cy="20" r="14" stroke="#0891B2" strokeWidth="1.5" fill="none" />
          <path d="M16 24l8-4-4-8-4 12z" fill="#0E7490" />
          <circle cx="20" cy="20" r="2" fill="#FFFFFF" />
        </svg>
      )
    },
    {
      id: 'naps',
      title: 'NAPS',
      sub: 'Govt. Scheme',
      subColor: 'text-blue-700 font-bold',
      glow: 'group-hover:border-indigo-400 group-hover:shadow-indigo-100',
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7 transition-transform duration-300 group-hover:scale-110">
          {/* NAPS National Apprenticeship Badge */}
          <rect width="40" height="40" rx="10" fill="#EEF2FF" />
          <path d="M20 8l3.5 7 7.5 1-5.5 5.5 1.5 7.5L20 25.5 13 29l1.5-7.5-5.5-5.5 7.5-1L20 8z" fill="#4F46E5" />
          <circle cx="20" cy="18" r="3" fill="#FFFFFF" />
        </svg>
      )
    },
    {
      id: 'skill-india',
      title: 'Skill India',
      sub: 'Certified',
      subColor: 'text-amber-800 font-bold',
      glow: 'group-hover:border-yellow-400 group-hover:shadow-yellow-100',
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
          {/* Kaushal Bharat Rising Sun / Hand of Skill */}
          <rect width="40" height="40" rx="10" fill="#FEFCE8" />
          <circle cx="20" cy="20" r="8" fill="#F59E0B" />
          <path d="M20 7v4M20 29v4M7 20h4M29 20h4M11 11l3 3M26 26l3 3M11 29l3-3M26 14l3-3" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
          <circle cx="20" cy="20" r="4" fill="#FFFFFF" />
        </svg>
      )
    },
  ];

  return (
    <footer className="border-t border-purple-200/60 bg-gradient-to-b from-[#F5EEFD] to-[#FEFDF2] text-slate-600 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact and Office Bar (from PDF Page 19 & 20) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-200 text-xs">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-purple-300 transition-colors">
            <Phone className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-mono text-slate-500 font-bold uppercase text-[10px]">CALL US</div>
              <div className="font-bold text-slate-900 mt-0.5">+91 87542 00247</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors">
            <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-mono text-slate-500 font-bold uppercase text-[10px]">WHATSAPP</div>
              <div className="font-bold text-slate-900 mt-0.5">Chat with our team ↗</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-amber-300 transition-colors">
            <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-mono text-slate-500 font-bold uppercase text-[10px]">EMAIL SUPPORT</div>
              <div className="font-bold text-slate-900 mt-0.5">support@dkoder.co.in</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-rose-300 transition-colors">
            <MapPin className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-mono text-slate-500 font-bold uppercase text-[10px]">HEAD OFFICE</div>
              <div className="text-[11px] text-slate-700 leading-tight mt-0.5 font-medium">
                Campus 1A, No. 143, Dr. M.G.R. Road, Perungudi, Chennai 600096
              </div>
            </div>
          </div>
        </div>

        {/* Main Brand Showcase & 4-Column Footer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-12 border-b border-slate-200 text-xs">
          
          {/* Brand Identity Column (Col span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo size="lg" showTagline tagline="Placement Prep, With A Plan" />
            
            <p className="text-slate-600 text-xs leading-relaxed max-w-sm font-medium">
              A clearer, structured path to placement readiness. Company journeys, practice routes, interactive question bank, and campus insights—without the random grind.
            </p>

            {/* Official Startup Accreditation Chip */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100/90 text-amber-900 border border-amber-300 font-mono text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                DPIIT #startupindia
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100/90 text-emerald-900 border border-emerald-300 font-mono text-[10px] font-bold">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                ISO 9001:2015
              </span>
            </div>

            <div className="pt-2 text-[11px] font-mono text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>All Systems Operational · Round Ready</span>
            </div>
          </div>

          {/* Nav Links Columns (Col span 8) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {/* Col 1: For students */}
            <div className="space-y-3">
              <div className="font-mono font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <span>🎓</span> STUDENTS
              </div>
              <ul className="space-y-2 font-medium">
                <li><a href="#destination" className="hover:text-purple-700 transition-colors">Practice Paths</a></li>
                <li><a href="#calculator" className="hover:text-purple-700 transition-colors">Readiness Quiz</a></li>
                <li><a href="#question-bank" className="hover:text-purple-700 transition-colors">Coding Practice</a></li>
                <li><a href="#leaderboard" className="hover:text-purple-700 transition-colors">Leaderboard</a></li>
                <li><a href="#daily" className="hover:text-purple-700 transition-colors">Daily Routine</a></li>
                <li><a href="#pricing" className="hover:text-purple-700 transition-colors">Pricing & Pass</a></li>
              </ul>
            </div>

            {/* Col 2: For institutions */}
            <div className="space-y-3">
              <div className="font-mono font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <span>🏛️</span> COLLEGES
              </div>
              <ul className="space-y-2 font-medium">
                <li><a href="#institutions" className="hover:text-purple-700 transition-colors">Campus MOU</a></li>
                <li><a href="#institutions" className="hover:text-purple-700 transition-colors">Placement Cells</a></li>
                <li><a href="#security" className="hover:text-purple-700 transition-colors">Integrity Console</a></li>
                <li><a href="#institutions" className="hover:text-purple-700 transition-colors">Institution Sign-in</a></li>
                <li><a href="#institutions" className="hover:text-purple-700 transition-colors">Host Hackathons</a></li>
              </ul>
            </div>

            {/* Col 3: Programmes */}
            <div className="space-y-3">
              <div className="font-mono font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <span>🏆</span> TRACKS
              </div>
              <ul className="space-y-2 font-medium">
                <li><a href="#explore" className="hover:text-purple-700 transition-colors">TCS / Infosys Prep</a></li>
                <li><a href="#explore" className="hover:text-purple-700 transition-colors">Product 20+ LPA</a></li>
                <li><a href="#explore" className="hover:text-purple-700 transition-colors">100 Days Streak</a></li>
                <li><a href="#explore" className="hover:text-purple-700 transition-colors">Topic Certifications</a></li>
                <li><a href="#explore" className="hover:text-purple-700 transition-colors">DSA Roadmaps</a></li>
              </ul>
            </div>

            {/* Col 4: Help & support */}
            <div className="space-y-3">
              <div className="font-mono font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <span>🎧</span> SUPPORT
              </div>
              <ul className="space-y-2 font-medium">
                <li><a href="#faq" className="hover:text-purple-700 transition-colors">FAQs</a></li>
                <li><a href="https://wa.me/918754200247" className="hover:text-purple-700 transition-colors">WhatsApp Help</a></li>
                <li><a href="mailto:support@dkoder.co.in" className="hover:text-purple-700 transition-colors">Email Support</a></li>
                <li><a href="#home" className="hover:text-purple-700 transition-colors">Portal Login</a></li>
                <li><a href="#pricing" className="hover:text-purple-700 transition-colors">Scholarship Aid</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* ═══ Government Accreditations & Recognitions with Official Logos & Animations ═══ */}
        <div className="py-10 border-b border-slate-200">
          <div className="text-center mb-6">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500 bg-white/80 px-3.5 py-1 rounded-full border border-slate-200 shadow-xs">
              OFFICIAL ACCREDITATIONS & RECOGNITIONS
            </span>
          </div>

          {/* 8 Accreditation Cards with Logos & Hover Micro-Interactions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 text-center items-stretch">
            {accreditations.map((item) => (
              <div 
                key={item.id}
                className={`p-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between group cursor-default hover:-translate-y-1.5 ${item.glow}`}
              >
                {/* Logo with smooth hover animation */}
                <div className="my-1.5 flex items-center justify-center">
                  {item.logo}
                </div>

                {/* Text Labels */}
                <div className="w-full mt-1">
                  <div className="text-[11px] font-extrabold text-slate-800 leading-tight group-hover:text-slate-950 transition-colors">
                    {item.title}
                  </div>
                  <div className={`text-[9px] font-mono mt-0.5 leading-tight ${item.subColor}`}>
                    {item.sub}
                  </div>
                </div>

                {/* Subtle verified check indicator */}
                <div className="w-full pt-1.5 mt-1 border-t border-slate-100 flex items-center justify-center">
                  <span className="text-[8px] font-mono font-bold text-slate-400 group-hover:text-emerald-600 transition-colors flex items-center gap-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-60 group-hover:opacity-100 group-hover:animate-ping" />
                    VERIFIED
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Statutory Registration Numbers (Click to Copy) */}
          <div className="mt-8 pt-4 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-mono text-slate-500">
            {[
              { label: 'CIN', val: 'U85500TN2025PTC182250' },
              { label: 'MSME Udyam', val: 'UDYAM-TN-08-0120538' },
              { label: 'DPIIT', val: 'DIPP218224' },
              { label: 'ISO 9001:2015', val: 'QMS/OA86/0825' },
            ].map((reg, idx) => (
              <React.Fragment key={reg.label}>
                <button
                  onClick={() => handleCopy(reg.label, reg.val)}
                  title={`Click to copy ${reg.label} registration`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 hover:border-purple-300 hover:text-purple-700 transition-all text-[10px] sm:text-[11px] font-mono group cursor-pointer"
                >
                  <span className="font-bold text-slate-700">{reg.label}:</span>
                  <span className="text-slate-600 group-hover:text-purple-700">{reg.val}</span>
                  {copiedField === reg.label ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-400 group-hover:text-purple-600 opacity-50 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
                {idx < 3 && <span className="text-slate-300 hidden sm:inline">•</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2.5">
            <BrandLogo variant="badge" size="sm" href="#home" />
            <span>© 2026 Dkoder. All rights reserved.</span>
          </div>

          <span className="text-slate-700 font-bold tracking-wider hidden sm:inline-block">
            Practice · Learn · Achieve
          </span>

          <button
            onClick={scrollToTop}
            className="text-purple-700 hover:text-slate-900 font-bold flex items-center gap-1 transition-colors px-2 py-1 rounded-md hover:bg-white/60"
          >
            ↑ Back to top
          </button>
        </div>

      </div>
    </footer>
  );
}
