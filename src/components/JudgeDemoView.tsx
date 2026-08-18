import React, { useState } from 'react';
import { Award, ArrowRight, CheckCircle2, XCircle, Sparkles, Cpu, ShieldX, RefreshCw, Compass } from 'lucide-react';
import { RecommendationPipelineData, TechCategory } from '../types';

interface JudgeDemoViewProps {
  pipelineData: RecommendationPipelineData;
  onApplyPreset: (scenario: 'trap' | 'hype' | 'adaptive' | 'adjacent') => void;
  activeScenario: string;
}

export const JudgeDemoView: React.FC<JudgeDemoViewProps> = ({
  pipelineData,
  onApplyPreset,
  activeScenario,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<'trap' | 'hype' | 'adaptive' | 'adjacent'>(
    (activeScenario as any) || 'trap'
  );

  const handleSelect = (scenario: 'trap' | 'hype' | 'adaptive' | 'adjacent') => {
    setSelectedScenario(scenario);
    onApplyPreset(scenario);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-4">
      {/* Page Header */}
      <div className="text-center space-y-2 pb-3 border-b border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold">
          <Award className="h-3.5 w-3.5" />
          Interactive Judge Walkthrough
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          How ScrollWise Outsmarts Shallow Algorithms
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Select any of the 4 live scenarios below to see how ScrollWise analyzes behavior, rejects traps, and recommends genuinely useful content.
        </p>
      </div>

      {/* 4 Preset Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          onClick={() => handleSelect('trap')}
          className={`p-3 rounded-xl border text-left transition-all ${
            selectedScenario === 'trap'
              ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-300'
              : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          <span className="text-[10px] font-mono block opacity-80 uppercase">Scenario 1</span>
          <span className="text-xs font-extrabold block">The Java Trap</span>
        </button>

        <button
          onClick={() => handleSelect('hype')}
          className={`p-3 rounded-xl border text-left transition-all ${
            selectedScenario === 'hype'
              ? 'bg-rose-500 text-white border-rose-400 font-bold shadow-lg shadow-rose-500/20 ring-1 ring-rose-300'
              : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          <span className="text-[10px] font-mono block opacity-80 uppercase">Scenario 2</span>
          <span className="text-xs font-extrabold block">Reject Hype</span>
        </button>

        <button
          onClick={() => handleSelect('adaptive')}
          className={`p-3 rounded-xl border text-left transition-all ${
            selectedScenario === 'adaptive'
              ? 'bg-indigo-500 text-white border-indigo-400 font-bold shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-300'
              : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          <span className="text-[10px] font-mono block opacity-80 uppercase">Scenario 3</span>
          <span className="text-xs font-extrabold block">Learn From Feedback</span>
        </button>

        <button
          onClick={() => handleSelect('adjacent')}
          className={`p-3 rounded-xl border text-left transition-all ${
            selectedScenario === 'adjacent'
              ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-lg shadow-amber-500/20 ring-1 ring-amber-300'
              : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          <span className="text-[10px] font-mono block opacity-80 uppercase">Scenario 4</span>
          <span className="text-xs font-extrabold block">Smart Next Topic</span>
        </button>
      </div>

      {/* 3-Step Visual Story Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Step 1: WHAT THE STUDENT DID */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase">
              1. What the Student Did
            </span>
            <span className="text-xs font-bold text-slate-400">Inputs</span>
          </div>

          {selectedScenario === 'trap' && (
            <div className="space-y-2 text-xs text-slate-200">
              <p className="text-slate-400 text-[11px]">The student interacted with 4 different reels:</p>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">☕ 1. Java programming meme</div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">💼 2. Software engineer lifestyle vlog</div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">🌳 3. Coding interview joke</div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">💻 4. Workstation laptop benchmark</div>
            </div>
          )}

          {selectedScenario === 'hype' && (
            <div className="space-y-2 text-xs text-slate-200">
              <p className="text-slate-400 text-[11px]">Encountered viral clickbait reels:</p>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">🚀 "10 AI Tools Guaranteed FAANG Job in 24h"</div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">💀 "Software Engineers are DEAD in 2026"</div>
            </div>
          )}

          {selectedScenario === 'adaptive' && (
            <div className="space-y-2 text-xs text-slate-200">
              <p className="text-slate-400 text-[11px]">Student provided live feedback:</p>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">👍 Clicked "Interested" on Cloud & DevOps</div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">📶 Shifted difficulty tier to "Intermediate"</div>
            </div>
          )}

          {selectedScenario === 'adjacent' && (
            <div className="space-y-2 text-xs text-slate-200">
              <p className="text-slate-400 text-[11px]">Student mastered basic programming:</p>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">✓ Ready to explore adjacent backend architecture</div>
            </div>
          )}
        </div>

        {/* Step 2: WHAT SCROLLWISE UNDERSTOOD */}
        <div className="rounded-2xl bg-slate-900/90 border border-emerald-500/40 p-5 space-y-3 bg-emerald-950/10">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-500/30">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
              2. What ScrollWise Understood
            </span>
            <span className="text-xs font-bold text-emerald-400">AI Inference</span>
          </div>

          {selectedScenario === 'trap' && (
            <div className="space-y-2 text-xs text-slate-200">
              <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-900/50 text-rose-300">
                <span className="font-bold block mb-1">Shallow Keyword Matcher:</span>
                "Matched word 'Java' → assumes student only wants basic Java syntax."
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-950/50 border border-emerald-500/40 text-emerald-200">
                <span className="font-bold block mb-1">ScrollWise Inferred:</span>
                "Broader Interest: <b>Software Engineering & Systems Architecture</b>."
              </div>
            </div>
          )}

          {selectedScenario === 'hype' && (
            <div className="space-y-2 text-xs text-slate-200">
              <div className="p-2.5 rounded-lg bg-rose-950/50 border border-rose-500/40 text-rose-200">
                <span className="font-bold block mb-1">Hype Filter Triggered:</span>
                "Identified sensationalist timeline claims ('get hired in 24h') and near-zero educational substance."
              </div>
            </div>
          )}

          {selectedScenario === 'adaptive' && (
            <div className="space-y-2 text-xs text-slate-200">
              <div className="p-2.5 rounded-lg bg-indigo-950/50 border border-indigo-500/40 text-indigo-200">
                <span className="font-bold block mb-1">Dynamic Profile Shift:</span>
                "Reinforced Cloud affinity (+15%) and recalculated candidate matrix in real time."
              </div>
            </div>
          )}

          {selectedScenario === 'adjacent' && (
            <div className="space-y-2 text-xs text-slate-200">
              <div className="p-2.5 rounded-lg bg-amber-950/50 border border-amber-500/40 text-amber-200">
                <span className="font-bold block mb-1">Smart Adjacency:</span>
                "Mapped progression: Programming → Software Engineering → Distributed Systems & Database Internals."
              </div>
            </div>
          )}
        </div>

        {/* Step 3: WHAT IT RECOMMENDED */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase">
              3. What It Recommended
            </span>
            <span className="text-xs font-bold text-emerald-400">Result</span>
          </div>

          <div className="space-y-2.5 text-xs text-slate-200">
            <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono">
                Top Recommendation:
              </span>
              <h4 className="text-xs font-extrabold text-white">
                "{pipelineData.topRecommendation.candidate.title}"
              </h4>
              <span className="text-[10px] text-slate-400 font-mono block">
                Category: {pipelineData.topRecommendation.candidate.category} • Match: {pipelineData.topRecommendation.scores.compositeScore}%
              </span>
            </div>

            <p className="text-[11px] text-slate-300 font-sans italic">
              "Expands the learner's curiosity into genuine, career-advancing engineering knowledge."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
