import React, { useState } from "react";
import { Search, ListFilter, Heart, AlertCircle, Sparkles, RefreshCw, CheckCircle, HelpCircle } from "lucide-react";
import { 
  LANGUAGES, 
  DIALECTS, 
  ENTERTAINMENT_PERSONAS, 
  HYBRID_LANGUAGES 
} from "../data/multilingualData";

const CRICKET_MOMENTS_PRESETS = [
  {
    id: "dhoni_six_historic",
    title: "Dhoni's World Cup Final Six 🏆",
    event: "Nuwan Kulasekara bowls full, MS Dhoni swings with high backlift, lofts it straight over long-on for a monumental six! India wins the World Cup in superb fashion after 28 years!",
    category: "Classic"
  },
  {
    id: "kohli_mcg_six",
    title: "Kohli's Impossible MCG Six ⚡",
    event: "Haris Rauf bowls a slower back-of-hand bouncer on off stump. Virat Kohli stands tall, punches it flat back over the bowler's head straight into the stands at MCG for an unbelievable six!",
    category: "Unbelievable"
  },
  {
    id: "comical_muddle",
    title: "Chaotic Gully Style Runout 🤡",
    event: "The batsman edges behind, wicketkeeper misses, slip fielder falls down. Batsmen run two. Suddenly both strikers end up at the bowler's end, screaming at each other, while the bowler walks and runs them out.",
    category: "Comedy"
  },
  {
    id: "bumrah_yorker",
    title: "Jasprit Bumrah Devastating Yorker 🎯",
    event: "Jasprit Bumrah bowls an inswinging toe-crushing yorker at 145 kph. The batsman is completely beaten, falls down onto his back, and the middle stump is sent flying out of the ground!",
    category: "Wicket"
  }
];

interface OnAirDeskProps {
  rawEvent: string;
  setRawEvent: (val: string) => void;
  selectedLanguage: any;
  setSelectedLanguage: (val: any) => void;
  selectedDialect: any;
  setSelectedDialect: (val: any) => void;
  selectedHybrid: any;
  setSelectedHybrid: (val: any) => void;
  selectedPersona: any;
  handlePersonaChange: (val: any) => void;
  searchLangQuery: string;
  setSearchLangQuery: (val: string) => void;
  popularFilterOnly: boolean;
  setPopularFilterOnly: (val: boolean) => void;
  filteredLanguages: any[];
  favoriteLanguageIds: string[];
  toggleFavoriteLanguage: (id: string, e: any) => void;
  errorMessage: string;
  isLoading: boolean;
  handleGenerateCommentary: () => void;
}

export default function OnAirDesk({
  rawEvent,
  setRawEvent,
  selectedLanguage,
  setSelectedLanguage,
  selectedDialect,
  setSelectedDialect,
  selectedHybrid,
  setSelectedHybrid,
  selectedPersona,
  handlePersonaChange,
  searchLangQuery,
  setSearchLangQuery,
  popularFilterOnly,
  setPopularFilterOnly,
  filteredLanguages,
  favoriteLanguageIds,
  toggleFavoriteLanguage,
  errorMessage,
  isLoading,
  handleGenerateCommentary
}: OnAirDeskProps) {
  
  const [showAdvancedLanguages, setShowAdvancedLanguages] = useState(false);

  // High-frequency presets that bundle language, dialect, hybrid slang and commentator instantly
  const POPULAR_VIBES = [
    { name: "UP Charcha 🗣️", langId: "hi", dialectId: "up_adda", hybridId: "none", personaId: "sidhu_paji", label: "🔥 UP/Sidhu", desc: "Awadhi-Bhojpuri flow spiced by Sidhuism" },
    { name: "Punjabi Retro 🕺", langId: "pa", dialectId: "punjabi_retro", hybridId: "punjlish", personaId: "punjabi_retro", label: "🕺 Punjab Vibe", desc: "Vintage 80s Punjabi energy mixed into English phrases" },
    { name: "Chennai Street 🏏", langId: "ta", dialectId: "chennai_gully", hybridId: "tanglish", personaId: "gully_kid", label: "🏏 Chennai Style", desc: "Local colloquial Tamil-Eng team banter" },
    { name: "Kolkata Adda 🐟", langId: "bn", dialectId: "kolkata_adda", hybridId: "benglish", personaId: "meme_lord", label: "🐟 Kolkata Fun", desc: "Sarcastic Benglish cricket jokes" },
    { name: "Stats Analytics 📊", langId: "en", dialectId: "", hybridId: "none", personaId: "data_scientist", label: "📊 Tech Data", desc: "Advanced telemetry & cricket metrics" }
  ];

  const handleVibeSelect = (vibe: typeof POPULAR_VIBES[0]) => {
    const lang = LANGUAGES.find(l => l.id === vibe.langId);
    if (lang) setSelectedLanguage(lang);
    
    if (vibe.dialectId) {
      const dialect = DIALECTS.find(d => d.id === vibe.dialectId);
      if (dialect) setSelectedDialect(dialect);
    } else {
      setSelectedDialect(null);
    }

    const hybrid = HYBRID_LANGUAGES.find(h => h.id === vibe.hybridId);
    if (hybrid) setSelectedHybrid(hybrid);

    const persona = ENTERTAINMENT_PERSONAS.find(p => p.id === vibe.personaId);
    if (persona) handlePersonaChange(persona);
  };

  return (
    <div className="space-y-4">
      
      {/* SECTION A: EVENT DETAILS TEXTAREA */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 space-y-4 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">📝</span>
            <h3 className="font-extrabold text-white text-xs sm:text-sm">Step 1: Raw Match Action Details</h3>
          </div>
          <span className="text-[9.5px] font-mono text-slate-550">Max limit: 450 chars</span>
        </div>

        {/* Micro-Chips for Scenario selection */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight mr-1">Hot Presets:</span>
          {CRICKET_MOMENTS_PRESETS.map((p) => {
            const isSelected = rawEvent === p.event;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setRawEvent(p.event)}
                className={`px-2 py-1 rounded text-[9.5px] font-semibold transition cursor-pointer ${
                  isSelected
                    ? "bg-emerald-500 text-slate-950 font-bold"
                    : "bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-850"
                }`}
              >
                {p.title}
              </button>
            );
          })}
        </div>

        <div className="relative">
          <textarea
            value={rawEvent}
            onChange={(e) => setRawEvent(e.target.value)}
            rows={3}
            placeholder="Write or edit live match action details (e.g. Kohli steps down and smokes it straight back over bowler's head...)"
            className="w-full text-xs sm:text-sm bg-slate-950/80 border border-slate-800/90 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-200 placeholder-slate-700 resize-none font-sans leading-relaxed"
            maxLength={450}
          />
          <div className="absolute bottom-1.5 right-2.5 text-[8.5px] font-mono text-slate-600">
            {rawEvent.length}/450 Chars
          </div>
        </div>
      </div>

      {/* SECTION B: INSTANT INTUITIVE VIBES MIXER */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 space-y-3.5 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">⚡</span>
            <h3 className="font-extrabold text-white text-xs sm:text-sm">Step 2: Instant Language & Slang Presets</h3>
          </div>
          <span className="text-[8.5px] bg-emerald-950/40 text-emerald-400 px-2 py-0.5 rounded border border-emerald-900/30 uppercase font-bold tracking-wider font-mono">
            Vocal dialect load
          </span>
        </div>

        <p className="text-[10.5px] text-slate-400 leading-normal">
          Pick an instant cricket vibe to configure native scripts, regional slang, syntax switching mode and commentators in one click!
        </p>

        {/* Horizontal vibe chips layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {POPULAR_VIBES.map((v, idx) => {
            const isMatched = selectedLanguage.id === v.langId && 
                              (selectedDialect?.id || null) === (v.dialectId || null) &&
                              selectedHybrid.id === v.hybridId &&
                              selectedPersona.id === v.personaId;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleVibeSelect(v)}
                className={`text-left p-2.5 rounded-xl border flex flex-col justify-between transition h-16 leading-tight cursor-pointer ${
                  isMatched
                    ? "bg-slate-950 border-emerald-500/70 text-white shadow-md shadow-emerald-500/5 ring-1 ring-emerald-500/10"
                    : "bg-slate-950 hover:bg-slate-900/90 border-slate-850/80 text-slate-400"
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <strong className="text-xs font-bold text-white block truncate pr-1">{v.name}</strong>
                  <span className={`text-[8px] font-mono uppercase px-1.5 rounded leading-none shrink-0 font-bold ${
                    isMatched ? "bg-emerald-500 text-slate-950" : "bg-slate-850 text-slate-500"
                  }`}>
                    {isMatched ? "Active" : "Select"}
                  </span>
                </div>
                <p className="text-[9.5px] text-slate-500 truncate w-full mt-1 leading-none">{v.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Summary / Advanced toggle */}
        <div className="pt-2 border-t border-slate-800/40 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-[10.5px] text-slate-300 font-mono">
            <span className="block text-slate-500">Active Setup:</span>
            <span className="text-emerald-400 font-bold block bg-slate-950 px-2 py-0.5 rounded leading-none">
              🗣️ {selectedLanguage.name} &bull; {selectedDialect?.name || "Standard Accent"} ({selectedHybrid.name})
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowAdvancedLanguages(!showAdvancedLanguages)}
            className="w-full mt-1 py-1.5 px-3 rounded-lg bg-slate-950 hover:bg-slate-900 text-[10.5px] font-semibold text-slate-400 border border-slate-850 flex items-center justify-center gap-1 transition-all cursor-pointer"
          >
            ⚙️ {showAdvancedLanguages ? "Hide Custom Details Menu" : "Choose from 22 states list, Search, Slang parameters"}
          </button>
        </div>

        {/* Collapsible Advanced Lang list */}
        {showAdvancedLanguages && (
          <div className="space-y-3.5 pt-3.5 border-t border-slate-800 bg-slate-950 p-4 rounded-xl animate-fadeIn">
            
            {/* Search Language and Filter All 22 states list */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Type native language..."
                  value={searchLangQuery}
                  onChange={(e) => setSearchLangQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-7.5 pr-3 py-1 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
                />
              </div>
              <button
                type="button"
                onClick={() => setPopularFilterOnly(!popularFilterOnly)}
                className={`px-3 py-1 rounded bg-slate-900 border text-xs font-mono shrink-0 transition cursor-pointer ${
                  popularFilterOnly ? "border-emerald-600 text-emerald-300" : "border-slate-800 text-slate-400"
                }`}
              >
                {popularFilterOnly ? "Popular" : "Show All 22"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-[140px] overflow-y-auto pr-1">
              {filteredLanguages.map((l) => {
                const isSelected = selectedLanguage.id === l.id;
                return (
                  <div
                    key={l.id}
                    onClick={() => {
                      setSelectedLanguage(l);
                      const matchDialect = DIALECTS.find(d => d.langId === l.id);
                      setSelectedDialect(matchDialect || null);
                    }}
                    className={`p-2 rounded-lg border text-left flex items-start justify-between gap-1.5 transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 border-emerald-500/65 text-white shadow-inner"
                        : "bg-slate-900/40 border-slate-850 text-slate-400 hover:border-slate-800"
                    }`}
                  >
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold block truncate">{l.name}</span>
                      <span className="text-[8.5px] text-slate-500 font-mono italic shrink-0 block">{l.native}</span>
                    </div>
                    <span className="text-[8px] bg-slate-950 border border-slate-850 text-slate-500 px-1 rounded block">{l.id.toUpperCase()}</span>
                  </div>
                );
              })}
            </div>

            {/* Dialect selector dropdown inside Advanced */}
            <div className="space-y-1 p-2.5 rounded-lg bg-slate-900 border border-slate-850">
              <label className="text-[9.5px] text-slate-400 block font-bold uppercase font-mono tracking-wider">Configure regional dialect Slang voice</label>
              <select
                value={selectedDialect?.id || ""}
                onChange={(e) => {
                  const chosen = DIALECTS.find(d => d.id === e.target.value);
                  setSelectedDialect(chosen || null);
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-300 focus:outline-none font-mono"
              >
                <option value="">-- Standard Accent Mode (No slang dialect) --</option>
                {DIALECTS.map(d => (
                  <option key={d.id} value={d.id}>{d.name} ({d.region})</option>
                ))}
              </select>
            </div>

            {/* Hybrid Language Mixing Code */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[9.5px] text-slate-405 block font-bold uppercase font-mono tracking-wider">Configure Linguistic Hybrid Level</label>
              <div className="grid grid-cols-2 gap-1.5">
                {HYBRID_LANGUAGES.map(h => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setSelectedHybrid(h)}
                    className={`text-left p-2 rounded-md border flex flex-col justify-between text-[10px] h-10 leading-tight transition cursor-pointer ${
                      selectedHybrid.id === h.id
                        ? "bg-slate-900 border-emerald-500/50 text-emerald-400"
                        : "bg-slate-900/40 border-slate-850 text-slate-500"
                    }`}
                  >
                    <span className="font-bold block text-slate-300">{h.name}</span>
                    <span className="text-[8.5px] text-slate-500 truncate w-full block">{h.description}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* SECTION C: ANNUNCIER PERSONA CRICKET DESK */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 space-y-3.5 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">🗣️</span>
            <h3 className="font-extrabold text-white text-xs sm:text-sm">Step 3: Commentary Persona Studio</h3>
          </div>
          <span className="text-[9px] font-mono text-slate-500">{ENTERTAINMENT_PERSONAS.length} Announcers active</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {ENTERTAINMENT_PERSONAS.map((p) => {
            const isActive = selectedPersona.id === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handlePersonaChange(p)}
                className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition-all h-22 justify-between gap-1 cursor-pointer ${
                  isActive
                    ? "bg-slate-950 border-emerald-500 text-white shadow"
                    : "bg-slate-950 hover:bg-slate-900/90 border-slate-850/80 text-slate-400"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-lg select-none leading-none filter drop-shadow">{p.icon}</span>
                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold leading-none shrink-0 ${
                    isActive ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-850 text-slate-500"
                  }`}>
                    {p.badge}
                  </span>
                </div>
                <div>
                  <strong className={`block text-[11px] font-bold leading-tight ${isActive ? "text-emerald-400" : "text-white"}`}>{p.name}</strong>
                  <span className="text-[9px] text-slate-500 leading-none truncate block mt-0.5">{p.title}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION D: STADIUM CTA ACTION BUTTON */}
      <div className="space-y-2">
        {errorMessage && (
          <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-3 text-xs text-red-500 flex items-start gap-2 animate-pulse">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>{errorMessage}</p>
          </div>
        )}

        <button
          type="button"
          onClick={handleGenerateCommentary}
          disabled={isLoading}
          className={`w-full py-3.5 px-5 rounded-xl font-bold font-mono tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2.5 cursor-pointer transition transform active:scale-[0.99] border ${
            isLoading 
              ? "bg-slate-900 text-slate-500 border-slate-800 cursor-not-allowed" 
              : "bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 border-emerald-500 hover:brightness-110 shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/10"
          }`}
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4.5 h-4.5 animate-spin text-slate-950" />
              AI BOT IS FORMULATING SCRIPT...
            </>
          ) : (
            <>
              <Sparkles className="w-4.5 h-4.5 text-slate-950" />
              GENERATE ON-AIR COMMENTARY PLAY
            </>
          )}
        </button>
      </div>

    </div>
  );
}
