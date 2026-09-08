import React from "react";
import { X, CheckCircle2, Circle, ArrowRight, Sparkles } from "lucide-react";
import { WalkthroughStep, OrgRole } from "../types";

interface FlutterStepsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  steps: WalkthroughStep[];
  currentStepId: number;
  onSelectStep: (stepId: number) => void;
  completedSteps: number[];
  activeRole: OrgRole;
  selectedRoleId?: string | null;
}

export const FlutterStepsBottomSheet: React.FC<FlutterStepsBottomSheetProps> = ({
  isOpen,
  onClose,
  steps,
  currentStepId,
  onSelectStep,
  completedSteps,
  activeRole,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl border-t sm:border border-white/10 bg-[#0E0E0E] p-5 text-white shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        id="flutter-steps-bottom-sheet"
      >
        {/* Flutter Drag Handle */}
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4 shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div>
            <h3 className="text-base font-serif italic text-white">
              Walkthrough Chapters
            </h3>
            <p className="text-xs text-white/50">
              Personalized for {activeRole.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-white/40 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Steps List */}
        <div className="overflow-y-auto py-3 space-y-2.5 flex-1 pr-1">
          {steps.map((step) => {
            const isCurrent = step.id === currentStepId;
            const isDone = completedSteps.includes(step.id);
            const isTopPriority = activeRole.priorityOrder[0] === step.id;
            const isSecondPriority = activeRole.priorityOrder[1] === step.id;

            return (
              <button
                key={step.id}
                onClick={() => {
                  onSelectStep(step.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all ${
                  isCurrent
                    ? "bg-white text-black border-white shadow-lg font-bold"
                    : isDone
                    ? "bg-emerald-950/20 text-emerald-200 border-emerald-500/30 hover:bg-emerald-900/30"
                    : isTopPriority
                    ? "bg-emerald-950/30 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/40"
                    : "bg-white/[0.02] text-white/70 border-white/5 hover:bg-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-mono font-bold shrink-0 ${
                      isCurrent
                        ? "bg-black text-white"
                        : isDone
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-white/5 text-white/50"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : `0${step.id}`}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">{step.title}</span>
                      {isTopPriority && !isDone && (
                        <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[8px] font-mono font-bold text-emerald-300 border border-emerald-500/40">
                          ★ P1
                        </span>
                      )}
                      {isSecondPriority && !isDone && (
                        <span className="rounded bg-white/10 px-1.5 py-0.5 text-[8px] font-mono text-white/60">
                          P2
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-[11px] mt-0.5 truncate max-w-[260px] ${
                        isCurrent ? "text-black/70" : "text-white/40"
                      }`}
                    >
                      {step.suggestedAction}
                    </p>
                  </div>
                </div>

                <ArrowRight className={`h-4 w-4 shrink-0 ${isCurrent ? "text-black" : "text-white/30"}`} />
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/40 shrink-0">
          <span>{completedSteps.length} of {steps.length} completed</span>
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-1.5 bg-white/10 text-white hover:bg-white/15 transition-all text-xs font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
