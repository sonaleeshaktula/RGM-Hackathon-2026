import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Bookmark, 
  ChevronUp, 
  ChevronDown, 
  Compass, 
  Sparkles, 
  ShieldAlert, 
  Bot, 
  RotateCcw, 
  TrendingUp, 
  CheckCircle,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { InteractedReel, StudentInterestProfile, CandidateEvaluationResult, BehavioralTelemetry, StandardOutputSpec } from '../types';
import { ReelVideoPlayer } from './ReelVideoPlayer';
import { AskScrollwiseChatbot } from './AskScrollwiseChatbot';

interface ReelFeedExperienceProps {
  reels: InteractedReel[];
  studentProfile: StudentInterestProfile;
  topRecommendation: CandidateEvaluationResult;
  outputSpec: StandardOutputSpec;
  rejectedCandidates: CandidateEvaluationResult[];
  onUpdateTelemetry: (reelId: string, telemetry: Partial<BehavioralTelemetry>) => void;
  onOpenRecommendation: () => void;
  onOpenHypeFilter: () => void;
  onOpenHowItWorks: () => void;
}

export const ReelFeedExperience: React.FC<ReelFeedExperienceProps> = ({
  reels,
  studentProfile,
  topRecommendation,
  outputSpec,
  rejectedCandidates,
  onUpdateTelemetry,
  onOpenRecommendation,
  onOpenHypeFilter,
  onOpenHowItWorks,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showChatbot, setShowChatbot] = useState<boolean>(false);
  const [activeLikeAnimation, setActiveLikeAnimation] = useState<boolean>(false);
  const [activeSaveAnimation, setActiveSaveAnimation] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastScrollTime = useRef<number>(0);

  const currentReel = reels[currentIndex] || reels[0];

  // Dynamic calculation for the live interest bars
  const domainWeights = studentProfile.primaryInterests;
  const swScore = Math.min(100, Math.round(((domainWeights.find(d => d.domainId === 'domain_swe_arch')?.score || 0.45) * 100)));
  const aiScore = Math.min(100, Math.round(((domainWeights.find(d => d.domainId === 'domain_ai_ml')?.score || 0.30) * 100)));
  const dsaScore = Math.min(100, Math.round(((domainWeights.find(d => d.domainId === 'domain_dsa')?.score || 0.25) * 100)));
  const hwScore = Math.min(100, Math.round(((domainWeights.find(d => d.domainId === 'domain_hardware_systems')?.score || 0.20) * 100)));
  const careerScore = Math.min(100, Math.round(((domainWeights.find(d => d.domainId === 'domain_career_growth')?.score || 0.25) * 100)));
  const gamingScore = Math.min(100, Math.round(((domainWeights.find(d => d.domainId === 'domain_gaming')?.score || 0.15) * 100)));

  // Handle Next / Previous Reel Navigation
  const goToNextReel = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goToPrevReel = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'j') {
        goToNextReel();
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        goToPrevReel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, reels.length]);

  // Wheel scroll with throttle
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 450) return;

    if (e.deltaY > 30) {
      lastScrollTime.current = now;
      goToNextReel();
    } else if (e.deltaY < -30) {
      lastScrollTime.current = now;
      goToPrevReel();
    }
  };

  // Like Toggle
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextLiked = !currentReel.telemetry.isLiked;
    onUpdateTelemetry(currentReel.id, {
      isLiked: nextLiked,
      watchPercentage: nextLiked ? Math.max(90, currentReel.telemetry.watchPercentage) : currentReel.telemetry.watchPercentage,
    });

    if (nextLiked) {
      setActiveLikeAnimation(true);
      setTimeout(() => setActiveLikeAnimation(false), 800);
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.6 },
        colors: ['#F43F5E', '#FB7185', '#FDA4AF'],
      });
    }
  };

  // Save / Bookmark Toggle
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextSaved = !currentReel.telemetry.isSaved;
    onUpdateTelemetry(currentReel.id, {
      isSaved: nextSaved,
      watchPercentage: nextSaved ? Math.max(95, currentReel.telemetry.watchPercentage) : currentReel.telemetry.watchPercentage,
    });

    if (nextSaved) {
      setActiveSaveAnimation(true);
      setTimeout(() => setActiveSaveAnimation(false), 800);
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#FBBF24', '#FDE68A'],
      });
    }
  };

  return (
    <div 
      onWheel={handleWheel}
      ref={containerRef}
      className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start py-2 select-none"
    >
      {/* ========================================================================= */}
      {/* LEFT COLUMN: THE IMMERSIVE VERTICAL REEL FEED (7 Cols)                    */}
      {/* ========================================================================= */}
      <div className="lg:col-span-7 flex flex-col items-center space-y-4">
        
        {/* Reel Container Card */}
        <div className="relative w-full max-w-md bg-slate-900 rounded-3xl p-4 border border-slate-800 shadow-2xl overflow-hidden">
          
          {/* Reel Header Info */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80 mb-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-950 text-emerald-400 border border-slate-700">
                {currentReel.archetype}
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                {currentIndex + 1} of {reels.length}
              </span>
            </div>

            {/* Quick Up/Down Buttons */}
            <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={goToPrevReel}
                disabled={currentIndex === 0}
                className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 transition-all cursor-pointer"
                title="Previous Reel (Up Arrow)"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                onClick={goToNextReel}
                disabled={currentIndex === reels.length - 1}
                className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 transition-all cursor-pointer"
                title="Next Reel (Down Arrow)"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Genuine Playable Video Player */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <ReelVideoPlayer
              title={currentReel.title}
              creator={currentReel.creator}
              category={currentReel.category}
              durationSeconds={currentReel.telemetry.durationSeconds}
              thumbnailUrl={currentReel.thumbnailUrl}
              videoUrl={currentReel.videoSimUrl}
              transcriptExcerpt={currentReel.transcriptExcerpt}
              archetype={currentReel.archetype}
              badgeText={`Watch: ${currentReel.telemetry.watchPercentage}%`}
              isHero={true}
            />

            {/* Like Floating Animation */}
            {activeLikeAnimation && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-ping">
                <Heart className="h-20 w-20 text-rose-500 fill-rose-500 opacity-90 drop-shadow-2xl" />
              </div>
            )}
          </div>

          {/* Reel Caption & Creator */}
          <div className="pt-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200 truncate max-w-[260px]">
                {currentReel.title}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {currentReel.creator}
              </span>
            </div>

            {/* Micro Transcript Excerpt */}
            <p className="text-[11px] text-slate-400 font-mono line-clamp-2 leading-relaxed">
              "{currentReel.transcriptExcerpt}"
            </p>
          </div>

          {/* Bottom Feed Interactive Controls (Like, Bookmark, Next) */}
          <div className="pt-3 mt-2 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  currentReel.telemetry.isLiked
                    ? 'bg-rose-950/80 border-rose-500/50 text-rose-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-rose-300 hover:border-slate-700'
                }`}
              >
                <Heart className={`h-4 w-4 ${currentReel.telemetry.isLiked ? 'fill-rose-400' : ''}`} />
                <span>{currentReel.telemetry.isLiked ? 'Liked' : 'Like'}</span>
              </button>

              <button
                onClick={handleSave}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  currentReel.telemetry.isSaved
                    ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-amber-300 hover:border-slate-700'
                }`}
              >
                <Bookmark className={`h-4 w-4 ${currentReel.telemetry.isSaved ? 'fill-amber-400' : ''}`} />
                <span>{currentReel.telemetry.isSaved ? 'Saved' : 'Save'}</span>
              </button>
            </div>

            {/* Next Reel Indicator */}
            <button
              onClick={goToNextReel}
              disabled={currentIndex === reels.length - 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 text-xs font-bold transition-all cursor-pointer"
            >
              <span>Next</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Big Recommendation Banner Trigger */}
        <div 
          onClick={onOpenRecommendation}
          className="w-full max-w-md p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 border border-emerald-500/50 shadow-xl hover:border-emerald-400 transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
              ✨ Ready For You
            </span>
            <h4 className="text-sm font-extrabold text-white group-hover:text-emerald-300 transition-colors">
              "So, What Should You Watch Next?"
            </h4>
            <span className="text-[11px] text-slate-300 block">
              See high-value tech recommendation →
            </span>
          </div>

          <div className="h-10 w-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT COLUMN: LIVE INTEREST TRACKING & INFERENCE ENGINE (5 Cols)          */}
      {/* ========================================================================= */}
      <div className="lg:col-span-5 space-y-4">
        
        {/* PANEL 1: LIVE INTEREST TRACKING (Horizontal Bar Graph) */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                YOUR LEARNING INTERESTS
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              Live Real-Time
            </span>
          </div>

          {/* Smoothly Animated Live Bars */}
          <div className="space-y-2.5 text-xs font-mono">
            {/* Software Engineering */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-200 font-semibold">💻 Software Engineering</span>
                <span className="text-emerald-400 font-bold">{swScore}%</span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${swScore}%` }}
                />
              </div>
            </div>

            {/* AI & Machine Learning */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-200 font-semibold">🤖 AI & Machine Learning</span>
                <span className="text-indigo-400 font-bold">{aiScore}%</span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-400 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${aiScore}%` }}
                />
              </div>
            </div>

            {/* Data Structures & Coding */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-200 font-semibold">⚡ DSA & Problem Solving</span>
                <span className="text-cyan-400 font-bold">{dsaScore}%</span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${dsaScore}%` }}
                />
              </div>
            </div>

            {/* Hardware & Systems */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-200 font-semibold">📱 Gadgets & Hardware</span>
                <span className="text-amber-400 font-bold">{hwScore}%</span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${hwScore}%` }}
                />
              </div>
            </div>

            {/* Career & Lifestyle */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-200 font-semibold">🎯 Career & Industry</span>
                <span className="text-teal-400 font-bold">{careerScore}%</span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${careerScore}%` }}
                />
              </div>
            </div>

            {/* Gaming & Casual */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">🎮 Gaming & Casual</span>
                <span className="text-slate-400 font-bold">{gamingScore}%</span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-slate-600 to-slate-500 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${gamingScore}%` }}
                />
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 font-mono pt-1">
            * ScrollWise continuously adapts as you like, save, or dwell on reels.
          </p>
        </div>

        {/* PANEL 2: BEHAVIOR -> INTEREST INFERENCE (THE BUILT-IN TRAP VISUALIZED) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/30 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
              BEHAVIOR → INTEREST INFERENCE
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Trap Avoidance
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px] text-slate-300">
              <div className="p-1.5 rounded bg-slate-950 border border-slate-800">☕ Java Meme</div>
              <div className="p-1.5 rounded bg-slate-950 border border-slate-800">💼 SWE Lifestyle</div>
              <div className="p-1.5 rounded bg-slate-950 border border-slate-800">🌳 Coding Interview</div>
              <div className="p-1.5 rounded bg-slate-950 border border-slate-800">💻 Laptop Benchmark</div>
            </div>

            <div className="text-center py-1 text-emerald-400 font-bold text-[10px] font-mono tracking-wider">
              ↓ WE FOUND A BROADER INTEREST ↓
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center">
              <span className="text-xs font-black text-white block">
                💻 SOFTWARE ENGINEERING & TECHNOLOGY
              </span>
              <span className="text-[10px] text-emerald-300 font-mono block mt-0.5">
                (Avoided shallow Java loop keyword lock-in)
              </span>
            </div>
          </div>
        </div>

        {/* PANEL 3: ASK SCROLLWISE ASSISTANT LAUNCHER */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-emerald-400" />
              <h4 className="text-xs font-bold text-white font-mono">
                ASK SCROLLWISE
              </h4>
            </div>
            <button
              onClick={() => setShowChatbot(!showChatbot)}
              className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all cursor-pointer"
            >
              {showChatbot ? 'Hide Chat' : 'Open Assistant'}
            </button>
          </div>

          {/* Embedded Chatbot Drawer */}
          {showChatbot && (
            <AskScrollwiseChatbot
              studentProfile={studentProfile}
              topRecommendation={topRecommendation}
              interactedReels={reels}
              rejectedCandidates={rejectedCandidates}
              onClose={() => setShowChatbot(false)}
            />
          )}
        </div>

      </div>
    </div>
  );
};
