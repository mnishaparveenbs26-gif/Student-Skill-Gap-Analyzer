import React, { useState, useMemo } from 'react';
import { 
  User, 
  StudentProfile, 
  Skill, 
  Career, 
  StudentSkill, 
  RoadmapTask, 
  ProgressHistoryEntry, 
  SystemStats 
} from './types';
import { 
  INITIAL_SKILLS, 
  INITIAL_CAREERS, 
  DEMO_STUDENT, 
  DEMO_STUDENT_PROFILE, 
  DEMO_STUDENT_SKILLS, 
  DEMO_ADMIN 
} from './data/initialData';
import { calculateSkillGaps, calculateCareerReadiness } from './services/analyticsService';
import { predictCareerRecommendations } from './services/mlRecommendationService';
import { generatePersonalizedRoadmap } from './services/roadmapGeneratorService';

// Components
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { AuthModal } from './components/AuthModal';
import { StudentDashboard } from './components/StudentDashboard';
import { SkillAssessmentView } from './components/SkillAssessmentView';
import { CareerSelectionView } from './components/CareerSelectionView';
import { SkillGapView } from './components/SkillGapView';
import { ReadinessView } from './components/ReadinessView';
import { RecommendationsView } from './components/RecommendationsView';
import { SimulatorView } from './components/SimulatorView';
import { RoadmapView } from './components/RoadmapView';
import { ProgressView } from './components/ProgressView';
import { AdminDashboard } from './components/AdminDashboard';
import { PythonCodeExportModal } from './components/PythonCodeExportModal';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState<'student' | 'admin'>('student');
  const [isCodeExportOpen, setIsCodeExportOpen] = useState(false);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(DEMO_STUDENT);
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(DEMO_STUDENT_PROFILE);

  // Data Store
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);
  const [careers, setCareers] = useState<Career[]>(INITIAL_CAREERS);
  const [studentSkills, setStudentSkills] = useState<StudentSkill[]>(DEMO_STUDENT_SKILLS);

  // Target Career (default: Data Analyst)
  const targetCareerId = studentProfile.targetCareerId || 'car-da';
  const targetCareer = useMemo(() => {
    return careers.find(c => c.id === targetCareerId) || careers[0];
  }, [careers, targetCareerId]);

  // Derived Analytics Calculations
  const gapItems = useMemo(() => {
    return calculateSkillGaps(skills, studentSkills, targetCareer);
  }, [skills, studentSkills, targetCareer]);

  const readiness = useMemo(() => {
    return calculateCareerReadiness(skills, studentSkills, targetCareer);
  }, [skills, studentSkills, targetCareer]);

  const recommendations = useMemo(() => {
    return predictCareerRecommendations(skills, studentSkills, careers);
  }, [skills, studentSkills, careers]);

  // Roadmap Tasks State
  const [roadmapTasks, setRoadmapTasks] = useState<RoadmapTask[]>(() => {
    return generatePersonalizedRoadmap(calculateSkillGaps(skills, DEMO_STUDENT_SKILLS, INITIAL_CAREERS[0]));
  });

  // Progress History State
  const [progressHistory, setProgressHistory] = useState<ProgressHistoryEntry[]>([
    {
      id: 'prg-init',
      skillId: 'sk-sql',
      skillName: 'SQL',
      oldScore: 25,
      newScore: 40,
      improvement: 15,
      readinessBefore: 67,
      readinessAfter: 72,
      date: '2026-10-01',
      notes: 'Initial coursework evaluation baseline recorded'
    }
  ]);

  // System Stats for Admin
  const stats: SystemStats = useMemo(() => ({
    totalStudents: 142,
    totalCareers: careers.length,
    totalSkills: skills.length,
    averageReadiness: 73,
    mostCommonGap: 'Power BI / DAX',
    mostPopularCareer: 'Data Analyst',
    readinessDistribution: {
      highlyReady: 28,
      careerReady: 64,
      needsImprovement: 38,
      beginner: 12
    }
  }), [careers.length, skills.length]);

  // Handlers
  const handleOpenAuth = (role: 'student' | 'admin' = 'student') => {
    setAuthRole(role);
    setIsAuthOpen(true);
  };

  const handleDemoLoginStudent = () => {
    setCurrentUser(DEMO_STUDENT);
    setStudentProfile(DEMO_STUDENT_PROFILE);
    setStudentSkills(DEMO_STUDENT_SKILLS);
    setActiveTab('dashboard');
  };

  const handleDemoLoginAdmin = () => {
    setCurrentUser(DEMO_ADMIN);
    setActiveTab('admin-dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('home');
  };

  const handleSaveAssessment = (updatedSkills: StudentSkill[]) => {
    setStudentSkills(updatedSkills);
    // Regenerate roadmap tasks to reflect new proficiencies
    const newGaps = calculateSkillGaps(skills, updatedSkills, targetCareer);
    setRoadmapTasks(generatePersonalizedRoadmap(newGaps));
  };

  const handleSelectCareer = (careerId: string) => {
    setStudentProfile(prev => ({
      ...prev,
      targetCareerId: careerId
    }));
    const newTarget = careers.find(c => c.id === careerId) || careers[0];
    const newGaps = calculateSkillGaps(skills, studentSkills, newTarget);
    setRoadmapTasks(generatePersonalizedRoadmap(newGaps));
    setActiveTab('skill-gap');
  };

  // What-If Simulator: Apply improved scores to real profile
  const handleApplySimulatorImprovements = (newScores: Record<string, number>, delta: number) => {
    const readinessBefore = readiness.overallReadiness;

    const updatedSkills: StudentSkill[] = skills.map(skill => {
      const existing = studentSkills.find(s => s.skillId === skill.id);
      const score = newScores[skill.id] ?? existing?.score ?? 0;
      let proficiencyLevel: 1 | 2 | 3 = 1;
      if (score >= 76) proficiencyLevel = 3;
      else if (score >= 41) proficiencyLevel = 2;
      else proficiencyLevel = 1;

      return {
        skillId: skill.id,
        score,
        proficiencyLevel
      };
    });

    setStudentSkills(updatedSkills);

    // Record progress entries for all changed skills
    const newEntries: ProgressHistoryEntry[] = [];
    Object.entries(newScores).forEach(([skillId, newScore]) => {
      const old = studentSkills.find(s => s.skillId === skillId)?.score ?? 0;
      if (newScore !== old) {
        const skillObj = skills.find(s => s.id === skillId);
        newEntries.push({
          id: `prg-${Date.now()}-${skillId}`,
          skillId,
          skillName: skillObj ? skillObj.name : skillId,
          oldScore: old,
          newScore,
          improvement: newScore - old,
          readinessBefore,
          readinessAfter: readinessBefore + delta,
          date: new Date().toISOString().split('T')[0],
          notes: 'Simulator adjustment confirmed to academic profile'
        });
      }
    });

    if (newEntries.length > 0) {
      setProgressHistory(prev => [...newEntries, ...prev]);
    }

    // Refresh roadmap
    const newGaps = calculateSkillGaps(skills, updatedSkills, targetCareer);
    setRoadmapTasks(generatePersonalizedRoadmap(newGaps));
    setActiveTab('readiness');
  };

  // Roadmap toggle task
  const handleToggleTask = (taskId: string) => {
    setRoadmapTasks(prev => {
      return prev.map(t => {
        if (t.id === taskId) {
          const nextState = !t.isCompleted;

          // If completing a task, give score boost to target skill
          if (nextState && t.skillId !== 'capstone') {
            setStudentSkills(currSkills => {
              return currSkills.map(s => {
                if (s.skillId === t.skillId) {
                  const newScore = Math.min(100, s.score + t.scoreBoost);
                  return {
                    ...s,
                    score: newScore,
                    proficiencyLevel: newScore >= 76 ? 3 : newScore >= 41 ? 2 : 1
                  };
                }
                return s;
              });
            });

            // Log progress
            setProgressHistory(currHist => [
              {
                id: `prg-task-${Date.now()}`,
                skillId: t.skillId,
                skillName: t.skillName,
                oldScore: studentSkills.find(s => s.skillId === t.skillId)?.score || 0,
                newScore: Math.min(100, (studentSkills.find(s => s.skillId === t.skillId)?.score || 0) + t.scoreBoost),
                improvement: t.scoreBoost,
                readinessBefore: readiness.overallReadiness,
                readinessAfter: Math.min(100, readiness.overallReadiness + 3),
                date: new Date().toISOString().split('T')[0],
                notes: `Completed Week ${t.week}: ${t.title}`
              },
              ...currHist
            ]);
          }

          return { ...t, isCompleted: nextState };
        }
        return t;
      });
    });
  };

  // Admin Actions
  const handleAddSkill = (newSkill: Omit<Skill, 'id'>) => {
    const id = `sk-${Date.now()}`;
    setSkills(prev => [...prev, { ...newSkill, id }]);
  };

  const handleDeleteSkill = (skillId: string) => {
    setSkills(prev => prev.filter(s => s.id !== skillId));
  };

  const handleAddCareer = (newCareer: Omit<Career, 'id'>) => {
    const id = `car-${Date.now()}`;
    setCareers(prev => [...prev, { ...newCareer, id }]);
  };

  const handleDeleteCareer = (careerId: string) => {
    setCareers(prev => prev.filter(c => c.id !== careerId));
  };

  const handleUpdateCareerRequirements = (careerId: string, requirements: Career['requirements']) => {
    setCareers(prev => prev.map(c => c.id === careerId ? { ...c, requirements } : c));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100">
      
      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenCodeExport={() => setIsCodeExportOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            careers={careers}
            onGetStarted={() => {
              if (currentUser) setActiveTab('dashboard');
              else handleOpenAuth('student');
            }}
            onStudentLogin={() => handleOpenAuth('student')}
            onAdminLogin={() => handleOpenAuth('admin')}
            onExploreCareers={() => setActiveTab('careers')}
            onOpenCodeExport={() => setIsCodeExportOpen(true)}
          />
        )}

        {activeTab === 'dashboard' && currentUser && (
          <StudentDashboard
            user={currentUser}
            profile={studentProfile}
            targetCareer={targetCareer}
            studentSkills={studentSkills}
            readiness={readiness}
            roadmapTasks={roadmapTasks}
            onNavigate={setActiveTab}
            onLogout={handleLogout}
          />
        )}

        {activeTab === 'assessment' && (
          <SkillAssessmentView
            skills={skills}
            studentSkills={studentSkills}
            onSaveAssessment={handleSaveAssessment}
            onContinueToCareers={() => setActiveTab('careers')}
          />
        )}

        {activeTab === 'careers' && (
          <CareerSelectionView
            careers={careers}
            skills={skills}
            selectedCareerId={targetCareerId}
            onSelectCareer={handleSelectCareer}
          />
        )}

        {activeTab === 'skill-gap' && (
          <SkillGapView
            targetCareer={targetCareer}
            gapItems={gapItems}
            onViewReadiness={() => setActiveTab('readiness')}
            onOpenSimulator={() => setActiveTab('simulator')}
            onChangeCareer={() => setActiveTab('careers')}
          />
        )}

        {activeTab === 'readiness' && (
          <ReadinessView
            targetCareer={targetCareer}
            readiness={readiness}
            onOpenSimulator={() => setActiveTab('simulator')}
            onOpenRecommendations={() => setActiveTab('recommendations')}
            onOpenRoadmap={() => setActiveTab('roadmap')}
          />
        )}

        {activeTab === 'recommendations' && (
          <RecommendationsView
            recommendations={recommendations}
            currentTargetCareerId={targetCareerId}
            onSelectTargetCareer={handleSelectCareer}
            onBackToDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'simulator' && (
          <SimulatorView
            skills={skills}
            studentSkills={studentSkills}
            targetCareer={targetCareer}
            onApplyImprovements={handleApplySimulatorImprovements}
            onBackToReadiness={() => setActiveTab('readiness')}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapView
            tasks={roadmapTasks}
            targetCareer={targetCareer}
            onToggleTask={handleToggleTask}
            onNavigateToSimulator={() => setActiveTab('simulator')}
            onNavigateToProgress={() => setActiveTab('progress')}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressView
            history={progressHistory}
            targetCareer={targetCareer}
            currentReadiness={readiness}
            roadmapTasks={roadmapTasks}
            onNavigateToSimulator={() => setActiveTab('simulator')}
            onNavigateToRoadmap={() => setActiveTab('roadmap')}
          />
        )}

        {activeTab === 'admin-dashboard' && (
          <AdminDashboard
            currentUser={currentUser || DEMO_ADMIN}
            stats={stats}
            skills={skills}
            careers={careers}
            onAddSkill={handleAddSkill}
            onDeleteSkill={handleDeleteSkill}
            onAddCareer={handleAddCareer}
            onDeleteCareer={handleDeleteCareer}
            onUpdateCareerRequirements={handleUpdateCareerRequirements}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialRole={authRole}
        onLoginSuccess={(user, profile) => {
          setCurrentUser(user);
          if (profile) setStudentProfile(profile);
          setActiveTab(user.role === 'admin' ? 'admin-dashboard' : 'dashboard');
        }}
        onDemoLoginStudent={handleDemoLoginStudent}
        onDemoLoginAdmin={handleDemoLoginAdmin}
      />

      {/* Python / MySQL Code Explorer Modal */}
      <PythonCodeExportModal
        isOpen={isCodeExportOpen}
        onClose={() => setIsCodeExportOpen(false)}
      />

    </div>
  );
}
