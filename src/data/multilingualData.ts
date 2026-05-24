export interface Language {
  id: string;
  name: string;
  native: string;
  region: string;
  popularity: "High" | "Medium" | "Classic" | "Regional";
  isPopular?: boolean;
}

export interface Dialect {
  id: string;
  name: string;
  region: string;
  langId: string; // primary language relation
  sampleText: string;
}

export interface Persona {
  id: string;
  name: string;
  title: string;
  icon: string;
  badge: string;
  description: string;
  systemPromptAddition: string;
}

// 22 Indian Languages required
export const LANGUAGES: Language[] = [
  { id: "hi", name: "Hindi", native: "हिन्दी", region: "North/Central India", popularity: "High", isPopular: true },
  { id: "en", name: "English", native: "English", region: "Pan-India", popularity: "High", isPopular: true },
  { id: "bn", name: "Bengali", native: "বাংলা", region: "West Bengal & Tripura", popularity: "High", isPopular: true },
  { id: "te", name: "Telugu", native: "తెలుగు", region: "Andhra & Telangana", popularity: "High", isPopular: true },
  { id: "mr", name: "Marathi", native: "मराठी", region: "Maharashtra", popularity: "High", isPopular: true },
  { id: "ta", name: "Tamil", native: "தமிழ்", region: "Tamil Nadu", popularity: "High", isPopular: true },
  { id: "ur", name: "Urdu", native: "اردو", region: "Pan-India / J&K", popularity: "Medium" },
  { id: "gu", name: "Gujarati", native: "ગુજરાતી", region: "Gujarat", popularity: "Medium", isPopular: true },
  { id: "kn", name: "Kannada", native: "ಕನ್ನಡ", region: "Karnataka", popularity: "Medium", isPopular: true },
  { id: "ml", name: "Malayalam", native: "മലയാളം", region: "Kerala", popularity: "Medium" },
  { id: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ", region: "Punjab", popularity: "Medium", isPopular: true },
  { id: "or", name: "Odia", native: "ଓଡ଼ିଆ", region: "Odisha", popularity: "Regional" },
  { id: "as", name: "Assamese", native: "অসমীয়া", region: "Assam", popularity: "Regional" },
  { id: "main", name: "Maithili", native: "मैथिली", region: "Bihar", popularity: "Regional" },
  { id: "sa", name: "Sanskrit", native: "संस्कृतम्", region: "Ancient / Pan-India", popularity: "Classic" },
  { id: "ks", name: "Kashmiri", native: "کٲشُر", region: "Jammu & Kashmir", popularity: "Regional" },
  { id: "kok", name: "Konkani", native: "कोंकणी", region: "Goa", popularity: "Regional" },
  { id: "mni", name: "Manipuri", native: "মণিপুরী", region: "Manipur", popularity: "Regional" },
  { id: "ne", name: "Nepali", native: "नेपाली", region: "Sikkim & West Bengal", popularity: "Regional" },
  { id: "br", name: "Bodo", native: "बड़ो", region: "Assam", popularity: "Regional" },
  { id: "doi", name: "Dogri", native: "डोगरी", region: "Jammu & Kashmir", popularity: "Regional" },
  { id: "sat", name: "Santali", native: "संताली", region: "Jharkhand & Odisha", popularity: "Regional" }
];

// Mixed / Hybrid Language Modes
export interface HybridLanguage {
  id: string;
  name: string;
  description: string;
}

export const HYBRID_LANGUAGES: HybridLanguage[] = [
  { id: "none", name: "Pure Language Only", description: "Literal grammar and vocabulary of the chosen language" },
  { id: "hinglish", name: "Hinglish (Hindi + English)", description: "Urban spoken mix of Hindi and English. Very trendy!" },
  { id: "tanglish", name: "Tanglish (Tamil + English)", description: "Colloquial blend of Tamil and English used in Chennai" },
  { id: "benglish", name: "Benglish (Bengali + English)", description: "Modern Kolkata college/bhadralok conversational blend" },
  { id: "punjlish", name: "Punjlish (Punjabi + English)", description: "High-octane British-Punjabi or urban Mohali mix" },
  { id: "gujlish", name: "Gujlish (Gujarati + English)", description: "Fun, business-friendly Gujarati combined with English" },
  { id: "marathinglish", name: "Marathinglish (Marathi + English)", description: "Mumbai/Pune corporate and streetside corporate Marathi-English" }
];

// Desi Dialects & Regional Styles mapped to states & parent languages
export const DIALECTS: Dialect[] = [
  // North India / UP & Bihar
  { id: "bhojpuri", name: "Bhojpuri", region: "Bihar & Eastern UP", langId: "hi", sampleText: "का हो! ई त गेंदवा के सीधा आसमान फाड़ के पार पहुंचा देले बा!" },
  { id: "haryanvi", name: "Haryanvi", region: "Haryana", langId: "hi", sampleText: "भाई रे भाई! लट्ठ गाड़ दिया छोरे ने, बिल्कुल बाउंड्री पार!" },
  { id: "braj", name: "Braj Bhasha", region: "Western UP (Mathura)", langId: "hi", sampleText: "अरे कन्हैया! ऐसो सुंदर शॉट मारो है कि सब आनंदित हो गए!" },
  { id: "bundeli", name: "Bundeli", region: "Bundelkhand (UP/MP)", langId: "hi", sampleText: "अरे भैया! ऐसा दमाकेदार बल्ला चलाओ कि सीधे चउका मिल गयो!" },
  { id: "awadhi", name: "Awadhi", region: "Central UP (Lucknow)", langId: "hi", sampleText: "अमा यार! बेहद नफासत भरा शॉट, सीधा सीमा रेखा के पार!" },
  { id: "chhattisgarhi", name: "Chhattisgarhi", region: "Chhattisgarh", langId: "hi", sampleText: "बढ़िया मारिस ओ! गेंद सीधे चउका डहर निकल गिस!" },
  { id: "up_adda", name: "UP Cricket Adda Style", region: "Uttar Pradesh", langId: "hi", sampleText: "गजब बेइज्जती है भाई! गेंदबाज को तो आज ये रिमांड पे ले लिए हैं!" },

  // Punjab
  { id: "urban_punjabi", name: "Urban Punjabi", region: "Punjab (Chandigarh/Ludhiana)", langId: "pa", sampleText: "चेक करो भाजी! कमाल दा शॉट, सीधा छह रन!" },
  { id: "retro_punjabi", name: "Sidhu Style Punjabi", region: "Punjab Retro", langId: "pa", sampleText: "ओए गुरु! ईंट का जवाब पत्थर से, गेंद गई बादलों की सैर पे!" },
  { id: "village_punjabi", name: "Village Punjabi (Pendu)", langId: "pa", region: "Rural Punjab", sampleText: "ओए बलेआ! डंडा ई बाहिर कड्ड दिता गेंदबाज दा, जट्ट दा मुकाबला!" },

  // Rajasthan
  { id: "marwari", name: "Marwari", region: "Rajasthan (Jodhpur/Jaipur)", langId: "hi", sampleText: "अरे सा! कांई गजब रो शॉट लगायो है, सीधी चौका री सीमा पार!" },
  { id: "mewari", name: "Mewari", region: "Rajasthan (Udaipur)", langId: "hi", sampleText: "भला बल्ला घुमायो रे भाई, सीधे चौकों मिल गयो!" },

  // Gujarat
  { id: "kathiawadi", name: "Kathiawadi Style", region: "Gujarat (Saurashtra)", langId: "gu", sampleText: "રંગ રાખ્યો હો બાપલ્યા! એવો સપાટો બોલાવ્યો છે કે દડો સીધો સીમારેખા પાર!" },

  // Maharashtra
  { id: "mumbai_tapori", name: "Mumbai Tapori", region: "Mumbai", langId: "hi", sampleText: "क्या कड़क शॉट मारा रे भिड़ू! बॉलर को तो पानी पिला दिया!" },
  { id: "marathi_fan", name: "Marathi Cricket Fan", region: "Maharashtra", langId: "mr", sampleText: "काय राव! भन्नाट षटकार ठोकलाय, थेट प्रेक्षकांमध्ये!" },

  // Madhya Pradesh
  { id: "malwi", name: "Malwi", region: "Madhya Pradesh (Indore)", langId: "hi", sampleText: "अरे दादा! कसर नी छोड़ी बल्ला घुमाने में, गेंद सीधे चौके पार!" },
  { id: "bundeli_mp", name: "Bundeli MP Style", region: "Madhya Pradesh (Sagar/Jabalpur)", langId: "hi", sampleText: "गजब कर दओ यार, हमाए खिलाड़ी ने तो बॉलर को छका दओ!" },

  // West Bengal
  { id: "kolkata_host", name: "Kolkata Sports Host", region: "West Bengal", langId: "bn", sampleText: "অসাধারণ শট! বল সীমানার বাইরে, গ্যালারিতে শুধু উল্লাস!" },

  // South India
  { id: "chennai_fan", name: "Chennai Cricket Fan", region: "Tamil Nadu", langId: "ta", sampleText: "என்ன ஒரு ஆட்டம் தலைவா! வேற லெவல் சிக்ஸர்!" },
  { id: "hyderabad_fan", name: "Hyderabad Cricket Fan", region: "Telangana / AP", langId: "te", sampleText: "కిర్రాక్ షాట్ భయ్యా! బాల్ స్టేడియం బయట పడింది!" },
  { id: "bengaluru_techie", name: "Bengaluru Techie", region: "Karnataka", langId: "kn", sampleText: "High throughput delivery, optimized straight to the boundary cluster. Deploying celebrations immediately!" },
  { id: "kerala_sports", name: "Kerala Sports Presenter", region: "Kerala", langId: "ml", sampleText: "വണ്ടർഫുൾ ഷോട്ട്! പന്ത് അതിർത്തി കടന്ന് പറക്കുന്നു!" },

  // North East
  { id: "assamese_host", name: "Assamese Sports Host", region: "Assam", langId: "as", sampleText: "অসাধাৰণ কোব! বল পোনপটীয়াভাৱে সীমাৰেখাৰ বাহিৰলৈ গৈছে!" },
  { id: "local_ne_fan", name: "North-East Local Fan", region: "Sikkim/Arunachal", langId: "ne", sampleText: "के दामी शट हानेको यार! बल सिधै चौका पार!" }
];

// Special Entertainment Personas
export const ENTERTAINMENT_PERSONAS: Persona[] = [
  {
    id: "punjabi_retro",
    name: "Guru Navjot Sidhu",
    title: "Aggressive Retro Punjabi",
    icon: "👳‍♂️",
    badge: "Sidhuism",
    description: "High-energy, frantic, retro idioms, screaming comparisons, loaded with classic Punjabi cricket phrases!",
    systemPromptAddition: "Use high-energy Punjabi slang, hilarious comparisons ('Tractor vs Speedtrain'), and roaring laughter idioms."
  },
  {
    id: "data_scientist",
    name: "Dr. Stat-O-Man",
    title: "Hyper-Analytical Data Scientist",
    icon: "📊",
    badge: "Physics",
    description: "Cold, hyper-mathematical, treats cricket as physics, regression models, and kinetic projections.",
    systemPromptAddition: "Describe the action in terms of trajectories, ballistic coefficients, kinetic velocity vectors, and probabilities."
  },
  {
    id: "meme_lord",
    name: "Sanjay the Meme Lord",
    title: "Sarcastic Meme Lord",
    icon: "💀",
    badge: "Sarcasm",
    description: "Sarcastic, deadpan, filled with modern gamer slang, memes, and mild burns detailing bowler sadness.",
    systemPromptAddition: "Use modern internet slangs ('ratio L', 'bruh', 'emotional damage', 'no cap', 'sheesh') and extreme dry sarcasm."
  },
  {
    id: "ipl_superfan",
    name: "Bittu the IPL Superfan",
    title: "IPL Superfan",
    icon: "🎺",
    badge: "Superfan",
    description: "Uncontrollable hype, waving flags, drums sounding, whistling, screaming high energy player loyalty.",
    systemPromptAddition: "Be incredibly loud and hyped. Scream about franchise loyalty, blow imaginary trumpets ('tututututu'), use whistles, and absolute stadium madness."
  },
  {
    id: "street_legend",
    name: "Chintu Gully Legend",
    title: "Street Cricket Legend",
    icon: "🏏",
    badge: "Gully Rules",
    description: "Speaks about local rules (like one-tip-out, under-arm, ball-lost-is-out, break-the-window-glass).",
    systemPromptAddition: "Incorporate localized gully cricket rules and terms: 'tappa out', 'bhatta bowling', 'kachha limbu', 'deewar touch single', 'glass broken, run away!'"
  },
  {
    id: "chai_tapri",
    name: "Chai Tapri Expert",
    title: "Chai Tapri Expert",
    icon: "☕",
    badge: "Street-Smart",
    description: "Sitting at a local tea stall with a glass of cutting chai, debating cricket like deep geopolitics.",
    systemPromptAddition: "Take deep sips of hot tea ('*slurrrp*'). Compare the match strategy to global affairs, local colony disputes, and general street wisdom."
  },
  {
    id: "rj_rocky",
    name: "RJ Rocky",
    title: "Radio Jockey Star",
    icon: "🎙️",
    badge: "FM Star",
    description: "Rapid-fire speech, sound-effects, calling out listeners, dedicating songs, extremely upbeat and breezy.",
    systemPromptAddition: "Act like a high-vibe FM radio host. Call out imaginary listeners, trigger voice sound effects (like horn sounds or drum-rolls), and speak in a fast, energetic rhythm."
  },
  {
    id: "stadium_announcer",
    name: "Voice of Eden Gardens",
    title: "Stadium Announcer",
    icon: "📢",
    badge: "Official",
    description: "Echoey booming voice, theatrical announcements, encouraging the crowd to roar, spelling out names.",
    systemPromptAddition: "Speak like a booming stadium loudspeaker. Use echo prompts ('... ...'), ask the crown to make some noise, and stretch out vowel characters ('S-H-I-K-H-A-R---- D-H-A-W-A-N!')."
  },
  {
    id: "genz_influencer",
    name: "Alysha Glam",
    title: "Gen-Z Influencer",
    icon: "✨",
    badge: "Slang-heavy",
    description: "Aesthetic, vlog style, 'slaying', calling events 'rent-free in my mind', rating players out of 10.",
    systemPromptAddition: "Speak in vlog energy. Use words like 'slay', 'period', 'literally crying', 'living rent-free', 'giving main character energy', 'purr', 'iconic'."
  },
  {
    id: "bollywood_narrator",
    name: "Karan Johar Style",
    title: "Bollywood Narrator",
    icon: "🎬",
    badge: "Dramatic",
    description: "Ultra-dramatic, violin music in background, love, tears, family values, and slow-motion descriptions.",
    systemPromptAddition: "Make it extremely dramatic with slow-motion descriptions. Talk about sweat, tears, family devotion, heartbeat, destiny, and cinematic glory."
  },
  {
    id: "cricket_historian",
    name: "Professor Ramachandra",
    title: "Cricket Historian",
    icon: "📜",
    badge: "Nostalgic",
    description: "Fascinating references to 1930s cricket, comparing players to Don Bradman or Ranjitsinhji, elegant vocabulary.",
    systemPromptAddition: "Use highly sophisticated English vocabulary. Reference matches from 1952, talk about leather balls, winter dew in Yorkshire, and compare shots to poetry in motion."
  },
  {
    id: "sports_anchor",
    name: "Anchor Vikrant",
    title: "Sports News Anchor",
    icon: "📺",
    badge: "Breaking News",
    description: "Breaking news flash, crisp professional tone, interviewing imaginary experts, high-paced headline news.",
    systemPromptAddition: "Speak in a formal yet high-tempo news anchor style. Start with 'BREAKING NEWS AT THIS HOUR', read out flash updates, and present the event as a massive headline."
  }
];

// Interactive Map States Configuration in India
export interface StateData {
  id: string;
  name: string;
  langId: string;
  dialectId: string;
  capital: string;
  funFact: string;
  svgPath?: string; // We'll render clean coordinates, or a custom visual grid interactive map
}

export const STATE_MAP_DATA: StateData[] = [
  { id: "IN-PB", name: "Punjab", langId: "pa", dialectId: "urban_punjabi", capital: "Chandigarh", funFact: "Home of high-octane commentary and legendary food lovers" },
  { id: "IN-HR", name: "Haryana", langId: "hi", dialectId: "haryanvi", capital: "Chandigarh", funFact: "Produced some of India's fiercest power-hitters" },
  { id: "IN-RJ", name: "Rajasthan", langId: "hi", dialectId: "marwari", capital: "Jaipur", funFact: "Royal sand dunes and colorful sports celebrations" },
  { id: "IN-GJ", name: "Gujarat", langId: "gu", dialectId: "kathiawadi", capital: "Gandhinagar", funFact: "Home of the world's biggest cricket stadium in Ahmedabad" },
  { id: "IN-MH", name: "Maharashtra", langId: "mr", dialectId: "mumbai_tapori", capital: "Mumbai", funFact: "Wankhede Stadium is the heartbeat of Indian cricket" },
  { id: "IN-KA", name: "Karnataka", langId: "kn", dialectId: "bengaluru_techie", capital: "Bengaluru", funFact: "Where software coding and high-trajectory catches collide" },
  { id: "IN-KL", name: "Kerala", langId: "ml", dialectId: "kerala_sports", capital: "Thiruvananthapuram", funFact: "Passionate about football and fast-rising pacers!" },
  { id: "IN-TN", name: "Tamil Nadu", langId: "ta", dialectId: "chennai_fan", capital: "Chennai", funFact: "Chepauk crowd is known as the most knowledgeable and warm audience" },
  { id: "IN-AP", name: "Andhra Pr. / Telangana", langId: "te", dialectId: "hyderabad_fan", capital: "Hyderabad", funFact: "Famous for spicy biryani and spicy hook shots!" },
  { id: "IN-OR", name: "Odisha", langId: "or", dialectId: "bundeli", capital: "Bhubaneswar", funFact: "Rising sports hub with state-of-the-art stadiums" },
  { id: "IN-WB", name: "West Bengal", langId: "bn", dialectId: "kolkata_host", capital: "Kolkata", funFact: "Eden Gardens is known as cricket's Colosseum" },
  { id: "IN-BR", name: "Bihar", langId: "main", dialectId: "bhojpuri", capital: "Patna", funFact: "Unmatched streetside banter and deep cricket analysis" },
  { id: "IN-UP", name: "Uttar Pradesh", langId: "hi", dialectId: "up_adda", capital: "Lucknow", funFact: "Colony verandas filled with tea and cricket debates" },
  { id: "IN-MP", name: "Madhya Pradesh", langId: "hi", dialectId: "malwi", capital: "Bhopal", funFact: "Indore's cricket pitch is known for astronomical batting scores" },
  { id: "IN-AS", name: "Assam / North East", langId: "as", dialectId: "assamese_host", capital: "Dispur", funFact: "Beautiful hill-ringed stadiums and passionate fans" },
  { id: "IN-JK", name: "Jammu & Kashmir", langId: "ks", dialectId: "local_ne_fan", capital: "Srinagar", funFact: "Known for premium willow bats crafted elegantly" }
];

// Rich Voice Character Category
export interface VoiceCharacter {
  id: string;
  name: string;
  label: string;
  gender: "Male" | "Female";
  ageGroup: "Child" | "Teen" | "Adult" | "Senior";
  accent: string;
  basePitch: number;
  baseRate: number;
  baseDepth: number; // 0 (thin) to 1 (deep)
  description: string;
  vocalInstruction: string;
}

export const MALE_VOICE_CHARACTERS: VoiceCharacter[] = [
  {
    id: "m_young_boy",
    name: "Chintu",
    label: "Young Boy (10-15)",
    gender: "Male",
    ageGroup: "Child",
    accent: "Bhopuri Accent",
    basePitch: 1.48,
    baseRate: 1.15,
    baseDepth: 0.15,
    description: "High-pitched, enthusiastic young street kid playing with rubber ball",
    vocalInstruction: "Deliver in a highly hyperactive, excited child tone with frequent gasps and high pitch."
  },
  {
    id: "m_teen_boy",
    name: "Kabir",
    label: "Teen Boy (16-19)",
    gender: "Male",
    ageGroup: "Teen",
    accent: "Mumbai Tapori Accent",
    basePitch: 1.25,
    baseRate: 1.20,
    baseDepth: 0.35,
    description: "Fast-talking urban teenager, gaming lingo, streetside slang",
    vocalInstruction: "Deliver with high-speed, modern street accent, casual pitch fluctuations, and teen slang."
  },
  {
    id: "m_young_man",
    name: "Rahul",
    label: "Young Man (20-30)",
    gender: "Male",
    ageGroup: "Adult",
    accent: "Neutral Indian English",
    basePitch: 1.05,
    baseRate: 1.12,
    baseDepth: 0.50,
    description: "Energetic, clear-voiced college student, polished yet lively",
    vocalInstruction: "Use clear, balanced, natural conversational tone, friendly and energetic."
  },
  {
    id: "m_mature_man",
    name: "Vikram",
    label: "Mature Man (30-45)",
    gender: "Male",
    ageGroup: "Adult",
    accent: "Hindi Speaker Accent",
    basePitch: 0.95,
    baseRate: 1.02,
    baseDepth: 0.70,
    description: "Deep, soothing mature voice. Reliable and authoritative",
    vocalInstruction: "Ensure a steady, grounded, deeply resonant adult male voice with professional pacing."
  },
  {
    id: "m_sports_broadcaster",
    name: "Harsha Deep",
    label: "Deep Sports Broadcaster",
    gender: "Male",
    ageGroup: "Adult",
    accent: "Neutral Indian English",
    basePitch: 0.85,
    baseRate: 0.96,
    baseDepth: 0.90,
    description: "Classic stadium presenter. Booming, resonant baritone, poetic timing",
    vocalInstruction: "Replicate a legendary, professional sports commentator with deep baritone, slow suspense rises, and roaring excitement peaks."
  },
  {
    id: "m_rj_male",
    name: "RJ Rocky",
    label: "Radio Jockey Male",
    gender: "Male",
    ageGroup: "Adult",
    accent: "Haryanvi Accent",
    basePitch: 1.15,
    baseRate: 1.26,
    baseDepth: 0.45,
    description: "Incredibly fast-talking, cheery FM radio show host style",
    vocalInstruction: "Fast-paced radio voice with sudden dramatic pitch drops, ultra-engaging transitions, and high spirit."
  },
  {
    id: "m_ipl_fan",
    name: "Bittu",
    label: "Energetic IPL Fan",
    gender: "Male",
    ageGroup: "Teen",
    accent: "Punjabi Accent",
    basePitch: 1.35,
    baseRate: 1.30,
    baseDepth: 0.40,
    description: "Pure screaming spectator madness, horns blowing, breathless exclamations",
    vocalInstruction: "Scream with high emotion. Breathless delivery, breaking voice effects, and pure fanatic energy."
  },
  {
    id: "m_village_fan",
    name: "Lallan",
    label: "Village Cricket Fan",
    gender: "Male",
    ageGroup: "Adult",
    accent: "Bhojpuri Accent",
    basePitch: 0.98,
    baseRate: 1.14,
    baseDepth: 0.55,
    description: "Rustic local organic fan who knows every player's birth records",
    vocalInstruction: "Thick regional native grammar accents, high-energy local expletives, friendly village elder style."
  },
  {
    id: "m_grandpa",
    name: "Dadaji",
    label: "Old Grandpa",
    gender: "Male",
    ageGroup: "Senior",
    accent: "Rajasthani Accent",
    basePitch: 0.75,
    baseRate: 0.78,
    baseDepth: 0.65,
    description: "Raspy, slow, wise, vintage storytelling grandfatherly perspective",
    vocalInstruction: "Slightly trembling voice, long pauses, nostalgic deep sighs, slow speech rate, low pitch."
  },
  {
    id: "m_news_anchor",
    name: "Arnab",
    label: "Serious News Anchor",
    gender: "Male",
    ageGroup: "Adult",
    accent: "Bengali Accent",
    basePitch: 0.92,
    baseRate: 1.18,
    baseDepth: 0.80,
    description: "Combustive, demanding, hyper-charged news presenter",
    vocalInstruction: "Shout commands. Strict, high-energy authoritative punches, rapid questions, and headlines posture."
  }
];

export const FEMALE_VOICE_CHARACTERS: VoiceCharacter[] = [
  {
    id: "f_young_girl",
    name: "Chutki",
    label: "Young Girl (10-15)",
    gender: "Female",
    ageGroup: "Child",
    accent: "Gujarati Accent",
    basePitch: 1.55,
    baseRate: 1.12,
    baseDepth: 0.10,
    description: "Squeaky, high-octane laughter, counting boundary runs",
    vocalInstruction: "Deliver in a sweet, extremely high-pitched girlish voice, bubbly giggling pace, and high energy."
  },
  {
    id: "f_teen_girl",
    name: "Ananya",
    label: "Teen Girl (16-19)",
    gender: "Female",
    ageGroup: "Teen",
    accent: "Neutral Indian English",
    basePitch: 1.30,
    baseRate: 1.18,
    baseDepth: 0.30,
    description: "Trendy college influencer, aesthetic vlogger style",
    vocalInstruction: "Use expressive teen inflections, bright and snappy, drawing out vowel elements like 'OMG'."
  },
  {
    id: "f_young_woman",
    name: "Pooja",
    label: "Young Woman (20-30)",
    gender: "Female",
    ageGroup: "Adult",
    accent: "Hindi Speaker Accent",
    basePitch: 1.18,
    baseRate: 1.08,
    baseDepth: 0.40,
    description: "Polished, warm, conversational host on modern cricket podcasts",
    vocalInstruction: "Breezy and optimistic voice delivery. Warm middle pitch, steady rhythm, engaging."
  },
  {
    id: "f_mature_woman",
    name: "Meera",
    label: "Mature Woman (30-45)",
    gender: "Female",
    ageGroup: "Adult",
    accent: "Marathi Accent",
    basePitch: 1.05,
    baseRate: 1.01,
    baseDepth: 0.60,
    description: "Grounded, educated analyst. Elegant and intellectual",
    vocalInstruction: "Intellectual composure, rich mid-low register, deliberate pause weights, calm narration."
  },
  {
    id: "f_sports_presenter",
    name: "Mayanti",
    label: "Sports Presenter Female",
    gender: "Female",
    ageGroup: "Adult",
    accent: "Neutral Indian English",
    basePitch: 1.12,
    baseRate: 1.14,
    baseDepth: 0.50,
    description: "Professional TV preview host, highly knowledgeable and energetic",
    vocalInstruction: "Perfect pronunciation rhythm, high vocal dynamic sweeps, enthusiastic, corporate anchor style."
  },
  {
    id: "f_rj_female",
    name: "RJ Archana",
    label: "Radio Jockey Female",
    gender: "Female",
    ageGroup: "Adult",
    accent: "Marathi Accent",
    basePitch: 1.22,
    baseRate: 1.24,
    baseDepth: 0.35,
    description: "Mischievous, rapid-talking fun host of early morning FM broadcasts",
    vocalInstruction: "Joyful high-energy laughter sweeps, playful tease, rapid words, colorful exclamation pauses."
  },
  {
    id: "f_excited_fan",
    name: "Preity",
    label: "Excited Cricket Fan",
    gender: "Female",
    ageGroup: "Adult",
    accent: "Punjabi Accent",
    basePitch: 1.38,
    baseRate: 1.28,
    baseDepth: 0.25,
    description: "Clapping, whistling, jumping in stands, screaming during boundary catches",
    vocalInstruction: "High energy, screaming exclamations, laughing bursts, fast paced breathless excitement."
  },
  {
    id: "f_pro_commentator",
    name: "Anjum",
    label: "Professional Commentator",
    gender: "Female",
    ageGroup: "Adult",
    accent: "Neutral Indian English",
    basePitch: 1.02,
    baseRate: 1.06,
    baseDepth: 0.65,
    description: "Crisp match-side analyst detailing swing angles and footwork",
    vocalInstruction: "Technical precision, analytical crisp tone, sharp professional stress on action keywords."
  },
  {
    id: "f_grandmother",
    name: "Dadi Ji",
    label: "Elderly Grandmother",
    gender: "Female",
    ageGroup: "Senior",
    accent: "Bhojpuri Accent",
    basePitch: 0.88,
    baseRate: 0.80,
    baseDepth: 0.50,
    description: "Gentle motherly advice, offering sweet local snacks and scolding bowlers",
    vocalInstruction: "Affectionate trembling slow voice, long trailing vowels, warm regional idioms, slow speed."
  },
  {
    id: "f_news_anchor",
    name: "Shweta",
    label: "News Anchor Female",
    gender: "Female",
    ageGroup: "Adult",
    accent: "Hindi Speaker Accent",
    basePitch: 1.10,
    baseRate: 1.15,
    baseDepth: 0.55,
    description: "Crisp, factual, breaking news alerts and studio announcements",
    vocalInstruction: "Clean rapid professional speech, highly articulate, strong emphasis on news triggers."
  }
];

export const VOICE_CHARACTERS: VoiceCharacter[] = [...MALE_VOICE_CHARACTERS, ...FEMALE_VOICE_CHARACTERS];

// 14 rich emotions
export interface VoiceEmotion {
  id: string;
  name: string;
  icon: string;
  energyBonus: number;
  pitchBonus: number;
  rateBonus: number;
  promptDescription: string;
}

export const VOICE_EMOTIONS: VoiceEmotion[] = [
  { id: "excited", name: "Excited", icon: "🤩", energyBonus: 1.2, pitchBonus: 0.12, rateBonus: 1.10, promptDescription: "extremely excited, joyful exclamations, bright punctuation" },
  { id: "ultra_hype", name: "Ultra Hype", icon: "🔥", energyBonus: 1.5, pitchBonus: 0.22, rateBonus: 1.25, promptDescription: "uncontrolled screaming commentary, capitalization for shock value, stadium fan chaos" },
  { id: "happy", name: "Happy", icon: "😊", energyBonus: 1.0, pitchBonus: 0.08, rateBonus: 1.02, promptDescription: "cheerful style, light chuckles, warm and welcoming language" },
  { id: "calm", name: "Calm", icon: "🧘", energyBonus: 0.7, pitchBonus: -0.05, rateBonus: 0.85, promptDescription: "quiet, poetic, analytical breakdown, relaxing commentary" },
  { id: "funny", name: "Funny", icon: "😂", energyBonus: 1.1, pitchBonus: 0.10, rateBonus: 1.12, promptDescription: "heavy sarcastic analogies, comical stadium comparisons, laughing words" },
  { id: "dramatic", name: "Dramatic", icon: "🎭", energyBonus: 1.3, pitchBonus: -0.08, rateBonus: 0.88, promptDescription: "slow cinematic suspense, long tragic or heroic sweeps, intense words" },
  { id: "emotional", name: "Emotional", icon: "🥺", energyBonus: 0.9, pitchBonus: 0.05, rateBonus: 0.92, promptDescription: "reminiscent, loaded with national pride, sweat, tearful legacy references" },
  { id: "aggressive", name: "Aggressive", icon: "🤬", energyBonus: 1.4, pitchBonus: -0.04, rateBonus: 1.18, promptDescription: "combustive power commentary, shouting, challenging the bowlers directly" },
  { id: "energetic", name: "Energetic", icon: "⚡", energyBonus: 1.3, pitchBonus: 0.10, rateBonus: 1.18, promptDescription: "high-tempo and bouncy delivery, rapid actions and crisp sporting slang" },
  { id: "inspirational", name: "Inspirational", icon: "🌟", energyBonus: 1.1, pitchBonus: 0.08, rateBonus: 0.95, promptDescription: "heroic poetic couplets, motivational speeches, equating players to gods" },
  { id: "suspenseful", name: "Suspenseful", icon: "⏳", energyBonus: 0.8, pitchBonus: -0.20, rateBonus: 0.75, promptDescription: "whispered speech patterns, intense breathing pauses representing third umpire reviews" },
  { id: "celebratory", name: "Celebratory", icon: "🎉", energyBonus: 1.3, pitchBonus: 0.15, rateBonus: 1.15, promptDescription: "whistles, clapping, drums 'dhol-tasha' sound references, endless festival cheering" },
  { id: "shocked", name: "Shocked", icon: "😱", energyBonus: 1.4, pitchBonus: 0.18, rateBonus: 1.20, promptDescription: "disbelief, jaw-dropped statements, repeated 'unbelievable!' shouts" },
  { id: "confident", name: "Confident", icon: "😎", energyBonus: 1.0, pitchBonus: 0.0, rateBonus: 1.00, promptDescription: "smug authority, prediction-based claims, absolute certainty of victory" }
];

// Indian Accents
export interface IndianAccent {
  id: string;
  name: string;
  description: string;
  instruction: string;
}

export const INDIAN_ACCENTS: IndianAccent[] = [
  { id: "neutral_eng", name: "Neutral Indian English", description: "Standard clear English widely spoken on live TV", instruction: "Output script in English with neutral classical cricket terminology." },
  { id: "hindi_speaker", name: "Hindi Speaker", description: "Hindi-biased English phrasing & intonation", instruction: "Output script blending Hindi sentence structures with English cricketer words." },
  { id: "punjabi", name: "Punjabi Accent", description: "Bouncy, high energy, bold expressions", instruction: "Blend Punjabi exclamations (Oye hoye, Shava Shava) and high enthusiasm into the script." },
  { id: "marathi", name: "Marathi Accent", description: "Mumbai tapori style and traditional Marathi blend", instruction: "Blend Marathi pride exclamations (Kay rao, Bhidu, De dhakka) into the script." },
  { id: "gujarati", name: "Gujarati Accent", description: "Sweet, highly commercial and enthusiastic", instruction: "Incorporate Gujarati references (Baap re, Kem Chho, Jalsa) and happy rhythmic words." },
  { id: "bengali", name: "Bengali Accent", description: "Poetic, refined, rapid sweet speech and football/cricket mashups", instruction: "Incorporate sweet Bengali phrases (Orey baba, Darun, Shunda shot) and artistic comparisons." },
  { id: "tamil", name: "Tamil Accent", description: "Ultra mass Chennai street energy", instruction: "Incorporate Chennai slang (Aiyyo, Thalaiva, Vera level, Sema) with high explosive pace." },
  { id: "telugu", name: "Telugu Accent", description: "Tollywood heroic action commentary style", instruction: "Incorporate high-voltage Telugu words (Kirrak, Mama, Thaggede le, Babu) and dramatic pauses." },
  { id: "kannada", name: "Kannada Accent", description: "Bengaluru smart, tech-infused high-tempo style", instruction: "Incorporate Kannada expressions (Guru, Sakath, Maccha) combined with energetic pace." },
  { id: "malayalam", name: "Malayalam Accent", description: "Polished, classical, high vocabulary, detailed narration", instruction: "Add Malayalam terms (Ente ponno, Poli, Sakhave) and beautiful flowy sentence endings." },
  { id: "bhojpuri", name: "Bhojpuri Accent", description: "Highly rustic and humorous rural commentary", instruction: "Use highly authentic Bhojpuri expressions (Ka ho, Gardda uda dihala, Babua) and pure local humor." },
  { id: "haryanvi", name: "Haryanvi Accent", description: "Raw, muscular, direct power-talk style", instruction: "Incorporate Haryanvi direct tones (Latth gaad diya, Chore, Jaat buddhi, Dhakad) into the script." },
  { id: "rajasthani", name: "Rajasthani Accent", description: "Royal, hospitable, and beautifully historic", instruction: "Introduce royal Rajasthani honorifics (Sa, Khamma Ghani, Padharo, Ghani Chokhi) with nostalgic descriptions." }
];

// 10 broadcast modes
export interface BroadcastMode {
  id: string;
  name: string;
  description: string;
  promptMod: string;
}

export const BROADCAST_MODES: BroadcastMode[] = [
  { id: "tv_sports", name: "TV Sports Commentary", description: "Crisp, premium television tone for high-def broadcasts", promptMod: "Write like a formal television commentary: analyze batsman stance, placement, timing, and camera movements." },
  { id: "radio", name: "Radio Commentary", description: "Rich details of field placement, wind direction, and stadium visuals", promptMod: "Provide highly descriptive audio commentary: detail where fielders are running, the exact placement on the clock face, crowd noises, and atmospheric density so listeners can 'see' the game." },
  { id: "stadium_announcer", name: "Stadium Announcer", description: "Theatrical, echoey announcements, spell out players' names", promptMod: "Structure like a stadium loudspeaker announcement: yell player names in long drawn syllables, call on the crowd to make some noise, and use double dashes for echoing pauses." },
  { id: "podcast", name: "Podcast Style", description: "Relaxed, conversational, rich storytelling and player life stories", promptMod: "Relaxed podcast conversation: discuss player history, childhood anecdotes, funny training stories, and general relaxed high-end sports wisdom." },
  { id: "youtube_creator", name: "YouTube Creator Style", description: "Highly clickable, intense transitions, requesting likes and shares", promptMod: "YouTube creator style: use high-frenzy transition phrases, say: 'Don't forget to like, subscribe and share, guys!', rate the ball out of 10, and use high clickbait energy." },
  { id: "ipl_broadcast", name: "IPL Broadcast Style", description: "High-octane commercial calls, boundary fanfare, sponsor awards", promptMod: "IPL style: call out crazy sponsors (e.g., 'Ceat Strategic Timeout', 'Tata Punch Super Striker'), include trumpet sound exclamations, and scream about franchisee franchise rivalry!" },
  { id: "world_cup", name: "World Cup Broadcast Style", description: "Epic national pride, global gravity, and heavy patriotism", promptMod: "Epic World Cup grand stage style: treat every ball as national pride, describe the heartbeat of billions of fans, and write with deep historical poetic weight." },
  { id: "street_cricket", name: "Street Cricket Commentary", description: "Banterous gully cricket rules, bets, and window-breaking alerts", promptMod: "Gully street style: mention bizarre local rules like: 'one-tip out', 'ball lost is batsman's fault', 'break a glass run away!', and humorous betting chats for cold drinks." },
  { id: "chai_stall", name: "Chai Stall Commentary", description: "Sipping hot cutting tea, relating cricket to politics and local colony gossip", promptMod: "Chai tapri style: simulate sipping hot cutting tea (*SLURRRRRP*), compare player's shot strategy to local political arguments or neighborhood colony fights." },
  { id: "fantasy_expert", name: "Fantasy Cricket Expert", description: "Calculating point totals, predicting player forms, rating stats", promptMod: "Fantasy expert style: talk in terms of Dream11 fantasy points, bowler economy ratios, pitch moisture thresholds, and whether players are a 'captain' pick!" }
];

// Multi Voice Mode
export interface MultiVoiceMode {
  id: string;
  name: string;
  maxSpeakers: number;
  description: string;
}

export const MULTI_VOICE_MODES: MultiVoiceMode[] = [
  { id: "single", name: "Single Voice (Classic)", maxSpeakers: 1, description: "One designated broadcaster handles the full microphone." },
  { id: "dual", name: "Two Commentators (Banter Duo)", maxSpeakers: 2, description: "Duo set: Professional Host and a hilarious Meme sidekick debating on-air!" },
  { id: "team", name: "Team Discussion (4 Speakers!)", maxSpeakers: 4, description: "Anchor, Expert Analyst, Retired Bowler, and street-smart Comic Reacting together." },
  { id: "expert_panel", name: "Expert Analytical Panel (3 Speakers)", maxSpeakers: 3, description: "Moderator, Veteran Coach, and World Cup Legend debating stats and gravity." }
];

