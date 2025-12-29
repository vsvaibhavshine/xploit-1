import React from 'react';
import { LearningModule } from '../types';
import { Button } from './ui/Button';

interface ModuleModalProps {
  module: LearningModule;
  onClose: () => void;
}

export const ModuleModal: React.FC<ModuleModalProps> = ({ module, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {/* Header */}
        <div className={`p-6 border-b-2 flex justify-between items-start ${
          module.category === 'Offensive' ? 'border-red-900/50 bg-red-950/10' : 'border-emerald-900/50 bg-emerald-950/10'
        }`}>
          <div>
            <span className={`text-[10px] font-black uppercase tracking-[0.3em] px-2 py-1 rounded mb-2 inline-block ${
              module.category === 'Offensive' ? 'bg-red-900 text-red-200' : 'bg-emerald-900 text-emerald-200'
            }`}>
              {module.category} PROTOCOL
            </span>
            <h2 className="text-3xl font-black font-display text-white tracking-widest uppercase">{module.title}</h2>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          <section>
            <h3 className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-4">Course Objective</h3>
            <p className="text-slate-200 text-lg leading-relaxed font-medium">{module.description}</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kali Guidelines */}
            <section className="bg-black/40 border border-slate-800 p-6 rounded-xl">
              <h3 className="text-emerald-400 text-sm font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                KALI_LINUX_GUIDELINES
              </h3>
              <ul className="space-y-3">
                {module.briefing?.kaliCommands.map((cmd, i) => (
                  <li key={i} className="font-mono text-sm bg-slate-950 p-3 rounded border border-slate-800 text-emerald-300 flex items-start gap-3">
                    <span className="text-slate-600">$</span>
                    <span className="break-all">{cmd}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Common Mistakes */}
            <section className="bg-black/40 border border-slate-800 p-6 rounded-xl">
              <h3 className="text-red-400 text-sm font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                CRITICAL_MISTAKES_&_TYPOS
              </h3>
              <ul className="space-y-3">
                {module.briefing?.commonMistakes.map((mistake, i) => (
                  <li key={i} className="text-sm text-slate-300 leading-relaxed pl-4 border-l-2 border-red-900">
                    <span className="font-bold text-red-300 block mb-1">WARNING:</span>
                    {mistake}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Software Requirements */}
          <section>
             <h3 className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-4">Required Toolkit</h3>
             <div className="flex flex-wrap gap-3">
                {module.briefing?.recommendedSoftware.map((soft, i) => (
                  <span key={i} className="bg-slate-800 text-slate-100 px-4 py-2 rounded-lg text-xs font-black font-display tracking-widest border border-slate-700 shadow-sm">
                    {soft}
                  </span>
                ))}
             </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex justify-end gap-4">
          <Button variant="secondary" onClick={onClose}>ABORT_OPERATION</Button>
          <Button variant={module.category === 'Offensive' ? 'danger' : 'primary'}>
  INITIALIZE_LAB &gt;&gt;
</Button>

        </div>
      </div>
    </div>
  );
};
