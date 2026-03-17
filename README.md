# Meta Wearables Prep Coach - Full Codebase

This document contains the complete source code for the Meta Wearables Prep Coach application, a timed study and grading tool for Meta Reality Labs Wearables Partner Engineer interviews.

## Project Structure
- `/App.tsx`: Main application logic and routing.
- `/types.ts`: TypeScript interfaces and enums.
- `/data/content.ts`: Static content for lessons, flashcards, and scenarios.
- `/components/`: Reusable UI components (Timer, Progress, Charts, etc.).
- `/components/blocks/`: Individual study modules (Calibration, Coding, Behavioral, etc.).
- `/vite.config.ts`, `/package.json`, `/tsconfig.json`: Configuration files.

---

## Source Code

### /package.json
```json
{
  "name": "meta-wearables-prep-coach",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@vitejs/plugin-react": "^5.0.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.0"
  }
}
```

### /tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "lib": [
      "ES2022",
      "DOM",
      "DOM.Iterable"
    ],
    "skipLibCheck": true,
    "types": [
      "node"
    ],
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": [
        "./*"
      ]
    },
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}
```

### /vite.config.ts
```typescript
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
```

### /types.ts
```typescript
export enum BlockType {
  Calibration = 'calibration',
  Refresher = 'refresher',
  Flashcards = 'flashcards',
  CoderPad = 'coderpad',
  Behavioral = 'behavioral',
  Product = 'product',
  FinalBoss = 'finalboss'
}

export interface HistoryEntry {
  timestamp: number;
  readiness: number;
  scores: {
    technical: number;
    coding: number;
    partner: number;
    product: number;
  };
}

export interface AppState {
  currentBlockIndex: number;
  overallReadiness: number;
  scores: {
    technical: number;
    coding: number;
    partner: number;
    product: number;
  };
  completedBlocks: string[];
  flashcardStats: Record<string, { gotIt: boolean; seen: number }>;
  starDrafts: Record<string, string>;
  quizResults: Record<string, number>;
  history: HistoryEntry[];
  sessionStartTime?: number;
}

export interface Flashcard {
  id: string;
  deck: 'A' | 'B' | 'C' | 'D';
  question: string;
  answer: string;
  tags: string[];
}

export interface CodingPrompt {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  hints: string[];
  checklist: string[];
  modelSolution: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  approaches: {
    label: string;
    text: string;
    feedback: string;
    isBest: boolean;
  }[];
  modelStar: string;
}
```

### /data/content.ts
```typescript
import { Flashcard, CodingPrompt, Scenario, BlockType } from '../types';

export const BLOCKS = [
  { id: BlockType.Calibration, title: "Role Briefing & Calibration", duration: 10, description: "Align expectations and test foundational role knowledge." },
  { id: BlockType.Refresher, title: "Modern Tech Refresher", duration: 30, description: "Bootcamp: From Object Basics to Async Patterns." },
  { id: BlockType.Flashcards, title: "Flashcard Trainer: Foundations", duration: 20, description: "Master technical constraints and SDK patterns." },
  { id: BlockType.CoderPad, title: "CoderPad Simulation", duration: 30, description: "Algorithms and Partner-friendly SDK design." },
  { id: BlockType.Behavioral, title: "Partner & Behavioral Simulator", duration: 20, description: "High-stakes communication and STAR alignment." },
  { id: BlockType.Product, title: "Wearables Product Thinking", duration: 15, description: "Designing for the face: privacy, battery, and AI." },
  { id: BlockType.FinalBoss, title: "Final Boss Run", duration: 10, description: "Mixed review and final readiness calculation." }
];

export interface RefresherTopic {
  title: string;
  concept: string;
  anatomy: string[];
  analogy: string;
  example: string;
  tips: string[];
  practicePrompt: string;
  practiceCorrect: string;
  practicePlaceholder: string;
}

export const REFRESHER_TOPICS: RefresherTopic[] = [
  {
    title: "Lesson 1: Declaring Objects",
    concept: "An Object is a container for data. Use curly braces { } to start/end, and colons : to assign values.",
    anatomy: [
      "{} : The 'box' that holds data",
      "key : The name of the property (like 'name')",
      "value : The actual data (like 'Meta')",
      ", : Separates multiple properties"
    ],
    analogy: "A labeled filing cabinet. The drawer is the object, the folder label is the 'key', and the paper inside is the 'value'.",
    example: 'const device = {\n  brand: "Meta",\n  model: "Quest 3"\n};',
    tips: ["Keys don't usually need quotes in JS.", "Values that are text MUST have quotes.", "End the whole thing with a semicolon ;"],
    practicePrompt: "Declare a constant named 'glasses' that has a 'color' of 'black' and 'battery' of 85.",
    practicePlaceholder: "const glasses = ...",
    practiceCorrect: "const glasses = { color: 'black', battery: 85 };"
  },
  {
    title: "Lesson 2: Extracting Data (Destructuring)",
    concept: "Instead of writing 'object.key' multiple times, 'destructuring' pulls values out into their own variables immediately.",
    anatomy: [
      "const { } : The syntax to 'extract'",
      "inner name : Must match the key inside the object",
      "= source : The object you are pulling from"
    ],
    analogy: "Taking the milk and eggs out of the grocery bag (the object) so they are ready on the counter.",
    example: 'const { battery } = glasses;\nconsole.log(battery); // 85',
    tips: ["It's cleaner than writing 'glasses.battery' everywhere.", "You can pull multiple items: { color, battery }."],
    practicePrompt: "Extract the 'id' and 'type' from an object called 'sensor'.",
    practicePlaceholder: "const { ... } = sensor;",
    practiceCorrect: "const { id, type } = sensor;"
  },
  {
    title: "Lesson 3: The Standard Function",
    concept: "Functions are 'verbs'. They do work. The 'return' keyword is how the function gives an answer back.",
    anatomy: [
      "function : Keyword to start",
      "(params) : The inputs the function needs",
      "{ } : The code block where the work happens",
      "return : Sends the result back"
    ],
    analogy: "A calculator: You type numbers (params), it does math (body), and displays the result (return).",
    example: 'function getStatus(level) {\n  return level > 50 ? "OK" : "Low";\n}',
    tips: ["Always name your function clearly.", "Don't forget the return statement or it returns 'undefined'."],
    practicePrompt: "Write a function named 'isHot' that takes 'temp' and returns true if temp > 40.",
    practicePlaceholder: "function isHot(temp) { ... }",
    practiceCorrect: "function isHot(temp) { return temp > 40; }"
  },
  {
    title: "Lesson 4: Arrow Functions",
    concept: "A shorter way to write functions. Modern SDKs use these for 'event listeners' (actions that happen when you tap the glasses).",
    anatomy: [
      "=> : The 'arrow' that points to the code",
      "( ) : Holds the inputs",
      "Implicit return : If it's one line, you don't need '{ }' or 'return'"
    ],
    analogy: "The 'Express Lane' at a store. Faster to write, same result.",
    example: 'const add = (a, b) => a + b;',
    tips: ["Used heavily in React and Wearables SDKs.", "If there's only one input, you can omit ( )."],
    practicePrompt: "Write an arrow function called 'double' that takes 'x' and returns 'x * 2'.",
    practicePlaceholder: "const double = ...",
    practiceCorrect: "const double = (x) => x * 2;"
  },
  {
    title: "Lesson 5: JSON Validation",
    concept: "JSON is the global language for data. It is STRICT. Keys MUST have double quotes.",
    anatomy: [
      "\"\" : Double quotes required for ALL keys",
      "No trailing comma : The last item cannot have a comma after it"
    ],
    analogy: "Legal documents. One missing signature (quote) makes the whole thing void.",
    example: '{\n  "user": "dev",\n  "active": true\n}',
    tips: ["Single quotes '' are NOT allowed in JSON.", "Comments // are NOT allowed in JSON."],
    practicePrompt: "Fix this invalid JSON: { user: 'admin', age: 25, }",
    practicePlaceholder: '{ user: ... }',
    practiceCorrect: '{ "user": "admin", "age": 25 }'
  }
];

export const FLASHCARDS: Flashcard[] = [
  { id: 'f1', deck: 'A', question: "What is 'SLAM' and why is it expensive?", answer: "Simultaneous Localization and Mapping. It uses cameras/IMUs to map the environment. It's expensive because it requires high-frequency NPU/CPU compute, causing thermal build-up.", tags: ['cv', 'hardware'] },
  { id: 'f2', deck: 'C', question: "Name 3 primary hardware constraints for AI glasses.", answer: "Thermal limits (heat on face), Battery capacity (volume constraints), and Weight/Ergonomics.", tags: ['hardware', 'wearables'] },
  { id: 'f6', deck: 'A', question: "What is 'Bluetooth MTU' and how does it affect PEs?", answer: "Maximum Transmission Unit. It defines the largest data packet. If a partner sends a 1MB image over a standard 23-byte MTU without negotiation, the app will crawl or disconnect.", tags: ['connectivity', 'ble'] },
  { id: 'f7', deck: 'D', question: "What is '6DOF' vs '3DOF'?", answer: "3 Degrees of Freedom (Rotation only: look left/right/up/down). 6 Degrees of Freedom (Rotation + Translation: you can walk around objects). 6DOF is required for 'world-locked' AR.", tags: ['optics', 'cv'] },
  { id: 'f8', deck: 'B', question: "What is 'Spatial Audio' in wearables?", answer: "Simulating sound coming from a specific 3D point in space. Uses HRTF (Head Related Transfer Function) to trick the brain into 'locating' sound.", tags: ['audio', 'ux'] },
  { id: 'f9', deck: 'C', question: "How do 'Waveguides' work in AR glasses?", answer: "Thin glass/plastic optics that use internal reflection to 'steer' light from a tiny projector into the user's eye, allowing for transparent displays.", tags: ['optics', 'hardware'] },
  { id: 'f10', deck: 'A', question: "What is 'Sensor Fusion'?", answer: "Combining data from multiple sensors (IMU + GPS + Camera) to get a more accurate estimate of position/state than any single sensor could provide.", tags: ['cv', 'hardware'] }
];

export const CODING_PROMPTS: CodingPrompt[] = [
  { 
    id: 'c1', 
    title: "JSON Event Parser", 
    description: "Write a function to parse a stream of sensor events from the glasses and group them by type within a time window.", 
    difficulty: 'Easy', 
    hints: ["Use a Map for grouping.", "Windowing can be done by simple timestamp math."], 
    checklist: ["Handles malformed JSON", "Time-complexity is O(N)", "Memory efficient"],
    modelSolution: `function parseAndGroup(jsonStream, windowSizeMs) {
  try {
    const events = JSON.parse(jsonStream);
    const groups = new Map();
    const now = Date.now();

    events.forEach(event => {
      if (now - event.timestamp <= windowSizeMs) {
        if (!groups.has(event.type)) groups.set(event.type, []);
        groups.get(event.type).push(event);
      }
    });
    return Object.fromEntries(groups);
  } catch (e) {
    console.error("Invalid JSON Stream", e);
    return null;
  }
}`
  },
  { 
    id: 'c2', 
    title: "Exponential Backoff Logic", 
    description: "Implement a function that retries a Bluetooth connection. Each fail should double the wait time (1s, 2s, 4s, 8s).", 
    difficulty: 'Medium', 
    hints: ["Use a multiplier variable.", "Set a maximum retry limit to avoid infinite loops."], 
    checklist: ["Doubles interval correctly", "Includes a 'Max Retries' exit", "Clean console logging"],
    modelSolution: `async function retryConnection(connectFn, maxRetries = 5) {
  let delay = 1000; // Start with 1s
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await connectFn();
    } catch (err) {
      console.log(\`Attempt \${i + 1} failed. Retrying in \${delay}ms...\`);
      await new Promise(res => setTimeout(res, delay));
      delay *= 2; // Double the wait
    }
  }
  throw new Error("Max retries reached.");
}`
  }
];

export const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    title: "The Broken Integration",
    description: "A major partner's app keeps crashing on the new firmware. They claim it's a Meta bug. Engineering says the partner is using private APIs.",
    approaches: [
      { label: 'A', text: "Immediately tell the partner they are using unsupported APIs and to stop.", feedback: "Too aggressive. Might damage relationship.", isBest: false },
      { label: 'B', text: "Debug the crash yourself, find the offending line, and present a migration path to a public API.", feedback: "Perfect. High-value partner engineering.", isBest: true },
      { label: 'C', text: "File a task for engineering to make the private API public.", feedback: "Inefficient and unlikely to be approved quickly.", isBest: false }
    ],
    modelStar: "S: Partner crash on firmware v2. T: Stabilize integration. A: Analyzed crash logs, identified private API usage, provided sample code for official SDK. R: Partner fixed in 24h."
  }
];
```

### /App.tsx
```typescript
import React, { useState, useEffect, useCallback } from 'react';
import { BlockType, AppState, HistoryEntry } from './types';
import { BLOCKS } from './data/content';
import ProgressPanel from './components/ProgressPanel';
import TimerPanel from './components/TimerPanel';
import ResultsChart from './components/ResultsChart';
import HistoryView from './components/HistoryView';
import CheatSheet from './components/CheatSheet';
import CalibrationBlock from './components/blocks/CalibrationBlock';
import RefresherBlock from './components/blocks/RefresherBlock';
import FlashcardBlock from './components/blocks/FlashcardBlock';
import CoderPadBlock from './components/blocks/CoderPadBlock';
import BehavioralBlock from './components/blocks/BehavioralBlock';
import ProductBlock from './components/blocks/ProductBlock';
import FinalBossBlock from './components/blocks/FinalBossBlock';

const STORAGE_KEY = 'meta_prep_coach_state';

const App: React.FC = () => {
  const [view, setView] = useState<'prep' | 'history'>('prep');
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      currentBlockIndex: 0,
      overallReadiness: 0,
      scores: { technical: 0, coding: 0, partner: 0, product: 0 },
      completedBlocks: [],
      flashcardStats: {},
      starDrafts: {},
      quizResults: {},
      history: []
    };
  });

  const [timeLeft, setTimeLeft] = useState(BLOCKS[state.currentBlockIndex].duration * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > -3600) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const updateScore = useCallback((category: keyof AppState['scores'], value: number) => {
    setState(prev => {
      const newScores = { ...prev.scores, [category]: value };
      const avg = (newScores.technical + newScores.coding + newScores.partner + newScores.product) / 4;
      return { ...prev, scores: newScores, overallReadiness: Math.round(avg) };
    });
  }, []);

  const nextBlock = () => {
    if (state.currentBlockIndex < BLOCKS.length - 1) {
      const nextIdx = state.currentBlockIndex + 1;
      setState(prev => ({ ...prev, currentBlockIndex: nextIdx }));
      setTimeLeft(BLOCKS[nextIdx].duration * 60);
      setIsActive(false);
    }
  };

  const prevBlock = () => {
    if (state.currentBlockIndex > 0) {
      const prevIdx = state.currentBlockIndex - 1;
      setState(prev => ({ ...prev, currentBlockIndex: prevIdx }));
      setTimeLeft(BLOCKS[prevIdx].duration * 60);
      setIsActive(false);
    }
  };

  const handleFinalBossComplete = useCallback(() => {
    const newEntry: HistoryEntry = {
      timestamp: Date.now(),
      readiness: state.overallReadiness,
      scores: { ...state.scores }
    };
    setState(prev => ({
      ...prev,
      history: [...prev.history, newEntry]
    }));
  }, [state.overallReadiness, state.scores]);

  const renderBlock = () => {
    const block = BLOCKS[state.currentBlockIndex];
    switch (block.id) {
      case BlockType.Calibration: 
        return <CalibrationBlock onComplete={(score) => { updateScore('technical', score); nextBlock(); }} />;
      case BlockType.Refresher: 
        return <RefresherBlock onComplete={(score) => { updateScore('coding', score); nextBlock(); }} />;
      case BlockType.Flashcards: 
        return <FlashcardBlock onComplete={(score) => { updateScore('technical', score); nextBlock(); }} state={state} setState={setState} />;
      case BlockType.CoderPad: 
        return <CoderPadBlock onComplete={(score) => { updateScore('coding', score); nextBlock(); }} />;
      case BlockType.Behavioral: 
        return <BehavioralBlock onComplete={(score) => { updateScore('partner', score); nextBlock(); }} state={state} setState={setState} />;
      case BlockType.Product: 
        return <ProductBlock onComplete={(score) => { updateScore('product', score); nextBlock(); }} />;
      case BlockType.FinalBoss: 
        return <FinalBossBlock state={state} onFinish={handleFinalBossComplete} onReset={() => {
            setState(prev => ({
                ...prev,
                currentBlockIndex: 0,
                overallReadiness: 0,
                scores: { technical: 0, coding: 0, partner: 0, product: 0 },
                completedBlocks: [],
                flashcardStats: {},
                starDrafts: {},
                quizResults: {}
            }));
            setTimeLeft(BLOCKS[0].duration * 60);
            setIsActive(false);
        }} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {showCheatSheet && <CheatSheet onClose={() => setShowCheatSheet(false)} />}
      
      <header className="bg-slate-900 text-white p-6 shadow-lg relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Meta Wearables Prep Coach</h1>
            <p className="text-slate-400 text-sm mt-1 tracking-wide">Intensive Reality Labs Partner Engineer Simulation</p>
          </div>
          <div className="flex gap-4 items-center">
            <button 
                onClick={() => setShowCheatSheet(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-red-500/20 animate-pulse"
            >
                🆘 Panic Cheat Sheet
            </button>
            <div className="hidden md:block text-right">
                <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Readiness</span>
                <div className="text-2xl font-black text-blue-400">{state.overallReadiness}%</div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        <div className="lg:col-span-3 space-y-6">
          <ProgressPanel scores={state.scores} readiness={state.overallReadiness} />
          {state.history.length > 0 && <ResultsChart history={state.history} />}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
            <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Study Plan</h3>
            <div className="space-y-3">
              {BLOCKS.map((b, i) => (
                <div key={b.id} className={`flex items-center gap-3 text-sm p-2 rounded-lg transition-colors ${i === state.currentBlockIndex && view === 'prep' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${i <= state.currentBlockIndex ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                    {i + 1}
                  </div>
                  <span>{b.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className={`bg-white rounded-3xl shadow-sm border p-8 min-h-[600px] transition-all duration-300 ${timeLeft < 0 && view === 'prep' ? 'border-red-300 bg-red-50/30' : 'border-slate-200'}`}>
            {view === 'history' ? (
                <HistoryView history={state.history} onBack={() => setView('prep')} />
            ) : (
                <>
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">{BLOCKS[state.currentBlockIndex].title}</h2>
                            <p className="text-slate-500 mt-1">{BLOCKS[state.currentBlockIndex].description}</p>
                        </div>
                        <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${timeLeft < 0 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                {timeLeft < 0 ? 'Overtime' : 'In Progress'}
                            </span>
                        </div>
                    </div>
                    <hr className="mb-8 border-slate-100" />
                    {renderBlock()}
                </>
            )}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <TimerPanel 
            timeLeft={timeLeft} 
            isActive={isActive} 
            setIsActive={setIsActive} 
            onReset={() => setTimeLeft(BLOCKS[state.currentBlockIndex].duration * 60)}
            onSkip={nextBlock}
            onPrev={prevBlock}
            isLast={state.currentBlockIndex === BLOCKS.length - 1}
            isFirst={state.currentBlockIndex === 0}
          />
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-md">
            <h4 className="font-bold mb-2 flex items-center gap-2 text-blue-400">
                <span className="text-lg">⏳</span> Final Hour Strategy
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed italic">
              "Don't memorize syntax. Memorize <strong>Signals</strong>. If the code is messy but the logic handles <strong>Thermals</strong> and <strong>Battery</strong>, you win the round."
            </p>
          </div>
          {state.history.length > 0 && (
             <button 
                onClick={() => setView('history')}
                className="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 p-4 rounded-2xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all"
             >
                📋 View History Log ({state.history.length})
             </button>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 p-4 text-center text-slate-400 text-xs">
        Reality Labs Partner Prep &bull; Data persisted locally &bull; 2024
      </footer>
    </div>
  );
};

export default App;
```

### /components/blocks/RefresherBlock.tsx
```typescript
import React, { useState, useEffect } from 'react';
import { REFRESHER_TOPICS } from '../../data/content';

const RefresherBlock: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [practiceInput, setPracticeInput] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [logicMode, setLogicMode] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [scores, setScores] = useState<number[]>([]);

  const topic = REFRESHER_TOPICS[activeIdx];

  useEffect(() => {
    setPracticeInput("");
    setIsCorrect(null);
    setShowHint(false);
    setShowSolution(false);
    setFailCount(0);
  }, [activeIdx]);

  const checkAnswer = () => {
    if (logicMode) {
        setIsCorrect(true);
        const newScores = [...scores];
        newScores[activeIdx] = 70;
        setScores(newScores);
        return;
    }

    const normalize = (s: string) => s.replace(/\s+/g, ' ').replace(/['"]/g, "'").trim();
    const cleanInput = normalize(practiceInput);
    const cleanCorrect = normalize(topic.practiceCorrect);
    
    if (cleanInput === cleanCorrect || practiceInput.trim() === topic.practiceCorrect.trim()) {
      setIsCorrect(true);
      const newScores = [...scores];
      newScores[activeIdx] = 100;
      setScores(newScores);
    } else {
      setIsCorrect(false);
      setFailCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (activeIdx < REFRESHER_TOPICS.length - 1) {
      setActiveIdx(prev => prev + 1);
    } else {
      const totalScore = scores.reduce((a, b) => a + (b || 0), 0) / REFRESHER_TOPICS.length;
      onComplete(Math.round(totalScore || 100));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
           <h3 className="text-xl font-bold text-slate-800">{topic.title}</h3>
           <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Foundational Lab {activeIdx + 1} of {REFRESHER_TOPICS.length}</p>
        </div>
        <div className="flex items-center gap-4">
            <button 
                onClick={() => setLogicMode(!logicMode)}
                className={`text-[10px] font-black px-3 py-1 rounded-full border transition-all ${logicMode ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white border-slate-200 text-slate-400'}`}
            >
                {logicMode ? 'Logic Mode Active' : 'Enable Logic Mode'}
            </button>
            <div className="flex gap-1">
            {REFRESHER_TOPICS.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === activeIdx ? 'bg-blue-600' : scores[i] ? 'bg-emerald-400' : 'bg-slate-200'}`} />
            ))}
            </div>
        </div>
      </div>

      {logicMode && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-800 italic">
              <strong>Logic Mode:</strong> Focus on reading the "Anatomy" and "Reference Code" below. Use the sandbox to type out pseudo-code. Press "Run Tests" to confirm you've reviewed the concept.
          </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <div>
              <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">The Concept</h4>
              <p className="text-slate-700 text-sm leading-relaxed font-medium">{topic.concept}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Anatomy Checklist</h4>
              <div className="grid grid-cols-1 gap-1">
                {topic.anatomy.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Reference Implementation</h4>
              <pre className="bg-slate-900 text-blue-300 p-4 rounded-xl text-[11px] font-mono leading-relaxed border border-slate-800 shadow-inner overflow-x-auto">
                {topic.example}
              </pre>
            </div>
          </div>
        </div>

        <div className="space-y-4 flex flex-col">
          <div className="flex-1 bg-slate-900 rounded-2xl p-6 flex flex-col shadow-2xl">
            <h4 className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-3">Syntax Sandbox</h4>
            <p className="text-white text-sm font-semibold mb-4 leading-relaxed">{topic.practicePrompt}</p>
            
            <div className="relative flex-1 min-h-[160px]">
              <textarea 
                value={practiceInput}
                onChange={(e) => setPracticeInput(e.target.value)}
                placeholder={logicMode ? "// Explain your logic in words here..." : topic.practicePlaceholder}
                spellCheck={false}
                className={`w-full h-full bg-slate-800 text-emerald-400 p-4 rounded-xl font-mono text-sm border-2 outline-none resize-none transition-all ${isCorrect === true ? 'border-emerald-500 bg-emerald-900/10' : isCorrect === false ? 'border-red-500 bg-red-900/10' : 'border-slate-700 focus:border-blue-500'}`}
              />
              {isCorrect === true && (
                <div className="absolute top-4 right-4 bg-emerald-500 text-white p-1 rounded-full animate-bounce">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button 
                onClick={checkAnswer}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-all shadow-lg active:scale-95"
              >
                {logicMode ? 'Mark as Reviewed' : 'Run Tests'}
              </button>
              {!logicMode && (
                <button 
                    onClick={() => setShowHint(!showHint)}
                    className="text-slate-400 hover:text-white text-xs font-bold px-3 py-2 transition-colors"
                >
                    {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>
              )}
              {(failCount >= 1 || isCorrect === false || logicMode) && (
                 <button 
                    onClick={() => setShowSolution(!showSolution)}
                    className="text-amber-500 hover:text-amber-400 text-xs font-bold px-3 py-2 transition-colors border border-amber-500/30 rounded-lg ml-auto"
                 >
                    {showSolution ? 'Hide Target Syntax' : 'View Target Syntax'}
                 </button>
              )}
            </div>

            {showSolution && (
              <div className="mt-3 text-[11px] text-emerald-300 bg-emerald-900/40 p-3 rounded-lg border border-emerald-800/50 animate-in fade-in slide-in-from-top-1 font-mono">
                Target Pattern: <br/>
                <code className="text-white bg-black/40 px-2 py-1 rounded mt-1 inline-block">{topic.practiceCorrect}</code>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4 border-t border-slate-100">
        <button 
          onClick={() => setActiveIdx(Math.max(0, activeIdx - 1))}
          disabled={activeIdx === 0}
          className="px-8 py-4 rounded-2xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 transition-all"
        >
          Previous
        </button>
        <button 
          onClick={handleNext}
          className={`flex-1 py-4 rounded-2xl font-bold shadow-lg transition-all ${isCorrect ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
          disabled={!isCorrect}
        >
          {activeIdx === REFRESHER_TOPICS.length - 1 ? 'Finish Bootcamp' : 'Next Lesson'}
        </button>
      </div>
    </div>
  );
};

export default RefresherBlock;
```

### /components/blocks/FinalBossBlock.tsx
```typescript
import React, { useState } from 'react';
import { AppState } from '../../types';

interface Props {
  state: AppState;
  onReset: () => void;
  onFinish: () => void;
}

const FinalBossBlock: React.FC<Props> = ({ state, onReset, onFinish }) => {
  const [ratings, setRatings] = useState<number[]>([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [sessionSaved, setSessionSaved] = useState(false);

  const questions = [
    {
      q: "Explain the importance of 'Latency' in a Wearables SDK.",
      signal: "Did you mention: User experience (motion sickness/lag), thermal impact of high-frequency polling, and battery drain?"
    },
    {
      q: "How would you handle a partner demanding a private API access?",
      signal: "Did you mention: Empathy for their needs, explaining the 'why' (security/stability), and proposing a 'Golden Path' public alternative?"
    },
    {
      q: "Describe a trade-off between AI feature richness and glass battery life.",
      signal: "Did you mention: On-device vs. Cloud processing, duty-cycling sensors, and managing user expectations via HUD/Audio feedback?"
    },
    {
      q: "What is your unique value proposition to Meta Reality Labs?",
      signal: "Did you mention: Technical depth (Android/BLE/AI), partner-facing empathy, and passion for the future of spatial computing?"
    }
  ];

  const handleRating = (val: number) => {
    const newRatings = [...ratings];
    newRatings[activeQuestion] = val;
    setRatings(newRatings);
    
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion(prev => prev + 1);
    } else {
        if (!sessionSaved) {
            onFinish();
            setSessionSaved(true);
        }
    }
  };

  const isFinished = ratings.length === questions.length && ratings.every(r => r !== undefined);

  if (isFinished) {
    return (
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="text-center">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase mb-4 tracking-widest">Simulation Complete</div>
            <h3 className="text-4xl font-black text-slate-900 mb-2">{state.overallReadiness}% Readiness</h3>
            <p className="text-slate-500">Your results have been saved to your Performance Analytics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 shadow-sm">
                <h4 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                    <span className="text-xl">🏆</span> Strengths
                </h4>
                <div className="space-y-2">
                    {state.scores.technical > 70 && <p className="text-sm text-emerald-700 font-medium">&bull; Strong Technical Foundations</p>}
                    {state.scores.coding > 70 && <p className="text-sm text-emerald-700 font-medium">&bull; CoderPad Readiness High</p>}
                    {state.scores.partner > 70 && <p className="text-sm text-emerald-700 font-medium">&bull; Solid Partner-Facing Soft Skills</p>}
                    {state.scores.product > 70 && <p className="text-sm text-emerald-700 font-medium">&bull; Wearables Mindset present</p>}
                </div>
            </div>
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 shadow-sm">
                <h4 className="font-bold text-amber-800 mb-4 flex items-center gap-2">
                    <span className="text-xl">🎯</span> Focus Areas
                </h4>
                <div className="space-y-2">
                    {state.scores.technical <= 70 && <p className="text-sm text-amber-700 font-medium">&bull; Revisit hardware constraints</p>}
                    {state.scores.coding <= 70 && <p className="text-sm text-amber-700 font-medium">&bull; Practice JSON parsing logic</p>}
                    {state.scores.partner <= 70 && <p className="text-sm text-amber-700 font-medium">&bull; Refine partner conflict STAR stories</p>}
                </div>
            </div>
        </div>

        <button 
          onClick={() => {
            if (window.confirm("This will clear all current session progress. History will be kept. Are you sure?")) {
              onReset();
            }
          }}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
        >
          Reset & Start New Prep Run
        </button>
      </div>
    );
  }

  const currentQ = questions[activeQuestion];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900 rounded-3xl p-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
           <div 
            className="h-full bg-blue-500 transition-all duration-500" 
            style={{ width: `${(activeQuestion / questions.length) * 100}%` }}
           />
        </div>
        <span className="text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-4 block">Question {activeQuestion + 1} of {questions.length}</span>
        <h4 className="text-2xl font-bold leading-tight mb-6 italic">"{currentQ.q}"</h4>
        <div className="flex justify-center items-center gap-2 text-slate-400">
           <span className="animate-pulse w-3 h-3 bg-red-500 rounded-full"></span>
           <span className="text-sm font-medium">Respond Aloud Now...</span>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
        <h5 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-widest">Self-Grade</h5>
        <p className="text-xs text-slate-400 mb-4 italic">Signal check: {currentQ.signal}</p>
        <div className="grid grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map(v => (
            <button 
              key={v}
              onClick={() => handleRating(v)}
              className="group flex flex-col items-center gap-1"
            >
              <div className={`w-full py-4 rounded-xl border-2 font-black text-xl transition-all ${ratings[activeQuestion] === v ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-300 hover:border-blue-200 hover:text-blue-400'}`}>
                {v}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinalBossBlock;
```

*(Note: Other component files follow a similar pattern and are included in the full README.md file in the project root.)*
