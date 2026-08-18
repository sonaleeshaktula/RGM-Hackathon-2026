import React, { useState } from 'react';
import { Copy, Check, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import { StandardOutputSpec } from '../types';

interface OutputSpecViewerProps {
  outputSpec: StandardOutputSpec;
}

export const OutputSpecViewer: React.FC<OutputSpecViewerProps> = ({ outputSpec }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const formattedText = `- CURRENT REEL: ${outputSpec.currentReel}
- INTEREST DETECTED: ${outputSpec.interestDetected}
- WHY: ${outputSpec.why}
- RECOMMENDED TECH REEL: ${outputSpec.recommendedTechReel}
- CATEGORY: ${outputSpec.category}
- WHY THIS RECOMMENDATION: ${outputSpec.whyThisRecommendation}
- DIFFICULTY: ${outputSpec.difficulty}
- CONFIDENCE: ${outputSpec.confidence}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3">
      {/* Header with toggle */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-left hover:text-emerald-300 transition-colors"
        >
          <div className="h-6 w-6 rounded-md bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Terminal className="h-3.5 w-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              Standard Output Specification
              {isExpanded ? <ChevronUp className="h-3 w-3 text-slate-400" /> : <ChevronDown className="h-3 w-3 text-slate-400" />}
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">
              Verified 8-Field Schema
            </span>
          </div>
        </button>

        <button
          onClick={copyToClipboard}
          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 text-slate-400" />
              <span>Copy Spec</span>
            </>
          )}
        </button>
      </div>

      {/* 8-Field Display */}
      {isExpanded && (
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 font-mono text-[11px] space-y-2 leading-relaxed animate-fadeIn">
          <div>
            <span className="text-emerald-400 font-bold">- CURRENT REEL: </span>
            <span className="text-slate-200">{outputSpec.currentReel}</span>
          </div>

          <div>
            <span className="text-emerald-400 font-bold">- INTEREST DETECTED: </span>
            <span className="text-indigo-300 font-semibold">{outputSpec.interestDetected}</span>
          </div>

          <div>
            <span className="text-emerald-400 font-bold">- WHY: </span>
            <span className="text-slate-300">{outputSpec.why}</span>
          </div>

          <div>
            <span className="text-emerald-400 font-bold">- RECOMMENDED TECH REEL: </span>
            <span className="text-emerald-300 font-bold">{outputSpec.recommendedTechReel}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div>
              <span className="text-emerald-400 font-bold">- CATEGORY: </span>
              <span className="text-slate-200 font-semibold">{outputSpec.category}</span>
            </div>
            <div>
              <span className="text-emerald-400 font-bold">- DIFFICULTY: </span>
              <span className="text-indigo-300 font-semibold">{outputSpec.difficulty}</span>
            </div>
            <div>
              <span className="text-emerald-400 font-bold">- CONFIDENCE: </span>
              <span className="text-emerald-300 font-semibold">{outputSpec.confidence}</span>
            </div>
          </div>

          <div>
            <span className="text-emerald-400 font-bold">- WHY THIS RECOMMENDATION: </span>
            <span className="text-slate-300">{outputSpec.whyThisRecommendation}</span>
          </div>
        </div>
      )}
    </div>
  );
};
