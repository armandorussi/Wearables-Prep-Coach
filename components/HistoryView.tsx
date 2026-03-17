
import React from 'react';
import { HistoryEntry } from '../types';

interface Props {
  history: HistoryEntry[];
  onBack: () => void;
}

const HistoryView: React.FC<Props> = ({ history, onBack }) => {
  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (score >= 50) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-red-600 bg-red-50 border-red-100';
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800">Session History</h3>
        <button 
          onClick={onBack}
          className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          &larr; Back to Prep
        </button>
      </div>

      {history.length === 0 ? (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center">
          <div className="text-4xl mb-4">📈</div>
          <h4 className="text-slate-800 font-bold mb-2">No Sessions Recorded Yet</h4>
          <p className="text-slate-500 text-sm max-w-xs mx-auto">
            Complete a "Final Boss Run" to save your readiness score and track your progress over time.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {[...history].reverse().map((entry, idx) => (
            <div key={entry.timestamp} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                    Attempt #{history.length - idx} &bull; {formatDate(entry.timestamp)}
                  </span>
                  <div className="flex items-center gap-3">
                    <h4 className="text-2xl font-black text-slate-900">{entry.readiness}%</h4>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter bg-slate-100 px-2 py-0.5 rounded">Overall Readiness</span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                    SA
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Technical', val: entry.scores.technical },
                  { label: 'Coding', val: entry.scores.coding },
                  { label: 'Partner', val: entry.scores.partner },
                  { label: 'Product', val: entry.scores.product },
                ].map(s => (
                  <div key={s.label} className={`p-3 rounded-xl border text-center ${getScoreColor(s.val)}`}>
                    <div className="text-[10px] font-bold uppercase opacity-70 mb-1">{s.label}</div>
                    <div className="text-lg font-black">{s.val}%</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
