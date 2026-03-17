
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
        // In Logic Mode, we accept anything as "reviewed"
        setIsCorrect(true);
        const newScores = [...scores];
        newScores[activeIdx] = 70; // 70% credit for logic review
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
