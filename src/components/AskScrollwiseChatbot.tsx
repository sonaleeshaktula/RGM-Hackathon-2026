import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, X, MessageSquare, ChevronDown, CheckCircle, ShieldAlert, Cpu } from 'lucide-react';
import { StudentInterestProfile, CandidateEvaluationResult, InteractedReel } from '../types';

interface AskScrollwiseChatbotProps {
  studentProfile: StudentInterestProfile;
  topRecommendation: CandidateEvaluationResult;
  interactedReels: InteractedReel[];
  rejectedCandidates: CandidateEvaluationResult[];
  onClose?: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  badge?: string;
}

const PRESET_QUESTIONS = [
  "Why did you recommend this?",
  "What interest did you detect?",
  "Why didn't you recommend another Java Reel?",
  "Why did you reject that AI tools Reel?",
  "What should I learn next if I want to improve my DSA?",
  "How did my interests change?"
];

export const AskScrollwiseChatbot: React.FC<AskScrollwiseChatbotProps> = ({
  studentProfile,
  topRecommendation,
  interactedReels,
  rejectedCandidates,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_1',
      sender: 'assistant',
      text: `👋 Hi! I am **ScrollWise Assistant**. I track your short-form reel interactions in real time to understand what you actually want to learn. Ask me anything about your current recommendations, inferred interests, or why I filtered out certain hype reels!`,
      timestamp: 'Just now',
      badge: 'Context-Aware Agent'
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
        badge: 'Recommendation Agent'
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="flex flex-col h-[520px] max-h-[85vh] w-full rounded-2xl bg-slate-950/95 border border-emerald-500/40 shadow-2xl overflow-hidden backdrop-blur-xl font-sans animate-fadeIn">
      {/* Chatbot Header */}
      <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/20">
            <Bot className="h-4 w-4 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
              ASK SCROLLWISE
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Live Agent
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">
              Explainable recommendation intelligence
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {msg.badge && (
              <span className="text-[9px] font-mono text-emerald-400 mb-0.5 ml-1">
                {msg.badge}
              </span>
            )}
            <div
              className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-sm shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-sm shadow-sm'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>
            </div>
            <span className="text-[9px] text-slate-500 mt-1 px-1 font-mono">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-xs w-24">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Pills Strip */}
      <div className="px-3 py-2 bg-slate-900/60 border-t border-slate-800/80 overflow-x-auto no-scrollbar flex items-center gap-1.5">
        {PRESET_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="flex-shrink-0 px-2.5 py-1 rounded-full bg-slate-900 hover:bg-emerald-950/60 border border-slate-800 hover:border-emerald-500/40 text-[10px] text-slate-300 hover:text-emerald-300 transition-all font-mono"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask why a reel was recommended or rejected..."
          className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-sans"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputText.trim()}
          className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 text-slate-950 font-bold transition-all cursor-pointer"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
