import React, { useState } from 'react';
import { User, StudentProfile } from '../types';
import { X, Lock, Mail, User as UserIcon, GraduationCap, Building2, Calendar, Award, Shield, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: 'student' | 'admin';
  onLoginSuccess: (user: User, profile?: StudentProfile) => void;
  onDemoLoginStudent: () => void;
  onDemoLoginAdmin: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'student',
  onLoginSuccess,
  onDemoLoginStudent,
  onDemoLoginAdmin,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'student' | 'admin'>(initialRole);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regDepartment, setRegDepartment] = useState('Computer Science & Engineering');
  const [regDegree, setRegDegree] = useState('B.Tech');
  const [regYear, setRegYear] = useState('3rd Year');
  const [regCgpa, setRegCgpa] = useState('8.4');

  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!loginEmail || !loginPassword) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    if (role === 'admin') {
      if (loginEmail === 'admin@demo.edu' || loginEmail.includes('admin')) {
        onDemoLoginAdmin();
        onClose();
        return;
      }
      setErrorMessage('Invalid admin credentials. Use demo button or admin@demo.edu');
      return;
    }

    // Default student check
    if (loginEmail === 'student@demo.edu' || loginEmail.includes('student')) {
      onDemoLoginStudent();
      onClose();
      return;
    }

    // Mock custom student login
    const user: User = {
      id: `usr-${Date.now()}`,
      name: loginEmail.split('@')[0],
      email: loginEmail,
      role: 'student',
      createdAt: new Date().toISOString().split('T')[0]
    };
    const profile: StudentProfile = {
      userId: user.id,
      department: 'Computer Science',
      degree: 'B.Tech',
      year: '3rd Year',
      cgpa: 8.2,
      targetCareerId: 'car-da'
    };

    onLoginSuccess(user, profile);
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!regName || !regEmail || !regPassword || !regConfirmPassword) {
      setErrorMessage('All required fields must be filled.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    const parsedCgpa = parseFloat(regCgpa);
    if (isNaN(parsedCgpa) || parsedCgpa < 0 || parsedCgpa > 10) {
      setErrorMessage('Please enter a valid CGPA between 0 and 10.');
      return;
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: regName,
      email: regEmail,
      role: 'student',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const newProfile: StudentProfile = {
      userId: newUser.id,
      department: regDepartment,
      degree: regDegree,
      year: regYear,
      cgpa: parsedCgpa,
      targetCareerId: 'car-da'
    };

    onLoginSuccess(newUser, newProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0e1424] border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Role Toggle Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-xl mb-6 border border-slate-800">
          <button
            type="button"
            onClick={() => { setRole('student'); setErrorMessage(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
              role === 'student'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student Portal</span>
          </button>
          <button
            type="button"
            onClick={() => { setRole('admin'); setMode('login'); setErrorMessage(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
              role === 'admin'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Admin Console</span>
          </button>
        </div>

        {/* Quick 1-Click Demo Buttons */}
        <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 mb-6">
          <div className="text-[11px] font-medium text-slate-400 mb-2">Instant Demo Evaluation Access:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => { onDemoLoginStudent(); onClose(); }}
              className="px-3 py-2 text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/50 rounded-lg text-left transition-all flex items-center justify-between"
            >
              <div>
                <div className="font-bold">Student Demo</div>
                <div className="text-[10px] text-cyan-400/80">Aarav (Data Analyst 72%)</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>

            <button
              type="button"
              onClick={() => { onDemoLoginAdmin(); onClose(); }}
              className="px-3 py-2 text-xs font-semibold text-purple-300 hover:text-white bg-purple-950/40 hover:bg-purple-900/60 border border-purple-800/50 rounded-lg text-left transition-all flex items-center justify-between"
            >
              <div>
                <div className="font-bold">Admin Demo</div>
                <div className="text-[10px] text-purple-400/80">Dr. Elena Vance</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">
            {role === 'admin'
              ? 'Administrator Login'
              : mode === 'login'
              ? 'Student Login'
              : 'Create Student Account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {role === 'admin'
              ? 'Enter institutional administrative credentials to access reporting and skill catalogs.'
              : mode === 'login'
              ? 'Access your saved skill gap analysis and target career metrics.'
              : 'Register your academic profile to calculate personalized career readiness.'}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-800/80 text-red-300 text-xs rounded-lg">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        {mode === 'login' || role === 'admin' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Institutional Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder={role === 'admin' ? 'admin@demo.edu' : 'student@demo.edu'}
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors cursor-pointer"
            >
              Sign In to {role === 'admin' ? 'Admin Console' : 'Dashboard'}
            </button>

            {role === 'student' && (
              <div className="text-center text-xs text-slate-400 pt-2">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('register'); setErrorMessage(''); }}
                  className="text-cyan-400 hover:underline font-semibold"
                >
                  Create Account
                </button>
              </div>
            )}
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Patel"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">College Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="priya.p@university.edu"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Confirm Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Department</label>
                <select
                  value={regDepartment}
                  onChange={(e) => setRegDepartment(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Computer Science & Engineering">CSE</option>
                  <option value="Information Technology">IT</option>
                  <option value="Data Science & AI">AI &amp; Data Science</option>
                  <option value="Electronics & Communication">ECE</option>
                  <option value="Business Administration">BBA / MBA</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Degree</label>
                <select
                  value={regDegree}
                  onChange={(e) => setRegDegree(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="B.Tech">B.Tech</option>
                  <option value="B.E.">B.E.</option>
                  <option value="B.Sc Computer Science">B.Sc CS</option>
                  <option value="BCA">BCA</option>
                  <option value="M.Tech / MCA">M.Tech / MCA</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Academic Year</label>
                <select
                  value={regYear}
                  onChange={(e) => setRegYear(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="Final Year">Final Year (4th)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Current CGPA (0 - 10)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  required
                  value={regCgpa}
                  onChange={(e) => setRegCgpa(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg shadow-md transition-all cursor-pointer mt-2"
            >
              Create Account &amp; Proceed to Assessment
            </button>

            <div className="text-center text-xs text-slate-400 pt-2">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMessage(''); }}
                className="text-cyan-400 hover:underline font-semibold"
              >
                Login
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
