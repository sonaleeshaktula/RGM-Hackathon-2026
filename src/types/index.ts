export type TechCategory = 
  | 'AI' 
  | 'DSA' 
  | 'Java' 
  | 'HLD' 
  | 'Cybersecurity' 
  | 'Cloud' 
  | 'Hardware' 
  | 'Career' 
  | 'Other';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

export interface BehavioralTelemetry {
  watchPercentage: number; // 0 to 100
  durationSeconds: number;
  timeSpentSeconds: number;
  isLiked: boolean;
  isSaved: boolean;
  isReplayed: boolean;
  isShared: boolean;
  isSkippedEarly: boolean;
  computedWeight?: number; // Normalized 0.05 to 2.8
}

export interface InteractedReel {
  id: string;
  title: string;
  creator: string;
  category: TechCategory;
  archetype: string; // e.g. "😂 Programming Memes", "🎯 Career", "💻 Coding / DSA", "📱 Gadgets"
  thumbnailUrl: string;
  previewGradient: string;
  videoSimUrl?: string;
  transcriptExcerpt: string;
  semanticTags: string[];
  telemetry: BehavioralTelemetry;
  inferredMicroInterests: string[];
}

export interface LatentEvidenceItem {
  reelId: string;
  reelTitle: string;
  archetype: string;
  watchPercentage: number;
  interactionTags: string[]; // e.g. ["88% watched", "Liked", "Saved"]
  weightContribution: number;
}

export interface LatentDomainScore {
  domainId: string;
  domainName: string;
  category: TechCategory;
  score: number; // 0 to 100
  confidence: ConfidenceLevel;
  contributingReelIds: string[];
  evidenceItems: LatentEvidenceItem[];
  semanticRationale: string;
}

export interface StudentInterestProfile {
  studentId: string;
  studentName: string;
  primaryInterests: LatentDomainScore[];
  secondaryInterests: LatentDomainScore[];
  overallConfidence: ConfidenceLevel;
  totalInteractionsAnalyzed: number;
  noiseDampenedReels: string[];
  preferredDifficulty: DifficultyLevel;
  adjacentInterestsToExplore: string[];
  savedReelIds: string[];
  interestedCategories: string[];
  dislikedCategories: string[];
}

export interface CandidateTechReel {
  id: string;
  title: string;
  creator: string;
  category: TechCategory;
  difficulty: DifficultyLevel;
  durationSeconds: number;
  thumbnailUrl: string;
  previewGradient: string;
  description: string;
  keyTakeaways: string[];
  hypeRiskScore: number; // 0.0 to 1.0 (>= 0.60 is rejected for hype)
  hypeIndicators: string[];
  substanceScore: number; // 0.0 to 1.0 (< 0.30 is rejected for low educational depth)
  targetDomains: string[];
  isRepetitiveOrTrivial: boolean;
  whyUseful: string;
}

export interface CandidateEvaluationResult {
  candidate: CandidateTechReel;
  isRejected: boolean;
  rejectionReason?: string;
  rejectionCategory?: 'HYPE_RISK' | 'LOW_EDUCATIONAL_VALUE' | 'REPETITIVE_TRIVIAL' | 'OFF_DOMAIN';
  scores: {
    latentMatch: number;
    educationalUsefulness: number;
    noveltyAndAdjacency: number;
    difficultyFit: number;
    contentQuality: number;
    hypePenalty?: number;
    compositeScore: number; // 0 to 100
  };
  explanation?: string;
  evaluationSummary?: string;
}

export interface StandardOutputSpec {
  currentReel: string;
  interestDetected: string;
  why: string;
  recommendedTechReel: string;
  category: string;
  whyThisRecommendation: string;
  difficulty: string;
  confidence: string;
}

export interface ReasoningStep {
  stage?: string;
  step?: number;
  title: string;
  description: string;
  status?: 'COMPLETE' | 'ACTIVE' | 'PENDING';
  badges?: { label: string; variant: 'success' | 'info' | 'warning' | 'danger' | 'neutral' }[];
  evidence?: string[];
}

export interface RecommendationPipelineData {
  studentProfile: StudentInterestProfile;
  activeReel: InteractedReel;
  interactedReels?: InteractedReel[];
  topRecommendation: CandidateEvaluationResult;
  candidateRankings: CandidateEvaluationResult[];
  evaluatedCandidates?: CandidateEvaluationResult[];
  rejectedCandidates: CandidateEvaluationResult[];
  naiveComparison?: {
    naiveRecommendation?: string;
    shallowRecommendation?: string;
    naiveReason?: string;
    shallowCategory?: string;
    shallowWhy?: string;
    flaws?: string[];
    shallowFlaws?: string[];
    scrollWiseAdvantage?: string;
  };
  outputSpec: StandardOutputSpec;
  reasoningSteps: ReasoningStep[];
}
