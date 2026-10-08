import React from 'react';
import { ProgressHistoryEntry, Career, ReadinessAnalysis, RoadmapTask } from '../types';
import { Award, TrendingUp, Calendar, ArrowRight, CheckCircle2, History } from 'lucide-react';

interface ProgressViewProps {
  history: ProgressHistoryEntry[];
  targetCareer: Career;
  currentReadiness: ReadinessAnalysis;
  roadmapTasks: RoadmapTask[];
  onNavigateToSimulator: () => void;
  onNavigateToRoadmap: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  history,
  targetCareer,
  currentReadiness,
  roadmapTasks,
  onNavigateToSimulator,
  onNavigateToRoadmap,
}) => {
  const completedCount = roadmapTasks.filter(t => t.isCompleted).length;
  const roadmapPercent = roadmapTasks.length > 0 ? Math.round((completedCount / tasksLengthSafe(roadmapTasks.length)) * 100) : 0;

  function tasksLengthSafe(len: number) {
    return len === 0 ? 1 : len;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-1">
            Tracking &amp; Trajectory
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Progress Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Audit your historical skill score elevations, readiness gains, and learning roadmap completion milestones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToSimulator}
            className="px-4 py-2 text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-950/40 border border-cyan-800 rounded-lg transition-colors cursor-pointer"
          >
            Simulate Next Milestone
          </button>
        </div>
      </div>

      {/* Trajectory Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400">Current Career Readiness</div>
          <div className="text-3xl font-black text-white tabular-nums mt-1">
            {currentReadiness.overallReadiness}%
          </div>
          <div className="text-[11px] text-cyan-400 mt-1">{currentReadiness.tier}</div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400">Total Recorded Updates</div>
          <div className="text-3xl font-black text-emerald-400 tabular-nums mt-1">
            {history.length} Events
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Audit log of skill advancements</div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400">Roadmap Milestone Completion</div>
          <div className="text-3xl font-black text-teal-400 tabular-nums mt-1">
            {roadmapPercent}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {completedCount} of {roadmapTasks.length} milestones finished
          </div>
        </div>
      </div>

      {/* Progress Log Table */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-400" />
          <h2 className="text-base font-bold text-white">Skill Advancement Audit Trail</h2>
        </div>

        {history.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px] font-semibold">
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Skill</th>
                  <th className="py-3 px-3 text-right">Old Score</th>
                  <th className="py-3 px-3 text-right">New Score</th>
                  <th className="py-3 px-3 text-right">Improvement</th>
                  <th className="py-3 px-3 text-right">Readiness Impact</th>
                  <th className="py-3 px-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {history.map((entry) => (
                  <tr key={entry.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-3 font-mono text-slate-400 text-[11px]">
                      {entry.date}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-white">
                      {entry.skillName}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-slate-400">
                      {entry.oldScore}%
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-cyan-400 font-bold">
                      {entry.newScore}%
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-emerald-400 font-bold">
                      +{entry.improvement}%
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-slate-300">
                      {entry.readinessBefore}% → <strong className="text-cyan-300">{entry.readinessAfter}%</strong>
                    </td>
                    <td className="py-3.5 px-3 text-slate-400 text-[11px]">
                      {entry.notes || 'Skill improvement applied'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-slate-400 bg-slate-950/40 rounded-xl border border-slate-800">
            No skill improvements recorded yet. Complete roadmap milestones or apply changes in the What-If Simulator to generate your audit trail.
          </div>
        )}
      </div>

    </div>
  );
};
