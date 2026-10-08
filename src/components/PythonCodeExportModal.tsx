import React, { useState } from 'react';
import { PYTHON_PROJECT_FILES, ProjectFile } from '../data/pythonExportFiles';
import { X, Code2, Copy, Check, Download, Folder, FileText, Database, Terminal, BookOpen, Layers } from 'lucide-react';

interface PythonCodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PythonCodeExportModal: React.FC<PythonCodeExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<ProjectFile>(PYTHON_PROJECT_FILES[0]);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([selectedFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAllAsZipOrSummary = () => {
    const fullProjectText = PYTHON_PROJECT_FILES.map(f => `
================================================================================
FILE: ${f.path}
================================================================================
${f.content}
`).join('\n\n');

    const blob = new Blob([fullProjectText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Student-Skill-Gap-Analyzer-Complete-Codebase.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[90vh] bg-[#0c101d] border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Python + Flask + MySQL + Scikit-Learn Project Code Explorer</span>
                <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  Ready to Run
                </span>
              </h2>
              <div className="text-xs text-slate-400">
                Explore, copy, or download the full backend, database schema, and machine learning models for your college submission.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadAllAsZipOrSummary}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Download entire project code bundle"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download All Files</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body: Two-Column Workspace */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Column: Project File Tree */}
          <div className="w-72 bg-slate-950/80 border-r border-slate-800/80 p-4 overflow-y-auto space-y-4 shrink-0">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Folder className="w-3.5 h-3.5 text-indigo-400" />
              <span>Project Files</span>
            </div>

            <div className="space-y-1">
              {PYTHON_PROJECT_FILES.map((file) => {
                const isSelected = selectedFile.path === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-950/70 text-indigo-200 border border-indigo-700/60 font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {file.category === 'Database' ? (
                        <Database className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      ) : file.category === 'Machine Learning' ? (
                        <Layers className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      ) : (
                        <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      )}
                      <span className="truncate">{file.path}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Setup Instructions Kicker */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <div className="text-[11px] font-bold text-slate-300">Quick Local Run:</div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[10px] text-slate-400 space-y-1">
                <p>1. <span className="text-cyan-400">mysql -u root -p</span> &lt; schema.sql</p>
                <p>2. <span className="text-cyan-400">pip install -r</span> requirements.txt</p>
                <p>3. <span className="text-cyan-400">python</span> ml/train_model.py</p>
                <p>4. <span className="text-cyan-400">python</span> app.py</p>
              </div>
            </div>
          </div>

          {/* Right Column: Code Viewer with Line Numbers */}
          <div className="flex-1 flex flex-col bg-[#0b0e17] overflow-hidden">
            {/* File Info Bar */}
            <div className="px-6 py-2.5 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-white font-bold">{selectedFile.path}</span>
                <span className="text-[10px] text-slate-500 uppercase font-mono px-2 py-0.5 rounded bg-slate-800">
                  {selectedFile.language}
                </span>
                <span className="text-[10px] text-indigo-400">{selectedFile.category}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleDownloadFile}
                  className="px-3 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-auto p-6 font-mono text-xs text-slate-300 leading-relaxed bg-[#0a0d14]">
              <pre className="whitespace-pre overflow-x-auto selection:bg-indigo-500/30">
                {selectedFile.content}
              </pre>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
