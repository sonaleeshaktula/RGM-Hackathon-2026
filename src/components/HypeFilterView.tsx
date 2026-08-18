import React from 'react';
import { ShieldX, AlertTriangle, CheckCircle2, Flame, Ban } from 'lucide-react';
import { CandidateEvaluationResult } from '../types';

interface HypeFilterViewProps {
  rejectedCandidates: CandidateEvaluationResult[];
}

export const HypeFilterView: React.FC<HypeFilterViewProps> = ({ rejectedCandidates }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      {/* Page Header */}
      <div className="text-center space-y-2 pb-4 border-b border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 text-rose-300 border border-rose-500/30 text-xs font-mono font-bold">
          <ShieldX className="h-3.5 w-3.5" />
          Hype & Quality Protection
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          "Not everything popular is useful."
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Short-form algorithms often promote sensationalist claims. ScrollWise evaluates educational substance and actively filters out low-value clickbait.
        </p>
      </div>

      {/* Disqualified Candidates List */}
      <div className="space-y-4">
        {rejectedCandidates.map((item) => {
          const { candidate } = item;
          const isHype = item.rejectionCategory === 'HYPE_RISK';

          return (
            <div
              key={candidate.id}
              className="rounded-2xl bg-slate-900/90 border border-rose-900/40 p-5 space-y-3.5 shadow-lg"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-rose-950 text-rose-400 border border-rose-800 flex items-center justify-center text-xs font-bold font-mono">
                    ✕
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-100">
                    "{candidate.title}"
                  </h3>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-700/60 self-start sm:self-auto">
                  {isHype ? 'REJECTED: HYPE RISK' : 'REJECTED: LOW NOVELTY'}
                </span>
              </div>

              {/* Simple Plain English Reason */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Why ScrollWise rejected this:
                </span>
                
                <div className="space-y-1.5 text-xs text-slate-200">
                  {candidate.hypeIndicators && candidate.hypeIndicators.length > 0 ? (
                    candidate.hypeIndicators.map((ind, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-rose-300">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{ind}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-start gap-2 text-amber-300">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>Repetitive basic syntax with low educational depth.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Creator & Category */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                <span>Creator: <span className="text-slate-300">{candidate.creator}</span></span>
                <span>Category: <span className="text-slate-300">{candidate.category}</span></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
