import { 
  InteractedReel, 
  StudentInterestProfile, 
  LatentDomainScore, 
  LatentEvidenceItem,
  ConfidenceLevel, 
  DifficultyLevel 
} from '../types';
import { TECH_ONTOLOGY_DOMAINS } from '../data/techOntology';
import { computeBehavioralWeight } from './signalWeightEngine';

/**
 * Maps a single Reel to domain affinity scores based on semantic tags, archetype, and category.
 */
function getReelDomainAffinities(reel: InteractedReel): Record<string, number> {
  const affinities: Record<string, number> = {};

  // Initialize all ontology domains with zero
  Object.keys(TECH_ONTOLOGY_DOMAINS).forEach((d) => (affinities[d] = 0));

  const textToScan = `${reel.title} ${reel.archetype} ${reel.category} ${reel.semanticTags.join(' ')} ${reel.transcriptExcerpt}`.toLowerCase();

  // Keyword & semantic ontology matching
  Object.values(TECH_ONTOLOGY_DOMAINS).forEach((domain) => {
    let matchCount = 0;
    domain.keywords.forEach((kw) => {
      if (textToScan.includes(kw.toLowerCase())) {
        matchCount += 1;
      }
    });

    if (reel.category === domain.category) {
      matchCount += 2;
    }

    if (matchCount > 0) {
      affinities[domain.id] = matchCount;
    }
  });

  // Archetype semantic bridging (Critical for latent discovery):
  if (reel.archetype.includes('Programming') || reel.archetype.includes('Coding') || reel.archetype.includes('Meme')) {
    affinities['domain_swe_arch'] = (affinities['domain_swe_arch'] || 0) + 2.4;
    affinities['domain_dsa_algos'] = (affinities['domain_dsa_algos'] || 0) + 1.8;
  }
  if (reel.archetype.includes('Lifestyle') || reel.archetype.includes('Career')) {
    affinities['domain_swe_arch'] = (affinities['domain_swe_arch'] || 0) + 2.0;
    affinities['domain_career_growth'] = (affinities['domain_career_growth'] || 0) + 2.5;
  }
  if (reel.archetype.includes('Gadgets') || reel.archetype.includes('Hardware') || reel.archetype.includes('Benchmark')) {
    affinities['domain_hardware_systems'] = (affinities['domain_hardware_systems'] || 0) + 2.6;
    affinities['domain_swe_arch'] = (affinities['domain_swe_arch'] || 0) + 1.4;
    affinities['domain_cloud_devops'] = (affinities['domain_cloud_devops'] || 0) + 1.2;
  }
  if (reel.archetype.includes('AI') || textToScan.includes('transformers') || textToScan.includes('rag')) {
    affinities['domain_ai_ml'] = (affinities['domain_ai_ml'] || 0) + 2.8;
  }

  return affinities;
}

/**
 * Infers the student's Latent Interest Profile strictly from REAL-TIME interaction signals.
 * If 0 interactions exist, returns an empty profile without fake percentages.
 */
export function inferStudentInterestProfile(
  reels: InteractedReel[],
  existingProfile?: Partial<StudentInterestProfile>
): StudentInterestProfile {
  // Count meaningful interactions (user watched > 20%, or liked, or saved)
  const meaningfulReels = reels.filter(
    (r) => r.telemetry.watchPercentage >= 20 || r.telemetry.isLiked || r.telemetry.isSaved
  );

  // Return clean empty profile if no interaction has taken place yet
  if (meaningfulReels.length === 0) {
    return {
      studentId: existingProfile?.studentId || 'student_alex_01',
      studentName: existingProfile?.studentName || 'Alex (Student Learner)',
      primaryInterests: [],
      secondaryInterests: [],
      overallConfidence: 'Low',
      totalInteractionsAnalyzed: 0,
      noiseDampenedReels: [],
      preferredDifficulty: (existingProfile?.preferredDifficulty as DifficultyLevel) || 'Intermediate',
      adjacentInterestsToExplore: [],
      savedReelIds: [],
      interestedCategories: existingProfile?.interestedCategories || [],
      dislikedCategories: existingProfile?.dislikedCategories || [],
    };
  }

  const domainAccumulator: Record<
    string,
    { 
      totalScore: number; 
      contributingReels: { reel: InteractedReel; weight: number }[];
      maxWeight: number;
    }
  > = {};

  Object.keys(TECH_ONTOLOGY_DOMAINS).forEach((d) => {
    domainAccumulator[d] = { totalScore: 0, contributingReels: [], maxWeight: 0 };
  });

  const noiseDampenedReels: string[] = [];

  meaningfulReels.forEach((reel) => {
    const weight = reel.telemetry.computedWeight ?? computeBehavioralWeight(reel.telemetry);

    if (weight <= 0.25 || reel.telemetry.isSkippedEarly) {
      noiseDampenedReels.push(reel.id);
      return;
    }

    const affinities = getReelDomainAffinities(reel);

    Object.entries(affinities).forEach(([domainId, affinityValue]) => {
      if (affinityValue > 0 && domainAccumulator[domainId]) {
        const addedScore = affinityValue * weight * 10;
        domainAccumulator[domainId].totalScore += addedScore;
        domainAccumulator[domainId].contributingReels.push({ reel, weight });
        domainAccumulator[domainId].maxWeight = Math.max(
          domainAccumulator[domainId].maxWeight,
          weight
        );
      }
    });
  });

  // Scale against dynamic saturation capacity
  const SATURATION_CAPACITY = 180;

  const latentScores: LatentDomainScore[] = Object.entries(domainAccumulator)
    .map(([domainId, data]) => {
      const domain = TECH_ONTOLOGY_DOMAINS[domainId];
      if (!domain) return null;

      // Realistic mathematically calculated percentage
      const score = Math.min(94, Math.max(10, Math.round((data.totalScore / SATURATION_CAPACITY) * 100)));

      // Calculated progressive confidence
      let confidence: ConfidenceLevel = 'Low';
      if (data.contributingReels.length >= 3 && data.maxWeight >= 1.3) {
        confidence = 'High';
      } else if (data.contributingReels.length >= 2 || data.maxWeight >= 1.1) {
        confidence = 'Medium';
      }

      // Build structured evidence items
      const evidenceItems: LatentEvidenceItem[] = data.contributingReels.map(({ reel, weight }) => {
        const tags: string[] = [`${reel.telemetry.watchPercentage}% watched`];
        if (reel.telemetry.isLiked) tags.push('Liked');
        if (reel.telemetry.isSaved) tags.push('Saved');
        if (reel.telemetry.isReplayed) tags.push('Replayed');

        return {
          reelId: reel.id,
          reelTitle: reel.title,
          archetype: reel.archetype,
          watchPercentage: reel.telemetry.watchPercentage,
          interactionTags: tags,
          weightContribution: weight,
        };
      });

      const contributingTitles = evidenceItems
        .map((e) => `"${e.reelTitle.split(':')[0]}..."`)
        .join(', ');

      const semanticRationale = evidenceItems.length > 0
        ? `Inferred from ${evidenceItems.length} interaction${evidenceItems.length > 1 ? 's' : ''} (${contributingTitles}) showing genuine interest in ${domain.coreConcepts.slice(0, 2).join(' & ')}.`
        : `No direct high-intent interactions detected.`;

      return {
        domainId,
        domainName: domain.name,
        category: domain.category,
        score,
        confidence,
        contributingReelIds: data.contributingReels.map(d => d.reel.id),
        evidenceItems,
        semanticRationale,
      };
    })
    .filter((d): d is LatentDomainScore => d !== null && d.score >= 10 && d.evidenceItems.length > 0)
    .sort((a, b) => b.score - a.score);

  const primaryInterests = latentScores.slice(0, 3);
  const secondaryInterests = latentScores.slice(3, 6);

  // Overall confidence calculated from interaction count
  let overallConfidence: ConfidenceLevel = 'Low';
  if (primaryInterests.length > 0) {
    if (primaryInterests[0].confidence === 'High' && primaryInterests[0].score >= 60) {
      overallConfidence = 'High';
    } else if (primaryInterests[0].confidence === 'Medium' || meaningfulReels.length >= 2) {
      overallConfidence = 'Medium';
    }
  }

  // Calculate adjacent interests for smart exploration
  const adjacentSet = new Set<string>();
  primaryInterests.forEach((pi) => {
    const domain = TECH_ONTOLOGY_DOMAINS[pi.domainId];
    if (domain) {
      domain.adjacentDomains.forEach((adjId) => {
        const adjDomain = TECH_ONTOLOGY_DOMAINS[adjId];
        if (adjDomain && !primaryInterests.some((p) => p.domainId === adjId)) {
          adjacentSet.add(adjDomain.name);
        }
      });
    }
  });

  return {
    studentId: existingProfile?.studentId || 'student_alex_01',
    studentName: existingProfile?.studentName || 'Alex (Student Learner)',
    primaryInterests,
    secondaryInterests,
    overallConfidence,
    totalInteractionsAnalyzed: meaningfulReels.length,
    noiseDampenedReels,
    preferredDifficulty: (existingProfile?.preferredDifficulty as DifficultyLevel) || 'Intermediate',
    adjacentInterestsToExplore: Array.from(adjacentSet),
    savedReelIds: existingProfile?.savedReelIds || [],
    interestedCategories: existingProfile?.interestedCategories || [],
    dislikedCategories: existingProfile?.dislikedCategories || [],
  };
}
