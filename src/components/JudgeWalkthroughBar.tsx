import React from 'react';
import { Target, ShieldX, Cpu, Sparkles, HelpCircle } from 'lucide-react';

interface JudgeWalkthroughBarProps {
  onSelectScenario: (scenario: 'trap' | 'hype' | 'adaptive' | 'adjacent') => void;
  activeScenario: string;
}

export const JudgeWalkthroughBar: React.FC<JudgeWalkthroughBarProps> = ({
  onSelectScenario,
  activeScenario,
}) => {
  return (
    <div className="bg-slate-950/90 border-b border-slate-800 px-4 py-2">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
          <Target className="h-3.5 w-3.5 text-emerald-400" />
          <span className="font-bold uppercase tracking-wider text-[10px] text-slate-400">
            Judge Quick Presets:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => onSelectScenario('trap')}
            className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold transition-all border flex items-center gap-1.5 ${
              activeScenario === 'trap'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-sm'
                : 'bg-slate-900 text-emerald-300 border-slate-800 hover:border-emerald-500/40'
            }`}
          >
            <Cpu className="h-3 w-3" />
            1. Built-in Trap (Java → HLD)
          </button>

          <button
            onClick={() => onSelectScenario('hype')}
            className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold transition-all border flex items-center gap-1.5 ${
              activeScenario === 'hype'
                ? 'bg-rose-500 text-white border-rose-400 font-bold shadow-sm'
                : 'bg-slate-900 text-rose-300 border-slate-800 hover:border-rose-500/40'
            }`}
          >
            <ShieldX className="h-3 w-3" />
            2. Hype Filter Disqualification
          </button>

          <button
            onClick={() => onSelectScenario('adaptive')}
            className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold transition-all border flex items-center gap-1.5 ${
              activeScenario === 'adaptive'
                ? 'bg-indigo-500 text-white border-indigo-400 font-bold shadow-sm'
                : 'bg-slate-900 text-indigo-300 border-slate-800 hover:border-indigo-500/40'
            }`}
          >
            <Sparkles className="h-3 w-3" />
            3. Adaptive Feedback Shift
          </button>

          <button
            onClick={() => onSelectScenario('adjacent')}
            className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold transition-all border flex items-center gap-1.5 ${
              activeScenario === 'adjacent'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-sm'
                : 'bg-slate-900 text-amber-300 border-slate-800 hover:border-amber-500/40'
            }`}
          >
            <HelpCircle className="h-3 w-3" />
            4. Smart Tech Adjacency
          </button>
        </div>
      </div>
    </div>
  );
};
