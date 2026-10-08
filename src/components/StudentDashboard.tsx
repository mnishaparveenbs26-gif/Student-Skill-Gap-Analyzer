import React from 'react';
import { 
  User, 
  StudentProfile, 
  Career, 
  ReadinessAnalysis, 
  RoadmapTask, 
  StudentSkill 
} from '../types';
import { 
  Target, 
  Sliders, 
  Compass, 
  TrendingUp, 
  BookOpen, 
  BrainCircuit, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  Activity,
  Layers,
  Award
} from 'lucide-react';

interface StudentDashboardProps {
  user: User;
  profile: StudentProfile;
  targetCareer: Career;
  studentSkills: StudentSkill[];
  readiness: ReadinessAnalysis;
  roadmapTasks: RoadmapTask[];
  onNavigate: (tab: string) => void;
  onLogout: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  profile,
  targetCareer,
  studentSkills,
  readiness,
  roadmapTasks,
  onNavigate,
  onLogout,
}) => {
  const completedTasksCount = roadmapTasks.filter(t => t.isCompleted).length;
  const criticalGapsCount = readiness.criticalGaps.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Welcome & Profile Bar */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-indigo-950/40 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Student Academic Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, {user.name}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
            <span>{profile.degree}</span>
            <span aria-hidden="true">·</span>
            <span>{profile.department}</span>
            <span aria-hidden="true">·</span>
            <span>{profile.year}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-medium font-mono tabular-nums">CGPA: {profile.cgpa}</span>
          </div>
        </div>

        {/* Current Target Career Badge & Switcher */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-4 md:min-w-[280px]">
          <div>
            <div className="text-[11px] text-slate-400">Target Career</div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
              <span>{targetCareer.name}</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">{targetCareer.industry}</div>
          </div>
          <button
            onClick={() => onNavigate('careers')}
            className="px-3 py-1.5 text-xs font-semibold text-cyan-400 hover:text-white bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/50 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Change
          </button>
        </div>
      </div>

      {/* 4 Core Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Overall Readiness */}
        <div 
          onClick={() => onNavigate('readiness')}
          className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Career Readiness</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tabular-nums">
              {readiness.overallReadiness}%
            </span>
            <span 
              className="text-xs font-medium px-2 py-0.5 rounded"
              style={{ color: readiness.tierColor, backgroundColor: `${readiness.tierColor}15` }}
            >
              {readiness.tier}
            </span>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Weighted benchmark score</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-cyan-400" />
          </div>
        </div>

        {/* Metric 2: Skills Assessed */}
        <div 
          onClick={() => onNavigate('assessment')}
          className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Skills Assessed</span>
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tabular-nums">
              {studentSkills.length}
            </span>
            <span className="text-xs text-slate-400">/ 22 Cataloged</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Update proficiencies</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-indigo-400" />
          </div>
        </div>

        {/* Metric 3: Active Skill Gaps */}
        <div 
          onClick={() => onNavigate('skill-gap')}
          className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Active Skill Gaps</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tabular-nums">
              {criticalGapsCount + readiness.weakSkills.length}
            </span>
            {criticalGapsCount > 0 && (
              <span className="text-xs font-semibold text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-900/40">
                {criticalGapsCount} Critical
              </span>
            )}
          </div>
          <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Inspect gap details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-amber-400" />
          </div>
        </div>

        {/* Metric 4: Completed Roadmap Tasks */}
        <div 
          onClick={() => onNavigate('roadmap')}
          className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Roadmap Progress</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tabular-nums">
              {completedTasksCount}
            </span>
            <span className="text-xs text-slate-400">/ {roadmapTasks.length} Milestones</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Continue weekly study</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-emerald-400" />
          </div>
        </div>

      </div>

      {/* Main Action Workflows (8 Core Buttons as specified in Prompt Section 8) */}
      <div>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Core Guidance Modules
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          
          <button
            onClick={() => onNavigate('assessment')}
            className="p-4 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/30 transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">1. Skill Assessment</div>
              <div className="text-[11px] text-slate-400 mt-1">Rate skills across 5 categories</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('careers')}
            className="p-4 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/30 transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-105 transition-transform">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">2. Select Career</div>
              <div className="text-[11px] text-slate-400 mt-1">Switch or benchmark 8+ roles</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('skill-gap')}
            className="p-4 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/30 transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">3. Analyze Skill Gap</div>
              <div className="text-[11px] text-slate-400 mt-1">Full comparative gap analysis</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('readiness')}
            className="p-4 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/30 transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">4. View Readiness</div>
              <div className="text-[11px] text-slate-400 mt-1">Animated gauge &amp; strength breakdown</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('recommendations')}
            className="p-4 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-purple-500/30 transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-105 transition-transform">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">5. ML Recommendations</div>
              <div className="text-[11px] text-slate-400 mt-1">Random Forest career predictions</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('simulator')}
            className="p-4 rounded-xl bg-gradient-to-br from-slate-900/80 to-cyan-950/30 hover:to-cyan-900/40 border border-cyan-500/30 hover:border-cyan-400 transition-all text-left flex flex-col justify-between group cursor-pointer shadow-lg shadow-cyan-950/20"
          >
            <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 mb-3 group-hover:scale-105 transition-transform">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>6. What-If Simulator</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              </div>
              <div className="text-[11px] text-cyan-300/80 mt-1">Simulate skill boost predictions</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('roadmap')}
            className="p-4 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-teal-500/30 transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-3 group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">7. Learning Roadmap</div>
              <div className="text-[11px] text-slate-400 mt-1">5-Week personalized milestones</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('progress')}
            className="p-4 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/30 transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-105 transition-transform">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">8. Track Progress</div>
              <div className="text-[11px] text-slate-400 mt-1">Historical score updates &amp; trajectory</div>
            </div>
          </button>

        </div>
      </div>

      {/* Critical Gaps Spotlight vs Strong Skills */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Urgent Gaps */}
        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <h3 className="text-sm font-bold text-white">High Priority Skill Deficits</h3>
            </div>
            <button
              onClick={() => onNavigate('simulator')}
              className="text-xs text-cyan-400 hover:underline cursor-pointer"
            >
              Simulate closing these
            </button>
          </div>

          <div className="space-y-3">
            {readiness.criticalGaps.length > 0 || readiness.weakSkills.length > 0 ? (
              [...readiness.criticalGaps, ...readiness.weakSkills].slice(0, 3).map((item) => (
                <div key={item.skillId} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">{item.skillName}</div>
                    <div className="text-[11px] text-slate-500">
                      Current: {item.currentScore}% · Required: {item.requiredScore}%
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-red-400 bg-red-950/50 px-2 py-0.5 rounded border border-red-900/40">
                      -{item.gapPercentage}% Gap
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                🎉 No critical gaps identified! You meet the major benchmarks.
              </div>
            )}
          </div>
        </div>

        {/* Strong Skills */}
        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Strong Assets for {targetCareer.name}</h3>
            </div>
            <button
              onClick={() => onNavigate('assessment')}
              className="text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              View all
            </button>
          </div>

          <div className="space-y-3">
            {readiness.strongSkills.length > 0 ? (
              readiness.strongSkills.slice(0, 3).map((item) => (
                <div key={item.skillId} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">{item.skillName}</div>
                    <div className="text-[11px] text-slate-500">
                      Score: {item.currentScore}% · Target: {item.requiredScore}%
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900/40">
                      Benchmarked
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                Complete skill assessments to benchmark strong competencies.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
