
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
