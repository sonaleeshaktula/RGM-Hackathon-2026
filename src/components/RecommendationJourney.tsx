import React, { useState } from 'react';
import { 
  CheckCircle, 
  Layers, 
  ShieldAlert, 
  Sparkles, 
  TrendingUp, 
  Video, 
  Activity, 
  Filter, 
  ArrowRight,
  HelpCircle,
  Sliders
} from 'lucide-react';
import { RecommendationPipelineData, InteractedReel, CandidateEvaluationResult } from '../types';

interface RecommendationJourneyProps {
  pipelineData: RecommendationPipelineData;
}

export const RecommendationJourney: React.FC<RecommendationJourneyProps> = ({ pipelineData }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const reels: InteractedReel[] = pipelineData.interactedReels || [];
  const evaluated: CandidateEvaluationResult[] = pipelineData.evaluatedCandidates || pipelineData.candidateRankings || [];

  const stages = [
    {
      id: 'step_ingest',
      number: '01',
      title: 'Observed Reels Ingestion',
      icon: Video,
      badge: `${reels.length} Active Reels`,
      summary: 'Ingests student video watch telemetry (watch %, likes, saves, replays, skips).',
      detail: (
        <div className="space-y-3">
          <p className="text-xs text-slate-300">
            Raw student interactions collected from short-form feeds without assuming immediate topical interest.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {reels.map((reel) => (
              <div key={reel.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <div className="truncate max-w-[200px]">
                  <span className="font-semibold text-slate-200 block truncate">{reel.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{reel.creator} • {reel.category}</span>
                </div>
                <span className="font-mono text-emerald-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {reel.telemetry.watchPercentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'step_signals',
      number: '02',
      title: 'Multi-Signal Behavioral Weighting',
      icon: Activity,
      badge: 'Sigmoid Weighting Active',
      summary: 'Calculates true engagement weight: saves & replays amplified; early skips attenuated.',
      detail: (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/30 font-mono text-xs text-emerald-300">
            Formula: W = clamp((Watch% / 100) * 1.2 + (Liked * 0.25) + (Saved * 0.55) + (Replayed * 0.40) - (Skipped * 0.70), 0.05, 2.8)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {reels.map((reel) => {
              const w = reel.telemetry.computedWeight ?? 1.5;
              return (
                <div key={reel.id} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 truncate max-w-[170px]">{reel.title}</span>
                  <div className="flex items-center gap-1.5">
                    {reel.telemetry.isSaved && <span className="text-[9px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded">Saved</span>}
                    {reel.telemetry.isLiked && <span className="text-[9px] bg-rose-950 text-rose-300 px-1.5 py-0.5 rounded">Liked</span>}
                    <span className="text-emerald-400 font-bold">W={w.toFixed(2)}x</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      id: 'step_latent',
      number: '03',
      title: 'Latent Interest DNA Synthesis',
      icon: Layers,
      badge: 'Ontology Graph Active',
      summary: 'Synthesizes interaction centroids into broader technology learning domains.',
      detail: (
        <div className="space-y-3">
          <p className="text-xs text-slate-300">
            Bridges disparate topics (e.g. Java NullPointer meme + SWE lifestyle + coding interview) into a cohesive latent interest:
          </p>
          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase font-mono">Inferred Primary Centroid:</span>
            <div className="text-sm font-bold text-white">
              💻 {pipelineData.studentProfile.primaryInterests[0]?.domainName || 'Software Engineering & Architecture'} ({pipelineData.studentProfile.primaryInterests[0]?.score}%)
            </div>
            <p className="text-xs text-slate-300 font-mono">
              Recognized programming humor as a proxy for backend engineering practices, avoiding the shallow Java syntax trap.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'step_hype',
      number: '04',
      title: 'Hype & Sensationalism Disqualification',
      icon: ShieldAlert,
      badge: `${pipelineData.rejectedCandidates.length} Disqualified`,
      summary: 'Strictly rejects sensationalist claims ($200k in 24h, zero coding) and low-novelty tutorials.',
      detail: (
        <div className="space-y-2.5">
          <p className="text-xs text-slate-300">
            Filtered out {pipelineData.rejectedCandidates.length} low-value clickbait videos from the recommendation candidate pool:
          </p>
          <div className="space-y-2 font-mono text-xs">
            {pipelineData.rejectedCandidates.slice(0, 2).map((item) => (
              <div key={item.candidate.id} className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/40 space-y-1">
                <div className="flex items-center justify-between text-rose-300 font-bold text-xs">
                  <span>❌ "{item.candidate.title}"</span>
                  <span className="text-[10px] bg-rose-950 px-1.5 py-0.5 rounded border border-rose-800">REJECTED</span>
                </div>
                <p className="text-[11px] text-slate-400">{item.rejectionReason}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'step_matrix',
      number: '05',
      title: 'Multi-Factor Scoring Matrix',
      icon: Sliders,
      badge: '5 Weighted Factors',
      summary: 'Scores qualified candidates across latent match, educational value, novelty, tier, and quality.',
      detail: (
        <div className="space-y-2.5">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
            <span className="text-emerald-400 font-bold block">Scoring Weights:</span>
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              <div>• Latent Match: 35%</div>
              <div>• Educational Value: 25%</div>
              <div>• Novelty & Adjacency: 15%</div>
              <div>• Difficulty Fit: 10%</div>
              <div>• Content Quality: 15%</div>
            </div>
          </div>
          <div className="space-y-1.5">
            {evaluated.slice(0, 3).map((res) => (
              <div key={res.candidate.id} className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="truncate max-w-[240px] text-slate-200">{res.candidate.title}</span>
                <span className="text-emerald-400 font-bold">{res.scores.compositeScore}%</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'step_recommend',
      number: '06',
      title: 'Top Value Recommendation Selected',
      icon: Sparkles,
      badge: `Match: ${pipelineData.topRecommendation.scores.compositeScore}%`,
      summary: 'Presents the top-ranked educational Reel with verified non-shallow alignment.',
      detail: (
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-indigo-950/40 border border-emerald-500/40 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 font-bold uppercase">WINNER</span>
            <span className="text-slate-300">{pipelineData.topRecommendation.candidate.category} • {pipelineData.topRecommendation.candidate.difficulty}</span>
          </div>
          <h4 className="text-sm font-bold text-white">
            "{pipelineData.topRecommendation.candidate.title}"
          </h4>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            {pipelineData.topRecommendation.candidate.whyUseful}
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-1.5 pb-3 border-b border-slate-800">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
          Transparent AI Recommendation Pipeline
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Recommendation Journey (6 Stages)
        </h2>
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          Step-by-step audit of how ScrollWise converts raw video interactions into high-value technology learning.
        </p>
      </div>

      {/* Stage Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {stages.map((stage, idx) => (
          <button
            key={stage.id}
            onClick={() => setActiveStep(idx)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeStep === idx
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <span>{stage.number}</span>
            <span className="truncate max-w-[120px]">{stage.title}</span>
          </button>
        ))}
      </div>

      {/* Active Stage Card */}
      <div className="glass-panel-glow rounded-3xl p-6 border border-emerald-500/40 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              {stages[activeStep].number}
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                {stages[activeStep].title}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {stages[activeStep].summary}
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-950 text-emerald-300 border border-emerald-500/30 self-start sm:self-auto">
            {stages[activeStep].badge}
          </span>
        </div>

        {/* Stage Content */}
        <div className="pt-1">
          {stages[activeStep].detail}
        </div>
      </div>
    </div>
  );
};
