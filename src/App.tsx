import React, { lazy, Suspense, useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';

const CinematicLanding = lazy(() =>
  import('./components/CinematicLanding').then((module) => ({
    default: module.CinematicLanding,
  }))
);

const FullScreenFeed = lazy(() =>
  import('./components/FullScreenFeed').then((module) => ({
    default: module.FullScreenFeed,
  }))
);

const PatternDiscoveryView = lazy(() =>
  import('./components/PatternDiscoveryView').then((module) => ({
    default: module.PatternDiscoveryView,
  }))
);

const RecommendationExperience = lazy(() =>
  import('./components/RecommendationExperience').then((module) => ({
    default: module.RecommendationExperience,
  }))
);

const HypeFilterView = lazy(() =>
  import('./components/HypeFilterView').then((module) => ({
    default: module.HypeFilterView,
  }))
);

const HowItWorksSimple = lazy(() =>
  import('./components/HowItWorksSimple').then((module) => ({
    default: module.HowItWorksSimple,
  }))
);

const AskScrollwiseView = lazy(() =>
  import('./components/AskScrollwiseView').then((module) => ({
    default: module.AskScrollwiseView,
  }))
);

import { INITIAL_INTERACTED_REELS, getTrapDemoPreset } from './data/interactedReels';
import { enrichReelsWithWeights } from './engine/signalWeightEngine';
import { inferStudentInterestProfile } from './engine/latentInferenceEngine';
import { buildRecommendationPipeline } from './engine/explainabilityEngine';
import { applyFeedbackAction, FeedbackAction } from './engine/adaptiveFeedbackEngine';
import { BehavioralTelemetry, InteractedReel } from './types';

export function App() {
  const initialReels = useMemo(
    () => enrichReelsWithWeights(INITIAL_INTERACTED_REELS),
    []
  );

  const [interactedReels, setInteractedReels] =
    useState<InteractedReel[]>(initialReels);

  const [selectedReelId, setSelectedReelId] =
    useState<string>('reel_java_meme');

  const [activeView, setActiveView] = useState<
    'landing' | 'feed' | 'pattern' | 'recommendation' | 'hype-filter' | 'how-it-works' | 'chat'
  >('landing');

  const [feedbackNotification, setFeedbackNotification] =
    useState<string>('');

  const currentProfile = useMemo(() => {
    return inferStudentInterestProfile(interactedReels);
  }, [interactedReels]);

  const pipelineData = useMemo(() => {
    return buildRecommendationPipeline(
      interactedReels,
      selectedReelId,
      currentProfile
    );
  }, [interactedReels, selectedReelId, currentProfile]);

  const handleUpdateTelemetry = (
    reelId: string,
    telemetry: Partial<BehavioralTelemetry>
  ) => {
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
    const {
      updatedReels,
      feedbackNotification: note,
    } = applyFeedbackAction(
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
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full p-3 sm:p-5 flex flex-col justify-center">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="text-sm text-emerald-400 font-mono">
                Loading ScrollWise...
              </div>
            </div>
          }
        >
          {activeView === 'landing' && (
            <CinematicLanding
              onStartScrolling={() => setActiveView('feed')}
              onExploreHowItWorks={() => setActiveView('how-it-works')}
            />
          )}

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

          {activeView === 'pattern' && (
            <PatternDiscoveryView
              onProceedToRecommendation={() =>
                setActiveView('recommendation')
              }
              onBackToFeed={() => setActiveView('feed')}
            />
          )}

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

          {activeView === 'hype-filter' && (
            <HypeFilterView
              rejectedCandidates={pipelineData.rejectedCandidates}
            />
          )}

          {activeView === 'how-it-works' && (
            <HowItWorksSimple
              pipelineData={pipelineData}
              onStartScrolling={() => setActiveView('feed')}
            />
          )}

          {activeView === 'chat' && (
            <AskScrollwiseView
              studentProfile={currentProfile}
              topRecommendation={pipelineData.topRecommendation}
              interactedReels={interactedReels}
              rejectedCandidates={pipelineData.rejectedCandidates}
            />
          )}
        </Suspense>
      </main>

      <footer className="bg-[#06090F] border-t border-white/5 py-3 px-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            ScrollWise — AI Latent Interest & Contextual Recommendation Agent
          </span>
          <span className="text-emerald-400 font-medium">
            Solo Hackathon Demo Edition
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;