// High-Fidelity programmatically synthesized Desi Stadium Acoustic Effects using Web Audio API

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Synthesize the classic stadium brass trumpet blast (IPL "Tuta-Tuta-Tuuu!")
export function playStadiumTrumpet(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Riff notes & relative times (C5, C5, C5, E5, D5, G5)
    const riff = [
      { freq: 523.25, duration: 0.13, delay: 0.0 },     // C5
      { freq: 523.25, duration: 0.13, delay: 0.15 },    // C5
      { freq: 523.25, duration: 0.13, delay: 0.30 },    // C5
      { freq: 659.25, duration: 0.22, delay: 0.45 },    // E5
      { freq: 587.33, duration: 0.18, delay: 0.70 },    // D5
      { freq: 783.99, duration: 0.55, delay: 0.90 }     // G5 (Sustained grand finale)
    ];

    riff.forEach((note) => {
      // Primary sawtooth oscillator for rich brass harmonics
      const osc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const biquadFilter = ctx.createBiquadFilter();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(note.freq, now + note.delay);

      // Slightly detuned sub-oscillator to add humanized fatness and thickness
      subOsc.type = "triangle";
      subOsc.frequency.setValueAtTime(note.freq * 1.005, now + note.delay);

      // Shaping filter to sound like a megaphone stadium trumpet organ (removes ultra-high-frequency noise)
      biquadFilter.type = "lowpass";
      biquadFilter.frequency.setValueAtTime(1400, now + note.delay);
      biquadFilter.Q.setValueAtTime(3, now + note.delay);

      // Volume envelope to create attack and dynamic decay/release
      gainNode.gain.setValueAtTime(0, now + note.delay);
      gainNode.gain.linearRampToValueAtTime(0.24, now + note.delay + 0.02); // Sharp attack
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + note.delay + note.duration); // Decay to silence

      // Connect nodes
      osc.connect(biquadFilter);
      subOsc.connect(biquadFilter);
      biquadFilter.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Playback schedule
      osc.start(now + note.delay);
      subOsc.start(now + note.delay);

      osc.stop(now + note.delay + note.duration);
      subOsc.stop(now + note.delay + note.duration);
    });

    // Auto trigger a mild stadium crowd roar swell right after the trumpet riff ends for immersive feeling
    setTimeout(() => {
      playCrowdRoar(2500, 0.12);
    }, 1450);

  } catch (error) {
    console.error("Trumpet sound synthesis failed:", error);
  }
}

// 2. Synthesize a clean, woody "crack-stroke" of a premium English Willow cricket bat
export function playBatStroke(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Pitch sweep representing solid leather impact on woody density
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.035); // Fast sweep

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800, now);
    filter.Q.setValueAtTime(4, now);

    oscGain.gain.setValueAtTime(0.7, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04); // Instant decay

    osc.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);

    // Dynamic noise burst in parallel for ball compression impact crack
    const bufferSize = ctx.sampleRate * 0.03; // 30ms crack noise
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "highpass";
    noiseFilter.frequency.setValueAtTime(1500, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.35, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseSource.start(now);
    noiseSource.stop(now + 0.03);

  } catch (e) {
    console.error("Bat-stroke synthesis error:", e);
  }
}

// 3. Synthesize dynamic crowd applause cheering and roaring (White-noise sweeping filter)
export function playCrowdRoar(durationMs: number = 3000, maxVolume: number = 0.2): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const durationSec = durationMs / 1000;

    // Create 1.5 seconds of loopable noise
    const bufferSize = ctx.sampleRate * 1.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Pinkish noise curve styling
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      data[i] *= 0.11; // normalise volume
      b6 = white * 0.115926;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    // Lowpass filter to simulate acoustic body distance (stadium stadium echo)
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.setValueAtTime(450, now);
    // Smoothly scale filter frequency up and down for swell wave
    bandpass.frequency.exponentialRampToValueAtTime(1100, now + durationSec * 0.35);
    bandpass.frequency.exponentialRampToValueAtTime(320, now + durationSec);

    // Volume Envelope
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, now);
    // Smooth swell up
    gainNode.gain.linearRampToValueAtTime(maxVolume, now + durationSec * 0.25);
    // Smooth decay down
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

    noiseSource.connect(bandpass);
    bandpass.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseSource.start(now);
    noiseSource.stop(now + durationSec);

  } catch (e) {
    console.error("Crowd roar synthesis error:", e);
  }
}

// 4. Synthesize umpire buzzer/match whistle (Beating frequencies with rapid tremolo)
export function playWhistle(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Create a beating acoustic tone with two near high-frequency oscillators
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.type = "sine";
    osc2.type = "sine";
    
    osc1.frequency.setValueAtTime(2150, now);
    osc2.frequency.setValueAtTime(2175, now); // 25Hz beating frequency for whistle trill

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2160, now);
    filter.Q.setValueAtTime(6, now);

    // Whistle envelope: abrupt start, minor sustain, fast drop
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.24, now + 0.015);
    gainNode.gain.linearRampToValueAtTime(0.18, now + 0.20);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);

    osc1.stop(now + 0.36);
    osc2.stop(now + 0.36);

  } catch (e) {
    console.error("Whistle synthesis error:", e);
  }
}
