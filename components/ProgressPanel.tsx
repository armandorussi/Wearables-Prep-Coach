
import React from 'react';

interface Props {
  scores: {
    technical: number;
    coding: number;
    partner: number;
    product: number;
  };
  readiness: number;
}

const ProgressPanel: React.FC<Props> = ({ scores, readiness }) => {
  const categories = [
    { label: 'Technical Foundations', value: scores.technical, color: 'bg-blue-500' },
    { label: 'CoderPad Readiness', value: scores.coding, color: 'bg-emerald-500' },
    { label: 'Partner & Behavioral', value: scores.partner, color: 'bg-purple-500' },
    { label: 'Wearables Thinking', value: scores.product, color: 'bg-orange-500' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-wider">Preparation Status</h3>
      
      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat.label}>
            <div className="flex justify-between text-xs mb-2">
              <span className="font-semibold text-slate-700">{cat.label}</span>
              <span className="text-slate-500 font-bold">{cat.value}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${cat.color} transition-all duration-1000`} 
                style={{ width: `${cat.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <div className="flex items-end justify-between">
          <div className="text-xs text-slate-400 font-medium">Interview Ready in:</div>
          <div className="text-xl font-bold text-slate-800">{100 - readiness}% to go</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPanel;
