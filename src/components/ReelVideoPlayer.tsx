import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Sparkles } from 'lucide-react';

interface ReelVideoPlayerProps {
  title: string;
  creator: string;
  category: string;
  durationSeconds: number;
  thumbnailUrl: string;
  transcriptExcerpt: string;
  videoUrl?: string;
  archetype?: string;
  badgeText?: string;
  isHero?: boolean;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export const ReelVideoPlayer: React.FC<ReelVideoPlayerProps> = ({
  title,
  creator,
  category,
  durationSeconds = 15,
  thumbnailUrl,
  transcriptExcerpt,
  videoUrl,
  archetype,
  badgeText,
  isHero = false,
  onPlayStateChange,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [useCanvasFallback, setUseCanvasFallback] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Play / Pause Toggle
  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (videoRef.current && !useCanvasFallback) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              // If video network playback fails, fall back to canvas animation seamlessly
              setUseCanvasFallback(true);
              setIsPlaying(true);
            });
        }
      }
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  // Video Event Handlers
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  // Fallback Canvas Simulation Loop (Runs when video is canvas-based)
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      return;
    }

    let frame = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= durationSeconds) return 0;
        return prev + 0.25;
      });
    }, 250);

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw animated code / matrix lines
      ctx.font = '11px monospace';
      ctx.fillStyle = isHero ? 'rgba(16, 185, 129, 0.7)' : 'rgba(99, 102, 241, 0.7)';

      const codeLines = [
        `// Executing: ${category} Analysis`,
        `function optimizeSystem() {`,
        `  const telemetry = extractSignals();`,
        `  return latentInference(telemetry);`,
        `}`,
      ];

      codeLines.forEach((line, idx) => {
        const y = 35 + idx * 18;
        ctx.fillText(line, 15, y);
      });

      // 2. Draw audio spectrum wave bars at bottom
      const bars = 20;
      const barWidth = canvas.width / bars;
      ctx.fillStyle = isHero ? 'rgba(16, 185, 129, 0.5)' : 'rgba(99, 102, 241, 0.5)';

      for (let i = 0; i < bars; i++) {
        const h = Math.sin(frame * 0.12 + i * 0.5) * 14 + 18;
        ctx.fillRect(i * barWidth + 2, canvas.height - h - 35, barWidth - 4, h);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      clearInterval(interval);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, durationSeconds, isHero, category]);

  // Handle Mute Toggle
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  // Handle Replay
  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const progressPercent = Math.min(100, (currentTime / durationSeconds) * 100);

  // Subtitle synchronization
  const words = transcriptExcerpt.split(' ');
  const wordsPerSec = Math.max(1, words.length / durationSeconds);
  const currentWordIndex = Math.min(words.length, Math.floor(currentTime * wordsPerSec * 1.2));
  const activeSubtitle = words.slice(Math.max(0, currentWordIndex - 5), currentWordIndex + 2).join(' ');

  return (
    <div
      onClick={() => togglePlay()}
      className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 cursor-pointer select-none group border border-slate-800 transition-all ${isHero ? 'h-64 sm:h-80 shadow-2xl ring-1 ring-emerald-500/20' : 'h-36'
        }`}
    >
      {/* Real HTML5 Video Tag */}
      {videoUrl && !useCanvasFallback ? (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={thumbnailUrl}
          playsInline
          loop
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setUseCanvasFallback(true)}
          className={`h-full w-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-90' : 'opacity-70'
            }`}
        />
      ) : (
        /* Poster Image with Canvas Animation Fallback */
        <img
          src={thumbnailUrl}
          alt={title}
          className={`h-full w-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105 filter brightness-90' : 'brightness-75 group-hover:brightness-85'
            }`}
        />
      )}

      {/* Animated Motion Canvas (Renders when playing without network video) */}
      <canvas
        ref={canvasRef}
        width={360}
        height={200}
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 ${isPlaying && useCanvasFallback ? 'opacity-100' : 'opacity-0'
          }`}
      />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

      {/* Top Bar Header inside Reel */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
            {category}
          </span>
          {badgeText && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
              {badgeText}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-mono text-slate-300 border border-slate-800">
          <span className="text-emerald-400 font-bold">{Math.floor(currentTime)}s</span>
          <span>/</span>
          <span>{durationSeconds}s</span>
        </div>
      </div>

      {/* Center Animated Play / Pause Button */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 z-10 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}
      >
        <div
          className={`rounded-full flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-110 ${isHero
            ? 'h-16 w-16 bg-emerald-500 text-slate-950 shadow-emerald-500/30'
            : 'h-11 w-11 bg-slate-950/85 backdrop-blur-md border border-white/20 text-white'
            }`}
        >
          {isPlaying ? (
            <Pause className={isHero ? 'h-7 w-7 fill-slate-950' : 'h-5 w-5'} />
          ) : (
            <Play className={`${isHero ? 'h-7 w-7 ml-1 fill-slate-950' : 'h-5 w-5 ml-0.5'}`} />
          )}
        </div>
      </div>

      {/* Live Synced Subtitles (When Playing) */}
      {isPlaying && activeSubtitle && (
        <div className="absolute bottom-12 left-4 right-4 text-center pointer-events-none z-10 animate-fadeIn">
          <span className="inline-block px-3 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md text-slate-100 text-xs font-mono font-medium border border-emerald-500/30 shadow-xl">
            "{activeSubtitle}..."
          </span>
        </div>
      )}

      {/* Bottom Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-10 space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-200">
          <span className="font-semibold text-[11px] truncate max-w-[200px] drop-shadow">
            {creator}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-1 rounded bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title={isMuted ? 'Unmute Audio' : 'Mute'}
            >
              {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-emerald-400" />}
            </button>
            <button
              onClick={handleReplay}
              className="p-1 rounded bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Replay from start"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Video Scrubber Progress Bar */}
        <div className="relative h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-200 ease-linear rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
