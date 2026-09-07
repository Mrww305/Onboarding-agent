/**
 * Speech synthesis utility for the MegniToo Video Onboarding Agent
 */

let currentUtterance: SpeechSynthesisUtterance | null = null;

export interface SpeechOptions {
  pitch?: number;
  rate?: number;
  voiceName?: string;
  onBoundary?: (charIndex: number) => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSupported()) return [];
  return window.speechSynthesis.getVoices();
}

export function speakText(
  text: string,
  options: SpeechOptions = {}
): void {
  if (!isSpeechSupported()) {
    options.onEnd?.();
    return;
  }

  // Cancel any existing playback
  stopSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = options.pitch ?? 1.0;
  utterance.rate = options.rate ?? 1.0;

  // Try to find matching voice
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    if (options.voiceName) {
      const match = voices.find((v) =>
        v.name.toLowerCase().includes(options.voiceName!.toLowerCase())
      );
      if (match) utterance.voice = match;
    }
    if (!utterance.voice) {
      // Pick good English voice
      const englishVoice = voices.find(
        (v) => v.lang.startsWith("en") && !v.name.includes("whisper")
      );
      if (englishVoice) utterance.voice = englishVoice;
    }
  }

  utterance.onboundary = (e) => {
    if (e.name === "word" || e.name === "sentence") {
      options.onBoundary?.(e.charIndex);
    }
  };

  utterance.onend = () => {
    currentUtterance = null;
    options.onEnd?.();
  };

  utterance.onerror = (err) => {
    console.warn("Speech synthesis error or interrupted:", err);
    currentUtterance = null;
    options.onError?.(err);
    options.onEnd?.();
  };

  currentUtterance = utterance;
  try {
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn("speechSynthesis speak failed:", e);
    options.onEnd?.();
  }
}

export function pauseSpeech(): void {
  if (isSpeechSupported() && window.speechSynthesis.speaking) {
    window.speechSynthesis.pause();
  }
}

export function resumeSpeech(): void {
  if (isSpeechSupported() && window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
}

export function stopSpeech(): void {
  if (isSpeechSupported()) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}
