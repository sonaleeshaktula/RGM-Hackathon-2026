import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle, 
  Layers, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp, 
  ThumbsUp, 
  Bookmark, 
  ThumbsDown 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CandidateEvaluationResult, DifficultyLevel, TechCategory } from '../types';
import { ReelVideoPlayer } from './ReelVideoPlayer';

interface RecommendationCardProps {
  recommendation: CandidateEvaluationResult;
  preferredDifficulty: DifficultyLevel;
  confidence: string;
  onFeedback: (action: 
    | { type: 'INTERESTED'; category: TechCategory }
    | { type: 'SAVE_TO_DECK'; reelId: string; category: TechCategory }
    | { type: 'NOT_RELEVANT'; reelId: string; category: TechCategory }
    | { type: 'SET_DIFFICULTY'; difficulty: DifficultyLevel }
  ) => void;
  feedbackNotification: string;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  preferredDifficulty,
  confidence,
  onFeedback,
  feedbackNotification,
}) => {
  const [showScoreMatrix, setShowScoreMatrix] = useState<boolean>(false);
  const { candidate, scores } = recommendation;

  const handleInterested = () => {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#10B981', '#38BDF8', '#6366F1'],
    });
    onFeedback({ type: 'INTERESTED', category: candidate.category });
  };

  const handleSave = () => {
    confetti({
      particleCount: 65,
      spread: 75,
      origin: { y: 0.75 },
      colors: ['#F59E0B', '#10B981', '#EC4899'],
    });
    onFeedback({ 
      type: 'SAVE_TO_DECK', 
      reelId: candidate.id, 
      category: candidate.category 
    });
  };

  return (
    <div className="glass-panel-glow rounded-2xl overflow-hidden border border-emerald-500/40 p-5 space-y-4 shadow-2xl">
      {/* Top Hero Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              AI Recommended Tech Reel
            </h2>
            <span className="text-[10px] font-mono text-emerald-400">
              Confidence: {confidence}
            </span>
          </div>
        </div>

        {/* Match Score Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-mono text-xs font-bold">
          <span>Match Score:</span>
          <span className="text-emerald-400 font-extrabold">{scores.compositeScore}%</span>
        </div>
      </div>

      {/* Actual Playable Video Area */}
      <ReelVideoPlayer
        title={candidate.title}
        creator={candidate.creator}
        category={candidate.category}
        durationSeconds={candidate.durationSeconds}
        thumbnailUrl={candidate.thumbnailUrl}
        videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        transcriptExcerpt={candidate.description}
        archetype="High Value Tech Recommendation"
        badgeText={`Difficulty: ${candidate.difficulty}`}
        isHero={true}
      />

      {/* Title & Metadata Pills */}
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 text-emerald-300 border border-emerald-500/30">
            Category: {candidate.category}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 text-indigo-300 border border-indigo-500/30">
            Tier: {candidate.difficulty}
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            Creator: <span className="text-slate-200 font-semibold">{candidate.creator}</span>
          </span>
        </div>

        <h3 className="text-base font-extrabold text-slate-100 leading-snug">
          {candidate.title}
        </h3>
      </div>

      {/* Concise Why This Recommendation */}
      <div className="p-3 rounded-xl bg-emerald-950/25 border border-emerald-500/30 space-y-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1 font-mono">
          <TrendingUp className="h-3.5 w-3.5" />
          Why This Recommendation (Latent Connection)
        </div>
        <p className="text-xs text-slate-200 leading-relaxed font-mono">
          {candidate.whyUseful}
        </p>
      </div>

      {/* Key Concept Takeaways */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
        <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1 font-mono">
          <CheckCircle className="h-3 w-3 text-emerald-400" />
          Key Concept Takeaways:
        </div>
        <div className="grid grid-cols-1 gap-1 text-xs text-slate-300">
          {candidate.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-[11px]">
              <span className="text-emerald-400 font-bold">•</span>
              <span>{takeaway}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Adaptive Feedback Buttons */}
      <div className="pt-2 border-t border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-semibold uppercase tracking-wider text-[10px] font-mono">Adaptive Learner Feedback:</span>
          {/* Difficulty quick switcher */}
          <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 font-mono text-[9px]">
            {(['Beginner', 'Intermediate', 'Advanced'] as DifficultyLevel[]).map((d) => (
              <button
                key={d}
                onClick={() => onFeedback({ type: 'SET_DIFFICULTY', difficulty: d })}
                className={`px-2 py-0.5 rounded transition-all ${
                  preferredDifficulty === d
                    ? 'bg-indigo-500 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <button
            onClick={handleInterested}
            className="py-2 px-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/40 text-emerald-300 font-bold flex items-center justify-center gap-1.5 transition-all text-xs"
          >
            <ThumbsUp className="h-3.5 w-3.5" />
            <span>Interested</span>
          </button>

          <button
            onClick={handleSave}
            className="py-2 px-2 rounded-xl bg-amber-950/60 hover:bg-amber-900/70 border border-amber-500/40 text-amber-300 font-bold flex items-center justify-center gap-1.5 transition-all text-xs"
          >
            <Bookmark className="h-3.5 w-3.5" />
            <span>Save</span>
          </button>

          <button
            onClick={() => onFeedback({ type: 'NOT_RELEVANT', reelId: candidate.id, category: candidate.category })}
            className="py-2 px-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500/30 text-slate-400 hover:text-rose-300 font-medium flex items-center justify-center gap-1.5 transition-all text-xs"
          >
            <ThumbsDown className="h-3.5 w-3.5" />
            <span>Not Relevant</span>
          </button>
        </div>

        {/* Feedback notification toast */}
        {feedbackNotification && (
          <div className="p-2 rounded-lg bg-slate-950 border border-emerald-500/30 text-[11px] text-emerald-300 font-mono flex items-center gap-1.5 animate-fadeIn">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
            <span>{feedbackNotification}</span>
          </div>
        )}
      </div>

      {/* Multi-Dimensional Scoring Breakdown Toggle */}
      <div className="pt-1">
        <button
          onClick={() => setShowScoreMatrix(!showScoreMatrix)}
          className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 hover:text-emerald-400 transition-colors py-1"
        >
          <div className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" />
            <span>Multi-Factor Scoring Breakdown</span>
          </div>
          {showScoreMatrix ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>

        {showScoreMatrix && (
          <div className="mt-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-3 gap-2 text-[10px] font-mono animate-fadeIn">
            <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block">Latent Match (35%):</span>
              <span className="font-bold text-emerald-400">{scores.latentMatch}/100</span>
            </div>
            <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block">Usefulness (25%):</span>
              <span className="font-bold text-emerald-400">{scores.educationalUsefulness}/100</span>
            </div>
            <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block">Novelty (15%):</span>
              <span className="font-bold text-indigo-400">{scores.noveltyAndAdjacency}/100</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
