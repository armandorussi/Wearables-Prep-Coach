
import React, { useState } from 'react';
import { FLASHCARDS } from '../../data/content';
import { AppState } from '../../types';

interface Props {
  onComplete: (score: number) => void;
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const FlashcardBlock: React.FC<Props> = ({ onComplete, state, setState }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [localStats, setLocalStats] = useState<Record<string, boolean>>({});
  const [showSummary, setShowSummary] = useState(false);

  const card = FLASHCARDS[currentIndex];

  const handleChoice = (gotIt: boolean) => {
    setLocalStats(prev => ({ ...prev, [card.id]: gotIt }));
    setFlipped(false);
    if (currentIndex < FLASHCARDS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleFinalize = () => {
    const totalGotIt = Object.values(localStats).filter(v => v).length;
    const score = Math.round((totalGotIt / FLASHCARDS.length) * 100);
    
    // Update global state
    const newStats = { ...state.flashcardStats };
    Object.entries(localStats).forEach(([id, val]) => {
      newStats[id] = { gotIt: val, seen: (newStats[id]?.seen || 0) + 1 };
    });
    setState(prev => ({ ...prev, flashcardStats: newStats }));
    onComplete(score);
  };

  if (showSummary) {
    const missed = FLASHCARDS.filter(c => localStats[c.id] === false);
    return (
      <div className="space-y-6 animate-in fade-in">
        <h3 className="text-xl font-bold text-slate-800">Review Missed Concepts</h3>
        {missed.length === 0 ? (
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">🏆</div>
            <h4 className="text-emerald-800 font-bold mb-2">Perfect Score!</h4>
            <p className="text-emerald-600 text-sm">You've mastered all the cards in this deck.</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
            {missed.map((c, i) => (
              <div key={c.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <p className="text-xs font-black text-blue-600 uppercase mb-1">Concept {i + 1}</p>
                <p className="text-sm font-bold text-slate-800 mb-2">{c.question}</p>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 italic text-slate-600 text-xs">
                  {c.answer}
                </div>
              </div>
            ))}
          </div>
        )}
        <button 
          onClick={handleFinalize}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg"
        >
          Confirm & Proceed
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in">
      <div className="w-full flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
        <span>Deck {card.deck}: {card.tags.join(', ')}</span>
        <span>{currentIndex + 1} / {FLASHCARDS.length}</span>
      </div>

      <div 
        className={`w-full max-w-md aspect-[3/2] relative cursor-pointer transition-all duration-500 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
        onClick={() => setFlipped(!flipped)}
      >
        {/* Front */}
        <div className="absolute inset-0 bg-white border-2 border-slate-100 rounded-3xl shadow-xl flex items-center justify-center p-8 text-center [backface-visibility:hidden]">
          <p className="text-xl font-bold text-slate-800">{card.question}</p>
          <div className="absolute bottom-4 text-xs text-slate-300 font-bold uppercase">Click to Flip</div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 bg-blue-600 text-white rounded-3xl shadow-xl flex items-center justify-center p-8 text-center [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-auto">
          <div>
            <p className="text-lg leading-relaxed">{card.answer}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 w-full max-w-md">
        <button 
          onClick={() => handleChoice(false)}
          className="flex-1 py-4 px-6 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all border border-red-100"
        >
          Not yet
        </button>
        <button 
          onClick={() => handleChoice(true)}
          className="flex-1 py-4 px-6 bg-emerald-50 text-emerald-600 rounded-2xl font-bold hover:bg-emerald-100 transition-all border border-emerald-100 shadow-sm"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default FlashcardBlock;
