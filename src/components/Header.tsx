import React from "react";
import { Volume2, VolumeX, Sparkles, Award, ExternalLink, Rocket } from "lucide-react";
import { AvatarGuide, UserOnboardingProgress, OrgRole } from "../types";
import { FlutterDeviceSelector, DeviceMode } from "./FlutterDeviceSelector";

interface HeaderProps {
  guides: AvatarGuide[];
  activeGuide: AvatarGuide;
  onSelectGuide: (guide: AvatarGuide) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  playbackSpeed: number;
  onChangeSpeed: (speed: number) => void;
  progress: UserOnboardingProgress;
  totalSteps: number;
  onOpenCertificate: () => void;
  activeRole?: OrgRole;
  onSelectRoleStep?: () => void;
  onOpenVercelModal: () => void;
  deviceMode: DeviceMode;
  onChangeDeviceMode: (mode: DeviceMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  guides,
  activeGuide,
  onSelectGuide,
  isMuted,
  onToggleMute,
  playbackSpeed,
  onChangeSpeed,
  progress,
  totalSteps,
  onOpenCertificate,
  activeRole,
  onSelectRoleStep,
  onOpenVercelModal,
  deviceMode,
  onChangeDeviceMode,
}) => {
  const completedCount = progress.completedSteps.length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);
  const isFullyComplete = completedCount >= totalSteps;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#050505]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
        {/* Brand & Mission Tag */}
        <div className="flex items-center gap-3">
          <a
            href="https://megnitoo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3"
            id="brand-logo-link"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-black font-serif font-bold text-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-transform group-hover:scale-105">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-serif italic tracking-tight text-white">
                  Megnitoo
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-500 font-bold rounded-sm bg-emerald-500/10 px-1.5 py-0.5 border border-emerald-500/20">
                  Incubator
                </span>
              </div>
              <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-white/40">
                <span>AI • ML • DevOps</span>
                <span className="text-white/20">•</span>
                <span className="group-hover:text-emerald-400 transition-colors flex items-center gap-0.5 text-white/40">
                  megnitoo.com
                  <ExternalLink className="h-2.5 w-2.5 opacity-50" />
                </span>
              </p>
            </div>
          </a>
        </div>

        {/* Center / Progress Tracker */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
              <span>Onboarding Progress</span>
              <span className="text-emerald-400 tabular-nums">
                Step 0{completedCount} of 0{totalSteps} — {progressPercent}%
              </span>
            </div>
            <div className="h-1 w-48 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={onOpenCertificate}
            id="open-scholar-badge-btn"
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-[10px] uppercase tracking-[0.15em] font-semibold transition-all border ${
              isFullyComplete
                ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:bg-emerald-400 hover:border-emerald-400"
                : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20 hover:text-white"
            }`}
          >
            <Award className="h-3.5 w-3.5 text-emerald-400" />
            <span>{isFullyComplete ? "Pass Unlocked" : "Scholar Pass"}</span>
          </button>
        </div>

        {/* Controls: Role Pill, Guide Switcher & Audio settings */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Role Pill / Calibrate Switcher */}
          {activeRole && (
            <button
              onClick={onSelectRoleStep}
              id="header-role-button"
              className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 px-2.5 py-1.5 text-[10px] font-mono font-medium text-emerald-300 hover:bg-emerald-900/30 hover:border-emerald-500/50 transition-all shadow-sm"
              title={`Role: ${activeRole.title}. Click to recalibrate.`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/40 uppercase tracking-wider hidden md:inline">Role:</span>
              <span className="font-bold">{activeRole.shortTitle}</span>
            </button>
          )}

          {/* Guide Selector dropdown / buttons */}
          <div className="flex items-center rounded-xl bg-white/[0.03] p-1 border border-white/10" id="guide-selector-group">
            {guides.map((guide) => {
              const isSelected = activeGuide.id === guide.id;
              return (
                <button
                  key={guide.id}
                  onClick={() => onSelectGuide(guide)}
                  id={`select-guide-${guide.id}`}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-1 text-xs transition-all ${
                    isSelected
                      ? "bg-white/10 text-white border border-white/15 font-medium shadow-sm"
                      : "text-white/50 hover:text-white/80"
                  }`}
                  title={`${guide.name} - ${guide.role}`}
                >
                  <img
                    src={guide.avatarUrl}
                    alt={guide.name}
                    className="h-4 w-4 rounded-full object-cover ring-1 ring-white/20"
                  />
                  <span className="hidden sm:inline font-serif italic">{guide.name}</span>
                </button>
              );
            })}
          </div>

          {/* Vercel Deploy Action Button */}
          <button
            onClick={onOpenVercelModal}
            id="header-vercel-deploy-btn"
            className="flex items-center gap-1.5 rounded-xl bg-white text-black px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-400 transition-all shadow-md shrink-0"
            title="Deploy to Vercel via GitHub"
          >
            {/* Vercel icon */}
            <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L24 22H0L12 2Z" />
            </svg>
            <span className="hidden sm:inline">Vercel</span>
            <span className="sm:hidden">Deploy</span>
          </button>

          {/* Flutter Device Ergonomics Switcher */}
          <div className="hidden lg:block">
            <FlutterDeviceSelector
              deviceMode={deviceMode}
              onChangeDeviceMode={onChangeDeviceMode}
            />
          </div>

          {/* Speed Toggle */}
          <button
            onClick={() => {
              const nextSpeed = playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1;
              onChangeSpeed(nextSpeed);
            }}
            id="speed-toggle-btn"
            className="hidden sm:block rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] font-mono font-medium text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
            title="Narration Speed"
          >
            {playbackSpeed}x
          </button>

          {/* Sound Mute/Unmute */}
          <button
            onClick={onToggleMute}
            id="audio-mute-toggle-btn"
            className={`rounded-xl p-2 transition-all border shrink-0 ${
              isMuted
                ? "bg-rose-950/20 text-rose-400 border-rose-900/40 hover:bg-rose-900/30"
                : "bg-white/5 border-white/10 text-emerald-400 hover:bg-white/10 hover:border-white/20"
            }`}
            title={isMuted ? "Unmute Voice Narration" : "Mute Voice Narration"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
