import { InteractedReel } from '../types';

/**
 * Clean initial sample dataset for ScrollWise with 0 initial interactions.
 * Signals are recorded dynamically as the user scrolls, watches, likes, and saves.
 */
export const INITIAL_INTERACTED_REELS: InteractedReel[] = [
  {
    id: 'reel_java_meme',
    title: 'When NullPointerException hits at 3:00 AM in production 💀',
    creator: '@DevHumorDaily',
    category: 'Java',
    archetype: '😂 Programming Memes',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    previewGradient: 'from-amber-600/40 via-orange-900/30 to-slate-900',
    videoSimUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    transcriptExcerpt: 'Everything passed in staging. We push to prod at midnight. Then Boom: NullPointerException at line 402 on an uninitialized Optional builder.',
    semanticTags: ['Java', 'Debugging', 'NullPointerException', 'Production Deployments', 'Backend Runtime'],
    telemetry: {
      watchPercentage: 0,
      durationSeconds: 15,
      timeSpentSeconds: 0,
      isLiked: false,
      isSaved: false,
      isReplayed: false,
      isShared: false,
      isSkippedEarly: false,
    },
    inferredMicroInterests: ['Backend Reliability', 'Software Debugging', 'JVM Runtime Mechanics']
  },
  {
    id: 'reel_swe_lifestyle',
    title: 'Day in the Life: Distributed Systems Backend Engineer ☕💻',
    creator: '@EngineersInTech',
    category: 'Career',
    archetype: '🎯 Career',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
    previewGradient: 'from-indigo-600/40 via-blue-900/30 to-slate-900',
    videoSimUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    transcriptExcerpt: '8:30 AM coffee, 9:00 standup for cross-region replication service. 10:30 design doc review for database sharding to handle 500k QPS.',
    semanticTags: ['Software Engineering', 'System Design', 'Backend Architecture', 'Career Growth', 'Tech Lifestyle'],
    telemetry: {
      watchPercentage: 0,
      durationSeconds: 15,
      timeSpentSeconds: 0,
      isLiked: false,
      isSaved: false,
      isReplayed: false,
      isShared: false,
      isSkippedEarly: false,
    },
    inferredMicroInterests: ['High Level Design', 'Distributed Systems', 'Engineering Best Practices', 'Tech Career Progression']
  },
  {
    id: 'reel_coding_interview',
    title: 'Inverting a Binary Tree on Whiteboard vs Actual Production 🌳',
    creator: '@AlgorithmMastery',
    category: 'DSA',
    archetype: '💻 Coding / DSA',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516116211227-bbc13c631b0e?w=600&auto=format&fit=crop&q=80',
    previewGradient: 'from-emerald-600/40 via-teal-900/30 to-slate-900',
    videoSimUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    transcriptExcerpt: 'Interviewer: Can you invert this binary tree in O(n)? Me in interview: flawless recursion. Me on the job: writes a microservice API call with retry policy.',
    semanticTags: ['DSA', 'Binary Trees', 'Technical Interviews', 'Problem Solving', 'Production Code'],
    telemetry: {
      watchPercentage: 0,
      durationSeconds: 15,
      timeSpentSeconds: 0,
      isLiked: false,
      isSaved: false,
      isReplayed: false,
      isShared: false,
      isSkippedEarly: false,
    },
    inferredMicroInterests: ['Algorithm Complexity', 'Tree Structures', 'Technical Interviewing', 'Practical Software Engineering']
  },
  {
    id: 'reel_laptop_comparison',
    title: 'ThinkPad P1 vs M3 Max MacBook Pro for Local Docker & Virtualization 💻',
    creator: '@DevHardwareLab',
    category: 'Hardware',
    archetype: '📱 Gadgets',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    previewGradient: 'from-purple-600/40 via-slate-900 to-black',
    videoSimUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    transcriptExcerpt: 'Compiling a 250k line Rust workspace with 18 Docker containers running simultaneously. Comparing thermal throttling and memory pressure on x86 vs ARM.',
    semanticTags: ['Hardware Specs', 'Developer Workstation', 'Docker Virtualization', 'Systems Performance', 'ARM vs x86'],
    telemetry: {
      watchPercentage: 0,
      durationSeconds: 15,
      timeSpentSeconds: 0,
      isLiked: false,
      isSaved: false,
      isReplayed: false,
      isShared: false,
      isSkippedEarly: false,
    },
    inferredMicroInterests: ['Systems Performance', 'Workstation Tooling', 'Virtualization Architecture', 'Memory Optimization']
  },
  {
    id: 'reel_ai_transformers',
    title: 'How Transformer Attention Heads Actually Calculate Query-Key-Value Math 🤖',
    creator: '@NeuralDeepDive',
    category: 'AI',
    archetype: '🤖 AI',
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80',
    previewGradient: 'from-cyan-600/40 via-blue-900/30 to-slate-900',
    videoSimUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    transcriptExcerpt: 'Let us step through matrix multiplication of the Q, K, and V tensors in self-attention with scaling factor 1/sqrt(d_k).',
    semanticTags: ['AI', 'Transformers', 'Self-Attention', 'Neural Networks', 'Linear Algebra'],
    telemetry: {
      watchPercentage: 0,
      durationSeconds: 15,
      timeSpentSeconds: 0,
      isLiked: false,
      isSaved: false,
      isReplayed: false,
      isShared: false,
      isSkippedEarly: false,
    },
    inferredMicroInterests: ['Deep Learning Theory', 'Attention Mechanisms', 'Transformer Architecture']
  },
  {
    id: 'reel_tech_news_rust',
    title: 'Linux Kernel 6.12 Officially Expands Rust Drivers in Core Subsystems 📰',
    creator: '@TechChronicle',
    category: 'Other',
    archetype: '📰 Tech News',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&auto=format&fit=crop&q=80',
    previewGradient: 'from-orange-600/40 via-amber-900/30 to-slate-900',
    videoSimUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    transcriptExcerpt: 'Linus Torvalds merges new Rust abstractions for device drivers, memory safety guarantees, and zero-cost abstractions.',
    semanticTags: ['Tech News', 'Linux Kernel', 'Rust Language', 'Systems Programming', 'Memory Safety'],
    telemetry: {
      watchPercentage: 0,
      durationSeconds: 15,
      timeSpentSeconds: 0,
      isLiked: false,
      isSaved: false,
      isReplayed: false,
      isShared: false,
      isSkippedEarly: false,
    },
    inferredMicroInterests: ['Kernel Programming', 'Memory Safety', 'Open Source Ecosystem']
  },
  {
    id: 'reel_gaming_unreal',
    title: 'Unreal Engine 5.5 Nanite & Lumen Rendering Stress Test in 4K 🎮',
    creator: '@GamerBenchmark',
    category: 'Other',
    archetype: '🎮 Gaming',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    previewGradient: 'from-purple-600/40 via-violet-900/30 to-slate-900',
    videoSimUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
    transcriptExcerpt: 'Testing real-time global illumination and geometry virtualization with 50 million polygons at 60 FPS on RTX 4090.',
    semanticTags: ['Gaming', 'Unreal Engine', 'Graphics Rendering', 'GPU Benchmarks'],
    telemetry: {
      watchPercentage: 0,
      durationSeconds: 15,
      timeSpentSeconds: 0,
      isLiked: false,
      isSaved: false,
      isReplayed: false,
      isShared: false,
      isSkippedEarly: false,
    },
    inferredMicroInterests: ['Game Tech', 'Graphics Pipelines']
  },
  {
    id: 'reel_entertainment_cinema',
    title: 'Top 10 Sci-Fi Movie Cyberpunk Visuals Ranked 🎬',
    creator: '@CinemaVisions',
    category: 'Other',
    archetype: '🎬 Entertainment',
    thumbnailUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=600&auto=format&fit=crop&q=80',
    previewGradient: 'from-pink-600/40 via-rose-900/30 to-slate-900',
    videoSimUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    transcriptExcerpt: 'From Blade Runner 2049 to Tron Legacy, exploring neon cinematography, anamorphic lens flares, and dystopian aesthetics.',
    semanticTags: ['Entertainment', 'Movies', 'Sci-Fi', 'Cinematography'],
    telemetry: {
      watchPercentage: 0,
      durationSeconds: 15,
      timeSpentSeconds: 0,
      isLiked: false,
      isSaved: false,
      isReplayed: false,
      isShared: false,
      isSkippedEarly: false,
    },
    inferredMicroInterests: ['Cinematography', 'Casual Entertainment']
  }
];

/**
 * Pre-configured Trap Preset (Java Meme + SWE Lifestyle + Coding Interview + Laptop Benchmarks)
 * Useful for automated verification tests and instant demo simulation.
 */
export function getTrapDemoPreset(): InteractedReel[] {
  return INITIAL_INTERACTED_REELS.map((r) => {
    if (r.id === 'reel_java_meme') {
      return {
        ...r,
        telemetry: {
          watchPercentage: 88,
          durationSeconds: 15,
          timeSpentSeconds: 13.2,
          isLiked: true,
          isSaved: false,
          isReplayed: false,
          isShared: false,
          isSkippedEarly: false,
        },
      };
    }
    if (r.id === 'reel_swe_lifestyle') {
      return {
        ...r,
        telemetry: {
          watchPercentage: 100,
          durationSeconds: 15,
          timeSpentSeconds: 15.0,
          isLiked: true,
          isSaved: true,
          isReplayed: true,
          isShared: true,
          isSkippedEarly: false,
        },
      };
    }
    if (r.id === 'reel_coding_interview') {
      return {
        ...r,
        telemetry: {
          watchPercentage: 94,
          durationSeconds: 15,
          timeSpentSeconds: 14.1,
          isLiked: true,
          isSaved: false,
          isReplayed: false,
          isShared: false,
          isSkippedEarly: false,
        },
      };
    }
    if (r.id === 'reel_laptop_comparison') {
      return {
        ...r,
        telemetry: {
          watchPercentage: 92,
          durationSeconds: 15,
          timeSpentSeconds: 13.8,
          isLiked: false,
          isSaved: true,
          isReplayed: false,
          isShared: false,
          isSkippedEarly: false,
        },
      };
    }
    return r;
  });
}
