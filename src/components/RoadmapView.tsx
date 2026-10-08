import React from 'react';
import { RoadmapTask, Career } from '../types';
import { 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Clock, 
  BookOpen, 
  Target, 
  ArrowRight, 
  Sparkles, 
  Flame,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RoadmapViewProps {
  tasks: RoadmapTask[];
  targetCareer: Career;
  onToggleTask: (taskId: string) => void;
  onNavigateToSimulator: () => void;
  onNavigateToProgress: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  tasks,
  targetCareer,
  onToggleTask,
  onNavigateToSimulator,
  onNavigateToProgress,
}) => {
  const completedCount = tasks.filter(t => t.isCompleted).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const handleToggle = (taskId: string, isCurrentlyCompleted: boolean) => {
    if (!isCurrentlyCompleted) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // ignore
      }
    }
    onToggleTask(taskId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-1">
            Personalized Curriculum · Dynamic Deficit Resolution
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Personalized Learning Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Custom-tailored study milestones generated directly from your highest-priority gaps for <span className="text-white font-medium">{targetCareer.name}</span>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToProgress}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            <span>View Progress Log</span>
          </button>
        </div>
      </div>

      {/* Progress Completion Overview Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-teal-950/30 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
            Roadmap Execution Status
          </div>
          <div className="text-xl font-bold text-white flex items-center gap-2">
            <span>{completedCount} of {tasks.length} Milestones Completed</span>
            <span className="text-teal-400 font-mono text-sm">({progressPercent}%)</span>
          </div>
          <div className="text-xs text-slate-400">
            Each completed task reinforces your score and recalculates career readiness.
          </div>
        </div>

        <div className="w-full sm:w-64 space-y-1.5">
          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>Start</span>
            <span>Interview Ready</span>
          </div>
        </div>
      </div>

      {/* Weekly Roadmap Timeline */}
      <div className="space-y-6">
        {tasks.map((task, index) => {
          return (
            <div
              key={task.id}
              className={`p-6 rounded-2xl border transition-all ${
                task.isCompleted
                  ? 'bg-slate-900/40 border-emerald-900/40 opacity-80'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 shadow-lg'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                
                {/* Left: Week badge and details */}
                <div className="flex items-start gap-4">
                  {/* Interactive Checkbox */}
                  <button
                    onClick={() => handleToggle(task.id, task.isCompleted)}
                    className="mt-1 text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer shrink-0"
                    title={task.isCompleted ? 'Mark as Pending' : 'Mark as Completed'}
                  >
                    {task.isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <Circle className="w-6 h-6 hover:text-cyan-400" />
                    )}
                  </button>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800">
                        WEEK {task.week}
                      </span>
                      <span className="text-xs font-semibold text-slate-300">
                        {task.skillName}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        task.priority === 'Critical'
                          ? 'bg-red-950/60 text-red-300 border border-red-900'
                          : task.priority === 'High'
                          ? 'bg-orange-950/60 text-orange-300 border border-orange-900'
                          : 'bg-amber-950/60 text-amber-300 border border-amber-900'
                      }`}>
                        {task.priority} Priority
                      </span>
                    </div>

                    <h3 className={`text-base sm:text-lg font-bold ${
                      task.isCompleted ? 'text-slate-400 line-through' : 'text-white'
                    }`}>
                      {task.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                      {task.description}
                    </p>

                    {/* Key Topics List */}
                    <div className="pt-2">
                      <div className="text-[11px] text-slate-500 mb-1 font-medium">Core Study Topics:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {task.keyTopics.map((topic, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Suggested Milestone Project */}
                    <div className="mt-3 p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center gap-2 text-xs">
                      <Target className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div>
                        <span className="text-slate-400">Milestone Project: </span>
                        <span className="font-semibold text-slate-200">{task.suggestedProject}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Hours, Score Boost, and Action */}
                <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                  <div className="text-right">
                    <div className="text-xs font-mono text-emerald-400 font-bold">
                      +{task.scoreBoost}% Score Boost
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 justify-end mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>~{task.estimatedHours} Hours</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggle(task.id, task.isCompleted)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      task.isCompleted
                        ? 'bg-slate-800 text-slate-400 hover:text-white'
                        : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md'
                    }`}
                  >
                    {task.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
