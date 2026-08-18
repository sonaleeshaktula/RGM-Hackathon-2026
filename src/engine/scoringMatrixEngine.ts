import { CandidateTechReel, CandidateEvaluationResult, StudentInterestProfile } from '../types';
import { auditCandidateForHype } from './hypeFilterEngine';

/**
 * Evaluates candidate tech reels using the multi-dimensional scoring matrix.
 */
export function evaluateCandidateReels(
  candidates: CandidateTechReel[],
  studentProfile: StudentInterestProfile
): {
  evaluatedCandidates: CandidateEvaluationResult[];
  rejectedCandidates: CandidateEvaluationResult[];
  topRecommendation: CandidateEvaluationResult;
} {
  const allResults: CandidateEvaluationResult[] = [];

  candidates.forEach((candidate) => {
    // 1. Run Safety & Hype Filter
    const hypeAudit = auditCandidateForHype(candidate);

    // 2. Latent Domain Matching (0 to 100)
    let latentMatchScore = 0;
    candidate.targetDomains.forEach((targetDomainId) => {
      const primaryMatch = studentProfile.primaryInterests.find((p) => p.domainId === targetDomainId);
      if (primaryMatch) {
        latentMatchScore = Math.max(latentMatchScore, primaryMatch.score);
      } else {
        const secondaryMatch = studentProfile.secondaryInterests.find((s) => s.domainId === targetDomainId);
        if (secondaryMatch) {
          latentMatchScore = Math.max(latentMatchScore, secondaryMatch.score * 0.75);
        }
      }
    });

    // If candidate has direct category alignment with primary interests
    const categoryMatch = studentProfile.primaryInterests.find((p) => p.category === candidate.category);
    if (categoryMatch) {
      latentMatchScore = Math.max(latentMatchScore, categoryMatch.score * 0.85);
    }

    // Explicit liked category boost
    if (studentProfile.interestedCategories.includes(candidate.category)) {
      latentMatchScore = Math.min(100, latentMatchScore + 20);
    }

    // Explicit disliked category penalty
    if (studentProfile.dislikedCategories.includes(candidate.category)) {
      latentMatchScore = Math.max(0, latentMatchScore - 50);
    }

    // 3. Educational & Career Usefulness (0 to 100)
    const usefulnessScore = Math.round(candidate.substanceScore * 100);

    // 4. Novelty & Smart Adjacency (0 to 100)
    let noveltyScore = 85;
    if (candidate.isRepetitiveOrTrivial) {
      noveltyScore = 15; // Heavy penalty for trivial syntax tutorials
    } else if (candidate.targetDomains.some((d) => studentProfile.adjacentInterestsToExplore.some((adj) => adj.toLowerCase().includes(d)))) {
      noveltyScore = 98; // Boost for expanding into adjacent domains
    }

    // 5. Difficulty Appropriateness (0 to 100)
    let difficultyScore = 80;
    if (candidate.difficulty === studentProfile.preferredDifficulty) {
      difficultyScore = 100;
    } else if (studentProfile.preferredDifficulty === 'Intermediate' && candidate.difficulty === 'Advanced') {
      difficultyScore = 85;
    } else if (studentProfile.preferredDifficulty === 'Intermediate' && candidate.difficulty === 'Beginner') {
      difficultyScore = candidate.isRepetitiveOrTrivial ? 20 : 60;
    }

    // 6. Content Quality Score (0 to 100)
    const qualityScore = Math.round((candidate.substanceScore * 0.7 + (1 - candidate.hypeRiskScore) * 0.3) * 100);

    // 7. Check for repetitive/trivial rejection
    let isRejected = hypeAudit.isRejected;
    let rejectionReason = hypeAudit.rejectionReason;
    let rejectionCategory = hypeAudit.rejectionCategory;

    if (!isRejected && candidate.isRepetitiveOrTrivial && noveltyScore < 20) {
      isRejected = true;
      rejectionCategory = 'REPETITIVE_TRIVIAL';
      rejectionReason = `Rejected due to low novelty and repetitive basic syntax. The student's profile indicates readiness for higher-level architectural concepts.`;
    }

    // 8. Calculate Composite Weighted Score:
    // RawScore = 0.35 * Latent + 0.25 * Useful + 0.15 * Novelty + 0.10 * Difficulty + 0.15 * Quality
    const rawScore = (
      0.35 * latentMatchScore +
      0.25 * usefulnessScore +
      0.15 * noveltyScore +
      0.10 * difficultyScore +
      0.15 * qualityScore
    );

    const safetyMultiplier = isRejected ? 0.0 : Math.max(0.1, 1.0 - (0.8 * candidate.hypeRiskScore));
    const compositeScore = Number((rawScore * safetyMultiplier).toFixed(1));

    const result: CandidateEvaluationResult = {
      candidate,
      isRejected,
      rejectionReason,
      rejectionCategory,
      scores: {
        latentMatch: Math.round(latentMatchScore),
        educationalUsefulness: usefulnessScore,
        noveltyAndAdjacency: noveltyScore,
        difficultyFit: difficultyScore,
        contentQuality: qualityScore,
        hypePenalty: Number((1.0 - safetyMultiplier).toFixed(2)),
        compositeScore,
      },
      evaluationSummary: isRejected
        ? rejectionReason || 'Candidate rejected by quality filter.'
        : `Selected with high composite score (${compositeScore}/100) based on strong latent alignment with ${studentProfile.primaryInterests[0]?.domainName || 'Software Engineering'} and high actionable career value.`,
    };

    allResults.push(result);
  });

  const rejectedCandidates = allResults
    .filter((r) => r.isRejected)
    .sort((a, b) => b.candidate.hypeRiskScore - a.candidate.hypeRiskScore);

  const qualifiedCandidates = allResults
    .filter((r) => !r.isRejected)
    .sort((a, b) => b.scores.compositeScore - a.scores.compositeScore);

  const topRecommendation = qualifiedCandidates[0] || allResults[0];

  return {
    evaluatedCandidates: allResults,
    rejectedCandidates,
    topRecommendation,
  };
}
