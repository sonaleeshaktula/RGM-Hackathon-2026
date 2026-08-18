import { CandidateTechReel, CandidateEvaluationResult } from '../types';
import { HYPE_PATTERNS } from '../data/techOntology';

export interface HypeAuditResult {
  isRejected: boolean;
  hypeRiskScore: number;
  substanceScore: number;
  rejectionReason?: string;
  rejectionCategory?: 'HYPE_RISK' | 'LOW_EDUCATIONAL_VALUE' | 'REPETITIVE_TRIVIAL' | 'OFF_DOMAIN';
  indicators: string[];
}

/**
 * Audits a candidate tech Reel for hype, clickbait, and educational depth.
 */
export function auditCandidateForHype(candidate: CandidateTechReel): HypeAuditResult {
  const indicators: string[] = [...candidate.hypeIndicators];

  let detectedHypeScore = candidate.hypeRiskScore;

  // Check text against NLP regex patterns
  const fullText = `${candidate.title} ${candidate.description} ${candidate.keyTakeaways.join(' ')}`.toLowerCase();
  
  HYPE_PATTERNS.forEach((pattern) => {
    if (pattern.test(fullText)) {
      detectedHypeScore = Math.max(detectedHypeScore, 0.85);
      indicators.push('Matched sensationalist title/hook heuristic');
    }
  });

  // Check 1: Severe Hype Risk (>= 0.60)
  if (detectedHypeScore >= 0.60) {
    return {
      isRejected: true,
      hypeRiskScore: detectedHypeScore,
      substanceScore: candidate.substanceScore,
      rejectionCategory: 'HYPE_RISK',
      rejectionReason: `High topical surface relevance, but rejected due to high hype risk (${Math.round(detectedHypeScore * 100)}%), sensationalist claims, and low evidence-based educational value.`,
      indicators: Array.from(new Set(indicators)),
    };
  }

  // Check 2: Low Educational Substance (< 0.30)
  if (candidate.substanceScore < 0.30) {
    return {
      isRejected: true,
      hypeRiskScore: detectedHypeScore,
      substanceScore: candidate.substanceScore,
      rejectionCategory: 'LOW_EDUCATIONAL_VALUE',
      rejectionReason: `Rejected due to low educational depth (${Math.round(candidate.substanceScore * 100)}%). Content focuses on surface-level promotions or prompt spam without engineering rigor.`,
      indicators: Array.from(new Set(indicators)),
    };
  }

  // Candidate passes safety audit
  return {
    isRejected: false,
    hypeRiskScore: detectedHypeScore,
    substanceScore: candidate.substanceScore,
    indicators,
  };
}
