import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, TrendingUp, Compass, Cpu, Film } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PatternDiscoveryViewProps {
  onProceedToRecommendation: () => void;
  onBackToFeed: () => void;
}

export const PatternDiscoveryView: React.FC<PatternDiscoveryViewProps> = ({
  onProceedToRecommendation,
  onBackToFeed,
}) => {
  React.useEffect(() => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#10B981', '#38BDF8', '#6366F1', '#F59E0B'],
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8 select-none animate-fadeIn text-center">
      
      {/* Top Banner */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono text-emerald-300 shadow-xl">
        <Sparkles className="h-4 w-4 text-emerald-400" />
        <span>AI Latent Pattern Synthesis</span>
      </div>

      {/* Main Moment Title */}
      <div className="space-y-3">
        <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
          "WE FOUND A PATTERN."
        </h2>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
          "You weren't interested in just one topic. Your interactions reveal a <span className="text-emerald-400 font-bold">broader interest</span>."
        </p>
      </div>

      {/* Visual Pattern Equation Cards */}
      <div className="p-8 sm:p-10 rounded-[36px] bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900/90 border border-emerald-500/40 shadow-2xl space-y-8 relative overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

        {/* 4 Interaction Inputs Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-1.5 backdrop-blur-md">
            <span className="text-2xl block">😂</span>
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Input 1</span>
            <h4 className="text-xs font-bold text-slate-200 leading-tight">Programming Meme</h4>
            <span className="text-[10px] text-slate-500 font-mono block">Java NullPointerException</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-1.5 backdrop-blur-md">
            <span className="text-2xl block">🎯</span>
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Input 2</span>
            <h4 className="text-xs font-bold text-slate-200 leading-tight">Developer Lifestyle</h4>
            <span className="text-[10px] text-slate-500 font-mono block">Distributed Systems SWE</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-1.5 backdrop-blur-md">
            <span className="text-2xl block">💻</span>
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Input 3</span>
            <h4 className="text-xs font-bold text-slate-200 leading-tight">Coding Interview</h4>
            <span className="text-[10px] text-slate-500 font-mono block">Binary Tree Whiteboard</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-1.5 backdrop-blur-md">
            <span className="text-2xl block">📱</span>
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Input 4</span>
            <h4 className="text-xs font-bold text-slate-200 leading-tight">Laptop & Hardware</h4>
            <span className="text-[10px] text-slate-500 font-mono block">ThinkPad vs M3 Benchmarks</span>
          </div>
        </div>

        {/* Down Arrow Indicator */}
        <div className="flex items-center justify-center gap-3 font-mono text-xs font-black text-emerald-400">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-emerald-500/50" />
          <span>SCROLLWISE INFERENCE</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-emerald-500/50" />
        </div>

        {/* The Giant Discovered Broader Interest Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 border border-emerald-400 shadow-2xl space-y-2">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
            BROADER INFERRED INTEREST
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            💻 SOFTWARE ENGINEERING & TECHNOLOGY
          </h3>
          <p className="text-xs text-slate-300 font-mono pt-1">
            (Avoided shallow keyword trapping → Connected engineering culture, problem-solving, and systems)
          </p>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button
          onClick={onProceedToRecommendation}
          className="px-9 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base tracking-wide shadow-2xl shadow-emerald-500/30 hover:scale-[1.03] transition-all cursor-pointer flex items-center gap-3"
        >
          <span>See Recommended Tech Reel</span>
          <ArrowRight className="h-5 w-5" />
        </button>

        <button
          onClick={onBackToFeed}
          className="px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 text-sm font-bold transition-all cursor-pointer"
        >
          ← Keep Scrolling Feed
        </button>
      </div>

    </div>
  );
};
