import React, { useState } from 'react';
import { ShieldX, AlertOctagon, Ban, Flame, CheckCircle, Info } from 'lucide-react';
import { CandidateEvaluationResult } from '../types';

interface RejectedCandidatesModalProps {
  rejectedCandidates: CandidateEvaluationResult[];
}

export const RejectedCandidatesModal: React.FC<RejectedCandidatesModalProps> = ({
  rejectedCandidates,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'HYPE' | 'LOW_DEPTH' | 'REPETITIVE'>('ALL');

  const filteredList = rejectedCandidates.filter((item) => {
    if (filter === 'ALL') return true;
    if (filter === 'HYPE') return item.rejectionCategory === 'HYPE_RISK';
    if (filter === 'LOW_DEPTH') return item.rejectionCategory === 'LOW_EDUCATIONAL_VALUE';
    if (filter === 'REPETITIVE') return item.rejectionCategory === 'REPETITIVE_TRIVIAL';
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Header & Explanatory Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/60 via-slate-900/90 to-purple-950/60 border border-rose-500/30 space-y-2">
        <div className="flex items-center gap-2 text-rose-400 font-extrabold text-sm">
          <ShieldX className="h-5 w-5" />
          <span>Hype Filter & Low-Value Content Disqualification Audit</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          ScrollWise explicitly identifies and discards sensationalist clickbait, false career shortcuts, and repetitive low-novelty tutorials. Below are the {rejectedCandidates.length} candidate Reels disqualified during this recommendation cycle with transparent audit rationales.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono border transition-all ${
              filter === 'ALL'
                ? 'bg-rose-500 text-white border-rose-400'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            All Disqualified ({rejectedCandidates.length})
          </button>
          <button
            onClick={() => setFilter('HYPE')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono border transition-all flex items-center gap-1 ${
              filter === 'HYPE'
                ? 'bg-rose-500 text-white border-rose-400'
                : 'bg-slate-900 text-rose-300 border-slate-800 hover:text-rose-200'
            }`}
          >
            <Flame className="h-3 w-3" />
            Hype & Clickbait ({rejectedCandidates.filter((r) => r.rejectionCategory === 'HYPE_RISK').length})
          </button>
          <button
            onClick={() => setFilter('REPETITIVE')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono border transition-all flex items-center gap-1 ${
              filter === 'REPETITIVE'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                : 'bg-slate-900 text-amber-300 border-slate-800 hover:text-amber-200'
            }`}
          >
            <Ban className="h-3 w-3" />
            Repetitive / Trivial ({rejectedCandidates.filter((r) => r.rejectionCategory === 'REPETITIVE_TRIVIAL').length})
          </button>
        </div>
      </div>

      {/* Grid of Rejected Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredList.map((item) => {
          const { candidate } = item;
          const isHype = item.rejectionCategory === 'HYPE_RISK';
          const isRepetitive = item.rejectionCategory === 'REPETITIVE_TRIVIAL';

          return (
            <div
              key={candidate.id}
              className="glass-panel rounded-2xl overflow-hidden border border-rose-900/40 hover:border-rose-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Tag */}
                <div className="bg-rose-950/80 px-3.5 py-1.5 flex items-center justify-between border-b border-rose-900/60">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold font-mono text-rose-300 uppercase">
                    <AlertOctagon className="h-3.5 w-3.5 text-rose-400" />
                    <span>STATUS: REJECTED</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950 text-rose-400 border border-rose-800">
                    {item.rejectionCategory || 'DISQUALIFIED'}
                  </span>
                </div>

                <div className="p-4 space-y-3">
                  {/* Thumbnail & Title */}
                  <div className="flex gap-3">
                    <img
                      src={candidate.thumbnailUrl}
                      alt={candidate.title}
                      className="h-16 w-16 rounded-xl object-cover flex-shrink-0 brightness-75 border border-slate-800"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                        <span>{candidate.creator}</span>
                        <span>•</span>
                        <span>{candidate.category}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-200 line-clamp-2">
                        {candidate.title}
                      </h4>
                    </div>
                  </div>

                  {/* Rejection Rationale Box */}
                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      Disqualification Rationale
                    </div>
                    <p className="text-[11px] text-rose-200/90 leading-relaxed font-mono">
                      {item.rejectionReason}
                    </p>
                  </div>

                  {/* Indicators List */}
                  {candidate.hypeIndicators && candidate.hypeIndicators.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                        Triggered Risk Flags:
                      </span>
                      <div className="space-y-1 text-[10px] text-slate-300 font-mono">
                        {candidate.hypeIndicators.map((ind, iIdx) => (
                          <div key={iIdx} className="flex items-center gap-1.5 text-rose-300">
                            <span className="text-rose-500 font-bold">✕</span>
                            <span>{ind}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Metrics Footer */}
              <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">Hype Risk:</span>
                  <span className={`font-bold ${candidate.hypeRiskScore >= 0.6 ? 'text-rose-400' : 'text-slate-300'}`}>
                    {Math.round(candidate.hypeRiskScore * 100)}%
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">Substance Depth:</span>
                  <span className={`font-bold ${candidate.substanceScore < 0.3 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {Math.round(candidate.substanceScore * 100)}%
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">Final Score:</span>
                  <span className="font-bold text-rose-400">0.0 (Filtered)</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
