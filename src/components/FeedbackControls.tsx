import React, { useState } from 'react';
import { ThumbsUp, Bookmark, ThumbsDown, Sliders, CheckCircle2, Sparkles, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CandidateEvaluationResult, DifficultyLevel, TechCategory } from '../types';

interface FeedbackControlsProps {
  topRecommendation: CandidateEvaluationResult;
  preferredDifficulty: DifficultyLevel;
  onFeedback: (action: 
    | { type: 'INTERESTED'; category: TechCategory }
    | { type: 'SAVE_TO_DECK'; reelId: string; category: TechCategory }
    | { type: 'NOT_RELEVANT'; reelId: string; category: TechCategory }
    | { type: 'SET_DIFFICULTY'; difficulty: DifficultyLevel }
  ) => void;
  feedbackNotification: string;
}

export const FeedbackControls: React.FC<FeedbackControlsProps> = ({
  topRecommendation,
  preferredDifficulty,
  onFeedback,
  feedbackNotification,
}) => {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handleInterested = () => {
    setActiveAction('INTERESTED');
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10B981', '#38BDF8', '#6366F1'],
    });
    onFeedback({ type: 'INTERESTED', category: topRecommendation.candidate.category });
  };

  const handleSave = () => {
    setActiveAction('SAVE');
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#F59E0B', '#10B981', '#EC4899'],
    });
    onFeedback({ 
      type: 'SAVE_TO_DECK', 
      reelId: topRecommendation.candidate.id, 
      category: topRecommendation.candidate.category 
    });
  };

  const handleNotRelevant = () => {
    setActiveAction('NOT_RELEVANT');
    onFeedback({ 
      type: 'NOT_RELEVANT', 
      reelId: topRecommendation.candidate.id, 
      category: topRecommendation.candidate.category 
    });
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-emerald-400" />
            Adaptive Learner Feedback
          </h3>
          <p className="text-[11px] text-slate-400">
            Interact to immediately test dynamic re-ranking of your Interest DNA.
          </p>
        </div>

        {/* Difficulty Tier Selector */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          {(['Beginner', 'Intermediate', 'Advanced'] as DifficultyLevel[]).map((diff) => (
            <button
              key={diff}
              onClick={() => onFeedback({ type: 'SET_DIFFICULTY', difficulty: diff })}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold transition-all ${
                preferredDifficulty === diff
                  ? 'bg-indigo-500 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <button
          onClick={handleInterested}
          className="p-3 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-md shadow-emerald-950/40"
        >
          <ThumbsUp className="h-4 w-4" />
          <span>Interested (+15% {topRecommendation.candidate.category})</span>
        </button>

        <button
          onClick={handleSave}
          className="p-3 rounded-xl bg-amber-950/50 hover:bg-amber-900/60 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-md shadow-amber-950/40"
        >
          <Bookmark className="h-4 w-4" />
          <span>Save to Deck (+25% Boost)</span>
        </button>

        <button
          onClick={handleNotRelevant}
          className="p-3 rounded-xl bg-slate-900/80 hover:bg-rose-950/40 border border-slate-700/80 hover:border-rose-500/40 text-slate-300 hover:text-rose-300 font-medium text-xs flex items-center justify-center gap-2 transition-all"
        >
          <ThumbsDown className="h-4 w-4" />
          <span>Not Relevant (Pivot Away)</span>
        </button>
      </div>

      {/* Live Feedback Toast Banner */}
      {feedbackNotification && (
        <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs text-emerald-300 font-mono flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
          <span>{feedbackNotification}</span>
        </div>
      )}
    </div>
  );
};
