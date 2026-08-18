import React, { useState } from 'react';
import { Film, Cpu, Compass, ShieldAlert, ChevronDown, ChevronUp, CheckCircle, ArrowRight } from 'lucide-react';
import { RecommendationPipelineData } from '../types';

interface HowItWorksSimpleProps {
  pipelineData: RecommendationPipelineData;
  onStartScrolling: () => void;
}

export const HowItWorksSimple: React.FC<HowItWorksSimpleProps> = ({
  pipelineData,
  onStartScrolling,
}) => {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState<boolean>(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-2 pb-2 border-b border-slate-800">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
          How ScrollWise Works
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          From Casual Scrolling to Real Learning
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          ScrollWise transforms passive screen time into meaningful career and technology discovery through 4 simple steps.
        </p>
      </div>

      {/* 4 Simple Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Step 1: WATCH */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black font-mono text-emerald-400">01</span>
            <div className="h-10 w-10 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Film className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-lg font-black text-white">WATCH</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            "We observe what you interact with across entertainment, memes, coding, and tech news."
          </p>
          <div className="pt-2 text-[11px] font-mono text-emerald-400/80">
            • Likes, bookmarks, watch %, replays
          </div>
        </div>

        {/* Step 2: UNDERSTAND */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-indigo-500/30 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black font-mono text-indigo-400">02</span>
            <div className="h-10 w-10 rounded-2xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Cpu className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-lg font-black text-white">UNDERSTAND</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            "We find the broader interest behind your interactions instead of simple keyword matching."
          </p>
          <div className="pt-2 text-[11px] font-mono text-indigo-400/80">
            • Java meme + SWE vlog → Software Engineering
          </div>
        </div>

        {/* Step 3: RECOMMEND */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-teal-500/30 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black font-mono text-teal-400">03</span>
            <div className="h-10 w-10 rounded-2xl bg-teal-950/80 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Compass className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-lg font-black text-white">RECOMMEND</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            "We suggest useful technology content that matches that interest and builds real skills."
          </p>
          <div className="pt-2 text-[11px] font-mono text-teal-400/80">
            • High-Level Design, Databases, System Architecture
          </div>
        </div>

        {/* Step 4: FILTER */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-rose-500/30 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black font-mono text-rose-400">04</span>
            <div className="h-10 w-10 rounded-2xl bg-rose-950/80 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <ShieldAlert className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-lg font-black text-white">FILTER</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            "We avoid misleading hype, clickbait claims, and shallow tutorials."
          </p>
          <div className="pt-2 text-[11px] font-mono text-rose-400/80">
            • Filters "10 AI tools that get you a job in 24h"
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center pt-2">
        <button
          onClick={onStartScrolling}
          className="px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <span>Experience the Live Feed</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Optional Technical Details for Judges */}
      <div className="pt-4 border-t border-slate-800">
        <button
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          className="w-full p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
        >
          <span>Optional: Technical Scoring Architecture Details</span>
          {showTechnicalDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showTechnicalDetails && (
          <div className="mt-3 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs text-slate-300 animate-fadeIn">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Latent Fit (35%)</span>
                <span className="text-sm font-bold text-emerald-400">{pipelineData.topRecommendation.scores.latentMatch}/100</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Educational Depth (25%)</span>
                <span className="text-sm font-bold text-emerald-400">{pipelineData.topRecommendation.scores.educationalUsefulness}/100</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Novelty & Adjacency (15%)</span>
                <span className="text-sm font-bold text-indigo-400">{pipelineData.topRecommendation.scores.noveltyAndAdjacency}/100</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Content Quality (15%)</span>
                <span className="text-sm font-bold text-teal-400">{pipelineData.topRecommendation.scores.contentQuality}/100</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
