
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
        // Run finished
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
