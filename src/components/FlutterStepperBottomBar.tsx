import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Award,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import { WalkthroughStep } from "../types";
import { SQUADS_DISCORD_COMMUNITY_URL } from "../data/onboardingData";

interface FlutterStepperBottomBarProps {
  currentStepId: number;
  totalSteps: number;
  steps: WalkthroughStep[];
  completedSteps: number[];
  onNextStep: () => void;
  onPrevStep: () => void;
  onSelectStep: (stepId: number) => void;
  onOpenCertificate: () => void;
  onOpenAskAgent: () => void;
  isCurrentStepCompleted: boolean;
}

export const FlutterStepperBottomBar: React.FC<FlutterStepperBottomBarProps> = ({
  currentStepId,
  totalSteps,
  steps,
  completedSteps,
  onNextStep,
  onPrevStep,
  onSelectStep,
  onOpenCertificate,
  onOpenAskAgent,
  isCurrentStepCompleted,
}) => {
  const currentStep = steps.find((s) => s.id === currentStepId) || steps[0];
  const isFirstStep = currentStepId === 1;
  const isLastStep = currentStepId === totalSteps;
  const nextStep = !isLastStep ? steps.find((s) => s.id === currentStepId + 1) : null;

  return (
    <div
      className="sticky bottom-0 z-30 w-full bg-[#080808]/90 backdrop-blur-2xl border-t border-white/10 px-4 py-3 shadow-[0_-12px_40px_rgba(0,0,0,0.85)]"
      id="flutter-stepper-persistent-bar"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        {/* Left: Previous Chapter Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevStep}
            disabled={isFirstStep}
            id="flutter-stepper-prev-btn"
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-mono font-medium transition-all ${
              isFirstStep
                ? "opacity-30 cursor-not-allowed text-white/30 border border-white/5 bg-white/[0.02]"
                : "text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 shadow-sm active:scale-95"
            }`}
            title={isFirstStep ? "Already on first chapter" : "Go to previous chapter"}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Discord Squads Quick Pill */}
          <a
            href={SQUADS_DISCORD_COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="flutter-stepper-discord-pill"
            className="hidden sm:flex items-center gap-1.5 rounded-xl bg-[#5865F2]/15 hover:bg-[#5865F2]/30 border border-[#5865F2]/30 px-3 py-2 text-[11px] font-mono text-[#8ea1ff] transition-all hover:scale-105"
            title="Join Squads Discord: discord.gg/tgpSywuXP"
          >
            <MessageSquare className="h-3.5 w-3.5 text-[#5865F2]" />
            <span>Squads Discord</span>
            <ExternalLink className="h-2.5 w-2.5 opacity-60" />
          </a>
        </div>

        {/* Center: Flutter M3 Interactive Stepper Dots & Label */}
        <div className="flex flex-col items-center gap-1.5 order-3 sm:order-2 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/40">
              Chapter 0{currentStepId} / 0{totalSteps}
            </span>
            <span className="text-white/20">•</span>
            <span className="text-xs font-serif italic text-white font-medium">
              {currentStep.shortTitle}
            </span>
          </div>

          {/* Animated Stepper Dots */}
          <div className="flex items-center gap-1.5">
            {steps.map((step) => {
              const isCurrent = step.id === currentStepId;
              const isDone = completedSteps.includes(step.id);

              return (
                <button
                  key={step.id}
                  onClick={() => onSelectStep(step.id)}
                  id={`flutter-dot-step-${step.id}`}
                  className={`group relative flex items-center justify-center transition-all duration-300 ${
                    isCurrent
                      ? "h-2.5 w-7 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                      : isDone
                      ? "h-2.5 w-2.5 rounded-full bg-emerald-500/60 hover:bg-emerald-400"
                      : "h-2.5 w-2.5 rounded-full bg-white/20 hover:bg-white/40"
                  }`}
                  title={`Jump to Chapter 0${step.id}: ${step.title}`}
                >
                  <span className="sr-only">Step {step.id}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Next Chapter or Complete Button */}
        <div className="flex items-center gap-2.5 order-2 sm:order-3">
          {/* Ask AI Copilot Button */}
          <button
            onClick={onOpenAskAgent}
            id="flutter-stepper-ask-agent-btn"
            className="flex items-center gap-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white px-3 py-2 text-xs font-mono transition-all"
            title="Ask AI Mentor Copilot"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden md:inline">AI Copilot</span>
          </button>

          {isLastStep ? (
            <button
              onClick={onOpenCertificate}
              id="flutter-stepper-finish-btn"
              className="flex items-center gap-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(52,211,153,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              <Award className="h-4 w-4" />
              <span>Claim Scholar Pass</span>
            </button>
          ) : (
            <button
              onClick={onNextStep}
              id="flutter-stepper-next-btn"
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 ${
                isCurrentStepCompleted
                  ? "bg-emerald-400 hover:bg-emerald-300 text-black shadow-[0_0_20px_rgba(52,211,153,0.3)] ring-1 ring-emerald-300"
                  : "bg-white text-black hover:bg-emerald-400"
              }`}
            >
              <span>Next{nextStep ? `: 0${nextStep.id}` : ""}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
