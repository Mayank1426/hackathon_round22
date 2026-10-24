import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowUpRight, Lock, Mail, Building2, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import BrandLogo from './BrandLogo';

export function LoginModal({ isOpen, onClose, onToast }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onToast(`Welcome back! Logged in as ${role === 'student' ? 'Student' : 'Campus Coordinator'}.`);
    onClose();
  };

  const handleQuickDemo = (asRole) => {
    onToast(`Logged in with demo credentials as ${asRole.toUpperCase()}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl relative space-y-6 bg-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="mb-3">
            <BrandLogo size="md" href={null} />
          </div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest">
            AUTHENTICATION
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Access your DKoder space</h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Pick your role or continue with institutional single sign-on.
          </p>
        </div>

        {/* Role toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`py-2 text-xs font-mono font-bold rounded-lg transition-colors ${
              role === 'student' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole('coordinator')}
            className={`py-2 text-xs font-mono font-bold rounded-lg transition-colors ${
              role === 'coordinator' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Campus / HOD
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-slate-700 font-semibold block mb-1">College Email / Username</label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rohan.s@gec.edu.in"
              className="w-full bg-slate-50 border border-slate-200 focus:border-purple-600 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-slate-700 font-semibold block mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              className="w-full bg-slate-50 border border-slate-200 focus:border-purple-600 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-dk-purple hover:bg-purple-700 text-white font-mono font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow transition-all"
          >
            Continue to dashboard ↗
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100">
          <div className="text-[11px] font-mono text-slate-500 mb-2.5 text-center font-semibold">
            OR TEST WITH ONE-CLICK DEMO ACCOUNTS:
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickDemo('Student')}
              className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-mono text-slate-700 hover:text-slate-900 text-center font-semibold"
            >
              Demo Student
            </button>
            <button
              onClick={() => handleQuickDemo('HOD CSE')}
              className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-mono text-slate-700 hover:text-slate-900 text-center font-semibold"
            >
              Demo HOD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScholarshipModal({ isOpen, plan, onClose, onToast }) {
  const [cgpa, setCgpa] = useState('8.4');
  const [college, setCollege] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !plan) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
    onToast(`Scholarship application approved for ${plan.name} plan! Up to 40% fee waiver granted.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative space-y-6 bg-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div>
              <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-amber-500" />
                DKODER MERIT SCHOLARSHIP
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                Apply for {plan.name} Plan
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Standard price: <b className="text-slate-900">{plan.price}/mo</b> · Up to 50% merit discount based on CGPA and college.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-700 font-semibold block mb-1">College / University Name</label>
                <input
                  type="text"
                  required
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. Government Engineering College, Bilaspur"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-purple-600 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-700 font-semibold block mb-1">Current CGPA</label>
                  <input
                    type="number"
                    step="0.1"
                    min="5.0"
                    max="10.0"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-purple-600 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-700 font-semibold block mb-1">Graduation Year</label>
                  <select className="w-full bg-slate-50 border border-slate-200 focus:border-purple-600 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none">
                    <option>2026 Batch</option>
                    <option>2027 Batch</option>
                    <option>2025 Batch</option>
                  </select>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-mono text-amber-900 font-medium">
                ✓ Includes all {plan.name} features: {plan.features.slice(0, 3).join(', ')}...
              </div>

              <button
                type="submit"
                className="w-full bg-dk-yellow hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-sm border border-amber-300 transition-all"
              >
                Submit scholarship assessment ↗
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center text-3xl font-bold border border-emerald-300">
              ✓
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">Scholarship Granted!</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed font-medium">
              Based on your academic profile, you qualify for <b>40% Off</b> on the {plan.name} package. We have sent your activation token to your email.
            </p>
            <button
              onClick={onClose}
              className="bg-dk-purple text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl shadow"
            >
              Start practicing now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function LevelBriefingModal({ isOpen, level, onClose }) {
  if (!isOpen || !level) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto bg-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest">
            {level.tag}
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
            {level.city} · {level.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {level.description}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="text-xs font-mono text-purple-700 font-bold uppercase">
            SYLLABUS & STRATEGY BRIEF
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {level.briefing}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
            <div className="text-lg font-mono font-bold text-slate-900">{level.coreQs}</div>
            <div className="text-[10px] font-mono text-slate-500 font-semibold">CORE PROBLEMS</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
            <div className="text-lg font-mono font-bold text-emerald-700">{level.clearRate}</div>
            <div className="text-[10px] font-mono text-slate-500 font-semibold">CLEAR RATE</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
            <div className="text-lg font-mono font-bold text-purple-700">{level.xp}</div>
            <div className="text-[10px] font-mono text-slate-500 font-semibold">BONUS XP</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono text-slate-700 font-bold uppercase">
            COMPANIES HIRING FROM THIS LEVEL
          </div>
          <div className="flex flex-wrap gap-2">
            {level.recruiters.map((r) => (
              <span key={r} className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-800 font-mono font-semibold">
                {r}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-dk-purple hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow transition-all"
        >
          Close briefing and start level practice ↗
        </button>
      </div>
    </div>
  );
}
