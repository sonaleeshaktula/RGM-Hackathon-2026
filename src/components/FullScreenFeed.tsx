import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Bookmark, 
  ChevronUp, 
  ChevronDown, 
  Volume2, 
  VolumeX, 
  Play, 
  Sparkles, 
  ArrowRight,
  Bot,
  Info,
  RotateCcw,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { InteractedReel, StudentInterestProfile, BehavioralTelemetry } from '../types';

interface FullScreenFeedProps {
  reels: InteractedReel[];
  studentProfile: StudentInterestProfile;
  onUpdateTelemetry: (reelId: string, telemetry: Partial<BehavioralTelemetry>) => void;
  onSimulateTrapDemo?: () => void;
  onResetSession?: () => void;
  onDiscoverPattern: () => void;
  onOpenChat: () => void;
}

export const FullScreenFeed: React.FC<FullScreenFeedProps> = ({
  reels,
  studentProfile,
  onUpdateTelemetry,
  onSimulateTrapDemo,
  onResetSession,
  onDiscoverPattern,
  onOpenChat,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeLikeAnimation, setActiveLikeAnimation] = useState<boolean>(false);
  const [activeSaveAnimation, setActiveSaveAnimation] = useState<boolean>(false);
  const [useCanvasFallback, setUseCanvasFallback] = useState<boolean>(false);
  const [expandedDomainId, setExpandedDomainId] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastScrollTime = useRef<number>(0);

  const currentReel = reels[currentIndex] || reels[0];
  const totalInteractions = studentProfile.totalInteractionsAnalyzed;

  // Reset video state when reel index changes
  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => setUseCanvasFallback(true));
    }
  }, [currentIndex]);

  // Video Time Update & Watch Percentage Accumulator
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      setCurrentTime(cur);
      const totalDur = currentReel.telemetry.durationSeconds || 15;
      const pct = Math.min(100, Math.round((cur / totalDur) * 100));
      if (pct > currentReel.telemetry.watchPercentage) {
        onUpdateTelemetry(currentReel.id, {
          watchPercentage: pct,
          timeSpentSeconds: cur,
        });
      }
    }
  };

  // Canvas animation loop fallback
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let frame = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev >= 15 ? 0 : prev + 0.25;
        const pct = Math.min(100, Math.round((next / 15) * 100));
        if (pct > currentReel.telemetry.watchPercentage) {
          onUpdateTelemetry(currentReel.id, {
            watchPercentage: pct,
            timeSpentSeconds: next,
          });
        }
        return next;
      });
    }, 250);

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = '11px monospace';
      ctx.fillStyle = 'rgba(16, 185, 129, 0.75)';
      ctx.fillText(`// Reel: ${currentReel.archetype}`, 16, 32);

      // Soundwave Spectrum
      const bars = 18;
      const barWidth = canvas.width / bars;
      ctx.fillStyle = 'rgba(56, 189, 248, 0.5)';
      for (let i = 0; i < bars; i++) {
        const h = Math.sin(frame * 0.15 + i * 0.4) * 12 + 14;
        ctx.fillRect(i * barWidth + 2, canvas.height - h - 30, barWidth - 4, h);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      clearInterval(interval);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, currentReel]);

  // Next / Previous Reel Navigation
  const goToNextReel = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToPrevReel = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'j') {
        goToNextReel();
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        goToPrevReel();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, reels.length, isPlaying]);

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

  // Play / Pause Toggle
  const togglePlay = () => {
    if (videoRef.current && !useCanvasFallback) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setUseCanvasFallback(true));
      }
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  // Like Toggle (Strong Signal)
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextLiked = !currentReel.telemetry.isLiked;
    onUpdateTelemetry(currentReel.id, {
      isLiked: nextLiked,
      watchPercentage: nextLiked ? Math.max(90, currentReel.telemetry.watchPercentage) : currentReel.telemetry.watchPercentage,
    });

    if (nextLiked) {
      setActiveLikeAnimation(true);
      setTimeout(() => setActiveLikeAnimation(false), 700);
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#F43F5E', '#FB7185', '#FDA4AF'],
      });
    }
  };

  // Save Toggle (Very Strong Signal)
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextSaved = !currentReel.telemetry.isSaved;
    onUpdateTelemetry(currentReel.id, {
      isSaved: nextSaved,
      watchPercentage: nextSaved ? Math.max(95, currentReel.telemetry.watchPercentage) : currentReel.telemetry.watchPercentage,
    });

    if (nextSaved) {
      setActiveSaveAnimation(true);
      setTimeout(() => setActiveSaveAnimation(false), 700);
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#FBBF24', '#FDE68A'],
      });
    }
  };

  const progressPercent = Math.min(100, (currentTime / (currentReel.telemetry.durationSeconds || 15)) * 100);

  return (
    <div 
      onWheel={handleWheel}
      className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center py-1 select-none"
    >
      {/* ========================================================================= */}
      {/* LEFT: COMPACT VERTICAL REEL FEED THEATER (FITS ON ANY SCREEN) (7 COLS)   */}
      {/* ========================================================================= */}
      <div className="lg:col-span-7 flex flex-col items-center">
        
        {/* Sample Dataset Top Bar */}
        <div className="w-full max-w-[380px] sm:max-w-[400px] flex items-center justify-between pb-1.5 px-1 text-[11px] font-mono text-slate-400">
          <span>Sample Reels Feed</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Session
          </span>
        </div>

        {/* The Reel Card Frame - Scaled to fit viewport cleanly */}
        <div className="relative w-full max-w-[380px] sm:max-w-[400px] h-[520px] sm:h-[550px] bg-slate-950 rounded-[28px] overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] ring-1 ring-white/5 flex flex-col justify-between">
          
          {/* Top Floating Badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-950/85 text-emerald-400 border border-emerald-500/30 backdrop-blur-md shadow-lg">
              {currentReel.archetype}
            </span>

            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-slate-950/85 text-slate-300 border border-white/10 backdrop-blur-md">
              <span className="text-emerald-400 font-bold">{Math.floor(currentTime)}s</span>
              <span>/</span>
              <span>{currentReel.telemetry.durationSeconds || 15}s</span>
            </div>
          </div>

          {/* Video / Canvas Playable Body */}
          <div 
            onClick={togglePlay}
            className="absolute inset-0 w-full h-full cursor-pointer group"
          >
            {currentReel.videoSimUrl && !useCanvasFallback ? (
              <video
                ref={videoRef}
                src={currentReel.videoSimUrl}
                poster={currentReel.thumbnailUrl}
                playsInline
                loop
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onError={() => setUseCanvasFallback(true)}
                className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition-all duration-300"
              />
            ) : (
              <img
                src={currentReel.thumbnailUrl}
                alt={currentReel.title}
                className="w-full h-full object-cover brightness-85 group-hover:brightness-95 transition-all"
              />
            )}

            {/* Canvas Fallback */}
            <canvas
              ref={canvasRef}
              width={400}
              height={550}
              className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 ${
                isPlaying && useCanvasFallback ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />

            {/* Pause Overlay Indicator */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="h-14 w-14 rounded-full bg-slate-950/80 border border-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-2xl">
                  <Play className="h-7 w-7 ml-1 fill-white" />
                </div>
              </div>
            )}

            {/* Like Burst Effect */}
            {activeLikeAnimation && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-ping">
                <Heart className="h-20 w-20 text-rose-500 fill-rose-500 opacity-90 drop-shadow-2xl" />
              </div>
            )}
          </div>

          {/* Right Action Icons (Like, Bookmark, Mute) */}
          <div className="absolute right-3.5 bottom-20 z-20 flex flex-col items-center gap-2.5">
            <button
              onClick={handleLike}
              className={`h-10 w-10 sm:h-11 sm:w-11 rounded-full flex flex-col items-center justify-center transition-all shadow-xl cursor-pointer ${
                currentReel.telemetry.isLiked
                  ? 'bg-rose-500 text-white scale-110'
                  : 'bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-white backdrop-blur-md'
              }`}
              title="Like Reel (Strong Positive Signal)"
            >
              <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${currentReel.telemetry.isLiked ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={handleSave}
              className={`h-10 w-10 sm:h-11 sm:w-11 rounded-full flex flex-col items-center justify-center transition-all shadow-xl cursor-pointer ${
                currentReel.telemetry.isSaved
                  ? 'bg-amber-500 text-slate-950 scale-110 font-bold'
                  : 'bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-white backdrop-blur-md'
              }`}
              title="Save Reel (Very Strong Positive Signal)"
            >
              <Bookmark className={`h-4 w-4 sm:h-5 sm:w-5 ${currentReel.telemetry.isSaved ? 'fill-slate-950' : ''}`} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
                if (videoRef.current) videoRef.current.muted = !isMuted;
              }}
              className="h-9 w-9 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-white flex items-center justify-center backdrop-blur-md shadow-xl transition-all cursor-pointer"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="h-4 w-4 text-slate-400" /> : <Volume2 className="h-4 w-4 text-emerald-400" />}
            </button>
          </div>

          {/* Bottom Captions & Title */}
          <div className="relative z-20 p-4 space-y-1.5 pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-emerald-400 drop-shadow">
                {currentReel.creator}
              </span>
              <span className="text-[10px] text-slate-300 font-mono bg-black/70 px-1.5 py-0.5 rounded backdrop-blur-sm">
                Watch: {currentReel.telemetry.watchPercentage}%
              </span>
            </div>

            <h3 className="text-sm font-extrabold text-white leading-snug drop-shadow-md pr-10">
              {currentReel.title}
            </h3>

            <p className="text-[11px] text-slate-300 font-mono line-clamp-2 drop-shadow pr-10 leading-snug">
              "{currentReel.transcriptExcerpt}"
            </p>

            {/* Progress Bar */}
            <div className="pt-1.5">
              <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-200 ease-linear rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Up / Down Controls */}
        <div className="w-full max-w-[380px] sm:max-w-[400px] flex items-center justify-between pt-2 px-1">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="text-white font-bold">{currentIndex + 1}</span> of <span>{reels.length} Reels</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevReel}
              disabled={currentIndex === 0}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 border border-white/10 text-white transition-all cursor-pointer flex items-center gap-1 text-xs font-mono font-bold"
              title="Previous Reel (Up Arrow)"
            >
              <ChevronUp className="h-4 w-4" />
              <span>Prev</span>
            </button>

            <button
              onClick={goToNextReel}
              disabled={currentIndex === reels.length - 1}
              className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 text-slate-950 transition-all cursor-pointer flex items-center gap-1 text-xs font-mono font-black"
              title="Next Reel (Down Arrow)"
            >
              <span>Next</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* RIGHT: PROGRESSIVE LIVE INTEREST INFERENCE PANEL (5 COLS)                 */}
      {/* ========================================================================= */}
      <div className="lg:col-span-5 space-y-3.5">
        
        {/* PANEL: WHAT SCROLLWISE HAS LEARNED */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl space-y-3.5 backdrop-blur-xl">
          <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className={`h-2.5 w-2.5 rounded-full ${totalInteractions > 0 ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                WHAT SCROLLWISE HAS LEARNED
              </h3>
            </div>
            
            <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
              totalInteractions === 0
                ? 'text-slate-400 bg-slate-950 border-white/10'
                : totalInteractions <= 2
                ? 'text-amber-300 bg-amber-950/80 border-amber-500/30'
                : 'text-emerald-400 bg-emerald-950/80 border-emerald-500/30'
            }`}>
              {totalInteractions === 0
                ? 'Awaiting Interactions'
                : totalInteractions <= 2
                ? `🌱 Early Signals (${totalInteractions})`
                : `Confidence: ${studentProfile.overallConfidence} (${totalInteractions} reels)`
              }
            </span>
          </div>

          {/* STATE A: INITIAL ZERO-STATE (No fake percentages) */}
          {totalInteractions === 0 && (
            <div className="py-6 px-4 rounded-2xl bg-slate-950/80 border border-dashed border-white/10 text-center space-y-3">
              <div className="h-10 w-10 mx-auto rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400">
                <Info className="h-5 w-5" />
              </div>
              
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-200">
                  "Your learning interests will appear here as you scroll."
                </h4>
                <p className="text-xs text-slate-400 font-mono max-w-sm mx-auto">
                  Start scrolling or tap like/save to let ScrollWise discover patterns in your behavior.
                </p>
              </div>

              {/* Quick simulation shortcut for demo/judges */}
              {onSimulateTrapDemo && (
                <div className="pt-2">
                  <button
                    onClick={onSimulateTrapDemo}
                    className="px-3 py-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 shadow"
                  >
                    <Zap className="h-3.5 w-3.5 text-emerald-400" />
                    <span>⚡ Simulate Built-In Trap Preset</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STATE B: EARLY SIGNALS (1-2 Interactions) */}
          {totalInteractions > 0 && totalInteractions <= 2 && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                  <span>Emerging Signal:</span>
                  <span className="text-white">{studentProfile.primaryInterests[0]?.domainName || 'Software Engineering'}</span>
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  Detected initial interest from {totalInteractions} interaction{totalInteractions > 1 ? 's' : ''}. Keep scrolling to confirm whether this is a superficial keyword or a broader latent interest.
                </p>
              </div>

              {studentProfile.primaryInterests.map((interest) => (
                <div key={interest.domainId} className="space-y-1.5 p-3 rounded-2xl bg-slate-950/60 border border-white/5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-bold">{interest.domainName}</span>
                    <span className="text-amber-400 font-bold">{interest.score}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-white/10">
                    <div 
                      className="h-full bg-amber-500 transition-all duration-500 rounded-full"
                      style={{ width: `${interest.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STATE C: CONFIDENT INFERRED PROFILE (3+ Interactions) */}
          {totalInteractions >= 3 && (
            <div className="space-y-3 font-mono text-xs animate-fadeIn">
              {studentProfile.primaryInterests.map((interest) => {
                const isExpanded = expandedDomainId === interest.domainId;
                return (
                  <div key={interest.domainId} className="space-y-1.5 p-3 rounded-2xl bg-slate-950/60 border border-white/5">
                    <div 
                      onClick={() => setExpandedDomainId(isExpanded ? null : interest.domainId)}
                      className="flex justify-between items-center text-xs cursor-pointer hover:text-emerald-300 transition-colors"
                    >
                      <span className="text-slate-200 font-bold flex items-center gap-1.5">
                        <span>{interest.domainName}</span>
                      </span>
                      <span className="text-emerald-400 font-black">{interest.score}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-white/10">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 ease-out rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                        style={{ width: `${interest.score}%` }}
                      />
                    </div>

                    {/* Grounded Evidence List from Live Telemetry */}
                    {interest.evidenceItems && interest.evidenceItems.length > 0 && (
                      <div className="pt-1 text-[11px] text-slate-400 space-y-1">
                        <span className="text-[10px] text-slate-500 font-bold block">Based on:</span>
                        {interest.evidenceItems.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-[10px] text-slate-300">
                            <span className="truncate max-w-[210px]">• {item.reelTitle.split(':')[0]}</span>
                            <span className="text-emerald-400 font-bold">{item.watchPercentage}% watched</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer note and Reset button */}
          <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] text-slate-500 font-mono">
            <span>* Interaction signals update in real-time.</span>
            {totalInteractions > 0 && onResetSession && (
              <button
                onClick={onResetSession}
                className="text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
                title="Reset session to 0 interactions"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* PANEL 2: PATTERN DISCOVERY CALLOUT */}
        <div 
          onClick={onDiscoverPattern}
          className={`p-5 rounded-3xl transition-all cursor-pointer group space-y-2 ${
            totalInteractions >= 2
              ? 'bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 border border-emerald-500/50 hover:border-emerald-400 shadow-2xl'
              : 'bg-slate-900/50 border border-white/5 opacity-70'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              Pattern Synthesizer
            </span>
            <div className="h-7 w-7 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors">
              {totalInteractions >= 2 ? '"We Found a Pattern in Your Scrolling"' : 'Pattern Synthesis Ready'}
            </h4>
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed pt-0.5">
              {totalInteractions >= 2 
                ? 'Synthesizes Java memes, developer lifestyle, and laptop comparisons into a broader interest.'
                : 'Scroll through reels or simulate session to trigger latent interest synthesis.'
              }
            </p>
          </div>
        </div>

        {/* PANEL 3: ASK SCROLLWISE LAUNCHER */}
        <div 
          onClick={onOpenChat}
          className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-white/10 hover:border-emerald-500/40 text-xs font-mono text-slate-300 flex items-center justify-between transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Bot className="h-3.5 w-3.5" />
            </div>
            <span className="text-[11px]">Questions about your recommendations? <b>Ask ScrollWise</b></span>
          </div>
          <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
        </div>

      </div>
    </div>
  );
};
