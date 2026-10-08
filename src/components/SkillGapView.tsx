import React, { useState } from 'react';
import { Career, SkillGapItem } from '../types';
import { 
  ArrowRight, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  BarChart3, 
  Sliders, 
  Layers,
  Sparkles
} from 'lucide-react';

interface SkillGapViewProps {
  targetCareer: Career;
  gapItems: SkillGapItem[];
  onViewReadiness: () => void;
  onOpenSimulator: () => void;
  onChangeCareer: () => void;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({
  targetCareer,
  gapItems,
  onViewReadiness,
  onOpenSimulator,
  onChangeCareer,
}) => {
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const filteredItems = gapItems.filter(item => {
    if (filterPriority === 'all') return true;
    if (filterPriority === 'critical') return item.priority === 'Critical';
    if (filterPriority === 'high') return item.priority === 'High';
    if (filterPriority === 'medium') return item.priority === 'Medium';
    if (filterPriority === 'low') return item.priority === 'Low';
    return true;
  });

  const criticalCount = gapItems.filter(i => i.priority === 'Critical').length;
  const highCount = gapItems.filter(i => i.priority === 'High').length;
  const readyCount = gapItems.filter(i => i.status === 'Almost Ready').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-1">
            Phase 3 · Quantitative Analytics
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Skill Gap Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Mathematical comparison of your evaluated proficiencies against standard <span className="text-white font-medium">{targetCareer.name}</span> requirements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSimulator}
            className="px-4 py-2.5 text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/60 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Test What-If Scenarios</span>
          </button>

          <button
            onClick={onViewReadiness}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg shadow-lg shadow-cyan-950/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>View Career Readiness Score</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Analytical Visual Comparison Bar Chart */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Skill Level Comparison Chart</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Direct comparison between your current evaluation and the required industry baseline.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-cyan-500"></span>
              <span className="text-slate-300">Your Current Level</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-indigo-500"></span>
              <span className="text-slate-300">Target Benchmark</span>
            </div>
          </div>
        </div>

        {/* Horizontal Comparative Bar Chart */}
        <div className="space-y-4 pt-2">
          {gapItems.map((item) => (
            <div key={item.skillId} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-white">{item.skillName}</span>
                <span className="font-mono text-slate-400 text-[11px] tabular-nums">
                  Current: <strong className="text-cyan-400">{item.currentScore}%</strong> / Target: <strong className="text-indigo-400">{item.requiredScore}%</strong>
                  {item.gapScore > 0 ? (
                    <span className="text-red-400 ml-1.5">({item.gapPercentage}% Gap)</span>
                  ) : (
                    <span className="text-emerald-400 ml-1.5">(Target Met)</span>
                  )}
                </span>
              </div>
              
              <div className="relative w-full h-3.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                {/* Target Benchmark indicator (background filled) */}
                <div
                  className="absolute top-0 bottom-0 left-0 bg-indigo-600/30 rounded-full"
                  style={{ width: `${item.requiredScore}%` }}
                />
                {/* Student Current score */}
                <div
                  className={`absolute top-0 bottom-0 left-0 rounded-full transition-all duration-500 ${
                    item.currentScore >= item.requiredScore
                      ? 'bg-emerald-500'
                      : item.priority === 'Critical'
                      ? 'bg-red-500'
                      : 'bg-cyan-500'
                  }`}
                  style={{ width: `${item.currentScore}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Priority Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40">
          <div className="text-xs text-red-300 font-medium">Critical Deficits</div>
          <div className="text-2xl font-bold text-red-400 tabular-nums mt-1">{criticalCount} Skills</div>
          <div className="text-[11px] text-slate-400 mt-1">High gap percentage with critical role weight (Importance $\ge$ 4)</div>
        </div>

        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40">
          <div className="text-xs text-amber-300 font-medium">High / Medium Gaps</div>
          <div className="text-2xl font-bold text-amber-400 tabular-nums mt-1">{highCount} Skills</div>
          <div className="text-[11px] text-slate-400 mt-1">Moderate gap requiring structured weekly roadmap focus</div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
          <div className="text-xs text-emerald-300 font-medium">Almost Ready / Benchmarked</div>
          <div className="text-2xl font-bold text-emerald-400 tabular-nums mt-1">{readyCount} Skills</div>
          <div className="text-[11px] text-slate-400 mt-1">Within 15% of standard industry requirement</div>
        </div>
      </div>

      {/* Main Analytical Table */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white">Detailed Skill Gap Matrix</h2>
            <div className="text-xs text-slate-400 mt-0.5">
              Formula: <code className="text-cyan-400 font-mono text-[11px]">Skill Gap = Required - Current</code> · <code className="text-cyan-400 font-mono text-[11px]">Gap % = (Gap / Required) * 100</code>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 self-start">
            {['all', 'critical', 'high', 'medium', 'low'].map(f => (
              <button
                key={f}
                onClick={() => setFilterPriority(f)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded capitalize cursor-pointer transition-colors ${
                  filterPriority === f ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px] font-semibold tracking-wider">
                <th className="py-3 px-3">Skill</th>
                <th className="py-3 px-3 text-right">Current Level</th>
                <th className="py-3 px-3 text-right">Required Level</th>
                <th className="py-3 px-3 text-right">Gap Percentage</th>
                <th className="py-3 px-3 text-center">Importance</th>
                <th className="py-3 px-3 text-center">Priority</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredItems.map((item) => (
                <tr key={item.skillId} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-white">{item.skillName}</div>
                    <div className="text-[10px] text-slate-500">{item.category}</div>
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono tabular-nums text-slate-200">
                    {item.currentScore}%
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono tabular-nums text-indigo-300">
                    {item.requiredScore}%
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono tabular-nums">
                    {item.gapScore > 0 ? (
                      <span className={item.gapPercentage >= 50 ? 'text-red-400 font-bold' : 'text-amber-400 font-medium'}>
                        {item.gapPercentage}%
                      </span>
                    ) : (
                      <span className="text-emerald-400">0%</span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-center font-mono">
                    <span className="text-slate-400 text-[11px]">Weight {item.importance}</span>
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      item.priority === 'Critical'
                        ? 'bg-red-950/60 text-red-300 border border-red-900/60'
                        : item.priority === 'High'
                        ? 'bg-orange-950/60 text-orange-300 border border-orange-900/60'
                        : item.priority === 'Medium'
                        ? 'bg-amber-950/60 text-amber-300 border border-amber-900/60'
                        : 'bg-emerald-950/60 text-emerald-300 border border-emerald-900/60'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`text-[11px] font-medium ${
                      item.status === 'Almost Ready'
                        ? 'text-emerald-400'
                        : item.status === 'Critical Gap'
                        ? 'text-red-400'
                        : 'text-amber-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Call to Action Footer */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-white">Next Step: Comprehensive Career Readiness Score</div>
          <div className="text-xs text-slate-400 mt-0.5">
            View your weighted composite readiness percentage, readiness classification tier, and strength breakdowns.
          </div>
        </div>
        <button
          onClick={onViewReadiness}
          className="px-6 py-2.5 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span>Calculate Career Readiness Score</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
