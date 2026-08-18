import { CandidateTechReel } from '../types';

export const CANDIDATE_TECH_REELS: CandidateTechReel[] = [
  // 1. TOP WINNER FOR THE TRAP SCENARIO: High Level Design / System Design
  {
    id: 'cand_system_design_microservices',
    title: 'System Design 101: How Microservices Actually Communicate (gRPC vs REST vs Kafka) ⚡',
    creator: '@SystemDesignSimplified',
    category: 'HLD',
    difficulty: 'Intermediate',
    durationSeconds: 15,
    thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    previewGradient: 'from-emerald-600/30 via-teal-900/20 to-slate-900',
    description: 'Learn when real engineering teams choose synchronous gRPC vs asynchronous Kafka event streams, idempotency keys, and circuit breaker patterns to prevent cascading service outages.',
    keyTakeaways: [
      'Synchronous vs Asynchronous message boundaries',
      'Protobuf serialization speed advantages over JSON',
      'Circuit breakers and Dead Letter Queues (DLQ) in production'
    ],
    hypeRiskScore: 0.05,
    hypeIndicators: [],
    substanceScore: 0.95,
    targetDomains: ['domain_swe_arch', 'domain_cloud_devops', 'domain_career_growth'],
    isRepetitiveOrTrivial: false,
    whyUseful: 'Directly extends the student\'s latent software engineering identity into production-grade systems architecture, connecting coding jokes and lifestyle to real-world backend scalability.'
  },

  // 2. HIGH VALUE ADJACENT: Database Internals & Indexing
  {
    id: 'cand_db_btrees_lsm',
    title: 'Database Internals: Why Postgres Uses B-Trees but Cassandra Uses LSM Trees 🗄️',
    creator: '@DeepDiveDatabases',
    category: 'HLD',
    difficulty: 'Intermediate',
    durationSeconds: 15,
    thumbnailUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80',
    previewGradient: 'from-indigo-600/30 via-blue-900/20 to-slate-900',
    description: 'A visual comparison of read-heavy B-Tree node traversals vs write-heavy Log-Structured Merge Trees with MemTables, WALs, and SSTables.',
    keyTakeaways: [
      'B-Tree page lookups & logarithmic read latency',
      'LSM append-only sequential writes for high write throughput',
      'Compaction algorithms and Bloom filter optimizations'
    ],
    hypeRiskScore: 0.04,
    hypeIndicators: [],
    substanceScore: 0.94,
    targetDomains: ['domain_swe_arch', 'domain_hardware_systems'],
    isRepetitiveOrTrivial: false,
    whyUseful: 'Bridges hardware storage mechanics (SSDs/RAM) with high-level software engineering and backend data layer design.'
  },

  // 3. HIGH VALUE ADJACENT: Docker & Linux Virtualization
  {
    id: 'cand_docker_cgroups_namespaces',
    title: 'Docker is NOT a Virtual Machine: Linux Namespaces & cgroups in 60s 🐳',
    creator: '@LinuxUnderTheHood',
    category: 'Cloud',
    difficulty: 'Intermediate',
    durationSeconds: 15,
    thumbnailUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&auto=format&fit=crop&q=80',
    previewGradient: 'from-cyan-600/30 via-sky-900/20 to-slate-900',
    description: 'Demystifying how Linux isolates processes using PID/Network namespaces and constrains CPU/RAM limits using control groups without hypervisor overhead.',
    keyTakeaways: [
      'Namespaces for process isolation (PID, MNT, NET)',
      'cgroups v2 for enforcing hardware resource constraints',
      'Why containers share the host Linux kernel'
    ],
    hypeRiskScore: 0.06,
    hypeIndicators: [],
    substanceScore: 0.92,
    targetDomains: ['domain_cloud_devops', 'domain_hardware_systems', 'domain_swe_arch'],
    isRepetitiveOrTrivial: false,
    whyUseful: 'Capitalizes on the student\'s interest in developer workstation benchmarks and hardware virtualization.'
  },

  // 4. HIGH VALUE CAREER: Senior Engineer Code Review Practices
  {
    id: 'cand_senior_code_reviews',
    title: '5 Things Senior Software Engineers Look For in Code Reviews (That Juniors Miss) 🔍',
    creator: '@StaffEngInsights',
    category: 'Career',
    difficulty: 'Intermediate',
    durationSeconds: 15,
    thumbnailUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80',
    previewGradient: 'from-amber-600/30 via-yellow-900/20 to-slate-900',
    description: 'Beyond syntax and styling: how top engineers evaluate concurrency safety, error boundaries, backward-compatibility, and operational observability.',
    keyTakeaways: [
      'Evaluating failure modes and edge cases',
      'API contract backward compatibility',
      'Adding structured telemetry and logging for production debugging'
    ],
    hypeRiskScore: 0.08,
    hypeIndicators: [],
    substanceScore: 0.90,
    targetDomains: ['domain_career_growth', 'domain_swe_arch'],
    isRepetitiveOrTrivial: false,
    whyUseful: 'Nurtures developer career ambitions into pragmatic engineering excellence without falling into sensationalist salary claims.'
  },

  // 5. HIGH VALUE DSA: Real-world Graph Traversal & BFS/DFS
  {
    id: 'cand_dsa_graphs_social_network',
    title: 'How LinkedIn & Instagram Use Bidirectional BFS for Degrees of Connection 🌐',
    creator: '@AlgorithmsInRealLife',
    category: 'DSA',
    difficulty: 'Intermediate',
    durationSeconds: 15,
    thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    previewGradient: 'from-violet-600/30 via-purple-900/20 to-slate-900',
    description: 'Why standard BFS explodes exponential frontiers on large social graphs and how bidirectional search reduces exploration space from O(b^d) to O(b^(d/2)).',
    keyTakeaways: [
      'Graph adjacency representations in distributed memory',
      'Bidirectional BFS frontier meeting conditions',
      'Real-world graph databases and latency optimizations'
    ],
    hypeRiskScore: 0.05,
    hypeIndicators: [],
    substanceScore: 0.93,
    targetDomains: ['domain_dsa_algos', 'domain_swe_arch'],
    isRepetitiveOrTrivial: false,
    whyUseful: 'Connects academic binary tree interview jokes to impactful real-world graph algorithms and social network engineering.'
  },

  // 6. HIGH VALUE AI FOUNDATIONS: Transformer Attention
  {
    id: 'cand_ai_kv_cache_explained',
    title: 'Why LLM Inference is Slow: The KV Cache Memory Bottleneck Visualized 🧠',
    creator: '@AIEngineeringBreakdown',
    category: 'AI',
    difficulty: 'Advanced',
    durationSeconds: 15,
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80',
    previewGradient: 'from-purple-600/30 via-indigo-900/20 to-slate-900',
    description: 'Understanding autoregressive token generation, how Key-Value caching avoids recalculating attention history, and why GPU memory bandwidth dominates serving costs.',
    keyTakeaways: [
      'Autoregressive generation mechanics',
      'KV Cache memory footprint formulas',
      'PagedAttention & vLLM memory optimization'
    ],
    hypeRiskScore: 0.07,
    hypeIndicators: [],
    substanceScore: 0.96,
    targetDomains: ['domain_ai_ml', 'domain_hardware_systems', 'domain_swe_arch'],
    isRepetitiveOrTrivial: false,
    whyUseful: 'Deep dive into state-of-the-art AI systems engineering and memory constraints.'
  },

  // 7. HIGH VALUE SECURITY: OAuth 2.0 & JWT Security
  {
    id: 'cand_security_jwt_vulnerabilities',
    title: 'Stop Storing JWTs in LocalStorage: 3 OAuth Security Pitfalls in Modern Web Apps 🛡️',
    creator: '@AppSecSimplified',
    category: 'Cybersecurity',
    difficulty: 'Intermediate',
    durationSeconds: 15,
    thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
    previewGradient: 'from-rose-600/30 via-red-900/20 to-slate-900',
    description: 'Why XSS can steal tokens from localStorage, how HttpOnly SameSite cookies protect session state, and implementing token rotation.',
    keyTakeaways: [
      'XSS token theft vectors in browsers',
      'HttpOnly SameSite secure cookie architecture',
      'Refresh token rotation & Revocation lists'
    ],
    hypeRiskScore: 0.05,
    hypeIndicators: [],
    substanceScore: 0.91,
    targetDomains: ['domain_cybersecurity', 'domain_swe_arch'],
    isRepetitiveOrTrivial: false,
    whyUseful: 'Critical web security knowledge for aspiring backend and full-stack software engineers.'
  },

  // 8. REPETITIVE / TRIVIAL CANDIDATE (TO DEMONSTRATE SHALLOW TRAP FILTERING)
  {
    id: 'cand_java_for_loop_basics',
    title: 'Java For-Loop & While-Loop Syntax for Complete Beginners 🔁',
    creator: '@CodeBasics101',
    category: 'Java',
    difficulty: 'Beginner',
    durationSeconds: 15,
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    previewGradient: 'from-amber-600/30 via-slate-800 to-slate-900',
    description: 'Basic syntax tutorial explaining how to write for(int i=0; i<10; i++) and while loops in Java.',
    keyTakeaways: [
      'Loop initialization and condition check',
      'Incrementing counter variables'
    ],
    hypeRiskScore: 0.05,
    hypeIndicators: [],
    substanceScore: 0.40,
    targetDomains: ['domain_java_jvm'],
    isRepetitiveOrTrivial: true,
    whyUseful: 'Too basic and repetitive. Only teaches basic syntax loops without engineering depth.'
  },

  // 9. REPETITIVE / TRIVIAL CANDIDATE 2
  {
    id: 'cand_java_variable_types',
    title: 'What is int, double and String in Java? Beginner Guide ☕',
    creator: '@JavaSyntaxDaily',
    category: 'Java',
    difficulty: 'Beginner',
    durationSeconds: 15,
    thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80',
    previewGradient: 'from-orange-600/30 via-slate-800 to-slate-900',
    description: 'Explaining primitive data types in Java.',
    keyTakeaways: ['int for integers', 'String for text'],
    hypeRiskScore: 0.02,
    hypeIndicators: [],
    substanceScore: 0.35,
    targetDomains: ['domain_java_jvm'],
    isRepetitiveOrTrivial: true,
    whyUseful: 'Obvious syntax tutorial with no architectural or engineering substance.'
  },

  // 10. HYPE / LOW-VALUE CANDIDATE
  {
    id: 'cand_hype_10_ai_tools_job',
    title: '10 AI Tools That Will GUARANTEE You Get a $200k FAANG Job in 24 Hours! 🚀🤑',
    creator: '@TechGuruHypeMaster',
    category: 'AI',
    difficulty: 'Beginner',
    durationSeconds: 15,
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    previewGradient: 'from-red-600/40 via-purple-900/30 to-slate-900',
    description: 'Drop out of university and stop learning data structures! Just copy-paste these 10 secret ChatGPT prompts into your resume and get hired immediately with zero technical interview.',
    keyTakeaways: [
      'Unsubstantiated 24h job guarantee claims',
      'No engineering concepts taught',
      'Sensationalist clickbait hook'
    ],
    hypeRiskScore: 0.95,
    hypeIndicators: [
      'Sensationalist timeline claims ("Get hired in 24h")',
      'Unsubstantiated $200k salary guarantees',
      'Zero technical substance / surface-level prompt spamming',
      'Promotes bypassing foundational engineering learning'
    ],
    substanceScore: 0.10,
    targetDomains: ['domain_ai_ml', 'domain_career_growth'],
    isRepetitiveOrTrivial: false,
    whyUseful: 'Zero educational value. Flagged by ScrollWise Hype Filter for extreme clickbait and misleading career shortcuts.'
  },

  // 11. HYPE / LOW-VALUE CANDIDATE 2
  {
    id: 'cand_hype_replace_all_devs',
    title: 'Software Engineers are DEAD! This 1 Tool Writes Complete Fullstack Apps in 10 Seconds 🤖💀',
    creator: '@ClickbaitCoder',
    category: 'AI',
    difficulty: 'Beginner',
    durationSeconds: 15,
    thumbnailUrl: 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=600&auto=format&fit=crop&q=80',
    previewGradient: 'from-rose-600/40 via-red-900/30 to-slate-900',
    description: 'Why you should stop learning coding right now because this new AI website generator makes software engineers obsolete by next Tuesday.',
    keyTakeaways: [
      'Sensational doom-mongering hook',
      'Misleading representation of software engineering scope',
      'Affiliate link promotion with zero architectural reasoning'
    ],
    hypeRiskScore: 0.92,
    hypeIndicators: [
      'Sensationalist claims ("Engineers are DEAD")',
      'Oversimplified software engineering scope',
      'Low evidence-based value'
    ],
    substanceScore: 0.12,
    targetDomains: ['domain_ai_ml', 'domain_career_growth'],
    isRepetitiveOrTrivial: false,
    whyUseful: 'Sensationalist fearmongering with no pedagogical merit.'
  },

  // 12. HYPE / LOW-VALUE CANDIDATE 3
  {
    id: 'cand_hype_cheat_code_interviews',
    title: 'The Secret Coding Interview CHEAT CODE They Don\'t Want You To Know! 🤫',
    creator: '@InterviewHacks99',
    category: 'Career',
    difficulty: 'Beginner',
    durationSeconds: 15,
    thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    previewGradient: 'from-amber-600/40 via-red-900/30 to-slate-900',
    description: 'Use this 1 psychological trick on your Google interviewer so you never have to solve any graph or dynamic programming problem.',
    keyTakeaways: [
      'Misleading interview advice',
      'Encourages memorization tricks over problem solving',
      'Zero algorithmic rigor'
    ],
    hypeRiskScore: 0.88,
    hypeIndicators: [
      'Unsubstantiated "Secret Cheat Code" claim',
      'Advises skipping algorithmic foundations',
      'Low educational substance'
    ],
    substanceScore: 0.15,
    targetDomains: ['domain_dsa_algos', 'domain_career_growth'],
    isRepetitiveOrTrivial: false,
    whyUseful: 'Misleading shortcut advice with zero technical merit.'
  }
];
