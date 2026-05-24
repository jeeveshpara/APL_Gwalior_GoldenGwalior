import React from "react";
import { Sliders } from "lucide-react";
import { VOICE_CHARACTERS, VOICE_EMOTIONS, MULTI_VOICE_MODES } from "../data/multilingualData";

interface VoiceMixingProps {
  selectedMultiVoiceMode: any;
  setSelectedMultiVoiceMode: (val: any) => void;
  selectedVoiceChar: any;
  setSelectedVoiceChar: (val: any) => void;
  selectedVoiceChar2: any;
  setSelectedVoiceChar2: (val: any) => void;
  selectedVoiceChar3: any;
  setSelectedVoiceChar3: (val: any) => void;
  selectedVoiceChar4: any;
  setSelectedVoiceChar4: (val: any) => void;
  selectedVoiceEmotion: any;
  setSelectedVoiceEmotion: (val: any) => void;
  voiceEnergyLevel: string;
  setVoiceEnergyLevel: (val: string) => void;
  pitch: number;
  setPitch: (val: number) => void;
  rate: number;
  setRate: (val: number) => void;
  volume: number;
  setVolume: (val: number) => void;
  selectedVoiceName: string;
  setSelectedVoiceName: (val: string) => void;
  availableVoices: any[];
  isHumanizerEnabled: boolean;
  setIsHumanizerEnabled: (val: boolean) => void;
  desiFillerFrequency: "none" | "low" | "medium" | "high";
  setDesiFillerFrequency: (val: any) => void;
}

export default function VoiceMixing({
  selectedMultiVoiceMode,
  setSelectedMultiVoiceMode,
  selectedVoiceChar,
  setSelectedVoiceChar,
  selectedVoiceChar2,
  setSelectedVoiceChar2,
  selectedVoiceChar3,
  setSelectedVoiceChar3,
  selectedVoiceChar4,
  setSelectedVoiceChar4,
  selectedVoiceEmotion,
  setSelectedVoiceEmotion,
  voiceEnergyLevel,
  setVoiceEnergyLevel,
  pitch,
  setPitch,
  rate,
  setRate,
  volume,
  setVolume,
  selectedVoiceName,
  setSelectedVoiceName,
  availableVoices,
  isHumanizerEnabled,
  setIsHumanizerEnabled,
  desiFillerFrequency,
  setDesiFillerFrequency
}: VoiceMixingProps) {

  return (
    <div className="space-y-4">
      
      {/* SECTION 1: ANNOUNCER CAST BUILDER */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 space-y-4 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">👥</span>
            <h3 className="font-extrabold text-white text-xs sm:text-sm">Vocal Casting & Broadcasters Desk</h3>
          </div>
          <span className="text-[9px] font-mono text-slate-500">Dual & Multi Show Host</span>
        </div>

        <div className="space-y-2">
          <label className="text-[10.5px] font-mono text-slate-400 block font-bold uppercase tracking-wider">ANNUNCIER CO-COMMENTATOR MODE</label>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950/60 border border-slate-850 rounded-lg">
            {MULTI_VOICE_MODES.map((mv) => {
              const isSelected = selectedMultiVoiceMode.id === mv.id;
              return (
                <button
                  key={mv.id}
                  type="button"
                  onClick={() => setSelectedMultiVoiceMode(mv)}
                  className={`py-1.5 px-2 rounded text-[10px] font-semibold transition cursor-pointer text-center ${
                    isSelected
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {mv.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Conditional dropdown selections for speakers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-850/80">
          <div className="space-y-1">
            <label className="text-[9.5px] font-mono text-slate-400 block font-bold">ANNUNCIER LEAD (SPEAKER 1)</label>
            <select
              value={selectedVoiceChar.id}
              onChange={(e) => {
                const found = VOICE_CHARACTERS.find(vc => vc.id === e.target.value);
                if (found) setSelectedVoiceChar(found);
              }}
              className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
            >
              {VOICE_CHARACTERS.map(vc => (
                <option key={vc.id} value={vc.id}>
                  {vc.gender === "Female" ? "👩" : "👨"} {vc.name} ({vc.accent})
                </option>
              ))}
            </select>
          </div>

          {selectedMultiVoiceMode.id !== "single" && (
            <div className="space-y-1">
              <label className="text-[9.5px] font-mono text-slate-400 block font-bold">SIDEKICK / CO-HOST (SPEAKER 2)</label>
              <select
                value={selectedVoiceChar2.id}
                onChange={(e) => {
                  const found = VOICE_CHARACTERS.find(vc => vc.id === e.target.value);
                  if (found) setSelectedVoiceChar2(found);
                }}
                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
              >
                {VOICE_CHARACTERS.map(vc => (
                  <option key={vc.id} value={vc.id}>
                    {vc.gender === "Female" ? "👩" : "👨"} {vc.name} ({vc.accent})
                  </option>
                ))}
              </select>
            </div>
          )}

          {(selectedMultiVoiceMode.id === "team" || selectedMultiVoiceMode.id === "expert_panel") && (
            <>
              <div className="space-y-1">
                <label className="text-[9.5px] font-mono text-slate-400 block font-bold">LEGEND COACH (SPEAKER 3)</label>
                <select
                  value={selectedVoiceChar3.id}
                  onChange={(e) => {
                    const found = VOICE_CHARACTERS.find(vc => vc.id === e.target.value);
                    if (found) setSelectedVoiceChar3(found);
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
                >
                  {VOICE_CHARACTERS.map(vc => (
                    <option key={vc.id} value={vc.id}>
                      {vc.gender === "Female" ? "👩" : "👨"} {vc.name} ({vc.accent})
                    </option>
                  ))}
                </select>
              </div>

              {selectedMultiVoiceMode.id === "team" && (
                <div className="space-y-1">
                  <label className="text-[9.5px] font-mono text-slate-400 block font-bold">STADIUM EXTRAS EYE (SPEAKER 4)</label>
                  <select
                    value={selectedVoiceChar4.id}
                    onChange={(e) => {
                      const found = VOICE_CHARACTERS.find(vc => vc.id === e.target.value);
                      if (found) setSelectedVoiceChar4(found);
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
                  >
                    {VOICE_CHARACTERS.map(vc => (
                      <option key={vc.id} value={vc.id}>
                        {vc.gender === "Female" ? "👩" : "👨"} {vc.name} ({vc.accent})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* SECTION 2: AUDIO MIXER SLIDERS */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 space-y-4 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">🎚️</span>
            <h3 className="font-extrabold text-white text-xs sm:text-sm">Broadcast Vocal Mix controls</h3>
          </div>
          <span className="text-[9px] font-mono text-slate-500">Wave Synthesis</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between text-[10.5px] text-slate-450 mb-1 font-mono">
                <span>Vocal Pitch multiplier</span>
                <strong className="text-emerald-450">{pitch.toFixed(2)}x</strong>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.05"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-950 rounded accent-emerald-400 cursor-pointer appearance-none"
              />
            </div>
            
            <div>
              <div className="flex justify-between text-[10.5px] text-slate-450 mb-1 font-mono">
                <span>Announce Pacing Tempo</span>
                <strong className="text-emerald-450">{rate.toFixed(2)}x</strong>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.05"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-950 rounded accent-emerald-400 cursor-pointer appearance-none"
              />
            </div>
          </div>

          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between text-[10.5px] text-slate-450 mb-1 font-mono">
                <span>Audio Track Volume</span>
                <strong className="text-emerald-450">{Math.round(volume * 100)}%</strong>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-950 rounded accent-emerald-400 cursor-pointer appearance-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9.5px] text-slate-450 block font-mono">BROWSER INTERFACE SPEAKER AGENT</label>
              <select
                value={selectedVoiceName}
                onChange={(e) => setSelectedVoiceName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded text-xs px-2.5 py-1.5 text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
              >
                {availableVoices.length === 0 ? (
                  <option>Detecting TTS vocal node...</option>
                ) : (
                  availableVoices.map(v => (
                    <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
                  ))
                )}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: HUMANIZER AND EXPRESSIVE ENGINE ACCENTS */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 space-y-4 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">🎭</span>
            <h3 className="font-extrabold text-white text-xs sm:text-sm">Vocal Humanizer & Filler controls</h3>
          </div>
          <span className="text-[9px] font-mono text-slate-500">Acoustic Realism</span>
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-850/80 flex items-center justify-between">
          <div className="pr-2">
            <strong className="text-[11px] text-emerald-400 font-mono block">👥 Accent Breathing & Humanizer Pause</strong>
            <p className="text-[9px] text-slate-500 leading-normal mt-0.5">Dynamically sweep speed pitches & insert speech pauses for intense action.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input 
              type="checkbox" 
              checked={isHumanizerEnabled} 
              onChange={(e) => setIsHumanizerEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-8 h-4 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-slate-300 after:rounded-full after:h-3 after:w-3.5 after:transition-all peer-checked:bg-emerald-500 hover:after:bg-white"></div>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 font-mono font-bold block">DESI FILLERS FREQUENCY</label>
            <select
              value={desiFillerFrequency}
              onChange={(e) => setDesiFillerFrequency(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-305 focus:outline-none font-mono"
            >
              <option value="none">No Fillers (Refined Dialect)</option>
              <option value="low">Low Density fillers</option>
              <option value="medium">Medium Content "Arey Baap Re!"</option>
              <option value="high">High density "Guru Oye!"</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 font-mono font-bold block">VOCAL EMOTION ENHANCER</label>
            <select
              value={selectedVoiceEmotion.id}
              onChange={(e) => {
                const found = VOICE_EMOTIONS.find(ve => ve.id === e.target.value);
                if (found) setSelectedVoiceEmotion(found);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-305 focus:outline-none font-mono"
            >
              {VOICE_EMOTIONS.map(ve => (
                <option key={ve.id} value={ve.id}>🎭 {ve.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] text-slate-400 font-mono font-bold block">BROADCAST COMMENTARY ENERGY</label>
          <select
            value={voiceEnergyLevel}
            onChange={(e) => setVoiceEnergyLevel(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-300 focus:outline-none font-mono"
          >
            <option value="low">💤 Calm Relaxed Analyst Lounge</option>
            <option value="medium">🗣️ Standard Sports News Desk</option>
            <option value="high">🔥 Cricket Peak Match Over</option>
            <option value="extreme">⚡ Screaming Stadium Arena Hype</option>
          </select>
        </div>

      </div>

    </div>
  );
}
