import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { CinematicLanding } from './components/CinematicLanding';
import { FullScreenFeed } from './components/FullScreenFeed';
import { PatternDiscoveryView } from './components/PatternDiscoveryView';
import { RecommendationExperience } from './components/RecommendationExperience';
import { HypeFilterView } from './components/HypeFilterView';
import { HowItWorksSimple } from './components/HowItWorksSimple';
import { AskScrollwiseView } from './components/AskScrollwiseView';

import { INITIAL_INTERACTED_REELS, getTrapDemoPreset } from './data/interactedReels';
import { enrichReelsWithWeights } from './engine/signalWeightEngine';
import { inferStudentInterestProfile } from './engine/latentInferenceEngine';
import { buildRecommendationPipeline } from './engine/explainabilityEngine';
import { applyFeedbackAction, FeedbackAction } from './engine/adaptiveFeedbackEngine';
import { BehavioralTelemetry, InteractedReel, StudentInterestProfile } from './types';

export function App() {
  const initialReels = useMemo(() => enrichReelsWithWeights(INITIAL_INTERACTED_REELS), []);
  const [interactedReels, setInteractedReels] = useState<InteractedReel[]>(initialReels);
  const [selectedReelId, setSelectedReelId] = useState<string>('reel_java_meme');

  const [activeView, setActiveView] = useState<
    'landing' | 'feed' | 'pattern' | 'recommendation' | 'hype-filter' | 'how-it-works' | 'chat'
  >('landing');

  const [feedbackNotification, setFeedbackNotification] = useState<string>('');

  // 1. Recompute student profile dynamically when interacted reels change
  const currentProfile = useMemo(() => {
    return inferStudentInterestProfile(interactedReels);
  }, [interactedReels]);

  // 2. Build full recommendation pipeline
  const pipelineData = useMemo(() => {
    return buildRecommendationPipeline(interactedReels, selectedReelId, currentProfile);
  }, [interactedReels, selectedReelId, currentProfile]);

  // 3. User Feedback & Telemetry Updates
  const handleUpdateTelemetry = (reelId: string, telemetry: Partial<BehavioralTelemetry>) => {
    const updated = interactedReels.map((r) => {
      if (r.id === reelId) {
        return {
          ...r,
          telemetry: {
            ...r.telemetry,
            ...telemetry,
          },
        };
      }
      return r;
    });

    const enriched = enrichReelsWithWeights(updated);
    setInteractedReels(enriched);
  };

  const handleSimulateTrapDemo = () => {
    const preset = enrichReelsWithWeights(getTrapDemoPreset());
    setInteractedReels(preset);
  };

  const handleResetSession = () => {
    const reset = enrichReelsWithWeights(INITIAL_INTERACTED_REELS);
    setInteractedReels(reset);
  };

  const handleFeedback = (action: FeedbackAction) => {
    const { updatedReels, updatedProfile, feedbackNotification: note } = applyFeedbackAction(
      interactedReels,
      currentProfile,
      action,
      INITIAL_INTERACTED_REELS
    );

    setInteractedReels(updatedReels);
    setFeedbackNotification(note);

    setTimeout(() => {
      setFeedbackNotification('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#06090F] text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300 font-sans">
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-3 sm:p-5 flex flex-col justify-center">
        
        {/* VIEW 1: CINEMATIC LANDING INTRO */}
        {activeView === 'landing' && (
          <CinematicLanding
            onStartScrolling={() => setActiveView('feed')}
            onExploreHowItWorks={() => setActiveView('how-it-works')}
          />
        )}

        {/* VIEW 2: FULL-SCREEN REEL FEED EXPERIENCE */}
        {activeView === 'feed' && (
          <FullScreenFeed
            reels={interactedReels}
            studentProfile={currentProfile}
            onUpdateTelemetry={handleUpdateTelemetry}
            onSimulateTrapDemo={handleSimulateTrapDemo}
            onResetSession={handleResetSession}
            onDiscoverPattern={() => setActiveView('pattern')}
            onOpenChat={() => setActiveView('chat')}
          />
        )}

        {/* VIEW 3: PATTERN DISCOVERY (THE MOST IMPORTANT VISUAL MOMENT) */}
        {activeView === 'pattern' && (
          <PatternDiscoveryView
            onProceedToRecommendation={() => setActiveView('recommendation')}
            onBackToFeed={() => setActiveView('feed')}
          />
        )}

        {/* VIEW 4: RECOMMENDATION SHOWCASE */}
        {activeView === 'recommendation' && (
          <RecommendationExperience
            topRecommendation={pipelineData.topRecommendation}
            studentProfile={currentProfile}
            interactedReels={interactedReels}
            outputSpec={pipelineData.outputSpec}
            rejectedCandidates={pipelineData.rejectedCandidates}
            onBackToFeed={() => setActiveView('feed')}
            onFeedback={handleFeedback}
            feedbackNotification={feedbackNotification}
          />
        )}

        {/* VIEW 5: HYPE FILTER REJECTION AUDIT */}
        {activeView === 'hype-filter' && (
          <HypeFilterView
            rejectedCandidates={pipelineData.rejectedCandidates}
          />
        )}

        {/* VIEW 6: HOW IT WORKS (4 SIMPLE STEPS) */}
        {activeView === 'how-it-works' && (
          <HowItWorksSimple
            pipelineData={pipelineData}
            onStartScrolling={() => setActiveView('feed')}
          />
        )}

        {/* VIEW 7: ASK SCROLLWISE (CONTEXT-AWARE AI CHATBOT) */}
        {activeView === 'chat' && (
          <AskScrollwiseView
            studentProfile={currentProfile}
            topRecommendation={pipelineData.topRecommendation}
            interactedReels={interactedReels}
            rejectedCandidates={pipelineData.rejectedCandidates}
          />
        )}
      </main>

      {/* Clean Consumer-Grade Footer */}
      <footer className="bg-[#06090F] border-t border-white/5 py-3 px-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>ScrollWise — AI Latent Interest & Contextual Recommendation Agent</span>
          <span className="text-emerald-400 font-medium">Solo Hackathon Demo Edition</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
