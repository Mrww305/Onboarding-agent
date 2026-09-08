import React from "react";
import {
  Tv,
  Terminal,
  Compass,
  UserCheck,
  Rocket,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { OrgRole, WalkthroughStep, AvatarGuide } from "../types";
import { SQUADS_DISCORD_COMMUNITY_URL } from "../data/onboardingData";

export type MobileTab = "guide" | "task";

interface FlutterBottomNavProps {
  currentTab?: MobileTab;
  onSelectTab?: (tab: MobileTab) => void;
  onOpenStepsSheet: () => void;
  onOpenRoleSheet?: () => void;
  onOpenVercelModal?: () => void;
  onOpenAskAgent?: () => void;
  onOpenCertificate?: () => void;
  currentStepId: number;
  onSelectStep?: (stepId: number) => void;
  steps?: WalkthroughStep[];
  completedSteps?: number[];
  activeRole?: OrgRole;
  completedStepsCount?: number;
  totalSteps?: number;
  activeGuide?: AvatarGuide;
}

export const FlutterBottomNav: React.FC<FlutterBottomNavProps> = ({
  currentTab = "guide",
  onSelectTab,
  onOpenStepsSheet,
  onOpenRoleSheet,
  onOpenVercelModal,
  onOpenAskAgent,
  onOpenCertificate,
  currentStepId,
  onSelectStep,
  steps = [],
  completedSteps = [],
  activeRole,
  completedStepsCount = 0,
  totalSteps = 6,
  activeGuide,
}) => {
  const calculatedCompletedCount =
    completedSteps.length > 0 ? completedSteps.length : completedStepsCount;

  const handleTabClick = (tab: MobileTab) => {
    if (onSelectTab) {
      onSelectTab(tab);
    }
  };
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 shadow-[0_-8px_30px_rgba(0,0,0,0.8)]"
      id="flutter-bottom-navigation-bar"
      aria-label="Flutter Bottom Navigation Bar"
    >
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {/* 1. Video Guide Tab */}
        <button
          onClick={() => handleTabClick("guide")}
          id="flutter-nav-guide"
          className="flex flex-col items-center justify-center py-1 px-2.5 group relative transition-all"
        >
          <div
            className={`flex items-center justify-center rounded-full px-3.5 py-1 transition-all duration-200 ${
              currentTab === "guide"
                ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40"
                : "text-white/50 group-hover:text-white"
            }`}
          >
            <Tv className="h-4 w-4" />
          </div>
          <span
            className={`text-[9px] font-medium tracking-tight mt-0.5 transition-colors ${
              currentTab === "guide" ? "text-emerald-400 font-bold" : "text-white/50"
            }`}
          >
            Guide
          </span>
        </button>

        {/* 2. Hands-on Task Tab */}
        <button
          onClick={() => handleTabClick("task")}
          id="flutter-nav-task"
          className="flex flex-col items-center justify-center py-1 px-2.5 group relative transition-all"
        >
          <div
            className={`flex items-center justify-center rounded-full px-3.5 py-1 transition-all duration-200 ${
              currentTab === "task"
                ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40"
                : "text-white/50 group-hover:text-white"
            }`}
          >
            <Terminal className="h-4 w-4" />
          </div>
          <span
            className={`text-[9px] font-medium tracking-tight mt-0.5 transition-colors ${
              currentTab === "task" ? "text-emerald-400 font-bold" : "text-white/50"
            }`}
          >
            Task 0{currentStepId}
          </span>
        </button>

        {/* 3. Steps Bottom Sheet Trigger */}
        <button
          onClick={onOpenStepsSheet}
          id="flutter-nav-steps"
          className="flex flex-col items-center justify-center py-1 px-2.5 group relative transition-all text-white/50 hover:text-white"
        >
          <div className="relative flex items-center justify-center rounded-full px-3 py-1 group-hover:bg-white/5 transition-all">
            <Compass className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-[8px] font-mono font-bold text-black">
              {calculatedCompletedCount}
            </span>
          </div>
          <span className="text-[9px] font-medium tracking-tight mt-0.5 text-white/50 group-hover:text-white">
            Chapters
          </span>
        </button>

        {/* 4. Squads Discord Quick Link */}
        <a
          href={SQUADS_DISCORD_COMMUNITY_URL}
          target="_blank"
          rel="noopener noreferrer"
          id="flutter-nav-discord"
          className="flex flex-col items-center justify-center py-1 px-2.5 group relative transition-all text-white/50 hover:text-[#8ea1ff]"
          title="Join Squads Discord: discord.gg/tgpSywuXP"
        >
          <div className="flex items-center justify-center rounded-full px-3 py-1 bg-[#5865F2]/10 border border-[#5865F2]/25 group-hover:bg-[#5865F2]/25 transition-all">
            <MessageSquare className="h-4 w-4 text-[#5865F2]" />
          </div>
          <span className="text-[9px] font-medium tracking-tight mt-0.5 text-[#8ea1ff] font-semibold">
            Discord
          </span>
        </a>

        {/* 5. AI Mentor Copilot */}
        <button
          onClick={onOpenAskAgent}
          id="flutter-nav-agent"
          className="flex flex-col items-center justify-center py-1 px-2.5 group relative transition-all text-white/50 hover:text-white"
        >
          <div className="flex items-center justify-center rounded-full px-3 py-1 bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all">
            <Sparkles className="h-4 w-4 text-emerald-400" />
          </div>
          <span className="text-[9px] font-medium tracking-tight mt-0.5 text-white/70 group-hover:text-white">
            AI Agent
          </span>
        </button>
      </div>
    </nav>
  );
};
