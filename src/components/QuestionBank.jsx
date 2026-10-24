import React, { useState, useMemo } from 'react';
import { questionsData } from '../data/mockData';
import { 
  Search, SlidersHorizontal, RotateCcw, ArrowUpRight, Play, CheckCircle2, 
  X, Code2, Copy, Check, LayoutGrid, List, Sparkles, AlertCircle 
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';


export default function QuestionBank({ onToast }) {
  // Filter states
  const [filterType, setFilterType] = useState('All companies');
  const [filterSalary, setFilterSalary] = useState('Any package');
  const [filterLang, setFilterLang] = useState('Any language');
  const [filterModule, setFilterModule] = useState('All modules');
  const [filterRecency, setFilterRecency] = useState('Any time');
  const [sortBy, setSortBy] = useState('Recommended');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Selected Question for Preview / Live Code Runner
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedCodeLang, setSelectedCodeLang] = useState('python');
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [runOutput, setRunOutput] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Filter application
  const filteredQuestions = useMemo(() => {
    return questionsData.filter((q) => {
      // Company Type
      if (filterType !== 'All companies') {
        if (filterType === 'Product-based' && q.companyType !== 'Product-based') return false;
        if (filterType === 'Service-based' && q.companyType !== 'Service-based') return false;
      }
      // Salary Band
      if (filterSalary !== 'Any package' && q.salaryBand !== filterSalary) return false;
      // Language
      if (filterLang !== 'Any language' && q.language !== 'Any' && q.language !== filterLang) return false;
      // Module
      if (filterModule !== 'All modules' && q.module !== filterModule) return false;
      // Recency
      if (filterRecency !== 'Any time' && q.recency !== filterRecency) return false;

      return true;
    });
  }, [filterType, filterSalary, filterLang, filterModule, filterRecency]);

  const handleClearFilters = () => {
    setFilterType('All companies');
    setFilterSalary('Any package');
    setFilterLang('Any language');
    setFilterModule('All modules');
    setFilterRecency('Any time');
    onToast('Question filters cleared.');
  };

  const handleOpenQuestion = (q) => {
    setSelectedQuestion(q);
    setRunOutput(null);
    if (q.starterCode?.python) setSelectedCodeLang('python');
    else if (q.starterCode?.java) setSelectedCodeLang('java');
    else if (q.starterCode?.cpp) setSelectedCodeLang('cpp');
  };

  const handleRunSampleCode = () => {
    setIsRunningCode(true);
    setRunOutput(null);
    onToast('Executing sample against test cases...');

    setTimeout(() => {
      setIsRunningCode(false);
      setRunOutput({
        success: true,
        output: selectedQuestion?.expectedOutput || 'Execution completed with 0 errors.',
        time: '18 ms',
        memory: '14.2 MB',
        passedCases: '2 / 2 test cases passed'
      });
      onToast('Sample run complete! All test cases passed.');
    }, 900);
  };

  const handleCopyCode = () => {
    const code = selectedQuestion?.starterCode?.[selectedCodeLang] || '';
    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    onToast('Code copied to clipboard.');
  };

  return (
    <section className="py-16 md:py-24 border-b border-slate-200 bg-white" id="question-bank">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Head */}
        <ScrollReveal animation="fade-up" className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-600 uppercase tracking-widest mb-3">
            <span className="w-4 h-0.5 bg-amber-500"></span>
            THE QUESTION BANK
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Practice the question.<br />
              <span className="text-gradient-purple">Understand the pattern.</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-md font-medium">
              Filter by company type, package, language, module, and recency. Then focus on the questions that matter to your next round.
            </p>
          </div>
        </ScrollReveal>

        {/* Main Question Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Aside Filters (Left) */}
          <ScrollReveal animation="fade-up" delay={80} className="lg:col-span-4 glass-card rounded-2xl p-6 border border-purple-100 shadow-sm space-y-5 bg-gradient-to-br from-purple-50/70 via-white to-amber-50/40 lg:sticky lg:top-20 self-start">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-purple-700" />
                <b className="text-xs font-mono uppercase tracking-wider text-slate-900">Refine questions</b>
              </div>
              <button
                onClick={handleClearFilters}
                className="text-[11px] font-mono text-slate-500 hover:text-purple-700 transition-colors flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                Clear all
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-700 font-semibold block mb-1.5">Company type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-purple-600 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none shadow-xs"
                >
                  <option>All companies</option>
                  <option>Product-based</option>
                  <option>Service-based</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-700 font-semibold block mb-1.5">Salary band</label>
                <select
                  value={filterSalary}
                  onChange={(e) => setFilterSalary(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-purple-600 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none shadow-xs"
                >
                  <option>Any package</option>
                  <option>0–3 LPA</option>
                  <option>3–7 LPA</option>
                  <option>7–12 LPA</option>
                  <option>12+ LPA</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-700 font-semibold block mb-1.5">Language</label>
                <select
                  value={filterLang}
                  onChange={(e) => setFilterLang(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-purple-600 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none shadow-xs"
                >
                  <option>Any language</option>
                  <option>C</option>
                  <option>C++</option>
                  <option>Java</option>
                  <option>Python</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-700 font-semibold block mb-1.5">Module</label>
                <select
                  value={filterModule}
                  onChange={(e) => setFilterModule(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-purple-600 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none shadow-xs"
                >
                  <option>All modules</option>
                  <option>Coding</option>
                  <option>Aptitude</option>
                  <option>Verbal reasoning</option>
                  <option>Interview</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-700 font-semibold block mb-1.5">Recency</label>
                <select
                  value={filterRecency}
                  onChange={(e) => setFilterRecency(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-purple-600 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none shadow-xs"
                >
                  <option>Any time</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                  <option>Last year</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => onToast(`Applied filters: ${filteredQuestions.length} questions matched.`)}
              className="w-full bg-dk-yellow hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-sm border border-amber-300 transition-all flex items-center justify-center gap-1.5"
            >
              Apply filters
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] font-mono text-slate-500 pt-1 text-center font-medium">
              Filters are real-time and filter across active question sets.
            </div>
          </ScrollReveal>

          {/* Results Area (Right) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Toolbar */}
            <ScrollReveal animation="fade-up" delay={120} className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-700 tracking-wider font-bold">
                  MATCHING QUESTIONS
                </span>
                <div className="text-xl font-extrabold text-slate-900">
                  {filteredQuestions.length * 403 || 0}{' '}
                  <span className="text-sm font-normal text-slate-500">questions found</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-600 font-semibold hidden sm:inline">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      onToast(`Sorting by: ${e.target.value}`);
                    }}
                    className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none shadow-xs"
                  >
                    <option>Recommended</option>
                    <option>Newest</option>
                    <option>Difficulty</option>
                  </select>
                </div>

                <div className="flex items-center bg-white p-1 rounded-lg border border-slate-200 shadow-xs">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === 'grid' ? 'bg-dk-yellow text-slate-950 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === 'list' ? 'bg-dk-yellow text-slate-950 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Question Cards List / Grid */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 gap-4' : 'flex flex-col gap-3'}>
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-12 glass-card rounded-2xl border border-slate-200 p-8 space-y-3 bg-slate-50">
                  <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">No questions match these filters</h4>
                  <p className="text-xs text-slate-500">Try widening your filters to see more placement sets.</p>
                  <button
                    onClick={handleClearFilters}
                    className="text-xs font-bold text-purple-700 hover:underline"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                filteredQuestions.map((q, qIdx) => (
                  <ScrollReveal key={q.id} animation="fade-up" delay={qIdx * 50}>
                    <article
                      className={`glass-card rounded-xl p-5 border border-slate-200/90 hover:border-purple-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group bg-white shadow-xs ${
                        selectedQuestion?.id === q.id ? 'ring-2 ring-purple-600 bg-purple-50/20' : ''
                      }`}
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-white flex items-center justify-center font-mono font-extrabold text-sm shrink-0 shadow-sm">
                          {q.module === 'Coding' ? '</>' : q.module === 'Aptitude' ? '∑' : 'Aa'}
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-mono font-bold text-purple-700 uppercase tracking-wider">
                              {q.company}
                            </span>
                            <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                              {q.language}
                            </span>
                            <span className="text-[10px] font-mono text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded font-bold">
                              {q.difficulty}
                            </span>
                          </div>

                          <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors leading-snug">
                            {q.title}
                          </h4>

                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            {q.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:flex-col md:items-end gap-3 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                        <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-lg">
                          {q.salary}
                        </span>
                        <button
                          onClick={() => handleOpenQuestion(q)}
                          className="bg-dk-purple hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider px-3.5 py-2 rounded-lg transition-all shadow-sm flex items-center gap-1"
                        >
                          Open question
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </article>
                  </ScrollReveal>
                ))
              )}
            </div>

            {/* Results Footer */}
            <ScrollReveal animation="fade-up" className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs font-mono text-slate-500">
              <span>Showing {filteredQuestions.length} representative questions</span>
              <button
                onClick={() => onToast('Loaded 12 additional verified questions into bank!')}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white shadow-xs text-slate-800 font-semibold flex items-center gap-1.5 transition-colors"
              >
                Load more questions ↓
              </button>
            </ScrollReveal>

            {/* Question Detail & Runnable In-Browser Code Preview Drawer */}
            {selectedQuestion && (
              <ScrollReveal animation="scale" className="mt-8 glass-card rounded-2xl p-6 sm:p-8 border-2 border-purple-500 shadow-xl relative bg-white space-y-6">
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest">
                      QUESTION PREVIEW & CODE WORKSPACE
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                      {selectedQuestion.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                      {selectedQuestion.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedQuestion(null)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                    aria-label="Close question preview"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Sample Input / Expected Output */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">SAMPLE INPUT</span>
                    <span className="text-amber-700 font-semibold">{selectedQuestion.sampleInput}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">EXPECTED OUTPUT</span>
                    <span className="text-emerald-700 font-semibold">{selectedQuestion.expectedOutput}</span>
                  </div>
                </div>

                {/* In-Browser IDE Header */}
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-md">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      </div>
                      <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-yellow-400" />
                        solution.{selectedCodeLang === 'python' ? 'py' : selectedCodeLang === 'java' ? 'java' : 'cpp'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Language switcher */}
                      <div className="flex items-center bg-slate-800 rounded-lg p-0.5 text-[11px] font-mono">
                        {['python', 'java', 'cpp'].map((lang) => (
                          <button
                            key={lang}
                            onClick={() => setSelectedCodeLang(lang)}
                            className={`px-2 py-1 rounded transition-colors uppercase ${
                              selectedCodeLang === lang
                                ? 'bg-amber-400 text-slate-950 font-bold'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={handleCopyCode}
                        className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Copy code"
                      >
                        {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Code Area */}
                  <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-64 scrollbar-thin">
                    <code>
                      {selectedQuestion.starterCode?.[selectedCodeLang] || selectedQuestion.starterCode?.python || '// No starter template'}
                    </code>
                  </pre>

                  {/* Execution footer */}
                  <div className="px-4 py-3 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={handleRunSampleCode}
                      disabled={isRunningCode}
                      className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-lg transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      {isRunningCode ? 'Running...' : 'Run sample'}
                    </button>

                    <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                      {runOutput ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          {runOutput.passedCases} ({runOutput.time})
                        </span>
                      ) : (
                        <span>Ready to run your sample against test cases.</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Test Run Output Box */}
                {runOutput && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-mono space-y-2 animate-fadeIn">
                    <div className="flex items-center justify-between text-emerald-800 font-bold">
                      <span>✓ TEST EXECUTION SUCCESSFUL</span>
                      <span className="text-slate-600">Memory: {runOutput.memory}</span>
                    </div>
                    <div className="text-slate-800">
                      Output: <code className="text-emerald-900 font-bold">{runOutput.output}</code>
                    </div>
                    <div className="text-[11px] text-slate-600">
                      {selectedQuestion.explanation}
                    </div>
                  </div>
                )}
              </ScrollReveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
