import React from 'react';
import { Compass, Sparkles, ShieldAlert, Zap, Bot, Film, TrendingUp } from 'lucide-react';

interface NavbarProps {
  activeView: 'landing' | 'feed' | 'pattern' | 'recommendation' | 'hype-filter' | 'how-it-works' | 'chat';
  setActiveView: (view: 'landing' | 'feed' | 'pattern' | 'recommendation' | 'hype-filter' | 'how-it-works' | 'chat') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, setActiveView }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#06090F]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => setActiveView('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform">
            <Compass className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-white leading-none">
              SCROLL<span className="text-emerald-400">WISE</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              AI Latent Learning Agent
            </span>
          </div>
        </div>

        {/* Minimal Navigation Links */}
        <nav className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-white/10 text-xs font-mono">
          <button
            onClick={() => setActiveView('landing')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeView === 'landing'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setActiveView('feed')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'feed'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                : 'text-slate-300 hover:text-emerald-400'
            }`}
          >
            <Film className="h-3.5 w-3.5" />
            Explore Feed
          </button>

          <button
            onClick={() => setActiveView('pattern')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'pattern'
                ? 'bg-indigo-500 text-white font-black shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-indigo-300'
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            Pattern Discovery
          </button>

          <button
            onClick={() => setActiveView('recommendation')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'recommendation'
                ? 'bg-teal-500 text-slate-950 font-black shadow-md shadow-teal-500/20'
                : 'text-slate-300 hover:text-teal-300'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Recommendation
          </button>

          <button
            onClick={() => setActiveView('hype-filter')}
            className={`hidden sm:flex px-3 py-1.5 rounded-lg font-bold transition-all items-center gap-1.5 cursor-pointer ${
              activeView === 'hype-filter'
                ? 'bg-rose-500 text-white font-black shadow-md shadow-rose-500/20'
                : 'text-slate-400 hover:text-rose-300'
            }`}
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            Hype Filter
          </button>

          <button
            onClick={() => setActiveView('how-it-works')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'how-it-works'
                ? 'bg-slate-700 text-white font-black'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            How It Works
          </button>

          <button
            onClick={() => setActiveView('chat')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'chat'
                ? 'bg-emerald-500 text-slate-950 font-black'
                : 'text-slate-400 hover:text-emerald-300'
            }`}
          >
            <Bot className="h-3.5 w-3.5" />
            Ask ScrollWise
          </button>
        </nav>
      </div>
    </header>
  );
};
