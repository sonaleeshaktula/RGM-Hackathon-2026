import React from 'react';
import { Compass, Sparkles, ShieldAlert, Award, Zap, Film } from 'lucide-react';

interface HeaderProps {
  activeView: 'landing' | 'feed' | 'recommendation' | 'hype-filter' | 'how-it-works' | 'judge-demo';
  setActiveView: (view: 'landing' | 'feed' | 'recommendation' | 'hype-filter' | 'how-it-works' | 'judge-demo') => void;
  rejectedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  rejectedCount,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#080C14]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand Logo & Tagline */}
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => setActiveView('landing')}
        >
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Compass className="h-5 w-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5 leading-none">
              SCROLL<span className="text-emerald-400">WISE</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">
              Understand what a student really wants to learn.
            </p>
          </div>
        </div>

        {/* Minimal Clean Navigation */}
        <nav className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveView('feed')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'feed'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Film className="h-3.5 w-3.5" />
            Feed
          </button>

          <button
            onClick={() => setActiveView('recommendation')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'recommendation'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Recommendation
          </button>

          <button
            onClick={() => setActiveView('hype-filter')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'hype-filter'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-rose-300'
            }`}
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            Hype Filter ({rejectedCount})
          </button>

          <button
            onClick={() => setActiveView('how-it-works')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'how-it-works'
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            How It Works
          </button>

          <button
            onClick={() => setActiveView('judge-demo')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'judge-demo'
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-indigo-300'
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            Judge Demo
          </button>
        </nav>
      </div>
    </header>
  );
};
