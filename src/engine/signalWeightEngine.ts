import { BehavioralTelemetry, InteractedReel } from '../types';

/**
 * Computes behavioral weight for a short-form video interaction.
 * Higher watch completion, saves, and replays give strong positive signals.
 * Early skips give strong negative/damping signals.
 */
export function computeBehavioralWeight(telemetry: BehavioralTelemetry): number {
  const watchRatio = Math.min(Math.max(telemetry.watchPercentage / 100, 0), 1.5);
  
  let weight = watchRatio * 1.2; // Base weight from watch percentage (0.0 to 1.2+)

  if (telemetry.isLiked) {
    weight += 0.25;
  }

  // Saves are the highest-intent signal in short-form video
  if (telemetry.isSaved) {
    weight += 0.55;
  }

  // Replays indicate high engagement and re-watching
  if (telemetry.isReplayed) {
    weight += 0.40;
  }

  if (telemetry.isShared) {
    weight += 0.30;
  }

  // Early skips (under 30% watch or flagged skip) heavily dampen noise
  if (telemetry.isSkippedEarly || telemetry.watchPercentage < 30) {
    weight -= 0.70;
  }

  // Clamp weight to safe range [0.05, 2.8]
  return Number(Math.max(0.05, Math.min(2.8, weight)).toFixed(2));
}

/**
 * Enriches a list of interacted Reels with calculated weights.
 */
export function enrichReelsWithWeights(reels: InteractedReel[]): InteractedReel[] {
  return reels.map((reel) => ({
    ...reel,
    telemetry: {
      ...reel.telemetry,
      computedWeight: computeBehavioralWeight(reel.telemetry),
    },
  }));
}
