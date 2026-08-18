import React from 'react';
import { ShieldAlert, CheckCircle, XCircle, ArrowRight, Zap, Target, HelpCircle } from 'lucide-react';
import { RecommendationPipelineData } from '../types';

interface NaiveVsLatentModalProps {
  pipelineData: RecommendationPipelineData;
}

export const NaiveVsLatentModal: React.FC<NaiveVsLatentModalProps> = ({ pipelineData }) => {
  const { topRecommendation, studentProfile, naiveComparison } = pipelineData;
  const primaryDomain = studentProfile.primaryInterests[0];

  const shallowRec = naiveComparison?.shallowRecommendation || 'Java For-Loop & While-Loop Syntax for Complete Beginners';
  const shallowWhy = naiveComparison?.shallowWhy || 'Matched exact keyword token "Java" from the Java NullPointerException meme.';
  const flaws = naiveComparison?.shallowFlaws || [
    'Failed to recognize 100% completion & saved telemetry on SWE lifestyle reel.',
    'Ignored coding interview problem-solving and workstation virtualization context.',
    'Trapped the learner in repetitive beginner syntax loops instead of advancing to architecture.',
    'Vulnerable to recommending "10 AI Tools to Get a Job" due to naive keyword overlap.',
  ];

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="text-center space-y-2 pb-4 border-b border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
          <Target className="h-3.5 w-3.5" />
          Hackathon Built-in Trap Demonstration
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Naive Keyword Matcher vs ScrollWise Latent Agent
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
          A student watches a Java meme, an engineering lifestyle video, a coding interview joke, and a laptop comparison. How do the algorithms compare?
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Column 1: The Naive Keyword Trap */}
        <div className="glass-panel rounded-2xl p-5 border border-rose-500/30 space-y-4 bg-rose-950/10">
          <div className="flex items-center justify-between pb-3 border-b border-rose-900/40">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase font-mono">
              <XCircle className="h-4 w-4" />
              <span>Shallow Keyword System (The Trap)</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950 text-rose-300 border border-rose-800">
              Score: 24/100
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Naive Recommendation:</span>
            <h3 className="text-sm font-bold text-slate-200">
              "{shallowRec}"
            </h3>
            <p className="text-xs text-rose-300/90 italic font-mono bg-rose-950/40 p-2.5 rounded-lg border border-rose-900/40">
              Reasoning: {shallowWhy}
            </p>
          </div>

          {/* Flaws List */}
          <div className="space-y-2 pt-2 border-t border-rose-900/30">
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider font-mono">
              Critical Flaws & Traps:
            </span>
            <div className="space-y-1.5 text-xs text-slate-300 font-mono">
              {flaws.map((flaw: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2 text-rose-200">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>{flaw}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: ScrollWise Latent Recommendation */}
        <div className="glass-panel-glow rounded-2xl p-5 border border-emerald-500/40 space-y-4 bg-emerald-950/10">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase font-mono">
              <CheckCircle className="h-4 w-4" />
              <span>ScrollWise Latent AI Agent</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
              Score: {topRecommendation.scores.compositeScore}/100
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Latent Recommendation:</span>
            <h3 className="text-sm font-bold text-white">
              "{topRecommendation.candidate.title}"
            </h3>
            <p className="text-xs text-emerald-300/90 font-mono bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-900/40">
              Inferred Broader Interest: <b>{primaryDomain?.domainName || 'Software Engineering & Architecture'}</b>
            </p>
          </div>

          {/* Advantages */}
          <div className="space-y-2 pt-2 border-t border-emerald-900/30">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-mono">
              Why ScrollWise Succeeds:
            </span>
            <div className="space-y-1.5 text-xs text-slate-300 font-mono">
              <div className="flex items-start gap-2 text-emerald-200">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Recognized Java meme as a proxy for production engineering humor, not beginner language interest.</span>
              </div>
              <div className="flex items-start gap-2 text-emerald-200">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Bridges coding interview practice & workstation hardware into High-Level Systems Design ({topRecommendation.candidate.category}).</span>
              </div>
              <div className="flex items-start gap-2 text-emerald-200">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Filtered out 10 AI Tools clickbait and repetitive syntax tutorials.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
