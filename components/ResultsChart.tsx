
import React from 'react';
import { HistoryEntry } from '../types';

interface Props {
  history: HistoryEntry[];
}

const ResultsChart: React.FC<Props> = ({ history }) => {
  if (history.length === 0) return null;

  // Last 5 sessions for the trend
  const recent = history.slice(-5);
  const maxH = 100;
  const chartWidth = 300;
  const stepX = chartWidth / (recent.length > 1 ? recent.length - 1 : 1);

  // Generate SVG path for readiness trend
  const points = recent.map((entry, i) => `${i * stepX},${maxH - entry.readiness}`).join(' ');

  const currentScores = recent[recent.length - 1].scores;
  const categories = [
    { label: 'Tech', val: currentScores.technical, color: 'bg-blue-500' },
    { label: 'Code', val: currentScores.coding, color: 'bg-emerald-500' },
    { label: 'Part', val: currentScores.partner, color: 'bg-purple-500' },
    { label: 'Prod', val: currentScores.product, color: 'bg-orange-500' },
  ];

  const weakest = categories.reduce((prev, curr) => (prev.val < curr.val ? prev : curr));

  return (
    <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden shadow-xl border border-slate-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Performance Trend</h3>
        <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30">
          Last {recent.length} Attempts
        </span>
      </div>

      {/* Trend SVG */}
      <div className="relative h-24 w-full mb-8 border-b border-slate-800">
        <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${chartWidth} ${maxH}`} preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="25" x2={chartWidth} y2="25" stroke="#1e293b" strokeWidth="1" />
          <line x1="0" y1="50" x2={chartWidth} y2="50" stroke="#1e293b" strokeWidth="1" />
          <line x1="0" y1="75" x2={chartWidth} y2="75" stroke="#1e293b" strokeWidth="1" />
          
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
          {recent.map((entry, i) => (
            <circle 
                key={i} 
                cx={i * stepX} 
                cy={maxH - entry.readiness} 
                r="4" 
                fill="#3b82f6" 
                className="hover:r-6 cursor-pointer"
            />
          ))}
        </svg>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
          <span>Current Breakdown</span>
          <span className="text-amber-400 italic">Weakest: {weakest.label}</span>
        </div>
        <div className="grid grid-cols-4 gap-2 h-16 items-end">
          {categories.map((cat) => (
            <div key={cat.label} className="flex flex-col items-center gap-1 group">
              <div 
                className={`w-full ${cat.color} rounded-t-sm transition-all duration-700 group-hover:brightness-125`} 
                style={{ height: `${Math.max(10, cat.val)}%` }} 
              />
              <span className="text-[9px] text-slate-500 font-bold">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800">
        <p className="text-[11px] text-slate-400 leading-relaxed">
          <span className="text-white font-bold">Prescription:</span> Your {weakest.label} score is the lowest. Spend extra time in the <span className="text-blue-400 underline">Refresher</span> block next session.
        </p>
      </div>
    </div>
  );
};

export default ResultsChart;
