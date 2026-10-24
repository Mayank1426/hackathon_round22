import React, { useState } from 'react';
import { ShieldCheck, Terminal, AlertTriangle, ArrowUpRight, Activity, Radio } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function SecurityConsole({ onToast }) {
  const [integrityScore, setIntegrityScore] = useState(100);
  const [focusEventsCount, setFocusEventsCount] = useState(0);
  const [logs, setLogs] = useState([
    { time: '12:51:12', tag: 'SESSION', message: 'Assessment preview initialized', status: 'OK' },
    { time: '12:51:25', tag: 'FOCUS', message: 'Continuous screen lock signal active', status: 'OK' },
    { time: '12:51:30', tag: 'AUDIT', message: 'Multi-screen telemetry event verified', status: 'OK' },
    { time: '12:51:44', tag: 'REPORT', message: 'Integrity summary generated & signed', status: 'OK' }
  ]);

  const handleSimulateFocusSignal = () => {
    const now = new Date().toTimeString().split(' ')[0];
    const newCount = focusEventsCount + 1;
    const newScore = Math.max(92, integrityScore - 2);
    setFocusEventsCount(newCount);
    setIntegrityScore(newScore);

    const newLog = {
      time: now,
      tag: 'FOCUS_TEST',
      message: `Simulated tab focus check (Event #${newCount})`,
      status: 'VERIFIED'
    };

    setLogs((prev) => [newLog, ...prev.slice(0, 5)]);
    onToast(`Security simulation event triggered at ${now}!`);
  };

  return (
    <section className="py-16 md:py-24 border-b border-purple-100/60 relative bg-white/70 backdrop-blur-sm" id="security">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Copy */}
          <ScrollReveal animation="fade-up" className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-600 uppercase tracking-widest">
              <span className="w-4 h-0.5 bg-amber-500"></span>
              ASSESSMENT INTEGRITY
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Proof should be<br />
              <span className="text-gradient-purple">something you can inspect.</span>
            </h2>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
              Give institutional teams a clear, real-time overview of assessment integrity, monitoring signals, and tamper-proof audit trails. The controls shown here are an illustrative concept for campus administrators.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Assessment focus
              </span>
              <span className="text-xs font-mono bg-purple-50 text-purple-800 border border-purple-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold">
                <Activity className="w-4 h-4 text-purple-600" />
                Audit visibility
              </span>
              <span className="text-xs font-mono bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold">
                <Radio className="w-4 h-4 text-amber-600" />
                Integrity signals
              </span>
            </div>

            <div className="pt-2">
              <a
                href="#institutions"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-700 hover:text-slate-900 transition-colors"
              >
                Explore institutional controls
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>

          {/* Right Security Console Terminal */}
          <ScrollReveal animation="scale" delay={120} className="lg:col-span-7 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl overflow-hidden">
            {/* Console Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-mono text-slate-300 ml-2 font-semibold">
                  DKODER / SECURE ASSESSMENT
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                LIVE CONSOLE
              </span>
            </div>

            <div className="p-6 space-y-6">
              {/* Score and Title */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400">
                    ASSESSMENT OVERVIEW
                  </div>
                  <h3 className="text-xl font-extrabold text-white">Integrity command center</h3>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-mono font-black text-emerald-400">
                    {integrityScore}
                    <span className="text-sm font-normal text-slate-400"> / 100</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">INTEGRITY HEALTH</span>
                </div>
              </div>

              {/* Status Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">SESSION STATUS</div>
                  <div className="text-xs font-bold text-white mt-1">Active preview</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">FOCUS EVENTS</div>
                  <div className="text-xs font-bold text-amber-400 mt-1">{focusEventsCount} detected</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">AUDIT RECORD</div>
                  <div className="text-xs font-bold text-emerald-400 mt-1">Available</div>
                </div>
              </div>

              {/* Live Log Terminal Output */}
              <div className="rounded-xl bg-black/80 border border-slate-800 p-4 font-mono text-xs space-y-2">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider pb-1 border-b border-slate-800 flex items-center justify-between font-semibold">
                  <span>REAL-TIME AUDIT LOG</span>
                  <span className="text-yellow-400">TLS 1.3 ENCRYPTED</span>
                </div>
                {logs.map((log, i) => (
                  <div key={i} className="flex items-center justify-between gap-2 py-0.5 text-slate-300">
                    <span className="text-slate-500 text-[11px] shrink-0">{log.time}</span>
                    <span className="text-purple-400 font-bold shrink-0">{log.tag}</span>
                    <span className="truncate flex-1 text-slate-300 text-[11px]">{log.message}</span>
                    <span className="text-emerald-400 font-bold text-[10px] bg-emerald-950/50 px-1.5 rounded shrink-0">
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Simulation test action */}
              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  onClick={handleSimulateFocusSignal}
                  className="bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 border border-white/10"
                >
                  <Activity className="w-3.5 h-3.5 text-yellow-400" />
                  Test focus signal
                </button>
                <div className="text-[11px] font-mono text-slate-400 text-right">
                  DEMO UI · NOT A LIVE PROCTOR
                </div>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>SECURE ASSESSMENT CONCEPT</span>
              <a href="#institutions" className="text-yellow-400 hover:underline flex items-center gap-1 font-bold">
                Details ↗
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
