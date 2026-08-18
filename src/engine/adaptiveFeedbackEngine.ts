import { 
  StudentInterestProfile, 
  InteractedReel, 
  DifficultyLevel, 
  TechCategory,
  BehavioralTelemetry
} from '../types';
import { inferStudentInterestProfile } from './latentInferenceEngine';
import { enrichReelsWithWeights } from './signalWeightEngine';

export type FeedbackAction = 
  | { type: 'INTERESTED'; category: TechCategory }
  | { type: 'SAVE_TO_DECK'; reelId: string; category: TechCategory }
  | { type: 'NOT_RELEVANT'; reelId: string; category: TechCategory }
  | { type: 'SET_DIFFICULTY'; difficulty: DifficultyLevel }
  | { type: 'UPDATE_TELEMETRY'; reelId: string; telemetry: Partial<BehavioralTelemetry> }
  | { type: 'RESET_DEFAULT' };

/**
 * Applies real-time user feedback actions and returns the updated state.
 */
export function applyFeedbackAction(
  currentReels: InteractedReel[],
  currentProfile: StudentInterestProfile,
  action: FeedbackAction,
  initialReels: InteractedReel[]
): {
  updatedReels: InteractedReel[];
  updatedProfile: StudentInterestProfile;
  feedbackNotification: string;
} {
  let updatedReels = [...currentReels];
  let updatedProfile = { ...currentProfile };
  let feedbackNotification = '';

  switch (action.type) {
    case 'INTERESTED': {
      const newInterested = Array.from(new Set([...updatedProfile.interestedCategories, action.category]));
      const newDisliked = updatedProfile.dislikedCategories.filter((c) => c !== action.category);
      
      updatedProfile = {
        ...updatedProfile,
        interestedCategories: newInterested,
        dislikedCategories: newDisliked,
      };
      
      updatedProfile = inferStudentInterestProfile(updatedReels, updatedProfile);
      feedbackNotification = `Boosted ${action.category} affinity in Interest DNA (+15%). Next recommendations will delve deeper into adjacent topics.`;
      break;
    }

    case 'SAVE_TO_DECK': {
      const newSaved = Array.from(new Set([...updatedProfile.savedReelIds, action.reelId]));
      const newInterested = Array.from(new Set([...updatedProfile.interestedCategories, action.category]));
      
      updatedProfile = {
        ...updatedProfile,
        savedReelIds: newSaved,
        interestedCategories: newInterested,
      };
      
      updatedProfile = inferStudentInterestProfile(updatedReels, updatedProfile);
      feedbackNotification = `Saved to your Learning Deck! Strong signal recorded (+25% domain boost).`;
      break;
    }

    case 'NOT_RELEVANT': {
      const newDisliked = Array.from(new Set([...updatedProfile.dislikedCategories, action.category]));
      const newInterested = updatedProfile.interestedCategories.filter((c) => c !== action.category);
      
      updatedProfile = {
        ...updatedProfile,
        dislikedCategories: newDisliked,
        interestedCategories: newInterested,
      };
      
      updatedProfile = inferStudentInterestProfile(updatedReels, updatedProfile);
      feedbackNotification = `Pivoting away from ${action.category}. Exploring adjacent tech domains instead.`;
      break;
    }

    case 'SET_DIFFICULTY': {
      updatedProfile = {
        ...updatedProfile,
        preferredDifficulty: action.difficulty,
      };
      
      updatedProfile = inferStudentInterestProfile(updatedReels, updatedProfile);
      feedbackNotification = `Target difficulty updated to "${action.difficulty}". Re-scoring candidate recommendations.`;
      break;
    }

    case 'UPDATE_TELEMETRY': {
      updatedReels = updatedReels.map((reel) => {
        if (reel.id === action.reelId) {
          const updatedTelemetry: BehavioralTelemetry = {
            ...reel.telemetry,
            ...action.telemetry,
          };
          return {
            ...reel,
            telemetry: updatedTelemetry,
          };
        }
        return reel;
      });

      updatedReels = enrichReelsWithWeights(updatedReels);
      updatedProfile = inferStudentInterestProfile(updatedReels, updatedProfile);
      feedbackNotification = `Live telemetry updated! Re-evaluating behavioral weights and latent centroids.`;
      break;
    }

    case 'RESET_DEFAULT': {
      updatedReels = enrichReelsWithWeights(initialReels);
      updatedProfile = inferStudentInterestProfile(updatedReels);
      feedbackNotification = `Reset pipeline to default built-in trap baseline.`;
      break;
    }
  }

  return {
    updatedReels,
    updatedProfile,
    feedbackNotification,
  };
}
