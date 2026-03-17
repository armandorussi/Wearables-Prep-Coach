
import React from 'react';

const CheatSheet: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Last-Minute PE Cheat Sheet</h2>
            <p className="text-blue-100 text-xs">Prioritize these concepts in your remaining 60 minutes.</p>
          </div>
          <button onClick={onClose} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <section className="space-y-3">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Logic Patterns</h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
              <div>
                <p className="text-[10px] font-bold text-blue-600 uppercase">Parsing Pattern</p>
                <code className="text-[11px] block bg-white p-2 rounded border border-slate-200 mt-1">
                  try {'{'} const data = JSON.parse(input); {'}'} catch {'{'} /* Handle error */ {'}'}
                </code>
              </div>
              <div>
                <p className="text-[10px] font-bold text-blue-600 uppercase">The "Retry" Loop</p>
                <p className="text-xs text-slate-600 italic">Mention "Exponential Backoff" to signal maturity.</p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Hardware "Signal"</h3>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 space-y-2 text-xs">
              <p><strong>Thermals:</strong> Glasses have no fans. Compute = Heat. Heat = Skin Discomfort.</p>
              <p><strong>Duty Cycling:</strong> Don't poll GPS 100/sec. Poll 1/sec to save battery.</p>
              <p><strong>Offloading:</strong> Use the phone's CPU for heavy NLP/Vision to save the glasses' battery.</p>
            </div>
          </section>

          <section className="space-y-3 md:col-span-2">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">The "Golden" PE Phrases</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                <span className="font-bold text-emerald-800">"Signal vs. Noise"</span>
                <p className="text-emerald-700/70 italic">Use when discussing data filtering.</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                <span className="font-bold text-purple-800">"Parity with Mobile"</span>
                <p className="text-purple-700/70 italic">Use when discussing feature sets.</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                <span className="font-bold text-orange-800">"Developer Friction"</span>
                <p className="text-orange-700/70 italic">Use when discussing SDK bugs.</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-800">"Battery-to-Value Ratio"</span>
                <p className="text-slate-700/70 italic">Use when justifying a feature.</p>
              </div>
            </div>
          </section>
        </div>
        
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center">
            <p className="text-xs text-slate-400 text-center max-w-md italic">
                Remember: The interviewer wants a <strong>Partner Engineer</strong>, not a compiler. If syntax fails, explain the logic clearly.
            </p>
        </div>
      </div>
    </div>
  );
};

export default CheatSheet;
