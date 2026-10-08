import React from 'react';
import { User } from '../types';
import { Sparkles, Compass, Shield, UserCheck, Code2, LogOut, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: (role?: 'student' | 'admin') => void;
  onLogout: () => void;
  onOpenCodeExport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onOpenAuth,
  onLogout,
  onOpenCodeExport,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            SkillGap<span className="text-cyan-400">Predict</span>
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'home' ? 'text-cyan-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Home
          </button>
          
          {currentUser && currentUser.role === 'student' && (
            <>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === 'dashboard' ? 'text-cyan-400 font-semibold' : 'hover:text-white'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('assessment')}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === 'assessment' ? 'text-cyan-400 font-semibold' : 'hover:text-white'
                }`}
              >
                Skills
              </button>
              <button
                onClick={() => setActiveTab('skill-gap')}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === 'skill-gap' || activeTab === 'readiness' ? 'text-cyan-400 font-semibold' : 'hover:text-white'
                }`}
              >
                Gap Analysis
              </button>
              <button
                onClick={() => setActiveTab('simulator')}
                className={`transition-colors whitespace-nowrap flex items-center gap-1 ${
                  activeTab === 'simulator' ? 'text-cyan-400 font-semibold' : 'hover:text-white'
                }`}
              >
                <span>What-If Simulator</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              </button>
              <button
                onClick={() => setActiveTab('roadmap')}
                className={`transition-colors whitespace-nowrap ${
                  activeTab === 'roadmap' ? 'text-cyan-400 font-semibold' : 'hover:text-white'
                }`}
              >
                Roadmap
              </button>
            </>
          )}

          {currentUser && currentUser.role === 'admin' && (
            <button
              onClick={() => setActiveTab('admin-dashboard')}
              className={`transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'admin-dashboard' ? 'text-cyan-400 font-semibold' : 'hover:text-white'
              }`}
            >
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Admin Console</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('careers')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'careers' ? 'text-cyan-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Careers
          </button>

          <button
            onClick={onOpenCodeExport}
            className="transition-colors whitespace-nowrap flex items-center gap-1.5 text-indigo-300 hover:text-indigo-200"
            title="Inspect & Export Python + MySQL Codebase"
          >
            <Code2 className="w-4 h-4" />
            <span>Python/SQL Code</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-white truncate max-w-[140px]">
                  {currentUser.name}
                </span>
                <span className="text-[11px] text-slate-400 capitalize">
                  {currentUser.role === 'admin' ? 'Administrator' : 'Student'}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
                title="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('student')}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/60 rounded-lg border border-slate-700/80 transition-colors whitespace-nowrap"
              >
                Student Login
              </button>
              <button
                onClick={() => onOpenAuth('admin')}
                className="hidden sm:inline-flex px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors whitespace-nowrap"
              >
                Admin
              </button>
              <button
                onClick={() => onOpenAuth('student')}
                className="px-3.5 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg shadow-sm shadow-cyan-500/20 transition-all whitespace-nowrap"
              >
                Get Started
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
