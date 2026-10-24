import React, { useState } from 'react';
import { ArrowDownRight, ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

// SVG Brand logos as authentic vector inline components
const logos = {
  TCS: () => (
    <svg viewBox="0 0 135 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tata classic oval symbol */}
      <g transform="translate(1, 3)">
        <ellipse cx="13" cy="13" rx="13" ry="12" fill="#005A9C" />
        {/* Tata twin upward curves */}
        <path
          d="M7 8 C9.5 15 10.5 18 13 21 C15.5 18 16.5 15 19 8 C17.5 12 15.5 15.5 13 17.5 C10.5 15.5 8.5 12 7 8Z"
          fill="#FFFFFF"
        />
        <path
          d="M8.5 7.5 C10 7 16 7 17.5 7.5 C15 10 13 11 13 13 C13 11 11 10 8.5 7.5Z"
          fill="#FFFFFF"
        />
      </g>
      {/* TATA CONSULTANCY SERVICES typography */}
      <text x="32" y="15" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="13" fill="#005A9C" letterSpacing="0.8">
        TATA
      </text>
      <text x="32" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="7.5" fill="#E01E37" letterSpacing="0.3">
        CONSULTANCY SERVICES
      </text>
    </svg>
  ),
  INFOSYS: () => (
    <svg viewBox="0 0 110 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text
        x="2"
        y="21"
        fontFamily="system-ui, -apple-system, 'Trebuchet MS', sans-serif"
        fontWeight="800"
        fontSize="19"
        fill="#007CC3"
        letterSpacing="-0.4"
      >
        Infosys
      </text>
      <rect x="2" y="25" width="65" height="2" rx="1" fill="#007CC3" opacity="0.3" />
      <circle cx="70" cy="26" r="1.5" fill="#007CC3" />
    </svg>
  ),
  WIPRO: () => (
    <svg viewBox="0 0 115 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Multi-colored dots flower emblem */}
      <g transform="translate(13, 16)">
        <circle cx="0" cy="0" r="2.2" fill="#3C3C3B" />
        {/* Ring 1 - inner dots */}
        <circle cx="0" cy="-5.5" r="1.6" fill="#DA291C" />
        <circle cx="3.8" cy="-3.8" r="1.6" fill="#E87722" />
        <circle cx="5.5" cy="0" r="1.6" fill="#FFC72C" />
        <circle cx="3.8" cy="3.8" r="1.6" fill="#43B02A" />
        <circle cx="0" cy="5.5" r="1.6" fill="#00A88F" />
        <circle cx="-3.8" cy="3.8" r="1.6" fill="#0066B2" />
        <circle cx="-5.5" cy="0" r="1.6" fill="#512D6D" />
        <circle cx="-3.8" cy="-3.8" r="1.6" fill="#D91E5B" />

        {/* Ring 2 - outer harmonic rainbow dots */}
        <circle cx="0" cy="-10.5" r="1.9" fill="#DA291C" />
        <circle cx="5.2" cy="-9.2" r="1.9" fill="#E87722" />
        <circle cx="9.2" cy="-5.2" r="1.9" fill="#FFC72C" />
        <circle cx="10.5" cy="0" r="1.9" fill="#78BE20" />
        <circle cx="9.2" cy="5.2" r="1.9" fill="#00A88F" />
        <circle cx="5.2" cy="9.2" r="1.9" fill="#00A3E0" />
        <circle cx="0" cy="10.5" r="1.9" fill="#0066B2" />
        <circle cx="-5.2" cy="9.2" r="1.9" fill="#512D6D" />
        <circle cx="-9.2" cy="5.2" r="1.9" fill="#7928CA" />
        <circle cx="-10.5" cy="0" r="1.9" fill="#D91E5B" />
        <circle cx="-9.2" cy="-5.2" r="1.9" fill="#E40046" />
        <circle cx="-5.2" cy="-9.2" r="1.9" fill="#FF585D" />
      </g>
      {/* wipro lowercase typography */}
      <text
        x="32"
        y="21"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="17"
        fill="#25282A"
        letterSpacing="-0.3"
      >
        wipro
      </text>
    </svg>
  ),
  COGNIZANT: () => (
    <svg viewBox="0 0 120 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(3, 5)">
        <circle cx="11" cy="11" r="10" stroke="#0033A0" strokeWidth="2.5" strokeDasharray="45 15" fill="none" />
        <circle cx="11" cy="11" r="4.5" fill="#0033A0" />
      </g>
      <text
        x="30"
        y="21"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="15"
        fill="#0033A0"
        letterSpacing="-0.2"
      >
        cognizant
      </text>
    </svg>
  ),
  CAPGEMINI: () => (
    <svg viewBox="0 0 120 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(2, 4)">
        <path
          d="M11 2 C8 6, 2 10, 2 14 C2 17 4.5 19 7.5 19 C9.5 19 10.5 17.5 11 16.5 C11.5 17.5 12.5 19 14.5 19 C17.5 19 20 17 20 14 C20 10, 14 6, 11 2 Z"
          fill="#0070AD"
        />
        <path d="M10 16 L8 22 L14 22 L12 16 Z" fill="#0070AD" />
      </g>
      <text
        x="28"
        y="20"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="14"
        fill="#0070AD"
        letterSpacing="-0.2"
      >
        Capgemini
      </text>
    </svg>
  ),
  ACCENTURE: () => (
    <svg viewBox="0 0 115 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text
        x="2"
        y="21"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="16"
        fill="#121212"
        letterSpacing="-0.3"
      >
        accenture
      </text>
      {/* Signature chevron above 't' */}
      <path
        d="M51 7 L55.5 10 L51 13"
        stroke="#A100FF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
  AMAZON: () => (
    <svg viewBox="0 0 100 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text
        x="2"
        y="19"
        fontFamily="system-ui, -apple-system, 'Amazon Ember', 'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="19"
        fill="#131921"
        letterSpacing="-0.6"
      >
        amazon
      </text>
      {/* Signature smile curved arrow from 'a' to 'z' */}
      <path
        d="M8 23.5 C24 31, 46 31, 62 23"
        stroke="#FF9900"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* Signature arrowhead with subtle curve */}
      <path
        d="M60 20.2 C61.8 21.8 65 22.8 66.8 23 C65.5 24.6 63.8 26.8 61 28.5 C61.8 26.8 62.2 25 61.2 23 Z"
        fill="#FF9900"
      />
    </svg>
  ),
  MICROSOFT: () => (
    <svg viewBox="0 0 120 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="9.5" height="9.5" fill="#F25022" />
      <rect x="13.5" y="5" width="9.5" height="9.5" fill="#7FBA00" />
      <rect x="2" y="16.5" width="9.5" height="9.5" fill="#00A4EF" />
      <rect x="13.5" y="16.5" width="9.5" height="9.5" fill="#FFB900" />
      <text
        x="30"
        y="21"
        fontFamily="Segoe UI, -apple-system, sans-serif"
        fontWeight="600"
        fontSize="15"
        fill="#454545"
        letterSpacing="-0.2"
      >
        Microsoft
      </text>
    </svg>
  ),
  GOOGLE: () => (
    <svg viewBox="0 0 105 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(2, 4)">
        <path
          d="M20.6 12.3 C20.6 11.4 20.5 10.7 20.4 10 H10.5 V14.4 H16.2 C15.9 15.9 15 17.1 13.6 18 V20.9 H17.2 C19.3 19 20.6 15.9 20.6 12.3 Z"
          fill="#4285F4"
        />
        <path
          d="M10.5 22.5 C13.7 22.5 16.5 21.4 18.4 19.6 L14.8 16.7 C13.8 17.4 12.3 17.9 10.5 17.9 C7.3 17.9 4.6 15.7 3.6 12.8 L0 15.6 C1.9 19.4 5.9 22.5 10.5 22.5 Z"
          fill="#34A853"
        />
        <path
          d="M3.6 12.8 C3.4 11.9 3.2 11 3.2 10 C3.2 9 3.4 8.1 3.6 7.2 L0 4.4 C-0.7 6.1 -1.1 8 -1.1 10 C-1.1 12 -0.7 13.9 0 15.6 L3.6 12.8 Z"
          transform="translate(1.1, 0)"
          fill="#FBBC05"
        />
        <path
          d="M10.5 5.5 C12.3 5.5 13.9 6.1 15.2 7.3 L18.5 4 C16.5 2.1 13.7 1 10.5 1 C5.9 1 1.9 4.1 0 7.9 L3.6 10.7 C4.6 7.8 7.3 5.5 10.5 5.5 Z"
          fill="#EA4335"
        />
      </g>
      <text
        x="28"
        y="21"
        fontFamily="Product Sans, system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="16"
        fill="#3C4043"
        letterSpacing="-0.2"
      >
        Google
      </text>
    </svg>
  ),
  RAZORPAY: () => (
    <svg viewBox="0 0 115 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(2, 4)">
        <polygon points="12,0 0,22 8,22 18,2" fill="#072654" />
        <polygon points="18,0 12,12 18,12 10,22 22,2" fill="#3395FF" opacity="0.9" />
      </g>
      <text
        x="28"
        y="21"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="15"
        fill="#072654"
        letterSpacing="-0.3"
      >
        razorpay
      </text>
    </svg>
  ),
  ATLASSIAN: () => (
    <svg viewBox="0 0 120 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(2, 4)">
        <path
          d="M11 2 C8 7 6 13 6 20 C9 19 13 16 15 12 C16 9 14 5 11 2 Z"
          fill="#2684FF"
        />
        <path
          d="M12 7 C14 11 16 16 16 20 C13 20 8 18 5 15 C8 12 10 9 12 7 Z"
          fill="#0052CC"
          opacity="0.85"
        />
      </g>
      <text
        x="26"
        y="21"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="15"
        fill="#0052CC"
        letterSpacing="-0.2"
      >
        Atlassian
      </text>
    </svg>
  ),
};

const companies = [
  { name: 'TCS',       tag: 'NQT & Digital',      roles: ['NQT', 'TCS Digital', 'TCS Prime'],   color: 'hover:border-red-300 hover:bg-red-50/30',      accent: 'bg-red-50 text-red-700 border-red-200',       questions: '512 Qs' },
  { name: 'AMAZON',   tag: 'SDE-I & SDE-II',     roles: ['SDE-1 ₹28L', 'SDE-2 ₹45L'],         color: 'hover:border-amber-300 hover:bg-amber-50/30',  accent: 'bg-amber-50 text-amber-700 border-amber-200',  questions: '320 Qs' },
  { name: 'WIPRO',    tag: 'NLTH & Turbo',        roles: ['NLTH', 'Turbo', 'Elite'],             color: 'hover:border-purple-300 hover:bg-purple-50/30',accent: 'bg-purple-50 text-purple-700 border-purple-200',questions: '398 Qs' },
  { name: 'INFOSYS',  tag: 'DSE & SP',            roles: ['DSE Trainee', 'SP Engineer'],        color: 'hover:border-blue-300 hover:bg-blue-50/30',    accent: 'bg-blue-50 text-blue-700 border-blue-200',     questions: '473 Qs' },
  { name: 'MICROSOFT',tag: 'SWE University',      roles: ['SWE FTE', 'SWE Intern'],              color: 'hover:border-emerald-300 hover:bg-emerald-50/30',accent: 'bg-emerald-50 text-emerald-700 border-emerald-200',questions: '290 Qs' },
  { name: 'GOOGLE',   tag: 'SWE & Cloud',         roles: ['SWE L3 ₹34L', 'Cloud Eng'],          color: 'hover:border-red-300 hover:bg-red-50/30',      accent: 'bg-red-50 text-red-700 border-red-200',       questions: '380 Qs' },
  { name: 'ACCENTURE',tag: 'ASE & FSE',           roles: ['ASE ₹4.5L', 'FSE ₹6.5L'],           color: 'hover:border-violet-300 hover:bg-violet-50/30', accent: 'bg-violet-50 text-violet-700 border-violet-200',questions: '446 Qs' },
  { name: 'COGNIZANT',tag: 'GenC & GenC Next',   roles: ['GenC', 'GenC Next', 'GenC Elevate'],  color: 'hover:border-teal-300 hover:bg-teal-50/30',    accent: 'bg-teal-50 text-teal-700 border-teal-200',     questions: '446 Qs' },
  { name: 'CAPGEMINI',tag: 'Exceller Drive',      roles: ['App Dev', 'Analytics'],               color: 'hover:border-cyan-300 hover:bg-cyan-50/30',    accent: 'bg-cyan-50 text-cyan-700 border-cyan-200',     questions: '284 Qs' },
  { name: 'RAZORPAY', tag: 'Product SWE',         roles: ['SWE ₹20L', 'Senior SWE'],            color: 'hover:border-sky-300 hover:bg-sky-50/30',      accent: 'bg-sky-50 text-sky-700 border-sky-200',        questions: '210 Qs' },
];

export default function CompanyStrip({ onSelectCompany }) {
  const [activeCompany, setActiveCompany] = useState(null);

  const handleClick = (comp) => {
    setActiveCompany(comp.name === activeCompany ? null : comp.name);
    onSelectCompany?.(comp.name);
  };

  return (
    <div className="py-12 border-b border-purple-100/80 bg-white/80 backdrop-blur-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-amber-600 uppercase mb-1">
                <span className="w-4 h-0.5 bg-amber-500" />
                PREP FOR THE PLACES YOU WANT TO GO
              </div>
              <p className="text-slate-500 text-xs font-medium">Click a company to explore questions tailored to their exact hiring rounds</p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
              <ArrowDownRight className="w-3.5 h-3.5 text-amber-500" />
              {companies.length} companies · 3,254 questions
            </div>
          </div>

          {/* Company Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {companies.map((comp, idx) => {
              const Logo = logos[comp.name];
              const isActive = activeCompany === comp.name;
              return (
                <button
                  key={comp.name}
                  onClick={() => handleClick(comp)}
                  className={`group relative p-4 rounded-2xl bg-slate-50 border-2 cursor-pointer transition-all duration-250 flex flex-col gap-3 text-left shadow-sm hover:-translate-y-1 hover:shadow-md ${
                    isActive
                      ? 'border-dk-purple bg-purple-50/40 shadow-purple-glow -translate-y-1'
                      : `border-slate-200 ${comp.color}`
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                  )}

                  {/* Logo */}
                  <div className="h-9 flex items-center transition-transform duration-200 group-hover:scale-105">
                    {Logo ? <Logo /> : (
                      <span className="text-sm font-extrabold text-slate-800 tracking-tight">{comp.name}</span>
                    )}
                  </div>

                  {/* Tag badge */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${comp.accent}`}>
                      {comp.tag}
                    </span>
                  </div>

                  {/* Roles on hover / active */}
                  <div className={`overflow-hidden transition-all duration-200 ${isActive ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100'}`}>
                    <div className="flex flex-col gap-0.5">
                      {comp.roles.map((r) => (
                        <span key={r} className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Questions count */}
                  <div className={`text-[10px] font-mono font-bold transition-colors ${isActive ? 'text-purple-700' : 'text-slate-400 group-hover:text-purple-600'}`}>
                    {comp.questions} available →
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active company inline detail strip */}
          {activeCompany && (
            <div className="mt-4 p-4 rounded-2xl bg-purple-50/90 border border-purple-200/90 animate-fadeIn flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="h-10 px-3.5 bg-white rounded-xl border border-purple-200 flex items-center justify-center shadow-xs">
                  {logos[activeCompany] ? (
                    React.createElement(logos[activeCompany])
                  ) : (
                    <span className="text-sm font-extrabold text-slate-800">{activeCompany}</span>
                  )}
                </div>
                <div>
                  <div className="text-sm font-extrabold text-slate-900">{activeCompany} Prep Kit</div>
                  <div className="text-[11px] font-mono text-purple-700 font-medium">
                    {companies.find(c => c.name === activeCompany)?.questions} curated questions tailored to active hiring rounds
                  </div>
                </div>
              </div>
              <a
                href="#question-bank"
                className="inline-flex items-center gap-1.5 bg-dk-purple text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-purple-700 transition-colors shadow-sm active:scale-95"
              >
                Browse {activeCompany} questions
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </ScrollReveal>
      </div>
    </div>
  );
}
