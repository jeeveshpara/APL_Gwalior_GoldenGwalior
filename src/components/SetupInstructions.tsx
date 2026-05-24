import React from "react";

export default function SetupInstructions() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-3 shadow-md">
      <span className="text-[11px] text-slate-400 uppercase font-mono tracking-wider block font-bold border-b border-slate-800 pb-1.5">
        🛠️ How to setup Premium Spoken Indian Voices
      </span>
      <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
        Speech synthesis uses the natural native voice packages installed on your browser/device. Follow these simple guides to load ultra-realistic premium options:
      </p>

      <div className="space-y-2 pt-1 text-[9.5px]">
        <div className="bg-slate-950 p-2.5 rounded border border-slate-850 flex gap-2.5 items-start">
          <span className="text-xs shrink-0">🌐</span>
          <div className="space-y-0.5">
            <strong className="text-white block font-mono">Google Chrome / MS Edge (Desktop)</strong>
            <p className="text-slate-400 leading-normal">
              Highly realistic online voices are supported natively! Look for <code className="text-emerald-400 font-mono font-bold">Google हिन्दी (Hindi)</code>, <code className="text-emerald-400 font-mono font-bold">Google English India</code>, or systems like <code className="text-emerald-400 font-mono font-bold">Ravi</code>, <code className="text-emerald-400 font-mono font-bold">Heera</code>, and <code className="text-emerald-300 font-mono font-bold">Neerja</code>.
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-2.5 rounded border border-slate-850 flex gap-2.5 items-start">
          <span className="text-xs shrink-0">🍏</span>
          <div className="space-y-0.5">
            <strong className="text-white block font-mono">Apple macOS / iOS Setup</strong>
            <p className="text-slate-400 leading-normal">
              Toggle <code className="text-slate-300">Settings &rarr; Accessibility &rarr; Spoken Content &rarr; System Speech Voices</code>. Add your target Indian languages and choose the premium packages like <code className="text-emerald-400 font-mono font-bold">Rishi (Enhanced)</code> or <code className="text-emerald-400 font-mono font-bold">Isha</code>.
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-2.5 rounded border border-slate-850 flex gap-2.5 items-start">
          <span className="text-xs shrink-0">🤖</span>
          <div className="space-y-0.5">
            <strong className="text-white block font-mono">Google Android Setup</strong>
            <p className="text-slate-400 leading-normal">
              Go to <code className="text-slate-300">System Settings &rarr; Accessible &rarr; Text-to-Speech Output</code>. Confirm <code className="text-emerald-400">Google Speech Engine</code> is selected, then tap gear to download language packs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
