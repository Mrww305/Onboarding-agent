import React from "react";
import {
  Sparkles,
  Rocket,
  Award,
  CheckCircle2,
  Circle,
  HelpCircle,
  Sliders,
  Tv,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import { WalkthroughStep, OrgRole, AvatarGuide } from "../types";
import { SQUADS_DISCORD_COMMUNITY_URL } from "../data/onboardingData";

interface FlutterNavRailProps {
  steps: WalkthroughStep[];
  currentStepId: number;
  onSelectStep: (stepId: number) => void;
  completedSteps: number[];
  activeRole: OrgRole;
  onOpenRoleModal: () => void;
  onOpenVercelModal: () => void;
  onOpenCertificate: () => void;
  onOpenAskAgent: () => void;
  activeGuide: AvatarGuide;
}

export const FlutterNavRail: React.FC<FlutterNavRailProps> = ({
  steps,
  currentStepId,
  onSelectStep,
  completedSteps,
  activeRole,
  onOpenRoleModal,
  onOpenVercelModal,
  onOpenCertificate,
  onOpenAskAgent,
  activeGuide,
}) => {
  return (
    <aside
      className="hidden md:flex flex-col items-center justify-between w-18 lg:w-20 bg-[#080808] border-r border-white/10 py-5 px-1 shrink-0 z-30 select-none"
      id="flutter-navigation-rail"
      aria-label="Navigation Rail"
    >
      {/* Top Brand / Logo */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 text-black font-serif font-bold text-lg shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          M
        </div>

        {/* Role indicator mini chip */}
        <button
          onClick={onOpenRoleModal}
          className="flex flex-col items-center gap-0.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-1 text-[8px] font-mono text-emerald-400 hover:bg-emerald-500/20 transition-all text-center max-w-[68px]"
          title={`Active Role: ${activeRole.title}. Click to switch.`}
        >
          <span className="text-[7px] text-white/40 uppercase">Role</span>
          <span className="font-bold truncate w-full">{activeRole.shortTitle}</span>
        </button>
      </div>

      {/* Center: Walkthrough Steps (Flutter Destination list) */}
      <div className="flex flex-col items-center gap-2.5 my-auto py-2">
        {steps.map((step) => {
          const isCurrent = step.id === currentStepId;
          const isDone = completedSteps.includes(step.id);
          const isTopPriority = activeRole.priorityOrder[0] === step.id;

          return (
            <button
              key={step.id}
              onClick={() => onSelectStep(step.id)}
              className={`relative flex flex-col items-center justify-center rounded-2xl transition-all p-2 group w-14 ${
                isCurrent
                  ? "bg-white text-black shadow-lg"
                  : isDone
                  ? "bg-emerald-950/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/30"
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
              title={`Step 0${step.id}: ${step.title}`}
            >
              {/* Flutter M3 pill active indicator behind icon */}
              <div className="relative flex items-center justify-center">
                {isDone ? (
                  <CheckCircle2 className={`h-4 w-4 ${isCurrent ? "text-black" : "text-emerald-400"}`} />
                ) : (
                  <span className={`text-[11px] font-mono font-bold ${isCurrent ? "text-black" : "text-white/70"}`}>
                    0{step.id}
                  </span>
                )}

                {/* Priority star badge */}
                {isTopPriority && !isDone && (
                  <span className="absolute -top-1 -right-2 flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                )}
              </div>

              <span
                className={`text-[8px] font-medium tracking-tighter mt-1 truncate max-w-[50px] ${
                  isCurrent ? "text-black font-bold" : "text-white/40 group-hover:text-white/80"
                }`}
              >
                {step.shortTitle.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom: Discord Squads, Vercel Deploy, Scholar Pass & Guide Chat */}
      <div className="flex flex-col items-center gap-2.5 pb-2">
        {/* Discord Community Button */}
        <a
          href={SQUADS_DISCORD_COMMUNITY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center rounded-2xl p-2 bg-[#5865F2]/10 hover:bg-[#5865F2]/25 border border-[#5865F2]/30 text-[#8ea1ff] transition-all w-14 group"
          title="Join MegniToo Squads Discord: discord.gg/tgpSywuXP"
        >
          <MessageSquare className="h-4 w-4 text-[#5865F2] group-hover:scale-110 transition-transform" />
          <span className="text-[7px] font-mono font-bold mt-1 text-[#8ea1ff]">Discord</span>
        </a>

        {/* Scholar Pass Modal Button */}
        <button
          onClick={onOpenCertificate}
          className="flex flex-col items-center justify-center rounded-2xl p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-emerald-400 transition-all w-14"
          title="View Scholar Pass"
        >
          <Award className="h-4 w-4" />
          <span className="text-[7px] font-mono font-bold mt-1 text-white/70">Pass</span>
        </button>

        {/* Vercel Deploy Button */}
        <button
          onClick={onOpenVercelModal}
          className="flex flex-col items-center justify-center rounded-2xl p-2 bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/30 text-emerald-400 transition-all w-14"
          title="Deploy to Vercel via GitHub"
        >
          {/* Vercel Triangle */}
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2L24 22H0L12 2Z" />
          </svg>
          <span className="text-[7px] font-mono font-bold mt-1 text-emerald-300">Vercel</span>
        </button>

        {/* AI Guide Avatar Button */}
        <button
          onClick={onOpenAskAgent}
          className="relative rounded-full p-0.5 ring-2 ring-emerald-500/50 hover:ring-emerald-400 transition-all hover:scale-105"
          title={`Ask ${activeGuide.name}`}
        >
          <img
            src={activeGuide.avatarUrl}
            alt={activeGuide.name}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-black" />
        </button>
      </div>
    </aside>
  );
};
