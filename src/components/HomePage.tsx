import React, { useState } from 'react';
import { 
  Compass, 
  ArrowRight, 
  TrendingUp, 
  Sliders, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  Target, 
  BrainCircuit, 
  ShieldCheck,
  ChevronRight,
  Code2
} from 'lucide-react';
import { Career } from '../types';

interface HomePageProps {
  careers: Career[];
  onGetStarted: () => void;
  onStudentLogin: () => void;
  onAdminLogin: () => void;
  onExploreCareers: () => void;
  onOpenCodeExport: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  careers,
  onGetStarted,
  onStudentLogin,
  onAdminLogin,
  onExploreCareers,
  onOpenCodeExport,
}) => {
  // Mini interactive live simulator state on the landing page
  const [simSql, setSimSql] = useState(40);
  const [simPbi, setSimPbi] = useState(20);

  // Live calculated prediction for Data Analyst
  // Base readiness = 72%
  // SQL 40 -> 80 adds +8% (weight ~20%)
  // Power BI 20 -> 75 adds +8%
  const simulatedScore = Math.min(
    95,
    Math.round(72 + ((simSql - 40) / 40) * 8 + ((simPbi - 20) / 55) * 8)
  );

  return (
    <div className="relative overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-cyan-600/15 via-blue-600/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[40rem] -left-40 w-96 h-96 bg-indigo-600/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[80rem] -right-40 w-96 h-96 bg-cyan-500/10 blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Editorial Subtitle Kicker (Clean unboxed typography) */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-4">
          <span>Career Readiness Prediction System</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>College Tech Mini Project</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight text-balance">
          Student Skill Gap Analyzer
        </h1>

        <p className="mt-6 text-xl sm:text-2xl text-slate-300 font-medium max-w-2xl mx-auto">
          Know Your Skills. Discover Your Gaps. Build Your Career.
        </p>

        <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Bridge the transition from college coursework to industry benchmarks using machine learning, weighted career gap calculations, and a real-time what-if simulator.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onGetStarted}
            className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all flex items-center gap-2 group cursor-pointer"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={onStudentLogin}
            className="px-5 py-3 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-lg border border-slate-700/80 transition-all cursor-pointer"
          >
            Student Login
          </button>

          <button
            onClick={onExploreCareers}
            className="px-5 py-3 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-lg border border-slate-700/80 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Explore Careers</span>
          </button>

          <button
            onClick={onAdminLogin}
            className="px-4 py-3 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            Admin Login
          </button>
        </div>

        {/* Claim-to-Proof Adjacency Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10 border-t border-slate-800/80">
          <div className="p-4 text-left">
            <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">68%</div>
            <div className="text-xs text-slate-400 mt-1">Graduates face skill deficits on Day 1</div>
          </div>
          <div className="p-4 text-left">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400 tabular-nums">8+</div>
            <div className="text-xs text-slate-400 mt-1">Standardized Industry Career Profiles</div>
          </div>
          <div className="p-4 text-left">
            <div className="text-2xl sm:text-3xl font-bold text-indigo-400 tabular-nums">0-100%</div>
            <div className="text-xs text-slate-400 mt-1">Weighted Readiness Scoring Formula</div>
          </div>
          <div className="p-4 text-left">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums">What-If</div>
            <div className="text-xs text-slate-400 mt-1">Real-time Score Impact Simulation</div>
          </div>
        </div>
      </section>

      {/* Section 1: Why Skill Gap Matters */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
            The Industry Reality
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-balance">
            Why Traditional College CGPA Alone Isn&apos;t Enough
          </h2>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed">
            Hiring managers evaluate concrete, role-specific competencies. A student with an 8.5 CGPA can still be unprepared if their target role requires high-proficiency SQL and business intelligence dashboards.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Blind Spot In Competency</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
              Students often focus on introductory syntax while missing industry-grade requirements like window functions, indexing, and DAX modeling.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Role-Weighted Significance</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
              Not all skills carry equal weight. A gap in SQL (Weight 5) for a Data Analyst hurts career readiness far more than a gap in Tableau (Weight 3).
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Actionable Prioritization</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
              Instead of an overwhelming list of 50 tutorials, the system isolates high-impact deficits and sequences them into a week-by-week curriculum.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
            System Workflow
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-balance">
            From Self-Assessment to Interview Readiness
          </h2>
          <p className="mt-3 text-slate-400 text-sm">
            Four rigorous analytical stages designed to systematically eliminate skill deficits.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Skill Assessment',
              desc: 'Self-evaluate your proficiencies across Programming, Data, Web, and Professional capabilities.',
              icon: Target
            },
            {
              step: '02',
              title: 'Career Benchmarking',
              desc: 'Select from 8 standard job profiles. The system fetches weighted industry skill thresholds.',
              icon: Compass
            },
            {
              step: '03',
              title: 'Gap Analysis & Score',
              desc: 'Mathematical formula classifies gaps (Low, Med, High, Critical) and computes weighted readiness.',
              icon: TrendingUp
            },
            {
              step: '04',
              title: 'What-If & Roadmap',
              desc: 'Simulate score boosts in real time and execute a weekly milestone curriculum to close gaps.',
              icon: Sliders
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative p-6 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-cyan-400 mb-3">{item.step}</div>
                  <Icon className="w-5 h-5 text-indigo-400 mb-3" />
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 3: Interactive Live Mini What-If Simulator Feature Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-indigo-950/40 border border-cyan-500/20 shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Signature Module</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-balance">
                Career Readiness What-If Simulator
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Ever wonder how much your job readiness improves if you study SQL for three weeks? Test it right here in real time without altering your permanent record.
              </p>

              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                    <span>SQL Proficiency</span>
                    <span className="font-mono text-cyan-400 tabular-nums">{simSql}%</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="90"
                    value={simSql}
                    onChange={(e) => setSimSql(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>Current: 40%</span>
                    <span>Industry Benchmark: 90%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                    <span>Power BI Proficiency</span>
                    <span className="font-mono text-cyan-400 tabular-nums">{simPbi}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="85"
                    value={simPbi}
                    onChange={(e) => setSimPbi(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>Current: 20%</span>
                    <span>Industry Benchmark: 80%</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={onGetStarted}
                  className="px-4 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Launch Full Simulator</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { setSimSql(80); setSimPbi(75); }}
                  className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 rounded-lg border border-slate-700/80 transition-colors"
                >
                  Quick Demo: SQL + Power BI
                </button>
              </div>
            </div>

            {/* Live Visualizer Gauge */}
            <div className="lg:col-span-6 bg-[#0b0f19]/80 p-6 rounded-xl border border-slate-800/80 flex flex-col items-center justify-center text-center">
              <div className="text-xs text-slate-400 mb-2">Simulated Data Analyst Readiness</div>
              
              <div className="relative w-40 h-40 flex items-center justify-center my-2">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-slate-800"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-cyan-400 transition-all duration-300"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * simulatedScore) / 100}
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-white tabular-nums">
                    {simulatedScore}%
                  </span>
                  <span className="text-[10px] text-cyan-400 font-medium">
                    {simulatedScore >= 85 ? 'Career Ready' : simulatedScore >= 75 ? 'Strong Candidate' : 'Needs Work'}
                  </span>
                </div>
              </div>

              <div className="mt-2 text-xs text-slate-400 flex items-center gap-2">
                <span>Baseline: <strong className="text-slate-200">72%</strong></span>
                <span className="text-slate-600">→</span>
                <span>Predicted: <strong className="text-emerald-400 font-bold">{simulatedScore}%</strong></span>
                <span className="text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  +{simulatedScore - 72}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 max-w-xs">
                Formula: Weighted readiness recalculates immediately based on skill coefficients.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Section 4: Career Paths Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
              Career Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Target In-Demand Industry Roles
            </h2>
          </div>
          <button
            onClick={onExploreCareers}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group self-start cursor-pointer"
          >
            <span>View all 8 careers</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {careers.slice(0, 4).map((career) => (
            <div
              key={career.id}
              className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>{career.industry}</span>
                  <span className="text-emerald-400 font-medium">{career.demandLevel} Demand</span>
                </div>
                <h3 className="text-base font-semibold text-white">{career.name}</h3>
                <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {career.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="text-[11px] text-slate-500 mb-1">Key benchmark skills:</div>
                <div className="text-xs text-slate-300">
                  {career.requirements.length} required competencies
                </div>
                <button
                  onClick={onGetStarted}
                  className="mt-3 w-full py-1.5 text-xs font-medium text-cyan-400 hover:text-white bg-slate-800/50 hover:bg-cyan-600/20 border border-cyan-500/20 rounded-lg transition-colors cursor-pointer"
                >
                  Analyze My Fit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Python / MySQL College Project Architecture Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-6 rounded-xl bg-slate-900/80 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-400">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Looking for the Python + Flask + MySQL source files?
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Inspect and download the complete runnable codebase: <code className="text-indigo-300">app.py</code>, <code className="text-indigo-300">database/schema.sql</code>, Random Forest ML training scripts, and setup commands.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenCodeExport}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2"
          >
            <Code2 className="w-4 h-4" />
            <span>Open Code Explorer</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-8 px-4 border-t border-slate-800/80 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">SkillGapPredict</span>
            <span aria-hidden="true">·</span>
            <span>Academic Mini Project</span>
            <span aria-hidden="true">·</span>
            <span>2026 Edition</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={onExploreCareers} className="hover:text-white transition-colors cursor-pointer">Careers</button>
            <button onClick={onStudentLogin} className="hover:text-white transition-colors cursor-pointer">Student Login</button>
            <button onClick={onAdminLogin} className="hover:text-white transition-colors cursor-pointer">Admin Login</button>
            <button onClick={onOpenCodeExport} className="hover:text-white transition-colors cursor-pointer">Python Files</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
