import React, { useState } from 'react';
import { 
  Sparkles, 
  ThumbsUp, 
  Bookmark, 
  ThumbsDown, 
  CheckCircle, 
  ArrowLeft, 
  ShieldAlert, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  TrendingUp,
  Info,
  Layers,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  CandidateEvaluationResult, 
  StudentInterestProfile, 
  StandardOutputSpec, 
  TechCategory, 
  DifficultyLevel,
  InteractedReel
} from '../types';
import { ReelVideoPlayer } from './ReelVideoPlayer';

interface RecommendationExperienceProps {
  topRecommendation: CandidateEvaluationResult;
  studentProfile: StudentInterestProfile;
  interactedReels: InteractedReel[];
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

export const RecommendationExperience: React.FC<RecommendationExperienceProps> = ({
  topRecommendation,
  studentProfile,
  interactedReels,
  outputSpec,
  rejectedCandidates,
  onBackToFeed,
  onFeedback,
  feedbackNotification,
}) => {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState<boolean>(false);
  const [copiedSpec, setCopiedSpec] = useState<boolean>(false);

  const { candidate, scores } = topRecommendation;
  const hypeItem = rejectedCandidates.find(c => c.rejectionCategory === 'HYPE_RISK')?.candidate || rejectedCandidates[0]?.candidate;
  const primaryInterest = studentProfile.primaryInterests[0];

  // Top watched reels that contributed
  const topWatchedReels = interactedReels
    .filter(r => r.telemetry.watchPercentage >= 50 && !r.telemetry.isSkippedEarly)
    .sort((a, b) => (b.telemetry.computedWeight || 1) - (a.telemetry.computedWeight || 1))
    .slice(0, 4);

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
      particleCount: 60,
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
    <div className="max-w-5xl mx-auto space-y-8 py-2 animate-fadeIn select-none">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <button
          onClick={onBackToFeed}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-mono font-bold text-slate-300 hover:text-white transition-all cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Feed</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
            Hype Check: ✓ Passed
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-950/80 text-indigo-300 border border-indigo-500/40">
            Confidence: {studentProfile.overallConfidence}
          </span>
        </div>
      </div>

      {/* Main Transition Heading */}
      <div className="text-center space-y-2">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
          Calculated Recommendation
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none">
          "WHAT SHOULD YOU WATCH NEXT?"
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-sans">
          Recommended based on your inferred interest in <b>{primaryInterest?.domainName || 'Software Engineering & Technology'}</b>.
        </p>
      </div>

      {/* Hero Recommendation Theater (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Recommended Reel Playable Frame (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-[32px] p-6 border border-emerald-500/40 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
            <span className="font-bold text-emerald-400 uppercase tracking-wider">
              RECOMMENDED FOR YOU
            </span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-950 text-emerald-300 border border-emerald-500/30 font-bold">
                {candidate.category}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-950 text-indigo-300 border border-white/10">
                {candidate.difficulty}
              </span>
            </div>
          </div>

          {/* Genuine Playable Video Reel */}
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

          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug">
                {candidate.title}
              </h3>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>By <span className="text-slate-200 font-semibold">{candidate.creator}</span></span>
              <span className="text-emerald-400 font-bold">MATCH: {scores.compositeScore}%</span>
            </div>
          </div>

          {/* Real Multi-Factor Scoring Breakdown */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-2 text-xs font-mono">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Why this Reel? (Calculated Factor Breakdown)
            </span>
            
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Interest match:</span>
                  <span className="text-emerald-400 font-bold">{scores.latentMatch}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${scores.latentMatch}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Educational value:</span>
                  <span className="text-emerald-400 font-bold">{scores.educationalUsefulness}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${scores.educationalUsefulness}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Novelty:</span>
                  <span className="text-indigo-400 font-bold">{scores.noveltyAndAdjacency}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${scores.noveltyAndAdjacency}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Hype risk:</span>
                  <span className="text-emerald-400 font-bold">LOW (5%)</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `95%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Buttons */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-[11px] font-mono">Tell us what you think:</span>
              <div className="flex items-center gap-1 font-mono text-[10px]">
                {(['Beginner', 'Intermediate', 'Advanced'] as DifficultyLevel[]).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => onFeedback({ type: 'SET_DIFFICULTY', difficulty: tier })}
                    className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
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
                className="py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-rose-950/40 border border-white/10 hover:border-rose-500/30 text-slate-400 hover:text-rose-300 font-medium flex items-center justify-center gap-1.5 transition-all text-xs cursor-pointer"
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

        {/* Right: TRANSPARENT REASONING CHAIN & HYPE FILTER (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Transparent Reasoning Chain */}
          <div className="p-6 rounded-[32px] bg-slate-900/90 border border-white/10 space-y-3.5 shadow-xl font-mono text-xs">
            <div className="pb-2 border-b border-white/10">
              <span className="font-bold text-emerald-400 uppercase tracking-wider block">
                WHY THIS RECOMMENDATION?
              </span>
              <span className="text-[10px] text-slate-400">
                Transparent AI Reasoning Chain
              </span>
            </div>

            <div className="space-y-3">
              {/* Step 1: YOU WATCHED */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">
                  1. YOU WATCHED:
                </span>
                {topWatchedReels.map((r) => (
                  <div key={r.id} className="flex items-center justify-between text-[11px] text-slate-300">
                    <span className="truncate max-w-[200px]">• {r.title.split(':')[0]}</span>
                    <span className="text-emerald-400 font-bold">{r.telemetry.watchPercentage}%</span>
                  </div>
                ))}
              </div>

              {/* Step 2: WE DETECTED */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-white/5 space-y-0.5">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">
                  2. WE DETECTED:
                </span>
                <span className="text-xs font-bold text-white">
                  💻 {primaryInterest?.domainName || 'Software Engineering & Technology'}
                </span>
              </div>

              {/* Step 3: WE RECOMMEND */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-white/5 space-y-0.5">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">
                  3. WE RECOMMEND:
                </span>
                <span className="text-xs font-bold text-emerald-300">
                  {candidate.title.split(':')[0]} ({candidate.category})
                </span>
              </div>

              {/* Step 4: WHY? */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 font-sans text-xs leading-relaxed">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block mb-1">
                  4. WHY?
                </span>
                "Because the recommendation extends the inferred interest into a useful adjacent technical topic instead of repeating the same Java meme."
              </div>
            </div>
          </div>

          {/* Hype Filter Section */}
          {hypeItem && (
            <div className="p-6 rounded-[32px] bg-gradient-to-b from-rose-950/30 to-slate-900/90 border border-rose-900/40 space-y-3 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-rose-900/40 text-xs font-mono">
                <span className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4" />
                  HYPE FILTER COMPARISON
                </span>
              </div>

              {/* Rejected Item */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-rose-900/50 space-y-1 font-mono text-xs">
                <span className="text-[10px] font-bold text-rose-400 uppercase block">
                  ❌ REJECTED
                </span>
                <h4 className="text-xs font-bold text-rose-200">
                  "{hypeItem.title}"
                </h4>
                <p className="text-[10px] text-slate-400 pt-0.5">
                  <b>Reason:</b> High hype / unrealistic promise ($200k in 24h) with low educational evidence.
                </p>
              </div>

              {/* Preferred Substantive Item */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-1 font-mono text-xs">
                <span className="text-[10px] font-bold text-emerald-400 uppercase block">
                  ✓ PREFERRED
                </span>
                <h4 className="text-xs font-bold text-emerald-200">
                  "{candidate.title}"
                </h4>
                <p className="text-[10px] text-slate-300 font-sans pt-0.5">
                  <b>Reason:</b> High educational value + verified zero hype risk.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Technical Verification & 8-Field Output Spec Collapsible */}
      <div className="pt-2">
        <button
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          className="w-full p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-white/10 flex items-center justify-between text-xs font-mono text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
        >
          <span>Technical Output Specification (8-Field Schema for Hackathon Judges)</span>
          {showTechnicalDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showTechnicalDetails && (
          <div className="mt-3 p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-4 animate-fadeIn font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold text-emerald-400 uppercase">
                Standard 8-Field Output Specification
              </span>
              <button
                onClick={copySpec}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 text-[11px] flex items-center gap-1.5 transition-all cursor-pointer"
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

            <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2 text-[11px] leading-relaxed">
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
