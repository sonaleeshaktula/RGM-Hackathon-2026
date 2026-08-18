import React from 'react';
import { Play, Sparkles, Compass, ShieldAlert, Cpu, ArrowRight, Film } from 'lucide-react';

interface LandingHeroProps {
  onStartScrolling: () => void;
  onExploreHowItWorks: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartScrolling,
  onExploreHowItWorks,
}) => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden select-none">
      {/* Cinematic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-tr from-emerald-600/15 via-indigo-600/20 to-teal-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-1/4 w-72 h-72 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Floating Category Pills Preview Banner */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 backdrop-blur-md text-xs font-mono text-slate-300 mb-8 shadow-xl animate-fadeIn">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-emerald-400 font-bold">AI Latent Interest Agent</span>
        <span className="text-slate-600">•</span>
        <span className="text-slate-400">Mixed Short-Form Feed</span>
      </div>

      {/* Very Large Prominent Branding Title */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none">
          SCROLL<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">WISE</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-200 tracking-tight max-w-2xl mx-auto leading-snug">
          "Understand what a student really wants to learn."
        </p>

        {/* Supporting Line */}
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-sans leading-relaxed pt-2">
          Your feed shows what you watch. ScrollWise discovers what you <span className="text-emerald-300 font-medium">actually want to learn</span>.
        </p>
      </div>

      {/* Main Single Strong CTA Button */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onStartScrolling}
          className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base sm:text-lg tracking-wide shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 flex items-center gap-3 cursor-pointer"
        >
          <span>Start Scrolling</span>
          <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onExploreHowItWorks}
          className="px-6 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-sm sm:text-base font-semibold transition-all duration-200"
        >
          How It Works →
        </button>
      </div>

      {/* Minimal Feature Highlights Grid at Bottom */}
      <div className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left w-full">
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm space-y-1">
          <div className="text-emerald-400 font-mono text-xs font-bold flex items-center gap-1.5">
            <Film className="h-3.5 w-3.5" />
            01. Watch
          </div>
          <p className="text-xs text-slate-300 font-medium">Mixed short-form reel feed</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm space-y-1">
          <div className="text-indigo-400 font-mono text-xs font-bold flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5" />
            02. Learn
          </div>
          <p className="text-xs text-slate-300 font-medium">Live interest graph updates</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm space-y-1">
          <div className="text-teal-400 font-mono text-xs font-bold flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5" />
            03. Recommend
          </div>
          <p className="text-xs text-slate-300 font-medium">High-value tech learning</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm space-y-1">
          <div className="text-rose-400 font-mono text-xs font-bold flex items-center gap-1.5">
            <ShieldAlert className="h-3.5 w-3.5" />
            04. Filter
          </div>
          <p className="text-xs text-slate-300 font-medium">Rejects clickbait & hype</p>
        </div>
      </div>
    </div>
  );
};
