
import React, { useState } from 'react';

const ProductBlock: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const [template, setTemplate] = useState({
    useCase: "Context-aware AI Reminders",
    problem: "",
    interaction: "",
    constraints: "",
    metrics: ""
  });
  const [showSignal, setShowSignal] = useState(false);

  const handleShowSignal = () => {
    setShowSignal(true);
  };

  const handleFinalize = () => {
    let score = 0;
    if (template.problem.length > 20) score += 25;
    if (template.interaction.length > 30) score += 25;
    if (template.constraints.toLowerCase().includes('battery') || template.constraints.toLowerCase().includes('thermal') || template.constraints.toLowerCase().includes('privacy')) score += 25;
    if (template.metrics.length > 20) score += 25;
    onComplete(score);
  };

  if (showSignal) {
    return (
      <div className="space-y-6 animate-in fade-in">
        <h3 className="text-xl font-bold text-slate-800">Signal Check: Meta Product Thinking</h3>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <p className="text-sm font-medium text-amber-900 mb-4">A high-quality Wearables answer should include:</p>
          <ul className="space-y-4">
            {[
              { title: "Heads-Up Interaction", desc: "Does it leverage the 'world-locked' nature of glasses? Avoid 'phone-on-the-face' apps." },
              { title: "Physical Constraints", desc: "Did you address the tight thermal envelope and the need for offloading compute?" },
              { title: "User Privacy", desc: "Does the feature consider 'by-stander' privacy (recording LEDs, etc.)?" },
              { title: "GTM Metric", desc: "Did you define a clear success metric like 'Latency to First Interaction'?" }
            ].map((item, i) => (
              <li key={i} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex-shrink-0 flex items-center justify-center text-[10px] font-bold">✓</div>
                <div>
                  <h5 className="text-xs font-bold text-amber-900">{item.title}</h5>
                  <p className="text-[11px] text-amber-800/80">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button 
          onClick={handleFinalize}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg"
        >
          Confirm Evaluation & Proceed
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="p-4 bg-orange-50 text-orange-800 rounded-xl text-sm border border-orange-100">
        <strong>Goal:</strong> Design a feature specifically for smart glasses. Think about why it *needs* to be on the face, not the phone.
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Problem Statement</label>
          <input 
            value={template.problem}
            onChange={e => setTemplate({...template, problem: e.target.value})}
            placeholder="What core user friction are we solving?"
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase block mb-2">3-Step Interaction</label>
          <textarea 
            value={template.interaction}
            onChange={e => setTemplate({...template, interaction: e.target.value})}
            placeholder="1. Glass triggers HUD, 2. User looks at item, 3. AI provides context..."
            className="w-full h-24 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Hardware Constraints</label>
                <input 
                    value={template.constraints}
                    onChange={e => setTemplate({...template, constraints: e.target.value})}
                    placeholder="Thermals, Battery, Field of View?"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Success Metrics</label>
                <input 
                    value={template.metrics}
                    onChange={e => setTemplate({...template, metrics: e.target.value})}
                    placeholder="DAU, Latency, Satisfaction Score?"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
        </div>
      </div>

      <button 
        onClick={handleShowSignal}
        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg"
      >
        Submit Proposal for Evaluation
      </button>
    </div>
  );
};

export default ProductBlock;
