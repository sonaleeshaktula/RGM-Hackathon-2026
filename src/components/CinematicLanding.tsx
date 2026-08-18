import React from 'react';
import { ArrowRight, Sparkles, Play, Compass, ShieldAlert, Cpu } from 'lucide-react';

interface CinematicLandingProps {
  onStartScrolling: () => void;
  onExploreHowItWorks: () => void;
}

export const CinematicLanding: React.FC<CinematicLandingProps> = ({
  onStartScrolling,
  onExploreHowItWorks,
}) => {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 select-none overflow-hidden">
      {/* Cinematic Ambient Glow Spheres */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[950px] h-[450px] bg-gradient-to-tr from-emerald-600/20 via-indigo-600/20 to-teal-500/15 blur-[140px] rounded-full pointer-events-none -z-10 ambient-glow" />
      <div className="absolute bottom-12 left-1/4 w-80 h-80 bg-emerald-500/10 blur-[110px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-12 right-1/4 w-80 h-80 bg-indigo-500/10 blur-[110px] rounded-full pointer-events-none -z-10" />

      {/* Center Cinematic Brand Block */}
      <div className="space-y-6 max-w-4xl mx-auto py-8">
        
        {/* Minimal Category Pill Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs font-mono text-slate-300 shadow-xl backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-bold">Intelligent Recommendation Agent</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">Short-Form Content Discovery</span>
        </div>

        {/* Large Typography: SCROLLWISE */}
        <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tight text-white leading-none">
          SCROLL<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">WISE</span>
        </h1>

        {/* The Exact Required Prompt Statements */}
        <div className="space-y-3 pt-2">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight max-w-3xl mx-auto">
            "Your feed shows what you watch.<br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">
              We discover what you actually want to learn.
            </span>"
          </p>

          <p className="text-sm sm:text-base text-slate-400 font-sans max-w-xl mx-auto leading-relaxed pt-1">
            An AI recommendation agent that understands the patterns behind your scrolling.
          </p>
        </div>

        {/* Primary CTA & Secondary Action */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartScrolling}
            className="group px-9 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base sm:text-lg tracking-wide shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 flex items-center gap-3 cursor-pointer"
          >
            <span>START SCROLLING</span>
            <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreHowItWorks}
            className="px-7 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer"
          >
            HOW IT WORKS
          </button>
        </div>

      </div>

      {/* Cinematic Bottom Storyline Strip */}
      <div className="mt-12 max-w-3xl mx-auto flex items-center justify-center gap-6 sm:gap-12 text-[11px] font-mono text-slate-400 pt-6 border-t border-white/5">
        <span className="flex items-center gap-1.5">
          <span className="text-emerald-400 font-bold">01.</span> Watch Mixed Reels
        </span>
        <span className="text-slate-700">→</span>
        <span className="flex items-center gap-1.5">
          <span className="text-indigo-400 font-bold">02.</span> Live AI Learns
        </span>
        <span className="text-slate-700">→</span>
        <span className="flex items-center gap-1.5">
          <span className="text-teal-400 font-bold">03.</span> Discover Latent Tech
        </span>
      </div>
    </div>
  );
};
