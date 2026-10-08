import React, { useState } from 'react';
import { 
  Career, 
  Skill, 
  SkillCategory, 
  SystemStats, 
  User, 
  StudentProfile 
} from '../types';
import { 
  Shield, 
  Users, 
  Compass, 
  Layers, 
  Activity, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  BarChart2, 
  Search,
  Settings
} from 'lucide-react';

interface AdminDashboardProps {
  currentUser: User;
  stats: SystemStats;
  skills: Skill[];
  careers: Career[];
  onAddSkill: (skill: Omit<Skill, 'id'>) => void;
  onDeleteSkill: (skillId: string) => void;
  onAddCareer: (career: Omit<Career, 'id'>) => void;
  onDeleteCareer: (careerId: string) => void;
  onUpdateCareerRequirements: (careerId: string, requirements: Career['requirements']) => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  stats,
  skills,
  careers,
  onAddSkill,
  onDeleteSkill,
  onAddCareer,
  onDeleteCareer,
  onUpdateCareerRequirements,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'skills' | 'careers' | 'analytics'>('overview');

  // New Skill Modal state
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCat, setNewSkillCat] = useState<SkillCategory>('Programming');
  const [newSkillDesc, setNewSkillDesc] = useState('');

  // New Career Modal state
  const [showAddCareer, setShowAddCareer] = useState(false);
  const [newCareerName, setNewCareerName] = useState('');
  const [newCareerDesc, setNewCareerDesc] = useState('');
  const [newCareerInd, setNewCareerInd] = useState('Tech & Software');

  // Search filter
  const [searchFilter, setSearchFilter] = useState('');

  // Mock enrolled students for administrative auditing
  const enrolledStudents = [
    { id: 'usr-1', name: 'Aarav Sharma', email: 'student@demo.edu', dept: 'CSE', degree: 'B.Tech', cgpa: 8.6, career: 'Data Analyst', readiness: 72 },
    { id: 'usr-2', name: 'Priya Patel', email: 'priya.p@univ.edu', dept: 'IT', degree: 'B.Tech', cgpa: 8.9, career: 'Business Analyst', readiness: 81 },
    { id: 'usr-3', name: 'Rohan Verma', email: 'rohan.v@univ.edu', dept: 'AI & Data Science', degree: 'B.Sc CS', cgpa: 7.9, career: 'Data Scientist', readiness: 64 },
    { id: 'usr-4', name: 'Sneha Rao', email: 'sneha.r@univ.edu', dept: 'CSE', degree: 'B.Tech', cgpa: 9.1, career: 'Full Stack Developer', readiness: 88 },
    { id: 'usr-5', name: 'Kavita Menon', email: 'kavita.m@univ.edu', dept: 'ECE', degree: 'B.E.', cgpa: 7.5, career: 'Cybersecurity Analyst', readiness: 58 }
  ];

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    onAddSkill({
      name: newSkillName.trim(),
      category: newSkillCat,
      description: newSkillDesc.trim() || `${newSkillName} core competency.`
    });

    setNewSkillName('');
    setNewSkillDesc('');
    setShowAddSkill(false);
  };

  const handleCreateCareer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCareerName.trim()) return;

    onAddCareer({
      name: newCareerName.trim(),
      description: newCareerDesc.trim() || `Industry role for ${newCareerName}.`,
      industry: newCareerInd,
      demandLevel: 'High',
      averageSalary: '$85,000 - $125,000',
      requirements: [
        { skillId: 'sk-py', requiredScore: 85, importance: 4 },
        { skillId: 'sk-sql', requiredScore: 80, importance: 4 }
      ]
    });

    setNewCareerName('');
    setNewCareerDesc('');
    setShowAddCareer(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Admin Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider">
              Institutional Admin Portal
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              System Administration &amp; Analytics
            </h1>
            <div className="text-xs text-slate-400 mt-0.5">
              Logged in as <strong className="text-white">{currentUser.name}</strong> ({currentUser.email})
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-700 rounded-lg transition-colors self-start sm:self-auto cursor-pointer"
        >
          Sign Out of Admin
        </button>
      </div>

      {/* 6 Executive Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Total Students</span>
          </div>
          <div className="text-2xl font-black text-white tabular-nums mt-1">{stats.totalStudents}</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-blue-400" />
            <span>Total Careers</span>
          </div>
          <div className="text-2xl font-black text-white tabular-nums mt-1">{stats.totalCareers}</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Total Skills</span>
          </div>
          <div className="text-2xl font-black text-white tabular-nums mt-1">{stats.totalSkills}</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Avg Readiness</span>
          </div>
          <div className="text-2xl font-black text-emerald-400 tabular-nums mt-1">{stats.averageReadiness}%</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>Top Skill Gap</span>
          </div>
          <div className="text-base font-bold text-red-400 mt-1 truncate">{stats.mostCommonGap}</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <BarChart2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Top Career</span>
          </div>
          <div className="text-base font-bold text-purple-300 mt-1 truncate">{stats.mostPopularCareer}</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { key: 'overview', label: 'Overview & Distribution' },
          { key: 'students', label: 'Manage Students (5)' },
          { key: 'skills', label: `Manage Skills (${skills.length})` },
          { key: 'careers', label: `Manage Careers (${careers.length})` },
          { key: 'analytics', label: 'Institutional Analytics' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === tab.key
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Readiness Distribution */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">Student Readiness Distribution</h3>
              <div className="space-y-3">
                {[
                  { label: 'Highly Ready (90 - 100%)', count: stats.readinessDistribution.highlyReady, color: 'bg-emerald-500' },
                  { label: 'Career Ready (75 - 89%)', count: stats.readinessDistribution.careerReady, color: 'bg-cyan-500' },
                  { label: 'Needs Improvement (50 - 74%)', count: stats.readinessDistribution.needsImprovement, color: 'bg-amber-500' },
                  { label: 'Beginner Stage (< 50%)', count: stats.readinessDistribution.beginner, color: 'bg-red-500' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>{item.label}</span>
                      <span className="font-mono text-white font-bold">{item.count} students</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.count / 142) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Averages */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">Departmental Average Readiness</h3>
              <div className="space-y-3">
                {[
                  { dept: 'Computer Science (CSE)', avg: 76, topGap: 'Power BI' },
                  { dept: 'Information Technology (IT)', avg: 74, topGap: 'SQL Window Functions' },
                  { dept: 'AI & Data Science (AIDS)', avg: 71, topGap: 'Deep Learning' },
                  { dept: 'Electronics (ECE)', avg: 62, topGap: 'Data Structures' },
                ].map((d, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{d.dept}</div>
                      <div className="text-[10px] text-slate-500">Major deficit: {d.topGap}</div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-cyan-400 font-bold">{d.avg}% Avg</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: Students */}
      {activeTab === 'students' && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white">Enrolled Student Cohort</h3>
            <span className="text-xs text-slate-400 font-mono">Showing 5 active profiles</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px]">
                  <th className="py-3 px-3">Student Name</th>
                  <th className="py-3 px-3">Email</th>
                  <th className="py-3 px-3">Department</th>
                  <th className="py-3 px-3">Target Career</th>
                  <th className="py-3 px-3 text-right">CGPA</th>
                  <th className="py-3 px-3 text-right">Readiness</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {enrolledStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-800/30">
                    <td className="py-3 px-3 font-bold text-white">{st.name}</td>
                    <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">{st.email}</td>
                    <td className="py-3 px-3">{st.dept} ({st.degree})</td>
                    <td className="py-3 px-3 text-cyan-300 font-medium">{st.career}</td>
                    <td className="py-3 px-3 text-right font-mono text-slate-200">{st.cgpa}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">
                      {st.readiness}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Skills Management */}
      {activeTab === 'skills' && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h3 className="text-base font-bold text-white">Skills Master Catalog</h3>
              <p className="text-xs text-slate-400 mt-0.5">Add, classify, and maintain skills evaluated by the platform.</p>
            </div>
            <button
              onClick={() => setShowAddSkill(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Skill</span>
            </button>
          </div>

          {/* Add Skill Form Modal */}
          {showAddSkill && (
            <form onSubmit={handleCreateSkill} className="p-4 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-3">
              <div className="text-xs font-bold text-white">Create New Skill Entry</div>
              <div className="grid sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Skill Name (e.g. Docker)"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />
                <select
                  value={newSkillCat}
                  onChange={(e) => setNewSkillCat(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                >
                  <option value="Programming">Programming</option>
                  <option value="Data">Data</option>
                  <option value="Web">Web</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="Professional">Professional</option>
                </select>
                <input
                  type="text"
                  placeholder="Short Description"
                  value={newSkillDesc}
                  onChange={(e) => setNewSkillDesc(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddSkill(false)}
                  className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg"
                >
                  Save Skill to Database
                </button>
              </div>
            </form>
          )}

          {/* Skills List */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {skills.map((s) => (
              <div key={s.id} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{s.name}</div>
                  <div className="text-[10px] text-slate-500">{s.category}</div>
                </div>
                <button
                  onClick={() => onDeleteSkill(s.id)}
                  className="text-slate-500 hover:text-red-400 p-1.5 rounded transition-colors"
                  title="Delete Skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Careers Management */}
      {activeTab === 'careers' && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h3 className="text-base font-bold text-white">Careers &amp; Skill Requirements</h3>
              <p className="text-xs text-slate-400 mt-0.5">Manage job profiles and required benchmark proficiency thresholds.</p>
            </div>
            <button
              onClick={() => setShowAddCareer(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Career</span>
            </button>
          </div>

          {showAddCareer && (
            <form onSubmit={handleCreateCareer} className="p-4 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-3">
              <div className="text-xs font-bold text-white">Create New Career Profile</div>
              <div className="grid sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Career Name (e.g. DevOps Engineer)"
                  value={newCareerName}
                  onChange={(e) => setNewCareerName(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Industry"
                  value={newCareerInd}
                  onChange={(e) => setNewCareerInd(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newCareerDesc}
                  onChange={(e) => setNewCareerDesc(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddCareer(false)}
                  className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg"
                >
                  Save Career
                </button>
              </div>
            </form>
          )}

          <div className="space-y-4">
            {careers.map((career) => (
              <div key={career.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-bold text-white">{career.name}</h4>
                    <span className="text-[11px] text-slate-500">{career.industry} · {career.demandLevel} Demand</span>
                  </div>
                  <button
                    onClick={() => onDeleteCareer(career.id)}
                    className="text-slate-500 hover:text-red-400 p-1.5 rounded transition-colors"
                    title="Delete Career"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-[11px] text-slate-400">
                  Required Competency Weights:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {career.requirements.map(req => {
                    const sk = skills.find(s => s.id === req.skillId);
                    return (
                      <span key={req.skillId} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-mono">
                        {sk ? sk.name : req.skillId}: {req.requiredScore}% (Weight {req.importance})
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Institutional Analytics */}
      {activeTab === 'analytics' && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white">Institutional Skill Deficit Heatmap</h3>
          <p className="text-xs text-slate-400">
            Identifies systemic skill gaps across all registered students to help faculty adjust curriculum planning.
          </p>

          <div className="space-y-3">
            {[
              { skill: 'Power BI & DAX Modeling', gapRate: '72% Deficit Rate', severity: 'Critical', studentsAffected: 102 },
              { skill: 'SQL Complex Joins & Subqueries', gapRate: '58% Deficit Rate', severity: 'Critical', studentsAffected: 82 },
              { skill: 'Applied Statistics & Hypothesis Testing', gapRate: '44% Deficit Rate', severity: 'High', studentsAffected: 63 },
              { skill: 'Modern React & State Management', gapRate: '38% Deficit Rate', severity: 'Medium', studentsAffected: 54 },
              { skill: 'Professional Technical Presentation', gapRate: '25% Deficit Rate', severity: 'Low', studentsAffected: 36 },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{item.skill}</div>
                  <div className="text-[10px] text-slate-500">{item.studentsAffected} students flagged with deficit</div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    item.severity === 'Critical' ? 'bg-red-950 text-red-300 border border-red-800' :
                    item.severity === 'High' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {item.severity}
                  </span>
                  <span className="font-mono text-cyan-400 font-bold">{item.gapRate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
