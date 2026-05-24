import React from "react";
import { playStadiumTrumpet, playBatStroke, playCrowdRoar, playWhistle } from "../data/synthAudio";

export default function Soundboard() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3.5 shadow-md">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
        <span className="text-[11px] text-emerald-400 font-bold uppercase font-mono tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          🏟️ Stadium Atmospheric Soundboard
        </span>
        <span className="bg-emerald-950/40 border border-emerald-900/50 text-[9px] text-emerald-300 font-mono px-2 py-0.5 rounded-full">
          Live Synth Active
        </span>
      </div>
      <p className="text-[10.5px] text-slate-400 leading-normal font-sans">
        Inject programmatic stadium ambiance effects synchronized using your native browser audio card.
      </p>

      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => playStadiumTrumpet()}
          className="p-3 bg-slate-950 hover:bg-slate-900 hover:border-emerald-500/50 border border-slate-850 rounded-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer group active:scale-95 transition"
        >
          <span className="text-xl group-hover:scale-110 transition">🎺</span>
          <span className="text-[10px] font-bold text-white font-mono text-center">Stadium Trumpet</span>
          <span className="text-[8px] text-slate-500 font-mono text-center">IPL "Tuta-Tuta-Tu!"</span>
        </button>

        <button
          type="button"
          onClick={() => playBatStroke()}
          className="p-3 bg-slate-950 hover:bg-slate-900 hover:border-emerald-500/50 border border-slate-850 rounded-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer group active:scale-95 transition"
        >
          <span className="text-xl group-hover:scale-110 transition">🏏</span>
          <span className="text-[10px] font-bold text-white font-mono text-center">Willow Bat Crack</span>
          <span className="text-[8px] text-slate-500 font-mono text-center">Organic "Thump-Wood"</span>
        </button>

        <button
          type="button"
          onClick={() => playCrowdRoar(3500, 0.18)}
          className="p-3 bg-slate-950 hover:bg-slate-900 hover:border-emerald-500/50 border border-slate-850 rounded-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer group active:scale-95 transition"
        >
          <span className="text-xl group-hover:scale-110 transition">🏟️</span>
          <span className="text-[10px] font-bold text-white font-mono text-center">Crowd Applause</span>
          <span className="text-[8px] text-slate-500 font-mono text-center">3.5s Stadium Swell</span>
        </button>

        <button
          type="button"
          onClick={() => playWhistle()}
          className="p-3 bg-slate-950 hover:bg-slate-900 hover:border-emerald-500/50 border border-slate-850 rounded-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer group active:scale-95 transition"
        >
          <span className="text-xl group-hover:scale-110 transition">🔔</span>
          <span className="text-[10px] font-bold text-white font-mono text-center">Umpire Whistle</span>
          <span className="text-[8px] text-slate-500 font-mono text-center">High Trill Beating</span>
        </button>
      </div>
    </div>
  );
}
