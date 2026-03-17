
import React, { useState } from 'react';
import { SCENARIOS } from '../../data/content';
import { AppState } from '../../types';

interface Props {
  onComplete: (score: number) => void;
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const BehavioralBlock: React.FC<Props> = ({ onComplete, state, setState }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [starDraft, setStarDraft] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const scenario = SCENARIOS[selectedIdx];

  const handleNext = () => {
    setShowSummary(true);
  };

  const handleFinalize = () => {
    const isBest = choice !== null && scenario.approaches[choice].isBest;
    const score = isBest ? 100 : 50;
    
    setState(prev => ({ 
      ...prev, 
      starDrafts: { ...prev.starDrafts, [scenario.id]: starDraft } 
    }));
    
    onComplete(score);
  };

  if (showSummary) {
    const bestApproach = scenario.approaches.find(a => a.isBest);
    return (
      <div className="space-y-6 animate-in fade-in">
        <h3 className="text-xl font-bold text-slate-800">Behavioral Summary</h3>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">The Scenario</h4>
          <p className="text-slate-700 text-sm italic mb-6">"{scenario.description}"</p>
          
          <div className="space-y-4">
             <div>
                <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Recommended Approach</h4>
                <div className="bg-white border border-emerald-200 p-4 rounded-xl text-emerald-900 font-medium text-sm">
                  {bestApproach?.text}
                </div>
             </div>
             <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Expert Rational</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{bestApproach?.feedback}</p>
             </div>
          </div>
        </div>
        <button 
          onClick={handleFinalize}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg"
        >
          Confirm & Save Prep
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
        <h3 className="text-lg font-bold text-purple-900 mb-2">{scenario.title}</h3>
        <p className="text-purple-800/80 leading-relaxed text-sm">{scenario.description}</p>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Select your approach:</p>
        {scenario.approaches.map((app, i) => (
          <button
            key={i}
            onClick={() => setChoice(i)}
            className={`w-full p-4 rounded-xl border text-left transition-all ${choice === i ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-slate-200 hover:border-blue-300'}`}
          >
            <div className="flex gap-4">
              <span className="font-bold opacity-50">{app.label}</span>
              <span className="text-sm">{app.text}</span>
            </div>
          </button>
        ))}
      </div>

      {choice !== null && (
        <div className={`p-4 rounded-xl text-sm font-medium ${scenario.approaches[choice].isBest ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
          Feedback: {scenario.approaches[choice].feedback}
        </div>
      )}

      <div className="space-y-4 pt-6 border-t border-slate-100">
        <div className="flex justify-between items-center">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Draft your STAR Response:</p>
            <button 
                onClick={() => setShowModel(!showModel)}
                className="text-xs text-blue-600 font-bold hover:underline"
            >
                {showModel ? 'Hide Model' : 'Show Model STAR'}
            </button>
        </div>
        
        {showModel && (
            <div className="bg-slate-900 text-blue-300 p-4 rounded-xl text-xs font-mono leading-relaxed italic">
                {scenario.modelStar}
            </div>
        )}

        <textarea 
          value={starDraft}
          onChange={(e) => setStarDraft(e.target.value)}
          placeholder="S: Situation, T: Task, A: Action, R: Result..."
          className="w-full h-32 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <button 
        disabled={choice === null}
        onClick={handleNext}
        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 disabled:opacity-50 transition-all shadow-lg"
      >
        Proceed to Review
      </button>
    </div>
  );
};

export default BehavioralBlock;
