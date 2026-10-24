import React, { useState, useEffect } from 'react';
import { testimonialsData } from '../data/mockData';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Testimonials({ onToast }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = testimonialsData[currentIndex];

  const handlePrev = () => {
    const nextIdx = (currentIndex + testimonialsData.length - 1) % testimonialsData.length;
    setCurrentIndex(nextIdx);
    onToast(`Showing testimonial ${nextIdx + 1} of ${testimonialsData.length}`);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % testimonialsData.length;
    setCurrentIndex(nextIdx);
    onToast(`Showing testimonial ${nextIdx + 1} of ${testimonialsData.length}`);
  };
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex(i => (i + 1) % testimonialsData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="py-16 md:py-24 border-b border-purple-100/60 relative bg-white/70 backdrop-blur-sm" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Heading & Controls */}
          <ScrollReveal animation="fade-up" className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-600 uppercase tracking-widest">
              <span className="w-4 h-0.5 bg-amber-500"></span>
              TRUST BUILT THROUGH PRACTICE
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Good preparation <br />
              should show up <br />
              <span className="text-gradient-purple">in the results.</span>
            </h2>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
              Real institutional impact, real student confidence, and measurable placement readiness without guesswork or exaggeration.
            </p>

            {/* Slider Controls */}
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-center transition-colors active:scale-95 shadow-xs"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-center transition-colors active:scale-95 shadow-xs"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-5 h-5" />
              </button>

              <span className="font-mono text-sm text-slate-500 font-bold ml-2">
                0{currentIndex + 1} / 0{testimonialsData.length}
              </span>
            </div>
          </ScrollReveal>

          {/* Right Active Testimonial Card */}
          <ScrollReveal animation="scale" delay={120} className="lg:col-span-7 glass-card rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6 relative overflow-hidden bg-slate-50/70">
            <div className="absolute top-6 right-8 text-6xl font-serif text-slate-200 select-none pointer-events-none">
              “
            </div>

            <span className="text-[10px] font-mono font-bold text-purple-800 tracking-widest uppercase bg-purple-100 border border-purple-200 px-3 py-1 rounded-full inline-block">
              {current.tag}
            </span>

            <blockquote className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed italic">
              "{current.quote}"
            </blockquote>

            <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-white font-black text-base flex items-center justify-center shadow-sm">
                  {current.avatar}
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {current.name}
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    {current.role}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-500 font-black text-sm">
                <span>✳</span>
                <span>✳</span>
                <span>✳</span>
              </div>
            </div>

            {/* Pagination dots */}
            <div className="flex items-center gap-2 pt-2">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'w-8 bg-dk-purple' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
