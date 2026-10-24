import React, { useState } from 'react';
import { faqList } from '../data/mockData';
import { ChevronDown, Plus, Minus, Search, ArrowUpRight, HelpCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function FaqSection({ onToast }) {
  const [openIndexes, setOpenIndexes] = useState([0]); // first one open by default
  const [searchQuery, setSearchQuery] = useState('');

  const toggleIndex = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const handleExpandAll = () => {
    if (openIndexes.length === faqList.length) {
      setOpenIndexes([]);
      onToast('Collapsed all FAQs');
    } else {
      setOpenIndexes(faqList.map((_, i) => i));
      onToast('Expanded all FAQs');
    }
  };

  const filteredFaqs = faqList.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-16 md:py-24 border-b border-purple-100/60 relative bg-gradient-to-b from-purple-50/40 via-amber-50/30 to-purple-50/30" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal animation="fade-up" className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-600 uppercase tracking-widest mb-3">
              <span className="w-4 h-0.5 bg-amber-500"></span>
              GOOD QUESTIONS, CLEAR ANSWERS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Before you<br />
              <span className="text-gradient-purple">get started.</span>
            </h2>
          </div>
          <p className="text-slate-600 text-sm md:text-base max-w-md font-medium">
            Keep frequently asked questions visible so students and institutional decision-makers can find answers without hunting.
          </p>
        </ScrollReveal>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Intro Card */}
          <ScrollReveal animation="fade-up" delay={80} className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-2xl bg-white border border-amber-300 shadow-sm space-y-4">
              <div className="inline-block bg-dk-yellow text-slate-950 font-mono font-black text-sm px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-xs border border-amber-300">
                ASK AWAY ↗
              </div>

              <h3 className="text-xl font-extrabold text-slate-900">
                Have specific placement questions?
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Still deciding? Find the answers you need about batch onboarding, student tracking, and hiring syllabus.
              </p>

              <a
                href="#start"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-purple-700 hover:text-slate-900 transition-colors pt-2"
              >
                Talk to the campus team
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Quick search & toggle */}
            <div className="glass-card rounded-xl p-4 border border-slate-200 bg-white space-y-3 shadow-xs">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter FAQ questions..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
                />
              </div>

              <button
                onClick={handleExpandAll}
                className="w-full text-center text-xs font-mono text-slate-500 hover:text-slate-900 py-1 transition-colors font-semibold"
              >
                {openIndexes.length === faqList.length ? 'Collapse all -' : 'Expand all +'}
              </button>
            </div>
          </ScrollReveal>

          {/* Right Accordion List */}
          <ScrollReveal animation="fade-up" delay={140} className="lg:col-span-8 space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-8 text-xs font-mono text-slate-500">
                No matching questions found for "{searchQuery}".
              </div>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = openIndexes.includes(index);
                return (
                  <div
                    key={index}
                    className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'bg-white border-purple-300 shadow-sm'
                        : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <button
                      onClick={() => toggleIndex(index)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 transition-colors"
                    >
                      <span className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                        {faq.question}
                      </span>
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                          isOpen
                            ? 'bg-dk-purple text-white rotate-45'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        +
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-fadeIn font-medium">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
