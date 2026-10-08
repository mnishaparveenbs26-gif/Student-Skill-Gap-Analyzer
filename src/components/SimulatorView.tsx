import React, { useState, useMemo } from 'react';
import { Career, Skill, StudentSkill, SkillGapItem } from '../types';
import { calculateCareerReadiness, calculateSkillGaps } from '../services/analyticsService';
import { 
  Sliders, 
  RotateCcw, 
  Sparkles, 
  Save, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SimulatorViewProps {
  skills: Skill[];
  studentSkills: StudentSkill[];
  targetCareer: Career;
  onApplyImprovements: (newScores: Record<string, number>, readinessDelta: number) => void;
  onBackToReadiness: () => void;
}

export const SimulatorView: React.FC<SimulatorViewProps> = ({
  skills,
  studentSkills,
  targetCareer,
  onApplyImprovements,
  onBackToReadiness,
}) => {
  // Map current student skills
  const baselineScores = useMemo(() => {
    const map: Record<string, number> = {};
    studentSkills.forEach(s => {
      map[s.skillId] = s.score;
    });
    return map;
  }, [studentSkills]);

  // Baseline readiness
  const baselineReadiness = useMemo(() => {
    return calculateCareerReadiness(skills, studentSkills, targetCareer);
  }, [skills, studentSkills, targetCareer]);

  // Local simulated overrides
  const [simulatedScores, setSimulatedScores] = useState<Record<string, number>>(() => {
    return { ...baselineScores };
  });

  // Calculate simulated readiness in real-time
  const simulatedReadiness = useMemo(() => {
    return calculateCareerReadiness(skills, studentSkills, targetCareer, simulatedScores);
  }, [skills, studentSkills, targetCareer, simulatedScores]);

  // Skill gaps for the target career
  const baseGaps = useMemo(() => {
    return calculateSkillGaps(skills, studentSkills, targetCareer);
  }, [skills, studentSkills, targetCareer]);

  // Count changed skills
  const changedSkillsCount = useMemo(() => {
    let count = 0;
    targetCareer.requirements.forEach(req => {
      const base = baselineScores[req.skillId] ?? 0;
      const sim = simulatedScores[req.skillId] ?? base;
      if (sim !== base) count++;
    });
    return count;
  }, [baselineScores, simulatedScores, targetCareer]);

  const scoreDelta = simulatedReadiness.overallReadiness - baselineReadiness.overallReadiness;

  const handleSliderChange = (skillId: string, val: number) => {
    setSimulatedScores(prev => ({
      ...prev,
      [skillId]: val
    }));
  };

  const handleReset = () => {
    setSimulatedScores({ ...baselineScores });
  };

  // Preset Scenario 1: SQL to 80% (Prompt demo: 72% -> 80%)
  const handlePresetSQL = () => {
    setSimulatedScores({
      ...baselineScores,
      'sk-sql': 80
    });
  };

  // Preset Scenario 2: SQL to 80% + Power BI to 75% (Prompt demo: 72% -> 88%)
  const handlePresetBoth = () => {
    setSimulatedScores({
      ...baselineScores,
      'sk-sql': 80,
      'sk-pbi': 75
    });
  };

  const handleCommit = () => {
    // Fire confetti for celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore in tests
    }

    onApplyImprovements(simulatedScores, scoreDelta);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Simulator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            What If I Improve My Skills?
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Virtually elevate individual or multiple skills to see the exact predicted impact on your <span className="text-white font-medium">{targetCareer.name}</span> readiness before committing changes.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleCommit}
            disabled={changedSkillsCount === 0}
            className={`px-5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-lg ${
              changedSkillsCount > 0
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-950/30'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Save Improvements to Profile</span>
          </button>
        </div>
      </div>

      {/* Prompts Preset Demo Buttons */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-slate-300">
          <strong className="text-cyan-400">Quick Test Scenarios:</strong> Replicate the project benchmark scenarios in 1 click:
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePresetSQL}
            className="px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800 rounded-lg transition-colors cursor-pointer"
          >
            Scenario 1: SQL 40% → 80% (Yields 80%)
          </button>
          <button
            onClick={handlePresetBoth}
            className="px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800 rounded-lg transition-colors cursor-pointer"
          >
            Scenario 2: SQL 80% + Power BI 75% (Yields 88%)
          </button>
        </div>
      </div>

      {/* Side-by-Side Dual Readiness Visualizer Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/50 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          
          {/* Baseline Score Display */}
          <div className="md:col-span-4 p-6 rounded-2xl bg-[#0b0f19]/90 border border-slate-800 text-center flex flex-col items-center justify-center">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Current Baseline Readiness
            </span>
            <div className="my-3 text-4xl sm:text-5xl font-black text-slate-300 tabular-nums">
              {baselineReadiness.overallReadiness}%
            </div>
            <div className="text-xs font-semibold px-2.5 py-1 rounded-full text-slate-400 bg-slate-800">
              {baselineReadiness.tier}
            </div>
            <div className="text-[11px] text-slate-500 mt-2">
              Based on your recorded assessments
            </div>
          </div>

          {/* Transformation Delta Indicator */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <TrendingUp className="w-6 h-6" />
            </div>

            <div className="text-xs text-slate-400">Predicted Readiness Boost</div>

            <div className={`text-2xl sm:text-3xl font-extrabold tabular-nums ${
              scoreDelta > 0 ? 'text-emerald-400' : 'text-slate-500'
            }`}>
              {scoreDelta > 0 ? `+${scoreDelta}%` : '0%'}
            </div>

            <div className="text-xs text-slate-400 max-w-[200px]">
              {scoreDelta > 0
                ? `${changedSkillsCount} skill improvements simulated`
                : 'Drag the sliders below to simulate growth'}
            </div>
          </div>

          {/* Predicted Score Display */}
          <div className="md:col-span-4 p-6 rounded-2xl bg-[#0b0f19]/90 border border-cyan-500/50 text-center flex flex-col items-center justify-center shadow-lg shadow-cyan-950/30">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulated Predicted Readiness</span>
            </span>
            <div className="my-3 text-4xl sm:text-5xl font-black text-cyan-300 tabular-nums">
              {simulatedReadiness.overallReadiness}%
            </div>
            <div 
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ color: simulatedReadiness.tierColor, backgroundColor: `${simulatedReadiness.tierColor}20` }}
            >
              {simulatedReadiness.tier}
            </div>
            <div className="text-[11px] text-cyan-400/80 mt-2">
              Target: {targetCareer.name}
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Sliders for Career Required Skills */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Target Career Skills Simulator Controls</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Adjust any skill proficiency to see the instantaneous change in your weighted score.
          </p>
        </div>

        <div className="space-y-6">
          {targetCareer.requirements.map(req => {
            const skillObj = skills.find(s => s.id === req.skillId);
            const skillName = skillObj ? skillObj.name : req.skillId;
            const baseScore = baselineScores[req.skillId] ?? 0;
            const currentSim = simulatedScores[req.skillId] ?? baseScore;
            const isChanged = currentSim !== baseScore;
            const diff = currentSim - baseScore;

            return (
              <div 
                key={req.skillId} 
                className={`p-4 rounded-xl border transition-all ${
                  isChanged 
                    ? 'bg-slate-900/90 border-cyan-500/50 shadow-md' 
                    : 'bg-slate-950/50 border-slate-800/80'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{skillName}</span>
                    <span className="text-[11px] font-mono text-slate-500">Weight: {req.importance}</span>
                    {isChanged && (
                      <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800">
                        {diff > 0 ? `+${diff}% Boost` : `${diff}%`}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-slate-400">
                      Base: <strong className="text-slate-300">{baseScore}%</strong>
                    </span>
                    <span className="text-indigo-400">
                      Req: <strong>{req.requiredScore}%</strong>
                    </span>
                    <span className="text-cyan-400 font-bold text-sm tabular-nums">
                      Simulated: {currentSim}%
                    </span>
                  </div>
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentSim}
                  onChange={(e) => handleSliderChange(req.skillId, Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg cursor-pointer"
                />

                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>0%</span>
                  <span>Required Benchmark: {req.requiredScore}%</span>
                  <span>100%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Save Actions Bar */}
      {changedSkillsCount > 0 && (
        <div className="sticky bottom-4 z-20 p-4 rounded-xl bg-slate-900/95 backdrop-blur-md border border-cyan-500/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="text-xs text-slate-200">
            Simulated <strong className="text-white">{changedSkillsCount}</strong> skills: Predicted career readiness elevates from <strong className="text-slate-300">{baselineReadiness.overallReadiness}%</strong> to <strong className="text-emerald-400 font-bold">{simulatedReadiness.overallReadiness}%</strong> (+{scoreDelta}%).
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Reset
            </button>
            <button
              onClick={handleCommit}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Apply &amp; Save Improvements to Profile</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
