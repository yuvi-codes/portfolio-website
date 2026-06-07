"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  Bot, 
  TerminalSquare, 
  Database, 
  Smartphone, 
  Server, 
  Radar,
  X
} from "lucide-react";

interface SkillsSectionProps {
  className?: string;
}

/* ── Reveal-on-scroll hook ─────────────────────────────────── */
function useReveal(refs: React.RefObject<HTMLElement | null>[], threshold = 0.15) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.delay ?? 0);
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold }
    );
    refs.forEach((r) => { if (r.current) observer.observe(r.current); });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

const HIDDEN: React.CSSProperties = {
  opacity: 0,
  transform: "translateY(30px)",
  transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
};

/* ── Data ──────────────────────────────────────────────────── */
const SKILLS = [
  {
    id: "ml",
    num: "01",
    category: "AI · ML & GenAI",
    tools: "Scikit-learn, TensorFlow, OpenAI API, Hugging Face, SHAP, Pandas",
    icon: BarChart3
  },
  {
    id: "agents",
    num: "02",
    category: "AI Agents & Automation",
    tools: "LangChain, RAG Pipelines, Vector DBs, VAPI, n8n",
    icon: Bot
  },
  {
    id: "lang",
    num: "03",
    category: "Languages",
    tools: "Python, JavaScript, TypeScript, SQL",
    icon: TerminalSquare
  },
  {
    id: "front",
    num: "04",
    category: "Frontend & Mobile",
    tools: "React, Next.js, React Native, Tailwind CSS, Expo",
    icon: Smartphone
  },
  {
    id: "infra",
    num: "05",
    category: "Infrastructure",
    tools: "AWS, Docker, Vercel, Postman, Git, GitHub",
    icon: Radar
  },
  {
    id: "back",
    num: "06",
    category: "Backend & APIs",
    tools: "Node.js, Express, NestJS, REST APIs, JWT Auth, WebSockets",
    icon: Server
  },
  {
    id: "db",
    num: "07",
    category: "Databases",
    tools: "MongoDB, PostgreSQL, ChromaDB, AWS S3",
    icon: Database
  },
];

/* ── 1. AI/ML: Interactive Matrix ──────────────────────────── */
function NeuralMatrixVis() {
  const [mounted, setMounted] = useState(false);
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);
    const int = setInterval(() => {
      // Randomly pick 6 to 10 nodes to be active
      const count = 6 + Math.floor(Math.random() * 5);
      const active = [];
      for(let i=0; i<count; i++) {
        active.push(Math.floor(Math.random() * 32));
      }
      setActiveNodes(active);
    }, 1200);
    return () => clearInterval(int);
  }, []);

  // 32 nodes total: 16 on left, 16 on right
  const nodes = mounted ? Array.from({ length: 32 }).map((_, i) => {
    const isLeft = i < 16;
    const localIdx = i % 16;
    const col = localIdx % 4;
    const row = Math.floor(localIdx / 4);
    
    // Left grid goes from 15% to 35%
    // Right grid goes from 65% to 85%
    // Y goes from 25% to 75%
    const cx = isLeft ? `${15 + col * 7}%` : `${65 + col * 7}%`;
    const cy = `${25 + row * 16.6}%`; 
    const active = activeNodes.includes(i);
    return { id: i, cx, cy, active };
  }) : [];

  const outputNode = { cx: "50%", cy: "50%" }; 

  return (
    <svg className="w-full h-32 mt-2 pointer-events-none">
      {/* Paths from active nodes to output */}
      {nodes.filter(n => n.active).map(n => (
        <line 
          key={`path-${n.id}`} 
          x1={n.cx} y1={n.cy} x2={outputNode.cx} y2={outputNode.cy} 
          stroke="var(--gold)" strokeWidth="1" strokeDasharray="4" 
          style={{ animation: "nn-pulse 1s linear infinite" }} 
        />
      ))}
      {/* The grid nodes */}
      {nodes.map(n => (
        <circle 
          key={n.id} cx={n.cx} cy={n.cy} r={2.5} 
          fill={n.active ? "var(--gold)" : "var(--charcoal)"} 
          stroke={n.active ? "var(--cream)" : "rgba(201,168,76,0.3)"} 
          className="transition-all duration-300" 
        />
      ))}
      {/* Output Node in Center */}
      {mounted && <circle cx={outputNode.cx} cy={outputNode.cy} r={6} fill="var(--crimson)" className="shadow-[0_0_10px_var(--crimson)]" style={{ filter: "drop-shadow(0 0 6px var(--crimson))" }} />}
    </svg>
  );
}

/* ── 2. AI Agents: Breakable DAG ───────────────────────────── */
function AgentDagVis() {
  const [broken, setBroken] = useState(false);

  const handleBreak = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if(broken) return;
    setBroken(true);
    setTimeout(() => setBroken(false), 2000); 
  };

  return (
    <div className="w-full h-32 mt-2 relative pointer-events-auto">
      <div className="absolute left-[10%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[var(--gold)] flex items-center justify-center z-10 bg-[var(--charcoal)]"><span className="text-[9px] text-[var(--gold)]">TRG</span></div>
      
      <div 
        onClick={handleBreak} 
        className={`absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded border flex items-center justify-center z-10 bg-[var(--charcoal)] cursor-pointer transition-colors duration-300 ${broken ? "border-red-500 shadow-[0_0_15px_rgba(255,0,0,0.5)]" : "border-[var(--cream)] hover:border-[var(--gold)]"}`}
        title="Click to break connection"
      >
        <Bot size={18} color={broken ? "#ef4444" : "var(--cream)"} />
      </div>

      <div className="absolute left-[90%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[var(--crimson)] flex items-center justify-center z-10 bg-[var(--charcoal)]"><span className="text-[9px] text-[var(--crimson)]">ACT</span></div>
      
      {/* SVG connection line and moving dot */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="rgba(201,168,76,0.3)" strokeWidth="2" strokeDasharray={broken ? "4 4" : "none"} strokeLinecap="round" className="transition-all duration-300" />
        {!broken && (
          <circle r={4} fill="var(--gold)" style={{ filter: "drop-shadow(0 0 5px var(--gold))" }}>
            <animate attributeName="cx" values="10%;50%;90%" dur="2s" repeatCount="indefinite" />
            <animate attributeName="cy" values="50%;50%;50%" dur="2s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>
    </div>
  );
}

/* ── 3. Languages: Syntax Morpher ──────────────────────────── */
function SyntaxMorpherVis() {
  const [idx, setIdx] = useState(0);
  const snippets = [
    <div key="py" className="text-blue-300">def <span className="text-yellow-200">search</span>(arr, target):<br/>&nbsp;&nbsp;return target in arr</div>,
    <div key="ts" className="text-blue-300">const <span className="text-yellow-200">search</span> = (arr: number[], target: number) =&gt; {"{"}<br/>&nbsp;&nbsp;return arr.includes(target);<br/>{"}"}</div>,
    <div key="sql" className="text-purple-400">SELECT * <br/>FROM data <br/>WHERE val = target;</div>
  ];

  useEffect(() => {
    const int = setInterval(() => setIdx(prev => (prev + 1) % 3), 4000);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="w-full bg-black/50 border border-[rgba(201,168,76,0.1)] rounded-md h-28 mt-4 flex flex-col font-mono text-[11px] overflow-hidden shadow-inner pointer-events-auto">
      <div className="h-4 bg-[#1a1a15] flex items-center px-2 gap-1 border-b border-[rgba(201,168,76,0.1)]">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
      </div>
      <div className="p-3 text-[var(--muted)] relative flex-1 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {snippets[idx]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── 4. Frontend & Mobile: Device Illustrations ────────────────── */
function FrontendMobileVis() {
  return (
    <div className="w-full relative h-32 mt-4 pointer-events-auto flex items-center justify-center overflow-visible">
      <div className="relative w-full max-w-[280px] h-full flex items-center justify-center transform scale-[0.85] origin-center sm:scale-100 transition-transform duration-500">
        
        {/* Desktop Window */}
        <div className="w-52 h-28 rounded-xl bg-[var(--charcoal)] border border-[rgba(201,168,76,0.1)] shadow-2xl flex flex-col absolute top-0 left-[-10px] z-0 group-hover:-translate-y-2 group-hover:translate-x-1 transition-transform duration-500 ease-out">
          <div className="h-6 w-full flex items-center px-3 gap-1.5 border-b border-[rgba(201,168,76,0.1)]">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--crimson)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--gold)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--cream)]" />
          </div>
          <div className="p-4 flex flex-col gap-3">
            <div className="w-3/4 h-3 rounded-full bg-[var(--gold)] opacity-70" />
            <div className="w-[90%] h-3 rounded-full bg-[var(--cream)] opacity-70" />
            <div className="w-1/2 h-3 rounded-full bg-[var(--crimson)] opacity-70" />
          </div>
        </div>

        {/* Smaller Phone */}
        <div className="w-20 h-28 rounded-xl bg-[var(--charcoal)] border border-[rgba(201,168,76,0.2)] shadow-xl flex flex-col absolute bottom-[-10px] right-[85px] p-3 z-10 group-hover:-translate-y-1 transition-transform duration-500 ease-out delay-75">
          <div className="w-8 h-8 rounded-full bg-[var(--gold)] mb-3 opacity-80" />
          <div className="w-full h-2 rounded-full bg-[var(--cream)] opacity-30 mb-2" />
          <div className="w-3/4 h-2 rounded-full bg-[var(--cream)] opacity-30" />
          
          {/* New Badge */}
          <div className="absolute top-[45%] -right-4 bg-[var(--crimson)] text-[var(--cream)] text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-lg z-20 whitespace-nowrap">
            New
          </div>
        </div>

        {/* Taller Phone */}
        <div className="w-24 h-36 rounded-xl bg-[var(--charcoal)] border border-[rgba(201,168,76,0.2)] shadow-2xl flex flex-col absolute bottom-[-20px] right-0 p-3 z-20 group-hover:-translate-y-3 group-hover:-translate-x-2 transition-transform duration-500 ease-out delay-150">
          <div className="flex justify-between items-center w-full mb-3 opacity-50">
            <div className="w-4 h-4 rounded-full bg-[var(--gold)]" />
            <div className="w-6 h-1.5 rounded-full bg-[var(--gold)]" />
          </div>
          <div className="w-full h-12 rounded-lg bg-gradient-to-br from-[var(--gold)] to-[var(--charcoal)] border border-[rgba(201,168,76,0.3)] mb-3 opacity-80" />
          <div className="flex gap-2 w-full">
            <div className="w-full h-10 rounded bg-[var(--cream)] opacity-10" />
            <div className="w-full h-10 rounded bg-[var(--cream)] opacity-10" />
          </div>
        </div>
        
      </div>
    </div>
  );
}

/* ── 5. Infrastructure: CI/CD Pipeline ─────────────────────── */
function CiCdPipelineVis() {
  return (
    <div className="w-full h-28 mt-4 relative pointer-events-auto">
      <div className="absolute left-[10%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--charcoal)] border border-[var(--gold)] flex items-center justify-center z-10 shadow-[0_0_10px_rgba(201,168,76,0.2)]"><span className="text-[9px] text-[var(--gold)]">GIT</span></div>
      
      <div className="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded bg-[var(--charcoal)] border border-[var(--cream)] flex items-center justify-center z-10 shadow-[0_0_10px_rgba(255,253,248,0.2)]" style={{ animation: "cicd-spin 4s linear infinite" }}>
        <span className="text-[9px] text-[var(--cream)] font-bold">BLD</span>
      </div>
      
      <div className="absolute left-[90%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-8 rounded-t-xl bg-[var(--charcoal)] border border-[var(--crimson)] flex items-center justify-center z-10 relative shadow-[0_0_10px_rgba(192,57,43,0.2)]">
        <span className="text-[9px] text-[var(--crimson)]">CLD</span>
        <div className="absolute -top-5 text-[9px] text-[#2ecc71] font-mono opacity-0 whitespace-nowrap" style={{ animation: "cicd-ok 4s infinite" }}>200 OK</div>
      </div>
      
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="rgba(201,168,76,0.2)" strokeWidth="2" strokeDasharray="4 4" />
        <circle r={3} fill="var(--gold)" style={{ filter: "drop-shadow(0 0 5px var(--gold))" }}>
           <animate attributeName="cx" values="10%;50%;90%" dur="4s" repeatCount="indefinite" />
           <animate attributeName="cy" values="50%;50%;50%" dur="4s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

/* ── 6. Backend & APIs: WebSocket Flow ─────────────────────── */
function WebSocketVis() {
  return (
    <div className="w-full relative h-28 mt-4 pointer-events-auto">
      <div className="absolute left-[20%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-16 rounded border border-[rgba(201,168,76,0.3)] bg-[var(--charcoal)] flex items-center justify-center z-10 shadow-lg"><span className="text-[9px] text-[var(--gold)]">CLI</span></div>
      <div className="absolute left-[80%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-16 rounded border border-[rgba(201,168,76,0.3)] bg-[var(--charcoal)] flex items-center justify-center z-10 shadow-lg"><span className="text-[9px] text-[var(--cream)]">SRV</span></div>
      
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <line x1="20%" y1="40%" x2="80%" y2="40%" stroke="rgba(201,168,76,0.4)" strokeWidth="1" strokeDasharray="2" />
        <line x1="80%" y1="60%" x2="20%" y2="60%" stroke="rgba(192,57,43,0.4)" strokeWidth="1" strokeDasharray="2" />
        
        {/* Client to Server packets */}
        <circle r={2.5} fill="var(--gold)" style={{ filter: "drop-shadow(0 0 4px var(--gold))" }}>
          <animate attributeName="cx" from="20%" to="80%" dur="1s" repeatCount="indefinite" />
          <animate attributeName="cy" values="40%;40%" dur="1s" repeatCount="indefinite" />
        </circle>
        <circle r={2.5} fill="var(--gold)" style={{ filter: "drop-shadow(0 0 4px var(--gold))" }}>
          <animate attributeName="cx" from="20%" to="80%" dur="1s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="cy" values="40%;40%" dur="1s" repeatCount="indefinite" />
        </circle>

        {/* Server to Client packets */}
        <circle r={2.5} fill="var(--crimson)" style={{ filter: "drop-shadow(0 0 4px var(--crimson))" }}>
          <animate attributeName="cx" from="80%" to="20%" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="cy" values="60%;60%" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <circle r={2.5} fill="var(--crimson)" style={{ filter: "drop-shadow(0 0 4px var(--crimson))" }}>
          <animate attributeName="cx" from="80%" to="20%" dur="1.2s" begin="0.6s" repeatCount="indefinite" />
          <animate attributeName="cy" values="60%;60%" dur="1.2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

/* ── 7. Databases: Vector Clustering ───────────────────────── */
function VectorClusterVis() {
  const [isClustered, setIsClustered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const int = setInterval(() => {
      setIsClustered(prev => !prev);
    }, 2500); // Toggles every 2.5 seconds
    return () => clearInterval(int);
  }, []);

  const particles = useRef(Array.from({ length: 35 }).map((_, i) => {
    const cluster = i % 3;
    const randomX = 10 + Math.random() * 80; 
    const randomY = 10 + Math.random() * 80;
    return { id: i, cluster, rx: randomX, ry: randomY };
  }));

  const getClusterCenter = (cluster: number) => {
    if (cluster === 0) return { x: 20, y: 50, color: "var(--crimson)" };
    if (cluster === 1) return { x: 80, y: 50, color: "var(--gold)" };
    return { x: 50, y: 80, color: "var(--cream)" };
  };

  return (
    <div className="w-full relative h-32 mt-4 pointer-events-none">
      {/* Background hint */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isClustered ? 'opacity-20' : 'opacity-0'}`}>
         <span className="font-staatliches text-2xl text-[var(--gold)] tracking-widest">VECTOR</span>
      </div>

      {mounted && particles.current.map(p => {
        const center = getClusterCenter(p.cluster);
        const clusteredX = center.x + (Math.random() * 20 - 10);
        const clusteredY = center.y + (Math.random() * 20 - 10);

        const currentX = isClustered ? clusteredX : p.rx;
        const currentY = isClustered ? clusteredY : p.ry;
        const color = isClustered ? center.color : "rgba(201,168,76,0.3)";

        return (
          <div 
            key={p.id}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{ 
              left: `${currentX}%`, 
              top: `${currentY}%`,
              backgroundColor: color,
              boxShadow: isClustered ? `0 0 8px ${color}` : "none",
              transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${p.id * 0.01}s`
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Flowchart Modal ───────────────────────────────────────── */
function FlowchartModal({ category, onClose }: { category: typeof SKILLS[0] | null, onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [radius, setRadius] = useState(180);

  useEffect(() => {
    if (category) {
      setTimeout(() => setMounted(true), 50);
      const updateRadius = () => setRadius(window.innerWidth < 600 ? 120 : 180);
      updateRadius();
      window.addEventListener('resize', updateRadius);
      return () => window.removeEventListener('resize', updateRadius);
    } else {
      setMounted(false);
    }
  }, [category]);

  if (!category) return null;

  const toolsArray = category.tools.split(", ");

  return (
    <div 
      className="fixed inset-0 z-[2000] flex items-center justify-center backdrop-blur-sm transition-opacity duration-500"
      style={{ 
        backgroundColor: "rgba(10, 10, 8, 0.85)", 
        opacity: mounted ? 1 : 0 
      }}
      onClick={onClose}
    >
      <button 
        className="absolute top-8 right-8 text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
        onClick={onClose}
        aria-label="Close modal"
      >
        <X size={32} />
      </button>

      <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Animated SVG Lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          <g transform="translate(50%, 50%)" style={{ transformOrigin: 'center', transform: 'translate(50%, 50%)' }}>
            {toolsArray.map((_, i) => {
              const angle = (i * 360) / toolsArray.length;
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;
              return (
                <line 
                  key={i} 
                  x1="0" 
                  y1="0" 
                  x2={mounted ? x : 0} 
                  y2={mounted ? y : 0} 
                  stroke="rgba(201,168,76,0.4)" 
                  strokeWidth="2" 
                  strokeDasharray="6 4"
                  className="transition-all duration-700 ease-out"
                />
              )
            })}
          </g>
        </svg>

        {/* Root Node */}
        <div 
          className="absolute z-10 flex flex-col items-center justify-center rounded-full border-2 border-[var(--gold)] bg-[var(--charcoal)] shadow-[0_0_40px_rgba(201,168,76,0.3)] transition-transform duration-700 pointer-events-auto cursor-default"
          style={{ 
            width: "140px", 
            height: "140px",
            transform: mounted ? "scale(1)" : "scale(0.5)"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <category.icon size={32} color="var(--gold)" className="mb-2" />
          <span className="font-staatliches text-lg text-[var(--cream)] text-center leading-tight px-2">{category.category}</span>
        </div>

        {/* Child Nodes */}
        {toolsArray.map((t, i) => {
          const angle = (i * 360) / toolsArray.length;
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          return (
            <div 
              key={i} 
              className="absolute z-10 bg-[#0d0d0a] border border-[rgba(201,168,76,0.5)] rounded-full px-5 py-3 pointer-events-auto shadow-lg shadow-black/80 hover:border-[var(--gold)] hover:shadow-[0_0_20px_rgba(201,168,76,0.5)] transition-colors cursor-default"
              style={{ 
                transform: mounted ? `translate(${x}px, ${y}px) scale(1)` : `translate(0px, 0px) scale(0)`,
                transition: `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.05}s, border-color 0.3s`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="font-montserrat font-medium text-[14px] text-[var(--cream)] whitespace-nowrap">{t}</span>
            </div>
          )
        })}
      </div>
    </div>
  );
}

/* ── Bento Card Wrapper ────────────────────────────────────── */
function BentoCard({
  colSpanClass,
  delay,
  animRef,
  title,
  subtitle,
  icon: Icon,
  onClick,
  children,
}: {
  colSpanClass: string;
  delay: number;
  animRef: React.RefObject<HTMLDivElement | null>;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      ref={animRef}
      data-delay={delay}
      onClick={onClick}
      className={`relative group flex flex-col justify-between overflow-hidden rounded-2xl cursor-pointer ${colSpanClass}`}
      style={{
        ...HIDDEN,
        backgroundColor: "#0d0d0a", 
        border: "1px solid rgba(201,168,76,0.08)",
        boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)",
        minHeight: "280px",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out, border-color 0.3s ease",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.08)"; }}
    >
      {/* Top section: Icon and Text */}
      <div className="p-6 md:p-8 z-10 relative pointer-events-none">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center mb-6"
          style={{ 
            backgroundColor: "rgba(201,168,76,0.05)",
            border: "1px solid rgba(201,168,76,0.15)"
          }}
        >
          <Icon size={20} color="var(--gold)" />
        </div>
        
        <h3
          style={{
            fontFamily: "var(--font-staatliches)",
            fontSize: "24px",
            color: "var(--cream)",
            letterSpacing: "1px",
            margin: "0 0 8px 0",
          }}
        >
          {title}
        </h3>
        
        <p
          style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 300,
            fontSize: "14px",
            color: "var(--muted)",
            lineHeight: 1.6,
            maxWidth: "85%",
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Bottom section: Live Animation Element */}
      <div className="relative flex-grow flex items-end justify-center px-8 pb-8 pt-4 pointer-events-none">
        {children}
      </div>

      {/* Glow Hover Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at 50% 100%, rgba(201,168,76,0.1) 0%, transparent 60%)"
        }}
        aria-hidden="true"
      />
    </div>
  );
}

/* ── Section Component ─────────────────────────────────────── */
export default function SkillsSection({ className = "" }: SkillsSectionProps) {
  const tagRef      = useRef<HTMLDivElement>(null);
  const h1Ref       = useRef<HTMLDivElement>(null);
  const h2Ref       = useRef<HTMLDivElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);

  const cardRefs = useRef(Array.from({ length: 7 }).map(() => ({ current: null as HTMLDivElement | null })));

  const [selectedCategory, setSelectedCategory] = useState<typeof SKILLS[0] | null>(null);

  useReveal([tagRef, h1Ref, h2Ref, dividerRef]);
  useReveal(cardRefs.current as unknown as React.RefObject<HTMLElement | null>[], 0.15);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedCategory]);

  return (
    <section
      id="skills"
      className={`w-full relative ${className}`}
      style={{ backgroundColor: "var(--obsidian)" }}
      aria-labelledby="skills-heading"
    >
      <FlowchartModal category={selectedCategory} onClose={() => setSelectedCategory(null)} />

      {/* Injecting CSS Keyframes for live elements */}
      <style>{`
        /* AI/ML */
        @keyframes nn-pulse {
          0% { stroke-dashoffset: 8; opacity: 0; }
          50% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        
        /* Layout Squish */
        @keyframes layout-container {
          0%, 30% { width: 80%; height: 70px; flex-direction: row; }
          70%, 100% { width: 40%; height: 110px; flex-direction: column; }
        }
        @keyframes layout-sidebar {
          0%, 30% { width: 30%; height: 100%; }
          70%, 100% { width: 100%; height: 20%; }
        }

        /* CI/CD Pipeline */
        @keyframes cicd-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes cicd-ok {
          0%, 80% { opacity: 0; transform: translateY(0); }
          85%, 95% { opacity: 1; transform: translateY(-5px); }
          100% { opacity: 0; transform: translateY(-5px); }
        }
      `}</style>

      {/* Gold rule */}
      <div style={{ borderTop: "1px solid rgba(201,168,76,0.12)", width: "100%" }} aria-hidden="true" />

      <div
        style={{ maxWidth: "1200px", padding: "100px 40px", margin: "0 auto", width: "100%" }}
      >
        {/* Tag */}
        <div ref={tagRef} data-delay="0" style={HIDDEN}>
          <p
            className="uppercase"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "5px",
              color: "var(--crimson)",
              marginBottom: "20px",
            }}
          >
            02 — TECHNICAL DEPTH
          </p>
        </div>

        {/* Heading */}
        <div ref={h1Ref} data-delay="100" style={HIDDEN}>
          <h2
            id="skills-heading"
            style={{
              fontFamily: "var(--font-staatliches)",
              fontSize: "clamp(48px, 7vw, 88px)",
              color: "var(--cream)",
              lineHeight: 1.0,
              letterSpacing: "2px",
              margin: 0,
            }}
          >
            What I
          </h2>
        </div>
        <div ref={h2Ref} data-delay="200" style={HIDDEN}>
          <p
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-staatliches)",
              fontSize: "clamp(48px, 7vw, 88px)",
              color: "var(--gold)",
              lineHeight: 1.0,
              letterSpacing: "2px",
              margin: 0,
            }}
          >
            Build With.
          </p>
        </div>

        {/* Divider */}
        <div ref={dividerRef} data-delay="300" style={HIDDEN}>
          <div
            style={{
              width: "80px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
              margin: "24px 0 48px",
            }}
            aria-hidden="true"
          />
        </div>

        {/* ── Bento Grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* 1. AI & ML (lg:col-span-2) */}
          <BentoCard
            colSpanClass="lg:col-span-2"
            delay={0}
            animRef={cardRefs.current[0] as React.RefObject<HTMLDivElement>}
            title={SKILLS[0].category}
            subtitle={SKILLS[0].tools}
            icon={BarChart3}
            onClick={() => setSelectedCategory(SKILLS[0])}
          >
            <NeuralMatrixVis />
          </BentoCard>

          {/* 2. AI AGENTS (col-span-1) */}
          <BentoCard
            colSpanClass="lg:col-span-1"
            delay={100}
            animRef={cardRefs.current[1] as React.RefObject<HTMLDivElement>}
            title={SKILLS[1].category}
            subtitle={SKILLS[1].tools}
            icon={Bot}
            onClick={() => setSelectedCategory(SKILLS[1])}
          >
            <AgentDagVis />
          </BentoCard>

          {/* 3. LANGUAGES (col-span-1) */}
          <BentoCard
            colSpanClass="lg:col-span-1"
            delay={200}
            animRef={cardRefs.current[2] as React.RefObject<HTMLDivElement>}
            title={SKILLS[2].category}
            subtitle={SKILLS[2].tools}
            icon={TerminalSquare}
            onClick={() => setSelectedCategory(SKILLS[2])}
          >
             <SyntaxMorpherVis />
          </BentoCard>

          {/* 4. FRONTEND & MOBILE (col-span-1) */}
          <BentoCard
            colSpanClass="lg:col-span-1"
            delay={300}
            animRef={cardRefs.current[3] as React.RefObject<HTMLDivElement>}
            title={SKILLS[3].category}
            subtitle={SKILLS[3].tools}
            icon={Smartphone}
            onClick={() => setSelectedCategory(SKILLS[3])}
          >
             <FrontendMobileVis />
          </BentoCard>

          {/* 5. INFRASTRUCTURE (col-span-1) */}
          <BentoCard
            colSpanClass="lg:col-span-1"
            delay={400}
            animRef={cardRefs.current[4] as React.RefObject<HTMLDivElement>}
            title={SKILLS[4].category}
            subtitle={SKILLS[4].tools}
            icon={Radar}
            onClick={() => setSelectedCategory(SKILLS[4])}
          >
             <CiCdPipelineVis />
          </BentoCard>

          {/* 6. BACKEND & APIS (lg:col-span-2) */}
          <BentoCard
            colSpanClass="lg:col-span-2"
            delay={500}
            animRef={cardRefs.current[5] as React.RefObject<HTMLDivElement>}
            title={SKILLS[5].category}
            subtitle={SKILLS[5].tools}
            icon={Server}
            onClick={() => setSelectedCategory(SKILLS[5])}
          >
             <WebSocketVis />
          </BentoCard>

          {/* 7. DATABASES (lg:col-span-1) */}
          <BentoCard
            colSpanClass="lg:col-span-1"
            delay={600}
            animRef={cardRefs.current[6] as React.RefObject<HTMLDivElement>}
            title={SKILLS[6].category}
            subtitle={SKILLS[6].tools}
            icon={Database}
            onClick={() => setSelectedCategory(SKILLS[6])}
          >
             <VectorClusterVis />
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
