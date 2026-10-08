import React from 'react';
import { Career, Skill } from '../types';
import { Compass, CheckCircle2, ArrowRight, TrendingUp, DollarSign, Award } from 'lucide-react';

interface CareerSelectionViewProps {
  careers: Career[];
  skills: Skill[];
  selectedCareerId?: string;
  onSelectCareer: (careerId: string) => void;
}

export const CareerSelectionView: React.FC<CareerSelectionViewProps> = ({
  careers,
  skills,
  selectedCareerId,
  onSelectCareer,
}) => {
  const getSkillName = (id: string) => {
    const s = skills.find(sk => sk.id === id);
    return s ? s.name : id;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-1">
          Phase 2 · Target Benchmark
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Select Your Target Career
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Choose the career profile you aspire to enter. The system will benchmark your evaluated skills against calibrated industry requirements.
        </p>
      </div>

      {/* Career Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careers.map((career) => {
          const isSelected = career.id === selectedCareerId;

          return (
            <div
              key={career.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-slate-900 to-cyan-950/40 border-cyan-500 shadow-xl shadow-cyan-950/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>{career.industry}</span>
                  <span className={`text-[11px] font-semibold ${
                    career.demandLevel === 'Very High' ? 'text-emerald-400' : 'text-cyan-400'
                  }`}>
                    {career.demandLevel} Demand
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{career.name}</h3>
                  {isSelected && (
                    <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-950/70 border border-cyan-800 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Active</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {career.description}
                </p>

                {/* Salary Range */}
                <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-300">
                  <span className="text-slate-500">Typical Base:</span>
                  <span className="font-semibold text-slate-200">{career.averageSalary}</span>
                </div>

                {/* Required Skills Badges */}
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <div className="text-[11px] text-slate-400 mb-2 font-medium">
                    Required Competency Benchmarks ({career.requirements.length}):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {career.requirements.map(req => (
                      <span
                        key={req.skillId}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1"
                      >
                        <span>{getSkillName(req.skillId)}</span>
                        <span className="text-cyan-400 font-semibold">{req.requiredScore}%</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => onSelectCareer(career.id)}
                  className={`w-full py-2.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700'
                  }`}
                >
                  <span>{isSelected ? 'View Skill Gap Analysis' : 'Select Career & Analyze Gap'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
