
import React, { useState } from 'react';

const CalibrationBlock: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showReview, setShowReview] = useState(false);

  const quiz = [
    { q: "What is the primary technical focus for a Wearables PE?", a: ["Web backend", "Client-side Android/iOS", "Database optimization"], correct: 1 },
    { q: "How does this role interact with the product feedback loop?", a: ["Directing marketing", "Translating partner friction to internal eng", "Writing end-user ads"], correct: 1 },
    { q: "Which hardware constraint is unique to smart glasses?", a: ["Screen size", "Face-borne thermals", "Stylus latency"], correct: 1 },
    { q: "In a 'Thin Client' model, where does the NLP processing usually happen?", a: ["On the glasses", "On the paired smartphone", "On a 3rd party server"], correct: 1 },
    { q: "What is the consequence of high Motion-to-Photon latency?", a: ["Blurred photos", "Motion sickness", "Battery overheating"], correct: 1 },
    { q: "What is the role of an HRTF in wearables?", a: ["Heart Rate Tracking", "Spatial Audio filtering", "High Resolution Texture Filing"], correct: 1 },
    { q: "Why is 'Duty Cycling' important for wearable sensors?", a: ["To increase accuracy", "To preserve battery life", "To simplify the code"], correct: 1 }
  ];

  const handleFinishQuiz = () => {
    setShowReview(true);
  };

  const handleConfirmCompletion = () => {
    const correctCount = answers.reduce((acc, ans, i) => acc + (ans === quiz[i].correct ? 1 : 0), 0);
    const score = Math.round((correctCount / quiz.length) * 100);
    onComplete(score);
  };

  if (step === 1) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-800">Role Calibration</h3>
        <p className="text-slate-600 leading-relaxed">
          The <strong>Solutions Architect III / Wearables Partner Engineer</strong> is a high-impact technical role. You bridge the gap between Meta's hardware/OS teams and top-tier app developers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h4 className="font-bold text-blue-600 mb-2">Core Responsibilities</h4>
            <ul className="text-sm space-y-2 text-slate-600 list-disc ml-4">
              <li>SDK Integration Architecture</li>
              <li>Partner Technical Debugging</li>
              <li>Reality Labs OS advocacy</li>
            </ul>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h4 className="font-bold text-emerald-600 mb-2">Key Hard Skills</h4>
            <ul className="text-sm space-y-2 text-slate-600 list-disc ml-4">
              <li>Android Internals (JNI, BLE)</li>
              <li>Spatial Computing Concepts</li>
              <li>Mobile-first API design</li>
            </ul>
          </div>
        </div>
        <button 
          onClick={() => setStep(2)}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg"
        >
          Begin Role Readiness Quiz
        </button>
      </div>
    );
  }

  if (showReview) {
    return (
      <div className="space-y-6 animate-in fade-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-800">Review Answers</h3>
          <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Calibration Complete</span>
        </div>
        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
          {quiz.map((item, i) => (
            <div key={i} className={`p-4 rounded-xl border-l-4 ${answers[i] === item.correct ? 'bg-emerald-50 border-emerald-500' : 'bg-red-50 border-red-500'}`}>
              <p className="text-sm font-bold text-slate-800 mb-2">{i+1}. {item.q}</p>
              <p className="text-xs text-slate-600 mb-1">
                Your Answer: <span className={answers[i] === item.correct ? 'text-emerald-700 font-bold' : 'text-red-700 font-bold'}>{item.a[answers[i]]}</span>
              </p>
              {answers[i] !== item.correct && (
                <p className="text-xs text-emerald-700 font-bold">
                  Correct Answer: {item.a[item.correct]}
                </p>
              )}
            </div>
          ))}
        </div>
        <button 
          onClick={handleConfirmCompletion}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg"
        >
          Confirm & Proceed to Next Block
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
      {quiz.map((item, i) => (
        <div key={i} className="space-y-4 animate-in slide-in-from-right-2" style={{ animationDelay: `${i * 100}ms` }}>
          <p className="font-bold text-slate-800 text-sm">{i+1}. {item.q}</p>
          <div className="grid grid-cols-1 gap-2">
            {item.a.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const newAnswers = [...answers];
                  newAnswers[i] = idx;
                  setAnswers(newAnswers);
                }}
                className={`p-3 text-left rounded-xl border text-sm transition-all ${answers[i] === idx ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 hover:border-blue-300'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="sticky bottom-0 bg-white pt-4">
          <button 
            disabled={answers.filter(a => a !== undefined).length < quiz.length}
            onClick={handleFinishQuiz}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            Review My Answers
          </button>
      </div>
    </div>
  );
};

export default CalibrationBlock;
