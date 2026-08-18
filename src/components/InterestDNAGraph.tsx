import React from 'react';
import { Dna, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { StudentInterestProfile } from '../types';

interface InterestDNAGraphProps {
  profile: StudentInterestProfile;
}

export const InterestDNAGraph: React.FC<InterestDNAGraphProps> = ({ profile }) => {
  return (
    <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Dna className="h-3.5 w-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
              Student Interest DNA
              <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                Inferred Centroid
              </span>
            </h3>
            <span className="text-[10px] text-slate-400">
              Not simple keyword matching
            </span>
          </div>
        </div>

        <div className="text-[10px] font-mono text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
          Confidence: {profile.overallConfidence}
        </div>
      </div>

      {/* Top 3 Inferred Latent Domains */}
      <div className="space-y-2.5">
        {profile.primaryInterests.slice(0, 3).map((interest, index) => {
          const gradients = [
            'from-emerald-500 to-teal-400',
            'from-indigo-500 to-blue-400',
            'from-cyan-500 to-sky-400',
          ];
          const gradient = gradients[index % gradients.length];

          return (
            <div
              key={interest.domainId}
              className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 truncate max-w-[170px]">
                  <span className="font-mono text-[9px] font-bold text-slate-400 bg-slate-800 px-1 rounded">
                    0{index + 1}
                  </span>
                  <span className="font-bold text-slate-200 truncate text-[11px]">
                    {interest.domainName}
                  </span>
                </div>
                <span className="font-mono font-extrabold text-xs text-emerald-400">
                  {interest.score}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-500`}
                  style={{ width: `${interest.score}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                <span>{interest.contributingReelIds.length} interaction signals</span>
                <span className="text-indigo-300">{interest.category}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Smart Adjacent Exploration Banner */}
      {profile.adjacentInterestsToExplore.length > 0 && (
        <div className="p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-[10px] space-y-1">
          <div className="flex items-center gap-1 text-indigo-300 font-bold font-mono">
            <ArrowUpRight className="h-3 w-3" />
            <span>Adjacent Tech Horizon:</span>
          </div>
          <p className="text-slate-300 leading-snug">
            {profile.adjacentInterestsToExplore.slice(0, 2).join(' & ')}
          </p>
        </div>
      )}
    </div>
  );
};
