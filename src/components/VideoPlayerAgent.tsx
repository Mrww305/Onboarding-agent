import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  MessageSquare,
  Sparkles,
  Subtitles,
  Volume2,
  VolumeX,
} from "lucide-react";
import { AvatarGuide, WalkthroughStep, OrgRole } from "../types";
import { speakText, stopSpeech, isSpeechSupported } from "../utils/speech";

interface VideoPlayerAgentProps {
  currentStep: WalkthroughStep;
  activeGuide: AvatarGuide;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onSelectStep: (stepId: number) => void;
  allSteps: WalkthroughStep[];
  isMuted: boolean;
  onToggleMute: () => void;
  playbackSpeed: number;
  onOpenAskAgent: (initialQuery?: string) => void;
  activeRole?: OrgRole;
}

export const VideoPlayerAgent: React.FC<VideoPlayerAgentProps> = ({
  currentStep,
  activeGuide,
  isPlaying,
  onTogglePlay,
  onNextStep,
  onPrevStep,
  onSelectStep,
  allSteps,
  isMuted,
  onToggleMute,
  playbackSpeed,
  onOpenAskAgent,
  activeRole,
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showCaptions, setShowCaptions] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [progressSec, setProgressSec] = useState(0);

  const lines = currentStep.script;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // When step changes or role changes, reset line index and progress
  useEffect(() => {
    setCurrentLineIndex(0);
    setProgressSec(0);
    stopSpeech();
    if (isPlaying) {
      startStepNarration(0);
    }
  }, [currentStep.id, currentStep.title, activeGuide.id, activeRole?.id]);

  // Handle play / pause changes
  useEffect(() => {
    if (isPlaying) {
      startStepNarration(currentLineIndex);
    } else {
      stopSpeech();
      setIsSpeaking(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      stopSpeech();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isMuted, playbackSpeed]);

  const startStepNarration = (fromLine: number) => {
    if (fromLine >= lines.length) {
      setIsSpeaking(false);
      return;
    }

    const currentText = lines[fromLine];
    setCurrentLineIndex(fromLine);

    if (!isMuted && isSpeechSupported()) {
      setIsSpeaking(true);
      speakText(currentText, {
        pitch: activeGuide.voicePitch,
        rate: activeGuide.voiceRate * playbackSpeed,
        voiceName: activeGuide.preferredVoiceName,
        onEnd: () => {
          setIsSpeaking(false);
          if (fromLine + 1 < lines.length) {
            // Move to next line after brief pause
            setTimeout(() => {
              startStepNarration(fromLine + 1);
            }, 600 / playbackSpeed);
          }
        },
        onError: () => {
          setIsSpeaking(false);
        },
      });
    } else {
      // If muted or speech not available, advance visually
      setIsSpeaking(true);
      const estLineSec = Math.max(3, currentText.split(" ").length * 0.35) / playbackSpeed;
      setTimeout(() => {
        setIsSpeaking(false);
        if (fromLine + 1 < lines.length) {
          startStepNarration(fromLine + 1);
        }
      }, estLineSec * 1000);
    }
  };

  // Timeline progress simulation
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setProgressSec((prev) => {
          if (prev >= currentStep.durationSec) {
            return currentStep.durationSec;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, currentStep.durationSec]);

  const handleReplay = () => {
    stopSpeech();
    setCurrentLineIndex(0);
    setProgressSec(0);
    startStepNarration(0);
  };

  return (
    <div
      className="relative flex flex-col rounded-2xl border border-white/10 bg-[#0A0A0A] p-4 sm:p-5 backdrop-blur-2xl shadow-2xl"
      id="video-onboarding-agent-container"
    >
      {/* Video Viewport / Stage */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#111111] border border-white/10 shadow-2xl">
        {/* Ambient subtle emerald gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Ambient colored lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
              Live Onboarding
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/[0.03] border border-white/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.15em] font-medium text-white/50">
              <Sparkles className="h-3 w-3 text-emerald-400" />
              {currentStep.category}
            </span>
            {activeRole && (
              <span className="hidden md:inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[9px] uppercase tracking-[0.15em] font-mono text-emerald-400">
                {activeRole.shortTitle}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowCaptions(!showCaptions)}
              id="toggle-captions-btn"
              className={`rounded-lg p-1.5 text-xs transition-colors border ${
                showCaptions
                  ? "bg-white/10 text-white border-white/20"
                  : "bg-black/60 text-white/40 border-white/5 hover:text-white"
              }`}
              title="Toggle Subtitles / Teleprompter"
            >
              <Subtitles className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={onToggleMute}
              id="video-player-mute-toggle"
              className={`rounded-lg p-1.5 text-xs transition-colors border ${
                isMuted
                  ? "bg-rose-950/40 text-rose-400 border-rose-900/50"
                  : "bg-black/60 text-emerald-400 border-white/10 hover:text-emerald-300"
              }`}
              title={isMuted ? "Unmute Narration" : "Mute Narration"}
            >
              {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Center: Live Avatar Presenter Stage */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className="relative group">
            {/* Audio waveform ring around avatar */}
            <div
              className={`absolute -inset-3 rounded-full transition-all duration-700 ${
                isSpeaking && isPlaying
                  ? "bg-emerald-500/20 blur-md scale-105 animate-pulse"
                  : "bg-transparent"
              }`}
            />

            {/* Avatar frame */}
            <div className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-full overflow-hidden border-2 border-emerald-500/40 shadow-2xl shadow-emerald-950/50 bg-[#0A0A0A]">
              <img
                src={activeGuide.avatarUrl}
                alt={activeGuide.name}
                className={`h-full w-full object-cover transition-transform duration-500 ${
                  isSpeaking && isPlaying ? "scale-105" : "scale-100"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Speaking Waveform Bars indicator */}
            {isSpeaking && isPlaying && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-black/90 px-2.5 py-1 border border-emerald-500/40 shadow-lg">
                <span className="h-2.5 w-0.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-4 w-0.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-0.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                <span className="h-3.5 w-0.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "100ms" }} />
                <span className="h-2.5 w-0.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "250ms" }} />
              </div>
            )}
          </div>

          {/* Guide Name Tag */}
          <div className="mt-3.5 text-center">
            <h3 className="text-base sm:text-lg font-serif italic text-white flex items-center justify-center gap-2">
              <span>{activeGuide.name}</span>
              <span className="rounded bg-emerald-500/10 px-1.5 py-0.2 text-[9px] uppercase tracking-[0.2em] text-emerald-400 font-mono not-italic border border-emerald-500/20">
                {activeGuide.tag}
              </span>
            </h3>
            <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-bold mt-1 max-w-xs line-clamp-1">
              {activeGuide.role}
            </p>
          </div>
        </div>

        {/* Teleprompter / Captions Bar at bottom of viewport */}
        {showCaptions && (
          <div className="absolute bottom-3 left-3 right-3 z-20">
            <div className="rounded-xl bg-black/80 p-3.5 backdrop-blur-xl border border-white/10 shadow-2xl">
              <div className="flex items-start gap-2.5">
                <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] shrink-0" />
                <p className="text-xs sm:text-sm font-normal text-white/90 leading-relaxed transition-all">
                  {lines[currentLineIndex] || lines[0]}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Scrubber & Timeline */}
      <div className="mt-3.5 px-1">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1.5">
          <span className="text-emerald-400 font-medium">
            Chapter 0{currentStep.id} — {currentStep.shortTitle}
          </span>
          <span className="tabular-nums">
            {Math.floor(progressSec / 60)}:{String(progressSec % 60).padStart(2, "0")} /{" "}
            {Math.floor(currentStep.durationSec / 60)}:{String(currentStep.durationSec % 60).padStart(2, "0")}
          </span>
        </div>

        {/* Chapter marker bar */}
        <div className="relative h-1 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-300"
            style={{
              width: `${Math.min(100, (progressSec / currentStep.durationSec) * 100)}%`,
            }}
          />
        </div>

        {/* Quick Chapter Navigation Buttons */}
        <div className="mt-2.5 grid grid-cols-5 gap-1.5">
          {allSteps.map((step) => {
            const isActive = step.id === currentStep.id;
            return (
              <button
                key={step.id}
                onClick={() => onSelectStep(step.id)}
                id={`chapter-jump-${step.id}`}
                className={`truncate rounded-lg px-2 py-1.5 text-center text-[9px] uppercase tracking-[0.1em] font-medium transition-all border ${
                  isActive
                    ? "bg-white/10 text-white border-white/20 font-semibold"
                    : "bg-white/[0.02] text-white/40 border-white/5 hover:border-white/10 hover:text-white/70"
                }`}
                title={`Jump to Chapter ${step.id}: ${step.title}`}
              >
                0{step.id}. {step.shortTitle}
              </button>
            );
          })}
        </div>
      </div>

      {/* Playback Controls Row */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Previous Step */}
          <button
            onClick={onPrevStep}
            disabled={currentStep.id === 1}
            id="video-prev-step-btn"
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-20 disabled:hover:bg-white/5 transition-colors"
            title="Previous Chapter"
          >
            <SkipBack className="h-3.5 w-3.5" />
          </button>

          {/* Play / Pause Main Button (High-contrast White pill matching Sophisticated Dark theme) */}
          <button
            onClick={onTogglePlay}
            id="video-main-play-btn"
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-black shadow-lg hover:bg-emerald-400 transition-all active:scale-95"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 fill-black" />
                <span>Pause Agent</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-black" />
                <span>Play Agent</span>
              </>
            )}
          </button>

          {/* Replay Chapter */}
          <button
            onClick={handleReplay}
            id="video-replay-btn"
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
            title="Replay Current Chapter"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          {/* Next Step */}
          <button
            onClick={onNextStep}
            disabled={currentStep.id === allSteps.length}
            id="video-next-step-btn"
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-20 disabled:hover:bg-white/5 transition-colors"
            title="Next Chapter"
          >
            <SkipForward className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Quick Ask Agent Button */}
        <button
          onClick={() => onOpenAskAgent()}
          id="ask-onboarding-agent-btn"
          className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-medium text-white/80 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all"
        >
          <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
          <span>Ask {activeGuide.name}</span>
        </button>
      </div>
    </div>
  );
};
