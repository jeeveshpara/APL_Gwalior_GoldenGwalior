import { useState } from "react";
import { MapPin, Sparkles, Navigation, Flame, Info } from "lucide-react";
import { STATE_MAP_DATA, StateData } from "../data/multilingualData";

interface IndiaMapProps {
  onSelectState: (state: StateData) => void;
  activeStateId: string;
}

export default function IndiaMap({ onSelectState, activeStateId }: IndiaMapProps) {
  const [hoveredState, setHoveredState] = useState<StateData | null>(null);

  // Approximate relative X (left) and Y (top) coordinates for placing state nodes
  // geographically in a gorgeous high-tech responsive stadium radar frame.
  const statesGrid = [
    { state: STATE_MAP_DATA.find(s => s.id === "IN-JK")!, x: 50, y: 8, color: "from-pink-500 to-rose-600" },
    { state: STATE_MAP_DATA.find(s => s.id === "IN-PB")!, x: 42, y: 22, color: "from-orange-500 to-amber-600" },
    { state: STATE_MAP_DATA.find(s => s.id === "IN-HR")!, x: 48, y: 31, color: "from-yellow-400 to-orange-500" },
    { state: STATE_MAP_DATA.find(s => s.id === "IN-RJ")!, x: 28, y: 40, color: "from-red-500 to-orange-600" },
    { state: STATE_MAP_DATA.find(s => s.id === "IN-UP")!, x: 58, y: 41, color: "from-emerald-500 to-teal-600" },
    { state: STATE_MAP_DATA.find(s => s.id === "IN-BR")!, x: 74, y: 44, color: "from-violet-500 to-indigo-600" },
    { state: STATE_MAP_DATA.find(s => s.id === "IN-GJ")!, x: 18, y: 56, color: "from-amber-400 to-yellow-600" },
    { state: STATE_MAP_DATA.find(s => s.id === "IN-MP")!, x: 46, y: 53, color: "from-sky-500 to-blue-600" },
    { state: STATE_MAP_DATA.find(s => s.id === "IN-WB")!, x: 80, y: 53, color: "from-purple-500 to-fuchsia-600" },
    { state: STATE_MAP_DATA.find(s => s.id === "IN-AS")!, x: 92, y: 39, color: "from-teal-400 to-emerald-500" },
    { state: STATE_MAP_DATA.find(s => s.id === "IN-MH")!, x: 38, y: 68, color: "from-indigo-500 to-blue-600" },
    { state: STATE_MAP_DATA.find(s => s.id === "IN-AP")!, x: 52, y: 77, color: "from-red-400 to-pink-600" },
    { state: STATE_MAP_DATA.find(s => s.id === "IN-OR")!, x: 67, y: 66, color: "from-cyan-400 to-blue-500" },
    { state: STATE_MAP_DATA.find(s => s.id === "IN-KA")!, x: 42, y: 84, color: "from-fuchsia-500 to-pink-600" },
    { state: STATE_MAP_DATA.find(s => s.id === "IN-TN")!, x: 50, y: 92, color: "from-rose-500 to-orange-600" },
    { state: STATE_MAP_DATA.find(s => s.id === "IN-KL")!, x: 38, y: 92, color: "from-green-500 to-emerald-600" }
  ].filter(item => item.state !== undefined);

  const activeStateObj = STATE_MAP_DATA.find(s => s.id === activeStateId) || STATE_MAP_DATA[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl relative overflow-hidden flex flex-col h-full" id="india-commentary-map-panel">
      {/* Decorative neon grid backing */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold block mb-1">Interactive Feature</span>
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            India Commentary Map
          </h3>
        </div>
        <span className="text-[10px] font-mono bg-slate-950 border border-slate-850 px-2.5 py-1 text-slate-400 rounded-md">
          Geographic Dialect Trigger
        </span>
      </div>

      <p className="text-xs text-slate-400 mb-4 leading-relaxed relative z-10">
        Click any regional hub on the radar map to instantly synchronize the AI Commentary engine to that state's language and local dialect.
      </p>

      {/* MAP radar interface container */}
      <div className="relative flex-1 min-h-[340px] bg-slate-950 border border-slate-850/60 rounded-xl p-4 flex items-center justify-center overflow-hidden">
        
        {/* Holographic Radar pulse rings */}
        <div className="absolute w-[440px] h-[440px] rounded-full border border-slate-800/30 pointer-events-none animate-pulse" />
        <div className="absolute w-[280px] h-[280px] rounded-full border border-slate-800/10 pointer-events-none" />
        <div className="absolute w-[140px] h-[140px] rounded-full border border-slate-800/10 pointer-events-none" />

        {/* Outer map outline grid simulating radar targeting */}
        <div className="w-full h-full relative" style={{ minWidth: "280px", maxWidth: "420px", height: "350px" }}>
          
          {/* Subtle connecting mesh lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25" id="mesh-svg">
            <path 
              d="M 50,8 L 42,22 L 48,31 L 58,41 L 74,44 L 80,53 M 28,40 L 48,31 L 46,53 L 18,56 M 46,53 L 38,68 L 42,84 L 38,92 L 50,92 M 58,41 L 46,53 L 38,68 L 52,77 L 50,92 M 74,44 L 67,66 L 52,77 M 80,53 L 92,39" 
              className="stroke-slate-700 stroke-[1.5]" 
              fill="none" 
              strokeDasharray="4 4" 
            />
          </svg>

          {/* Render interactive nodes */}
          {statesGrid.map(({ state, x, y, color }) => {
            const isActive = activeStateId === state.id;
            const isHovered = hoveredState?.id === state.id;

            return (
              <button
                key={state.id}
                onClick={() => onSelectState(state)}
                onMouseEnter={() => setHoveredState(state)}
                onMouseLeave={() => setHoveredState(null)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 focus:outline-none transition-all duration-300 group z-20 cursor-pointer`}
                style={{ left: `${x}%`, top: `${y}%` }}
                id={`map-node-${state.id}`}
              >
                {/* Node Ring wrapper */}
                <div className="relative flex items-center justify-center">
                  
                  {/* Glowing background representing active connection */}
                  {isActive && (
                    <span className="absolute w-7 h-7 rounded-full bg-emerald-500/20 ring-1 ring-emerald-400/40 animate-ping" />
                  )}

                  {/* Core interactive dot container */}
                  <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                    isActive 
                      ? "bg-emerald-400 border-white scale-125 shadow-[0_0_12px_rgba(52,211,153,0.8)]" 
                      : isHovered 
                        ? "bg-slate-200 border-slate-100 scale-110" 
                        : "bg-slate-900 border-slate-700"
                  }`}>
                    {/* Tiny hot-core */}
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                  </div>

                  {/* Floating badge for state label */}
                  <div className={`absolute left-5 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border whitespace-nowrap transition-all duration-300 ${
                    isActive 
                      ? "bg-slate-900 border-emerald-500/50 text-emerald-400" 
                      : isHovered 
                        ? "bg-slate-800 border-slate-500 text-white" 
                        : "bg-slate-950/80 border-slate-800/80 text-slate-400 opacity-70 group-hover:opacity-100"
                  }`}>
                    {state.name}
                  </div>

                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active State Metadata Panel */}
      <div className="mt-4 bg-slate-950/90 border border-slate-850 rounded-xl p-3.5 relative z-10">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block">SELECTED REGION</span>
            <h4 className="text-sm font-extrabold text-white flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {activeStateObj?.name} Stadium Hub
            </h4>
          </div>

          <div className="text-right">
            <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block">DEFAULT DIALECT</span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {activeStateObj?.dialectId ? STATE_MAP_DATA.find(s => s.id === activeStateId)?.dialectId.replace(/_/g, " ").toUpperCase() : "STANDARD"}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-normal mb-2 flex items-start gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
          <span>{activeStateObj?.funFact}</span>
        </p>

        <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-slate-900/60 text-[11px]">
          <span className="text-slate-500 font-mono">Sync triggers:</span>
          <span className="bg-emerald-950/30 text-emerald-400 px-2 py-0.5 rounded border border-emerald-900/30 font-mono">
            Lang: {activeStateObj?.langId.toUpperCase()}
          </span>
          <span className="bg-indigo-950/30 text-indigo-400 px-2 py-0.5 rounded border border-indigo-900/30 font-mono">
            Dialect Mode Activated
          </span>
        </div>
      </div>
    </div>
  );
}
