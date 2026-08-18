import React from 'react';
import { GitCommit } from 'lucide-react';
import { ReasoningStep } from '../types';

interface WhyThisRecommendationProps {
  reasoningSteps: ReasoningStep[];
}

export const WhyThisRecommendation: React.FC<WhyThisRecommendationProps> = ({
  reasoningSteps,
}) => {
  return (
    <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <GitCommit className="h-3.5 w-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Reasoning Chain
            </h3>
            <span className="text-[10px] font-mono text-indigo-400">
              Audit Pipeline
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-500/30">
          5-Stage Inferred
        </span>
      </div>

      {/* Steps List */}
      <div className="relative pl-3.5 space-y-3 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 via-indigo-500 before:to-teal-500">
        {reasoningSteps.map((step, idx) => (
          <div key={idx} className="relative space-y-1">
            {/* Step Node Dot */}
            <div className="absolute -left-[18px] top-1 h-2.5 w-2.5 rounded-full bg-slate-950 border-2 border-emerald-400 shadow-sm" />

            <div className="flex items-center justify-between gap-1 text-[11px]">
              <span className="font-bold text-slate-200">
                0{idx + 1}. {step.title}
              </span>
            </div>

            <p className="text-[10px] text-slate-400 font-mono leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
