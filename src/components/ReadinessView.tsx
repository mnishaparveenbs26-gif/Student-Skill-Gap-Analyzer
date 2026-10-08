import React from 'react';
import { Career, ReadinessAnalysis } from '../types';
import { 
  Sliders, 
  BrainCircuit, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Target, 
  ArrowRight, 
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

interface ReadinessViewProps {
  targetCareer: Career;
  readiness: ReadinessAnalysis;
  onOpenSimulator: () => void;
  onOpenRecommendations: () => void;
  onOpenRoadmap: () => void;
}

export const ReadinessView: React.FC<ReadinessViewProps> = ({
  targetCareer,
  readiness,
  onOpenSimulator,
  onOpenRecommendations,
  onOpenRoadmap,
}) => {
  const { overallReadiness, tier, tierColor, strongSkills, weakSkills, criticalGaps } = readiness;

  // Circular gauge parameters
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * overallReadiness) / 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-1">
          Phase 4 · Synthesis &amp; Scoring
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Career Readiness Score
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Weighted evaluation reflecting how closely your profile satisfies all competency thresholds for <span className="text-white font-medium">{targetCareer.name}</span>.
        </p>
      </div>

      {/* Hero Circular Progress Gauge Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* Left Side: Large Gauge */}
        <div className="flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={tierColor}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl sm:text-5xl font-black text-white tabular-nums tracking-tight">
                {overallReadiness}%
              </span>
              <span className="text-xs text-slate-400 font-medium mt-1">Readiness</span>
            </div>
          </div>

          <div className="space-y-3 max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold" style={{ color: tierColor, backgroundColor: `${tierColor}15` }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tierColor }}></span>
              <span>Classification: {tier}</span>
            </div>

            <h2 className="text-2xl font-bold text-white">
              {overallReadiness >= 90
                ? 'Outstanding Preparedness'
                : overallReadiness >= 75
                ? 'Competitive Industry Profile'
                : overallReadiness >= 50
                ? 'Approaching Job Readiness'
                : 'Foundational Stage'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {overallReadiness >= 75
                ? `You possess strong fundamental competency for ${targetCareer.name}. Polishing your remaining deficits will elevate your profile to top-decile candidacy.`
                : `Your profile has a solid base, but key deficits in high-importance areas prevent full readiness. Target these high-priority gaps to cross the 75%+ threshold.`}
            </p>

            <div className="text-[11px] text-slate-500 font-mono pt-1">
              Formula: Σ(Skill Score × Weight) / Σ(Weight) · Target: {targetCareer.name}
            </div>
          </div>
        </div>

        {/* Right Side: Quick Action CTA Box */}
        <div className="w-full lg:w-80 p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-3">
          <div className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Simulator</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Wondering what happens if you bring your <strong className="text-white">SQL</strong> from 40% to 80%? Test the score jump in real time!
          </p>
          <button
            onClick={onOpenSimulator}
            className="w-full py-2.5 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
          >
            <Sliders className="w-4 h-4" />
            <span>Launch What-If Simulator</span>
          </button>
        </div>

      </div>

      {/* 4 Readiness Classification Tiers Reference */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { range: '90 – 100%', title: 'Highly Ready', desc: 'Directly employable for enterprise positions', color: '#10b981' },
          { range: '75 – 89%', title: 'Career Ready', desc: 'Competitive for associate & entry-level roles', color: '#06b6d4' },
          { range: '50 – 74%', title: 'Needs Improvement', desc: 'Structured revision needed for critical gaps', color: '#f59e0b' },
          { range: 'Below 50%', title: 'Beginner Stage', desc: 'Focus on core programming & data essentials', color: '#ef4444' },
        ].map((t, idx) => {
          const isCurrentTier = t.title === tier;
          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all ${
                isCurrentTier
                  ? 'bg-slate-900 border-cyan-500/80 shadow-lg'
                  : 'bg-slate-900/40 border-slate-800 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-mono font-bold" style={{ color: t.color }}>{t.range}</span>
                {isCurrentTier && (
                  <span className="text-[10px] text-cyan-400 font-semibold px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                    You Are Here
                  </span>
                )}
              </div>
              <div className="text-sm font-bold text-white">{t.title}</div>
              <div className="text-[11px] text-slate-400 mt-1 leading-snug">{t.desc}</div>
            </div>
          );
        })}
      </div>

      {/* Detailed Diagnostics: Strong Skills vs Weak Skills vs Critical Gaps */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Critical Gaps */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-red-900/40 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-sm font-bold text-white">Critical Skill Gaps</h3>
          </div>
          <p className="text-xs text-slate-400">
            Skills with high industry importance (weight $\ge$ 4) where you currently fall significantly behind:
          </p>
          <div className="space-y-2.5">
            {criticalGaps.length > 0 ? (
              criticalGaps.map(g => (
                <div key={g.skillId} className="p-3 rounded-lg bg-slate-950/70 border border-red-900/30 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{g.skillName}</div>
                    <div className="text-[11px] text-slate-400">Current: {g.currentScore}% · Target: {g.requiredScore}%</div>
                  </div>
                  <span className="text-xs font-bold text-red-400">-{g.gapPercentage}%</span>
                </div>
              ))
            ) : (
              <div className="p-3 text-xs text-slate-400">No critical gaps identified.</div>
            )}
          </div>
        </div>

        {/* Moderate / Weak Skills */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Moderate Deficits</h3>
          </div>
          <p className="text-xs text-slate-400">
            Skills within reach of standard benchmarks that can be polished with focused weekly projects:
          </p>
          <div className="space-y-2.5">
            {weakSkills.length > 0 || readiness.moderateSkills.length > 0 ? (
              [...weakSkills, ...readiness.moderateSkills].slice(0, 3).map(g => (
                <div key={g.skillId} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{g.skillName}</div>
                    <div className="text-[11px] text-slate-400">Current: {g.currentScore}% · Target: {g.requiredScore}%</div>
                  </div>
                  <span className="text-xs font-bold text-amber-400">-{g.gapPercentage}%</span>
                </div>
              ))
            ) : (
              <div className="p-3 text-xs text-slate-400">No moderate deficits.</div>
            )}
          </div>
        </div>

        {/* Strong Skills */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-emerald-900/40 space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Strong Assets</h3>
          </div>
          <p className="text-xs text-slate-400">
            Core competencies where you meet or exceed required hiring benchmarks:
          </p>
          <div className="space-y-2.5">
            {strongSkills.length > 0 ? (
              strongSkills.slice(0, 3).map(g => (
                <div key={g.skillId} className="p-3 rounded-lg bg-slate-950/70 border border-emerald-900/30 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{g.skillName}</div>
                    <div className="text-[11px] text-slate-400">Score: {g.currentScore}% · Target: {g.requiredScore}%</div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">Ready</span>
                </div>
              ))
            ) : (
              <div className="p-3 text-xs text-slate-400">Assess more skills to record strong competencies.</div>
            )}
          </div>
        </div>

      </div>

      {/* Navigation Footers */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <button
          onClick={onOpenRecommendations}
          className="px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
        >
          <BrainCircuit className="w-4 h-4 text-purple-400" />
          <span>View Machine Learning Recommendations</span>
        </button>

        <button
          onClick={onOpenRoadmap}
          className="px-6 py-2.5 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>Open Personalized 5-Week Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
