import React from 'react';
import { CareerRecommendation } from '../types';
import { BrainCircuit, CheckCircle2, ArrowRight, Sparkles, TrendingUp, Compass } from 'lucide-react';

interface RecommendationsViewProps {
  recommendations: CareerRecommendation[];
  currentTargetCareerId: string;
  onSelectTargetCareer: (careerId: string) => void;
  onBackToDashboard: () => void;
}

export const RecommendationsView: React.FC<RecommendationsViewProps> = ({
  recommendations,
  currentTargetCareerId,
  onSelectTargetCareer,
  onBackToDashboard,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-1">
          Machine Learning Module · Multi-Career Prediction
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Career Recommendations
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Based on your multi-dimensional skill vector, our Random Forest classifier predicts which industry career paths offer the highest natural fit.
        </p>
      </div>

      {/* Model Information Notice (Transparent & Academic) */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
          <BrainCircuit className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-white">
            Explainable Machine Learning Ensemble (Random Forest 100 Estimators)
          </div>
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
            Prediction probabilities evaluate your technical and professional competencies against 2,000+ benchmarked profiles. This provides career guidance, not deterministic restriction.
          </p>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec, index) => {
          const isCurrentTarget = rec.career.id === currentTargetCareerId;
          const isTopPick = index === 0;

          return (
            <div
              key={rec.career.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                isTopPick
                  ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border-indigo-500/60 shadow-xl shadow-indigo-950/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header row with Match percentage */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">#{index + 1}</span>
                    <span className="text-xs text-slate-400">{rec.career.industry}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={`text-base font-extrabold tabular-nums ${
                      rec.matchPercentage >= 80
                        ? 'text-emerald-400'
                        : rec.matchPercentage >= 65
                        ? 'text-cyan-400'
                        : 'text-amber-400'
                    }`}>
                      {rec.matchPercentage}%
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase">Match</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{rec.career.name}</h3>
                  {isCurrentTarget && (
                    <span className="text-[10px] text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                      Your Target
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {rec.career.description}
                </p>

                {/* Match Progress Bar */}
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Ensemble Probability</span>
                    <span className="font-mono text-white">{rec.predictedProbability}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        rec.matchPercentage >= 80 ? 'bg-emerald-500' : rec.matchPercentage >= 65 ? 'bg-cyan-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${rec.matchPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Positive Alignment Skills */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Your strongest alignments:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {rec.topPositiveSkills.length > 0 ? (
                      rec.topPositiveSkills.map((s, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-slate-500">General aptitude alignment</span>
                    )}
                  </div>
                </div>

                {/* Key Gaps */}
                {rec.keyGapSkills.length > 0 && (
                  <div className="mt-2.5 space-y-1">
                    <div className="text-[11px] text-amber-400 font-medium">
                      Key gaps to bridge for this role:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {rec.keyGapSkills.map((s, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-red-950/40 border border-red-900/40 text-red-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => onSelectTargetCareer(rec.career.id)}
                  className={`w-full py-2.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isCurrentTarget
                      ? 'bg-slate-800 text-slate-400 cursor-default'
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md'
                  }`}
                  disabled={isCurrentTarget}
                >
                  <span>{isCurrentTarget ? 'Currently Active Target' : 'Set as My Target Career'}</span>
                  {!isCurrentTarget && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
