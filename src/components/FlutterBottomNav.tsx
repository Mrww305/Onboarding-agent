import React from "react";
import {
  Tv,
  Terminal,
  Compass,
  UserCheck,
  Rocket,
  Sparkles,
} from "lucide-react";
import { OrgRole } from "../types";

export type MobileTab = "guide" | "task";

interface FlutterBottomNavProps {
  currentTab: MobileTab;
  onSelectTab: (tab: MobileTab) => void;
  onOpenStepsSheet: () => void;
  onOpenRoleSheet: () => void;
  onOpenVercelModal: () => void;
  currentStepId: number;
  activeRole?: OrgRole;
  completedStepsCount: number;
  totalSteps: number;
}

export const FlutterBottomNav: React.FC<FlutterBottomNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenStepsSheet,
  onOpenRoleSheet,
  onOpenVercelModal,
  currentStepId,
  activeRole,
  completedStepsCount,
  totalSteps,
}) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/10 px-2 py-1 shadow-[0_-8px_30px_rgba(0,0,0,0.8)]"
      id="flutter-bottom-navigation-bar"
    >
      <div className="mx-auto flex max-w-md items-center justify-around">
        {/* 1. Video Guide Tab */}
        <button
          onClick={() => onSelectTab("guide")}
          id="flutter-nav-guide"
          className="flex flex-col items-center justify-center py-1 px-3 group relative transition-all"
        >
          <div
            className={`flex items-center justify-center rounded-full px-4 py-1 transition-all duration-200 ${
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
          onClick={() => onSelectTab("task")}
          id="flutter-nav-task"
          className="flex flex-col items-center justify-center py-1 px-3 group relative transition-all"
        >
          <div
            className={`flex items-center justify-center rounded-full px-4 py-1 transition-all duration-200 ${
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
          className="flex flex-col items-center justify-center py-1 px-3 group relative transition-all text-white/50 hover:text-white"
        >
          <div className="relative flex items-center justify-center rounded-full px-3 py-1 group-hover:bg-white/5 transition-all">
            <Compass className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-[8px] font-mono font-bold text-black">
              {completedStepsCount}
            </span>
          </div>
          <span className="text-[9px] font-medium tracking-tight mt-0.5 text-white/50 group-hover:text-white">
            Chapters
          </span>
        </button>

        {/* 4. Role Discovery Trigger */}
        <button
          onClick={onOpenRoleSheet}
          id="flutter-nav-role"
          className="flex flex-col items-center justify-center py-1 px-3 group relative transition-all text-white/50 hover:text-white"
        >
          <div className="flex items-center justify-center rounded-full px-3 py-1 group-hover:bg-white/5 transition-all">
            <UserCheck className="h-4 w-4" />
          </div>
          <span className="text-[9px] font-medium tracking-tight mt-0.5 text-white/50 group-hover:text-white truncate max-w-[50px]">
            {activeRole?.shortTitle || "Role"}
          </span>
        </button>

        {/* 5. Vercel & GitHub Deploy Center */}
        <button
          onClick={onOpenVercelModal}
          id="flutter-nav-deploy"
          className="flex flex-col items-center justify-center py-1 px-3 group relative transition-all text-white/50 hover:text-emerald-300"
        >
          <div className="flex items-center justify-center rounded-full px-3 py-1 bg-white/5 border border-white/10 group-hover:border-emerald-500/40 transition-all">
            <Rocket className="h-4 w-4 text-emerald-400" />
          </div>
          <span className="text-[9px] font-medium tracking-tight mt-0.5 text-emerald-400 font-semibold">
            Deploy
          </span>
        </button>
      </div>
    </nav>
  );
};
