import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, MessageSquare, CheckCircle, ShieldAlert, Cpu } from 'lucide-react';
import { StudentInterestProfile, CandidateEvaluationResult, InteractedReel } from '../types';

interface AskScrollwiseViewProps {
  studentProfile: StudentInterestProfile;
  topRecommendation: CandidateEvaluationResult;
  interactedReels: InteractedReel[];
  rejectedCandidates: CandidateEvaluationResult[];
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const PRESET_QUESTIONS = [
  "Why did you recommend this?",
  "What interest did you detect?",
  "Why didn't you recommend another Java Reel?",
  "Why was that AI tools Reel rejected?",
  "What should I learn next for DSA?",
  "How did my interests change?"
];

export const AskScrollwiseView: React.FC<AskScrollwiseViewProps> = ({
  studentProfile,
  topRecommendation,
  interactedReels,
  rejectedCandidates,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_1',
      sender: 'assistant',
      text: `👋 Hi! I am **ScrollWise Assistant**. I track your short-form reel interactions in real time to understand what you actually want to learn.\n\nAsk me anything about your current recommendation, inferred interests, or why I filtered out certain hype reels!`,
      timestamp: 'Just now',
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const primaryDomain = studentProfile.primaryInterests[0]?.domainName || 'Software Engineering & Technology';
  const rec = topRecommendation.candidate;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateAnswer = (userQuery: string): string => {
    const q = userQuery.toLowerCase();

    if (q.includes('why did you recommend') || q.includes('why this') || q.includes('choose this')) {
      return `🎯 **Why I recommended "${rec.title}"**:
      
1. **Behavioral Evidence**: Across your feed, you spent high watch time on programming memes, workstation hardware, and developer career vlogs.
2. **Latent Synthesis**: Instead of locking you into shallow Java syntax tutorials, I synthesized a broader interest in **${primaryDomain}**.
3. **High Educational Substance**: This recommendation covers **${rec.category}** (${rec.difficulty} level) with a **${topRecommendation.scores.compositeScore}% match score**, bridging theory to actual production systems.`;
    }

    if (q.includes('interest did you detect') || q.includes('what interest') || q.includes('detected')) {
      const top3 = studentProfile.primaryInterests.slice(0, 3).map(i => `• **${i.domainName}** (${(i.score * 100).toFixed(0)}% weight)`).join('\n');
      return `🔍 **Inferred Latent Interests**:

Based on your current interactions, your strongest learning signals are:
${top3}

Confidence Level: **High**. You engaged most deeply with developer lifestyle, database humor, and hardware benchmarks.`;
    }

    if (q.includes('java') || q.includes('another java') || q.includes('trap')) {
      return `☕ **The Java Trap Breakdown**:

A naive algorithm sees you watched a Java meme and immediately queues 10 more beginner Java loop tutorials.

**ScrollWise outsmarts this**:
• Your Java meme interaction + SWE lifestyle + coding interview jokes collectively indicate an interest in **software engineering practices**, not just beginner language syntax.
• So I recommended **${rec.title}** (${rec.category}) to advance your architectural knowledge instead of repeating what you already know!`;
    }

    if (q.includes('reject') || q.includes('ai tool') || q.includes('hype')) {
      const hype = rejectedCandidates.find(c => c.candidate.title.toLowerCase().includes('ai tool'))?.candidate;
      return `🛡️ **Why I Filtered Out "${hype ? hype.title : '10 AI Tools That Will Get You a Job'}"**:

❌ **Rejection Category**: HYPE_RISK
• **Sensationalist Claims**: Promises of "$200k salary in 24 hours" with zero evidence.
• **Low Substance**: Only surface-level prompt lists without teaching core engineering foundations.
• **Educational Standard**: ScrollWise prioritizes high-substance systems knowledge over clickbait.`;
    }

    if (q.includes('dsa') || q.includes('data structure') || q.includes('algorithm')) {
      return `💡 **DSA Next Step Recommendation**:

Since you engaged with binary tree whiteboard vs production code:
• Next high-value topic: **"Graph Algorithms in Production: Why Real Systems Use BFS/DFS for Dependency Trees & Social Networks"**.
• This connects algorithmic problem-solving directly to scalable software architecture.`;
    }

    if (q.includes('change') || q.includes('how did my interest') || q.includes('updated')) {
      return `📊 **How Your Profile Updates Live**:

Every interaction acts as a vector signal:
• **Like / Bookmark**: Provides a 2.5x strong positive reinforcement to the topic domain.
• **Watch Duration > 80%**: Signals high comprehension interest.
• **Early Skip (<30%)**: Attenuates noise (such as casual gaming reels).
Your current dominant profile is **${primaryDomain}**.`;
    }

    return `🤖 Based on your watched history (${interactedReels.length} reels), you are primarily focused on **${primaryDomain}**. 

I recommended **"${rec.title}"** because it delivers high educational substance in **${rec.category}** without hype. Feel free to click any of the suggested questions below!`;
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const answer = generateAnswer(query);
      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'assistant',
        text: answer,
        timestamp: 'Just now',
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 py-4 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-1.5 pb-2 border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-mono text-emerald-300">
          <Bot className="h-4 w-4 text-emerald-400" />
          <span>Interactive AI Explainer</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          ASK SCROLLWISE
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Understand why a topic was recommended, how your interests were inferred, and why hype reels were rejected.
        </p>
      </div>

      {/* Main Chat Window */}
      <div className="flex flex-col h-[520px] max-h-[70vh] rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
        
        {/* Chat Messages */}
        <div className="flex-1 p-5 overflow-y-auto space-y-3.5 text-xs sm:text-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-3xl leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-500 text-slate-950 font-bold rounded-tr-sm shadow-md'
                    : 'bg-slate-950 border border-white/10 text-slate-200 rounded-tl-sm shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>
              </div>
              <span className="text-[10px] text-slate-500 mt-1 px-1 font-mono">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-950 border border-white/10 text-slate-400 text-xs w-24">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2.5 bg-slate-950/80 border-t border-white/10 overflow-x-auto no-scrollbar flex items-center gap-2">
          {PRESET_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-emerald-950/70 border border-white/10 hover:border-emerald-500/40 text-xs text-slate-300 hover:text-emerald-300 transition-all font-mono cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-4 bg-slate-950 border-t border-white/10 flex items-center gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask why a reel was recommended or how your interests changed..."
            className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-900 border border-white/10 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="p-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-black transition-all cursor-pointer"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
