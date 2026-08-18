import React, { useState } from 'react';
import { 
  Sparkles, 
  ThumbsUp, 
  Bookmark, 
  ThumbsDown, 
  CheckCircle, 
  ArrowLeft, 
  ShieldAlert, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  TrendingUp,
  XCircle,
  HelpCircle,
  Film
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CandidateEvaluationResult, StudentInterestProfile, StandardOutputSpec, TechCategory, DifficultyLevel } from '../types';
import { ReelVideoPlayer } from './ReelVideoPlayer';

interface RecommendationViewProps {
  topRecommendation: CandidateEvaluationResult;
  studentProfile: StudentInterestProfile;
  outputSpec: StandardOutputSpec;
  rejectedCandidates: CandidateEvaluationResult[];
  onBackToFeed: () => void;
  onFeedback: (action: 
    | { type: 'INTERESTED'; category: TechCategory }
    | { type: 'SAVE_TO_DECK'; reelId: string; category: TechCategory }
    | { type: 'NOT_RELEVANT'; reelId: string; category: TechCategory }
    | { type: 'SET_DIFFICULTY'; difficulty: DifficultyLevel }
  ) => void;
  feedbackNotification: string;
}

export const RecommendationView: React.FC<RecommendationViewProps> = ({
  topRecommendation,
  studentProfile,
  outputSpec,
  rejectedCandidates,
  onBackToFeed,
  onFeedback,
  feedbackNotification,
}) => {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState<boolean>(false);
  const [copiedSpec, setCopiedSpec] = useState<boolean>(false);

  const { candidate, scores } = topRecommendation;
  const hypeCandidate = rejectedCandidates.find(c => c.rejectionCategory === 'HYPE_RISK')?.candidate || rejectedCandidates[0]?.candidate;

  const handleInterested = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#10B981', '#38BDF8', '#6366F1'],
    });
    onFeedback({ type: 'INTERESTED', category: candidate.category });
  };

  const handleSave = () => {
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.75 },
      colors: ['#F59E0B', '#10B981', '#EC4899'],
    });
    onFeedback({ 
      type: 'SAVE_TO_DECK', 
      reelId: candidate.id, 
      category: candidate.category 
    });
  };

  const copySpec = () => {
    const text = `- CURRENT REEL: ${outputSpec.currentReel}
- INTEREST DETECTED: ${outputSpec.interestDetected}
- WHY: ${outputSpec.why}
- RECOMMENDED TECH REEL: ${outputSpec.recommendedTechReel}
- CATEGORY: ${outputSpec.category}
- WHY THIS RECOMMENDATION: ${outputSpec.whyThisRecommendation}
- DIFFICULTY: ${outputSpec.difficulty}
- CONFIDENCE: ${outputSpec.confidence}`;
    navigator.clipboard.writeText(text);
    setCopiedSpec(true);
    setTimeout(() => setCopiedSpec(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-2 animate-fadeIn">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <button
          onClick={onBackToFeed}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Reel Feed</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
            Confidence: High
          </span>
        </div>
      </div>

      {/* Main Title Transition Header */}
      <div className="text-center space-y-1.5">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
          ScrollWise Discovery
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          "So, What Should You Watch Next?"
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Connected to your broader interest in <b>Software Engineering & Technology</b> — expanding your knowledge into real production architecture.
        </p>
      </div>

      {/* Hero Recommendation Showcase (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Genuine Playable Recommendation Reel (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-5 border border-emerald-500/40 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
              RECOMMENDED FOR YOU
            </span>
            <div className="flex items-center gap-2 font-mono">
              <span className="px-2 py-0.5 rounded bg-slate-950 text-emerald-300 border border-emerald-500/30 font-bold">
                {candidate.category}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-950 text-indigo-300 border border-slate-700">
                {candidate.difficulty}
              </span>
            </div>
          </div>

          {/* Real Playable Video Reel */}
          <ReelVideoPlayer
            title={candidate.title}
            creator={candidate.creator}
            category={candidate.category}
            durationSeconds={candidate.durationSeconds}
            thumbnailUrl={candidate.thumbnailUrl}
            videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            transcriptExcerpt={candidate.description}
            archetype="High-Value Tech Recommendation"
            badgeText={`Difficulty: ${candidate.difficulty}`}
            isHero={true}
          />

          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug">
              {candidate.title}
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              By <span className="text-slate-200 font-semibold">{candidate.creator}</span>
            </span>
          </div>

          {/* Adaptive Feedback Buttons */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-[11px]">Tell us what you think:</span>
              <div className="flex items-center gap-1 font-mono text-[10px]">
                {(['Beginner', 'Intermediate', 'Advanced'] as DifficultyLevel[]).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => onFeedback({ type: 'SET_DIFFICULTY', difficulty: tier })}
                    className={`px-2 py-0.5 rounded transition-all ${
                      studentProfile.preferredDifficulty === tier
                        ? 'bg-indigo-500 text-white font-bold'
                        : 'text-slate-400 hover:text-slate-200 bg-slate-950'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleInterested}
                className="py-2.5 px-3 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 font-bold flex items-center justify-center gap-1.5 transition-all text-xs shadow cursor-pointer"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>Interested</span>
              </button>

              <button
                onClick={handleSave}
                className="py-2.5 px-3 rounded-xl bg-amber-950/70 hover:bg-amber-900/80 border border-amber-500/40 text-amber-300 font-bold flex items-center justify-center gap-1.5 transition-all text-xs shadow cursor-pointer"
              >
                <Bookmark className="h-4 w-4" />
                <span>Save</span>
              </button>

              <button
                onClick={() => onFeedback({ type: 'NOT_RELEVANT', reelId: candidate.id, category: candidate.category })}
                className="py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500/30 text-slate-400 hover:text-rose-300 font-medium flex items-center justify-center gap-1.5 transition-all text-xs cursor-pointer"
              >
                <ThumbsDown className="h-4 w-4" />
                <span>Not Relevant</span>
              </button>
            </div>

            {feedbackNotification && (
              <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/40 text-xs text-emerald-300 font-mono flex items-center gap-2 animate-fadeIn">
                <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>{feedbackNotification}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: WHY THIS & HYPE FILTER CONTRAST (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Box 1: Why This Recommendation? */}
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              WHY THIS?
            </span>
            
            <div className="space-y-2.5 text-xs text-slate-200 leading-relaxed">
              <p className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                "You interacted with programming memes, developer-career, and workstation hardware content."
              </p>
              <p className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                "Together, these interactions suggest that you're interested in <b>Software Engineering & Technology</b>."
              </p>
              <p className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200">
                "So instead of showing you another generic Java loop video, we found a high-value topic (<b>{candidate.title.split(':')[0]}</b>) that expands your learning into real production systems."
              </p>
            </div>
          </div>

          {/* Box 2: Hype Filter Disqualification Demonstration */}
          {hypeCandidate && (
            <div className="p-4 rounded-3xl bg-rose-950/20 border border-rose-900/40 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
                  HYPE FILTER IN ACTION
                </span>
                <span className="px-2 py-0.2 rounded text-[9px] font-mono bg-rose-950 text-rose-300 border border-rose-800">
                  REJECTED
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-rose-900/50 space-y-1.5">
                <h4 className="text-xs font-bold text-rose-200">
                  ❌ "{hypeCandidate.title}"
                </h4>
                <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                  <b>Reason:</b> High hype / unrealistic career promise ($200k in 24h) / low educational evidence.
                </p>
              </div>

              <p className="text-[10px] text-slate-400 font-sans italic">
                ScrollWise rejects sensationalism to protect the student's learning trajectory.
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Advanced Details Collapsible (For Technical Hackathon Judges) */}
      <div className="pt-2">
        <button
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          className="w-full p-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300 transition-all cursor-pointer"
        >
          <span>Technical Verification & 8-Field Output Spec</span>
          {showTechnicalDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showTechnicalDetails && (
          <div className="mt-3 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 animate-fadeIn font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-emerald-400 uppercase">
                Standard 8-Field Output Specification
              </span>
              <button
                onClick={copySpec}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-[11px] flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedSpec ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy Spec</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-[11px] leading-relaxed">
              <div><span className="text-emerald-400 font-bold">- CURRENT REEL: </span><span className="text-slate-200">{outputSpec.currentReel}</span></div>
              <div><span className="text-emerald-400 font-bold">- INTEREST DETECTED: </span><span className="text-indigo-300 font-semibold">{outputSpec.interestDetected}</span></div>
              <div><span className="text-emerald-400 font-bold">- WHY: </span><span className="text-slate-300">{outputSpec.why}</span></div>
              <div><span className="text-emerald-400 font-bold">- RECOMMENDED TECH REEL: </span><span className="text-emerald-300 font-bold">{outputSpec.recommendedTechReel}</span></div>
              <div><span className="text-emerald-400 font-bold">- CATEGORY: </span><span className="text-slate-200">{outputSpec.category}</span></div>
              <div><span className="text-emerald-400 font-bold">- WHY THIS RECOMMENDATION: </span><span className="text-slate-300">{outputSpec.whyThisRecommendation}</span></div>
              <div className="flex gap-4">
                <div><span className="text-emerald-400 font-bold">- DIFFICULTY: </span><span className="text-indigo-300">{outputSpec.difficulty}</span></div>
                <div><span className="text-emerald-400 font-bold">- CONFIDENCE: </span><span className="text-emerald-300">{outputSpec.confidence}</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
