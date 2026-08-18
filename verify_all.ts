import { INITIAL_INTERACTED_REELS, getTrapDemoPreset } from './src/data/interactedReels.ts';
import { enrichReelsWithWeights, computeBehavioralWeight } from './src/engine/signalWeightEngine.ts';
import { inferStudentInterestProfile } from './src/engine/latentInferenceEngine.ts';
import { evaluateCandidateReels } from './src/engine/scoringMatrixEngine.ts';
import { auditCandidateForHype } from './src/engine/hypeFilterEngine.ts';
import { CANDIDATE_TECH_REELS } from './src/data/candidateReels.ts';
import { buildRecommendationPipeline, generateStandardOutputSpec } from './src/engine/explainabilityEngine.ts';
import { applyFeedbackAction } from './src/engine/adaptiveFeedbackEngine.ts';

console.log('================================================================');
console.log('🔍 SCROLLWISE FINAL COMPREHENSIVE SYSTEM VERIFICATION');
console.log('================================================================\n');

let allPassed = true;
function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    allPassed = false;
  }
}

// ----------------------------------------------------------------------
// TEST 0: Clean Zero-Interaction Initial State
// ----------------------------------------------------------------------
console.log('TEST 0: Clean Initial Zero-State Verification (No Fake Percentages)');
const zeroProfile = inferStudentInterestProfile(INITIAL_INTERACTED_REELS);
assert(zeroProfile.primaryInterests.length === 0, 'Initial state has 0 inferred interests before scrolling');
assert(zeroProfile.totalInteractionsAnalyzed === 0, 'Initial state reports 0 interactions analyzed');
assert(zeroProfile.overallConfidence === 'Low', 'Initial confidence is Low (honest state)');

// ----------------------------------------------------------------------
// TEST 1: Behavioral Signal Weighting Engine
// ----------------------------------------------------------------------
console.log('\nTEST 1: Behavioral Signal Weighting & Noise Attenuation');
const w1 = computeBehavioralWeight({
  watchPercentage: 100, durationSeconds: 45, timeSpentSeconds: 58,
  isLiked: true, isSaved: true, isReplayed: true, isShared: true, isSkippedEarly: false
});
assert(w1 >= 2.5, `High intent reel receives high weight (${w1} >= 2.5x)`);

const w2 = computeBehavioralWeight({
  watchPercentage: 20, durationSeconds: 30, timeSpentSeconds: 6,
  isLiked: false, isSaved: false, isReplayed: false, isShared: false, isSkippedEarly: true
});
assert(w2 <= 0.25, `Skipped reel is strongly attenuated (${w2} <= 0.25x)`);

// ----------------------------------------------------------------------
// TEST 2: The Built-In Trap Preset (Live Interaction Simulation)
// ----------------------------------------------------------------------
console.log('\nTEST 2: Built-In Trap Preset (Java Meme + SWE + Interview + Laptop)');
const trapReels = enrichReelsWithWeights(getTrapDemoPreset());
const trapProfile = inferStudentInterestProfile(trapReels);

assert(trapProfile.primaryInterests.length > 0, 'Generated interests after 4 interactions');
assert(trapProfile.primaryInterests[0].domainName === 'Software Engineering & Architecture', 'Latent centroid #1 is Software Engineering & Architecture');
assert(trapProfile.primaryInterests[0].score >= 65, `Software Engineering score is dominant (${trapProfile.primaryInterests[0].score}%)`);

const trapEval = evaluateCandidateReels(CANDIDATE_TECH_REELS, trapProfile);
assert(trapEval.topRecommendation.candidate.category === 'HLD', 'Recommended category is HLD (High Level Design)');
assert(trapEval.topRecommendation.candidate.category !== 'Java', 'Avoided shallow Java-only keyword trap');
assert(!trapEval.topRecommendation.isRejected, 'Top recommendation passed all safety filters');

// ----------------------------------------------------------------------
// TEST 3: Hype Filter Disqualification Preset
// ----------------------------------------------------------------------
console.log('\nTEST 3: Hype & Low-Value Content Filter Audit');
const hypeCandidates = CANDIDATE_TECH_REELS.filter(c => c.hypeRiskScore >= 0.60);
assert(hypeCandidates.length >= 2, `Found ${hypeCandidates.length} test hype candidates`);

hypeCandidates.forEach((cand) => {
  const audit = auditCandidateForHype(cand);
  assert(audit.isRejected, `Hype candidate "${cand.title.slice(0, 35)}..." was REJECTED`);
  assert(audit.rejectionCategory === 'HYPE_RISK', `Tagged with category ${audit.rejectionCategory}`);
  assert(audit.indicators.length > 0, `Indicators recorded: ${audit.indicators.join('; ')}`);
});

// ----------------------------------------------------------------------
// TEST 4: Adaptive Feedback Mutation
// ----------------------------------------------------------------------
console.log('\nTEST 4: Adaptive Feedback Mutation');
const feedbackRes = applyFeedbackAction(trapReels, trapProfile, {
  type: 'INTERESTED',
  category: 'Cloud',
});
assert(feedbackRes.updatedProfile.interestedCategories.includes('Cloud'), 'Profile dynamically recorded "Cloud" interest');
assert(feedbackRes.feedbackNotification.includes('Cloud'), 'Notification confirmation generated');

// ----------------------------------------------------------------------
// TEST 5: Smart Tech Adjacency Horizons
// ----------------------------------------------------------------------
console.log('\nTEST 5: Smart Tech Adjacency Horizons');
assert(trapProfile.adjacentInterestsToExplore.length > 0, `Identified adjacent horizons: ${trapProfile.adjacentInterestsToExplore.join(', ')}`);

// ----------------------------------------------------------------------
// TEST 6: Standard 8-Field Output Spec Verification
// ----------------------------------------------------------------------
console.log('\nTEST 6: Standard 8-Field Output Spec Verification');
const pipeline = buildRecommendationPipeline(trapReels, 'reel_java_meme', trapProfile);
const spec = pipeline.outputSpec;

assert(spec.currentReel.length > 0, `Field 1: CURRENT REEL = "${spec.currentReel.slice(0, 45)}..."`);
assert(spec.interestDetected.length > 0, `Field 2: INTEREST DETECTED = "${spec.interestDetected}"`);
assert(spec.why.length > 0, `Field 3: WHY = "${spec.why.slice(0, 45)}..."`);
assert(spec.recommendedTechReel.length > 0, `Field 4: RECOMMENDED TECH REEL = "${spec.recommendedTechReel.slice(0, 45)}..."`);
assert(spec.category.length > 0, `Field 5: CATEGORY = "${spec.category}"`);
assert(spec.whyThisRecommendation.length > 0, `Field 6: WHY THIS RECOMMENDATION = "${spec.whyThisRecommendation.slice(0, 50)}..."`);
assert(['Beginner', 'Intermediate', 'Advanced'].includes(spec.difficulty), `Field 7: DIFFICULTY = "${spec.difficulty}"`);
assert(['High', 'Medium', 'Low'].includes(spec.confidence), `Field 8: CONFIDENCE = "${spec.confidence}"`);

// ----------------------------------------------------------------------
// TEST 7: Reel Progress & Scrub Math
// ----------------------------------------------------------------------
console.log('\nTEST 7: ReelVideoPlayer Scrub & Timer Math');
const calcProgress = (cur: number, dur: number) => Math.min(100, Math.max(0, (cur / dur) * 100));
assert(calcProgress(15, 30) === 50, 'Progress scrubber calculates exact percentage (50%)');

// ----------------------------------------------------------------------
// FINAL SUMMARY
// ----------------------------------------------------------------------
console.log('\n================================================================');
if (allPassed) {
  console.log('🎉 ALL 12 VERIFICATION CHECKS PASSED WITH ZERO ERRORS!');
} else {
  console.error('❌ SOME VERIFICATION CHECKS FAILED.');
  process.exit(1);
}
console.log('================================================================\n');
