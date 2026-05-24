import React from "react";
import IndiaMap from "./IndiaMap";
import Soundboard from "./Soundboard";
import SetupInstructions from "./SetupInstructions";
import { StateData } from "../data/multilingualData";

interface ExtrasPanelProps {
  activeStateId: string;
  handleStateSelect: (state: StateData) => void;
  commentaryQueue: any[];
  setCommentaryQueue: React.Dispatch<React.SetStateAction<any[]>>;
  isContinuousPlay: boolean;
  setIsContinuousPlay: (val: boolean) => void;
  triggerNextContinuousBall: () => void;
  setRawEvent: (val: string) => void;
  setCommentaryText: (val: string) => void;
  handleSpeak: (val: string) => void;
}

export default function ExtrasPanel({
  activeStateId,
  handleStateSelect,
  commentaryQueue,
  setCommentaryQueue,
  isContinuousPlay,
  setIsContinuousPlay,
  triggerNextContinuousBall,
  setRawEvent,
  setCommentaryText,
  handleSpeak
}: ExtrasPanelProps) {

  return (
    <div className="space-y-4">
      
      {/* SECTION 1: INTERACTIVE INDIA SVG MAP */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 space-y-3.5 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">🗺️</span>
            <h3 className="font-extrabold text-white text-xs sm:text-sm">Regional Map Dialect Switcher</h3>
          </div>
          <span className="text-[9px] font-mono text-emerald-450 uppercase">Active State: {activeStateId.replace("IN-", "") || "None"}</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-normal">
          Click regional states directly on the map to automatically load respective dialect slang configurations:
        </p>

        <div className="bg-slate-950/80 border border-slate-850 p-2 rounded-xl flex items-center justify-center">
          <IndiaMap 
            onSelectState={handleStateSelect} 
            activeStateId={activeStateId} 
          />
        </div>
      </div>

      {/* SECTION 2: ATMOSPHERE SOUND EFFECTS */}
      <Soundboard />

      {/* SECTION 3: MATCH BROADCAST QUEUE */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 space-y-3.5 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">📟</span>
            <h3 className="font-extrabold text-white text-xs sm:text-sm">Stadium Queue Logger</h3>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsContinuousPlay(!isContinuousPlay);
              if (!isContinuousPlay) {
                setTimeout(() => triggerNextContinuousBall(), 300);
              }
            }}
            className={`text-[9px] font-mono tracking-wider px-2.5 py-1 rounded transition flex items-center gap-1 cursor-pointer font-bold uppercase ${
              isContinuousPlay
                ? "bg-emerald-500 text-slate-950 animate-pulse"
                : "bg-slate-950 border border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-white"
            }`}
          >
            <span className={`w-1 h-1 rounded-full ${isContinuousPlay ? "bg-slate-950" : "bg-emerald-400"}`} />
            {isContinuousPlay ? "Continuous ON" : "Simulate Live"}
          </button>
        </div>

        <div className="bg-slate-950 border border-slate-850 rounded-xl p-3 h-[180px] overflow-y-auto flex flex-col gap-2 font-mono text-[10px]">
          {commentaryQueue.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-650 gap-1.5 py-6">
              <span className="text-lg">📋</span>
              <p className="leading-snug text-[9.5px] text-slate-500">No match highlights currently logged in queue.<br />Play generated commentaries to log achievements.</p>
            </div>
          ) : (
            [...commentaryQueue].reverse().map((item) => (
              <div key={item.id} className="p-2.5 bg-slate-900 border border-slate-800/85 rounded flex flex-col gap-1 text-slate-350">
                <div className="flex justify-between items-center text-[8px] text-slate-500 font-bold border-b border-slate-800/50 pb-1">
                  <span>🕒 {item.timestamp}</span>
                  <span className="text-emerald-450 uppercase">{item.language} &bull; {item.persona}</span>
                </div>
                <p className="text-white font-semibold text-[9.5px] leading-tight mt-0.5">Event: {item.matchEvent}</p>
                <p className="text-slate-400 leading-normal max-h-[44px] overflow-y-auto italic font-sans py-0.5">
                  &ldquo;{item.commentaryText}&rdquo;
                </p>
                <div className="flex gap-2 justify-end pt-1">
                  <button
                    onClick={() => {
                      setRawEvent(item.matchEvent);
                      setCommentaryText(item.commentaryText);
                      handleSpeak(item.commentaryText);
                    }}
                    className="px-2 py-0.5 bg-slate-950 border border-slate-850/80 rounded hover:bg-slate-850 hover:text-white transition text-[9px] font-bold text-slate-400 cursor-pointer"
                  >
                    Play
                  </button>
                  <button
                    onClick={() => setCommentaryQueue(prev => prev.filter(q => q.id !== item.id))}
                    className="px-2 py-0.5 bg-slate-950 hover:bg-red-950/40 hover:text-red-400 rounded text-[9px] font-bold text-slate-500 border border-transparent hover:border-red-900/50 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* SECTION 4: PLATFORMS GUIDELINES HELP MANUAL */}
      <SetupInstructions />

    </div>
  );
}
