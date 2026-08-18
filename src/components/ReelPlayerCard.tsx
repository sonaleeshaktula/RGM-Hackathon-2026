import React, { useState } from 'react';
import { Play, Pause, Heart, Bookmark, Repeat, AlertCircle, Sliders } from 'lucide-react';
import { InteractedReel, BehavioralTelemetry } from '../types';
import { ReelVideoPlayer } from './ReelVideoPlayer';

interface ReelPlayerCardProps {
  reel: InteractedReel;
  isSelected: boolean;
  onSelect: () => void;
  onUpdateTelemetry: (reelId: string, telemetry: Partial<BehavioralTelemetry>) => void;
}

export const ReelPlayerCard: React.FC<ReelPlayerCardProps> = ({
  reel,
  isSelected,
  onSelect,
  onUpdateTelemetry,
}) => {
  const [showTelemetryEditor, setShowTelemetryEditor] = useState(false);
  const weight = reel.telemetry.computedWeight ?? 1.5;

  return (
    <div
      onClick={onSelect}
      className={`rounded-xl overflow-hidden transition-all duration-200 border cursor-pointer ${
        isSelected
          ? 'bg-slate-900 border-emerald-500/80 shadow-lg shadow-emerald-500/10'
          : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80'
      }`}
    >
      {/* Playable Video Component */}
      <ReelVideoPlayer
        title={reel.title}
        creator={reel.creator}
        category={reel.category}
        durationSeconds={reel.telemetry.durationSeconds}
        thumbnailUrl={reel.thumbnailUrl}
        videoUrl={reel.videoSimUrl}
        transcriptExcerpt={reel.transcriptExcerpt}
        archetype={reel.archetype}
        badgeText={`Weight: ${weight.toFixed(2)}x`}
        isHero={false}
      />

      {/* Info Bar */}
      <div className="p-3 space-y-2">
        <div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-0.5">
            <span className="text-emerald-400 font-semibold truncate max-w-[150px]">{reel.archetype}</span>
            <span>{reel.creator}</span>
          </div>
          <h4 className="text-xs font-bold text-slate-100 line-clamp-1">
            {reel.title}
          </h4>
        </div>

        {/* Signals */}
        <div className="flex items-center justify-between pt-1.5 border-t border-slate-800/60 text-[10px]">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-emerald-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
              Watch: {reel.telemetry.watchPercentage}%
            </span>
            <div className="flex items-center gap-1.5 text-slate-400">
              {reel.telemetry.isLiked && <Heart className="h-3 w-3 text-rose-400 fill-rose-400" />}
              {reel.telemetry.isSaved && <Bookmark className="h-3 w-3 text-amber-400 fill-amber-400" />}
              {reel.telemetry.isReplayed && <Repeat className="h-3 w-3 text-indigo-400" />}
              {reel.telemetry.isSkippedEarly && <AlertCircle className="h-3 w-3 text-rose-500" />}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTelemetryEditor(!showTelemetryEditor);
            }}
            className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Adjust telemetry parameters"
          >
            <Sliders className="h-3 w-3" />
          </button>
        </div>

        {/* Expandable Telemetry Editor */}
        {showTelemetryEditor && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-2.5 rounded-lg bg-slate-950 border border-emerald-500/30 space-y-1.5 text-[10px] font-mono animate-fadeIn"
          >
            <div className="flex items-center justify-between text-emerald-400">
              <span>Watch Completion:</span>
              <span className="font-bold">{reel.telemetry.watchPercentage}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="150"
              value={reel.telemetry.watchPercentage}
              onChange={(e) =>
                onUpdateTelemetry(reel.id, {
                  watchPercentage: Number(e.target.value),
                  isSkippedEarly: Number(e.target.value) < 30,
                })
              }
              className="w-full accent-emerald-500 h-1 bg-slate-800 rounded cursor-pointer"
            />

            <div className="grid grid-cols-4 gap-1 pt-1">
              <button
                onClick={() => onUpdateTelemetry(reel.id, { isLiked: !reel.telemetry.isLiked })}
                className={`py-0.5 rounded text-[9px] font-semibold border ${
                  reel.telemetry.isLiked
                    ? 'bg-rose-950/80 border-rose-500/50 text-rose-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                Like
              </button>
              <button
                onClick={() => onUpdateTelemetry(reel.id, { isSaved: !reel.telemetry.isSaved })}
                className={`py-0.5 rounded text-[9px] font-semibold border ${
                  reel.telemetry.isSaved
                    ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                Save
              </button>
              <button
                onClick={() => onUpdateTelemetry(reel.id, { isReplayed: !reel.telemetry.isReplayed })}
                className={`py-0.5 rounded text-[9px] font-semibold border ${
                  reel.telemetry.isReplayed
                    ? 'bg-indigo-950/80 border-indigo-500/50 text-indigo-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                Replay
              </button>
              <button
                onClick={() =>
                  onUpdateTelemetry(reel.id, {
                    isSkippedEarly: !reel.telemetry.isSkippedEarly,
                    watchPercentage: reel.telemetry.isSkippedEarly ? 85 : 20,
                  })
                }
                className={`py-0.5 rounded text-[9px] font-semibold border ${
                  reel.telemetry.isSkippedEarly
                    ? 'bg-rose-950/80 border-rose-500/50 text-rose-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                Skip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
