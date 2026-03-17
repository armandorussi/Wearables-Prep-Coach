
import React, { useState } from 'react';
import { CODING_PROMPTS } from '../../data/content';

const CoderPadBlock: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const [selectedPromptIdx, setSelectedPromptIdx] = useState<number | null>(null);
  const [solution, setSolution] = useState("");
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [showModelSolution, setShowModelSolution] = useState(false);

  const prompt = selectedPromptIdx !== null ? CODING_PROMPTS[selectedPromptIdx] : null;

  const handleCheck = (item: string) => {
    setChecks(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const handleFinishStep = () => {
    setShowModelSolution(true);
  };

  const handleFinalize = () => {
    if (!prompt) return;
    const checkedCount = Object.values(checks).filter(v => v).length;
    const score = Math.round((checkedCount / prompt.checklist.length) * 100);
    onComplete(score);
  };

  if (selectedPromptIdx === null) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-800">Select a Coding Challenge</h3>
        <div className="grid grid-cols-1 gap-4">
          {CODING_PROMPTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setSelectedPromptIdx(i)}
              className="p-6 bg-white border border-slate-200 rounded-2xl text-left hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div className="flex justify-between mb-2">
                <h4 className="font-bold text-slate-800 group-hover:text-blue-600">{p.title}</h4>
                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${p.difficulty === 'Hard' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {p.difficulty}
                </span>
              </div>
              <p className="text-sm text-slate-500 line-clamp-2">{p.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (showModelSolution) {
    return (
      <div className="space-y-6 animate-in fade-in">
        <h3 className="text-xl font-bold text-slate-800">Model Solution Analysis</h3>
        <div className="bg-slate-900 rounded-2xl p-6 overflow-hidden">
           <h4 className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-3">Expert JavaScript Pattern</h4>
           <pre className="text-emerald-400 font-mono text-xs leading-relaxed overflow-x-auto p-4 bg-black/30 rounded-xl">
             {prompt?.modelSolution}
           </pre>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
           <h4 className="text-sm font-bold text-slate-700 mb-2">Why this works:</h4>
           <ul className="text-xs text-slate-600 space-y-2 list-disc ml-4">
              <li>Uses efficient data structures (Map/Set) for O(N) lookup.</li>
              <li>Includes robust error handling (try/catch) for JSON operations.</li>
              <li>Maintains low memory footprint suitable for wearable hardware.</li>
           </ul>
        </div>
        <button 
          onClick={handleFinalize}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg"
        >
          Confirm Analysis & Complete
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-slate-900 rounded-2xl p-6 text-slate-300">
        <h4 className="text-white font-bold mb-2">Prompt: {prompt?.title}</h4>
        <p className="text-sm leading-relaxed mb-4">{prompt?.description}</p>
        <div className="space-y-2">
           {prompt?.hints.map((h, i) => (
              <p key={i} className="text-[10px] text-slate-500 italic uppercase">Hint {i+1}: {h}</p>
           ))}
        </div>
      </div>

      <textarea 
        value={solution}
        onChange={(e) => setSolution(e.target.value)}
        placeholder="// Write your pseudo-code or solution here..."
        className="w-full h-48 bg-slate-50 border border-slate-200 rounded-2xl p-4 font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <div className="bg-slate-50 p-6 rounded-2xl">
        <h4 className="text-sm font-bold text-slate-600 uppercase mb-4">Self-Evaluation Checklist</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {prompt?.checklist.map((item) => (
            <label key={item} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox"
                checked={!!checks[item]}
                onChange={() => handleCheck(item)}
                className="w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-sm transition-colors ${checks[item] ? 'text-blue-600 font-medium' : 'text-slate-500'}`}>{item}</span>
            </label>
          ))}
        </div>
      </div>

      <button 
        onClick={handleFinishStep}
        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg"
      >
        See Model Solution
      </button>
    </div>
  );
};

export default CoderPadBlock;
