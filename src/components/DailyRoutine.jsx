import React, { useState } from 'react';
import { dailyTasksList } from '../data/mockData';
import { Check, Sparkles, ArrowUpRight, Flame, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import ScrollReveal from './ScrollReveal';

export default function DailyRoutine({ onToast }) {
  const [tasks, setTasks] = useState(dailyTasksList);

  const completedCount = tasks.filter((t) => t.completed).length;
  const percent = Math.round((completedCount / tasks.length) * 100);
  const totalEarnedXp = tasks
    .filter((t) => t.completed)
    .reduce((sum, t) => sum + t.xp, 0);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    const target = tasks.find((t) => t.id === id);
    if (!target.completed) {
      onToast(`Task completed! +${target.xp} XP earned.`);
    }
  };

  const handleCompleteSession = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD83D', '#7928CA', '#10B981', '#0F172A']
    });

    if (completedCount === tasks.length) {
      onToast('Practice session fully completed! Incredible consistency! 🏆');
    } else {
      onToast(`Current progress saved: ${completedCount} of ${tasks.length} tasks (${totalEarnedXp} XP)!`);
    }
  };

  const getRoutineMessage = () => {
    if (completedCount === tasks.length) return 'Session complete. Outstanding work! 🚀';
    if (completedCount >= 3) return 'Great momentum. Almost there! 🔥';
    if (completedCount > 0) return 'Nice start. Keep pushing forward!';
    return 'Small steps count. Start with one.';
  };

  return (
    <section className="py-16 md:py-24 border-b border-purple-100/60 relative bg-gradient-to-b from-amber-50/40 via-purple-50/40 to-amber-50/30" id="daily">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Copy */}
          <ScrollReveal animation="fade-up" className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-600 uppercase tracking-widest">
              <span className="w-4 h-0.5 bg-amber-500"></span>
              YOUR DAILY PRACTICE
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              What should I<br />
              <span className="text-gradient-purple">do today?</span>
            </h2>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
              A short, manageable checklist helps turn your dream company target into daily action. Tick off each task as you complete it.
            </p>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
              <div className="text-sm font-serif italic text-slate-800">
                “Consistency today, opportunities tomorrow.”
              </div>
              <div className="text-xs font-mono font-bold text-purple-700 flex items-center gap-1">
                <span>✳</span> 20 MINUTES A DAY BUILDS THE HABIT
              </div>
            </div>

            <a
              href="#question-bank"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-700 hover:text-slate-900 transition-colors"
            >
              Find today’s practice
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </ScrollReveal>

          {/* Right Routine Board */}
          <ScrollReveal animation="scale" delay={100} className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 bg-white">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-widest">
                  TODAY’S PRACTICE
                </span>
                <h3 className="text-lg font-bold text-slate-900">Your next useful session.</h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg font-semibold">
                <Flame className="w-4 h-4 text-amber-500" />
                TODAY · 20 MIN
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-700 font-semibold">
                  {completedCount} of {tasks.length} completed
                </span>
                <span className="text-purple-700 font-extrabold text-sm">{percent}%</span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-dk-purple via-indigo-600 to-amber-400 transition-all duration-500 rounded-full"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>

            {/* Checklist items */}
            <div className="space-y-3">
              {tasks.map((task) => (
                <label
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                    task.completed
                      ? 'bg-emerald-50/60 border-emerald-300'
                      : 'bg-slate-50 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        task.completed
                          ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div>
                      <div
                        className={`text-xs sm:text-sm font-bold transition-all ${
                          task.completed ? 'text-slate-400 line-through' : 'text-slate-900'
                        }`}
                      >
                        {task.title}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500">
                        {task.category}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      task.completed
                        ? 'text-emerald-800 bg-emerald-100'
                        : 'text-purple-800 bg-purple-50 border border-purple-200'
                    }`}
                  >
                    +{task.xp} XP
                  </span>
                </label>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-slate-600 font-semibold">
                {getRoutineMessage()}
              </span>

              <button
                onClick={handleCompleteSession}
                className="w-full sm:w-auto bg-dk-purple hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
              >
                Complete this session
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
