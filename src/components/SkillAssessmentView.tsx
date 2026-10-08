import React, { useState } from 'react';
import { Skill, SkillCategory, StudentSkill } from '../types';
import { Check, Save, ArrowRight, Filter, Search, RotateCcw } from 'lucide-react';

interface SkillAssessmentViewProps {
  skills: Skill[];
  studentSkills: StudentSkill[];
  onSaveAssessment: (updatedSkills: StudentSkill[]) => void;
  onContinueToCareers: () => void;
}

export const SkillAssessmentView: React.FC<SkillAssessmentViewProps> = ({
  skills,
  studentSkills,
  onSaveAssessment,
  onContinueToCareers,
}) => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Local state for ratings
  const [localRatings, setLocalRatings] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    studentSkills.forEach(s => {
      map[s.skillId] = s.score;
    });
    return map;
  });

  const [hasSaved, setHasSaved] = useState(false);

  const categories: (SkillCategory | 'All')[] = ['All', 'Programming', 'Data', 'Web', 'AI/ML', 'Professional'];

  const handleScoreChange = (skillId: string, newScore: number) => {
    setLocalRatings(prev => ({
      ...prev,
      [skillId]: Math.max(0, Math.min(100, newScore))
    }));
    setHasSaved(false);
  };

  const handleLevelSelect = (skillId: string, level: 1 | 2 | 3) => {
    // 1 -> 35%, 2 -> 65%, 3 -> 90%
    const score = level === 1 ? 35 : level === 2 ? 65 : 90;
    handleScoreChange(skillId, score);
  };

  const handleSave = () => {
    const updated: StudentSkill[] = Object.entries(localRatings).map(([skillId, score]) => {
      let proficiencyLevel: 1 | 2 | 3 = 1;
      if (score >= 76) proficiencyLevel = 3;
      else if (score >= 41) proficiencyLevel = 2;
      else proficiencyLevel = 1;

      return {
        skillId,
        score,
        proficiencyLevel
      };
    });

    onSaveAssessment(updated);
    setHasSaved(true);
    setTimeout(() => setHasSaved(false), 2500);
  };

  const handleSaveAndContinue = () => {
    handleSave();
    onContinueToCareers();
  };

  const filteredSkills = skills.filter(skill => {
    const matchesCategory = activeCategory === 'All' || skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-1">
            Phase 1 · Self-Evaluation
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Skill Assessment
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Evaluate your proficiencies across Programming, Data, Web, AI, and Professional competencies. Ratings feed directly into the weighted gap engine.
          </p>
        </div>

        {/* Save & Continue Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
              hasSaved
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700'
                : 'bg-slate-900 text-slate-200 border-slate-700 hover:bg-slate-800'
            }`}
          >
            {hasSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4 text-cyan-400" />}
            <span>{hasSaved ? 'Saved to DB' : 'Save Ratings'}</span>
          </button>

          <button
            onClick={handleSaveAndContinue}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg shadow-lg shadow-cyan-900/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Save Assessment &amp; Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search skill by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSkills.map((skill) => {
          const score = localRatings[skill.id] ?? 0;
          const level: 1 | 2 | 3 = score >= 76 ? 3 : score >= 41 ? 2 : 1;
          const levelLabel = level === 3 ? 'Advanced' : level === 2 ? 'Intermediate' : 'Beginner';

          return (
            <div
              key={skill.id}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>{skill.category}</span>
                  <span className={`text-[11px] font-semibold ${
                    level === 3 ? 'text-emerald-400' : level === 2 ? 'text-cyan-400' : 'text-slate-400'
                  }`}>
                    {levelLabel}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{skill.name}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              <div className="mt-5 space-y-3 pt-3 border-t border-slate-800/80">
                {/* Level Quick Selectors (1, 2, 3) */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800/80 text-center">
                  <button
                    type="button"
                    onClick={() => handleLevelSelect(skill.id, 1)}
                    className={`py-1 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                      level === 1 && score > 0
                        ? 'bg-slate-800 text-slate-200'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    1 · Beg
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLevelSelect(skill.id, 2)}
                    className={`py-1 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                      level === 2
                        ? 'bg-cyan-900/60 text-cyan-200'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    2 · Int
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLevelSelect(skill.id, 3)}
                    className={`py-1 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                      level === 3
                        ? 'bg-emerald-900/60 text-emerald-200'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    3 · Adv
                  </button>
                </div>

                {/* Granular 0 - 100 Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-400 text-[11px]">Proficiency Score</span>
                    <span className="font-mono font-bold text-cyan-400 tabular-nums">
                      {score}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={score}
                    onChange={(e) => handleScoreChange(skill.id, Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
                    <span>0 (Novice)</span>
                    <span>50 (Competent)</span>
                    <span>100 (Master)</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Bar for Quick Action */}
      <div className="sticky bottom-4 z-20 p-4 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-700/80 shadow-2xl flex items-center justify-between">
        <div className="text-xs text-slate-300">
          Ready with your assessment? Save scores to evaluate gaps against industry targets.
        </div>
        <button
          onClick={handleSaveAndContinue}
          className="px-5 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <span>Continue to Career Selection</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
