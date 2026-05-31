import React, { useState } from "react";
import { Search, AlertCircle, Sparkles, RefreshCw, Globe, Flame, Award, Users, Crosshair } from "lucide-react";
import { 
  LANGUAGES, 
  DIALECTS, 
  ENTERTAINMENT_PERSONAS, 
  HYBRID_LANGUAGES 
} from "../data/multilingualData";

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
  
  // LIVE IPL SCOREBOARD PROPS
  matchScorecard: any;
  setMatchScorecard: (val: any) => void;
  liveLoading: boolean;
  handleFetchLiveMatch: () => void;
  handleBowlNextBall: () => void;
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
  errorMessage,
  isLoading,
  handleGenerateCommentary,
  
  matchScorecard,
  setMatchScorecard,
  liveLoading,
  handleFetchLiveMatch,
  handleBowlNextBall
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

  // Color code helper for ball details display on scoreboard over history
  const getBallBadgeColor = (ball: string) => {
    const b = ball.trim().toUpperCase();
    if (b === "6") return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-extrabold";
    if (b === "4") return "bg-orange-500/20 text-orange-400 border border-orange-500/40 font-extrabold";
    if (b === "W") return "bg-rose-600 text-white font-extrabold border border-rose-500 animate-pulse";
    if (b === "0" || b === "DOT") return "bg-slate-900 text-slate-500 border border-slate-800";
    if (b.includes("WD") || b.includes("NB")) return "bg-indigo-950 text-indigo-300 border border-indigo-900";
    return "bg-slate-800 text-slate-300 border border-slate-700";
  };

  return (
    <div className="space-y-4">
      
      {/* SECTION A: STADIUM LIVE RUNNING MATCH CONTROL CENTER */}
      <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Glow Header */}
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 px-4 py-3 border-b border-slate-850 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-extrabold uppercase">
              TATA IPL LIVE DIGITAL CONTROLLERS
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-500 font-semibold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            {matchScorecard?.tournament || "TATA IPL T20 FEED"}
          </span>
        </div>

        {/* Dynamic Scoreboard Box */}
        <div className="p-4 sm:p-5 space-y-4.5 bg-slate-950/70">
          
          {/* Match Score Display Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/40 border border-slate-850 p-3.5 rounded-xl">
            <div>
              <div className="flex items-center gap-2 font-bold text-white text-sm sm:text-base">
                <span className="text-orange-400">🏏</span>
                <span>{matchScorecard?.teamA}</span>
                <span className="text-slate-500 text-xs">vs</span>
                <span className="text-emerald-400">{matchScorecard?.teamB}</span>
              </div>
              <p className="text-[10px] text-slate-450 mt-1 font-mono tracking-tight text-slate-400">
                Current batting: <strong className="text-white uppercase">{matchScorecard?.battingTeam}</strong>
              </p>
            </div>

            <div className="text-right flex sm:flex-col items-baseline sm:items-end gap-2 sm:gap-0 bg-slate-950 border border-slate-850 sm:border-transparent px-3 py-1.5 sm:p-0 rounded-lg">
              <div className="text-emerald-400 text-lg sm:text-2xl font-black font-mono tracking-tight leading-none">
                {matchScorecard?.scoreCurrent}
              </div>
              <span className="text-[10px] font-mono text-slate-550 block mt-0.5 font-bold text-slate-400">
                {matchScorecard?.oversCurrent} Overs
              </span>
            </div>
          </div>

          {/* Batsmen & Bowlers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="live-player-matrix">
            {/* Batter Box */}
            <div className="bg-slate-900/60 border border-slate-850 p-3 rounded-xl flex flex-col justify-between">
              <div className="flex items-center gap-1 text-[10px] text-slate-450 uppercase font-mono font-bold tracking-wider mb-2 text-slate-500">
                <Users className="w-3.5 h-3.5 text-orange-400" />
                <span>Active Batsmen</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-semibold">
                  <div className="flex items-center gap-1.5 text-white">
                    <span className="text-emerald-400 animate-pulse text-[11px]">🟢</span>
                    <span className="font-sans font-bold">{matchScorecard?.batter1?.name}</span>
                  </div>
                  <div className="text-slate-300">
                    <strong className="text-white text-sm font-black">{matchScorecard?.batter1?.runs}</strong>
                    <span className="text-[10px] text-slate-500">({matchScorecard?.batter1?.balls}b)</span>
                    <span className="text-[9px] bg-slate-950 px-1 py-0.5 rounded text-slate-400 ml-1.5 font-normal">SR {matchScorecard?.batter1?.sr}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs font-mono font-semibold border-t border-slate-850/60 pt-2">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="text-slate-700 text-[11px]">&bull;</span>
                    <span className="font-sans">{matchScorecard?.batter2?.name}</span>
                  </div>
                  <div className="text-slate-450">
                    <strong className="text-slate-300 text-sm font-black">{matchScorecard?.batter2?.runs}</strong>
                    <span className="text-[10px] text-slate-500 font-normal">({matchScorecard?.batter2?.balls}b)</span>
                    <span className="text-[9px] bg-slate-950 px-1 py-0.5 rounded text-slate-500 ml-1.5 font-normal">SR {matchScorecard?.batter2?.sr}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bowler Box */}
            <div className="bg-slate-900/60 border border-slate-850 p-3 rounded-xl flex flex-col justify-between">
              <div className="flex items-center gap-1 text-[10px] text-slate-450 uppercase font-mono font-bold tracking-wider mb-2 text-slate-500">
                <Crosshair className="w-3.5 h-3.5 text-emerald-450" />
                <span>Active Bowler</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-white">
                  <span className="font-sans font-extrabold text-slate-200">{matchScorecard?.bowler?.name}</span>
                  <div className="text-slate-300">
                    <span className="text-slate-450 font-normal text-[10px]">Overs:</span> {matchScorecard?.bowler?.overs}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1 pt-1 ml-0.5">
                  <div className="bg-slate-950/70 py-1 px-2 rounded border border-slate-850 text-center">
                    <span className="text-[8px] text-slate-500 font-mono font-black uppercase block leading-none">Conceded</span>
                    <strong className="text-white text-xs font-black font-mono block mt-1">{matchScorecard?.bowler?.runsAdded} Runs</strong>
                  </div>
                  <div className="bg-slate-950/70 py-1 px-2 rounded border border-slate-850 text-center">
                    <span className="text-[8px] text-slate-500 font-mono font-black uppercase block leading-none">Wickets</span>
                    <strong className="text-rose-500 text-xs font-black font-mono block mt-1">{matchScorecard?.bowler?.wickets} Wkt</strong>
                  </div>
                  <div className="bg-slate-950/70 py-1 px-2 rounded border border-slate-850 text-center">
                    <span className="text-[8px] text-slate-500 font-mono font-black uppercase block leading-none">Economy</span>
                    <strong className="text-indigo-400 text-xs font-black font-mono block mt-1">{matchScorecard?.bowler?.econ}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Over Ball history / Situation Status */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[10px] font-mono tracking-tight">
              <span className="text-slate-500 font-bold uppercase">This Over History:</span>
              <span className="text-slate-400 bg-slate-900 px-2 py-0.5 rounded font-bold border border-slate-850">
                Recent Outcomes
              </span>
            </div>

            {/* Over Ball Badges Strip */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              {matchScorecard?.recentBalls?.length === 0 ? (
                <span className="text-[10px] font-mono font-bold text-slate-600 block py-1">Beginning of the new over...</span>
              ) : (
                matchScorecard?.recentBalls?.map((ball: string, index: number) => (
                  <span
                    key={index}
                    className={`w-7.5 h-7.5 rounded-full flex items-center justify-center text-[10px] font-mono font-black shadow-sm ${getBallBadgeColor(ball)}`}
                  >
                    {ball}
                  </span>
                ))
              )}
            </div>

            <div className="bg-orange-950/20 border border-orange-900/40 rounded-xl p-3 text-[10.5px] leading-relaxed text-orange-300 font-semibold flex items-center gap-2">
              <Award className="w-4 h-4 shrink-0 text-orange-400" />
              <p>{matchScorecard?.situation || "No special run target situation configured."}</p>
            </div>
          </div>

          {/* DELIVER DYNAMIC MATCH COMMENTARY EVENTS LOG ACTION */}
          <div className="pt-2.5 border-t border-slate-850 space-y-2">
            <label className="text-[10px] text-slate-450 block uppercase font-mono font-extrabold tracking-wider text-slate-450">
              📢 Dynamic Live Action Description (Generated on-the-fly)
            </label>
            <div className="relative">
              <textarea
                value={rawEvent}
                onChange={(e) => setRawEvent(e.target.value)}
                rows={2}
                placeholder="The dynamic match detail will appear here. You can manually edit it to trigger any custom action you want!"
                className="w-full text-xs sm:text-sm bg-slate-900/90 border border-slate-800 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-200 placeholder-slate-700 resize-none font-sans leading-relaxed"
                maxLength={450}
              />
              <div className="absolute bottom-1.5 right-2 text-[8.5px] font-mono text-slate-600">
                {rawEvent.length}/450 Chars
              </div>
            </div>
          </div>

          {/* Scoreboard Actions Dual Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleFetchLiveMatch}
              disabled={liveLoading}
              className={`py-3 px-4 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition border cursor-pointer active:scale-[0.98] ${
                liveLoading
                  ? "bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed"
                  : "bg-slate-900 hover:bg-slate-850 text-emerald-450 hover:text-emerald-400 border-slate-800 hover:border-emerald-900"
              }`}
            >
              {liveLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  TUNING DIALS...
                </>
              ) : (
                <>
                  <Globe className="w-3.5 h-3.5" />
                  🌐 CONNECT GOOGLE LIVE IPL
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleBowlNextBall}
              disabled={liveLoading}
              className={`py-3 px-4 rounded-xl font-mono text-xs font-black tracking-wide flex items-center justify-center gap-2 transition cursor-pointer active:scale-[0.98] ${
                liveLoading
                  ? "bg-slate-900 text-slate-500 border-slate-800"
                  : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold hover:shadow-lg hover:shadow-emerald-500/10"
              }`}
            >
              {liveLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-950" />
                  BOWLER RUNNING IN...
                </>
              ) : (
                <>
                  <Flame className="w-3.5 h-3.5 text-slate-950" />
                  ⚡ BOWL NEXT BALL (LIVE LOOP)
                </>
              )}
            </button>
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
              <label className="text-[9.5px] text-slate-405 block font-bold uppercase font-mono tracking-wider">Configure regional dialect Slang voice</label>
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
              ? "bg-slate-900 text-slate-505 border-slate-800 cursor-not-allowed" 
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
