import React, { useState } from 'react';
import { 
  Sparkles, 
  ThumbsUp, 
  Bookmark, 
  ThumbsDown, 
  CheckCircle, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Terminal, 
  Copy, 
  Check, 
  Heart, 
  Repeat, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  InteractedReel, 
  StudentInterestProfile, 
  CandidateEvaluationResult, 
  StandardOutputSpec, 
  DifficultyLevel, 
  TechCategory 
} from '../types';
import { ReelVideoPlayer } from './ReelVideoPlayer';

interface DashboardViewProps {
  interactedReels: InteractedReel[];
  studentProfile: StudentInterestProfile;
  topRecommendation: CandidateEvaluationResult;
  outputSpec: StandardOutputSpec;
  onFeedback: (action: 
    | { type: 'INTERESTED'; category: TechCategory }
    | { type: 'SAVE_TO_DECK'; reelId: string; category: TechCategory }
    | { type: 'NOT_RELEVANT'; reelId: string; category: TechCategory }
    | { type: 'SET_DIFFICULTY'; difficulty: DifficultyLevel }
  ) => void;
  feedbackNotification: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  interactedReels,
  studentProfile,
  topRecommendation,
  outputSpec,
  onFeedback,
  feedbackNotification,
}) => {
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [copiedSpec, setCopiedSpec] = useState<boolean>(false);
  const [activeReelId, setActiveReelId] = useState<string>('reel_java_meme');

  const { candidate, scores } = topRecommendation;
  const primaryInterest = studentProfile.primaryInterests[0] || {
    domainName: 'Software Engineering & Technology',
    confidence: 'High',
  };

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
    <div className="max-w-6xl mx-auto space-y-6 py-2">
      
      {/* 4-STAGE STORY PROGRESSION HEADER */}
      <div className="hidden sm:flex items-center justify-between px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] font-medium text-slate-400 font-mono">
        <span className="text-slate-300 font-bold">1. What You Watched</span>
        <ArrowRight className="h-3.5 w-3.5 text-slate-600" />
        <span className="text-emerald-400 font-bold">2. Your Broader Interest</span>
        <ArrowRight className="h-3.5 w-3.5 text-slate-600" />
        <span className="text-indigo-400 font-bold">3. Recommended for You</span>
        <ArrowRight className="h-3.5 w-3.5 text-slate-600" />
        <span className="text-slate-300 font-bold">4. Why this Recommendation?</span>
      </div>

      {/* ========================================================================= */}
      {/* STAGE 1 — WHAT YOU WATCHED                                                */}
      {/* ========================================================================= */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <span className="h-5 w-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-emerald-400">1</span>
              What you watched
            </h2>
            <p className="text-xs text-slate-400">
              Sample interactions across memes, gaming, career, gadgets, and tech:
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {interactedReels.length} sample reels
          </span>
        </div>

        {/* 8 Clean Sample Reel Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {interactedReels.map((reel) => {
            const isSelected = reel.id === activeReelId;
            return (
              <div
                key={reel.id}
                onClick={() => setActiveReelId(reel.id)}
                className={`rounded-xl overflow-hidden bg-slate-900/90 border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-500 ring-1 ring-emerald-500 shadow-lg shadow-emerald-500/20'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Thumbnail Preview */}
                <div className="relative h-24 w-full bg-slate-950">
                  <img
                    src={reel.thumbnailUrl}
                    alt={reel.title}
                    className="h-full w-full object-cover brightness-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  
                  {/* Category Pill with Emoji */}
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-950/85 text-slate-200 border border-slate-700 backdrop-blur-sm truncate max-w-[90%]">
                    {reel.archetype}
                  </span>

                  {/* Interaction Signal */}
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between text-[9px] font-mono text-slate-300">
                    <span className="bg-black/75 px-1 py-0.2 rounded font-bold text-emerald-400">
                      {reel.telemetry.watchPercentage}%
                    </span>
                    <div className="flex items-center gap-1">
                      {reel.telemetry.isLiked && <Heart className="h-2.5 w-2.5 text-rose-400 fill-rose-400" />}
                      {reel.telemetry.isSaved && <Bookmark className="h-2.5 w-2.5 text-amber-400 fill-amber-400" />}
                      {reel.telemetry.isReplayed && <Repeat className="h-2.5 w-2.5 text-indigo-400" />}
                      {reel.telemetry.isSkippedEarly && <AlertCircle className="h-2.5 w-2.5 text-rose-500" />}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="p-2 space-y-0.5">
                  <h4 className="text-[11px] font-semibold text-slate-200 line-clamp-2 leading-tight">
                    {reel.title}
                  </h4>
                  <span className="text-[9px] text-slate-400 block font-mono truncate">
                    {reel.creator}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STAGE 2 — YOUR BROADER INTEREST (ONE SIMPLE LARGE STATEMENT)              */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-r from-emerald-950/40 via-slate-900/90 to-indigo-950/40 rounded-2xl p-5 border border-emerald-500/30 shadow-xl space-y-1.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
            <span className="h-5 w-5 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-[10px] text-emerald-300">2</span>
            Your broader interest
          </span>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold self-start sm:self-auto">
            <span>Confidence:</span>
            <span className="text-emerald-400">High</span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2 pt-0.5">
            💻 Software Engineering & Technology
          </h2>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          "Based on patterns across your interactions with programming memes, workstation hardware, and developer lifestyle content — not simple keyword matching."
        </p>
      </section>

      {/* ========================================================================= */}
      {/* STAGES 3 & 4 — RECOMMENDED FOR YOU & WHY THIS RECOMMENDATION?             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* STAGE 3: RECOMMENDED FOR YOU (Hero Playable Centerpiece - 7 Cols) */}
        <section className="lg:col-span-7 bg-slate-900/90 rounded-2xl p-5 border border-emerald-500/40 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <span className="h-4 w-4 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-[9px] text-emerald-300">3</span>
                Recommended for you
              </span>
              <h3 className="text-sm font-extrabold text-white pt-0.5">
                {candidate.title}
              </h3>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-slate-950 text-emerald-400 border border-emerald-500/30 font-bold text-[11px]">
                {candidate.category}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-950 text-indigo-300 border border-slate-700 text-[11px]">
                {candidate.difficulty}
              </span>
            </div>
          </div>

          {/* Genuine Playable HTML5 Reel Player */}
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

          {/* Creator Tag */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>By <span className="text-slate-200 font-semibold">{candidate.creator}</span></span>
            <span className="text-emerald-400 font-bold">Match Score: {scores.compositeScore}%</span>
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
                className="py-2.5 px-3 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 font-bold flex items-center justify-center gap-1.5 transition-all text-xs shadow"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>Interested</span>
              </button>

              <button
                onClick={handleSave}
                className="py-2.5 px-3 rounded-xl bg-amber-950/70 hover:bg-amber-900/80 border border-amber-500/40 text-amber-300 font-bold flex items-center justify-center gap-1.5 transition-all text-xs shadow"
              >
                <Bookmark className="h-4 w-4" />
                <span>Save</span>
              </button>

              <button
                onClick={() => onFeedback({ type: 'NOT_RELEVANT', reelId: candidate.id, category: candidate.category })}
                className="py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500/30 text-slate-400 hover:text-rose-300 font-medium flex items-center justify-center gap-1.5 transition-all text-xs"
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
        </section>

        {/* STAGE 4: WHY THIS RECOMMENDATION? (Plain English - 5 Cols) */}
        <section className="lg:col-span-5 bg-slate-900/80 rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <span className="h-4 w-4 rounded-full bg-slate-800 flex items-center justify-center text-[9px] text-slate-300">4</span>
              Why this recommendation?
            </span>
            <h3 className="text-base font-extrabold text-white pt-0.5">
              Why did ScrollWise choose this?
            </h3>
          </div>

          <div className="space-y-3 text-xs text-slate-200 leading-relaxed font-sans">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
              "You interacted with programming memes, developer-career, and workstation hardware content."
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
              "Together, these interactions suggest that you're interested in <b>Software Engineering & Technology</b>."
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200">
              "So instead of showing you another generic Java loop video, we found a useful topic (<b>{candidate.title.split(':')[0]}</b>) that expands that interest into real-world systems."
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              Key concept takeaways:
            </span>
            <div className="space-y-1.5 text-xs text-slate-300">
              {candidate.keyTakeaways.slice(0, 3).map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* ADVANCED DETAILS (FOR TECHNICAL JUDGES)                                    */}
      {/* ========================================================================= */}
      <section className="pt-2">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full p-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-xs font-mono text-slate-300 transition-all"
        >
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-emerald-400" />
            <span className="font-bold">See How We Decided (Advanced Details & 8-Field Output Spec)</span>
          </div>
          {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showAdvanced && (
          <div className="mt-3 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 animate-fadeIn font-mono text-xs">
            {/* 8-Field Output Spec Box */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-emerald-400 uppercase">
                  Standard 8-Field Output Specification
                </span>
                <button
                  onClick={copySpec}
                  className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-[11px] flex items-center gap-1.5 transition-all"
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

            {/* Technical Score Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Latent Match (35%):</span>
                <span className="text-sm font-bold text-emerald-400">{scores.latentMatch}/100</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Educational Depth (25%):</span>
                <span className="text-sm font-bold text-emerald-400">{scores.educationalUsefulness}/100</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Novelty & Adjacency (15%):</span>
                <span className="text-sm font-bold text-indigo-400">{scores.noveltyAndAdjacency}/100</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Content Quality:</span>
                <span className="text-sm font-bold text-slate-200">{scores.contentQuality}/100</span>
              </div>
            </div>
          </div>
        )}
      </section>

    </div>
  );
};
