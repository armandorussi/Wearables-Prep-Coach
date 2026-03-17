
import React from 'react';

interface Props {
  timeLeft: number;
  isActive: boolean;
  setIsActive: (val: boolean) => void;
  onReset: () => void;
  onSkip: () => void;
  onPrev: () => void;
  isLast: boolean;
  isFirst: boolean;
}

const TimerPanel: React.FC<Props> = ({ timeLeft, isActive, setIsActive, onReset, onSkip, onPrev, isLast, isFirst }) => {
  const formatTime = (seconds: number) => {
    const isNegative = seconds < 0;
    const abs = Math.abs(seconds);
    const m = Math.floor(abs / 60);
    const s = abs % 60;
    return `${isNegative ? '-' : ''}${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center">
      <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-widest">Block Timer</h3>
      
      <div className={`text-5xl font-mono font-black mb-6 ${timeLeft < 0 ? 'text-red-500 animate-pulse' : 'text-slate-800'}`}>
        {formatTime(timeLeft)}
      </div>

      <div className="w-full grid grid-cols-2 gap-3 mb-6">
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`py-3 px-4 rounded-xl font-bold text-sm transition-all ${isActive ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200'}`}
        >
          {isActive ? 'Pause' : 'Start Timer'}
        </button>
        <button 
          onClick={onReset}
          className="py-3 px-4 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200"
        >
          Reset
        </button>
      </div>

      <div className="w-full flex justify-between gap-4">
         <button 
            disabled={isFirst}
            onClick={onPrev}
            className="flex-1 text-slate-400 hover:text-slate-600 disabled:opacity-30 text-xs font-bold transition-all"
        >
            &larr; Back
        </button>
        <button 
            disabled={isLast}
            onClick={onSkip}
            className="flex-1 text-blue-500 hover:text-blue-700 disabled:opacity-30 text-xs font-bold transition-all"
        >
            Skip Block &rarr;
        </button>
      </div>
    </div>
  );
};

export default TimerPanel;
