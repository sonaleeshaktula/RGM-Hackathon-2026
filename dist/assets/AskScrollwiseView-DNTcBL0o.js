import{c as k,r as o,j as t,B as N}from"./index-BaDWpLkO.js";/**
 * @license lucide-react v1.31.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],$=k("send",I),E=["Why did you recommend this?","What interest did you detect?","Why didn't you recommend another Java Reel?","Why was that AI tools Reel rejected?","What should I learn next for DSA?","How did my interests change?"],W=({studentProfile:u,topRecommendation:m,interactedReels:b,rejectedCandidates:v})=>{var f;const[h,x]=o.useState([{id:"welcome_1",sender:"assistant",text:`👋 Hi! I am **ScrollWise Assistant**. I track your short-form reel interactions in real time to understand what you actually want to learn.

Ask me anything about your current recommendation, inferred interests, or why I filtered out certain hype reels!`,timestamp:"Just now"}]),[l,p]=o.useState(""),[y,g]=o.useState(!1),w=o.useRef(null),d=((f=u.primaryInterests[0])==null?void 0:f.domainName)||"Software Engineering & Technology",a=m.candidate;o.useEffect(()=>{var s;(s=w.current)==null||s.scrollIntoView({behavior:"smooth"})},[h,y]);const j=s=>{var i;const e=s.toLowerCase();if(e.includes("why did you recommend")||e.includes("why this")||e.includes("choose this"))return`🎯 **Why I recommended "${a.title}"**:
      
1. **Behavioral Evidence**: Across your feed, you spent high watch time on programming memes, workstation hardware, and developer career vlogs.
2. **Latent Synthesis**: Instead of locking you into shallow Java syntax tutorials, I synthesized a broader interest in **${d}**.
3. **High Educational Substance**: This recommendation covers **${a.category}** (${a.difficulty} level) with a **${m.scores.compositeScore}% match score**, bridging theory to actual production systems.`;if(e.includes("interest did you detect")||e.includes("what interest")||e.includes("detected"))return`🔍 **Inferred Latent Interests**:

Based on your current interactions, your strongest learning signals are:
${u.primaryInterests.slice(0,3).map(n=>`• **${n.domainName}** (${(n.score*100).toFixed(0)}% weight)`).join(`
`)}

Confidence Level: **High**. You engaged most deeply with developer lifestyle, database humor, and hardware benchmarks.`;if(e.includes("java")||e.includes("another java")||e.includes("trap"))return`☕ **The Java Trap Breakdown**:

A naive algorithm sees you watched a Java meme and immediately queues 10 more beginner Java loop tutorials.

**ScrollWise outsmarts this**:
• Your Java meme interaction + SWE lifestyle + coding interview jokes collectively indicate an interest in **software engineering practices**, not just beginner language syntax.
• So I recommended **${a.title}** (${a.category}) to advance your architectural knowledge instead of repeating what you already know!`;if(e.includes("reject")||e.includes("ai tool")||e.includes("hype")){const r=(i=v.find(n=>n.candidate.title.toLowerCase().includes("ai tool")))==null?void 0:i.candidate;return`🛡️ **Why I Filtered Out "${r?r.title:"10 AI Tools That Will Get You a Job"}"**:

❌ **Rejection Category**: HYPE_RISK
• **Sensationalist Claims**: Promises of "$200k salary in 24 hours" with zero evidence.
• **Low Substance**: Only surface-level prompt lists without teaching core engineering foundations.
• **Educational Standard**: ScrollWise prioritizes high-substance systems knowledge over clickbait.`}return e.includes("dsa")||e.includes("data structure")||e.includes("algorithm")?`💡 **DSA Next Step Recommendation**:

Since you engaged with binary tree whiteboard vs production code:
• Next high-value topic: **"Graph Algorithms in Production: Why Real Systems Use BFS/DFS for Dependency Trees & Social Networks"**.
• This connects algorithmic problem-solving directly to scalable software architecture.`:e.includes("change")||e.includes("how did my interest")||e.includes("updated")?`📊 **How Your Profile Updates Live**:

Every interaction acts as a vector signal:
• **Like / Bookmark**: Provides a 2.5x strong positive reinforcement to the topic domain.
• **Watch Duration > 80%**: Signals high comprehension interest.
• **Early Skip (<30%)**: Attenuates noise (such as casual gaming reels).
Your current dominant profile is **${d}**.`:`🤖 Based on your watched history (${b.length} reels), you are primarily focused on **${d}**. 

I recommended **"${a.title}"** because it delivers high educational substance in **${a.category}** without hype. Feel free to click any of the suggested questions below!`},c=s=>{const e=s||l.trim();if(!e)return;const i={id:`user_${Date.now()}`,sender:"user",text:e,timestamp:"Just now"};x(r=>[...r,i]),s||p(""),g(!0),setTimeout(()=>{const r=j(e),n={id:`bot_${Date.now()}`,sender:"assistant",text:r,timestamp:"Just now"};x(S=>[...S,n]),g(!1)},400)};return t.jsxs("div",{className:"max-w-4xl mx-auto space-y-4 py-4 animate-fadeIn",children:[t.jsxs("div",{className:"text-center space-y-1.5 pb-2 border-b border-white/10",children:[t.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-mono text-emerald-300",children:[t.jsx(N,{className:"h-4 w-4 text-emerald-400"}),t.jsx("span",{children:"Interactive AI Explainer"})]}),t.jsx("h2",{className:"text-3xl sm:text-4xl font-black text-white tracking-tight",children:"ASK SCROLLWISE"}),t.jsx("p",{className:"text-xs sm:text-sm text-slate-400 max-w-lg mx-auto",children:"Understand why a topic was recommended, how your interests were inferred, and why hype reels were rejected."})]}),t.jsxs("div",{className:"flex flex-col h-[520px] max-h-[70vh] rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl",children:[t.jsxs("div",{className:"flex-1 p-5 overflow-y-auto space-y-3.5 text-xs sm:text-sm",children:[h.map(s=>t.jsxs("div",{className:`flex flex-col ${s.sender==="user"?"items-end":"items-start"}`,children:[t.jsx("div",{className:`max-w-[85%] p-4 rounded-3xl leading-relaxed ${s.sender==="user"?"bg-emerald-500 text-slate-950 font-bold rounded-tr-sm shadow-md":"bg-slate-950 border border-white/10 text-slate-200 rounded-tl-sm shadow-sm"}`,children:t.jsx("div",{className:"whitespace-pre-line",children:s.text})}),t.jsx("span",{className:"text-[10px] text-slate-500 mt-1 px-1 font-mono",children:s.timestamp})]},s.id)),y&&t.jsxs("div",{className:"flex items-center gap-1.5 p-3 rounded-2xl bg-slate-950 border border-white/10 text-slate-400 text-xs w-24",children:[t.jsx("span",{className:"h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce"}),t.jsx("span",{className:"h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]"}),t.jsx("span",{className:"h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]"})]}),t.jsx("div",{ref:w})]}),t.jsx("div",{className:"px-4 py-2.5 bg-slate-950/80 border-t border-white/10 overflow-x-auto no-scrollbar flex items-center gap-2",children:E.map((s,e)=>t.jsx("button",{onClick:()=>c(s),className:"flex-shrink-0 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-emerald-950/70 border border-white/10 hover:border-emerald-500/40 text-xs text-slate-300 hover:text-emerald-300 transition-all font-mono cursor-pointer",children:s},e))}),t.jsxs("div",{className:"p-4 bg-slate-950 border-t border-white/10 flex items-center gap-3",children:[t.jsx("input",{type:"text",value:l,onChange:s=>p(s.target.value),onKeyDown:s=>s.key==="Enter"&&c(),placeholder:"Ask why a reel was recommended or how your interests changed...",className:"flex-1 px-4 py-2.5 rounded-2xl bg-slate-900 border border-white/10 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"}),t.jsx("button",{onClick:()=>c(),disabled:!l.trim(),className:"p-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-black transition-all cursor-pointer",children:t.jsx($,{className:"h-4 w-4"})})]})]})]})};export{W as AskScrollwiseView};
