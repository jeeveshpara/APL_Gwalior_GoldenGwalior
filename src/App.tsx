import React, { useState, useEffect, useRef } from "react";
import { playStadiumTrumpet, playBatStroke, playCrowdRoar, playWhistle } from "./data/synthAudio";
import { 
  Mic, 
  Play, 
  Pause, 
  Square, 
  Sparkles, 
  Key, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle,
  Sliders,
  Tv,
  Globe,
  MapPin,
  Heart,
  Search,
  BookOpen,
  Volume2,
  ChevronRight,
  Info,
  Flame,
  Award,
  ListFilter
} from "lucide-react";
import IndiaMap from "./components/IndiaMap";
import Soundboard from "./components/Soundboard";
import SetupInstructions from "./components/SetupInstructions";
import OnAirDesk from "./components/OnAirDesk";
import VoiceMixing from "./components/VoiceMixing";
import ExtrasPanel from "./components/ExtrasPanel";
import { 
  LANGUAGES, 
  DIALECTS, 
  ENTERTAINMENT_PERSONAS, 
  HYBRID_LANGUAGES, 
  STATE_MAP_DATA,
  Language, 
  Dialect, 
  Persona, 
  StateData,
  VoiceCharacter,
  VoiceEmotion,
  IndianAccent,
  BroadcastMode,
  MultiVoiceMode,
  MALE_VOICE_CHARACTERS,
  FEMALE_VOICE_CHARACTERS,
  VOICE_CHARACTERS,
  VOICE_EMOTIONS,
  INDIAN_ACCENTS,
  BROADCAST_MODES,
  MULTI_VOICE_MODES
} from "./data/multilingualData";

// Native scenario presets
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

export default function App() {
  // Navigation tabs state for a simplified workspace experience
  const [activeTab, setActiveTab] = useState<"broadcast" | "casting" | "extras">("broadcast");

  // Client Gemini API Key management - now handled securely by our integrated backend server
  const [apiKey, setApiKey] = useState("integrated");
  const [showKeyField, setShowKeyField] = useState(false);
  const [keySaved, setKeySaved] = useState(true);

  // Multilingual Engine selection states
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    LANGUAGES.find(l => l.id === "hi") || LANGUAGES[0]
  );
  const [selectedDialect, setSelectedDialect] = useState<Dialect | null>(
    DIALECTS.find(d => d.id === "up_adda") || null
  );
  const [selectedPersona, setSelectedPersona] = useState<Persona>(ENTERTAINMENT_PERSONAS[0]);
  const [selectedHybrid, setSelectedHybrid] = useState(HYBRID_LANGUAGES[0]);

  // Search & Filter state for languages panel
  const [searchLangQuery, setSearchLangQuery] = useState("");
  const [popularFilterOnly, setPopularFilterOnly] = useState(false);
  const [favoriteLanguageIds, setFavoriteLanguageIds] = useState<string[]>(["hi", "pa", "ta", "bn"]);
  const [recentLanguageIds, setRecentLanguageIds] = useState<string[]>(["hi", "en", "pa"]);

  // Interactive India State Map integration state
  const [activeStateId, setActiveStateId] = useState("IN-UP");

  // Raw match event input
  const [rawEvent, setRawEvent] = useState(
    "Nuwan Kulasekara bowls full, MS Dhoni swings with high backlift, lofts it straight over long-on for a monumental six! India wins the World Cup!"
  );

  // Voice Customization & Broadcast Settings
  const [selectedVoiceChar, setSelectedVoiceChar] = useState<VoiceCharacter>(
    VOICE_CHARACTERS.find(vc => vc.id === "m_mature_man") || VOICE_CHARACTERS[3]
  );
  const [selectedVoiceChar2, setSelectedVoiceChar2] = useState<VoiceCharacter>(
    VOICE_CHARACTERS.find(vc => vc.id === "m_teen_boy") || VOICE_CHARACTERS[1]
  );
  const [selectedVoiceChar3, setSelectedVoiceChar3] = useState<VoiceCharacter>(
    VOICE_CHARACTERS.find(vc => vc.id === "f_sport_pres") || VOICE_CHARACTERS[12]
  );
  const [selectedVoiceChar4, setSelectedVoiceChar4] = useState<VoiceCharacter>(
    VOICE_CHARACTERS.find(vc => vc.id === "m_grandpa") || VOICE_CHARACTERS[8]
  );
  const [selectedVoiceEmotion, setSelectedVoiceEmotion] = useState<VoiceEmotion>(
    VOICE_EMOTIONS.find(e => e.id === "excited") || VOICE_EMOTIONS[0]
  );
  const [voiceGenderFilter, setVoiceGenderFilter] = useState<"Male" | "Female">("Male");
  const [customVoiceDepth, setCustomVoiceDepth] = useState<number>(0.5);
  const [voiceEnergyLevel, setVoiceEnergyLevel] = useState<"low" | "medium" | "high" | "extreme">("high");
  const [selectedBroadcastMode, setSelectedBroadcastMode] = useState<BroadcastMode>(
    BROADCAST_MODES.find(b => b.id === "tv_sports") || BROADCAST_MODES[0]
  );
  const [selectedMultiVoiceMode, setSelectedMultiVoiceMode] = useState<MultiVoiceMode>(
    MULTI_VOICE_MODES.find(m => m.id === "single") || MULTI_VOICE_MODES[0]
  );

  // Playback parameters
  const [pitch, setPitch] = useState(1.15);
  const [rate, setRate] = useState(1.1);
  const [volume, setVolume] = useState(1.0);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>("");

  // Commentary outputs & states
  const [isLoading, setIsLoading] = useState(false);
  const [commentaryText, setCommentaryText] = useState(
    "खूबसूरत शॉट! धोनी ने गेंद को सीधे दर्शकों में भेजा! मैच जीत लिया! भारतीय क्रिकेट इतिहास का एक सुनहरा क्षण!"
  );
  const [errorMessage, setErrorMessage] = useState("");

  // Segment Types and Parsed Dialogue Output
  interface CommentarySegment {
    speakerName: string;
    text: string;
    voiceChar: VoiceCharacter;
    emotion: VoiceEmotion;
  }

  const [commentarySegmentsList, setCommentarySegmentsList] = useState<CommentarySegment[]>(() => [{
    speakerName: "Vikram",
    text: "खूबसूरत शॉट! धोनी ने गेंद को सीधे दर्शकों में भेजा! मैच जीत लिया! भारतीय क्रिकेट इतिहास का एक सुनहरा क्षण!",
    voiceChar: VOICE_CHARACTERS.find(vc => vc.id === "m_mature_man") || VOICE_CHARACTERS[3],
    emotion: VOICE_EMOTIONS.find(e => e.id === "excited") || VOICE_EMOTIONS[0]
  }]);
  const [currentPlaySegmentIndex, setCurrentPlaySegmentIndex] = useState(-1);

  // Stadium Commentary Queue & Continuous Live Broadcast Simulation
  interface QueueItem {
    id: string;
    matchEvent: string;
    language: string;
    persona: string;
    broadcastMode: string;
    commentaryText: string;
    timestamp: string;
  }
  const [commentaryQueue, setCommentaryQueue] = useState<QueueItem[]>([]);
  const [isContinuousPlay, setIsContinuousPlay] = useState(false);

  // Media Recording For Master Broadcast Download
  const [isRecordingMaster, setIsRecordingMaster] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Teleprompter vocal word parsing
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const wordsArray = commentaryText.split(/\s+/);

  // VU Levels visualizer equalizer bars
  const [eqLevels, setEqLevels] = useState<number[]>(new Array(20).fill(10));

  // Dynamic Humanized Audio Synthesis States
  const [isHumanizerEnabled, setIsHumanizerEnabled] = useState(true);
  const [desiFillerFrequency, setDesiFillerFrequency] = useState<"none" | "low" | "medium" | "high">("medium");
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(-1);
  const [sentencesList, setSentencesList] = useState<string[]>([]);
  const [sentenceEmotion, setSentenceEmotion] = useState("Broadcaster Offline");
  const [isBreathingPause, setIsBreathingPause] = useState(false);

  // Refs
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const visualizerIntervalRef = useRef<NodeJS.Timeout| null>(null);
  const sentenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load TTS voice profiles
  useEffect(() => {
    const loadVoices = () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        
        // Auto-select based on chosen language
        const matchVoice = voices.find(v => 
          v.lang.toLowerCase().includes(selectedLanguage.id) || 
          v.lang.toLowerCase().includes("in")
        );
        if (matchVoice) {
          setSelectedVoiceName(matchVoice.name);
        } else if (voices.length > 0) {
          setSelectedVoiceName(voices[0].name);
        }
      }
    };

    loadVoices();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [selectedLanguage]);

  // Adjust vocalizer rate speed presets naturally when target personas change
  const handlePersonaChange = (persona: Persona) => {
    setSelectedPersona(persona);
    if (persona.id === "punjabi_retro") {
      setPitch(1.3);
      setRate(1.2);
    } else if (persona.id === "data_scientist") {
      setPitch(0.9);
      setRate(0.95);
    } else if (persona.id === "meme_lord") {
      setPitch(1.05);
      setRate(1.05);
    } else {
      setPitch(1.1);
      setRate(1.1);
    }
  };

  // State Map synchronizer callback: updates language, state, and dialect instantly
  const handleStateSelect = (state: StateData) => {
    setActiveStateId(state.id);
    
    // Locate language and dialect relation
    const targetLang = LANGUAGES.find(l => l.id === state.langId);
    if (targetLang) {
      setSelectedLanguage(targetLang);
      // add to recents list to showcase responsiveness
      if (!recentLanguageIds.includes(targetLang.id)) {
        setRecentLanguageIds(prev => [targetLang.id, ...prev.slice(0, 3)]);
      }
    }

    const targetDialect = DIALECTS.find(d => d.id === state.dialectId);
    if (targetDialect) {
      setSelectedDialect(targetDialect);
      // Auto-set matching hybrid style
      if (state.langId === "pa") {
        setSelectedHybrid(HYBRID_LANGUAGES.find(h => h.id === "punjlish") || HYBRID_LANGUAGES[0]);
      } else if (state.langId === "ta") {
        setSelectedHybrid(HYBRID_LANGUAGES.find(h => h.id === "tanglish") || HYBRID_LANGUAGES[0]);
      } else if (state.langId === "bn") {
        setSelectedHybrid(HYBRID_LANGUAGES.find(h => h.id === "benglish") || HYBRID_LANGUAGES[0]);
      } else if (state.langId === "gu") {
        setSelectedHybrid(HYBRID_LANGUAGES.find(h => h.id === "gujlish") || HYBRID_LANGUAGES[0]);
      } else {
        setSelectedHybrid(HYBRID_LANGUAGES[0]); // pure Devanagari/native
      }
    }
  };

  // Toggle favorite languages code
  const toggleFavoriteLanguage = (langId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteLanguageIds(prev => 
      prev.includes(langId) 
        ? prev.filter(id => id !== langId) 
        : [...prev, langId]
    );
  };

  // Save/clear key details
  const handleSaveApiKey = () => {
    localStorage.setItem("cricvoice_gemini_key", apiKey.trim());
    setKeySaved(!!apiKey.trim());
    setShowKeyField(false);
  };

  const handleClearApiKey = () => {
    localStorage.removeItem("cricvoice_gemini_key");
    setApiKey("");
    setKeySaved(false);
  };

  // Animate speech VU elements
  useEffect(() => {
    if (isSpeaking) {
      visualizerIntervalRef.current = setInterval(() => {
        setEqLevels(prev => 
          prev.map(() => Math.floor(Math.random() * 85) + 12)
        );
      }, 70);
    } else {
      if (visualizerIntervalRef.current) {
        clearInterval(visualizerIntervalRef.current);
      }
      setEqLevels(new Array(20).fill(10));
    }

    return () => {
      if (visualizerIntervalRef.current) {
        clearInterval(visualizerIntervalRef.current);
      }
    };
  }, [isSpeaking]);

  // Clean TTS vocal buffers
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Helper: Match best browser voice
  const findBestBrowserVoice = (character: VoiceCharacter, languageId: string, voices: SpeechSynthesisVoice[]) => {
    let candidates = voices.filter(v => {
      const langLower = v.lang.toLowerCase();
      return langLower.includes(languageId.toLowerCase()) || langLower.includes("in");
    });

    if (candidates.length === 0) {
      candidates = voices;
    }

    const isFemaleChar = character.gender === "Female";
    const femaleKeywords = ["zira", "heera", "neerja", "hazel", "samantha", "google-hindi-female", "female", "veena", "priya", "isha", "shruthi", "kalpana", "hema"];
    const maleKeywords = ["david", "ravi", "george", "mark", "google-hindi-male", "male", "rishi", "mohan", "karthik", "valluvar", "vance"];

    let genderMatched = candidates.filter(v => {
      const nameLower = v.name.toLowerCase();
      if (isFemaleChar) {
        return femaleKeywords.some(kw => nameLower.includes(kw)) && !maleKeywords.some(kw => nameLower.includes(kw));
      } else {
        return maleKeywords.some(kw => nameLower.includes(kw)) && !femaleKeywords.some(kw => nameLower.includes(kw));
      }
    });

    if (genderMatched.length > 0) {
      return genderMatched[0];
    }

    if (candidates.length > 0) {
      return candidates[0];
    }

    return null;
  };

  // Helper: Compute dynamic vocal params based on character and multipliers
  const computeVoiceParams = (
    character: VoiceCharacter,
    emotion: VoiceEmotion,
    customPitch: number,
    customRate: number,
    customDepth: number,
    energy: string
  ) => {
    let finalPitch = character.basePitch;
    let finalRate = character.baseRate;

    // 1. Age group adjust
    if (character.ageGroup === "Child") {
      finalPitch += 0.30;
      finalRate += 0.10;
    } else if (character.ageGroup === "Teen") {
      finalPitch += 0.15;
      finalRate += 0.08;
    } else if (character.ageGroup === "Senior") {
      finalPitch -= 0.12;
      finalRate -= 0.12;
    }

    // 2. Depth adjustment (customDepth: 0.0 to 1.0, centered around 0.5)
    const depthDiff = customDepth - 0.5;
    finalPitch -= depthDiff * 0.30;
    finalRate -= depthDiff * 0.10;

    // 3. Accent / Tone tweaks (based on accent list)
    if (character.accent.toLowerCase().includes("punjabi") || character.accent.toLowerCase().includes("haryanvi")) {
      finalPitch += 0.05;
      finalRate += 0.05;
    }

    // 4. Emotion multipliers
    finalPitch += emotion.pitchBonus;
    finalRate *= emotion.rateBonus;

    // 5. Energy Level modifiers
    if (energy === "low") {
      finalRate *= 0.85;
      finalPitch -= 0.06;
    } else if (energy === "high") {
      finalRate *= 1.12;
      finalPitch += 0.05;
    } else if (energy === "extreme") {
      finalRate *= 1.25;
      finalPitch += 0.15;
    }

    // 6. Manual sliders
    finalPitch = finalPitch * customPitch;
    finalRate = finalRate * customRate;

    // Clamp
    finalPitch = Math.max(0.5, Math.min(2.0, finalPitch));
    finalRate = Math.max(0.5, Math.min(2.0, finalRate));

    return { pitch: finalPitch, rate: finalRate };
  };

  // Dialogue script parsing engine
  const parseCommentaryTextToSegments = (rawText: string): CommentarySegment[] => {
    if (selectedMultiVoiceMode.id === "single") {
      return [{
        speakerName: selectedVoiceChar.name,
        text: rawText,
        voiceChar: selectedVoiceChar,
        emotion: selectedVoiceEmotion
      }];
    }

    const lines = rawText.split("\n").map(l => l.trim()).filter(l => l !== "");
    const parsed: CommentarySegment[] = [];

    const getCharModel = (name: string): VoiceCharacter => {
      const lower = name.toLowerCase();
      if (lower.includes(selectedVoiceChar.name.toLowerCase())) return selectedVoiceChar;
      if (lower.includes(selectedVoiceChar2.name.toLowerCase())) return selectedVoiceChar2;
      if (lower.includes(selectedVoiceChar3.name.toLowerCase())) return selectedVoiceChar3;
      if (lower.includes(selectedVoiceChar4.name.toLowerCase())) return selectedVoiceChar4;

      // Fallback matching names
      const found = VOICE_CHARACTERS.find(vc => lower.includes(vc.name.toLowerCase()));
      return found || selectedVoiceChar;
    };

    for (const line of lines) {
      const match = line.match(/^\[?([a-zA-Z0-9\s\-]+)\]?\s*:\s*(.*)$/);
      if (match) {
        const name = match[1].trim();
        const contentText = match[2].trim().replace(/^["']|["']$/g, "");
        const matchedChar = getCharModel(name);

        parsed.push({
          speakerName: name,
          text: contentText,
          voiceChar: matchedChar,
          emotion: selectedVoiceEmotion
        });
      } else {
        if (parsed.length > 0) {
          parsed[parsed.length - 1].text += " " + line;
        } else {
          parsed.push({
            speakerName: selectedVoiceChar.name,
            text: line.replace(/^["']|["']$/g, ""),
            voiceChar: selectedVoiceChar,
            emotion: selectedVoiceEmotion
          });
        }
      }
    }

    if (parsed.length === 0) {
      return [{
        speakerName: selectedVoiceChar.name,
        text: rawText,
        voiceChar: selectedVoiceChar,
        emotion: selectedVoiceEmotion
      }];
    }

    return parsed;
  };

  // Continuous ball simulation match dictionary
  const REALTIME_CRICKET_EVENTS = [
    "Jasprit Bumrah runs in, bowls a searing swinging yorker at 148kph! The off stump is cartwheel-bent into the turf! India bags a wicket!",
    "Virat Kohli steps down the wicket to Rashid Khan, inside-out lofts it elegantly over extra-cover for a mesmerizing, high-trajectory six!",
    "Rohit Sharma sits on his knee, sweet pull shot over backward square-leg! The ball hits local stadium advertisements with a loud metallic thump!",
    "Mitchell Starc bowls an ultra-fast full toss. Batsman takes a swing, gets a thick top edge, ball goes high up, keeper runs, takes a great diving catch!",
    "Suryakumar Yadav sweeps it backward! He scoops it lying almost parallel to ground, clears deep fine leg for an unbelievable scoop six!",
    "Mohammed Shami runs in, wobble-seam delivery hitting top of off stump! Wicket flies! Absolute seam-bowling poetry!",
    "Chaotic run out mixup! Jadeja drives straight into short cover and calls for single but Dhoni yells 'NO!' - both are trapped at the bowler's end!",
    "Magical relay catch at boundary! Field caught the ball, throws it inside to partner while airborne, steps back and claims an outstanding catch!"
  ];

  // API Call commentary construction utilizing Gemini
  const handleGenerateCommentary = async (forcedEvent?: string) => {
    const targetEvent = typeof forcedEvent === "string" ? forcedEvent : rawEvent;

    setErrorMessage("");
    setIsLoading(true);
    setCommentaryText("");
    setActiveWordIndex(-1);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    try {
      const dialectInstructionText = selectedDialect 
        ? `Ensure you write the commentary utilizing the specific regional dialect style of ${selectedDialect.name} within the ${selectedLanguage.name} family. Regional vibe/style reference: "${selectedDialect.region} style", sample expression template: "${selectedDialect.sampleText}".` 
        : `Utilize native traditional grammar structures of standard ${selectedLanguage.name} (${selectedLanguage.native}).`;

      const hybridFormatText = selectedHybrid.id !== "none"
        ? `Include mixed linguistic slang patterns conforming to "${selectedHybrid.name}". This means writing it with hybrid words (combining English sporty vocabulary with regional grammar phrasing). Use the target script characters appropriately.`
        : `OUTPUT THE RESPONSE STRICTLY in the local authentic native characters/scripts of ${selectedLanguage.name} (for example, Devanagari unicode characters for Hindi/Bhojpuri, Gurmukhi characters for Punjabi, Bengali characters for Bengali, Tamil characters for Tamil, etc.). Do not use Romanized English text unless the hybrid mode requires it.`;

      const humanizerInstructionText = isHumanizerEnabled && desiFillerFrequency !== "none"
        ? `Incorporate natural spoken human behaviors, dramatic emotional gasps, and specific Indian street-smart cricket exclamations (such as: "अरे बाप रे!", "ओए होए!", "ओए गुरु!", "अय्यो रंभा!", "ওরে বাবারে!", "का हो भाई!", "क्या कड़क शॉट मारा!") based on the chosen language/dialect. Use punctuation (exclamation marks, ellipses, and double dashes) to split thoughts into short, high-energy phrases that represent rapid speech and breathing gaps.`
        : "";

      let formattingRule = "";
      if (selectedMultiVoiceMode.id === "single") {
        formattingRule = `Output a single cohesive commentary paragraph (approx 3 to 5 sentences) without any prefix labels or colon brackets. Speak strictly in the tone of the chosen Persona: "${selectedPersona.name}" (${selectedPersona.title}).`;
      } else if (selectedMultiVoiceMode.id === "dual") {
        formattingRule = `You MUST structure the response as a dialog back-and-forth between exactly TWO speakers:
Speaker 1 (named "${selectedVoiceChar.name}"): [Act as selected Persona: "${selectedPersona.name}" with a ${selectedVoiceChar.gender} ${selectedVoiceChar.ageGroup} character voice, expressing ${selectedVoiceEmotion.name} emotion]
Speaker 2 (named "${selectedVoiceChar2.name}"): [Act as a funny regional sidekick cricket fan, with a ${selectedVoiceChar2.gender} ${selectedVoiceChar2.ageGroup} character voice, expressing ${selectedVoiceEmotion.name} or celebratory emotion]

Each dialogue line MUST start exactly with '[${selectedVoiceChar.name}]:' or '[${selectedVoiceChar2.name}]:'. Example output:
[${selectedVoiceChar.name}]: What an incredible boundary stroke!
[${selectedVoiceChar2.name}]: Badhiya yaar! That ball went high into orbit!`;
      } else if (selectedMultiVoiceMode.id === "team") {
        formattingRule = `You MUST structure the response as a sequential team discussion with exactly FOUR commentators reacting to the event:
Speaker 1 (named "${selectedVoiceChar.name}" - Host/Anchor): [Stands as ${selectedPersona.name}, expressing ${selectedVoiceEmotion.name} emotion]
Speaker 2 (named "${selectedVoiceChar2.name}" - Analyst): [Calculates metrics and telemetry]
Speaker 3 (named "${selectedVoiceChar3.name}" - Former Pro): [Gives historical retro context and states bowler's pain]
Speaker 4 (named "${selectedVoiceChar4.name}" - Gully Fan): [Uses funny street banter]

Each dialogue line MUST start exactly with the name bracket label:
[${selectedVoiceChar.name}]: ...
[${selectedVoiceChar2.name}]: ...
[${selectedVoiceChar3.name}]: ...
[${selectedVoiceChar4.name}]: ...`;
      } else if (selectedMultiVoiceMode.id === "expert_panel") {
        formattingRule = `You MUST structure the response as a cricket Expert Panel debate with THREE speakers:
Speaker 1 (named "${selectedVoiceChar.name}" - Moderator): [Stands as ${selectedPersona.name}, expressing ${selectedVoiceEmotion.name} emotion]
Speaker 2 (named "${selectedVoiceChar2.name}" - Coach): [Explains batsman elbow swing and pitch bounce]
Speaker 3 (named "${selectedVoiceChar3.name}" - World Cup Legend): [Recalls historical pressure matches and reviews the shot]

Each dialogue line MUST start exactly with the name bracket label:
[${selectedVoiceChar.name}]: ...
[${selectedVoiceChar2.name}]: ...
[${selectedVoiceChar3.name}]: ...`;
      }

      const promptText = `
You are CricVoice, the legendary live cricket broadcaster.
Rewrite the following raw Match Event into dramatic, high-energy live commentary!

Raw Match Event to rewrite: "${targetEvent}"

Broadcasting Settings:
1. Target Indian Language: ${selectedLanguage.name} (${selectedLanguage.native})
2. Regional Vibe & Dialect: ${dialectInstructionText}
3. Hybrid Language Mode: ${hybridFormatText}
4. Commentary Persona: ${selectedPersona.name} (${selectedPersona.title})
5. Broadcast Mode: ${selectedBroadcastMode.name}. Context: ${selectedBroadcastMode.promptMod}
6. Emotion State: ${selectedVoiceEmotion.name} (${selectedVoiceEmotion.promptDescription})
7. Multi-Voice Config: ${selectedMultiVoiceMode.name}

CRITICAL AI BROADCASTER RULES:
1. Speak with maximum enthusiasm, physical sporting gestures, and dramatic stadium tension.
2. Incorporate specific cricket terminologies naturally. 
3. Never edit, alter, or translate player match names (such as Dhoni, Kohli, Bumrah, Shami, Rohit, Jadeja).
4. Do not prefix with brackets, text labels, or metadata tag titles (e.g. do NOT include 'Guru Sidhu:' or 'Commentary:'). Just begin the direct commentary speech script matching the formatting rules.
5. ${selectedPersona.systemPromptAddition}
6. ${humanizerInstructionText}

FORMATTING RULE:
${formattingRule}
`;

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ promptText })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson?.error || `Vocalizer server returned code ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.text;

      if (!generatedText) {
        throw new Error("Broadcaster synthesis returned empty candidate values. Please review parameters.");
      }

      const cleanText = generatedText
        .trim()
        .replace(/^Commentary:\s*/i, "")
        .replace(/\*{1,2}/g, ""); // Strip asterisks markdown formatting but preserve punctuation dialogue keys

      setCommentaryText(cleanText);
      setIsLoading(false);

      // Auto run speech dialogue segments
      setTimeout(() => {
        handleSpeak(cleanText);
      }, 150);

    } catch (err: any) {
      console.error("Broadcasting failed:", err);
      setIsLoading(false);
      setErrorMessage(err.message || "Synthesizing vocalized feedback raised unexpected errors.");
    }
  };

  // Split commentary into separate logical sentences for breathing space & sentiment pitch modulation
  const splitIntoSentences = (text: string): string[] => {
    const re = /([^.!?।\n]+[.!?।\n]*)/g;
    const matches = text.match(re);
    if (!matches || matches.length === 0) {
      return text.split("\n").filter(line => line.trim() !== "");
    }
    return matches.map(m => m.trim()).filter(m => m !== "");
  };

  // Playback managers for multi-voice dialogues
  const playSegmentIndex = (segmentIdx: number, segments: CommentarySegment[]) => {
    if (segmentIdx >= segments.length) {
      setIsSpeaking(false);
      setCurrentPlaySegmentIndex(-1);
      setIsBreathingPause(false);
      setActiveWordIndex(-1);
      setSentenceEmotion("Broadcast Concluded");

      // Auto loop live feed simulation if play state is continuous
      if (isContinuousPlay) {
        setTimeout(() => {
          triggerNextContinuousBall();
        }, 5500);
      }
      return;
    }

    setCurrentPlaySegmentIndex(segmentIdx);
    const segment = segments[segmentIdx];
    const subSentences = splitIntoSentences(segment.text);
    
    playSubSentence(0, subSentences, segmentIdx, segments);
  };

  const playSubSentence = (
    subIdx: number,
    subSentences: string[],
    segmentIdx: number,
    segments: CommentarySegment[]
  ) => {
    if (subIdx >= subSentences.length) {
      if (isHumanizerEnabled) {
        setIsBreathingPause(true);
        sentenceTimeoutRef.current = setTimeout(() => {
          setIsBreathingPause(false);
          playSegmentIndex(segmentIdx + 1, segments);
        }, 850);
      } else {
        playSegmentIndex(segmentIdx + 1, segments);
      }
      return;
    }

    const rawText = subSentences[subIdx];
    const segment = segments[segmentIdx];
    const char = segment.voiceChar;
    const emo = segment.emotion;

    // Use current sliders adjustments ONLY if matching lead actor, otherwise use baseline values
    const isLeadChar = char.id === selectedVoiceChar.id;
    const computed = computeVoiceParams(
      char,
      emo,
      isLeadChar ? pitch : 1.0,
      isLeadChar ? rate : 1.0,
      isLeadChar ? customVoiceDepth : char.baseDepth,
      isLeadChar ? voiceEnergyLevel : "high"
    );

    let currentPitch = computed.pitch;
    let currentRate = computed.rate;
    let emotionTitle = `${char.name} (${emo.name})`;

    const textUpper = rawText.toUpperCase();
    const hasExcitement = rawText.includes("!") || rawText.includes("¡") || rawText.includes("🔥");
    const isAdrenaline = hasExcitement || /छक्का|चौका|विकेट|कमाल|आउट|OUT|SIX|FOUR|WICKET|KOHLI|DHONI|YES|HYPE/i.test(textUpper);

    if (isHumanizerEnabled) {
      if (isAdrenaline) {
        currentPitch = Math.min(currentPitch + 0.15, 2.0);
        currentRate = Math.min(currentRate * 1.15, 2.0);
        emotionTitle = `🔥 ${char.name} (Adrenaline Peak)`;
      } else if (rawText.includes("...")) {
        currentPitch = Math.max(currentPitch - 0.12, 0.5);
        currentRate = Math.max(currentRate * 0.8, 0.5);
        emotionTitle = `⏳ ${char.name} (Suspense Paws)`;
      }
    }

    setSentenceEmotion(emotionTitle);

    const utterance = new SpeechSynthesisUtterance(rawText);
    utteranceRef.current = utterance;
    
    utterance.pitch = currentPitch;
    utterance.rate = currentRate;
    utterance.volume = volume;

    // Match best platform synthetic profile match
    const platformVoice = findBestBrowserVoice(char, selectedLanguage.id, availableVoices);
    if (platformVoice) {
      utterance.voice = platformVoice;
    } else if (selectedVoiceName) {
      const chosen = availableVoices.find(v => v.name === selectedVoiceName);
      if (chosen) utterance.voice = chosen;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsBreathingPause(false);
    };

    utterance.onend = () => {
      if (subIdx + 1 < subSentences.length) {
        if (isHumanizerEnabled) {
          setIsBreathingPause(true);
          const breathDuration = isAdrenaline ? 350 : 600;
          sentenceTimeoutRef.current = setTimeout(() => {
            setIsBreathingPause(false);
            playSubSentence(subIdx + 1, subSentences, segmentIdx, segments);
          }, breathDuration);
        } else {
          playSubSentence(subIdx + 1, subSentences, segmentIdx, segments);
        }
      } else {
        playSegmentIndex(segmentIdx + 1, segments);
      }
    };

    utterance.onerror = (e) => {
      console.error("Vocalizer segment error event:", e);
      if (subIdx + 1 < subSentences.length) {
        playSubSentence(subIdx + 1, subSentences, segmentIdx, segments);
      } else {
        playSegmentIndex(segmentIdx + 1, segments);
      }
    };

    // Words highlight trackers
    utterance.onboundary = (event) => {
      if (event.name === "word") {
        const charIndex = event.charIndex;
        let baseCount = 0;
        for (let s = 0; s < segmentIdx; s++) {
          baseCount += segments[s].text.split(/\s+/).length;
        }
        for (let sub = 0; sub < subIdx; sub++) {
          baseCount += subSentences[sub].split(/\s+/).length;
        }
        const wordsInPhrase = rawText.substring(0, charIndex).trim().split(/\s+/).length;
        setActiveWordIndex(baseCount + (rawText.substring(0, charIndex).trim() === "" ? 0 : wordsInPhrase));
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  // Vocalizer delivery logic
  const handleSpeak = (textToSpeak: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setErrorMessage("Natural speech synthesis is not backed by this internet browser.");
      return;
    }

    if (sentenceTimeoutRef.current) {
      clearTimeout(sentenceTimeoutRef.current);
    }
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsBreathingPause(false);
    setActiveWordIndex(-1);

    if (!textToSpeak.trim()) return;

    const segments = parseCommentaryTextToSegments(textToSpeak);
    setCommentarySegmentsList(segments);

    // Re-split sentences state purely for legacy analytics meter counts
    const analyticsPhrases = splitIntoSentences(textToSpeak);
    setSentencesList(analyticsPhrases);

    if (segments.length > 0) {
      playSegmentIndex(0, segments);
    }
  };

  const handleStopSpeech = () => {
    if (sentenceTimeoutRef.current) {
      clearTimeout(sentenceTimeoutRef.current);
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setCurrentPlaySegmentIndex(-1);
    setIsBreathingPause(false);
    setActiveWordIndex(-1);
    setSentenceEmotion("Broadcaster Muted");
  };

  const handlePauseSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.pause();
      setIsSpeaking(false);
      setSentenceEmotion("Broadcaster Paused");
    }
  };

  const handleResumeSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.resume();
      setIsSpeaking(true);
      setSentenceEmotion("Broadcaster Active");
    }
  };

  // Continuous loop trigger callback
  const triggerNextContinuousBall = async () => {
    if (!isContinuousPlay) return;
    const randomIndex = Math.floor(Math.random() * REALTIME_CRICKET_EVENTS.length);
    const simulatedEvent = REALTIME_CRICKET_EVENTS[randomIndex];
    setRawEvent(simulatedEvent);
    await handleGenerateCommentary(simulatedEvent);
  };

  // Match Queue addition callback
  const handleQueueCommentary = () => {
    const newItem: QueueItem = {
      id: "q_" + new Date().getTime(),
      matchEvent: rawEvent,
      language: selectedLanguage.name,
      persona: selectedPersona.name,
      broadcastMode: selectedBroadcastMode.name,
      commentaryText: commentaryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setCommentaryQueue(prev => [...prev, newItem]);
  };

  // Filtered languages matching user query
  const filteredLanguages = LANGUAGES.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchLangQuery.toLowerCase()) || 
                          l.native.toLowerCase().includes(searchLangQuery.toLowerCase()) ||
                          l.region.toLowerCase().includes(searchLangQuery.toLowerCase());
    const matchesPopular = !popularFilterOnly || l.isPopular;
    return matchesSearch && matchesPopular;
  });

  // Toggle advanced state for full 22-language search drawer
  const [showAdvancedLanguages, setShowAdvancedLanguages] = useState(false);

  // High-frequency presets that bundle language, dialect and hybrid slang instantly
  const POPULAR_VIBES = [
    { name: "UP Charcha 🗣️", langId: "hi", dialectId: "up_adda", hybridId: "none", personaId: "sidhu_paji", label: "🔥 UP/Sidhu", desc: "Awadhi-Bhojpuri flow spiced by Sidhuism" },
    { name: "Punjabi Retro 🕺", langId: "pa", dialectId: "punjabi_retro", hybridId: "punjlish", personaId: "punjabi_retro", label: "🕺 Punjab Vibe", desc: "Vintage 80s Punjabi energy mixed into English phrases" },
    { name: "Chennai Street 🏏", langId: "ta", dialectId: "chennai_gully", hybridId: "tanglish", personaId: "gully_kid", label: "🏏 Chennai Style", desc: "Local colloquial Tamil-Eng team banter" },
    { name: "Kolkata Adda 🐟", langId: "bn", dialectId: "kolkata_adda", hybridId: "benglish", personaId: "meme_lord", label: "🐟 Kolkata Fun", desc: "Sarcastic Benglish cricket jokes" },
    { name: "Stats Analytics 📊", langId: "en", dialectId: "", hybridId: "none", personaId: "data_scientist", label: "📊 Tech Data", desc: "Advanced telemetry and cricket metrics" }
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
      
      {/* GLOBAL HEADER HEADER */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Brand/Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <Mic className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  CricVoice <span className="text-emerald-400">Live</span>
                </h1>
                <span className="text-[10px] md:text-xs font-bold font-mono tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  MULTILINGUAL V2.0
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Regional Indian Dialects & Commentary Voice Generator</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/15 px-3 py-1.5 rounded-lg shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]"></span>
              <span className="text-xs font-mono font-medium text-emerald-400">
                Secure Live Broadcast Server Active
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* DUAL-COLUMN SYSTEM WORKSPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: SECTORS WORKSPACE */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          
          {/* CONTROL DECK TAB ROW */}
          <div className="bg-slate-900 border border-slate-800/60 p-1 rounded-xl flex items-center justify-between text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveTab("broadcast")}
              className={`flex-1 py-1.5 px-1 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "broadcast"
                  ? "bg-slate-950 border border-slate-850 text-emerald-400 font-bold shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>🎙️</span>
              <span className="text-[11px]">On-Air Setup</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("casting")}
              className={`flex-1 py-1.5 px-1 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "casting"
                  ? "bg-slate-950 border border-slate-850 text-emerald-400 font-bold shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>🎛️</span>
              <span className="text-[11px]">Voice Mixing</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("extras")}
              className={`flex-1 py-1.5 px-1 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "extras"
                  ? "bg-slate-950 border border-slate-850 text-emerald-400 font-bold shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>🏟️</span>
              <span className="text-[11px]">Map & Sounds</span>
            </button>
          </div>

          <div className="transition-all duration-300">
            {activeTab === "broadcast" && (
              <OnAirDesk
                rawEvent={rawEvent}
                setRawEvent={setRawEvent}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                selectedDialect={selectedDialect}
                setSelectedDialect={setSelectedDialect}
                selectedHybrid={selectedHybrid}
                setSelectedHybrid={setSelectedHybrid}
                selectedPersona={selectedPersona}
                handlePersonaChange={handlePersonaChange}
                searchLangQuery={searchLangQuery}
                setSearchLangQuery={setSearchLangQuery}
                popularFilterOnly={popularFilterOnly}
                setPopularFilterOnly={setPopularFilterOnly}
                filteredLanguages={filteredLanguages}
                favoriteLanguageIds={favoriteLanguageIds}
                toggleFavoriteLanguage={toggleFavoriteLanguage}
                errorMessage={errorMessage}
                isLoading={isLoading}
                handleGenerateCommentary={() => handleGenerateCommentary()}
              />
            )}

            {activeTab === "casting" && (
              <VoiceMixing
                selectedMultiVoiceMode={selectedMultiVoiceMode}
                setSelectedMultiVoiceMode={setSelectedMultiVoiceMode}
                selectedVoiceChar={selectedVoiceChar}
                setSelectedVoiceChar={setSelectedVoiceChar}
                selectedVoiceChar2={selectedVoiceChar2}
                setSelectedVoiceChar2={setSelectedVoiceChar2}
                selectedVoiceChar3={selectedVoiceChar3}
                setSelectedVoiceChar3={setSelectedVoiceChar3}
                selectedVoiceChar4={selectedVoiceChar4}
                setSelectedVoiceChar4={setSelectedVoiceChar4}
                selectedVoiceEmotion={selectedVoiceEmotion}
                setSelectedVoiceEmotion={setSelectedVoiceEmotion}
                voiceEnergyLevel={voiceEnergyLevel}
                setVoiceEnergyLevel={setVoiceEnergyLevel}
                pitch={pitch}
                setPitch={setPitch}
                rate={rate}
                setRate={setRate}
                volume={volume}
                setVolume={setVolume}
                selectedVoiceName={selectedVoiceName}
                setSelectedVoiceName={setSelectedVoiceName}
                availableVoices={availableVoices}
                isHumanizerEnabled={isHumanizerEnabled}
                setIsHumanizerEnabled={setIsHumanizerEnabled}
                desiFillerFrequency={desiFillerFrequency}
                setDesiFillerFrequency={setDesiFillerFrequency}
              />
            )}

            {activeTab === "extras" && (
              <ExtrasPanel
                activeStateId={activeStateId}
                handleStateSelect={handleStateSelect}
                commentaryQueue={commentaryQueue}
                setCommentaryQueue={setCommentaryQueue}
                isContinuousPlay={isContinuousPlay}
                setIsContinuousPlay={setIsContinuousPlay}
                triggerNextContinuousBall={triggerNextContinuousBall}
                setRawEvent={setRawEvent}
                setCommentaryText={setCommentaryText}
                handleSpeak={handleSpeak}
              />
            )}
          </div>

          {/* LANGUAGE SELECTOR PANEL FOR REMOVAL */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col gap-4">
            
            <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-400" />
                <h3 className="font-extrabold text-white text-base">State Languages Selector</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-950/60 border border-slate-850 py-0.5 px-2 rounded">
                22 Indian Dialects Loaded
              </span>
            </div>

            {/* Quick Favorites and Recents lists */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 font-mono text-[11px]">Popular:</span>
              {LANGUAGES.filter(l => l.isPopular).map(l => {
                const isSelected = selectedLanguage.id === l.id;
                return (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLanguage(l)}
                    className={`px-2 py-1 rounded text-[10px] font-medium transition cursor-pointer border ${
                      isSelected 
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                        : "bg-slate-950 border-slate-850 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    }`}
                  >
                    {l.name}
                  </button>
                );
              })}
            </div>

            {/* Language search & filter bar */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search Indian languages..."
                  value={searchLangQuery}
                  onChange={(e) => setSearchLangQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <button
                onClick={() => setPopularFilterOnly(!popularFilterOnly)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1 cursor-pointer transition ${
                  popularFilterOnly
                    ? "bg-indigo-950 border-indigo-700 text-indigo-300"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800"
                }`}
              >
                <ListFilter className="w-3 h-3" />
                {popularFilterOnly ? "Popular Only" : "All 22"}
              </button>
            </div>

            {/* Responsive scrolling list of languages */}
            <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1" id="language-grid-scroller">
              {filteredLanguages.length === 0 ? (
                <p className="text-xs text-slate-500 col-span-2 text-center py-4">No matching Indian languages found.</p>
              ) : (
                filteredLanguages.map((l) => {
                  const isSelected = selectedLanguage.id === l.id;
                  const isFav = favoriteLanguageIds.includes(l.id);
                  
                  return (
                    <div
                      key={l.id}
                      onClick={() => {
                        setSelectedLanguage(l);
                        // Auto populate compatible dialect
                        const matchesDialect = DIALECTS.find(d => d.langId === l.id);
                        if (matchesDialect) {
                          setSelectedDialect(matchesDialect);
                        } else {
                          setSelectedDialect(null);
                        }
                      }}
                      className={`p-2.5 rounded-lg border text-left flex items-start justify-between gap-1 transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? "bg-slate-950 border-emerald-500/60 ring-1 ring-emerald-500/10 shadow-lg shadow-emerald-950/10 text-white"
                          : "bg-slate-950/70 border-slate-850 text-slate-400 hover:border-slate-800 hover:bg-slate-950"
                      }`}
                      id={`lang-card-${l.id}`}
                    >
                      <div>
                        {/* Native Title */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold bg-slate-900 border border-slate-800 py-0.5 px-1.5 text-slate-300 rounded leading-none shrink-0">
                            {l.native}
                          </span>
                          <span className={`text-xs font-semibold ${isSelected ? "text-slate-100" : "text-slate-300"}`}>
                            {l.name}
                          </span>
                        </div>
                        {/* Region */}
                        <p className="text-[9px] text-slate-500 mt-1 leading-none truncate max-w-[110px]">{l.region}</p>
                      </div>

                      {/* Heart favoriter and popularity indicator */}
                      <button
                        onClick={(e) => toggleFavoriteLanguage(l.id, e)}
                        className="p-1 rounded hover:bg-slate-800 transition shrink-0 cursor-pointer"
                      >
                        <Heart className={`w-3 h-3 ${isFav ? "fill-red-500 text-red-500 animate-pulse" : "text-slate-500 hover:text-slate-300"}`} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* DIALECT SELECTOR AND REGIONAL SLANG */}
            <div className="space-y-3 bg-slate-950 border border-slate-850 p-4 rounded-xl">
              <div>
                <label className="text-xs text-white block font-bold mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  Desi Dialect / Regional Slang style
                </label>
                <p className="text-[10px] text-slate-400 mb-2">Configure target slang performance index:</p>
              </div>

              <select
                value={selectedDialect?.id || ""}
                onChange={(e) => {
                  const chosen = DIALECTS.find(d => d.id === e.target.value);
                  setSelectedDialect(chosen || null);
                }}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                id="dialect-select-input"
              >
                <option value="">-- Standard Authentic Vocabulary (Standard Mode) --</option>
                {DIALECTS.map(d => (
                  <option key={d.id} value={d.id} className="bg-slate-900">
                    {d.name} ({d.region})
                  </option>
                ))}
              </select>

              {selectedDialect && (
                <p className="text-[10.5px] font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-950 px-2 py-1.5 rounded italic">
                  &ldquo;{selectedDialect.sampleText}&rdquo;
                </p>
              )}
            </div>

            {/* HYBRID LINGUISTIC MIXER (Hinglish/Tanglish check) */}
            <div className="space-y-2">
              <label className="text-xs text-white block font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Language Switching Mode (Hybrid Styles)
              </label>
              
              <div className="grid grid-cols-2 gap-1.5" id="hybrid-languages-container">
                {HYBRID_LANGUAGES.map(h => {
                  const isSelected = selectedHybrid.id === h.id;
                  return (
                    <button
                      key={h.id}
                      onClick={() => setSelectedHybrid(h)}
                      className={`text-left p-2 rounded-lg border flex flex-col justify-between text-[11px] font-medium transition cursor-pointer h-12 leading-tight ${
                        isSelected
                          ? "bg-gradient-to-br from-amber-500/10 to-orange-600/10 border-amber-500/60 text-amber-300"
                          : "bg-slate-950/60 border-slate-850 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      <span className="font-bold block text-slate-200">{h.name}</span>
                      <span className="text-[9px] text-slate-500 text-ellipsis overflow-hidden whitespace-nowrap block w-full">{h.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* BROADCAST CONTEXT DECK & STADIUM QUEUE */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-450" />
                <h3 className="font-extrabold text-white text-base">Broadcast Context & Feed</h3>
              </div>
              <span className="text-[9px] font-mono text-indigo-400 bg-indigo-950/20 border border-indigo-900/40 py-0.5 px-2 rounded uppercase font-bold">
                PRO MODULE
              </span>
            </div>

            {/* Broadcast Mode Selector dropdown */}
            <div className="space-y-2">
              <label className="text-xs text-white block font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                Commentary Broadcast Mode
              </label>
              <select
                value={selectedBroadcastMode.id}
                onChange={(e) => {
                  const found = BROADCAST_MODES.find(b => b.id === e.target.value);
                  if (found) setSelectedBroadcastMode(found);
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
              >
                {BROADCAST_MODES.map(bm => (
                  <option key={bm.id} value={bm.id}>
                    📢 {bm.name}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-slate-400 leading-normal bg-slate-950 p-2.5 rounded border border-slate-850">
                {selectedBroadcastMode.promptMod}
              </p>
            </div>

            {/* Simulated Live Feed & Queue console */}
            <div className="space-y-3 pt-3 border-t border-slate-800/60">
              <div className="flex items-center justify-between">
                <label className="text-xs text-white font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Stadium Queue & Live Match Logger
                </label>
                <button
                  onClick={() => {
                    setIsContinuousPlay(!isContinuousPlay);
                    if (!isContinuousPlay) {
                      setTimeout(() => triggerNextContinuousBall(), 300);
                    }
                  }}
                  className={`text-[9.5px] font-mono px-2.5 py-1 rounded transition flex items-center gap-1 cursor-pointer font-bold ${
                    isContinuousPlay
                      ? "bg-emerald-500 text-slate-950 animate-pulse"
                      : "bg-slate-950 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className={`w-1 h-1 rounded-full ${isContinuousPlay ? "bg-slate-950" : "bg-emerald-400"}`} />
                  {isContinuousPlay ? "Simulating Live" : "Run Live Sim"}
                </button>
              </div>

              {/* Log Board list */}
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-850 h-[190px] overflow-y-auto flex flex-col gap-2 font-mono text-[10px]">
                {commentaryQueue.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-600 gap-1.5 py-4">
                    <span className="text-lg">📟</span>
                    <p className="leading-snug text-[9.5px]">No matches logged in queue list.<br />Click "Queue Commentary" to save live balls!</p>
                  </div>
                ) : (
                  [...commentaryQueue].reverse().map((item) => (
                    <div key={item.id} className="p-2 bg-slate-900 border border-slate-800 rounded flex flex-col gap-1 text-slate-300">
                      <div className="flex justify-between items-center text-[8.5px] text-slate-500 font-bold border-b border-slate-800/40 pb-1">
                        <span>🕒 {item.timestamp}</span>
                        <span className="text-emerald-400 uppercase">{item.language} &bull; {item.persona}</span>
                      </div>
                      <p className="text-white font-semibold text-[10px] leading-tight">Match Event: {item.matchEvent}</p>
                      <p className="text-slate-400 leading-normal max-h-[50px] overflow-y-auto italic font-sans py-0.5">
                        &ldquo;{item.commentaryText}&rdquo;
                      </p>
                      <div className="flex gap-1.5 justify-end pt-1">
                        <button
                          onClick={() => {
                            setRawEvent(item.matchEvent);
                            setCommentaryText(item.commentaryText);
                            handleSpeak(item.commentaryText);
                          }}
                          className="px-2 py-0.5 bg-slate-950 border border-slate-850 rounded hover:bg-slate-800 hover:text-white transition text-[9px] font-bold text-slate-400 cursor-pointer"
                        >
                          Play Speech
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
          </div>

        </div>

        {/* RIGHT COLUMN: PERSONAS, RAW EVENTS & TELEPROMPTER SCREEN (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* SPECIAL ENTERTAINMENT PERSONA SELECTION */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-5">
            <div className="flex gap-2 items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold block mb-1">Vocal performance</span>
                <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                  <Tv className="w-5 h-5 text-emerald-400" />
                  Commentary Persona Studio
                </h3>
              </div>

              <span className="text-[11px] bg-slate-950/80 border border-slate-850 font-mono text-slate-400 py-1 px-2.5 rounded-full">
                {ENTERTAINMENT_PERSONAS.length} Performance Desks
              </span>
            </div>

            {/* Persona chips slider list */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5" id="persona-scroller-grid">
              {ENTERTAINMENT_PERSONAS.map((p) => {
                const isActive = selectedPersona.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handlePersonaChange(p)}
                    className="flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer h-full justify-between gap-1.5 bg-slate-950/70 border-slate-850 text-slate-400 hover:border-slate-800 hover:bg-slate-950"
                    style={isActive ? { borderColor: "rgba(16, 185, 129, 0.8)", backgroundColor: "rgb(2, 6, 23)", color: "white" } : {}}
                  >
                    <div className="flex items-center justify-between w-full gap-2">
                      <span className="text-2xl filter drop-shadow select-none">{p.icon}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold shrink-0 ${
                        isActive ? "bg-emerald-500/25 text-emerald-400" : "bg-slate-850 text-slate-500"
                      }`}>
                        {p.badge}
                      </span>
                    </div>

                    <div className="w-full">
                      <strong className={`block text-xs font-bold leading-tight ${isActive ? "text-white" : "text-slate-300"}`}>
                        {p.name}
                      </strong>
                      <span className="text-[10px] text-slate-500 leading-none">{p.title}</span>
                    </div>

                    <p className={`text-[10px] leading-tight ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                      {p.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* HIGH FIDELITY VOICE SELECTION ENGINE */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-bold text-white text-xs uppercase font-mono tracking-wider flex items-center gap-1.5 animate-pulse">
                  <span className="text-emerald-400 text-sm">🎙️</span> Flagship Voice Casting Builder
                </h4>
                
                {/* Voice multi-voice mode select */}
                <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800/85 text-[10px] font-mono">
                  {MULTI_VOICE_MODES.map(mv => {
                    const isSelected = selectedMultiVoiceMode.id === mv.id;
                    return (
                      <button
                        key={mv.id}
                        type="button"
                        onClick={() => setSelectedMultiVoiceMode(mv)}
                        className={`px-2 py-0.5 rounded transition cursor-pointer ${
                          isSelected ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {mv.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Casting Deck (Speaker 1, 2, 3, 4 selection depending on multi_voice_mode) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950/50 p-3 rounded-lg border border-slate-850">
                <div className="space-y-1.5">
                  <label className="text-[10.5px] font-mono font-bold text-slate-400 block">Lead Actor Voice (Speaker 1)</label>
                  <select
                    value={selectedVoiceChar.id}
                    onChange={(e) => {
                      const found = VOICE_CHARACTERS.find(vc => vc.id === e.target.value);
                      if (found) setSelectedVoiceChar(found);
                    }}
                    className="w-full bg-slate-900 border border-slate-850 rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  >
                    {VOICE_CHARACTERS.map(vc => (
                      <option key={vc.id} value={vc.id}>
                        {vc.gender === "Female" ? "👩" : "👨"} {vc.name} ({vc.ageGroup} &bull; {vc.accent})
                      </option>
                    ))}
                  </select>
                </div>

                {selectedMultiVoiceMode.id !== "single" && (
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] font-mono font-bold text-slate-450 block">Co-Analyst (Speaker 2)</label>
                    <select
                      value={selectedVoiceChar2.id}
                      onChange={(e) => {
                        const found = VOICE_CHARACTERS.find(vc => vc.id === e.target.value);
                        if (found) setSelectedVoiceChar2(found);
                      }}
                      className="w-full bg-slate-900 border border-slate-850 rounded px-2.5 py-1 text-xs text-slate-350 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
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
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] font-mono font-bold text-slate-450 block">Expert Legend (Speaker 3)</label>
                      <select
                        value={selectedVoiceChar3.id}
                        onChange={(e) => {
                          const found = VOICE_CHARACTERS.find(vc => vc.id === e.target.value);
                          if (found) setSelectedVoiceChar3(found);
                        }}
                        className="w-full bg-slate-900 border border-slate-850 rounded px-2.5 py-1 text-xs text-slate-350 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                      >
                        {VOICE_CHARACTERS.map(vc => (
                          <option key={vc.id} value={vc.id}>
                            {vc.gender === "Female" ? "👩" : "👨"} {vc.name} ({vc.ageGroup})
                          </option>
                        ))}
                      </select>
                    </div>

                    {selectedMultiVoiceMode.id === "team" && (
                      <div className="space-y-1.5">
                        <label className="text-[10.5px] font-mono font-bold text-slate-450 block">Stadium Fan Sidekick (Speaker 4)</label>
                        <select
                          value={selectedVoiceChar4.id}
                          onChange={(e) => {
                            const found = VOICE_CHARACTERS.find(vc => vc.id === e.target.value);
                            if (found) setSelectedVoiceChar4(found);
                          }}
                          className="w-full bg-slate-900 border border-slate-850 rounded px-2.5 py-1 text-xs text-slate-350 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
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

              {/* Dialect multipliers, Emotion controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs text-white block font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                    Vocal Emotion Engine
                  </label>
                  <select
                    value={selectedVoiceEmotion.id}
                    onChange={(e) => {
                      const found = VOICE_EMOTIONS.find(ve => ve.id === e.target.value);
                      if (found) setSelectedVoiceEmotion(found);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-rose-500 font-mono"
                  >
                    {VOICE_EMOTIONS.map(ve => (
                      <option key={ve.id} value={ve.id}>
                        🎭 {ve.name} (Multiplier bonus: +{ve.pitchBonus.toFixed(1)} pitch)
                      </option>
                    ))}
                  </select>
                  <span className="text-[9px] text-slate-500 italic block font-mono">
                    Bonus parameters stacked physically: pitch pitchBonus (+{selectedVoiceEmotion.pitchBonus.toFixed(2)}) &bull; rateBonus ({selectedVoiceEmotion.rateBonus.toFixed(1)}x)
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-white block font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Broadcast Commentary Energy
                  </label>
                  <select
                    value={voiceEnergyLevel}
                    onChange={(e) => setVoiceEnergyLevel(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-350 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  >
                    <option value="low">💤 Calm Chilled Deep Tone</option>
                    <option value="medium">🗣️ Conversational Normal Flow</option>
                    <option value="high">🔥 Match Peak Broadcaster</option>
                    <option value="extreme">⚡ Screaming Stadium Arena Ultra Hype</option>
                  </select>
                  <span className="text-[9px] text-slate-500 italic block font-mono">
                    Dynamic pace sliders: stack multiplier coefficients on-air.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* EVENTS WRITER & SOUNDBOARD PRESETS */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col gap-4">
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold block mb-1">Live Feed Entry</span>
                <h3 className="font-extrabold text-white text-base flex items-center gap-1.5">
                  <Flame className="w-5 h-5 text-emerald-400 animate-pulse" />
                  Raw Match Event Action Details
                </h3>
              </div>

              <span className="text-[10px] font-mono text-slate-400 py-0.5 px-2 bg-slate-950 border border-slate-850 rounded">
                Interactive Presets
              </span>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="presest-scenarios-grid">
              {CRICKET_MOMENTS_PRESETS.map((preset) => {
                const isSelected = rawEvent === preset.event;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setRawEvent(preset.event)}
                    className={`text-left p-3 rounded-lg border text-xs flex flex-col justify-between transition cursor-pointer ${
                      isSelected 
                        ? "bg-slate-950 border-emerald-400/50 text-slate-200" 
                        : "bg-slate-950/60 border-slate-850 text-slate-400 hover:bg-slate-800"
                    }`}
                    id={`cricket-preset-${preset.id}`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <strong className="font-bold text-slate-200 truncate pr-2">{preset.title}</strong>
                      <span className="text-[9px] bg-slate-850 text-slate-500 font-mono px-1 py-0.5 rounded shrink-0">
                        {preset.category}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate w-full">{preset.event}</p>
                  </button>
                );
              })}
            </div>

            {/* Action text area */}
            <div className="relative">
              <textarea
                value={rawEvent}
                onChange={(e) => setRawEvent(e.target.value)}
                rows={4}
                className="w-full text-xs sm:text-sm bg-slate-950 border border-slate-850 rounded-xl p-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-200 placeholder-slate-600 resize-none font-sans"
                maxLength={450}
              />
              <div className="absolute bottom-2 right-3 text-[9px] font-mono text-slate-500">
                {rawEvent.length}/450 characters
              </div>
            </div>

            {/* Error notifications */}
            {errorMessage && (
              <div className="bg-red-950/20 border border-red-500/20 rounded-lg p-3 text-xs text-red-500 flex items-start gap-2 animate-pulse">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{errorMessage}</p>
              </div>
            )}

            {/* GENERATE COMMENTARY BUTTON */}
            <button
              onClick={handleGenerateCommentary}
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl font-bold font-mono tracking-wider text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 transform active:scale-[0.98] ${
                isLoading 
                  ? "bg-slate-800 text-slate-500 border border-slate-750 cursor-not-allowed" 
                  : "bg-gradient-to-r from-emerald-500 to-green-400 text-slate-950 hover:from-emerald-400 hover:to-green-300 shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20"
              }`}
              id="synthesize-button"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  SYNTHESIZING DUAL PERSONA BROADCAST SHOW...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  GENERATE LIVE PERSONA BROADCAST (AI + TTS)
                </>
              )}
            </button>

            {/* Save to Stadium logger queue */}
            {commentaryText && (
              <button
                type="button"
                onClick={handleQueueCommentary}
                className="w-full py-2 px-3 rounded-lg bg-slate-950 hover:bg-slate-900 text-indigo-400 hover:text-indigo-300 border border-indigo-950/80 text-xs font-mono font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                📟 LOG & SAVE BROADCAST TO STADIUM QUEUE
              </button>
            )}

          </div>

          {/* TELEPROMPTER VIEW & ACTIVE AIR MONITORS */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -inset-px bg-gradient-to-br from-emerald-500/5 to-purple-500/5 opacity-40 rounded-xl pointer-events-none" />

            {/* Top Bar monitors */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <Globe className={`w-4 h-4 ${isSpeaking ? "text-emerald-400 animate-spin" : "text-slate-500"}`} />
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                  ACTIVE AIR MONITORS (TELEPROMPTER)
                </span>
              </div>

              <div className="flex items-center gap-2">
                {commentaryText && (
                  <button
                    type="button"
                    onClick={() => {
                      const dateStr = new Date().toISOString().replace(/T/, '_').replace(/\..+/, '').replace(/:/g, '-');
                      const headerInfo = `====================================================
CRICVOICE LIVE commentary broadcast export
====================================================
Timestamp   : ${new Date().toLocaleString()}
Language    : ${selectedLanguage.name} (${selectedLanguage.native})
Dialect     : ${selectedDialect?.name || "Standard Dialect"}
Persona     : ${selectedPersona.name} (${selectedPersona.title})
Broadcast   : ${selectedBroadcastMode.name}
Multi-Voice : ${selectedMultiVoiceMode.name}
Tone Emotion: ${selectedVoiceEmotion.name}
----------------------------------------------------
COMMENTARY BROADCAST SCRIPT:
----------------------------------------------------
${commentaryText}

====================================================
Generated using Google Gemini 3.5-flash AI & CricVoice Studio
====================================================`;
                      const blob = new Blob([headerInfo], { type: "text/plain;charset=utf-8" });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.href = url;
                      link.download = `cricvoice_commentary_${dateStr}.txt`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="px-2 py-0.5 rounded bg-slate-950 border border-slate-850 hover:bg-slate-800 transition text-[9px] font-mono font-bold text-slate-300 flex items-center gap-1 cursor-pointer"
                  >
                    📂 Export Script (.TXT)
                  </button>
                )}

                {isSpeaking ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold font-mono text-red-400 bg-red-950/25 border border-red-900 px-2.5 py-0.5 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping mr-1"></span>
                    ON-AIR VOICE STREAM
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-950 border border-slate-850 px-2.5 py-0.5 rounded">
                    STANDBY FEED ACTIVE
                  </span>
                )}
              </div>
            </div>

            {/* Screen Viewer dialog blocks */}
            <div className="bg-slate-950 border border-slate-850 rounded-xl p-5 shadow-inner relative flex-1 min-h-[220px] flex flex-col justify-between mb-4">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_94%,rgba(0,0,0,0.3)_95%)] bg-[size:100%_8px] pointer-events-none opacity-20" />
              
              <div className="relative z-10 h-full">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-3 text-slate-400 text-center">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-emerald-400 animate-spin" />
                      <Mic className="w-4 h-4 text-emerald-400 absolute inset-0 m-auto animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-xs">Awaiting regional translation buffer...</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Gemini 3.5-flash is writing {selectedLanguage.name} commentary</p>
                    </div>
                  </div>
                ) : commentarySegmentsList.length > 0 ? (
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                    {commentarySegmentsList.map((seg, sIdx) => {
                      const isActiveSegment = sIdx === currentPlaySegmentIndex;
                      const segWords = seg.text.split(/\s+/);
                      
                      // Calculate cumulative word offset up to this segment
                      let cumulativeWordOffset = 0;
                      for (let i = 0; i < sIdx; i++) {
                        cumulativeWordOffset += commentarySegmentsList[i].text.split(/\s+/).length;
                      }

                      return (
                        <div key={sIdx} className={`p-4 rounded-xl border transition-all duration-300 ${
                          isActiveSegment 
                            ? "bg-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-950/20 ring-1 ring-emerald-500/20" 
                            : "bg-slate-950/40 border-slate-900 opacity-55 hover:opacity-85"
                        }`}>
                          <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm select-none">{seg.voiceChar.gender === "Female" ? "👩" : "👨"}</span>
                              <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${isActiveSegment ? "text-emerald-400" : "text-indigo-450"}`}>
                                {seg.speakerName}
                              </span>
                              <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono uppercase tracking-tight">
                                {seg.voiceChar.ageGroup} &bull; {seg.voiceChar.accent}
                              </span>
                            </div>
                            {isActiveSegment && (
                              <div className="flex items-center gap-1 text-[8.5px] font-mono text-emerald-400 animate-pulse bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/50 uppercase">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block shrink-0"></span>
                                Speaking
                              </div>
                            )}
                          </div>
                          
                          <p className={`text-xs sm:text-sm leading-relaxed tracking-wide ${isActiveSegment ? "text-slate-105 font-medium" : "text-slate-400 font-normal"}`}>
                            {segWords.map((word, wIdx) => {
                              const absoluteWordIndex = cumulativeWordOffset + wIdx;
                              const isCurrentWord = isSpeaking && isActiveSegment && absoluteWordIndex === activeWordIndex;
                              return (
                                <span
                                  key={wIdx}
                                  className={`inline-block mr-1 transition-all duration-150 rounded ${
                                    isCurrentWord
                                      ? "bg-yellow-400 text-slate-950 font-extrabold px-1 scale-105 shadow shadow-yellow-400/20 animate-pulse"
                                      : isActiveSegment
                                        ? "text-slate-100"
                                        : "text-slate-400"
                                  }`}
                                >
                                  {word}
                                </span>
                              );
                            })}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center text-slate-500 py-16 gap-3">
                    <span className="text-3xl">🎙️</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-300">Broadcaster Station Ready</h4>
                      <p className="text-[10.5px] text-slate-500 mt-1 max-w-[320px] mx-auto">
                        Insert a custom cricket moment, choose an Indian dialect voice actor, and tap generate to initiate multi-commentator playback highlights!
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Functional Dynamic Equalizer */}
              <div className="pt-4 mt-6 border-t border-slate-900/80 flex justify-between items-center gap-4 relative z-10">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  Live Vocal VU index status
                </span>

                <div className="flex items-end gap-[2px] h-6 w-32 justify-end">
                  {eqLevels.map((lvl, index) => {
                    let barColor = "bg-emerald-500/80";
                    if (index >= 16) barColor = "bg-red-500/80";
                    else if (index >= 10) barColor = "bg-yellow-500/80";

                    return (
                      <div
                        key={index}
                        className={`w-[4px] rounded-full transition-all duration-75 ${barColor}`}
                        style={{ height: `${lvl}%` }}
                      />
                    );
                  })}
                </div>
              </div>

            </div>

            {/* CONTROLS SOUND DECK */}
            <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-3">
              <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider block">
                Broadcasting parameter adjustments
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Vocal Pitch multiplier</span>
                      <span className="text-slate-300 font-bold font-mono">{pitch.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="1.8"
                      step="0.05"
                      value={pitch}
                      onChange={(e) => setPitch(parseFloat(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded accent-emerald-400 appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Playback Volume</span>
                      <span className="text-slate-300 font-bold font-mono">{Math.round(volume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded accent-emerald-400 appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Vocal Pacing Speed</span>
                      <span className="text-slate-300 font-bold font-mono">{rate.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.05"
                      value={rate}
                      onChange={(e) => setRate(parseFloat(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded accent-emerald-400 appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5 font-mono">System Accent Voice Agent</label>
                    <select
                      value={selectedVoiceName}
                      onChange={(e) => setSelectedVoiceName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700/80 rounded px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                    >
                      {availableVoices.length === 0 ? (
                        <option>Detecting vocal engines...</option>
                      ) : (
                        availableVoices.map(v => (
                          <option key={v.name} value={v.name}>
                            {v.name} ({v.lang})
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </div>
              </div>

              {/* Expressive Humanizer Controls */}
              <div className="pt-3 border-t border-slate-900/40 grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-900/35 p-3 rounded-lg border border-slate-800/30">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-400 font-mono tracking-wide flex items-center gap-1.5">
                      <span>⚡</span> Dynamic Vocal Humanizer
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={isHumanizerEnabled} 
                        onChange={(e) => setIsHumanizerEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-4 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-slate-300 after:rounded-full after:h-3 after:w-3.5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    Paces text by phrases, sweeps speaking pitch/rate for suspense/hype, and inserts dramatic pauses.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 block font-mono">Desi Vocal Filler Engine</label>
                  <select
                    value={desiFillerFrequency}
                    onChange={(e) => setDesiFillerFrequency(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  >
                    <option value="none">No Fillers (Standard Style)</option>
                    <option value="low">Low Density Fillers</option>
                    <option value="medium">Medium Density Fillers</option>
                    <option value="high">High Desi Hype (Frequent Exclamations)</option>
                  </select>
                  <p className="text-[9px] text-slate-500 leading-none">
                    Auto-enriches synthesis script with regional expressions.
                  </p>
                </div>
              </div>

              {/* Trigger panel */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-900/60 " id="vocalizer-desk-footer">
                <div className="text-[10px] text-slate-500 font-mono">
                  {availableVoices.length > 0 ? (
                    <span>📡 Native speech services operational ({availableVoices.length} voice models detected)</span>
                  ) : (
                    <span>📡 Hooking into browser speech components...</span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  {isSpeaking ? (
                    <button
                      onClick={handlePauseSpeech}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 hover:text-white rounded border border-slate-800 text-[11px] font-bold text-slate-300 cursor-pointer"
                    >
                      Pause Voice
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSpeak(commentaryText)}
                      disabled={isLoading || !commentaryText}
                      className={`px-3 py-1.5 rounded text-[11px] font-bold cursor-pointer transition ${
                        !commentaryText
                          ? "bg-slate-800 text-slate-500"
                          : "bg-emerald-400 text-slate-950 hover:bg-emerald-300 hover:shadow shadow-emerald-400/20"
                      }`}
                    >
                      Vocalize Stream
                    </button>
                  )}

                  <button
                    onClick={handleStopSpeech}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 hover:text-white rounded border border-slate-800 text-[11px] font-bold text-red-400 cursor-pointer"
                  >
                    Mute Broadcaster
                  </button>
                </div>
              </div>

            </div>

            {/* DESI AMBIENT SOUNDBOARD DECK */}
            <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-3.5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-emerald-400 uppercase font-mono tracking-wider block">
                  🏟️ Desi Stadium Atmosphere Soundboard
                </span>
                <span className="bg-emerald-950/40 border border-emerald-900/50 text-[9px] text-emerald-300 font-mono px-2 py-0.5 rounded-full">
                  Programmatic Synthesizer Active
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-normal">
                Trigger classic, real-time live match atmosphere effects synthesized programmatically on-demand using your native browser audio card.
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => playStadiumTrumpet()}
                  className="p-3 bg-slate-900 hover:bg-slate-850 hover:border-emerald-500/50 border border-slate-800/80 rounded-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer group active:scale-95 transition"
                >
                  <span className="text-xl group-hover:scale-110 transition">🎺</span>
                  <span className="text-[10px] font-bold text-white font-mono text-center">Stadium Trumpet</span>
                  <span className="text-[8px] text-slate-500 font-mono text-center">IPL "Tuta-Tuta-Tu!"</span>
                </button>

                <button
                  onClick={() => playBatStroke()}
                  className="p-3 bg-slate-900 hover:bg-slate-850 hover:border-emerald-500/50 border border-slate-800/80 rounded-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer group active:scale-95 transition"
                >
                  <span className="text-xl group-hover:scale-110 transition">🏏</span>
                  <span className="text-[10px] font-bold text-white font-mono text-center">Willow Bat Crack</span>
                  <span className="text-[8px] text-slate-500 font-mono text-center">Organic "Thump-Wood"</span>
                </button>

                <button
                  onClick={() => playCrowdRoar(3500, 0.18)}
                  className="p-3 bg-slate-900 hover:bg-slate-850 hover:border-emerald-500/50 border border-slate-800/80 rounded-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer group active:scale-95 transition"
                >
                  <span className="text-xl group-hover:scale-110 transition">🏟️</span>
                  <span className="text-[10px] font-bold text-white font-mono text-center">Crowd Applause</span>
                  <span className="text-[8px] text-slate-500 font-mono text-center">3.5s Stadium Swell</span>
                </button>

                <button
                  onClick={() => playWhistle()}
                  className="p-3 bg-slate-900 hover:bg-slate-850 hover:border-emerald-500/50 border border-slate-800/80 rounded-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer group active:scale-95 transition"
                >
                  <span className="text-xl group-hover:scale-110 transition">🔔</span>
                  <span className="text-[10px] font-bold text-white font-mono text-center">Umpire Whistle</span>
                  <span className="text-[8px] text-slate-500 font-mono text-center">High Trill Beating</span>
                </button>
              </div>
            </div>

            {/* HIGH FIDELITY SYSTEM VOICES SETUP MANUAL */}
            <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-3">
              <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider block">
                🛠️ How to setup Premium Human Indian Speech Voices
              </span>
              <p className="text-[10px] text-slate-400 leading-normal">
                Browser Speech Synthesis utilizes the natural voice profiles installed on your computer/phone. Get highly advanced natural human voices by following these directions:
              </p>

              <div className="space-y-2.5 pt-1.5 text-[10px]">
                <div className="bg-slate-900/60 p-2 rounded border border-slate-800/80 flex gap-2.5 items-start">
                  <span className="text-xs">🌐</span>
                  <div className="space-y-1">
                    <strong className="text-white block font-mono">Google Chrome / MS Edge (Desktop)</strong>
                    <p className="text-slate-400 leading-normal">
                      The best, most natural voice models are listed automatically! Search the selector for <code className="text-emerald-400">Google हिन्दी (Hindi)</code>, <code className="text-emerald-400">Google English India</code>, or Microsoft natural voices like <code className="text-emerald-400">Ravi</code>, <code className="text-emerald-400">Heera</code>, and <code className="text-emerald-300">Neerja</code>.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-2 rounded border border-slate-800/80 flex gap-2.5 items-start">
                  <span className="text-xs">🍏</span>
                  <div className="space-y-1">
                    <strong className="text-white block font-mono">Apple macOS / iOS Setup</strong>
                    <p className="text-slate-400 leading-normal">
                      Go to <code className="text-slate-300">Settings &rarr; Accessibility &rarr; Spoken Content &rarr; System Speech Voices</code>. Choose Indian languages and download the high-fidelity premium native profiles (<code className="text-emerald-400">Rishi</code> or <code className="text-emerald-400">Isha</code>).
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-2 rounded border border-slate-800/80 flex gap-2.5 items-start">
                  <span className="text-xs">🤖</span>
                  <div className="space-y-1">
                    <strong className="text-white block font-mono">Google Android Setup</strong>
                    <p className="text-slate-400 leading-normal">
                      Open <code className="text-slate-300">System Settings &rarr; Language & Input &rarr; Text-to-Speech Output</code>. Use <code className="text-emerald-400">Google TTS Engine</code>, tap Settings to download regional high-quality voice packs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* FOOTER BAR */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p className="text-[11px] text-slate-500 font-medium">
            Designed for <strong className="text-slate-400">CricVoice Broadcast Labs</strong>. Rewritten using high-performance Gemini 3.5-flash LLM model.
          </p>
          <div className="flex items-center gap-2 text-[10px] text-slate-600 font-mono">
            <span>Synthesis Buffer: Active</span>
            <span>|</span>
            <span>API Client Node: Standalone Host 3000</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
